import { Controller, Get, Param, Post, Query, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('name') name: string): unknown {
    return this.userService.findAllUsers(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): unknown {
    return this.userService.findOneUser(Number(id))
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): unknown {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): unknown {
    return this.userService.deleteUser(Number(id))
  }
}
