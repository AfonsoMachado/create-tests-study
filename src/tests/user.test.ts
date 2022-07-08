import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5001",
});

describe("/users", () => {
  it("should return status 200", async () => {
    const user = await server.post("/user", {
      name: "test",
      email: "mail test",
    });

    expect(user.status).toBe(201);
  });
});
