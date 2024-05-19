import { v4 as uuidv4 } from 'uuid';

export const createNotesSlice = (set) => ({
    notes: JSON.parse(localStorage.getItem("notes")) || [],
    note: null,
    currentNodeId: null,
    getNote: (id) => set(state => {
        const {notes} = state;
        const note = notes.find(noteObj => noteObj.noteId === id);
        return {note}
    }),
    addNote: (note,id) => set(state => {
        const {notes} = state;
        let noteObj = {...note,videoId: id,noteId: uuidv4()};   
        const notesStr = JSON.stringify([...notes,noteObj]);
        localStorage.setItem("notes",notesStr);
        return {notes: [...state.notes,noteObj]}
    }),
    removeNote: (id) => set(state => {
        const {notes} = state;
        const updatedNotes = notes.filter(note => note.noteId !== id);
        localStorage.setItem("notes",JSON.stringify(updatedNotes));
        return {notes: updatedNotes}
    }),
    updateNote: (id,note) => set(state => {
        const {notes} = state;
        const updatedNotes = notes.map(noteObj => noteObj.noteId === id ? note: noteObj);
        localStorage.setItem("notes",JSON.stringify(updatedNotes));
        return {notes: updatedNotes}
    }),
    updateCurrentNodeId: (id) => set(() => ({currentNodeId: id})) 
})