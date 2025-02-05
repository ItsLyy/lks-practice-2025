export default function InputText({
  id,
  label,
  labelRequired,
  type = "text",
  ...props
}) {
  return (
    <div className="input__field">
      {label && (
        <label htmlFor={id}>
          {label} {labelRequired && <span className="label__required">*</span>}
        </label>
      )}

      <input {...props} type={type} id={id} name={id} autoComplete={id} />
    </div>
  );
}
