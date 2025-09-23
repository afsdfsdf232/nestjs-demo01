export function Get(path: string = ''):MethodDecorator {
  // target: 类的原型，AppController.prototype
  // key: 方法名，getHello
  // descriptor getHello 方法的属性描述器

  return  (target, key, descriptor)=> {
    // descriptor.value 也就是 getHello 方法
    // console.log(target, key, descriptor.value, 'descriptor');
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'GET', descriptor.value);
  };
}

export function Post(path: string = ''):MethodDecorator {
  // target: 类的原型，AppController.prototype
  // key: 方法名，getHello
  // descriptor getHello 方法的属性描述器

  return  (target, key, descriptor)=> {
    // descriptor.value 也就是 getHello 方法
    // console.log(target, key, descriptor.value, 'descriptor');
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'POST', descriptor.value);
  };
}