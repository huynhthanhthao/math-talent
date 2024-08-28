import {
  HttpException,
  HttpStatus,
  ValidationError,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from "@nestjs/common";
import { Response } from "express";
import { AnyObject } from "interfaces/common.interface";
interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: AnyObject;
  data?: AnyObject;
}

export class CustomHttpException extends HttpException {
  constructor(statusCode: number, message: string, errors?: AnyObject, data?: AnyObject) {
    const response: ErrorResponse = {
      statusCode,
      message,
      errors,
      data,
    };

    super(response, statusCode);
  }
}

export function errorFormatter(
  errors: ValidationError[],
  errMessage?: AnyObject,
  parentField?: string,
): AnyObject {
  const message = errMessage || {};
  let errorField = "";
  let validationsList = [];

  errors.forEach((error) => {
    errorField = parentField ? `${parentField}.${error.property}` : error.property;

    if (!error.constraints && error.children?.length) {
      errorFormatter(error.children, message, errorField);
    } else {
      validationsList = Object.values(error.constraints || {});
      message[errorField] = validationsList.length > 0 ? validationsList.pop() : "Invalid Value!";
    }
  });

  return message;
}

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: AnyObject, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === "P2002") {
      let failedField = exception.meta.target;

      const targetKey = exception.meta?.target?.split("_");

      if (targetKey) failedField = targetKey[1];

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: "Validation failed",
        errors: { [failedField]: `Dữ liệu đã tồn tại!` },
      });
    }

    if (exception.code === "P2011") {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Validation failed",
        errors: {
          [exception.meta.constraint[0]]: `Dữ liệu không tồn tại (1)!`,
        },
      });
    }

    if (exception.code === "P2003" || exception.code === "P2025") {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Dữ liệu không tồn tại (2)!",
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { message, errors, data } = exception.getResponse() as AnyObject;

      return response.status(status || HttpStatus.BAD_REQUEST).json({
        statusCode: status,
        message: message || "UNKNOWN ERROR",
        errors: errors || errors?.length > 0 ? errors : undefined,
        data: data || undefined,
      });
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || "UNKNOWN ERROR",
      error: exception,
    });
  }
}
