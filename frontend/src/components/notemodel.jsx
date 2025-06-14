import React, { useEffect, useState } from "react";

const NoteModel = ({ closeModel, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };
  return (
    <div className="absolute inset-0  bg-pink-300 opacity-80 flex justify-center items-center ">
      <div className="bg-white p-8 rounded-2xl md:w-3xl lg:w-4xl sm:w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {currentNote ? "Edit Note" : "Add New Note"}
          </h2>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            placeholder="Note title"
            className="py-4 px-2 block mb-5 w-full outline-2 outline-gray-200 text-gray-600 rounded"
          />
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            placeholder="Note description"
            className="py-4 px-2 block w-full outline-2 outline-gray-200 text-gray-600 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-amber-700 rounded-4xl px-5 py-3 my-3 w-full hover:bg-orange-300 hover:text-black font-serif hover:font-mono text-white"
          >
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button
          onClick={closeModel}
          className="text-red-900 px-4 font-serif hover:text-white hover:rounded-4xl hover:bg-red-900 hover:px-5 py-3 w-full hover:font-mono bg-amber-200 rounded-4xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModel;
