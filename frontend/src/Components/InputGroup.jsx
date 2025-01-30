import { forwardRef } from "react";

const InputGroup = ({ className = "", id, children, label, labelRequired }) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id}>
          {label} {labelRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex w-full text-base transition-all duration-300 ease-in-out *:first:rounded-l-md *:last:rounded-r-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

const InputGroupText = (
  { type = "text", id, className = "", ...props },
  ref,
) => {
  return (
    <input
      {...props}
      type={type}
      className={`h-full w-full flex-[1] border-[1px] border-gray-200 bg-[#f1f1f1] px-4 py-2 text-base transition-all duration-300 ease-in-out focus:bg-white focus:ring-0 focus:outline-0 ${className}`}
      ref={ref}
      name={id}
      id={id}
    />
  );
};

const InputGroupCopy = ({ value = "", id, className = "", ...props }) => {
  const onCopyHandler = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(value);
  };
  return (
    <button
      {...props}
      className={`w-fit cursor-pointer border-[1px] border-gray-200 bg-zinc-200 px-3 py-2 text-base transition-all duration-300 ease-in-out focus:ring-0 focus:outline-0 active:bg-zinc-300 ${className}`}
      name={id}
      id={id}
      onClick={onCopyHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
        />
      </svg>
    </button>
  );
};

const InputGroupSelect = ({ id, children, className = "", ...props }) => {
  return (
    <select
      {...props}
      className={`flex-[.2] cursor-pointer border-[1px] border-gray-200 bg-zinc-200 px-4 py-2 text-base transition-all duration-300 ease-in-out focus:ring-0 focus:outline-0 ${className}`}
      name={id}
      id={id}
    >
      {children}
    </select>
  );
};

const InputGroupOption = ({
  value = "",
  id,
  children,
  className = "",
  ...props
}) => {
  return (
    <option
      {...props}
      className={`rounded-md border-[1px] border-gray-200 bg-[#f1f1f1] px-4 py-2 text-base transition-all duration-300 ease-in-out focus:bg-white focus:ring-0 focus:outline-0 ${className} ${value && "bg-white"}`}
      name={id}
      value={value}
      id={id}
    >
      {children}
    </option>
  );
};

InputGroup.Text = forwardRef(InputGroupText);
InputGroup.Copy = InputGroupCopy;
InputGroup.Select = InputGroupSelect;
InputGroup.Option = InputGroupOption;

export default InputGroup;
