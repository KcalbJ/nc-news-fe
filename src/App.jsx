import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
    <Header/>
    
 
    <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
 
    </>
  )
}

export default App
