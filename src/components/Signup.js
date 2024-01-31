import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
    const [credential, setcredential] = useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credential    

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
      
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // localStorage.setItem('token',json.authtoken)
            props.showAlert("Account Succesfully created","success")

            history("/")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
                    }
    }
    const onChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
  return (
<>
<div className="mt-2">
      <h2>Signup to Continue to iNoteBook</h2>
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" name='name' className="form-control" id="name" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp"onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="password" onChange={onChange} required minLength={6}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword"  className="form-label">Confirm Password</label>
    <input type="password" name='cpassword' className="form-control" id="cpassword" onChange={onChange} required minLength={6}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</>  
)
}

export default Signup
