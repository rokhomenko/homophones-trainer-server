import { Module, ClassSerializerInterceptor } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { WordsModule } from './words/words.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core'

@Module({
  imports: [
    PrismaModule,
    WordsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
