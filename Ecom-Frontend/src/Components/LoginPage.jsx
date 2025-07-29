import React, { useEffect, useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../Slices/userSlices';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, isLoading } = useSelector(state => state.userInfo);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      navigate("/");
    }

    if (error) {
      toast.error(error || "Something went wrong", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div className="log-bg">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showpass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="show-pass">
            <label>
              <input type="checkbox" checked={showpass} onChange={() => setShowPass(!showpass)} />
              ShowPassword
            </label>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="links">
          <p>Forgot <a href="#">Password?</a></p>
          <p>Don’t have an account? <span className="reg-but" onClick={() => navigate('/register')}>Sign up</span></p>
        </div>

        

      </div>
    </div>
  );
}

export default LoginPage;
