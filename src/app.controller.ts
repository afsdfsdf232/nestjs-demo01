import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class AppController {
    @Get('/test')
    getHello(): string {
        return 'Hello World!'
    }
    @Get('/test2')
    getHello2(): string {
        return 'Hello World2!'
    }
}