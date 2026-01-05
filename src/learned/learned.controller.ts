import { Controller, Get, Post, Param, Body } from "@nestjs/common"
import { LearnedService } from "./learned.service"

@Controller('learned')
export class LearnedController {
  constructor(private learnedService: LearnedService) {}

  @Get()
  getUserGroups(@Param('userId') userId: string) {
    return this.learnedService.getGroupsForUser(Number(userId))
  }

  @Post()
  addLearned(@Body() body: { userId: number, groupIds: number[]}) {
    return this.learnedService.addLearnedGroup(
      body.userId,
      body.groupIds
    )
  }
}