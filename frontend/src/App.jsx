import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Traditions from "./pages/Traditions";
import Tradition from "./pages/Tradition";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/traditions" element={<Traditions />} />
      <Route
        path="/traditions/:slug"
        element={<Tradition />}
      />
    </Routes>
  );
}

export default App;