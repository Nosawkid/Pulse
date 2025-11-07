import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import PublicRoute from "./components/PublicRoute";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <AuthProvider>
      <div className="">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  {(auth) =>
                    auth.role === "admin" ? (
                      <AdminDashboard />
                    ) : auth.role === "user" ? (
                      <UserDashboard />
                    ) : (
                      <EditorDashboard />
                    )
                  }
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <SinglePost />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
