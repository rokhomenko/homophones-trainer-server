import { Exclude } from 'class-transformer'
import { User } from 'src/generated/prisma/client'

export class UserEntity implements User {
  userId: number
	email: string
	createdAt: Date

	@Exclude()
	password: string

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial)
	}
}