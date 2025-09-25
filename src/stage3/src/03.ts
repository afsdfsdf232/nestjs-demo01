// 类的自动访问器装饰器
// 使用：在属性前添加 accessor 关键字
// 作用：自动为属性生成 getter 和 setter 方法

function logged3(value, context) {
    if (context.kind === 'accessor') {
        const { get, set } = value; // 解构出 value 的 get 和 set 方法
        console.log(`Logging ${context.name}...`);
        return {
            get() {
                console.log(`Getting ${context.name}...`);
                return get.call(this); // 保持 this 指向当前类的实例
            },
            set(newValue) {
                console.log(`Setting ${context.name}...`);
                return set.call(this, newValue); // 保持 this 指向当前类的实例
            },
            init(initValue) {
               return initValue*2; // 初始化时对初始值进行处理
            }
        }
    }
}

class User {
 @logged3 accessor x = 2
 #y = 2 // 私有字段，不能使用自动访问器装饰器，属性前加#表示私有属性
}

const U = new User();
console.log('U-', U.x);
U.x = 10;
console.log('U-', U.x);