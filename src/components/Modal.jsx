import { useState } from "react"
import { useBoundStore } from './../store/store';
import { useEffect } from "react";
import { checkContent } from "../utils/validate";
import { toastSuccess } from "../utils/toast";
import ImageUploader from "./ImageUploader";
import TextEditor from "./TextEditor";


const Modal = ({setOpenModal,timestamp,edit,video}) => {
  const noteId = useBoundStore(state => state.currentNodeId);
  const getNote = useBoundStore(state => state.getNote);
  const noteDetails = useBoundStore(state => state.note);
  const updateNote = useBoundStore(state => state.updateNote);
  const [note,setNote] = useState({date: "", timestamp, content: "",image: null});
  const [chosenImg,setChosenImg] = useState(false);

  useEffect(() => {
    if(edit) {
      getNote(noteId);
      setNote(noteDetails);
    }
  },[noteId,noteDetails]);
  const addNote = useBoundStore(state => state.addNote);
  const image = useBoundStore(state => state.image);

  const createNote = () => {
    if(checkContent(note.content)) {
      const noteObj = chosenImg ? {...note,date: new Date(),image}: {...note,date: new Date(),image: null};
      addNote(noteObj,video);
      setOpenModal(false);
      toastSuccess("Note Added");
    } 
  }
  const updateNoteDetails = () => {
    if(checkContent(note.content)) {
      updateNote(noteId,note);
      setOpenModal(false);
      toastSuccess("Note Updated");
    }
  }

  return (
    <>
      <div className = "fixed top-0 bottom-0 left-0 w-full bg-black opacity-50" onClick={() => setOpenModal(false)}></div>
      <div className = "fixed w-[60vw] p-5 bg-white h-[350px] rounded-lg text-center flex flex-col min-w-[250px] max-w-[600px] top-[15rem] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <h3 className = "mr-auto mt-2 mb-3 text-[1.5rem] font-semibold">Note Content</h3>
        <TextEditor note = {note} setNote = {setNote}/>
        <div className="flex w-full gap-2 my-5 max-md:flex-wrap itmems-center">
          {!edit && <ImageUploader setChosenImg = {setChosenImg}/>}
          <button className = " max-md:ml-0 ml-auto border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-green-200" onClick = {edit? updateNoteDetails: createNote}>
            {edit ? "Update Note" : "Add Note" }
          </button>
          <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-gray-200" onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default Modal
