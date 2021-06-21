import React, { useState } from 'react';
import Board from './components/Board';
import LoginModal from './components/LoginModal';

function App() {
  const [userName, setUserName] = useState('');
  const localUserName = localStorage.getItem('userName');
  return (
    <>
      {(localUserName || userName) && <h1>{localUserName || userName}</h1>}

      <LoginModal setUserName={setUserName} />
      <Board />
    </>
  );
}

export default App;
