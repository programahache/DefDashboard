import React from 'react'

function Modals({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modals