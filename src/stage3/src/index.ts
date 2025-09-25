import 'reflect-metadata';
// stage 3 版本装饰器
function log(value, context) {
  console.log('log decorator called on: ',value, context);
}


@log
class Person {
  name: string;

  // @Reflect.metadata('design:type', 'name')
  getName(){

  }
}