# ES6 Destructuring with React 19

This project has been successfully updated to React 19.1.0 and demonstrates ES6 destructuring concepts.

## What's New

### React 19 Updates
- **Updated React**: Upgraded from React 18.2.0 to React 19.1.0
- **Modern API**: Using `createRoot` instead of deprecated `ReactDOM.render`
- **Performance Improvements**: Benefits from React 19's enhanced performance and features

### ES6 Destructuring Challenge Completed
The project now demonstrates several ES6 destructuring patterns:

1. **Array Destructuring**: `const [honda, tesla] = cars;`
2. **Object Destructuring with Renaming**: `const { model: hondaModel } = honda;`
3. **Nested Destructuring**: `const { speedStats: { topSpeed: hondaTopSpeed } } = honda;`
4. **Array Element Destructuring**: `const { coloursByPopularity: [hondaTopColour] } = honda;`

## Key Features

- Extracts car data using modern ES6 destructuring syntax
- Displays car statistics in a clean table format
- Uses React 19's latest rendering APIs
- Demonstrates complex nested destructuring patterns

## How to Run

```bash
npm install
npm start
```

The application will start on http://localhost:3000 and display a table with:
- Car models (Tesla Model 3, Honda Civic)
- Top speeds (150, 140)
- Most popular colors (red, black)

## Learning Objectives

This project teaches:
- ES6 destructuring assignment
- Object and array destructuring
- Nested destructuring patterns
- React 19 modern APIs
- Component rendering with extracted data 