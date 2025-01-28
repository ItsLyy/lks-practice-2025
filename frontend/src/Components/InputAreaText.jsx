export default function InputAreaText({
  className = "input__text input__area",
  type = "text",
  id,
  label,
  labelRequired,
  value = "",
  ...props
}) {
  return (
    <div className="input__field">
      {label && (
        <label htmlFor={id}>
          {label} {labelRequired && <span>*</span>}
        </label>
      )}
      <textarea
        {...props}
        type={type}
        className={`${className} ${value && "active"}`}
        name={id}
        value={value}
        id={id}
      ></textarea>
    </div>
  );
}
