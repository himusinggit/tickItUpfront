import useImagePreview from "../hooks/ImagePreview.hook";
import { useState, forwardRef } from "react";

const ImageInput = forwardRef(
  ({ onChange, imgPrev = "", height = "150px", width = "150px", name = "avatar", ...rest }, ref) => {
    const [file, setFile] = useState(null);
    const value = useImagePreview(file);

    const inputId = `image-input-${name}`;

    const handleChange = (e) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      setFile(selectedFile);
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-2 items-start">
        <input
          id={inputId}
          name={name}
          type="file"
          className="hidden"
          ref={ref}
          {...rest}
          onChange={handleChange}
        />

        <label
          htmlFor={inputId}
          className="group flex justify-center items-center relative bg-[rgb(250,250,250)] rounded-lg overflow-hidden cursor-pointer"
          style={{ height, width: "100%" }}
        >
          <div className="absolute flex justify-center items-center w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.6)] rounded-lg transition">
            <p className="text-white text-sm">
              {!value ? `Upload ${name} image` : `Change ${name}`}
            </p>
          </div>

          <img
            src={value || "/noAvatar.png"}
            className={`border-2 object-cover ${imgPrev}`}
            style={{ height: "100%", width: width }}
            alt={`${name} preview`}
          />
        </label>
      </div>
    );
  }
);

export default ImageInput;