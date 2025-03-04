import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";

function PageContainer({ children }) {
  return (
    <>
      <Navigation />
      <div className="min-h-screen min-w-screen pt-20">{children}</div>
      <Footer />
    </>
  );
}

export default PageContainer;
