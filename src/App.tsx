import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import LoginModal from './components/LoginModal';

function App() {
  const [userName, setUserName] = useState<string>('');
  const localUserName = localStorage.getItem('userName');

  return (
    <>
      {!localUserName && <LoginModal setUserName={setUserName} />}
      <Board />
    </>
  );
}

export default App;
