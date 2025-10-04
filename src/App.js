import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeProvider from "./components/layout/ThemeProvider";

import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import { AlertProvider } from "./components/AlertContext";
import AlertComponent from "./components/AlertComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import JoinMeetingPage from "./pages/JoinMeetingPage";
import LeaveMeetingPage from "./pages/LeaveMeetingPage";
import { AuthProvider } from "./components/AuthProvider";
import LocationPage from "./pages/LocationPage";
import TypeOfMeetingPage from "./pages/TypeOfMeetingPage";
import AboutUsPage from "./pages/AboutUsPage";
import NewsArticlesPage from "./pages/NewsArticlePage";
import NewsArticleDetailsPage from "./pages/NewsArticleDetailPage";
import ContactPage from "./pages/ContactPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import NewHere from "./pages/NewHere";
import GoatCounter from "./components/GoatCounter";

import "./custom.scss";
import Schedule from "./pages/Schedule";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <Router>
            <GoatCounter />
            <AuthProvider>
              <AlertComponent />
              <AppRoutes />
            </AuthProvider>
          </Router>
        </AlertProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
