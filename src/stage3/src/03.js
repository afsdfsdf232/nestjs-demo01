// 类的自动访问器装饰器
// 使用：在属性前添加 accessor 关键字
// 作用：自动为属性生成 getter 和 setter 方法
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
function logged3(value, context) {
    if (context.kind === 'accessor') {
        var get_1 = value.get, set_1 = value.set; // 解构出 value 的 get 和 set 方法
        console.log("Logging ".concat(context.name, "..."));
        return {
            get: function () {
                console.log("Getting ".concat(context.name, "..."));
                return get_1.call(this); // 保持 this 指向当前类的实例
            },
            set: function (newValue) {
                console.log("Setting ".concat(context.name, "..."));
                return set_1.call(this, newValue); // 保持 this 指向当前类的实例
            },
            init: function (initValue) {
                return initValue * 2; // 初始化时对初始值进行处理
            }
        };
    }
}
var User = function () {
    var _a, _User_y, _User_x_accessor_storage;
    var _x_decorators;
    var _x_initializers = [];
    var _x_extraInitializers = [];
    return _a = /** @class */ (function () {
            function User() {
                _User_x_accessor_storage.set(this, __runInitializers(this, _x_initializers, 2));
                _User_y.set(this, (__runInitializers(this, _x_extraInitializers), 2)); // 私有字段，不能使用自动访问器装饰器，属性前加#表示私有属性
            }
            Object.defineProperty(User.prototype, "x", {
                get: function () { return __classPrivateFieldGet(this, _User_x_accessor_storage, "f"); },
                set: function (value) { __classPrivateFieldSet(this, _User_x_accessor_storage, value, "f"); },
                enumerable: false,
                configurable: true
            });
            return User;
        }()),
        _User_y = new WeakMap(),
        _User_x_accessor_storage = new WeakMap(),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _x_decorators = [logged3];
            __esDecorate(_a, null, _x_decorators, { kind: "accessor", name: "x", static: false, private: false, access: { has: function (obj) { return "x" in obj; }, get: function (obj) { return obj.x; }, set: function (obj, value) { obj.x = value; } }, metadata: _metadata }, _x_initializers, _x_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var U = new User();
console.log('U-', U.x);
U.x = 10;
console.log('U-', U.x);
