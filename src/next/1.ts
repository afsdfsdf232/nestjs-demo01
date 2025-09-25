/**
 * express 中的next 是一个用于中间件链处理的函数
 * 每个中间件接收三个参数：请求对象（req）、响应对象（res）和next函数
 * 中间件函数通过调用next()来将控制权传递给下一个中间件，如果中间件没有调用next()，请求将会被挂起，无法继续处理
 * */ 

class _Request {
    url: string;
    constructor(url: string) {
        this.url = url;
    }
}