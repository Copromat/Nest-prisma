import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  secret: string;
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    console.log(request.headers);
    try {
      if (authorization) {
        const resalt = await this.jwtService.verifyAsync(authorization, {
          secret: Buffer.from(process.env.SALTJWT),
        });

        return resalt;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
