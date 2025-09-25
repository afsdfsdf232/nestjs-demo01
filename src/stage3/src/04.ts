
import 'reflect-metadata';
/**
 * 在TS里在，emitDecoratorMetadata 生成元数据有以下三种：
 * design:type 用于生成属性的类型元数据
 * design:paramtypes 用于生成方法参数的类型元数据
 * design:returntype 用于生成方法返回值的类型元数据
 * 
 * 
 * 配置tsconfig.json
 * {
    "compilerOptions": {
       "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
    }
}
 * */ 
function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

}

function paramsDecorator(target: any, propertyKey: string, parameterIndex: number) {

}

class ExampleClass {
    constructor(@paramsDecorator params1: string, @paramsDecorator params2: number){}
    @methodDecorator
    myMethod(@paramsDecorator param1: string, @paramsDecorator param2: number):string {
        return param1 + param2;
    }
}

const paramTypes = Reflect.getMetadata('design:paramtypes', ExampleClass.prototype, 'myMethod');
const returnType = Reflect.getMetadata('design:returntype', ExampleClass.prototype, 'myMethod');
const constructorParamTypes = Reflect.getMetadata('design:paramtypes', ExampleClass);
const propertyType = Reflect.getMetadata('design:type', ExampleClass.prototype, 'myMethod');
const methodsParamsTypes = Reflect.getMetadata('design:paramtypes', ExampleClass.prototype, 'myMethod');

console.log('Parameter Types:', paramTypes); // [ [Function: String], [Function: Number] ]
console.log('Return Type:', returnType); // [Function: String]
console.log('Constructor Parameter Types:', constructorParamTypes); // [ [Function: String], [Function: Number] ]
console.log('Property Type:', propertyType); // [Function: Function]
console.log('Methods Parameter Types:', methodsParamsTypes); // [ [Function: String], [Function: Number] ]
