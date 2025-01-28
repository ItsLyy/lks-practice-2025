import { Link } from "react-router";

export default function Card({ title, description, slug }) {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <Link className="card__link-detail" to={`/form/${slug}`}>
        See Detail
      </Link>
    </div>
  );
}
