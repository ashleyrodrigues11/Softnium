import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import ClientProfile from "./pages/ClientProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDecryptedToken, setEncryptedToken, clearTokens } from "./utils/storage";
import { encryptPayload, decryptPayload } from "./utils/crypto";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const refreshToken = async () => {

      const refresh =
        getDecryptedToken("refresh");

      if (!refresh) {
        setLoading(false);
        return;
      }

      try {

        const response =
          await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              payload: encryptPayload({ refresh })
            }
          );

        const data = response.data.payload ? decryptPayload(response.data.payload) : response.data;

        setEncryptedToken(
          "access",
          data.access
        );

        if (data.refresh) {
          setEncryptedToken("refresh", data.refresh);
        }

      } catch {

        clearTokens();

      } finally {

        setLoading(false);

      }
    };

    refreshToken();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>

      <Route
        path="/"
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
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients/:id"
        element={
          <ProtectedRoute>
            <ClientProfile />
          </ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;