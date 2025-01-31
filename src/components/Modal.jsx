import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#272829]/80 flex items-center justify-center z-50">
      <div className="bg-[#61677A] text-white rounded-lg p-6 w-full max-w-md m-4 border-2 border-white/20 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ fontFamily: "'PT Sans', sans-serif" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
