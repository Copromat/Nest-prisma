import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCardDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException('Noonono');
    }
    const card = await this.prisma.credit_card.create({
      data: { bank: data.bank, valid: data.valid, userId: data.userId },
    });

    return card;
  }

  async findAll() {
    const cards = this.prisma.credit_card.findMany;
    if (!cards) {
      throw new NotFoundException('У вас нет карт');
    }
  }

  async findOne(id: number) {
    const card = await this.prisma.credit_card.findUnique({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException('Эта карrта отсутсвует');
    }
  }

  async update(id: number, data: UpdateCardDto) {
    const update = await this.prisma.credit_card.findUnique({
      where: { id },
    });
    if (!update) {
      throw new BadRequestException('Неверное имя');
    }
    return this.prisma.credit_card.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const delet = await this.prisma.credit_card.findUnique({
      where: { id },
    });
    if (!delet) {
      throw new BadRequestException('Карта не найдена');
    }
    return this.prisma.credit_card.delete({
      where: { id },
    });
  }
}
