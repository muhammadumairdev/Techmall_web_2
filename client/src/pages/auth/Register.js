import React, { useState, useEffect } from "react";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   'URL ===> ',
    //   process.env.REACT_APP_REGISTER_REDIRECT_URL
    //);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    // save user email to local storage
    window.localStorage.setItem('emailForRegistration',email);
    //clear the state
    setEmail('');
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />

      <button
        type='submit'
        className='mt-3 btn btn-primary'
      >
        Register
      </button>
    </form>
  );
  return (
    <div className='container p-5'>
      <din className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </din>
    </div>
  );
};

export default Register;
