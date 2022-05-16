import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TweetNavbar from "./Components/TweetNavbar";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import HomePageContextProvider from "./Components/HomePageContextProvider";
import LoginPage from "./Pages/LoginPage";
import AuthProvider from "./Components/AuthProvider";
import WelcomePage from "./Pages/WelcomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <HomePageContextProvider>
        <TweetNavbar />
        <Routes>
          <Route path="/">
            <Route index element={<WelcomePage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/register' element={<SignUpPage/> }/>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HomePageContextProvider>
    </AuthProvider>
  );
}

export default App;
