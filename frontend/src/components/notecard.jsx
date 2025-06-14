import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const notecard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-gray-50 p-4 rounded shadow border-r-amber-300">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            onEdit(note);
          }}
        >
          <FaEdit className="text-blue-900 size-5" />
        </button>
        <button onClick={() => deleteNote(note._id)}>
          <FaTrash className="text-red-600 size-5" />
        </button>
      </div>
    </div>
  );
};

export default notecard;
