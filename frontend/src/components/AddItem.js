import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const AddItem = () => {

  const [title, setTitle] = useState("")
  // const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createitem", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          // body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {

          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" })
          }
          else {
            M.toast({ html: "Item created Successfully", classes: "#43a047 green darken-1" })
            history.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }, [url])


  const itemDetail = () => {
    const data = new FormData()

    data.append("file", image);
    data.append("upload_preset", "item-cart");
    data.append("cloud_name", "dig4wtppo")
    fetch("https://api.cloudinary.com/v1_1/dig4wtppo/upload", {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })


  }
  return (
    <div className="card add-card input-filed">
      <h2>Add an items</h2>
      <input type="text" placeholder='title' value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <div className="file-field input-field">
        <div className="btn green darken-1">
          <span>Upload Image</span>
          <input type="file" accept="image/*,.pdf" 
          style={{ maxWidth: "250px", maxHeight: "200px" }}
    
          onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn #64b5f6 blue darken-1"
        onClick={() => itemDetail()}
      >Add items</button>
    </div>
  )
}

export default AddItem