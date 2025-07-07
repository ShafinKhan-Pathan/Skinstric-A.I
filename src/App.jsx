import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";
import Result from "./components/Result";
import TestRoute from "./components/TestRoute";
import ResultInfo from "./components/ResultInfo";
import Summary from "./components/Summary";
const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<Test />} />
          <Route path="/result" element={<Result />} />
          <Route path="/resultinfo" element={<ResultInfo />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
