import { useEffect } from 'react';

export default function ModalCard(props: {
  // dataCard: {
  //   id: number;
  //   title: string;
  //   columnTitle: string;
  // } | null;
  // isOpen: boolean;
  // setIsOpenCard: (arg: boolean) => void;
}) {
  // useEffect(() => {
  //   const closeModal = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       const activeModal = document.querySelector('.modal.active');
  //       activeModal?.classList.remove('active');
  //       props.setIsOpenCard(false);
  //     }
  //   };

  //   window.addEventListener('keydown', closeModal);
  //   return () => window.removeEventListener('keydown', closeModal);
  // }, []);

  return (
    // <div className={props.isOpen ? 'modal active' : 'modal'}>
    <div className="modal">
      <div className="modal__wrapper">
        <div>
          {/* <h2>{props.dataCard?.title}</h2>
          <p>{`Inside a column ${props.dataCard?.columnTitle}`}</p> */}
        </div>
        <hr />
        <div>
          <p>Description:</p>
        </div>
        <hr />
        <div>
          <p>Comments:</p>

          <div></div>
        </div>
      </div>
    </div>
  );
}
