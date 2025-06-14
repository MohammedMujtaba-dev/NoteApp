import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import NoteModel from "../components/notemodel.jsx";
import axios from "axios";
import Notecard from "../components/notecard.jsx";
import { toast } from "react-toastify";

const Home = () => {
  const [IsModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setcurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const closeModel = () => {
    setModelOpen(false);
  };

  const fetchNote = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Added");
        closeModel();
        fetchNote();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (note) => {
    setcurrentNote(note);
    setModelOpen(true);
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Updated");
        closeModel();
        fetchNote();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Deleted");
        fetchNote();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar setQuery={setQuery} clearNotes={() => setNotes([])} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 px-8 pt-5 gap-5 ">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            return (
              <Notecard
                key={note._id}
                note={note}
                onEdit={onEdit}
                deleteNote={deleteNote}
              />
            );
          })
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
        onClick={() => {
          setModelOpen(true);
        }}
        className="text-5xl text-white bg-gray-700 rounded-full p-5 pb-7 fixed bottom-10 right-8 "
      >
        +
      </button>
      {IsModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </>
  );
};

export default Home;
