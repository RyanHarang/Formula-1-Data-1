const request = require("supertest");
const express = require("express");
const authRoutes = require("../../server/routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes API", () => {
  describe("POST /api/auth/login", () => {
    it("should log in a user with valid credentials", async () => {
      // Mock user creation for testing login
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({ email: "testuser@example.com", password: "password123" });

      expect(registerResponse.status).toBe(201);

      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Login successful.");
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toEqual({
        id: expect.any(String),
        email: "testuser@example.com",
      });
    });

    it("should return 400 for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistentuser@example.com", password: "wrongpassword" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials.");
    });
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "newuser@example.com", password: "password123" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "User registered successfully.");
    });

    it("should return 400 if the email is already taken", async () => {
      // Register the user first
      await request(app)
        .post("/api/auth/register")
        .send({ email: "existinguser@example.com", password: "password123" });

      // Attempt to register with the same email
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "existinguser@example.com", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "User already exists.");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should log out a user successfully", async () => {
      const response = await request(app).post("/api/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Logged out successfully");
    });
  });
});