import { useState } from 'react';

export default function LoginModal(props: { setUserName: any }) {
  const [inputNameVal, setInputNameVal] = useState('');
  function submitForm(e: any) {
    e.preventDefault();
    props.setUserName(inputNameVal);
    localStorage.setItem('userName', inputNameVal);
    setInputNameVal('');
  }
  return (
    <div>
      <div>
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="name"
            value={inputNameVal}
            onChange={(e) => setInputNameVal(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
