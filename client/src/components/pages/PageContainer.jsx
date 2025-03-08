import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";

const PageContainer = ({ children }) => {
  const isAuthPage =
    children.type.name === "Login" || children.type.name === "Signup";

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
