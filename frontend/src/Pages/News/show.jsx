import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../axios/axios-client";

export default function NewsDetail() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/news/${id}`)
      .then((response) => {
        setLoading(false);
        setNews(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <section id="news-list">
      <div className="container">
        {loading ? (
          "Loading..."
        ) : (
          <div className="wrapper">
            <h1>{news.title}</h1>
            <p>{news.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}
