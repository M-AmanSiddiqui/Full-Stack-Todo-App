import React from "react";
import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function SignUp() {

    const history = useNavigate()
    const [Inputs , setInputs] = useState({
        "email": "" ,
        "username": "" , 
        "password": ""
    })
    const change = (e) => {
        const {name,value} = e.target;
        setInputs({...Inputs, [name]: value})
    }
    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/register", Inputs).then((response) => {
          if(response.data.message === "User Already Exists"){
            alert(response.data.message)
          }else{
            alert(response.data.message)

          
          
            setInputs({
        "email": "" ,
        "username": "" , 
        "password": ""
    })}
       history("/signin")   
        })
        
      
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">Create Account </h2>
        <p className="text-gray-200 text-center mt-2">Sign up to get started with TodoApp</p>
<form className="mt-6 space-y-4" onSubmit={submit}>
  {/* Username */}
  <div className="relative">
    <User className="absolute top-3 left-3 text-gray-400" size={20} />
    <input
      type="text"
      name="username"   // ✅ added
      placeholder="Username"
      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
      onChange={change}
      value={Inputs.username}
    />
  </div>

  {/* Email */}
  <div className="relative">
    <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
    <input
      type="email"
      name="email"   // ✅ added
      placeholder="Email"
      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
      onChange={change}
      value={Inputs.email}
    />
  </div>

  {/* Password */}
  <div className="relative">
    <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
    <input
      type="password"
      name="password"   // ✅ added
      placeholder="Password"
      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
      onChange={change}
      value={Inputs.password}
    />
  </div>

  <button
    type="submit"
    onClick={submit}
    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl transition"
  >
    Sign Up
  </button>
</form>


        <p className="text-sm text-gray-200 text-center mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-yellow-300 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}