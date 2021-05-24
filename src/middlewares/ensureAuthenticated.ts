import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  // Bearer + token
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "3e44cae1aa332b5813823f09f7c85bd8"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
