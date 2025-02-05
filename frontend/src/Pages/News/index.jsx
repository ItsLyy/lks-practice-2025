import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosClient from "../../axios/axios-client";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/news")
      .then((response) => {
        setLoading(false);
        setNews(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section id="news-list">
      <div className="container">
        {loading ? (
          "Loading..."
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.news_id}>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>
                    <Link to={`${item.news_id}`}>Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
