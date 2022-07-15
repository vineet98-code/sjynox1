var mongoose = require('mongoose');


var itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
     image: { type: String, required: true},
     addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     }
   }
);

mongoose.model('Item', itemSchema);
