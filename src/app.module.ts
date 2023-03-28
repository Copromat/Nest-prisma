import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';

import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  imports: [UsersModule, CardsModule],
})
export class AppModule {}
