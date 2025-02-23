import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({ getAllNotes, noteData, type, onClose,showToastMessages }) => {
  const [title, setTitle] = useState(noteData?.title||"");
  const [content, setContent] = useState(noteData?.content||"");
  const [tags, setTags] = useState(noteData?.tags||[]);
  const [error, setError] = useState(null);

const addNewNote = async () => {
  try {
    console.log("Sending Data:", { title, tags, content }); // ✅ Debugging

    const response = await axiosInstance.post("/api/notes/add-note", {
      title,
      tags,
      content,
    });

    console.log("Server Response:", response.data); // ✅ Debugging

    if (response.data && response.data.note) {
      showToastMessages("Note Added Successfully")
      getAllNotes();
      onClose();
    }
  } catch (error) {
    console.error("Error in addNewNote:", error.response?.data || error);
    
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    }
  }
};

const editNote = async () => {
  try {
    const noteId = noteData._id;
    
    console.log("Editing Note:", { noteId, title, tags, content });

    const response = await axiosInstance.put(`/api/notes/edit-note/${noteId}`, {
      title,
      tags,
      content,
    });

    console.log("Server Response:", response.data); 

    if (response.data && response.data.note) {
      showToastMessages("Note Updated Successfully")

      getAllNotes();
      onClose();
    }
  } catch (error) {
    console.error("Error in editNote:", error.response?.data || error);
    
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    }
  }
};


  const handleAddNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content can't be empty");
      return;
    }

    setError(null);
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative border-none ">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-200" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Description"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs  mt-2">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit"?"UPDATE":"ADD"}
      </button>
    </div>
  );
};

export default AddEditNote;
