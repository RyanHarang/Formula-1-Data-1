const UserDropdown = ({ emailPrefix, onLogout }) => {
  return (
    <>
      <div className="dark:bg-dark-bg2 absolute top-full right-0 mt-2 max-w-48 overflow-hidden rounded-md border shadow-lg">
        <div className="truncate px-4 py-2 text-sm">
          <strong>{emailPrefix}</strong>
        </div>
        <hr />
        <button
          onClick={onLogout}
          className="hover:bg-light-bg2 dark:hover:bg-dark-bg3 w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
