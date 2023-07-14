import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Info from "./Pages/Info/Info";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>,
        <Route path="/info/:cca2" element={<Info/>} />
      </Routes>
    </Router>
  );
}

export default App;
