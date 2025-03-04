import Navigation from "../Navigation/Navigation.jsx";

function PageContainer({ children }) {
  return (
    <>
      <Navigation />
      <div className="min-h-screen min-w-screen pt-20">{children}</div>
    </>
  );
}

export default PageContainer;
