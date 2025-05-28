import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import contacts from '../../contacts';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'My Contacts'
    );
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(screen.getByText('Connect with your network')).toBeInTheDocument();
  });

  it('renders all contact cards', () => {
    render(<App />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(contacts.length);
  });

  it('displays the correct total contacts count', () => {
    render(<App />);
    expect(
      screen.getByText(`Total Contacts: ${contacts.length}`)
    ).toBeInTheDocument();
  });

  it('renders contact names correctly', () => {
    render(<App />);
    contacts.forEach((contact) => {
      expect(screen.getByText(contact.name)).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.app-container')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('contacts-grid');
  });
});
