import { UserRepository } from "./UserRepository";
import getEntityManagerMock from "../__mocks__/getEntityManagerMock";
import { User } from "../entities/User";
import { getMockUser } from "../__mocks__/mockUser";

describe("UserRepository", () => {
  const mockUser: User = getMockUser();

  it("Should save a user", async () => {
    const managerMock = await getEntityManagerMock({
      saveReturn: mockUser,
    });

    const userRepository = new UserRepository(managerMock);
    const user = await userRepository.save(mockUser);

    expect(user).toHaveProperty("user_id");
    expect(user).toMatchObject({
      name: "Test User",
      email: "test@mail.com",
    });
  });
});
