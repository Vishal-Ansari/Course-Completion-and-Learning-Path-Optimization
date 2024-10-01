// pages/Register.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making the request
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          email,
          password,
          name,
          // Role is not sent; defaults to "employee" in the backend
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle error response from the server
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;






