import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import Result from "./components/Result";
const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<Test />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
