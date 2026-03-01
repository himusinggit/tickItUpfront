import { useEffect,useState } from "react"

const useImagePreview=(file)=>{
    const [url, setUrl] = useState(null);
    useEffect(()=>{
        if(file){
            const objectURL=URL.createObjectURL(file);
            setUrl(objectURL);
            return()=>{URL.revokeObjectURL(objectURL)}
        }
    },[file]);
    return url;
}

export default useImagePreview;