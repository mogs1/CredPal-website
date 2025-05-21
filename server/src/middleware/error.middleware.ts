import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  errors?: object; // Optional property to hold error details
  
  constructor(message: string, statusCode: number, error?: object) {
    super(message);
    this.statusCode = statusCode;
    this.errors = error;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    const responseBody: any = {
      message: err.message,
    };
    if (err.errors) {
      responseBody.errors = err.errors;
    }
    return Promise.resolve(res.status(err.statusCode).json(responseBody));
  }

  if (err.name === 'ValidationError') {
    return Promise.resolve(res.status(400).json({
      message: err.message,
    }));
  }

  if ((err as any).code === 11000) {
    return Promise.resolve(res.status(400).json({
      message: 'Duplicate field value entered',
    }));
  }

  return Promise.resolve(res.status(500).json({
    message: 'Something went wrong',
  }));
};
