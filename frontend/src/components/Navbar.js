import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../App'
import { useHistory } from 'react-router-dom'

const Navbar = () => {

  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const render = () => {
    if(state){
      return (
        <>
        <li><Link to="/additem">Create Items</Link></li>
        <button className="btn  red darken-3"
        onClick={() => {
            localStorage.clear();
            dispatch({type:"CLEAR"})
            history.push('/signin')
        }}
      >LogOut</button>
        </>
      )
    } else {
      return (
        <>
        <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>
      )

    }
  }

  return (
    <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo left">Product</Link>
      <ul id="nav-mobile" className="right">
        {render()}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar