export default function Checkbox({
  className = "",
  id,
  label,
  value = "",
  ...props
}) {
  return (
    <label
      htmlFor={id}
      className="flex size-fit cursor-pointer items-end gap-1.5"
    >
      <input
        {...props}
        type="checkbox"
        className={`rounded-md border-[1px] border-gray-200 bg-[#f1f1f1] text-base transition-all duration-300 ease-in-out focus:bg-white focus:ring-0 focus:outline-0 ${className} ${value && "bg-white"}`}
        name={id}
        value={value}
        id={id}
      />
      <span className="leading-none">{label}</span>
    </label>
  );
}
