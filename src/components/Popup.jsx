import { useBoundStore } from "../store/store";
import { toastSuccess } from "../utils/toast";


const Popup = ({setOpenPopup}) => {
  const noteId = useBoundStore(state => state.currentNodeId);
  const removeNote = useBoundStore(state => state.removeNote);

  const deleteNote = () => {
    removeNote(noteId);
    setOpenPopup(false);
    toastSuccess("Note Deleted")
  }

  return (
    <>
      <div className = "fixed top-0 bottom-0 left-0 w-full bg-black opacity-50" onClick={() => setOpenPopup(false)}></div>
        <div className = "fixed w-[40vw] p-5 bg-white h-[150px] rounded-lg text-center flex flex-col min-w-[250px] max-w-[400px] top-[15rem] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <p className= "text-[#667085] font-bold text-[1.2rem]">Are you sure you want to delete the note?</p>
          <div className='flex gap-2 mt-auto ml-auto mr-auto'>
            <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-red-400 hover:text-white" onClick={deleteNote}>Delete</button>
            <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-gray-200" onClick={() => setOpenPopup(false)}>Cancel</button>
          </div>
      </div>
    </>
  )
}

export default Popup
