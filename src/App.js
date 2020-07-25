import React from 'react';
import './App.css';

import ArraySort from './ArraySort/ArraySort.js';

function App() {
    return (
        <div className="App">
            <ArraySort length={150} maxNum={1000} minNum={10} />
        </div>
    );
}

export default App;
