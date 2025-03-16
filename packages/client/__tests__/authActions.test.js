const { logout, login, register } = require("../src/store/authActions");
const { LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } = require("../src/store/actionTypes");

global.fetch = jest.fn();

describe("authActions Tests", () => {
  const mockDispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch LOGOUT action", () => {
    logout()(mockDispatch);

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGOUT });
  });

  it("should dispatch LOGIN_SUCCESS on successful login", async () => {
    const mockResponse = {
      token: "mockToken",
      user: { id: 1, email: "test@example.com" },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await login("test@example.com", "password123")(mockDispatch);

    expect(fetch).toHaveBeenCalledWith("http://localhost:5000/api/auth/login", expect.any(Object));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: LOGIN_SUCCESS,
      payload: mockResponse,
    });
  });

  it("should dispatch LOGIN_FAILURE on failed login", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    await login("test@example.com", "wrongpassword")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: LOGIN_FAILURE,
      payload: "Invalid credentials",
    });
  });

  it("should dispatch REGISTER_SUCCESS on successful registration", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Registration successful" }),
    });

    await register("newuser@example.com", "password123")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: REGISTER_SUCCESS });
  });

  it("should dispatch REGISTER_FAILURE on failed registration", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });

    await register("existinguser@example.com", "password123")(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REGISTER_FAILURE,
      payload: "Email already exists",
    });
  });
});