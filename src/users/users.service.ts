import { Injectable, NotFoundException } from "@nestjs/common";
import { users } from "./data/users.data";

@Injectable()
export class UsersService {
  private users = users;

  findAll() {
    return this.users;
  }

  create(data) {
    const newUser = { id: Date.now(), ...data };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException("User not found");

    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException("User not found");

    return this.users.splice(index, 1);
  }

  getManagedUsers(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user || !user.roles.includes("ADMIN")) return [];

    return this.users.filter(
      u => u.groups.some(g => user.groups.includes(g))
    );
  }
}