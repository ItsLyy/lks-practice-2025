import { forwardRef } from "react";

export default forwardRef(function InputSwitch({ id, ...props }, ref) {
  return (
    <label id={id} className="relative inline-block h-5 w-10 cursor-pointer">
      <input
        {...props}
        type="checkbox"
        className="peer h-0 w-0 opacity-0"
        name={id}
        ref={ref}
        id={id}
      />
      <div className="absolute top-0 left-0 size-full rounded-full bg-zinc-100 transition-all duration-300 ease-in-out peer-checked:bg-sky-500 after:absolute after:left-0 after:h-full after:w-5 after:rounded-full after:bg-white after:shadow-sm after:shadow-black/20 after:transition-all after:duration-300 after:ease-in-out peer-checked:after:left-[55%]"></div>
    </label>
  );
});
