export default function Modal({ children, onClose, open = false }) {
  return (
    <div
      className={`fixed top-0 left-0 flex h-svh w-full items-center justify-center transition-all duration-300 ease-in-out ${open ? "visible bg-black/40" : "invisible"}`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
