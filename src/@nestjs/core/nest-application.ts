
import 'reflect-metadata';
import express, { Express, ExpressRequest, ExpressResponse, NextFunction } from 'express';
import { Logger } from './logger';
import path from 'path';

export class NestApplication {
    // 启动服务器，私有化服务器
    private readonly app: Express = express()
    constructor(protected readonly module: any) {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    use(middleware) {
        this.app.use(middleware)
    }
    // 初始化工作
    async init() {
        // 主要实现解析路由，配置路由
        // 取出所有模块中的控制器
        const controllers = Reflect.getMetadata('controllers', this.module) || [];
        Logger.log(`AppModule dependencies initializes`, 'InstanceLoader')
        // 遍历控制器
        for (const Controller of controllers) {
            // 创建控制器实例
            const controller = new Controller();
            // 获取控制器路径前缀, prefix是放到类上的
            const prefix = Reflect.getMetadata('prefix', Controller) || '/';
            // 开始解析路由
            Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver')
            const controllerPrototype = Controller.prototype;
            // 遍历原型上的方法名称
            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                if (methodName === 'constructor') continue;
                const method = controllerPrototype[methodName];
                // 获取方法上的path和method元数据
                const httpMethod: string = Reflect.getMetadata('method', method);
                const pathMetadata = Reflect.getMetadata('path', method);
                if (!httpMethod) continue; // 不是路由，跳过
                // 配置路由
                const routerPath = path.posix.join('/', prefix, pathMetadata);
                this.app[httpMethod.toLowerCase()](routerPath, (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
                    const args = this.resolveParams(controller, methodName, req, res, next);
                    const result = method.call(controller, ...args);
                    const responseMetadata = this.getResponseMetadata(controller, methodName);
                    if (!responseMetadata ||responseMetadata?.data?.passthrough ) {
                        res.send(result);
                    }
                });
                Logger.log(`Mapped {${routerPath}} route`, 'RoutesResolver')
            }
        }
        Logger.log(`Nest application successfully started`, 'NestApplication')
    }
    // 监听端口
    async listen(port: number) {
        await this.init();
        this.app.listen(port, () => {
            Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication')
        })
    }

    private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
        // 取出参数元数据
        const params = Reflect.getMetadata('params', instance, methodName) ?? [];
        return params.map((param) => {
            switch (param.key) {
                case 'Request':
                case 'Req':
                    return req;
                case 'Query':
                    return param.data ? req.query[param.data] : req.query;
                case 'Headers':
                    return param.data ? req.headers[param.data.toLowerCase()] : req.headers;
                case 'Session':
                    return param.data ? req.session[param.data] : req.session;
                case 'Param':
                    return param.data ? req.params[param.data] : req.params;
                case 'Body':
                    return param.data ? req.body[param.data] : req.body;
                case 'Ip':
                    return req.ip;
                case 'Response':
                case 'Res':
                    return res;
                case 'next':
                    return next;
                default:
                    return null;
            }
        });
    }

    private getResponseMetadata(instance: any, methodName: string) {
        const list = Reflect.getMetadata('params', instance, methodName) ?? [];
        return list.find(v => v?.key === 'Response' || v?.key === 'Res');
    }
};