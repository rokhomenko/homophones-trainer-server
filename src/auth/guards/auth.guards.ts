import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private JwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const authorization = request.headers.authorization
		const token = authorization?.split(' ')[1]

		console.log('auth started');
  	console.log('auth header', authorization);

		if(!token) {
			throw new UnauthorizedException()
		}

		try {
			const tokenPayload = await this.JwtService.verifyAsync(token)
			console.log('Payload:', tokenPayload);
			request.user = {
				userId: tokenPayload.sub,
				email: tokenPayload.email
			}
			return true
		} catch (error) {
			console.error('JWT Error:', error.message);
			throw new UnauthorizedException()
		}
	}
}