import useImagePreview from "../hooks/ImagePreview.hook";
import { useState } from "react";
import { forwardRef } from "react";
const ImageInput=forwardRef(
    (
    {onChange,imgPrev,height,width,name,...rest},
    ref
    )=>{
        const [file,setFile]=useState(null);
        const value=useImagePreview(file);
        return(
            <>
                <div className="flex flex-col gap-2 items-start">
                    <input id="avatar" name={name} className="hidden" type="file" ref={ref} {...rest} onChange={(e)=>{
                        setFile(e.target.files[0]);
                        onChange&&onChange(e);
                        }} />
                    <label htmlFor="avatar" className={`group flex justify-center items-center relative w-full h-${height} bg-[rgb(250,250,250)] rounded-lg`}>
                    <div className={`absolute justify-center items-center flex h-${height} opacity-0 w-full group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.6)] rounded-lg`}>
                        <p className="text-white">{!value?"upload " +name+" image":"change "+name}</p>
                    </div>
                    <img src={value?value:"/noAvatar.png"} className={`border-2  ${imgPrev} h-${height} w-${width}`} alt="" /></label>
                </div>
            </>
        )
    }
);
export default ImageInput;