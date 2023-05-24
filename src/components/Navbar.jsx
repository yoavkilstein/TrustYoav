import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className="logo">Trust Yoav</span>
      <div className="user">
        <img src={currentUser.photoURL} alt=""/> 
        <span>{currentUser.displayName}</span> {/*displaying the user avatar photo and name */}
        <button onClick={() => signOut(auth)}>logout</button> {/*Sign out and redirect to login page*/}
      </div>
    </div>
  )
}

export default Navbar