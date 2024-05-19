

export const createImageSlice = (set) => ({
    image: JSON.parse(localStorage.getItem("image")) || null,
    setImage: (url) => set(() => ({image: url}))
})