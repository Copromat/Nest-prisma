import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';

import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma.service';
import { LoginController } from './modules/users/login.controller';

@Module({
  providers: [PrismaService],
  imports: [UsersModule, CardsModule],
})
export class AppModule {}
