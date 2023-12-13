import Header from "./components/Header/Header";
import ArticlePage from "./components/Hero/ArticlePage";
import Hero from "./components/Hero/Hero";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext";
function App() {
  return (
    <UserProvider>
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/articles/:articleId" element={<ArticlePage/>} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
