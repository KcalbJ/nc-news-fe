import Modal from "react-modal";

function DeletePopup({ isOpen, onRequestClose, onConfirm }) {
    return (
        <Modal className="text-center bg-white h-56 w-64   mx-auto mt-60 rounded p-4 border-slate-400 border-2  border-solid"
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Delete Confirmation"
        >
            <div>
            <p className="mt-8">Are you sure you want to delete this comment?</p>
          <button className="bg-red-400 text-white px-4 py-2  mt-8 rounded mr-2"onClick={onConfirm}>Yes</button>
          <button className="bg-gray-500 text-white px-4 py-2  rounded"onClick={onRequestClose}>No</button>
            </div>
        
        </Modal>
      );
    }

export default DeletePopup