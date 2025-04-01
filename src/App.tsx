import React, { useState } from 'react';
import { BarChart2, Send, ArrowRight, Lock } from 'lucide-react';
import Chat from './components/Chat';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Chat />
    </div>
  );
}

export default App;