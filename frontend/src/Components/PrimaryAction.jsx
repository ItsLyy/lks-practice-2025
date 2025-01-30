import { Link } from "react-router";

const Primary = ({ children }) => {
  return (
    <button className="cursor-pointer rounded-md bg-gradient-to-br from-sky-500 to-sky-600 px-4 py-2 text-white active:brightness-50">
      {children}
    </button>
  );
};

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`cursor-pointer rounded-md bg-gradient-to-br from-sky-500 to-sky-600 px-4 py-2 text-white active:brightness-50 ${className}`}
    >
      {children}
    </button>
  );
};

const PrimaryLink = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      className="cursor-pointer rounded-md bg-gradient-to-br from-sky-500 to-sky-600 px-4 py-2 text-white active:brightness-50"
    >
      {children}
    </Link>
  );
};

Primary.Button = PrimaryButton;
Primary.Link = PrimaryLink;

export default Primary;
