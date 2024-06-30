import logo from './logo.svg';
import './index.css';
import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-markup';

function App() {
  const [code, setCode] = useState(
    `<!-- Write your HTML code here -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Sample HTML</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>`
  );

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleClear = () => {
    setCode('');
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRun = () => {
    const iframe = document.getElementById('output-frame');
    iframe.srcdoc = code;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} className="h-10" alt="logo" />
          <h1 className="text-2xl font-bold">HTML Editor</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div className="flex flex-col items-center">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-64 p-4 mb-4 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              spellCheck="false"
            />
            <div className="flex space-x-4">
              <button onClick={handleClear} className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none">Clear</button>
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none">Save</button>
              <button onClick={handleRun} className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">Run</button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full h-full">
            <div className="w-full h-full bg-gray-200 rounded-md p-4 shadow-md">
              <iframe
                id="output-frame"
                title="Output"
                className="w-full h-full bg-white rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} HTML Editor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
