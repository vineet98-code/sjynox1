var express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
var requireLogin = require('../middleware/require');
const Item = mongoose.model("Item")


router.post('/createitem', requireLogin, (req, res) => {
    
    const { title, pic } = req.body;

    console.log(title, pic)
    if (!title || !pic) {
        return res.status(422).json({ error: "please add all the required fields" })
    }
    req.user.password = undefined;
    const item = new Item({
        title,
        image: pic,
        addedBy: req.user
    })
    item.save().then(result => {
        res.json({ item: result })
    })
        .then(err => {
            console.log(err)
        })

})
// All items
router.get('/allitem', (req, res) => {
    Item.find().populate('addedBy', "name")
        .then(items => {
            res.json({ items })
        })
        .catch(err => {
            console.log(err)
        })
})
// DElete items
router.delete('/delete/:itemId', requireLogin, (req, res) => {
    Item.findOne({_id:req.params.itemId}).populate("addedBy", "_id")
        .exec((err, item) => {
            if(err || !item){
                return res.status(422).json({error:err})
            }
            if(item.addedBy._id.toString() === req.user._id.toString()){
                item.remove()
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    console.log(err)
                })
            }
        })
        
})

module.exports = router;