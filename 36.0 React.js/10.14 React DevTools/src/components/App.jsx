import React from "react";
import Profile from "./Profile";
import ContactList from "./ContactList";
import contacts from "../contacts";

function App() {
  // Configuration data (in real apps, this might come from props, context, or API)
  const profileData = {
    profileImage: "https://preview.redd.it/theres-a-starman-v0-ctgcrtba45id1.png?auto=webp&s=a6a8b91e38125f39f5b2a8333cb86876f928471c",
    userName: "Starman",
    title: "Contact Manager"
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="heading">My Contacts</h1>
        <Profile 
          profileImage={profileData.profileImage}
          userName={profileData.userName}
          title={profileData.title}
        />
      </header>
      
      <main className="app-main">
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
}

export default App;
