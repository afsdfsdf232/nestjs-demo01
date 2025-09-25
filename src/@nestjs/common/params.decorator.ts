export const createParamsDecorator = (key: string | Function) => {
  return (data?: any) => (target: any, propertyKey: string, parameterIndex: number) => {
    // target: UserController
    const existingParams = Reflect.getMetadata(`params`, target, propertyKey) || [];
    // existingParams.push({ parameterIndex, key });
    if (typeof key === 'function') {
      existingParams[parameterIndex] = { parameterIndex, key: 'DecoratorFactory', factory: key, data };
    } else {
      existingParams[parameterIndex] = { parameterIndex, key, data };
    }
    // console.log('existingParams', existingParams);
      Reflect.defineMetadata(`params`, existingParams, target, propertyKey);
  };
};


export const Request = createParamsDecorator('Request');
export const Req = createParamsDecorator('Req');

export const Query = createParamsDecorator('Query');

export const Headers = createParamsDecorator('Headers');
export const Session = createParamsDecorator('Session');

export const Ip = createParamsDecorator('Ip');

export const Param = createParamsDecorator('Param');

export const Body = createParamsDecorator('Body');

export const Response = createParamsDecorator('Response');
export const Res = createParamsDecorator('Res');

export const Next = createParamsDecorator('next');