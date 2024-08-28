import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "nestjs-prisma";
import { AuthModule } from "./auth/auth.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "48h" },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
