import { UserRepository } from "./UserRepository";
import getEntityManagerMock from "../__mocks__/getEntityManagerMock";
import { User } from "../entities/User";
import { v4 as uuid } from "uuid";

describe("UserRepository", () => {
  const mockUser: User = {
    user_id: uuid(),
    name: "Test User",
    email: "teste@mail.com",
  };

  it("Should save a user", async () => {
    const managerMock = await getEntityManagerMock({
      saveReturn: mockUser,
    });

    const userRepository = new UserRepository(managerMock);
    const user = await userRepository.save(mockUser);

    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: "Test User",
      email: "teste@mail.com",
    });
  });
});
