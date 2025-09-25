// 修饰类的装饰器

function logged2(value, content) {
    // console.log(value, content);
    if (content.kind === 'class') {
        return class extends value {
            name: string;
            constructor(...args) {
                console.log('Creating person...', args);
                super(...args);
            }
        }
    }
}

@logged2
class Person {
    name: string;
    constructor(name) {
        this.name = name;
    }
}

const p = new Person('张三');
console.log(p.name, '-----');