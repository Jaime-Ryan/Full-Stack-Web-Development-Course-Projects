import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../Card';

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

const mockContact = {
  id: 1,
  name: 'John Doe',
  img: 'https://example.com/avatar.jpg',
  tel: '+1234567890',
  email: 'john@example.com',
};

describe('Card Component', () => {
  beforeEach(() => {
    mockLocation.href = '';
  });

  it('renders contact information correctly', () => {
    render(<Card {...mockContact} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Card {...mockContact} />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'contact-1');

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('id', 'contact-1');
  });

  it('renders avatar with correct alt text', () => {
    render(<Card {...mockContact} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('alt', "John Doe's profile picture");
    // Note: src might be null initially due to loading state
  });

  it('makes phone number clickable', () => {
    render(<Card {...mockContact} />);

    const phoneButton = screen.getByRole('button', { name: /phone number/i });
    fireEvent.click(phoneButton);

    expect(mockLocation.href).toBe('tel:+1234567890');
  });

  it('makes email address clickable', () => {
    render(<Card {...mockContact} />);

    const emailButton = screen.getByRole('button', { name: /email address/i });
    fireEvent.click(emailButton);

    expect(mockLocation.href).toBe('mailto:john@example.com');
  });

  it('supports keyboard navigation', () => {
    render(<Card {...mockContact} />);

    const phoneButton = screen.getByRole('button', { name: /phone number/i });
    fireEvent.keyDown(phoneButton, { key: 'Enter' });

    expect(mockLocation.href).toBe('tel:+1234567890');
  });

  it('has proper CSS classes', () => {
    render(<Card {...mockContact} />);

    expect(screen.getByRole('article')).toHaveClass('card');
    expect(screen.getByText('John Doe')).toHaveClass('name');
  });

  it('displays icons for contact methods', () => {
    render(<Card {...mockContact} />);

    expect(screen.getByText('📞')).toBeInTheDocument();
    expect(screen.getByText('✉️')).toBeInTheDocument();
  });
});
