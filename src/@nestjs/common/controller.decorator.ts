import 'reflect-metadata'

// 可以给Controller传递路径前缀
// 前缀可以为空，也可以是字符串，也可以是一个对象

interface ControllerOptions {
    prefix: string;
}

// 使用函数重载实现

export function Controller(): ClassDecorator; // 传空
export function Controller(prefix: string): ClassDecorator; // 字符串
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(opt?: string | ControllerOptions) {
    const options: ControllerOptions = {
        prefix: ''
    }
    // console.log(opt, 'opt')
    if (typeof opt === 'string') options.prefix = opt;
    if (typeof opt === 'object') Object.assign(options, opt);
    return  (target) => {
        // 给控制器添加prefix元数据
        // console.log(options,target, 'options')
        Reflect.defineMetadata('prefix', options.prefix, target);
    };
}