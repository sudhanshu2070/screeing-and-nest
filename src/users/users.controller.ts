import {
  Controller, Get, Post, Patch, Delete, Body, Param, UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PermissionGuard } from "./guards/permission.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @UseGuards(new PermissionGuard("CREATE"))
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(new PermissionGuard("VIEW"))
  findAll() {
    return this.service.findAll();
  }

  @Patch(":id")
  @UseGuards(new PermissionGuard("EDIT"))
  update(@Param("id") id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  @UseGuards(new PermissionGuard("DELETE"))
  delete(@Param("id") id: number) {
    return this.service.delete(Number(id));
  }

  @Get("managed/:id")
  findManaged(@Param("id") id: number) {
    return this.service.getManagedUsers(Number(id));
  }
}