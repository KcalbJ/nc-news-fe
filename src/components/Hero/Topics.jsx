import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsArr) => {
      setTopics(topicsArr);
    });
  }, []);

  return (
    <section>
      <h2 className="text-3xl text-center mt-4">Topics</h2>
      <div className="flex flex-wrap justify-center mt-4 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
           to={`/topics/${topic.slug}`}
            className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
          >
            <div>
              <h3>{topic.slug.toUpperCase()}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Topics;