export default function InputText({
  className = "input__text",
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
      <input
        {...props}
        type={type}
        className={`${className} ${value && "active"}`}
        name={id}
        value={value}
        id={id}
      />
    </div>
  );
}
