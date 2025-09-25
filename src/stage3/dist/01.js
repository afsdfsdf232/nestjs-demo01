var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var _this = this;
var logged = function (value, context) {
    var kind = context.kind, name = context.name;
    if (kind === 'method') { // 方法装饰器
        console.log("Logging ".concat(name, "..."));
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("Arguments: ".concat(args));
            var result = value.apply(_this, args);
            console.log("Result: ".concat(result));
            return result;
        };
    }
    // 访问器装饰器
    if (kind === 'getter' || kind === 'setter') {
        if (kind === 'getter') {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = value.apply(this, args);
                return result;
            };
        }
        if (kind === 'setter') {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = value.apply(this, args);
                return result;
            };
        }
    }
    // 属性装饰器
    if (kind === 'field') {
        console.log("Logging field ".concat(value, "..."));
        return function (initValue) {
            return initValue + '----default';
        };
    }
};
var Class = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _info_decorators;
    var _info_initializers = [];
    var _info_extraInitializers = [];
    var _method_decorators;
    var _get_getName_decorators;
    var _set_setName_decorators;
    return _a = /** @class */ (function () {
            function Class(name) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.info = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _info_initializers, 'info'));
                __runInitializers(this, _info_extraInitializers);
                this.name = name;
            }
            Class.prototype.method = function (a, b) {
                return a + b;
            };
            Object.defineProperty(Class.prototype, "getName", {
                get: function () {
                    return this.name;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Class.prototype, "setName", {
                set: function (name) {
                    this.name = name;
                },
                enumerable: false,
                configurable: true
            });
            return Class;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [logged];
            _info_decorators = [logged];
            _method_decorators = [logged];
            _get_getName_decorators = [logged];
            _set_setName_decorators = [logged];
            __esDecorate(_a, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_getName_decorators, { kind: "getter", name: "getName", static: false, private: false, access: { has: function (obj) { return "getName" in obj; }, get: function (obj) { return obj.getName; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_setName_decorators, { kind: "setter", name: "setName", static: false, private: false, access: { has: function (obj) { return "setName" in obj; }, set: function (obj, value) { obj.setName = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _info_decorators, { kind: "field", name: "info", static: false, private: false, access: { has: function (obj) { return "info" in obj; }, get: function (obj) { return obj.info; }, set: function (obj, value) { obj.info = value; } }, metadata: _metadata }, _info_initializers, _info_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var c = new Class();
c.method(1, 2);
c.setName = 'hello wx';
console.log('end value', c.getName, c.info);
