// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root"));
root.render(
    <div>
        <h1>Hello World!</h1>
        <p>This is a paragraph</p>
    </div>
);