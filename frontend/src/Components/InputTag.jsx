import { useState } from "react";

export default function InputTag({
  className,
  type = "text",
  id,
  label,
  labelRequired,
  ...props
}) {
  const [tags, setTags] = useState([]);

  const onDeleteTagHandler = (e) => {
    e.preventDefault();

    setTags((prev) => prev.filter((tag) => tag.id != e.target.id));
  };

  const onEnterInputTagHandler = (e) => {
    if (e.key === " " && e.target.value != "") {
      console.log(e.target.value);
      setTags((prev) => {
        const datas = prev;
        datas.push(e.target.value);
        return datas;
      });
      e.target.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id}>
          {label} {labelRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={`rounded-md border-[1px] border-gray-200 bg-[#f1f1f1] px-4 py-2 text-base transition-all duration-300 ease-in-out focus:bg-white focus:ring-0 focus:outline-0 ${className}`}
        name={id}
        onKeyUp={onEnterInputTagHandler}
        id={id}
      />
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <li key={index}>
            <button
              id={tag}
              onClick={onDeleteTagHandler}
              className="cursor-pointer rounded-md border-[1px] border-zinc-200 bg-zinc-100 px-3 py-2 text-sm font-semibold"
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
