import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidElement, useEffect } from "react";
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";

const PageContainer = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  let isAuthPage;
  if (isValidElement(children)) {
    const childName = children.type.name;
    isAuthPage = childName === "Login" || childName === "Signup";
  } else {
    isAuthPage = false;
  }

  return (
    <>
      {!isAuthPage && <Navigation />}
      <main
        className={`min-h-screen min-w-screen ${!isAuthPage ? "pt-20" : ""}`}
      >
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default PageContainer;
