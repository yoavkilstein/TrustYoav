import React, { useState } from 'react';
import Add from "../img/AvatarAdd.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the input values from the sign up form.
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];
    
    // Check if the email is valid and if it is a gmail email address, if not, return undefined.
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(email);
    const isValidDomain = /@gmail\.com$/.test(email);
    let errorMessage = '';

      if (!displayName || !email || !password || !confirmPassword) {
        errorMessage = 'All fields are required.';
      } else if (!isValidEmail) {
        errorMessage = 'must be valid Email format';
      } else if (!isValidDomain){
        errorMessage = 'Email must end with "@gmail.com"';
      } else if (password !== confirmPassword){
        errorMessage = 'Passwords do not match';
      } 
      if (errorMessage !== '') {
        setErr({ message: errorMessage });
        return; // Exit the function if there is an error.
      }
      try {
        // Create a storage reference for the user
        const res = await createUserWithEmailAndPassword(auth, email, password);
      
        const displayNameRef = ref(storage, displayName);
      
        // Check if a file was selected
        if (file) {
          const uploadTask = uploadBytesResumable(displayNameRef, file);
      
          uploadTask.on(
            (error) => {
              setErr({ message: error.message });
            },
            async () => {
            try {
              // Get the download URL of the uploaded file
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      
              // Update the user's name and photo URL in the database.
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              // Navigate to the home page after the user has been added to "userChats".
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (error) {
            }
          }
          );
        } else {
          try {

          // If no file was selected, update the user's name without a photoURL
          await updateProfile(res.user, {
            displayName,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
          });
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (error) {
        }
        }
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setErr({ message: "Email is already in use" });
        } else {
          setErr({ message: err.message.slice(9) });
        }
      }      
  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">Trust Yoav</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/> 
                <input type="password" placeholder="confirm password"/> 
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor="file" >
                    <span>Add an avater:</span>
                    <img style={{ width: 32, cursor: 'pointer'}} src={Add} alt="" />
                </label>
                <button>Sign Up</button>
                {err && <span>{err.message}</span>}
            </form>
            <p>You do have an account? <Link to="/login">Login</Link></p>
        </div> 
    </div>
  );
};

export default Register;
