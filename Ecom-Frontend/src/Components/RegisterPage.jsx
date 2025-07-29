import React, { useState, useEffect } from 'react';
import './registerPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {registerUser,resetRegisterState} from '../Slices/userSlices'
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector((state) => state.userRegister);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [valError, setValError] = useState({});

  // 👉 Handle validation
  function validate(regData) {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    const { username, email, password, confirmPass } = regData;

    if (!username) errors.username = "*User name is required";
    if (!emailRegex.test(email)) errors.email = "Incorrect Email Format";
    if (!passwordRegex.test(password)) errors.password = "Password must contain 1 uppercase and special character";
    if (password !== confirmPass) errors.confirmPass = "Passwords do not match";

    return errors;
  }

  // 👉 Form submit
  function signUp(event) {
    event.preventDefault();

    const regData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPass:confirmPass.trim()
    };

    const errors = validate(regData);
    setValError(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch(registerUser(regData));
  }

  // ✅ Navigate after registration success
  useEffect(() => {
    if (user) {
      toast.success("Registration Successful!");
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPass('');
      dispatch(resetRegisterState());
    }
  }, [user, navigate,dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
 
  return (
    <div className="reg-pg">
      <div className="register-container">
        <h2>Sign Up</h2>
        <form onSubmit={signUp}>
          <input type="text" value={username} placeholder="Full Name" onChange={(e) => setUserName(e.target.value)} />
          {valError.username && <p className='valErr'>{valError.username}</p>}
          <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          {valError.email && <p className='valErr'>{valError.email}</p>}
          <input type={showPass ? 'text' : 'password'} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {valError.password && <p className='valErr'>{valError.password}</p>}
          <input type={showPass ? 'text' : 'password'} value={confirmPass} placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} />
          {valError.confirmPass && <p className='valErr'>{valError.confirmPass}</p>}
          <div className="show-pass">
            <label>
              <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)} /> ShowPassword
            </label>
          </div>
          <button type="submit" className="register-button">Sign Up</button>
        </form>
        <div className="links">
          <p>Already have an account? <span className="log-but" onClick={() => navigate('/login')}>Login</span></p>
        </div>
      </div>
    </div>
  );
};
