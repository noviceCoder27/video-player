import { toastError } from "./toast";

export const checkContent = (content) => {
    if(!content) {
        toastError("Enter some content");
        return false;
    } 
    return true;
}