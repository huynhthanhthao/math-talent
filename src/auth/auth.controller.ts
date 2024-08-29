import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { AnyObject } from "interfaces/common.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
