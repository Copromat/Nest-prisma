import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCardDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id_user },
    });
    if (!user) {
      throw new NotFoundException('Noonono');
    }
    const card = await this.prisma.credit_card.create({
      data: { bank: data.bank, valid: data.valid },
    });

    return card;
  }

  async findAll() {
    const cards = this.prisma.credit_card.findMany;
    if (!cards) {
      throw new NotFoundException('У вас нет карты');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
