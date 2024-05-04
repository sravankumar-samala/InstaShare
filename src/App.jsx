import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/protectedRoute";
import Login from "./pages/login";
import Home from "./pages/home";
import MyProfile from "./pages/myProfile";
import UserProfile from "./pages/userProfile";
import SearchResults from "./components/searchResults";
import NotFound from "./pages/notFound";

const App = () => (
  <div>
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
);

export default App;
