import React from "react";
import MainLayout from "../layout/MainLayout";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import ErrorBoundary from "../components/ErrorBoundary";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import About from "../pages/About";

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/about"
          element={
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
          }
        />
        <Route
          path="/projects"
          element={
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
          }
        />
        <Route
          path="/skills"
          element={
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoute;
