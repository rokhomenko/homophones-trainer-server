import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { User, Prisma } from 'src/generated/prisma/client'

@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService) {}

	async findByEmail(email: string): Promise<User | null> {
		return this.Prisma.user.findUnique({
			where: { email }
		})
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.Prisma.user.create({
			data
		})
	}
}
