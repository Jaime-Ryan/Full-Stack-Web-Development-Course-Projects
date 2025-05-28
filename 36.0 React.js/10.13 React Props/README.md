# React Props - Contact Cards

This project has been updated to **React 19** and refactored to use modern React patterns with reusable card components.

## 🚀 What's New

### React 19 Upgrade
- ✅ Updated from React 17 to React 19
- ✅ Migrated from `ReactDOM.render()` to `createRoot()` API
- ✅ Updated TypeScript types to React 19

### Modern Component Architecture
- ✅ Created reusable `Card` component with props
- ✅ Separated `App` component following React best practices
- ✅ Organized components in dedicated `components/` folder
- ✅ Extracted contact data into structured `data/` folder
- ✅ Implemented responsive card layout
- ✅ Added modern CSS styling with hover effects

## 📁 Project Structure

```
src/
├── index.jsx              # Entry point with React 19 createRoot API
├── index.css              # Global styles
├── components/
│   ├── App.jsx            # Main App component
│   └── Card.jsx           # Reusable card component
└── data/
    └── contacts.js        # Contact data (separated for better organization)
```

## 🎨 Features

- **Responsive Design**: Cards adapt to different screen sizes
- **Modern UI**: Gradient background, card shadows, and hover effects
- **Component Reusability**: Single Card component used for all contacts
- **Props-based**: Each card receives name, image, phone, and email as props

## 🏃‍♂️ Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Contact Data Structure

Each contact is represented as an object with the following properties:

```javascript
{
  id: number,
  name: string,
  img: string,
  tel: string,
  email: string
}
```

## 🎯 Key React Concepts Demonstrated

1. **Props**: Passing data from parent to child components
2. **Component Reusability**: One Card component for multiple contacts
3. **Array Mapping**: Rendering lists of components
4. **Modern React**: Using React 19's createRoot API
5. **CSS Modules**: Styling components with modern CSS

Visit `http://localhost:5173/` to see the application in action! 