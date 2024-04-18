// user.service.ts
import User from "../models/user.model.js";

export class UserService {
  async createUser(userData: any) {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  }

  async getAllUsers() {
    return await User.find({});
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async updateUser(id: string, userData: any) {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
