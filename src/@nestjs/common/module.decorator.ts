import 'reflect-metadata';


interface ModuleMetadata {
  controllers: Function[]
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata) {
  return  (target: Function) => { // target 类的构造函数 constructor
    // 给模块类添加元数据 AppModule, 元数据名字叫 'controllers'，值是controllers数组[AppController]
    Reflect.defineMetadata('controllers', metadata.controllers, target);
  };
}