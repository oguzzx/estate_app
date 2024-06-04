import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import List from "../../components/List/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
function ProfilePage() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar :
              <img src={currentUser?.avatar || "/noavatar.jpg"} alt="user" />
            </span>
            <span>
              User Name: <b>{{ currentUser } && currentUser.username}</b>
            </span>
            <span>
              Email: <b>{{ currentUser } && currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
