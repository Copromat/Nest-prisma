import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUser } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  login(@Body() createUserDto: LoginUser) {
    return this.usersService.login(createUserDto);
  }
}
