import { spyUsersCollection } from "./spyCollections";
import { generateRandomUser } from "helpers/mockData";

export const spyGetUsers = () => {
  const mockUsers = []
  for (let i=0; i < 5; i++){
    mockUsers.push(generateRandomUser());
  }

  return mockUsers;
}

export const spyCreateUser = (userData: Record<string, any>)  => {
  const mockUser = generateRandomUser()
  spyUsersCollection.push(mockUser);
  return mockUser;
}