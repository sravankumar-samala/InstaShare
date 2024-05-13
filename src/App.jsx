import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { getSearchResults, searchValue } = useInstaShareContext();

  const goToSearchResults = (e) => {
    e.preventDefault();
    navigate("/search-results");
    if (searchValue) getSearchResults();
  };

  return (
    <div className="min-h-[100vh] pb-16 overflow-hidden ">
      {location.pathname !== "/login" && (
        <div className="w-full bg-white px-3">
          <Header goToSearchResults={goToSearchResults} />
        </div>
      )}

      <div className="max-w-[1028px] mx-auto px-3">
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
