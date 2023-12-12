import Header from "./components/Header/Header";
import ArticlePage from "./components/Hero/ArticlePage";
import Hero from "./components/Hero/Hero";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/articles/:articleId" element={<ArticlePage/>} />
      </Routes>
    </div>
  );
}

export default App;
