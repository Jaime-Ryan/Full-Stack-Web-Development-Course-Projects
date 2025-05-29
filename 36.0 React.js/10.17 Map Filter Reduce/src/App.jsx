import React from "react";
import emojipedia from "./emojipedia.js";
import Entry from "./Entry.jsx";

function App() {
  // MAP EXAMPLES
  // 1. Truncate meanings to ensure consistent card heights (main requirement)
  const truncatedEmojipedia = emojipedia.map(function(emojiTerm) {
    return {
      ...emojiTerm,
      meaning: emojiTerm.meaning.length > 100 
        ? emojiTerm.meaning.substring(0, 100) + "..." 
        : emojiTerm.meaning
    };
  });

  // 2. Create an array of just the emoji characters (Map example)
  const emojiList = emojipedia.map(function(emojiTerm) {
    return emojiTerm.emoji;
  });

  // 3. Transform to uppercase names (Map example)
  const uppercaseNames = emojipedia.map(function(emojiTerm) {
    return emojiTerm.name.toUpperCase();
  });

  // FILTER EXAMPLES
  // 1. Filter entries with longer meanings
  const longMeanings = emojipedia.filter(function(emojiTerm) {
    return emojiTerm.meaning.length > 150;
  });

  // 2. Filter entries with specific words
  const celebrationEmojis = emojipedia.filter(function(emojiTerm) {
    return emojiTerm.meaning.toLowerCase().includes("celebrate") || 
           emojiTerm.meaning.toLowerCase().includes("party");
  });

  // REDUCE EXAMPLES
  // 1. Total character count of all meanings
  const totalCharacters = emojipedia.reduce(function(accumulator, emojiTerm) {
    return accumulator + emojiTerm.meaning.length;
  }, 0);

  // 2. Average meaning length
  const averageMeaningLength = Math.round(totalCharacters / emojipedia.length);

  // 3. Longest emoji name
  const longestName = emojipedia.reduce(function(longest, current) {
    return current.name.length > longest.length ? current.name : longest;
  }, "");

  // 4. Create a concatenated string of all emoji names
  const allNamesString = emojipedia.reduce(function(accumulator, emojiTerm, index) {
    return accumulator + emojiTerm.name + (index < emojipedia.length - 1 ? ", " : "");
  }, "");

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      
      <div className="stats">
        <div className="stat-group">
          <h3>Basic Stats</h3>
          <p>Total entries: {emojipedia.length}</p>
          <p>Long meanings: {longMeanings.length}</p>
          <p>Celebration emojis: {celebrationEmojis.length}</p>
        </div>
        
        <div className="stat-group">
          <h3>Text Analysis</h3>
          <p>Total characters: {totalCharacters}</p>
          <p>Average length: {averageMeaningLength}</p>
          <p>Longest name: "{longestName}"</p>
        </div>
        
        <div className="stat-group">
          <h3>Emojis Only</h3>
          <p style={{ fontSize: '2rem' }}>{emojiList.join(' ')}</p>
        </div>
      </div>

      <div className="method-examples">
        <h2>Map/Filter/Reduce Examples</h2>
        
        <div className="example-section">
          <h3>📝 MAP: Uppercase Names</h3>
          <p>{uppercaseNames.join(" • ")}</p>
        </div>
        
        <div className="example-section">
          <h3>🔍 FILTER: Long Meanings (&gt;150 chars)</h3>
          <p>{longMeanings.map(emoji => emoji.emoji).join(" ")} ({longMeanings.length} found)</p>
        </div>
        
        <div className="example-section">
          <h3>🧮 REDUCE: All Names Combined</h3>
          <p>{allNamesString}</p>
        </div>
      </div>

      <dl className="dictionary">
        {truncatedEmojipedia.map(function(emojiTerm) {
          return (
            <Entry
              key={emojiTerm.id}
              emoji={emojiTerm.emoji}
              name={emojiTerm.name}
              meaning={emojiTerm.meaning}
            />
          );
        })}
      </dl>
    </div>
  );
}

export default App; 