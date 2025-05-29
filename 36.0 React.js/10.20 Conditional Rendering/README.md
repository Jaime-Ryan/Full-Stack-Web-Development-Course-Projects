# React Conditional Rendering Project

This project has been updated to **React 19.1.0** and demonstrates conditional rendering with a login system.

## 🚀 What's Updated

### React Version Upgrade
- **Before**: React 17.0.2
- **After**: React 19.1.0
- Updated from deprecated `ReactDOM.render` to modern `createRoot` API

### New Components

#### 1. **Input Component** (`src/components/Input.jsx`)
A reusable input component that accepts:
- `type` - Input type (default: "text")
- `placeholder` - Placeholder text
- `value` - Current value
- `onChange` - Change handler
- `...props` - Any additional props (name, required, etc.)

#### 2. **Login Component** (`src/components/Login.jsx`)
A complete login form component featuring:
- **State Management**: Uses React hooks (`useState`) for form data and login status
- **Conditional Rendering**: Shows different UI based on login state
- **Form Validation**: Basic validation for username and password
- **Modern React Patterns**: Uses controlled components and event handling

## 🎯 Features

### Conditional Rendering Demo
The app demonstrates conditional rendering by showing:
- **Login Form**: When user is not logged in
- **Welcome Message**: When user is successfully logged in
- **Logout Functionality**: Button to return to login state

### Modern React Patterns
- ✅ React 19.1.0 with `createRoot` API
- ✅ Functional components with hooks
- ✅ Controlled components
- ✅ Props destructuring and spread operator
- ✅ Event handling
- ✅ State management with `useState`

## 🛠️ Installation & Usage

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5174/` to view the application.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── App.jsx          # Main app component
│   ├── Login.jsx        # Login form with conditional rendering
│   └── Input.jsx        # Reusable input component
└── index.jsx            # Entry point with React 19 createRoot API

public/
├── styles.css           # Updated styling with new classes
└── index.html           # HTML template
```

## 🎨 Styling

The project includes modern CSS with:
- Responsive design
- Smooth transitions and hover effects
- Glass-morphism effects for inputs
- Consistent color scheme
- Custom logout button styling

## 🧪 Testing the Login

1. Enter any username and password
2. Click "Login" button
3. See the conditional rendering in action:
   - Form disappears
   - Welcome message appears
   - Logout button is shown
4. Click "Logout" to return to the login form

## 🔧 Technical Notes

### React 19 Migration Changes
- **Before**: `ReactDOM.render(<App />, document.getElementById('root'))`
- **After**: 
  ```jsx
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
  ```

### Component Architecture
- **Separation of Concerns**: Input component handles display, Login component handles logic
- **Reusability**: Input component can be reused throughout the application
- **Modern Patterns**: Uses latest React patterns and best practices

## 📈 Future Enhancements

- Add real authentication with a backend API
- Implement form validation with error messages
- Add loading states during login process
- Include TypeScript for better type safety
- Add unit tests with React Testing Library 