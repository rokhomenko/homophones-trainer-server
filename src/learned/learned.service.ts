import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class LearnedService {
  constructor(private prisma: PrismaService) {}

  async getGroupsForUser(userId: number) {
    return this.prisma.group.findMany({
      where: {
        learned: {
          some: {
            userId: userId
          }
        }
      }
    })
  }

  async addLearnedGroup(userId: number, groupIds: number[]) {
    if(!groupIds.length) return { count: 0 }

    return this.prisma.learned.createMany({
      data: groupIds.map(groupId => ({
        userId,
        groupId
      })),
      skipDuplicates: true
    })
  }

  async deleteLearned(userId: number, groupId: number) {
    return this.prisma.learned.delete({
      where: {
        userId_groupId: {
          userId,
          groupId
        }
      }
    })
  }
} 