import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { CreateBlog } from "./pages/CreateBlog";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { ReadBlog } from "./pages/ReadBlog";

// Components
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { useEffect } from "react";
import axios from "axios";

function App() {
  /**
   * Pages:
   * 0. Landing Page
   * 1. Home (filtered by recency)
   * 2. Read Blog
   * 3. Write Blog
   * 4. Profile page
   * 5. About
   * 6. Contact
   */

  useEffect(() => {
    let token = sessionStorage.getItem("user");
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readblog/:id" element={<ReadBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
