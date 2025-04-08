
export const Modal = ({ setShouldDisplayModal, children }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <i
          className="fa-solid fa-xmark close"
          onClick={() => setShouldDisplayModal(false)}
        ></i>
        {children}
      </div>
    </div>
  );
};
