import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUser } from './dto/create-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  login(@Body() createUserDto: LoginUser) {
    return this.usersService.login(createUserDto);
  }
}
