import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({note,setNote}) => {

  function handleChange(e) {
    setNote(prev => ({...prev,content:e}))
  }


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], 
      [{ 'color': [] }],               
    ]
  };

  
  
  return (
    <ReactQuill 
    theme="snow" 
    value={note.content} 
    onChange={handleChange} 
    modules = {modules} 
    className = "h-full mb-10" />
  ) 
}

export default TextEditor;