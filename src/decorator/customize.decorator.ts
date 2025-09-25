import { createParamsDecorator } from "@nestjs/common";


// 自定义装饰器
export const User = createParamsDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return data? req.user[data]: req.user;
})