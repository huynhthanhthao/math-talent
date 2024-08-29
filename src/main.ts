import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { json, static as static_ } from "express";
import { TransformInterceptor } from "utils/ApiResponse";
import { PrismaClientExceptionFilter } from "nestjs-prisma";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const cfgService = app.get(ConfigService);
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.enableCors();
    app.use("/uploads", static_("uploads"));
    app.use(json({ limit: "200mb" }));
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.listen(cfgService.get<number>("PORT"));
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
