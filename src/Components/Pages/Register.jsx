import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase/Firebase.config";
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

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

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    if (name.length < 6) {
      toast.error("Name should be more than 6 characters!");
      return;
    }
    const photo = e.target.photo.value;
    console.log({ name, photo });

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase, lowercase, number & special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            result.user
              .reload()
              .then(() => {
                toast.success("Registration successful! Profile saved.");
                navigate("/");
              })
              .catch((err) => {
                toast.error("Error refreshing user: " + err.message);
              });
          })
          .catch((err) => {
            toast.error("Error saving profile: " + err.message);
          });
      })
      .catch((error) => {
        if(error.code == 'auth/email-already-in-use'){
          toast.error('User already exist in database!')
        }else if(e.code == "auth/weak-password"){
          toast.error("Password must be at least 6 characters and include uppercase, lowercase, number & special character.")
        } else{toast.error(error.message)}
      });
  };

  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <h2 className="text-3xl text-center font-semibold">
                Register now!
              </h2>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Your Name</label>
                <input
                  type="name"
                  name="name"
                  className="input"
                  placeholder="Name"
                />
                {/* photo url */}
                <label className="label">Photo URL</label>
                <input
                  type="photo"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />
                {/* email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                {/* password */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    className="input w-full pr-10"
                    placeholder="Password"
                    name="password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-6 top-[38px] cursor-pointer"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
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
                  Already have an account?
                  <Link className="text-secondary" to="/auth/login">
                    {" "}
                    Login
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

export default Register;
