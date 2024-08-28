import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class LoginDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
