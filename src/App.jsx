import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./pages/protectedRoute";
import Login from "./pages/login";
import Home from "./pages/home";
import MyProfile from "./pages/myProfile";
import UserProfile from "./pages/userProfile";
import SearchResults from "./components/searchResults";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import { useInstaShareContext } from "./context/instaShareContext";

function App() {
  const navigate = useNavigate();
  const { getSearchResults, searchValue } = useInstaShareContext();

  const goToSearchResults = (e) => {
    e.preventDefault();
    navigate("/search-results");
    if (searchValue) getSearchResults();
  };

  return (
    <div className="min-h-[100vh] px-3 pb-16 overflow-hidden ">
      <div className="w-full bg-white">
        <Header goToSearchResults={goToSearchResults} />
      </div>
      <div className="max-w-[1028px] mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index path="/" element={<ProtectedRoute Component={Home} />} />
          <Route
            path="/my-profile"
            element={<ProtectedRoute Component={MyProfile} />}
          />
          <Route
            path="/users/:id"
            element={<ProtectedRoute Component={UserProfile} />}
          />
          <Route
            path="/search-results"
            element={<ProtectedRoute Component={SearchResults} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
