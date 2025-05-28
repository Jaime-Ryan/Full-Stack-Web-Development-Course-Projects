import { StrictMode } from 'react';
import Card from './Card';
import contacts from '../contacts';

/**
 * Main App component that renders a list of contact cards
 * Uses modern React 19 patterns and proper data mapping
 */
function App() {
  return (
    <StrictMode>
      <div className="app-container">
        <header className="app-header">
          <h1 className="heading">My Contacts</h1>
          <p className="subtitle">Connect with your network</p>
        </header>

        <main className="contacts-grid">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              id={contact.id}
              name={contact.name}
              img={contact.imgURL}
              tel={contact.phone}
              email={contact.email}
            />
          ))}
        </main>

        <footer className="app-footer">
          <p>Total Contacts: {contacts.length}</p>
        </footer>
      </div>
    </StrictMode>
  );
}

export default App;
