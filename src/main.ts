import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import session from 'express-session'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(session({
    secret: 'keyboard', // 密钥
    resave: false, // 是否强制保存 session，即使 session 没有被修改
    saveUninitialized: true, // 是否强制保存未初始化的 session
    cookie: { maxAge: 60000 } // 设置 session 的过期时间，单位为毫秒
  }))
  await app.listen(3000)
}

bootstrap()

// p11