import { forwardRef } from "react";

export default forwardRef(function AreaText(
  { className, type = "text", id, label, labelRequired, ...props },
  ref,
) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id}>
          {label} {labelRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        {...props}
        type={type}
        className={`resize-none rounded-md border-[1px] border-gray-200 bg-[#f1f1f1] px-4 py-2 text-base transition-all duration-300 ease-in-out focus:bg-white focus:ring-0 focus:outline-0 ${className}`}
        name={id}
        ref={ref}
        id={id}
      ></textarea>
    </div>
  );
});
