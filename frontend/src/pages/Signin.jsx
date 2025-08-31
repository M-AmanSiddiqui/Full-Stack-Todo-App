import React from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function SignIn() {

  
    const history = useNavigate()
    const [Inputs , setInputs] = useState({
          "email": "" ,
          
          "password": ""
      })

      const change = (e) => {
              const {name,value} = e.target;
              setInputs({...Inputs, [name]: value})
          }
          const submit = async (e) => {
              e.preventDefault();
              await axios.post("http://localhost:1000/api/v1/signin", Inputs).then((response) => {
               console.log(response.data.others._id);
                history("/todo")
              })  
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back 👋</h2>
        <p className="text-gray-200 text-center mt-2">Login to continue to TodoApp</p>

        <form className="mt-6 space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
              value={Inputs.email}
              onChange={change}           
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
               name="password"
              placeholder="Password"
              onChange={change}
              value={Inputs.password}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            onClick={submit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-200 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
