process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";

const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const { connectDatabase, disconnectDatabase } = require("../config/database");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
  await mongoServer.stop();
});

describe("Auth API", () => {
  it("registers a user and returns a token", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("jane@example.com");
  });

  it("logs in an existing user", async () => {
    await request(app).post("/api/auth/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "secret123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "secret123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toBe("John Doe");
  });

  it("returns the current user for a valid token", async () => {
    const signupResponse = await request(app).post("/api/auth/signup").send({
      name: "Alice Doe",
      email: "alice@example.com",
      password: "secret123",
    });

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${signupResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("alice@example.com");
  });
});
