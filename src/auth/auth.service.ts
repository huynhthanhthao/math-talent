import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
}
