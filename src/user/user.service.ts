import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js'
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('Finding all users');

    return this.users.filter((user) =>
     user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findOneUser(id: number) {
    const user = this.users.find((user) => user.id === id) ?? null;

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log(`Creating user`);

    const newUser: User = {
      id: this.users.length + 1,
      ...dto,
    };
    this.users.push(newUser);

    return { data: dto, message: 'User created successfully' };
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user ${id}`);

    const index = this.users.findIndex((user) => user.id === id);

    if(index === -1) return null

    this.users[index] = {...this.users[index], ...dto}

    return this.users[index];
  }

  deleteUser(id: number = 0) {
    this.logger.log(`Deleting user ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if(index === -1) return null

    const [deleted] = this.users.splice(id, 1);

    return deleted;
  }
}
