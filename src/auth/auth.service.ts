import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'

type AuthInput = {
	email: string
	password: string
}

type SignInData = {
	userId: number
	email: string
}

type AuthResult = {
	accessToken: string
	userId: number
	email: string
}

@Injectable()
export class AuthService {
	constructor(
		private UsersService:	UsersService,
		private JwtService: JwtService
	) {}

	async authenticate(input: AuthInput): Promise<AuthResult> {
		const user = await this.validateUser(input)

		if(!user) {
			throw new UnauthorizedException()
		}

		return this.signIn(user)
	}

	async validateUser(input: AuthInput): Promise<SignInData | null> {
		const user = await this.UsersService.findByEmail(input.email)


		if (user) {
			const isPasswordValid = await argon2.verify(user.password, input.password)
			if (isPasswordValid) {
				return {
					userId: user.userId,
					email: user.email
				}
			}
		}
		return null
	}

	async signIn(user: SignInData): Promise <AuthResult> {
		const tokenPayload = {
			sub: user.userId,
			email: user.email
		}

		const accessToken = await this.JwtService.signAsync(tokenPayload)
		return { accessToken: accessToken, userId: user.userId, email: user.email}
	}

	async register(input: AuthInput) {
		const hashedPassword = await argon2.hash(input.password)

		const newUser = await this.UsersService.create({
			email: input.email,
			password: hashedPassword
		})
		return newUser
	}
}
