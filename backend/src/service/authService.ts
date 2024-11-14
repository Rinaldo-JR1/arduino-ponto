import { PrismaClient } from "@prisma/client";

export class AuthService {
  private prisma = new PrismaClient();
  public async login(login: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: login,
        password: password,
      },
    });
    return user;
  }
}
