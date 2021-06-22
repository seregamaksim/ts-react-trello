import { useEffect, useState } from 'react';

export default function LoginModal(props: {
  setUserName: (val: string) => void;
}) {
  const [inputNameVal, setInputNameVal] = useState<string>('');

  function submitForm(e: React.SyntheticEvent): void {
    e.preventDefault();
    props.setUserName(inputNameVal);
    localStorage.setItem('userName', inputNameVal);
    setInputNameVal('');
  }
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        activeModal?.classList.remove('active');
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);
  return (
    <div className="modal active">
      <div className="modal__wrapper">
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={inputNameVal}
            onChange={(e) => setInputNameVal(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
