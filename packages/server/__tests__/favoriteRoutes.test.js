const request = require("supertest");
const express = require("express");
const favoriteRoutes = require("../../server/routes/favoriteRoutes");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/api/favorites", favoriteRoutes);

// Mock JWT middleware
const mockUserId = "mockUserId";
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(() => ({ id: mockUserId })),
}));

// Mock User model
jest.mock("../../server/models/User", () => {
    return {
        findById: jest.fn(),
    };
});

const User = require("../../server/models/User");

describe("Favorite Routes API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/favorites/all", () => {
        it("should fetch all favorites for a user", async () => {
            User.findById.mockResolvedValue({
                favoriteDrivers: ["Lewis Hamilton"],
                favoriteTeams: ["Mercedes"],
                favoriteRaces: ["Monaco GP"],
            });

            const response = await request(app)
                .get("/api/favorites/all")
                .set("Authorization", "Bearer mockToken");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                favoriteDrivers: ["Lewis Hamilton"],
                favoriteTeams: ["Mercedes"],
                favoriteRaces: ["Monaco GP"],
            });
        });

        it("should return 404 if the user is not found", async () => {
            User.findById.mockResolvedValue(null);

            const response = await request(app)
                .get("/api/favorites/all")
                .set("Authorization", "Bearer mockToken");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "User not found" });
        });
    });

    describe("POST /api/favorites/add/:type", () => {
        it("should add a favorite for a user", async () => {
            const mockUser = {
                favoriteDrivers: [],
                save: jest.fn(),
            };
            User.findById.mockResolvedValue(mockUser);

            const response = await request(app)
                .post("/api/favorites/add/drivers")
                .set("Authorization", "Bearer mockToken")
                .send({ item: "Max Verstappen" });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Added to favorite drivers",
                favorites: ["Max Verstappen"],
            });
            expect(mockUser.save).toHaveBeenCalled();
        });

        it("should return 400 for an invalid favorite type", async () => {
            const response = await request(app)
                .post("/api/favorites/add/invalidType")
                .set("Authorization", "Bearer mockToken")
                .send({ item: "Some Item" });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Invalid favorite type" });
        });
    });

    describe("DELETE /api/favorites/remove/:type/:item", () => {
        it("should remove a favorite for a user", async () => {
            const mockUser = {
                favoriteDrivers: ["Lewis Hamilton"],
                save: jest.fn(),
            };
            User.findById.mockResolvedValue(mockUser);

            const response = await request(app)
                .delete("/api/favorites/remove/drivers/Lewis Hamilton")
                .set("Authorization", "Bearer mockToken");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Removed from favorite drivers",
                favorites: [],
            });
            expect(mockUser.save).toHaveBeenCalled();
        });

        it("should return 400 if the item is not found in favorites", async () => {
            const mockUser = {
                favoriteDrivers: ["Lewis Hamilton"],
                save: jest.fn(),
            };
            User.findById.mockResolvedValue(mockUser);

            const response = await request(app)
                .delete("/api/favorites/remove/drivers/Max Verstappen")
                .set("Authorization", "Bearer mockToken");

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Item not found in favorites" });
        });
    });
});