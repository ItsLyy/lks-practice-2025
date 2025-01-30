import { Link } from "react-router";
import Wrapper from "./Wrapper";

export default function Card({ title, description, slug }) {
  return (
    <Wrapper className="flex min-h-52 flex-col gap-2">
      <h2 className="border-b-[1px] border-zinc-200 pb-2 text-2xl">{title}</h2>
      <p className="flex-grow">{description}</p>
      <Link
        className="text-sky-600 transition-colors duration-300 ease-in-out hover:text-sky-700"
        to={`/form/${slug}`}
      >
        See Detail
      </Link>
    </Wrapper>
  );
}
