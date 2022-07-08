import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:5001",
});

describe("/", () => {
  it("should return welcome message", async () => {
    console.log(server);
    const res = await server.get("/");

    console.log(res.data);

    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({ message: "Welcome to TestsAPI" });
  });
});
