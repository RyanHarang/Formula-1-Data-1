const { setLogoutTimer } = require("../src/store/authUtils");
const { logout } = require("../src/store/authActions");

jest.mock("../src/store/authActions", () => ({
  logout: jest.fn(),
}));

jest.mock("../src/store/store", () => ({
  dispatch: jest.fn(),
}));

describe("authUtils Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should dispatch logout immediately if token is expired", () => {
    const expiredToken = "expiredToken"; // Mock token
    const mockDecoded = { exp: Date.now() / 1000 - 10 }; // Expired token

    jest.mock("jwt-decode", () => () => mockDecoded);

    setLogoutTimer(expiredToken);

    expect(logout).toHaveBeenCalled();
  });

  it("should set a timeout to dispatch logout when token is valid", () => {
    const validToken = "validToken"; // Mock token
    const mockDecoded = { exp: Date.now() / 1000 + 60 }; // Token expires in 60 seconds

    jest.mock("jwt-decode", () => () => mockDecoded);

    setLogoutTimer(validToken);

    jest.advanceTimersByTime(60000); // Fast-forward 60 seconds
    expect(logout).toHaveBeenCalled();
  });

  it("should handle invalid token gracefully", () => {
    const invalidToken = "invalidToken";

    setLogoutTimer(invalidToken);

    expect(logout).toHaveBeenCalled();
  });
});