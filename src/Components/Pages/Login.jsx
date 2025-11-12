import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { auth } from "../Firebase/Firebase.config";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result=>{
      console.log(result.user);
      toast.success("Login Successfully");
      navigate('/')
    })
    .catch(error=>{
      console.log(error);
      toast.error(error.message)
    })
  }
 
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
    .then(result=>{
      console.log(result.user);
      toast.success("Login Successfully");
      navigate('/')
    })
    .catch(error=>{
      console.log(error);
      toast.error(error.message)
    })
  };
  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <h2 className="text-3xl text-center font-semibold">Login now!</h2>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                {/* password */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type={show ? "text": "password"}
                  className="input w-full pr-10"
                  placeholder="Password"
                  name="password"
                />
                <span onClick={()=>setShow(!show)} className="absolute right-6 top-[38px] cursor-pointer">{show ? <FaEye/> : <IoEyeOff/>}</span>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
                {/* divider */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-20 bg-base-200"></div>
                  <span className="text-sm text-white/70">or</span>
                  <div className="h-px w-20 bg-base-200"></div>
                </div>
                {/* google btn */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn flex items-center justify-center gap-3 btn-neutral text-white-800 px-5 py-2 rounded-lg w-full font-bold transition-colors"
                >
                  <FcGoogle size={20} />
                  Continue with Google
                </button>

                <p className="text-center font-semibold pt-5">
                  Don't have an account?
                  <Link className="text-secondary" to="/auth/register">
                    {" "}
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
