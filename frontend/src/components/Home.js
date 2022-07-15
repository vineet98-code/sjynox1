import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'


const Home = () => {

   const [items, setItems] = useState([])
   const { state, dispatch } = useContext(UserContext)

   useEffect(() => {
      fetch('http://localhost:5000/allitem', {
         headers: {
            "Authorization": "Token " + localStorage.getItem("jwt")
         }
      }).then(res => res.json())
         .then(result => {
            // console.log(result)
            setItems(result.items)
         })
   }, [])

   const deletePost = (itemid) => {
      fetch(`http://localhost:5000/delete/${itemid}`, {
         method: "Delete",
         headers: {
            Authorization: "Token " + localStorage.getItem("jwt")
         }
      }).then(res => res.json())
         .then(result => {
            // console.log(result)
            const newData = items.filter(item => {
               return item._id !== result._id
            })
            setItems(newData)
         })
   }

   return (
      <div className="home">
         {
            items.map(item => {
               return (
                  <div className="card home-card" key={item._id}>
                     <div className="card-content ">
                        <h6>{item.title}</h6>
                     </div>

                     <div className="card-image">
                        <img src={item.image} alt={item.image} />
                     </div>
                     <h5 style={{ padding: "5px" }}>Added By: {item.addedBy.name} {item.addedBy._id === state._id &&

                        <i className="material-icons"
                           style={{
                              float: "right"
                           }}
                           onClick={() => deletePost(item._id)}>delete</i>

                     }</h5>

                  </div>
               )

            })
         }

      </div>
   )
}

export default Home