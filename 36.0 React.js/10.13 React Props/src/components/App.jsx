import React from "react";
import Card from "./Card";
import contacts from "../data/contacts";

function App() {
  return (
    <div>
      <h1>My Contacts</h1>
      <div className="contacts-container">
        {contacts.map(contact => (
          <Card
            key={contact.id}
            name={contact.name}
            img={contact.img}
            tel={contact.tel}
            email={contact.email}
          />
        ))}
      </div>
    </div>
  );
}

export default App; 