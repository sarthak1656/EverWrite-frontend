import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import AddNoteImg from "../../assets/add-note-svg.svg";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessaage, setShowToastMessaage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users/get-user");
      if (response.data) setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/get-all-notes");
      if (response.data?.notes) setAllNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete(`/api/notes/delete-note/${data._id}`);
      if (response.data && !response.data.error) {
        setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== data._id));
        showToastMessages("Note Deleted Successfully", "delete");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/api/notes/search-note", { params: { query } });
      setIsSearch(true);
      setAllNotes(response.data?.notes || []);
    } catch (error) {
      console.error("Error searching note:", error);
      setIsSearch(true);
      setAllNotes([]);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/api/notes/update-note/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data?.note) {
        showToastMessages("Note Updated Successfully", "update");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCloseSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const showToastMessages = (message, type) => {
    setShowToastMessaage({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMessaage({ isShown: false, message: "" });
  };

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleCloseSearch={handleCloseSearch} />

      <div className="container mx-auto px-4">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isplanned={item.isPinned}
                onEdit={() => setOpenAddEditModal({ isShown: true, type: "edit", data: item })}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={AddNoteImg}
            message={
              isSearch
                ? `Oops!! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts.`
            }
          />
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 fixed bottom-6 right-6 sm:right-10 sm:bottom-10 shadow-lg"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Responsive Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.5)" } }}
        className="w-[90%] sm:w-[70%] md:w-[40%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
          showToastMessages={showToastMessages}
        />
      </Modal>

      {/* Toast Messages */}
      <Toast isShown={showToastMessaage.isShown} message={showToastMessaage.message} type={showToastMessaage.type} onClose={handleCloseToast} />
    </>
  );
};

export default Home;
