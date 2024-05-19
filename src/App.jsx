import { useState } from 'react';
import './App.css';
import Note from './components/Note';
import Popup from './components/Popup';
import Modal from './components/Modal';
import VideoPlayer from './components/VideoPlayer';
import { useBoundStore } from './store/store';
import { Toaster } from 'react-hot-toast';



function App() {
  const [openPopup,setOpenPopup] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const [edit,setEdit] = useState(false);
  const [played,setPlayed] = useState(0);
  const [video,setVideo] = useState("");
  const [skip,setSkip] = useState(false);
  const notes = useBoundStore(state => state.notes);

  const openNoteModal = () => {
    setEdit(false);
    setOpenModal(true);
  }

  const filteredNotes = notes.filter(note => note.videoId === video);

  const displayNotes = filteredNotes.map(note => (
    <Note 
    key = {note.noteId} 
    setOpenPopup = {setOpenPopup} 
    data = {note} 
    setPlayed = {setPlayed} 
    setOpenModal = {setOpenModal} 
    setEdit = {setEdit}
    setSkip = {setSkip}
    />
  ))
  
  return (
    <main>
      <Toaster />
      <h1 className="mb-5 text-[2rem] font-semibold">Video Player With Notes</h1>
      <div className = "flex flex-wrap items-center w-full gap-5 my-5">
        <input className = " w-[30%] min-w-[200px] border-2 border-[#475467] p-2 rounded-lg" placeholder = "Enter video id or url" value = {video} onChange = {(e) => {setVideo(e.target.value)}}/>  
        <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-gray-200" onClick = {() => {setVideo("tXlZCW26bto")}}>
          Default Video
        </button>
      </div>
      <VideoPlayer played = {played} setPlayed = {setPlayed} video = {video} skip = {skip} setSkip={setSkip}/>
      <section className= "my-5 p-5 border-2 border-[#EAECF0] rounded-xl">
        <div className = "flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className= "font-bold text-[1.5rem]">My notes</h3>
            <p className= "text-[#475467]">All your notes at a single place. Click on any note to go to specific timestamp in the video.</p>
          </div>
          <button className = "border-2 border-[#EAECF0] p-2 rounded-lg flex gap-2 items-center hover:bg-gray-200" onClick={openNoteModal}>
            <span className = "w-6 h-6 rounded-full border-2 border-[#667085] text-[#667085] flex items-center justify-center">+</span>
            <span className = "ml-auto font-semibold text-[#667085] ">Add new note</span>
          </button> 
        </div>
        <hr className = "my-5 bg-[#EAECF0]"/>
        <div>
            {displayNotes}
        </div>
        {openPopup && <Popup setOpenPopup = {setOpenPopup}/>}
      </section>
      {openModal && <Modal setOpenModal={setOpenModal} timestamp = {played} edit = {edit} video = {video}/>}
    </main>
  );
}


export default App
