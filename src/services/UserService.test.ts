import { UserService } from "./UserService";
import { v4 as uuid } from "uuid";
import { User } from "../entities/User";

// Busca nesse caminha para fazer o mock
jest.mock("../repositories/UserRepository");
// Captura o mock do UserRepository
const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const mockUser: User = {
    user_id: uuid(),
    name: "Test User",
    email: "test@mail.com",
  };

  const userService = new UserService({
    userRepository: mockUserRepository,
    name: "Test User",
    email: "teste@mail.com",
  });

  it("Should return a saved a user", async () => {
    // Espera o retorno de um usuário que esperamos
    mockUserRepository.save = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));

    const user = await userService.createUser();

    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: "Test User",
      email: "test@mail.com",
    });
  });
});
