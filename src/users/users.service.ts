import { Injectable } from '@nestjs/common';

export type User = {
	userId: number
	email: string
	password: string
}

@Injectable()
export class UsersService {
    private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

	async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
