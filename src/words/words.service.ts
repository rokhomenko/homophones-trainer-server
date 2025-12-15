import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class WordsService {
	constructor(private prisma: PrismaService) {}

	getAllWords() {
		return this.prisma.word.findMany({
			include: {
				group: true
			}
		})
	}

	getGroups() {
		return this.prisma.group.findMany({
			include: {
				words: true
			}
		})
	}
}