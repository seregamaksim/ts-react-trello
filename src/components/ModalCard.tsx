import { useEffect } from 'react';

export default function ModalCard(props: {
  dataCard: any;
  isOpen: boolean;
  setIsOpenCard: (arg: boolean) => void;
}) {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        activeModal?.classList.remove('active');
        props.setIsOpenCard(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);
  return (
    <div className={props.isOpen ? 'modal active' : 'modal'}>
      <div className="modal__wrapper">{props.dataCard.title}</div>
    </div>
  );
}
