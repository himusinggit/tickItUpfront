import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      className = "",
      error,
      required = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-md border text-sm outline-none transition-colors
            ${error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white text-gray-900"}
            ${className}
          `}
          {...rest}
        />

        {error && (
          <p className="text-xs text-red-500 mt-0.5">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;