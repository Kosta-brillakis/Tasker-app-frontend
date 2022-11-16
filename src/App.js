import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./components/nav/Main";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import { AuthProvider } from "./context/auth";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./pages/Tasks";
import { TasksProvider } from "./context/tasks";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Main />
          <Toaster toastOptions={{ duration: 2000 }} />
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* USER PROTECTED ROUTES */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>
            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
