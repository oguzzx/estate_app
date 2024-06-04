import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const {updateUser} = useContext(AuthContext);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(response.data);

      setIsLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError("User not found");
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button>
            {isLoading ? (
              <PropagateLoader
                color="#36d7b7"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              "Login"
            )}
          </button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
