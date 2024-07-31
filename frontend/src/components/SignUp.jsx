import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const userInputData = {
        username: username,
        password: password,
      };

      console.log(JSON.stringify(userInputData));

      const { data } = await axios.post(
        "http://localhost:3969/api/users",
        { username, password },
        config
      );

      console.log(data);

      const token = data.token;
      localStorage.setItem("token", token);

      setLoading(false);
      navigate("/login");
    } catch (error) {
      alert("Signup failed :(");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md bg-light-blue rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xl">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
              className="bg-light-purple w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-dark-gray"
            />
          </div>
          <div>
            <label className="block text-xl">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="bg-light-purple w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-dark-gray"
            />
          </div>
          <div>
            <label className="block text-xl">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="bg-light-purple w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-dark-gray"
            />
          </div>
          <button className="w-full bg-dark-blue py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Register
          </button>

          <label className="flex justify-center text-dark-gray">
            Already have an account?&nbsp;
            <Link to="/login">
              <u>Sign in</u>.
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
