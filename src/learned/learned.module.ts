import { Module } from "@nestjs/common"
import { LearnedService } from "./learned.service"
import { LearnedController } from "./learned.controller"
import { PrismaClient } from "src/generated/prisma/client"

@Module({
  imports: [PrismaClient],
  controllers: [LearnedController],
  providers: [LearnedService]
})

export class LearnedModule {}