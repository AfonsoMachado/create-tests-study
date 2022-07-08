import { User } from "../entities/User";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse";
import { getMockUser } from "../__mocks__/mockUser";
import { UserController } from "./UserController";

const mockUser: User = getMockUser();

let mockReturnCreateUser;
jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: mockReturnCreateUser,
      };
    }),
  };
});

describe("UserController", () => {
  const userController = new UserController();

  const request = {
    body: {
      name: "Test User",
      email: "test@mail.com",
    },
  } as Request;

  const response = makeMockResponse();
  it("Should return created user - Status 201", async () => {
    mockReturnCreateUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));

    await userController.createUser(request, response);

    expect(response.state.status).toBe(201);
    expect(response.state.json).toHaveProperty("user_id");
    expect(response.state.json).toMatchObject({
      name: "Test User",
      email: "test@mail.com",
    });
  });

  it("Should return status 400 when user won't have name and email - Status 400", async () => {
    const request = {
      body: {
        name: "",
        email: "",
      },
    } as Request;

    await userController.createUser(request, response);
    expect(response.state.status).toBe(400);
  });

  it("Should return status 500, when occours an error - Status 500", async () => {
    mockReturnCreateUser = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await userController.createUser(request, response);
    expect(response.state.status).toBe(500);
  });
});
