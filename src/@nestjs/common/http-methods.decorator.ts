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


export function Redirect(url: string, statusCode = 302): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata('redirectUrl',url, descriptor.value);
    Reflect.defineMetadata('redirectStatusCode', statusCode, descriptor.value);
  };
}

export function Header(key: string, value: any): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const existingHeaders = Reflect.getMetadata('headers', descriptor.value) || {};
    existingHeaders[key] = value;
    Reflect.defineMetadata('headers', existingHeaders, descriptor.value);
  };
}