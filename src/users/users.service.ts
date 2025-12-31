import { Injectable, ConflictException } from '@nestjs/common'
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
		const existingUser = await this.findByEmail(data.email)

		if(existingUser) {
			throw new ConflictException('User with this email already exists')
		}

		return this.Prisma.user.create({
			data
		})
	}
}
