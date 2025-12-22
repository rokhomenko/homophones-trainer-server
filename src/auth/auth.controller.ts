import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post, Get, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';
import { request } from 'http';

@Controller('auth')
export class AuthController {
	constructor(private AuthService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() input: { email: string, password: string }) {
		return this.AuthService.authenticate(input)
	}

	@UseGuards(AuthGuard)
	@Get('me')
	getUserInfo(@Request() request) {
		return request.user
	}
}
