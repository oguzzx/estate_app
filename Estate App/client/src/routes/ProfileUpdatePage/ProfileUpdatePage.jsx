import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const { updateUser, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.put(`/users/${currentUser._id}`, {
        username,
        email,
        password,
        avatar,
      });
      updateUser(response.data);
      setLoading(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button>
            {loading ? (
              <PropagateLoader
                color="#36d7b7"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              "Update"
            )}
          </button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dtrldrfrb",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
