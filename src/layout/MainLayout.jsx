import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import useScrollToTop from "../hooks/useScrollToTop";

function MainLayout() {
  useScrollToTop();

  return (
    <div className="w-full min-h-screen bg-cover bg-center">
      <style>{`
        @media (max-width: 768px) {
          div {
            background-attachment: scroll !important;
          }
        }
      `}</style>
      <Navbar />
      <main className="pt-16 md:pt-20 relative z-10 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
