import { Logger } from './logger'
import { NestApplication } from './nest-application'
export class NestFactory {
    // 创建nestjs实例
    static async create(module: any) {
        Logger.log('Starting Nest application...', 'NestFactory')
        // 创建实例
        // const app = new NestApplication(module)
        return new NestApplication(module)
    }
}
