import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the request starts
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
        "http://localhost:3969/api/users/login",
        userInputData,
        config
      );

      const token = data.token;
      localStorage.setItem("token", token);

      console.log(data);
      setLoading(false);
      if (data) {
        navigate("/contacts");
      } else {
        alert("Login failed :(");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed :("); // Display error message to the user
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md bg-light-blue rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-dark-blue py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
