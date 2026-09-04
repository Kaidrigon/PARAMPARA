import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Traditions from "./pages/Traditions";
import Tradition from "./pages/Tradition";
import Timeline from "./pages/Timeline";
import Source from "./pages/Source";
import Janmashtami from "./pages/Janmashtami";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/timeline" element={<Timeline />} />

      <Route path="/traditions" element={<Traditions />} />

      <Route
        path="/traditions/:slug"
        element={<Tradition />}
      />

      <Route
    path="/sources"
    element={<Sources />}
  />

      <Route
        path="/sources/:slug"
        element={<Source />}
      />

      <Route
        path="/janmashtami"
        element={<Janmashtami />}
      />
    </Routes>
  );
}

export default App;