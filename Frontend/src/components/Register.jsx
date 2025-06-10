import axios from "axios";
import { useState } from "react";
import {ToastContainer,toast} from 'react-toastify'
function Register(){
    const [user,setUser]=useState({fullname:'',email:'',username:'',password:''})
    const [errors,setErrors]=useState({});

    const handlesubmit=async(e)=>{
        const validationErrors={}
        const emailPattern=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordPattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        e.preventDefault();
        if(!user.fullname){
            validationErrors.fullname=!user.fullname?"Name cannot be Empty":''
        }
        if(!user.email){
            validationErrors.email="Email cannot be empty"
        }else if(!emailPattern.test(user.email)){
            validationErrors.email="Invalid Email"
        }
        if(!user.username){
            validationErrors.username="Username cannot be empty"
        }
        if(!user.password){
            validationErrors.password="Password cannot be empty"
        }else if(!passwordPattern.test(user.password)){
            validationErrors.password="Password must includes 1 caps,1 special char and 8 char long"
        }
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors)
            return;
        }
        try{
            const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
                name:user.fullname,
                email:user.email,
                username:user.username,
                password:user.password,
            });
            console.log(response);   
            toast.success(response.data.message);
            setUser({fullname:'',email:"",username:'',password:''});
            setErrors({});
        }catch(err){
            const message=err.response.data.message;
            toast.error(message)
        }
    }
    return(
        <div className="container w-100">
            <h3 className="text-center p-2 text-bg-warning my-3">Registration</h3>
            <form onSubmit={handlesubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className={`form-control ${errors.fullname?'is-invalid':'is-valid'}`}
                    placeholder="john doe" required onChange={(e)=>setUser({...user,fullname:e.target.value})}
                    value={user.fullname}/>
                    {errors.fullname&&<div className="invalid-feedback">{errors.fullname}</div>}
                </div>
               <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${errors.email?'is-invalid':'is-valid'}`}
                    placeholder="john@gmail.com" required onChange={(e)=>setUser({...user,email:e.target.value})}
                    value={user.email}/>
                    {errors.email&&<div className="invalid-feedback">{errors.email}</div>}
                </div>
                 <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className={`form-control ${errors.username?'is-invalid':'is-valid'}`}
                    placeholder="johndoe123" required onChange={(e)=>setUser({...user,username:e.target.value})}
                    value={user.username}/>
                    {errors.username&&<div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password?'is-invalid':'is-valid'}`}
                    placeholder="password" required onChange={(e)=>setUser({...user,password:e.target.value})}
                    value={user.password}/>
                    {errors.password&&<div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <ToastContainer/>
            </form>
        </div>
    )
   
}
export default Register;
