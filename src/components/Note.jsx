import { useRef } from "react"
import { formatDate, formatTimestamp } from "../utils/parseTime"
import { useBoundStore } from "../store/store";
import parse from 'html-react-parser';


const Note = ({setOpenPopup,data,setPlayed,setOpenModal,setEdit,setSkip}) => {

  
  const noteRef = useRef(null);
  const updateCurrentNodeId = useBoundStore(state => state.updateCurrentNodeId);

  const deletePopup = () => {
     const _id = noteRef.current.id;
     updateCurrentNodeId(_id);
     setOpenPopup(true)
  }

  const editModal = () => {
    const _id = noteRef.current.id;
    updateCurrentNodeId(_id);
    setEdit(true);
    setOpenModal(true);
  }


  return (
    <div className='flex flex-col gap-3' id = {data.noteId} ref = {noteRef}>
        <div className='text-[#344054]'>
          <p className = "font-semibold ">{formatDate(data.date)}</p>
          <div className = "flex gap-2">
            <p>Timestamp: </p>
            <p className='font-semibold cursor-pointer text-violet-500' onClick={() => {
              setSkip(true);
              setPlayed(Math.floor(data.timestamp));
              }}>
              {formatTimestamp(data.timestamp)}
            </p>
          </div>
        </div>
        <div className = "border-2 border-[#EAECF0] py-2 px-5 rounded-lg">
          {data?.image && <img src = {data.image} className = "w-[20%] min-w-[200px] mb-5" />}
          <p className='text-[#344054]'>{parse(data.content)}</p>
        </div>
        <div className = "flex gap-2 ml-auto">
          <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-red-400 hover:text-white" onClick={deletePopup}>
            Delete Note
          </button>
          <button className = "border-2 border[#EAECF0] font-semibold text-[#344054] p-2 rounded-lg hover:bg-gray-200" onClick = {editModal}>Edit Note</button>
        </div>
    </div>
  )
}

export default Note
