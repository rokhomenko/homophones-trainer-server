import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { emitWarning } from "process";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private JwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const authorization = request.headers.authorization
		const token = authorization?.split(' ')[1]

		if(!token) {
			throw new UnauthorizedException()
		}

		try {
			const tokenPayload = await this.JwtService.verifyAsync(token)
			request.user = {
				userId: tokenPayload.sub,
				email: tokenPayload.email
			}
			return true
		} catch {
			throw new UnauthorizedException()
		}
	}
}