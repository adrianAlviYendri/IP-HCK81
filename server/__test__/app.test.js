const request = require("supertest");
const app = require("../app"); // Import express app
const { sequelize, User } = require("../models"); // Import Sequelize instance & User model
const { queryInterface } = sequelize;

describe("POST /register", () => {
  test("Harus berhasil register dengan data yang valid", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Register succesfully");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "johndoe@example.com");
  });

  test("Harus gagal jika email kosong", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "",
      password: "password123",
    });

    expect(res.status).toBe(400); // Pastikan middleware error menangani ini
    expect(res.body).toHaveProperty("message");
  });

  test("Harus gagal jika email sudah terdaftar", async () => {
    await User.create({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    console.log(res.body); // Cek response dari API
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email already exists");
  });
});
