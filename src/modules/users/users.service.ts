import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async singUp(data: CreateUserDto) {
    const { nickname, password } = data;
    const loginChek = await this.prisma.user.findUnique({
      where: { nickname },
    });
    if (loginChek) {
      throw new BadRequestException('Имя занято');
    }

    return this.prisma.user.create({
      data: {
        firs_name: data.firs_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      },
    });
  }
  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('Пользователь  не найден');
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany;
    if (!users) {
      throw new NotFoundException('Пользователи по вашему запросу не найдены ');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('Такой пользователь не найден');
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Шошошо?');
    }
  }
}
