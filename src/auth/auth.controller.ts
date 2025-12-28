import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post, Get, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guards'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private AuthService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() input: AuthDto) {
		return this.AuthService.authenticate(input)
	}

	@UseGuards(AuthGuard)
	@Get('me')
	getUserInfo(@Request() request) {
		return request.user
	}

	@Post('register')
	async register(@Body() input: AuthDto) {
		return this.AuthService.register(input)
	}
}
