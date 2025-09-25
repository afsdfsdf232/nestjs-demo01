type ClassMethodDecorator = (value: Function, 
    context: { 
        kind: 'method'; // 被装饰的类型，可以是class method getter setter field accessor
        name: string | symbol; // 表示被装饰的值的名称
        static: boolean; // 是否是静态成员
        private: boolean; // 是否是私有成员
        addInitializer(initializer: () => void): void // 添加初始化器
    }) => void;

const logged = (value, context) =>{
    const {kind, name} = context;
    if (kind === 'method') { // 方法装饰器
        console.log(`Logging ${name}...`);
        return (...args)=> {
            console.log(`Arguments: ${args}`);
            const result = value.apply(this, args);
            console.log(`Result: ${result}`);
            return result;
        }
    }
    // 访问器装饰器
    if (kind === 'getter' || kind === 'setter') {
        if (kind === 'getter') {
            return function(...args){
                const result = value.apply(this, args);
                return result;
            }
        }
        if (kind === 'setter') {
            return function(...args){
                const result = value.apply(this, args);
                return result;
            }
        }
     
    }
    // 属性装饰器
    if (kind === 'field') {
        console.log(`Logging field ${value}...`);
        return function(initValue){
            return initValue + '----default';
        }
    }
}

class Class {
    @logged
    name: string;
    @logged
    info: string = 'info';
    constructor(name?: string) {
        this.name = name;
    }
    @logged
    method(a, b) {
        return a + b;
    }

    @logged
    get getName() {
        return this.name;
    }
    
    @logged
    set setName(name: string) {
        this.name = name;
    }
}
const c = new Class();
c.method(1, 2);
c.setName = 'hello wx'
console.log('end value', c.getName, c.info)