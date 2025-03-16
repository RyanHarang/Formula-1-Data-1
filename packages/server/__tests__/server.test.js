import request from "supertest";
import app from "../server";

describe("Server Tests", () => {
  it("should respond with 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });

  it("should respond with 200 for the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Welcome to the API");
  });

  it("should handle errors gracefully", async () => {
    const response = await request(app).get("/api/error-route");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});