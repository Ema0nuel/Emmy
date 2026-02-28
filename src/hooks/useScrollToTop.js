import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        // Announce navigation to screen readers
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute("aria-atomic", "true");
        announcement.className = "sr-only";
        announcement.textContent = `Navigated to ${pathname === "/" ? "home" : pathname.replace("/", "")} page`;

        document.body.appendChild(announcement);

        // Clean up
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }, [pathname]);
};

export default useScrollToTop;