import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { LoginController } from './login.controller';

@Module({
  controllers: [UsersController, LoginController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
