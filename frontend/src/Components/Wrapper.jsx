export default function Wrapper({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border-b-4 border-sky-500 bg-white p-4 shadow-sm shadow-black/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
