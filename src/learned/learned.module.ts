import { Module } from "@nestjs/common"
import { LearnedService } from "./learned.service"
import { LearnedController } from "./learned.controller"
import { PrismaModule } from "src/prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  controllers: [LearnedController],
  providers: [LearnedService]
})

export class LearnedModule {}