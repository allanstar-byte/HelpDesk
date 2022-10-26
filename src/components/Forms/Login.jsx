import React, { useEffect, useState } from "react";
import { Label } from "../radixUI/Label";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, authenticated } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //hangle change event
  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };
  //handle submision
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(formData)).unwrap();
    } catch (err) {
      console.log("Failed to login", err);
    } finally {
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    authenticated ? navigate("/questions") : navigate("/");
  }, [authenticated]);

  return (
    <form className="sign__up" onSubmit={handleSubmit}>
      <h1>Log in and get started</h1>
      <div className="formBody">
        <span className="input_group">
          <input
            type="text"
            id="username"
            className="inputs"
            placeholder="User Name"
            value={formData?.username}
            onChange={handleChange}
          ></input>
        </span>

        <span className="input_group">
          <input
            autoComplete="new-password"
            type="password"
            id="password"
            className="inputs"
            placeholder="Password"
            value={formData?.password}
            onChange={handleChange}
          ></input>
        </span>
      </div>
      <div className="signup__footer">
        <button className="btn pry-btn" type="submit">
          LOGIN
        </button>
      </div>
      <div className="sign-up-terms">
        <p>
          Don't have an account? <br></br> <span>Sign up</span>
        </p>
      </div>
    </form>
  );
};

export default Login;
