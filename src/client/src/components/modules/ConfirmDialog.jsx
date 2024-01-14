const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="bg-green-300 p-1 rounded shadow-lg fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 w-64 h-40">
        <div className="text-center text-black">
          <p className="text-xs mb-4 text-black font-bold">{message}</p>
          <button 
            onClick={onConfirm} 
            className="bg-red-500 text-white py-1 px-1 rounded mr-1 text-xs"
          >
            Delete
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 text-black py-1 px-1 rounded text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  
export default ConfirmDialog;
