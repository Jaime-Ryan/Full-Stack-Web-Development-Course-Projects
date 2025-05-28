import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';

// React 19 with createRoot API
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

// Development setup instructions:
// 1. npm install - to install dependencies
// 2. npm run dev - to start development server
// 3. npm test - to run tests
// 4. npm run build - to build for production
