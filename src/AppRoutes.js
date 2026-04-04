// src/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

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
import TypeOfMeetingDetailPage from "./pages/TypeOfMeetingDetailPage";
import AboutUsPage from "./pages/AboutUsPage";
import NewsArticlesPage from "./pages/NewsArticlePage";
import NewsArticleDetailsPage from "./pages/NewsArticleDetailPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import { fetchNewsArticleById } from "./services/NewsArticleService";
import {
  ABOUT_US_PATH,
  CONTACT_PATH,
  getNewsArticlePath,
  NEW_HERE_PATH,
  NEWS_PATH,
  SCHEDULE_PATH,
  TYPE_OF_MEETINGS_PATH,
} from "./utils/contentRoutes";

import { useAuth } from "./components/AuthProvider";

const LegacyTypeOfMeetingDetailRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`${TYPE_OF_MEETINGS_PATH}/${slug}`} replace />;
};

const LegacyNewsArticleDetailRedirect = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useQuery({
    queryKey: ["newsArticle", id],
    queryFn: () => fetchNewsArticleById(id),
    enabled: Boolean(id),
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Navigate to={article ? getNewsArticlePath(article) : NEWS_PATH} replace />
  );
};

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
        <Route path={NEW_HERE_PATH} element={<NewHere />} />
        <Route path="/home" element={<HomePage />} />
        <Route path={SCHEDULE_PATH} element={<Schedule />} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path={CONTACT_PATH} element={<ContactPage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path={TYPE_OF_MEETINGS_PATH} element={<TypeOfMeetingPage />} />
        <Route
          path={`${TYPE_OF_MEETINGS_PATH}/:slug`}
          element={<TypeOfMeetingDetailPage />}
        />
        <Route
          path="/TypesOfMeetings"
          element={<Navigate to={TYPE_OF_MEETINGS_PATH} />}
        />
        <Route
          path="/typesofmeetings"
          element={<Navigate to={TYPE_OF_MEETINGS_PATH} />}
        />
        <Route
          path="/typesofmeetings/:slug"
          element={<LegacyTypeOfMeetingDetailRedirect />}
        />
        <Route path={ABOUT_US_PATH} element={<AboutUsPage />} />
        <Route path={NEWS_PATH} element={<NewsArticlesPage />} />
        <Route
          path={`${NEWS_PATH}/:slug`}
          element={<NewsArticleDetailsPage />}
        />
        <Route path="/NewHere" element={<Navigate to={NEW_HERE_PATH} replace />} />
        <Route path="/newhere" element={<Navigate to={NEW_HERE_PATH} replace />} />
        <Route path="/schedule" element={<Navigate to={SCHEDULE_PATH} replace />} />
        <Route path="/contact" element={<Navigate to={CONTACT_PATH} replace />} />
        <Route
          path="/AboutUsPage"
          element={<Navigate to={ABOUT_US_PATH} replace />}
        />
        <Route path="/news" element={<Navigate to={NEWS_PATH} replace />} />
        <Route path="/News" element={<Navigate to={NEWS_PATH} replace />} />
        <Route
          path="/news/:id"
          element={<LegacyNewsArticleDetailRedirect />}
        />
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
