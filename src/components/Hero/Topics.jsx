import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(true);
    getTopics()
      .then((topicsArr) => {
        setTopics(topicsArr);
      })
      .catch((error) => {
        setTopics([]); 
        toast.error("Error fetching topics");
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, []); 

  if (isLoad) {
    return (
      <p className="text-violet-400 text-2xl text-center mt-24 animate-bounce">
        Loading.....
      </p>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="flex  text-violet-600 text-7xl mt-2 justify-center mx-auto max-w-2xl">
        <p>No topics found</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl text-center mt-4">Topics</h2>
      <div className="flex flex-wrap justify-center mt-4 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            to={`/topics/${topic.slug}`}
            className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:bg-violet-900 focus:outline-none focus:ring"
          >
            <div>
              <h3>{topic.slug.toUpperCase()}</h3>
            </div>
          </Link>
        ))}
      </div>
      <ToastContainer/>
    </section>
  );
}

export default Topics;
