import { create } from 'zustand'
import { createNotesSlice } from "./slices/notesSlice";
import { createImageSlice } from './slices/imageSlice';


export const useBoundStore = create((...a) => ({
  ...createNotesSlice(...a),
  ...createImageSlice(...a)
}))