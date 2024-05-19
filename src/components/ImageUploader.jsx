import { useBoundStore } from "../store/store";


const ImageUploader = () => {

    const setImage = useBoundStore(state => state.setImage)
    
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImage(reader.result);
      };
  
      reader.readAsDataURL(file);
    };
    return (
        <>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mr-auto"/>
        </>
        
    )
}

export default ImageUploader
