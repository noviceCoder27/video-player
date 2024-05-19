import { create } from 'zustand'
import { createNotesSlice } from "./slices/notesSlice";


export const useBoundStore = create((...a) => ({
  ...createNotesSlice(...a),
}))