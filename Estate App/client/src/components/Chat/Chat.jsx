import { useState } from "react";
import "./chat.scss";
function Chat() {
  const [chat, setChat] = useState(true);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
        <div className="message">
          <img
            src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="user"
          />
          <span>Jhon Doe</span>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
        </div>
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src="https:images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="user"
              />
              <span>Jhon Doe</span>
              <span className="close" onClick={() => setChat(false)}>
                X
              </span>
            </div>
          </div>
          <div className="center">
            <div className="chatMessage">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, voluptate.
              </p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, voluptate.
              </p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, voluptate.
              </p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, voluptate.
              </p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia, voluptate.
              </p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea name="" id=""></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
