# Emojipedia - Map/Filter/Reduce Demo

A React 19 application demonstrating the power of JavaScript's Map, Filter, and Reduce array methods through an interactive emoji dictionary.

## 🚀 What's New in React 19

This project has been updated to **React 19.1.0**, the latest stable version, featuring:

- ✅ Updated to React 19.1.0 and React DOM 19.1.0
- ✅ Modern `createRoot` API instead of deprecated `ReactDOM.render`
- ✅ Enhanced performance and developer experience
- ✅ Future-ready codebase

## 📚 Map/Filter/Reduce Learning Objectives

This application demonstrates practical use cases of JavaScript's most powerful array methods:

### 🗺️ **MAP** Examples
1. **Text Truncation**: Truncate emoji meanings to exactly 100 characters for consistent card heights
2. **Data Transformation**: Extract just emoji characters into a simple array
3. **String Manipulation**: Convert all emoji names to uppercase

### 🔍 **FILTER** Examples
1. **Content Filtering**: Find emojis with meanings longer than 150 characters
2. **Keyword Filtering**: Filter emojis containing celebration-related words

### 🧮 **REDUCE** Examples
1. **Aggregation**: Calculate total character count across all meanings
2. **Statistics**: Compute average meaning length
3. **String Building**: Concatenate all emoji names into a single string
4. **Comparison**: Find the longest emoji name

## 🛠️ Installation & Setup

```bash
# Clone or navigate to the project directory
cd "10.17 Map Filter Reduce"

# Install dependencies (React 19 and latest packages)
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure

```
10.17 Map Filter Reduce/
├── src/
│   ├── App.jsx          # Main component with Map/Filter/Reduce logic
│   ├── Entry.jsx        # Individual emoji card component
│   ├── emojipedia.js    # Emoji data source
│   └── index.jsx        # App entry point (React 19 createRoot)
├── public/
│   └── styles.css       # Modern CSS with Grid layout and animations
├── package.json         # Updated to React 19 dependencies
└── README.md           # This file
```

## 🎨 Features

- **Consistent Card Heights**: Uses Map to truncate text ensuring all emoji cards are the same size
- **Interactive Statistics**: Real-time calculations using Reduce methods
- **Responsive Design**: Modern CSS Grid layout that adapts to any screen size
- **Smooth Animations**: Staggered fade-in animations for a polished UX
- **Educational Examples**: Clear demonstrations of each array method's use case

## 💡 Key Learning Points

### Map Method Usage
```javascript
// Truncate meanings for consistent card heights
const truncatedEmojipedia = emojipedia.map(function(emojiTerm) {
  return {
    ...emojiTerm,
    meaning: emojiTerm.meaning.length > 100 
      ? emojiTerm.meaning.substring(0, 100) + "..." 
      : emojiTerm.meaning
  };
});
```

### Filter Method Usage
```javascript
// Filter entries with longer meanings
const longMeanings = emojipedia.filter(function(emojiTerm) {
  return emojiTerm.meaning.length > 150;
});
```

### Reduce Method Usage
```javascript
// Calculate total character count
const totalCharacters = emojipedia.reduce(function(accumulator, emojiTerm) {
  return accumulator + emojiTerm.meaning.length;
}, 0);
```

## 🌟 Why This Matters

Understanding Map, Filter, and Reduce is crucial for modern JavaScript development:

- **Map**: Transform data without mutating the original array
- **Filter**: Create new arrays containing only elements that meet criteria
- **Reduce**: Accumulate values or transform arrays into single values

These methods enable functional programming patterns and cleaner, more readable code.

## 🚀 Next Steps

1. Try adding your own emoji entries to `emojipedia.js`
2. Experiment with different Map transformations
3. Create new Filter criteria
4. Build complex Reduce operations

## 📝 Notes

- This project uses React 19's latest features and best practices
- Console output shows additional Map/Filter/Reduce examples
- All styling uses modern CSS Grid and Flexbox for responsive design
- Accessibility features included (ARIA labels, semantic HTML) 