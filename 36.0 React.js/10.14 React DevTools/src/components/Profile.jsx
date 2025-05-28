import React from "react";
import Avatar from "./Avatar";

function Profile({ profileImage, userName, title }) {
  return (
    <div className="profile-section">
      <div className="profile-avatar-container">
        <Avatar 
          img={profileImage} 
          name={userName} 
          className="profile-avatar"
        />
      </div>
      {userName && <h2 className="profile-name">{userName}</h2>}
      {title && <p className="profile-title">{title}</p>}
    </div>
  );
}

export default Profile; 