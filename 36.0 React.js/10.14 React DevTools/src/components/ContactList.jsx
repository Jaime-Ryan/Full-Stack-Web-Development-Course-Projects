import React from "react";
import Card from "./Card";

function ContactList({ contacts }) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="no-contacts">
        <p>No contacts available</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <Card
          key={contact.id}
          name={contact.name}
          img={contact.imgURL}
          tel={contact.phone}
          email={contact.email}
        />
      ))}
    </div>
  );
}

export default ContactList; 