import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUser } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginUser) {
    const { nickname, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { nickname },
      include: {
        Security_guard: {
          select: { password: true },
        },
      },
    });
    if (!user) {
      throw new BadRequestException('Неверноее имяz пользователя или пароль ');
    }
    const salt = Buffer.from(process.env.SALT);
    const valide = await argon2.verify(
      user.Security_guard.password,
      data.password,
      { salt },
    );
    if (!valide) {
      // проверка+url+ретерн
      throw new BadRequestException('Неверmноjе имя пользователя или пароль ');
    }
    const payload = { username: nickname, user: user.id };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: Buffer.from(process.env.SALTJWT),
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: Buffer.from(process.env.SALTJWT),
    });

    await this.prisma.security_guard.update({
      where: { userId: user.id },
      data: { refresh_token },
    }); //посмотреть варианты с userId
    return {
      access_token,
    };
  }

  async singUp(data: CreateUserDto) {
    const { nickname, password } = data;
    const loginChek = await this.prisma.user.findUnique({
      where: { nickname },
    });
    if (loginChek) {
      throw new BadRequestException('Имя занaто');
    }
    const check = new RegExp(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,32}/g,
    );
    const password_check = check.test(password);
    if (!password_check) {
      throw new BadRequestException(
        'Пароль должен быть не менее 8-ми символов в длину и не более 32. Содерbжать символы латинского алфавита верхнего и нижнего региста и иметь в составе цифры',
      );
    }
    const salt = Buffer.from(process.env.SALT);
    const hash = await argon2.hash(password, { salt });
    delete data.password;
    return this.prisma.user.create({
      data: {
        ...data,
        Security_guard: {
          create: {
            password: hash,
          },
        },
      },
    });
  }
  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { Security_guard: true },
    });
    if (!user) {
      throw new BadRequestException('Пользователь  не найден');
    }
    const { password, new_password } = data;
    if (password) {
      const salt = Buffer.from(process.env.SALT);
      const access = await argon2.verify(
        user.Security_guard.password,
        password,
        {
          salt,
        },
      );
      if (access) {
        user.Security_guard.password = await argon2.hash(new_password, {
          salt,
        });
      } else {
        throw new BadRequestException('Ошибка изменения пароля');
      }
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        Security_guard: { update: { password: user.Security_guard.password } },
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany;
    if (!users) {
      throw new NotFoundException(
        'Пользователи ппо вашему запросу не найдены ',
      );
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        creditcard: true,
      },
    });
    if (!user) throw new NotFoundException('Такой пользователь не найден');
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
      include: {
        creditcard: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Шошошо?');
    }
    return user;
  }
}
