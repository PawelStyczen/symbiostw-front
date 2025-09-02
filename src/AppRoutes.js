// src/AppRoutes.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import JoinMeetingPage from "./pages/JoinMeetingPage";
import LeaveMeetingPage from "./pages/LeaveMeetingPage";
import HomePage from "./pages/HomePage";
import NewHere from "./pages/NewHere";
import Schedule from "./pages/Schedule";
import ContactPage from "./pages/ContactPage";
import LocationPage from "./pages/LocationPage";
import TypeOfMeetingPage from "./pages/TypeOfMeetingPage";
import AboutUsPage from "./pages/AboutUsPage";
import NewsArticlesPage from "./pages/NewsArticlePage";
import NewsArticleDetailsPage from "./pages/NewsArticleDetailPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

import { useAuth } from "./components/AuthProvider";

const AppRoutes = () => {
  const { logout } = useAuth();

  return (
    <Layout onLogout={logout}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        /> */}
        <Route path="/NewHere" element={<NewHere />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/TypesOfMeetings" element={<TypeOfMeetingPage />} />
        <Route path="/AboutUsPage" element={<AboutUsPage />} />
        <Route path="/news" element={<NewsArticlesPage />} />
        <Route path="/news/:id" element={<NewsArticleDetailsPage />} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-meeting/:id"
          element={
            <ProtectedRoute>
              <JoinMeetingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-meeting/:id"
          element={
            <ProtectedRoute>
              <LeaveMeetingPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
