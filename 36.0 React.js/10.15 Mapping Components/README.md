# 📇 Modern React Contacts App

A modern, accessible contact management application built with **React 19.1.0** and following 2025 best practices.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.17.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-2.1.8-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## ✨ Features

- 🚀 **React 19.1.0** with latest features and optimizations
- 🎨 **Modern UI/UX** with CSS custom properties and responsive design
- ♿ **Accessibility-first** approach with ARIA labels and keyboard navigation
- 📱 **Fully responsive** design that works on all devices
- 🧪 **Comprehensive testing** with Vitest and React Testing Library
- 🔧 **Modern tooling** with Vite, ESLint 9, and Prettier
- 🎯 **Performance optimized** with React.memo and lazy loading
- 🌙 **Dark mode support** with CSS custom properties
- 📞 **Interactive contacts** with click-to-call and click-to-email
- 🔍 **SEO-friendly** with semantic HTML structure

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.0.7
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 (Flat Config)
- **Formatting**: Prettier 3.4.2
- **Styling**: Modern CSS with Custom Properties
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "10.15 Mapping Components"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── App.jsx          # Main app component
│   ├── Card.jsx         # Contact card component
│   ├── Avatar.jsx       # Avatar component with fallback
│   └── Detail.jsx       # Contact detail component
├── test/                # Test configuration
│   └── setup.js         # Test setup file
├── contacts.js          # Contact data
└── index.css           # Global styles
```

## 🎨 Design System

The app uses a modern design system with:

- **CSS Custom Properties** for consistent theming
- **Responsive Grid Layout** with CSS Grid
- **Accessibility Features** including focus management
- **Dark Mode Support** via `prefers-color-scheme`
- **Modern Typography** with system font stack
- **Smooth Animations** with respect for `prefers-reduced-motion`

## 🧪 Testing

The project includes comprehensive tests covering:

- Component rendering
- User interactions
- Accessibility features
- Keyboard navigation
- Error handling

Run tests with:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## ♿ Accessibility

This app follows WCAG 2.1 guidelines and includes:

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- High contrast mode support
- Screen reader compatibility

## 🌟 React 19 Features Used

- **Modern JSX Transform** - No need to import React
- **Automatic Batching** - Improved performance
- **StrictMode** - Development-time checks
- **React.memo** - Component memoization
- **Modern Hooks** - useState, useCallback, memo

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- The open-source community for the excellent tooling

---

**Built with ❤️ using React 19 and modern web standards** 