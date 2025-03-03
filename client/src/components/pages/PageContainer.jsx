function PageContainer({ children }) {
  return (
    <div className="dark:bg-dark-bg text-light-fg dark:text-dark-fg min-h-screen min-w-screen bg-white">
      {children}
    </div>
  );
}

export default PageContainer;
