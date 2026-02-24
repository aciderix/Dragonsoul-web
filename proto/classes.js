"use strict";
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(exports);
    } else {
        module(typeof self !== 'undefined' ? self : this);
}
}(function($rt_exports) {
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    let clsName = "";
    if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_cls = cls => jl_Class_getClass(cls),
$rt_objcls = () => jl_Object,
$rt_createcls = () => {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
},
$rt_createPrimitiveCls = (name, binaryName) => {
    let cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z"),
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_intcls = $rt_createPrimitiveCls("int", "I"),
$rt_longcls = $rt_createPrimitiveCls("long", "J"),
$rt_floatcls = $rt_createPrimitiveCls("float", "F"),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionFloatArray = new Float32Array($rt_numberConversionBuffer),
$rt_numberConversionIntArray = new Int32Array($rt_numberConversionBuffer),
$rt_floatToRawIntBits = n => {
    $rt_numberConversionFloatArray[0] = n;
    return $rt_numberConversionIntArray[0];
},
$rt_compare = (a, b) => a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_ge = (a, b) => a >= b,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_ucompare = (a, b) => {
    a = BigInt.asUintN(64, a);
    b = BigInt.asUintN(64, b);
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
};
let $rt_wrapArray = (cls, data) => new ($rt_arraycls(cls))(data),
$rt_createLongArrayFromData = data => {
    let buffer = new BigInt64Array(data.length);
    buffer.set(data);
    return new $rt_longArrayCls(buffer);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_arraycls = cls => {
    let result = cls.$array;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
    }
    return result;
},
$rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_6(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from.$meta.assignableCache;
    if (typeof map === 'undefined') {
        map = new Map();
        from.$meta.assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to.$meta.item !== null) {
        let result = from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
    }
    let supertypes = from.$meta.supertypes;
    for (let i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => jl_StackTraceElement,
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.info(msg)) : () => {
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {  };
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
},
$rt_startThread = (runner, callback) => {
    let result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return jl_Class_getClass($this.constructor);
},
jl_Object_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_0());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_2 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_1 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable__init_0($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
};
function cpr_NewRelicInstrumentation() {
    let a = this; jl_Object.call(a);
    a.$interactionMap = null;
    a.$isInitialized = 0;
}
let cpr_NewRelicInstrumentation__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$interactionMap = ju_HashMap__init_0();
    var$0.$isInitialized = 0;
},
cpr_NewRelicInstrumentation__init_0 = () => {
    let var_0 = new cpr_NewRelicInstrumentation();
    cpr_NewRelicInstrumentation__init_(var_0);
    return var_0;
},
jl_Iterable = $rt_classWithoutFields(0);
function cbgu_z() {
    let a = this; jl_Object.call(a);
    a.$a10 = 0;
    a.$b1 = null;
    a.$c2 = null;
    a.$d1 = 0;
    a.$e = 0;
    a.$f = 0.0;
    a.$g = 0;
    a.$h = 0;
    a.$i = 0;
    a.$j = 0;
    a.$k = 0;
}
let cbgu_z__init_0 = var$0 => {
    cbgu_z__init_1(var$0, 51, 0.800000011920929);
},
cbgu_z__init_ = () => {
    let var_0 = new cbgu_z();
    cbgu_z__init_0(var_0);
    return var_0;
},
cbgu_z__init_1 = (var$0, var$1, var$2) => {
    jl_Object__init_(var$0);
    if (var$1 < 0)
        $rt_throw(jl_IllegalArgumentException__init_0(((jl_StringBuilder__init_0($rt_s(0))).$append1(var$1)).$toString()));
    var$1 = cbgm_h_b(jl_Math_ceil(var$1 / var$2) | 0);
    if (var$1 > 1073741824)
        $rt_throw(jl_IllegalArgumentException__init_0(((jl_StringBuilder__init_0($rt_s(1))).$append1(var$1)).$toString()));
    var$0.$d1 = var$1;
    if (var$2 <= 0.0)
        $rt_throw(jl_IllegalArgumentException__init_0(((jl_StringBuilder__init_0($rt_s(2))).$append2(var$2)).$toString()));
    var$0.$f = var$2;
    var$0.$i = var$0.$d1 * var$2 | 0;
    var$0.$h = var$0.$d1 - 1 | 0;
    var$0.$g = 31 - jl_Integer_numberOfTrailingZeros(var$0.$d1) | 0;
    var$0.$j = jl_Math_max(3, (jl_Math_ceil(jl_Math_log(var$0.$d1)) | 0) << 1);
    var$0.$k = jl_Math_max(jl_Math_min(var$0.$d1, 8), (jl_Math_sqrt(var$0.$d1) | 0) / 8 | 0);
    var$0.$b1 = $rt_createArray(jl_Object, var$0.$d1 + var$0.$j | 0);
    var$0.$c2 = $rt_createArray(jl_Object, var$0.$b1.data.length);
},
cbgu_z__init_2 = (var_0, var_1) => {
    let var_2 = new cbgu_z();
    cbgu_z__init_1(var_2, var_0, var_1);
    return var_2;
},
cbgu_z_a = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8) => {
    let var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16;
    var$9 = var$0.$b1;
    var$10 = var$0.$c2;
    var$11 = var$0.$h;
    var$12 = 0;
    var$13 = var$0.$k;
    a: {
        b: {
            c: {
                while (true) {
                    d: {
                        switch (cbgm_h_a0(2)) {
                            case 0:
                                break;
                            case 1:
                                var$14 = var$9.data;
                                var$15 = var$10.data;
                                var$16 = var$15[var$5];
                                var$14[var$5] = var$1;
                                var$15[var$5] = var$2;
                                var$4 = var$6;
                                break d;
                            default:
                                var$14 = var$9.data;
                                var$15 = var$10.data;
                                var$16 = var$15[var$7];
                                var$14[var$7] = var$1;
                                var$15[var$7] = var$2;
                                var$4 = var$8;
                                break d;
                        }
                        var$14 = var$9.data;
                        var$15 = var$10.data;
                        var$16 = var$15[var$3];
                        var$14[var$3] = var$1;
                        var$15[var$3] = var$2;
                    }
                    var$15 = var$9.data;
                    var$7 = var$4.$hashCode();
                    var$3 = var$7 & var$11;
                    var$2 = var$15[var$3];
                    if (var$2 === null)
                        break b;
                    var$5 = cbgu_z_c(var$0, var$7);
                    var$6 = var$15[var$5];
                    if (var$6 === null)
                        break c;
                    var$7 = cbgu_z_d(var$0, var$7);
                    var$8 = var$15[var$7];
                    if (var$8 === null)
                        break;
                    var$12 = var$12 + 1 | 0;
                    if (var$12 == var$13) {
                        if (var$0.$e == var$0.$j) {
                            cbgu_z_b(var$0, var$0.$d1 << 1);
                            cbgu_z_c0(var$0, var$4, var$16);
                            return;
                        }
                        var$3 = var$0.$d1 + var$0.$e | 0;
                        var$0.$b1.data[var$3] = var$4;
                        var$0.$c2.data[var$3] = var$16;
                        var$0.$e = var$0.$e + 1 | 0;
                        var$0.$a10 = var$0.$a10 + 1 | 0;
                        return;
                    }
                    var$1 = var$4;
                    var$4 = var$2;
                    var$2 = var$16;
                }
                var$9 = var$10.data;
                var$15[var$7] = var$4;
                var$9[var$7] = var$16;
                var$3 = var$0.$a10;
                var$0.$a10 = var$3 + 1 | 0;
                if (var$3 < var$0.$i)
                    break a;
                cbgu_z_b(var$0, var$0.$d1 << 1);
                return;
            }
            var$9 = var$10.data;
            var$15[var$5] = var$4;
            var$9[var$5] = var$16;
            var$3 = var$0.$a10;
            var$0.$a10 = var$3 + 1 | 0;
            if (var$3 < var$0.$i)
                break a;
            cbgu_z_b(var$0, var$0.$d1 << 1);
            return;
        }
        var$9 = var$10.data;
        var$15[var$3] = var$4;
        var$9[var$3] = var$16;
        var$3 = var$0.$a10;
        var$0.$a10 = var$3 + 1 | 0;
        if (var$3 >= var$0.$i)
            cbgu_z_b(var$0, var$0.$d1 << 1);
    }
},
cbgu_z_b = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    a: {
        var$2 = var$0.$d1;
        var$3 = var$0.$e;
        var$0.$d1 = var$1;
        var$0.$i = var$1 * var$0.$f | 0;
        var$0.$h = var$1 - 1 | 0;
        var$0.$g = 31 - jl_Integer_numberOfTrailingZeros(var$1) | 0;
        var$4 = var$1;
        var$0.$j = jl_Math_max(3, (jl_Math_ceil(jl_Math_log(var$4)) | 0) << 1);
        var$0.$k = jl_Math_max(jl_Math_min(var$1, 8), (jl_Math_sqrt(var$4) | 0) / 8 | 0);
        var$5 = var$0.$b1;
        var$6 = var$0.$c2;
        var$0.$b1 = $rt_createArray(jl_Object, var$0.$j + var$1 | 0);
        var$0.$c2 = $rt_createArray(jl_Object, var$0.$j + var$1 | 0);
        var$1 = var$0.$a10;
        var$0.$a10 = 0;
        var$0.$e = 0;
        if (var$1 > 0) {
            var$7 = 0;
            while (true) {
                if (var$7 >= (var$2 + var$3 | 0))
                    break a;
                var$8 = var$5.data[var$7];
                if (var$8 !== null) {
                    var$9 = var$6.data[var$7];
                    var$10 = var$8.$hashCode();
                    var$11 = var$0.$h & var$10;
                    var$12 = var$0.$b1.data[var$11];
                    if (var$12 === null) {
                        var$0.$b1.data[var$11] = var$8;
                        var$0.$c2.data[var$11] = var$9;
                        var$1 = var$0.$a10;
                        var$0.$a10 = var$1 + 1 | 0;
                        if (var$1 >= var$0.$i)
                            cbgu_z_b(var$0, var$0.$d1 << 1);
                    } else {
                        var$1 = cbgu_z_c(var$0, var$10);
                        var$13 = var$0.$b1.data[var$1];
                        if (var$13 === null) {
                            var$0.$b1.data[var$1] = var$8;
                            var$0.$c2.data[var$1] = var$9;
                            var$1 = var$0.$a10;
                            var$0.$a10 = var$1 + 1 | 0;
                            if (var$1 >= var$0.$i)
                                cbgu_z_b(var$0, var$0.$d1 << 1);
                        } else {
                            var$10 = cbgu_z_d(var$0, var$10);
                            var$14 = var$0.$b1.data[var$10];
                            if (var$14 !== null)
                                cbgu_z_a(var$0, var$8, var$9, var$11, var$12, var$1, var$13, var$10, var$14);
                            else {
                                var$0.$b1.data[var$10] = var$8;
                                var$0.$c2.data[var$10] = var$9;
                                var$10 = var$0.$a10;
                                var$0.$a10 = var$10 + 1 | 0;
                                if (var$10 >= var$0.$i)
                                    cbgu_z_b(var$0, var$0.$d1 << 1);
                            }
                        }
                    }
                }
                var$7 = var$7 + 1 | 0;
            }
        }
    }
},
cbgu_z_c = (var$0, var$1) => {
    var$1 = $rt_imul((-1262997959), var$1);
    return (var$1 ^ (var$1 >>> var$0.$g | 0)) & var$0.$h;
},
cbgu_z_c0 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    var$3 = var$0.$b1.data;
    var$4 = var$1.$hashCode();
    var$5 = var$4 & var$0.$h;
    var$6 = var$3[var$5];
    if (var$1.$equals(var$6)) {
        var$1 = var$0.$c2.data[var$5];
        var$0.$c2.data[var$5] = var$2;
        return var$1;
    }
    var$7 = cbgu_z_c(var$0, var$4);
    var$8 = var$3[var$7];
    if (var$1.$equals(var$8)) {
        var$1 = var$0.$c2.data[var$7];
        var$0.$c2.data[var$7] = var$2;
        return var$1;
    }
    var$9 = cbgu_z_d(var$0, var$4);
    var$10 = var$3[var$9];
    if (var$1.$equals(var$10)) {
        var$1 = var$0.$c2.data[var$9];
        var$0.$c2.data[var$9] = var$2;
        return var$1;
    }
    var$11 = var$0.$d1;
    var$12 = var$0.$e;
    var$13 = var$11;
    while (true) {
        if (var$13 >= (var$11 + var$12 | 0)) {
            if (var$6 === null) {
                var$3[var$5] = var$1;
                var$0.$c2.data[var$5] = var$2;
                var$4 = var$0.$a10;
                var$0.$a10 = var$4 + 1 | 0;
                if (var$4 >= var$0.$i)
                    cbgu_z_b(var$0, var$0.$d1 << 1);
                return null;
            }
            if (var$8 === null) {
                var$3[var$7] = var$1;
                var$0.$c2.data[var$7] = var$2;
                var$4 = var$0.$a10;
                var$0.$a10 = var$4 + 1 | 0;
                if (var$4 >= var$0.$i)
                    cbgu_z_b(var$0, var$0.$d1 << 1);
                return null;
            }
            if (var$10 !== null) {
                cbgu_z_a(var$0, var$1, var$2, var$5, var$6, var$7, var$8, var$9, var$10);
                return null;
            }
            var$3[var$9] = var$1;
            var$0.$c2.data[var$9] = var$2;
            var$4 = var$0.$a10;
            var$0.$a10 = var$4 + 1 | 0;
            if (var$4 >= var$0.$i)
                cbgu_z_b(var$0, var$0.$d1 << 1);
            return null;
        }
        if (var$1.$equals(var$3[var$13]))
            break;
        var$13 = var$13 + 1 | 0;
    }
    var$1 = var$0.$c2.data[var$13];
    var$0.$c2.data[var$13] = var$2;
    return var$1;
},
cbgu_z_d = (var$0, var$1) => {
    var$1 = $rt_imul((-825114047), var$1);
    return (var$1 ^ (var$1 >>> var$0.$g | 0)) & var$0.$h;
},
cbgu_z_a0 = (var$0, var$1, var$2) => {
    if (var$1 !== null)
        return cbgu_z_c0(var$0, var$1, var$2);
    $rt_throw(jl_IllegalArgumentException__init_0($rt_s(3)));
},
cbgu_z_a1 = var$0 => {
    let var$1, var$2, var$3, var$4, var$5;
    if (!var$0.$a10)
        return;
    var$1 = var$0.$b1;
    var$2 = var$0.$c2;
    var$3 = var$0.$d1 + var$0.$e | 0;
    while (true) {
        var$4 = var$3 - 1 | 0;
        if (var$3 <= 0)
            break;
        var$5 = var$2.data;
        var$1.data[var$4] = null;
        var$5[var$4] = null;
        var$3 = var$4;
    }
    var$0.$a10 = 0;
    var$0.$e = 0;
},
cprgo_IEntity = $rt_classWithoutFields(0),
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value3 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value3 = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_valueOf = $i => {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_0($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4 | 0;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 << 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 << 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 << 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder$Constants = $rt_classWithoutFields(),
jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null,
jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null,
jl_AbstractStringBuilder$Constants_floatAnalysisResult = null,
jl_AbstractStringBuilder$Constants_$callClinit = () => {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
},
jl_AbstractStringBuilder$Constants__clinit_ = () => {
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_0();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_0();
};
function jl_Long() {
    jl_Number.call(this);
    this.$value4 = Long_ZERO;
}
let jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long__init_ = ($this, $value) => {
    jl_Long_$callClinit();
    jl_Number__init_($this);
    $this.$value4 = $value;
},
jl_Long__init_0 = var_0 => {
    let var_1 = new jl_Long();
    jl_Long__init_(var_1, var_0);
    return var_1;
},
jl_Long_valueOf = $value => {
    jl_Long_$callClinit();
    return jl_Long__init_0($value);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
},
ju_Map = $rt_classWithoutFields(0),
jl_Runnable = $rt_classWithoutFields(0);
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name1 = null;
    a.$alive = 0;
    a.$target = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread__init_0 = ($this, $name) => {
    jl_Thread_$callClinit();
    jl_Thread__init_($this, null, $name);
},
jl_Thread__init_1 = var_0 => {
    let var_1 = new jl_Thread();
    jl_Thread__init_0(var_1, var_0);
    return var_1;
},
jl_Thread__init_ = ($this, $target, $name) => {
    let var$3;
    jl_Thread_$callClinit();
    jl_Object__init_($this);
    $this.$finishedLock = jl_Object__init_0();
    $this.$alive = 1;
    $this.$name1 = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id = Long_fromInt(var$3);
},
jl_Thread__init_2 = (var_0, var_1) => {
    let var_2 = new jl_Thread();
    jl_Thread__init_(var_2, var_0, var_1);
    return var_2;
},
jl_Thread_setCurrentThread = $thread_0 => {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread !== $thread_0)
        jl_Thread_currentThread = $thread_0;
    jl_Thread_currentThread.$timeSliceStart = jl_System_currentTimeMillis();
},
jl_Thread_currentThread0 = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread;
},
jl_Thread_getStackTrace = $this => {
    return $rt_createArray(jl_StackTraceElement, 0);
},
jl_Thread__clinit_ = () => {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(4));
    jl_Thread_currentThread = jl_Thread_mainThread;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = jl_DefaultUncaughtExceptionHandler__init_0();
},
ju_Map$Entry = $rt_classWithoutFields(0),
jl_Cloneable = $rt_classWithoutFields(0),
juc_MapEntry = $rt_classWithoutFields(),
juc_ConcurrentHashMap$HashEntry = $rt_classWithoutFields(juc_MapEntry);
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal0 = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name0 = $name;
    $this.$ordinal0 = $ordinal;
},
jl_Enum_ordinal = $this => {
    return $this.$ordinal0;
},
jl_Enum_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Enum_hashCode = $this => {
    return jl_Object_hashCode($this);
},
cprnm_AppReviewStatus = $rt_classWithoutFields(jl_Enum),
cprnm_AppReviewStatus_$VALUES = null,
cprnm_AppReviewStatus_NEVER = null,
cprnm_AppReviewStatus_NO_RESPONSE = null,
cprnm_AppReviewStatus_REVIEWED = null,
cprnm_AppReviewStatus_values0 = null,
cprnm_AppReviewStatus_$callClinit = () => {
    cprnm_AppReviewStatus_$callClinit = $rt_eraseClinit(cprnm_AppReviewStatus);
    cprnm_AppReviewStatus__clinit_();
},
cprnm_AppReviewStatus__clinit_ = () => {
    let var$1, var$2;
    cprnm_AppReviewStatus_NO_RESPONSE = cprnm_AppReviewStatus__init_($rt_s(5), 0);
    cprnm_AppReviewStatus_REVIEWED = cprnm_AppReviewStatus__init_($rt_s(6), 1);
    cprnm_AppReviewStatus_NEVER = cprnm_AppReviewStatus__init_($rt_s(7), 2);
    var$1 = $rt_createArray(cprnm_AppReviewStatus, 3);
    var$2 = var$1.data;
    var$2[0] = cprnm_AppReviewStatus_NO_RESPONSE;
    var$2[1] = cprnm_AppReviewStatus_REVIEWED;
    var$2[2] = cprnm_AppReviewStatus_NEVER;
    cprnm_AppReviewStatus_$VALUES = var$1;
    cprnm_AppReviewStatus_values0 = cprnm_AppReviewStatus_values();
},
cprnm_AppReviewStatus__init_0 = (var$0, var$1, var$2) => {
    cprnm_AppReviewStatus_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_AppReviewStatus__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_AppReviewStatus();
    cprnm_AppReviewStatus__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_AppReviewStatus_values = () => {
    cprnm_AppReviewStatus_$callClinit();
    return cprnm_AppReviewStatus_$VALUES.$clone0();
},
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_EnumSet = $rt_classWithoutFields(ju_AbstractSet),
ju_EnumSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_EnumSet_noneOf = $elementType => {
    return ju_GenericEnumSet__init_0($elementType);
};
function cpaa_i() {
    let a = this; jl_Object.call(a);
    a.$fullName = null;
    a.$storedMetaTag = 0;
    a.$version0 = null;
}
let cpaa_i__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    cpaa_l_$callClinit();
    var$0.$version0 = cpaa_l_b;
    var$0.$storedMetaTag = (-1);
    var$0.$fullName = var$1;
};
function cprnm_TitanTempleSummary() {
    let a = this; cpaa_i.call(a);
    a.$attackInProgress = null;
    a.$attemptsRemaining = null;
    a.$expireTime = null;
    a.$freeInvitesRemaining = null;
    a.$guildID0 = null;
    a.$level = null;
    a.$owner = null;
    a.$templeID = null;
    a.$titansRemaining = null;
    a.$totalTitans = null;
    a.$unclaimedRewards = null;
}
let cprnm_TitanTempleSummary__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(8));
    var$0.$templeID = jl_Long_valueOf(Long_ZERO);
    var$0.$expireTime = jl_Long_valueOf(Long_ZERO);
    var$0.$level = jl_Integer_valueOf(0);
    var$0.$owner = cprnm_BasicUserInfo__init_0();
    var$0.$titansRemaining = jl_Integer_valueOf(0);
    var$0.$totalTitans = jl_Integer_valueOf(0);
    var$0.$attemptsRemaining = jl_Integer_valueOf(0);
    var$0.$freeInvitesRemaining = jl_Integer_valueOf(0);
    var$0.$attackInProgress = jl_Boolean_valueOf(0);
    var$0.$unclaimedRewards = jl_Boolean_valueOf(0);
    var$0.$guildID0 = jl_Long_valueOf(Long_ZERO);
},
cprnm_TitanTempleSummary__init_0 = () => {
    let var_0 = new cprnm_TitanTempleSummary();
    cprnm_TitanTempleSummary__init_(var_0);
    return var_0;
},
aa_e = $rt_classWithoutFields(0),
cprt_CombatTextLabelAccessor = $rt_classWithoutFields(),
cprt_CombatTextLabelAccessor_$assertionsDisabled = 0,
cprt_CombatTextLabelAccessor_$callClinit = () => {
    cprt_CombatTextLabelAccessor_$callClinit = $rt_eraseClinit(cprt_CombatTextLabelAccessor);
    cprt_CombatTextLabelAccessor__clinit_();
},
cprt_CombatTextLabelAccessor__clinit_ = () => {
    cprt_CombatTextLabelAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_CombatTextLabelAccessor)) ? 0 : 1;
},
cprt_CombatTextLabelAccessor__init_ = var$0 => {
    cprt_CombatTextLabelAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_CombatTextLabelAccessor__init_0 = () => {
    let var_0 = new cprt_CombatTextLabelAccessor();
    cprt_CombatTextLabelAccessor__init_(var_0);
    return var_0;
},
cprgo_IUser = $rt_classWithoutFields(0);
function cprgo_User() {
    let a = this; jl_Object.call(a);
    a.$completedQuests = null;
    a.$contestData = null;
    a.$counts0 = null;
    a.$extra = null;
    a.$flags0 = null;
    a.$heroes0 = null;
    a.$lootMemoryChanges = null;
    a.$mailMessages = null;
    a.$merchantData0 = null;
    a.$merchantItems = null;
    a.$randoms = null;
    a.$runes0 = null;
    a.$tutorialActs = null;
}
let cprgo_User_$assertionsDisabled = 0,
cprgo_User_$callClinit = () => {
    cprgo_User_$callClinit = $rt_eraseClinit(cprgo_User);
    cprgo_User__clinit_();
},
cprgo_User__clinit_ = () => {
    cprgo_User_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprgo_User)) ? 0 : 1;
},
cprgo_User__init_ = var$0 => {
    let var$1, var$2, var$3, var$4, var$5;
    cprgo_User_$callClinit();
    jl_Object__init_(var$0);
    var$0.$extra = cprnm_UserExtra__init_0();
    var$0.$tutorialActs = ju_EnumMap__init_($rt_cls(cprnm_TutorialActType));
    var$0.$flags0 = ju_EnumSet_noneOf($rt_cls(cprgo_UserFlag));
    var$0.$counts0 = ju_EnumMap__init_($rt_cls(cprgo_UserFlag));
    var$0.$heroes0 = cbgu_z__init_();
    var$0.$mailMessages = cbgu_a__init_();
    var$0.$merchantItems = ju_EnumMap__init_($rt_cls(cprnm_MerchantType));
    var$0.$merchantData0 = ju_EnumMap__init_($rt_cls(cprnm_MerchantType));
    var$0.$randoms = ju_EnumMap__init_($rt_cls(cprnm_RandomSeedType));
    var$0.$completedQuests = cbgu_p__init_1();
    var$0.$runes0 = cbgu_a__init_();
    var$0.$contestData = ju_HashMap__init_0();
    var$0.$lootMemoryChanges = ju_ArrayList__init_1();
    var$1 = ju_Collections_emptyList();
    var$2 = (cprnm_MerchantType_valuesCached()).data;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        var$5 = var$2[var$4];
        var$0.$merchantItems.$put(var$5, var$1);
        var$4 = var$4 + 1 | 0;
    }
},
cprgo_User__init_0 = () => {
    let var_0 = new cprgo_User();
    cprgo_User__init_(var_0);
    return var_0;
};
function cbgu_a() {
    let a = this; jl_Object.call(a);
    a.$a13 = null;
    a.$c4 = 0;
}
let cbgu_a_g = null,
cbgu_a_$callClinit = () => {
    cbgu_a_$callClinit = $rt_eraseClinit(cbgu_a);
    cbgu_a__clinit_();
},
cbgu_a__clinit_ = () => {
    cbgu_a_g = cbgu_a$1__init_0(4, 16);
},
cbgu_a__init_1 = var$0 => {
    cbgu_a_$callClinit();
    cbgu_a__init_0(var$0, 1, 16);
},
cbgu_a__init_ = () => {
    let var_0 = new cbgu_a();
    cbgu_a__init_1(var_0);
    return var_0;
},
cbgu_a__init_0 = (var$0, var$1, var$2) => {
    cbgu_a_$callClinit();
    jl_Object__init_(var$0);
    var$0.$c4 = var$1;
    var$0.$a13 = $rt_createArray(jl_Object, var$2);
},
cbgu_a__init_2 = (var_0, var_1) => {
    let var_2 = new cbgu_a();
    cbgu_a__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_GuildNewMemberPolicy = $rt_classWithoutFields(jl_Enum),
cprnm_GuildNewMemberPolicy_$VALUES = null,
cprnm_GuildNewMemberPolicy_APPLICATION_ONLY = null,
cprnm_GuildNewMemberPolicy_OPEN = null,
cprnm_GuildNewMemberPolicy_PRIVATE = null,
cprnm_GuildNewMemberPolicy_values0 = null,
cprnm_GuildNewMemberPolicy_$callClinit = () => {
    cprnm_GuildNewMemberPolicy_$callClinit = $rt_eraseClinit(cprnm_GuildNewMemberPolicy);
    cprnm_GuildNewMemberPolicy__clinit_();
},
cprnm_GuildNewMemberPolicy__clinit_ = () => {
    let var$1, var$2;
    cprnm_GuildNewMemberPolicy_PRIVATE = cprnm_GuildNewMemberPolicy__init_($rt_s(9), 0);
    cprnm_GuildNewMemberPolicy_APPLICATION_ONLY = cprnm_GuildNewMemberPolicy__init_($rt_s(10), 1);
    cprnm_GuildNewMemberPolicy_OPEN = cprnm_GuildNewMemberPolicy__init_($rt_s(11), 2);
    var$1 = $rt_createArray(cprnm_GuildNewMemberPolicy, 3);
    var$2 = var$1.data;
    var$2[0] = cprnm_GuildNewMemberPolicy_PRIVATE;
    var$2[1] = cprnm_GuildNewMemberPolicy_APPLICATION_ONLY;
    var$2[2] = cprnm_GuildNewMemberPolicy_OPEN;
    cprnm_GuildNewMemberPolicy_$VALUES = var$1;
    cprnm_GuildNewMemberPolicy_values0 = cprnm_GuildNewMemberPolicy_values();
},
cprnm_GuildNewMemberPolicy__init_0 = (var$0, var$1, var$2) => {
    cprnm_GuildNewMemberPolicy_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_GuildNewMemberPolicy__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_GuildNewMemberPolicy();
    cprnm_GuildNewMemberPolicy__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_GuildNewMemberPolicy_values = () => {
    cprnm_GuildNewMemberPolicy_$callClinit();
    return cprnm_GuildNewMemberPolicy_$VALUES.$clone0();
},
cprnm_TutorialActType = $rt_classWithoutFields(jl_Enum),
cprnm_TutorialActType_$VALUES = null,
cprnm_TutorialActType_ACHIEVEMENTS = null,
cprnm_TutorialActType_AUTO_FIGHT = null,
cprnm_TutorialActType_BOSS_PIT = null,
cprnm_TutorialActType_CRAFTING = null,
cprnm_TutorialActType_CRYPT = null,
cprnm_TutorialActType_DAILY_QUEST = null,
cprnm_TutorialActType_DEFAULT = null,
cprnm_TutorialActType_ENCHANTING = null,
cprnm_TutorialActType_EQUIPPING_HERO = null,
cprnm_TutorialActType_EVIL_WIZARD_STORY = null,
cprnm_TutorialActType_EVOLVING_HERO = null,
cprnm_TutorialActType_FIGHT_PIT = null,
cprnm_TutorialActType_GIANT_PLANT_STORY = null,
cprnm_TutorialActType_GOLD_COLOSSUS_STORY = null,
cprnm_TutorialActType_GUILD_WAR = null,
cprnm_TutorialActType_INTRO = null,
cprnm_TutorialActType_LEGENDARY_QUEST_INFO = null,
cprnm_TutorialActType_LQ_ANGELIC_HERALD = null,
cprnm_TutorialActType_LQ_AQUATIC_MAN = null,
cprnm_TutorialActType_LQ_BARDBARIAN = null,
cprnm_TutorialActType_LQ_BONE_DRAGON = null,
cprnm_TutorialActType_LQ_BROZERKER = null,
cprnm_TutorialActType_LQ_CATAPULT_KNIGHT = null,
cprnm_TutorialActType_LQ_CENTAUR_OF_ATTENTION = null,
cprnm_TutorialActType_LQ_COSMIC_ELF = null,
cprnm_TutorialActType_LQ_CRIMSON_WITCH = null,
cprnm_TutorialActType_LQ_DARK_DRAKUL = null,
cprnm_TutorialActType_LQ_DARK_HORSE = null,
cprnm_TutorialActType_LQ_DEEP_DRAGON = null,
cprnm_TutorialActType_LQ_DEMON_TOTEM = null;
let cprnm_TutorialActType_LQ_DRAGON_LADY = null,
cprnm_TutorialActType_LQ_DRAGZILLA = null,
cprnm_TutorialActType_LQ_DRUIDINATRIX = null,
cprnm_TutorialActType_LQ_DUST_DEVIL = null,
cprnm_TutorialActType_LQ_DWARVEN_ARCHER = null,
cprnm_TutorialActType_LQ_ELECTROYETI = null,
cprnm_TutorialActType_LQ_ETERNAL_ENCHANTER = null,
cprnm_TutorialActType_LQ_FAITH_HEALER = null,
cprnm_TutorialActType_LQ_FROST_GIANT = null,
cprnm_TutorialActType_LQ_GENIE = null,
cprnm_TutorialActType_LQ_GROOVY_DRUID = null,
cprnm_TutorialActType_LQ_HYDRA = null,
cprnm_TutorialActType_LQ_MAGIC_DRAGON = null,
cprnm_TutorialActType_LQ_MEDUSA = null,
cprnm_TutorialActType_LQ_MINOTAUR = null,
cprnm_TutorialActType_LQ_MOON_DRAKE = null,
cprnm_TutorialActType_LQ_NINJA_DWARF = null,
cprnm_TutorialActType_LQ_ORC_MONK = null,
cprnm_TutorialActType_LQ_PIRATE = null,
cprnm_TutorialActType_LQ_POLEMASTER = null,
cprnm_TutorialActType_LQ_RABID_DRAGON = null,
cprnm_TutorialActType_LQ_RAGING_REVENANT = null,
cprnm_TutorialActType_LQ_ROLLER_WARRIOR = null,
cprnm_TutorialActType_LQ_SATYR = null,
cprnm_TutorialActType_LQ_SAVAGE_CUTIE = null,
cprnm_TutorialActType_LQ_SHADOW_ASSASSIN = null,
cprnm_TutorialActType_LQ_SKELETON_KING = null,
cprnm_TutorialActType_LQ_SNAP_DRAGON = null,
cprnm_TutorialActType_LQ_SOJOURNER_SORCERESS = null,
cprnm_TutorialActType_LQ_SPIKEY_DRAGON = null,
cprnm_TutorialActType_LQ_SPIRIT_WOLF = null,
cprnm_TutorialActType_LQ_STORM_DRAGON = null,
cprnm_TutorialActType_LQ_UNICORGI = null,
cprnm_TutorialActType_LQ_UNSTABLE_UNDERSTUDY = null,
cprnm_TutorialActType_LQ_VULTURE_DRAGON = null,
cprnm_TutorialActType_LQ_WEREDRAGON = null,
cprnm_TutorialActType_LQ_ZOMBIE_SQUIRE = null,
cprnm_TutorialActType_MYSTIC_CLOSET = null,
cprnm_TutorialActType_MYSTIC_CLOSET_EQUIP = null,
cprnm_TutorialActType_POWER_POINTS = null,
cprnm_TutorialActType_POWER_USE = null,
cprnm_TutorialActType_PROMOTE_HERO = null,
cprnm_TutorialActType_RUNES = null,
cprnm_TutorialActType_RUNE_FUSION = null,
cprnm_TutorialActType_RUNE_SHRINE = null,
cprnm_TutorialActType_STORY = null,
cprnm_TutorialActType_TEMPLE_INVITE = null,
cprnm_TutorialActType_TEMPLE_YOURS = null,
cprnm_TutorialActType_UNLOCK_HERO = null,
cprnm_TutorialActType_values0 = null;
let cprnm_TutorialActType_$callClinit = () => {
    cprnm_TutorialActType_$callClinit = $rt_eraseClinit(cprnm_TutorialActType);
    cprnm_TutorialActType__clinit_();
},
cprnm_TutorialActType__clinit_ = () => {
    let var$1, var$2;
    cprnm_TutorialActType_DEFAULT = cprnm_TutorialActType__init_($rt_s(12), 0);
    cprnm_TutorialActType_INTRO = cprnm_TutorialActType__init_($rt_s(13), 1);
    cprnm_TutorialActType_POWER_USE = cprnm_TutorialActType__init_($rt_s(14), 2);
    cprnm_TutorialActType_ACHIEVEMENTS = cprnm_TutorialActType__init_($rt_s(15), 3);
    cprnm_TutorialActType_UNLOCK_HERO = cprnm_TutorialActType__init_($rt_s(16), 4);
    cprnm_TutorialActType_PROMOTE_HERO = cprnm_TutorialActType__init_($rt_s(17), 5);
    cprnm_TutorialActType_DAILY_QUEST = cprnm_TutorialActType__init_($rt_s(18), 6);
    cprnm_TutorialActType_POWER_POINTS = cprnm_TutorialActType__init_($rt_s(19), 7);
    cprnm_TutorialActType_CRAFTING = cprnm_TutorialActType__init_($rt_s(20), 8);
    cprnm_TutorialActType_EQUIPPING_HERO = cprnm_TutorialActType__init_($rt_s(21), 9);
    cprnm_TutorialActType_EVOLVING_HERO = cprnm_TutorialActType__init_($rt_s(22), 10);
    cprnm_TutorialActType_AUTO_FIGHT = cprnm_TutorialActType__init_($rt_s(23), 11);
    cprnm_TutorialActType_FIGHT_PIT = cprnm_TutorialActType__init_($rt_s(24), 12);
    cprnm_TutorialActType_STORY = cprnm_TutorialActType__init_($rt_s(25), 13);
    cprnm_TutorialActType_ENCHANTING = cprnm_TutorialActType__init_($rt_s(26), 14);
    cprnm_TutorialActType_CRYPT = cprnm_TutorialActType__init_($rt_s(27), 15);
    cprnm_TutorialActType_TEMPLE_YOURS = cprnm_TutorialActType__init_($rt_s(28), 16);
    cprnm_TutorialActType_TEMPLE_INVITE = cprnm_TutorialActType__init_($rt_s(29), 17);
    cprnm_TutorialActType_BOSS_PIT = cprnm_TutorialActType__init_($rt_s(30), 18);
    cprnm_TutorialActType_EVIL_WIZARD_STORY = cprnm_TutorialActType__init_($rt_s(31), 19);
    cprnm_TutorialActType_GIANT_PLANT_STORY = cprnm_TutorialActType__init_($rt_s(32), 20);
    cprnm_TutorialActType_GOLD_COLOSSUS_STORY = cprnm_TutorialActType__init_($rt_s(33), 21);
    cprnm_TutorialActType_GUILD_WAR = cprnm_TutorialActType__init_($rt_s(34), 22);
    cprnm_TutorialActType_LEGENDARY_QUEST_INFO = cprnm_TutorialActType__init_($rt_s(35), 23);
    cprnm_TutorialActType_LQ_BROZERKER = cprnm_TutorialActType__init_($rt_s(36), 24);
    cprnm_TutorialActType_LQ_MEDUSA = cprnm_TutorialActType__init_($rt_s(37), 25);
    cprnm_TutorialActType_LQ_DUST_DEVIL = cprnm_TutorialActType__init_($rt_s(38), 26);
    cprnm_TutorialActType_LQ_FAITH_HEALER = cprnm_TutorialActType__init_($rt_s(39), 27);
    cprnm_TutorialActType_LQ_DARK_DRAKUL = cprnm_TutorialActType__init_($rt_s(40), 28);
    cprnm_TutorialActType_LQ_CATAPULT_KNIGHT = cprnm_TutorialActType__init_($rt_s(41), 29);
    cprnm_TutorialActType_LQ_NINJA_DWARF = cprnm_TutorialActType__init_($rt_s(42), 30);
    cprnm_TutorialActType_LQ_SNAP_DRAGON = cprnm_TutorialActType__init_($rt_s(43), 31);
    cprnm_TutorialActType_LQ_POLEMASTER = cprnm_TutorialActType__init_($rt_s(44), 32);
    cprnm_TutorialActType_LQ_ZOMBIE_SQUIRE = cprnm_TutorialActType__init_($rt_s(45), 33);
    cprnm_TutorialActType_LQ_MAGIC_DRAGON = cprnm_TutorialActType__init_($rt_s(46), 34);
    cprnm_TutorialActType_LQ_GROOVY_DRUID = cprnm_TutorialActType__init_($rt_s(47), 35);
    cprnm_TutorialActType_LQ_DRAGON_LADY = cprnm_TutorialActType__init_($rt_s(48), 36);
    cprnm_TutorialActType_LQ_SHADOW_ASSASSIN = cprnm_TutorialActType__init_($rt_s(49), 37);
    cprnm_TutorialActType_LQ_ELECTROYETI = cprnm_TutorialActType__init_($rt_s(50), 38);
    cprnm_TutorialActType_LQ_FROST_GIANT = cprnm_TutorialActType__init_($rt_s(51), 39);
    cprnm_TutorialActType_LQ_UNSTABLE_UNDERSTUDY = cprnm_TutorialActType__init_($rt_s(52), 40);
    cprnm_TutorialActType_RUNES = cprnm_TutorialActType__init_($rt_s(53), 41);
    cprnm_TutorialActType_RUNE_SHRINE = cprnm_TutorialActType__init_($rt_s(54), 42);
    cprnm_TutorialActType_RUNE_FUSION = cprnm_TutorialActType__init_($rt_s(55), 43);
    cprnm_TutorialActType_LQ_HYDRA = cprnm_TutorialActType__init_($rt_s(56), 44);
    cprnm_TutorialActType_LQ_BARDBARIAN = cprnm_TutorialActType__init_($rt_s(57), 45);
    cprnm_TutorialActType_LQ_AQUATIC_MAN = cprnm_TutorialActType__init_($rt_s(58), 46);
    cprnm_TutorialActType_LQ_DRUIDINATRIX = cprnm_TutorialActType__init_($rt_s(59), 47);
    cprnm_TutorialActType_LQ_CENTAUR_OF_ATTENTION = cprnm_TutorialActType__init_($rt_s(60), 48);
    cprnm_TutorialActType_LQ_MOON_DRAKE = cprnm_TutorialActType__init_($rt_s(61), 49);
    cprnm_TutorialActType_LQ_COSMIC_ELF = cprnm_TutorialActType__init_($rt_s(62), 50);
    cprnm_TutorialActType_LQ_SAVAGE_CUTIE = cprnm_TutorialActType__init_($rt_s(63), 51);
    cprnm_TutorialActType_MYSTIC_CLOSET = cprnm_TutorialActType__init_($rt_s(64), 52);
    cprnm_TutorialActType_MYSTIC_CLOSET_EQUIP = cprnm_TutorialActType__init_($rt_s(65), 53);
    cprnm_TutorialActType_LQ_BONE_DRAGON = cprnm_TutorialActType__init_($rt_s(66), 54);
    cprnm_TutorialActType_LQ_SPIRIT_WOLF = cprnm_TutorialActType__init_($rt_s(67), 55);
    cprnm_TutorialActType_LQ_RABID_DRAGON = cprnm_TutorialActType__init_($rt_s(68), 56);
    cprnm_TutorialActType_LQ_ORC_MONK = cprnm_TutorialActType__init_($rt_s(69), 57);
    cprnm_TutorialActType_LQ_ROLLER_WARRIOR = cprnm_TutorialActType__init_($rt_s(70), 58);
    cprnm_TutorialActType_LQ_UNICORGI = cprnm_TutorialActType__init_($rt_s(71), 59);
    cprnm_TutorialActType_LQ_PIRATE = cprnm_TutorialActType__init_($rt_s(72), 60);
    cprnm_TutorialActType_LQ_DWARVEN_ARCHER = cprnm_TutorialActType__init_($rt_s(73), 61);
    cprnm_TutorialActType_LQ_SATYR = cprnm_TutorialActType__init_($rt_s(74), 62);
    cprnm_TutorialActType_LQ_SKELETON_KING = cprnm_TutorialActType__init_($rt_s(75), 63);
    cprnm_TutorialActType_LQ_DARK_HORSE = cprnm_TutorialActType__init_($rt_s(76), 64);
    cprnm_TutorialActType_LQ_DEEP_DRAGON = cprnm_TutorialActType__init_($rt_s(77), 65);
    cprnm_TutorialActType_LQ_STORM_DRAGON = cprnm_TutorialActType__init_($rt_s(78), 66);
    cprnm_TutorialActType_LQ_MINOTAUR = cprnm_TutorialActType__init_($rt_s(79), 67);
    cprnm_TutorialActType_LQ_SPIKEY_DRAGON = cprnm_TutorialActType__init_($rt_s(80), 68);
    cprnm_TutorialActType_LQ_CRIMSON_WITCH = cprnm_TutorialActType__init_($rt_s(81), 69);
    cprnm_TutorialActType_LQ_DEMON_TOTEM = cprnm_TutorialActType__init_($rt_s(82), 70);
    cprnm_TutorialActType_LQ_GENIE = cprnm_TutorialActType__init_($rt_s(83), 71);
    cprnm_TutorialActType_LQ_ETERNAL_ENCHANTER = cprnm_TutorialActType__init_($rt_s(84), 72);
    cprnm_TutorialActType_LQ_DRAGZILLA = cprnm_TutorialActType__init_($rt_s(85), 73);
    cprnm_TutorialActType_LQ_RAGING_REVENANT = cprnm_TutorialActType__init_($rt_s(86), 74);
    cprnm_TutorialActType_LQ_ANGELIC_HERALD = cprnm_TutorialActType__init_($rt_s(87), 75);
    cprnm_TutorialActType_LQ_WEREDRAGON = cprnm_TutorialActType__init_($rt_s(88), 76);
    cprnm_TutorialActType_LQ_VULTURE_DRAGON = cprnm_TutorialActType__init_($rt_s(89), 77);
    cprnm_TutorialActType_LQ_SOJOURNER_SORCERESS = cprnm_TutorialActType__init_($rt_s(90), 78);
    var$1 = $rt_createArray(cprnm_TutorialActType, 79);
    var$2 = var$1.data;
    var$2[0] = cprnm_TutorialActType_DEFAULT;
    var$2[1] = cprnm_TutorialActType_INTRO;
    var$2[2] = cprnm_TutorialActType_POWER_USE;
    var$2[3] = cprnm_TutorialActType_ACHIEVEMENTS;
    var$2[4] = cprnm_TutorialActType_UNLOCK_HERO;
    var$2[5] = cprnm_TutorialActType_PROMOTE_HERO;
    var$2[6] = cprnm_TutorialActType_DAILY_QUEST;
    var$2[7] = cprnm_TutorialActType_POWER_POINTS;
    var$2[8] = cprnm_TutorialActType_CRAFTING;
    var$2[9] = cprnm_TutorialActType_EQUIPPING_HERO;
    var$2[10] = cprnm_TutorialActType_EVOLVING_HERO;
    var$2[11] = cprnm_TutorialActType_AUTO_FIGHT;
    var$2[12] = cprnm_TutorialActType_FIGHT_PIT;
    var$2[13] = cprnm_TutorialActType_STORY;
    var$2[14] = cprnm_TutorialActType_ENCHANTING;
    var$2[15] = cprnm_TutorialActType_CRYPT;
    var$2[16] = cprnm_TutorialActType_TEMPLE_YOURS;
    var$2[17] = cprnm_TutorialActType_TEMPLE_INVITE;
    var$2[18] = cprnm_TutorialActType_BOSS_PIT;
    var$2[19] = cprnm_TutorialActType_EVIL_WIZARD_STORY;
    var$2[20] = cprnm_TutorialActType_GIANT_PLANT_STORY;
    var$2[21] = cprnm_TutorialActType_GOLD_COLOSSUS_STORY;
    var$2[22] = cprnm_TutorialActType_GUILD_WAR;
    var$2[23] = cprnm_TutorialActType_LEGENDARY_QUEST_INFO;
    var$2[24] = cprnm_TutorialActType_LQ_BROZERKER;
    var$2[25] = cprnm_TutorialActType_LQ_MEDUSA;
    var$2[26] = cprnm_TutorialActType_LQ_DUST_DEVIL;
    var$2[27] = cprnm_TutorialActType_LQ_FAITH_HEALER;
    var$2[28] = cprnm_TutorialActType_LQ_DARK_DRAKUL;
    var$2[29] = cprnm_TutorialActType_LQ_CATAPULT_KNIGHT;
    var$2[30] = cprnm_TutorialActType_LQ_NINJA_DWARF;
    var$2[31] = cprnm_TutorialActType_LQ_SNAP_DRAGON;
    var$2[32] = cprnm_TutorialActType_LQ_POLEMASTER;
    var$2[33] = cprnm_TutorialActType_LQ_ZOMBIE_SQUIRE;
    var$2[34] = cprnm_TutorialActType_LQ_MAGIC_DRAGON;
    var$2[35] = cprnm_TutorialActType_LQ_GROOVY_DRUID;
    var$2[36] = cprnm_TutorialActType_LQ_DRAGON_LADY;
    var$2[37] = cprnm_TutorialActType_LQ_SHADOW_ASSASSIN;
    var$2[38] = cprnm_TutorialActType_LQ_ELECTROYETI;
    var$2[39] = cprnm_TutorialActType_LQ_FROST_GIANT;
    var$2[40] = cprnm_TutorialActType_LQ_UNSTABLE_UNDERSTUDY;
    var$2[41] = cprnm_TutorialActType_RUNES;
    var$2[42] = cprnm_TutorialActType_RUNE_SHRINE;
    var$2[43] = cprnm_TutorialActType_RUNE_FUSION;
    var$2[44] = cprnm_TutorialActType_LQ_HYDRA;
    var$2[45] = cprnm_TutorialActType_LQ_BARDBARIAN;
    var$2[46] = cprnm_TutorialActType_LQ_AQUATIC_MAN;
    var$2[47] = cprnm_TutorialActType_LQ_DRUIDINATRIX;
    var$2[48] = cprnm_TutorialActType_LQ_CENTAUR_OF_ATTENTION;
    var$2[49] = cprnm_TutorialActType_LQ_MOON_DRAKE;
    var$2[50] = cprnm_TutorialActType_LQ_COSMIC_ELF;
    var$2[51] = cprnm_TutorialActType_LQ_SAVAGE_CUTIE;
    var$2[52] = cprnm_TutorialActType_MYSTIC_CLOSET;
    var$2[53] = cprnm_TutorialActType_MYSTIC_CLOSET_EQUIP;
    var$2[54] = cprnm_TutorialActType_LQ_BONE_DRAGON;
    var$2[55] = cprnm_TutorialActType_LQ_SPIRIT_WOLF;
    var$2[56] = cprnm_TutorialActType_LQ_RABID_DRAGON;
    var$2[57] = cprnm_TutorialActType_LQ_ORC_MONK;
    var$2[58] = cprnm_TutorialActType_LQ_ROLLER_WARRIOR;
    var$2[59] = cprnm_TutorialActType_LQ_UNICORGI;
    var$2[60] = cprnm_TutorialActType_LQ_PIRATE;
    var$2[61] = cprnm_TutorialActType_LQ_DWARVEN_ARCHER;
    var$2[62] = cprnm_TutorialActType_LQ_SATYR;
    var$2[63] = cprnm_TutorialActType_LQ_SKELETON_KING;
    var$2[64] = cprnm_TutorialActType_LQ_DARK_HORSE;
    var$2[65] = cprnm_TutorialActType_LQ_DEEP_DRAGON;
    var$2[66] = cprnm_TutorialActType_LQ_STORM_DRAGON;
    var$2[67] = cprnm_TutorialActType_LQ_MINOTAUR;
    var$2[68] = cprnm_TutorialActType_LQ_SPIKEY_DRAGON;
    var$2[69] = cprnm_TutorialActType_LQ_CRIMSON_WITCH;
    var$2[70] = cprnm_TutorialActType_LQ_DEMON_TOTEM;
    var$2[71] = cprnm_TutorialActType_LQ_GENIE;
    var$2[72] = cprnm_TutorialActType_LQ_ETERNAL_ENCHANTER;
    var$2[73] = cprnm_TutorialActType_LQ_DRAGZILLA;
    var$2[74] = cprnm_TutorialActType_LQ_RAGING_REVENANT;
    var$2[75] = cprnm_TutorialActType_LQ_ANGELIC_HERALD;
    var$2[76] = cprnm_TutorialActType_LQ_WEREDRAGON;
    var$2[77] = cprnm_TutorialActType_LQ_VULTURE_DRAGON;
    var$2[78] = cprnm_TutorialActType_LQ_SOJOURNER_SORCERESS;
    cprnm_TutorialActType_$VALUES = var$1;
    cprnm_TutorialActType_values0 = cprnm_TutorialActType_values();
},
cprnm_TutorialActType__init_0 = (var$0, var$1, var$2) => {
    cprnm_TutorialActType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_TutorialActType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_TutorialActType();
    cprnm_TutorialActType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_TutorialActType_values = () => {
    cprnm_TutorialActType_$callClinit();
    return cprnm_TutorialActType_$VALUES.$clone0();
},
jl_CharSequence = $rt_classWithoutFields(0),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_0($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
};
function aa_b() {
    let a = this; jl_Object.call(a);
    a.$a12 = null;
    a.$b4 = null;
}
let aa_b__init_ = (var$0, var$1, var$2) => {
    jl_Object__init_(var$0);
    var$0.$a12 = ju_ArrayList__init_(var$1);
    var$0.$b4 = var$2;
},
aa_d$2 = $rt_classWithoutFields(aa_b),
aa_d$2__init_ = (var$0, var$1, var$2) => {
    aa_b__init_(var$0, 20, var$2);
},
aa_d$2__init_0 = (var_0, var_1) => {
    let var_2 = new aa_d$2();
    aa_d$2__init_(var_2, var_0, var_1);
    return var_2;
},
cprn_NetworkProvider = $rt_classWithoutFields(),
cprn_NetworkProvider__init_ = (var$0, var$1, var$2) => {
    jl_Object__init_(var$0);
},
cprn_NetworkProvider__init_0 = (var_0, var_1) => {
    let var_2 = new cprn_NetworkProvider();
    cprn_NetworkProvider__init_(var_2, var_0, var_1);
    return var_2;
},
cprn_EmptyNetworkProvider = $rt_classWithoutFields(cprn_NetworkProvider),
cprn_EmptyNetworkProvider_emptyRunnable = null,
cprn_EmptyNetworkProvider_$callClinit = () => {
    cprn_EmptyNetworkProvider_$callClinit = $rt_eraseClinit(cprn_EmptyNetworkProvider);
    cprn_EmptyNetworkProvider__clinit_();
},
cprn_EmptyNetworkProvider__init_ = var$0 => {
    cprn_EmptyNetworkProvider_$callClinit();
    cprn_NetworkProvider__init_(var$0, cprn_EmptyNetworkProvider_emptyRunnable, cprn_EmptyNetworkProvider_emptyRunnable);
},
cprn_EmptyNetworkProvider__init_0 = () => {
    let var_0 = new cprn_EmptyNetworkProvider();
    cprn_EmptyNetworkProvider__init_(var_0);
    return var_0;
},
cprn_EmptyNetworkProvider__clinit_ = () => {
    cprn_EmptyNetworkProvider_emptyRunnable = cprn_EmptyNetworkProvider$1__init_0();
};
function cbgu_p() {
    let a = this; jl_Object.call(a);
    a.$b3 = null;
    a.$c3 = null;
    a.$d2 = 0;
    a.$h0 = 0.0;
    a.$i0 = 0;
    a.$j0 = 0;
    a.$k0 = 0;
    a.$l = 0;
    a.$m = 0;
}
let cbgu_p__init_0 = var$0 => {
    cbgu_p__init_(var$0, 51, 0.800000011920929);
},
cbgu_p__init_1 = () => {
    let var_0 = new cbgu_p();
    cbgu_p__init_0(var_0);
    return var_0;
},
cbgu_p__init_ = (var$0, var$1, var$2) => {
    let var$3;
    jl_Object__init_(var$0);
    var$3 = cbgm_h_b(jl_Math_ceil(63.75) | 0);
    if (var$3 > 1073741824)
        $rt_throw(jl_IllegalArgumentException__init_0(((jl_StringBuilder__init_0($rt_s(1))).$append1(var$3)).$toString()));
    var$0.$d2 = var$3;
    var$0.$h0 = 0.800000011920929;
    var$0.$k0 = var$0.$d2 * 0.800000011920929 | 0;
    var$0.$j0 = var$0.$d2 - 1 | 0;
    var$0.$i0 = 31 - jl_Integer_numberOfTrailingZeros(var$0.$d2) | 0;
    var$0.$l = jl_Math_max(3, (jl_Math_ceil(jl_Math_log(var$0.$d2)) | 0) << 1);
    var$0.$m = jl_Math_max(jl_Math_min(var$0.$d2, 8), (jl_Math_sqrt(var$0.$d2) | 0) / 8 | 0);
    var$0.$b3 = $rt_createIntArray(var$0.$d2 + var$0.$l | 0);
    var$0.$c3 = $rt_createIntArray(var$0.$b3.data.length);
},
cbgu_p__init_2 = (var_0, var_1) => {
    let var_2 = new cbgu_p();
    cbgu_p__init_(var_2, var_0, var_1);
    return var_2;
},
cprt_HexagonActorAccessor = $rt_classWithoutFields(),
cprt_HexagonActorAccessor_$assertionsDisabled = 0,
cprt_HexagonActorAccessor_$callClinit = () => {
    cprt_HexagonActorAccessor_$callClinit = $rt_eraseClinit(cprt_HexagonActorAccessor);
    cprt_HexagonActorAccessor__clinit_();
},
cprt_HexagonActorAccessor__clinit_ = () => {
    cprt_HexagonActorAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_HexagonActorAccessor)) ? 0 : 1;
},
cprt_HexagonActorAccessor__init_ = var$0 => {
    cprt_HexagonActorAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_HexagonActorAccessor__init_0 = () => {
    let var_0 = new cprt_HexagonActorAccessor();
    cprt_HexagonActorAccessor__init_(var_0);
    return var_0;
};
function ju_GenericEnumSet() {
    let a = this; ju_EnumSet.call(a);
    a.$cls = null;
    a.$bits = null;
}
let ju_GenericEnumSet__init_ = ($this, $cls) => {
    let $constants, $constantCount, $bitCount;
    ju_EnumSet__init_($this);
    $this.$cls = $cls;
    $constants = ju_GenericEnumSet_getConstants($cls);
    if ($constants === null)
        $rt_throw(jl_ClassCastException__init_0());
    $constantCount = $constants.data.length;
    $bitCount = !$constantCount ? 0 : (($constantCount - 1 | 0) / 32 | 0) + 1 | 0;
    $this.$bits = $rt_createIntArray($bitCount);
},
ju_GenericEnumSet__init_0 = var_0 => {
    let var_1 = new ju_GenericEnumSet();
    ju_GenericEnumSet__init_(var_1, var_0);
    return var_1;
},
ju_GenericEnumSet_getConstants = $cls => {
    let $platformClass;
    $platformClass = jl_Class_getPlatformClass($cls);
    $platformClass.$clinit();
    return otp_Platform_getEnumConstants($platformClass);
},
cpch_a = $rt_classWithoutFields(),
cpch_a_a = null,
cpch_a_b = null,
cpch_a_c = null,
cpch_a_$callClinit = () => {
    cpch_a_$callClinit = $rt_eraseClinit(cpch_a);
    cpch_a__clinit_();
},
cpch_a__clinit_ = () => {
    let var$1;
    var$1 = oacl_LogFactory_getFactory();
    cpch_a_a = var$1;
    cpch_a_b = var$1.$getInstance($rt_cls(cpch_a));
    cpch_a_c = cpch_a_a.$getInstance0($rt_s(91));
},
cpch_a_a0 = () => {
    let var$1, var$2;
    cpch_a_$callClinit();
    var$1 = ((jl_Thread_currentThread0()).$getStackTrace()).data;
    if (var$1.length < 3) {
        cpch_a_b.$error($rt_s(92));
        return cpch_a_c;
    }
    var$2 = jl_StackTraceElement_getClassName(var$1[2]);
    return cpch_a_a.$getInstance0(var$2);
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_118_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_118_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_118_0();
    jl_String$_clinit_$lambda$_118_0__init_(var_0);
    return var_0;
},
jlr_Reference = $rt_classWithoutFields(),
jlr_WeakReference = $rt_classWithoutFields(jlr_Reference),
ju_WeakHashMap$Entry = $rt_classWithoutFields(jlr_WeakReference);
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_3 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_6 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder__init_1 = ($this, $value) => {
    jl_AbstractStringBuilder__init_2($this, $value);
},
jl_AbstractStringBuilder__init_5 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder__init_2 = ($this, $value) => {
    let $i;
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($value.$length());
    $i = 0;
    while ($i < $this.$buffer.data.length) {
        $this.$buffer.data[$i] = $value.$charAt($i);
        $i = $i + 1 | 0;
    }
    $this.$length0 = $value.$length();
},
jl_AbstractStringBuilder__init_4 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append0 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_append2 = ($this, $string) => {
    return $this.$insert0($this.$length0, $string);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(93);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append = ($this, $value) => {
    return $this.$append3($value, 10);
},
jl_AbstractStringBuilder_append4 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert3 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append3 = ($this, $value) => {
    return $this.$insert2($this.$length0, $value);
},
jl_AbstractStringBuilder_insert0 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, var$16, $pos, $i, $intDigit, var$20;
    var$3 = $rt_compare($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 48;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 46;
            $this.$buffer.data[var$5] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 48;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 46;
        $this.$buffer.data[var$3] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 97;
        $this.$buffer.data[var$5] = 78;
        return $this;
    }
    if (!isFinite($value) ? 1 : 0) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 73;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 110;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 102;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 110;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 116;
        $this.$buffer.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_floatAnalysisResult;
    otcit_FloatAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 9;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$16 = $target;
    else {
        var$4 = $this.$buffer.data;
        var$16 = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = 100000000;
    if ($leadingZero) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 48;
        var$4 = $this.$buffer.data;
        var$16 = var$3 + 1 | 0;
        var$4[var$3] = 46;
        while (true) {
            var$3 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer.data;
            var$5 = var$16 + 1 | 0;
            var$4[var$16] = 48;
            $leadingZeros = var$3;
            var$16 = var$5;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if ($pos <= 0)
            $intDigit = 0;
        else {
            $intDigit = $mantissa / $pos | 0;
            $mantissa = $mantissa % $pos | 0;
        }
        var$4 = $this.$buffer.data;
        var$5 = var$16 + 1 | 0;
        var$4[var$16] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$16 = var$5;
        else {
            var$4 = $this.$buffer.data;
            var$16 = var$5 + 1 | 0;
            var$4[var$5] = 46;
        }
        $pos = $pos / 10 | 0;
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 69;
        if ($exp >= 0)
            var$5 = var$3;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 45;
        }
        if ($exp < 10)
            var$20 = var$5;
        else {
            var$4 = $this.$buffer.data;
            var$20 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[var$20] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
},
jl_AbstractStringBuilder_trailingDecimalZeros = $n => {
    let $result, $zeros, var$4, var$5;
    if (!($n % 1000000000 | 0))
        return 9;
    $result = 0;
    $zeros = 1;
    if (!($n % 100000000 | 0)) {
        $result = 8;
        $zeros = 100000000;
    }
    var$4 = $zeros * 10000 | 0;
    if ($n % var$4 | 0)
        var$4 = $zeros;
    else
        $result = $result | 4;
    var$5 = var$4 * 100 | 0;
    if ($n % var$5 | 0)
        var$5 = var$4;
    else
        $result = $result | 2;
    if (!($n % (var$5 * 10 | 0) | 0))
        $result = $result | 1;
    return $result;
},
jl_AbstractStringBuilder_append1 = ($this, $c) => {
    return $this.$insert3($this.$length0, $c);
},
jl_AbstractStringBuilder_insert2 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(93) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_4($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_2 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_0);
    return var_0;
},
jl_StringBuilder__init_1 = ($this, $value) => {
    jl_AbstractStringBuilder__init_1($this, $value);
},
jl_StringBuilder__init_0 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append0($this, $obj);
    return $this;
},
jl_StringBuilder_append1 = ($this, $string) => {
    jl_AbstractStringBuilder_append2($this, $string);
    return $this;
},
jl_StringBuilder_append3 = ($this, $value) => {
    jl_AbstractStringBuilder_append($this, $value);
    return $this;
},
jl_StringBuilder_append2 = ($this, $value) => {
    jl_AbstractStringBuilder_append3($this, $value);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    jl_AbstractStringBuilder_append1($this, $c);
    return $this;
},
jl_StringBuilder_insert4 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert0($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert5 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert3 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert2($this, $index, $c);
    return $this;
},
jl_StringBuilder_insert0 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert1($this, $index, $string);
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert2 = ($this, var$1, var$2) => {
    return $this.$insert4(var$1, var$2);
},
jl_StringBuilder_insert1 = ($this, var$1, var$2) => {
    return $this.$insert5(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert6(var$1, var$2);
},
jl_StringBuilder_insert6 = ($this, var$1, var$2) => {
    return $this.$insert7(var$1, var$2);
},
cbgu_i = $rt_classWithoutFields(0),
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
ju_ConcurrentModificationException__init_0 = () => {
    let var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_(var_0);
    return var_0;
},
aa_b$a = $rt_classWithoutFields(0),
aa_d$1 = $rt_classWithoutFields();
let aa_d$1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
aa_d$1__init_0 = () => {
    let var_0 = new aa_d$1();
    aa_d$1__init_(var_0);
    return var_0;
},
cprgo_Entity = $rt_classWithoutFields(),
jur_RandomGenerator = $rt_classWithoutFields(0);
function cbgu_ac() {
    let a = this; jl_Object.call(a);
    a.$freeObjects = null;
    a.$max0 = 0;
}
let cbgu_ac__init_ = (var$0, var$1, var$2) => {
    jl_Object__init_(var$0);
    var$0.$freeObjects = cbgu_a__init_2(0, var$1);
    var$0.$max0 = var$2;
},
cprnm_GuildEmblemType = $rt_classWithoutFields(jl_Enum),
cprnm_GuildEmblemType_$VALUES = null,
cprnm_GuildEmblemType_AGGRAVATED_ASSAULT = null,
cprnm_GuildEmblemType_AGGRESSIVE_ARMOR = null,
cprnm_GuildEmblemType_ALE_JITSU = null,
cprnm_GuildEmblemType_ATTACK_OF_RIDICULE = null,
cprnm_GuildEmblemType_AWKWARD_SILENCE = null,
cprnm_GuildEmblemType_BEACON = null,
cprnm_GuildEmblemType_BESSIES_BANE = null,
cprnm_GuildEmblemType_BIT_O_NIP = null,
cprnm_GuildEmblemType_BLINDING_LIGHT = null,
cprnm_GuildEmblemType_BLOODY_BAT = null,
cprnm_GuildEmblemType_BLUNT_FORCE_TRAUMA = null,
cprnm_GuildEmblemType_BOCK_JITSU = null,
cprnm_GuildEmblemType_BOMBARDMENT = null,
cprnm_GuildEmblemType_BRASS_KNUCKLES = null,
cprnm_GuildEmblemType_BROS_BEFORE_FOES = null,
cprnm_GuildEmblemType_BUST_A_MOVE = null,
cprnm_GuildEmblemType_CANNONBALLER = null,
cprnm_GuildEmblemType_CHUNKY_FEMUR = null,
cprnm_GuildEmblemType_DANCING_DEVIL = null,
cprnm_GuildEmblemType_ENCHANTED_ELBOW_PADS = null,
cprnm_GuildEmblemType_EVANGELIZE = null,
cprnm_GuildEmblemType_FEAR_OF_THE_GODS = null,
cprnm_GuildEmblemType_FINE_BRIE = null,
cprnm_GuildEmblemType_FLIPPANT_MISSLE = null,
cprnm_GuildEmblemType_FOAM_FINGER = null,
cprnm_GuildEmblemType_FREE_MANS_CROWBAR = null,
cprnm_GuildEmblemType_FREQUENCY_MODULATION = null,
cprnm_GuildEmblemType_GET_ON_UP = null,
cprnm_GuildEmblemType_GOBLIN_GROG = null,
cprnm_GuildEmblemType_GOBLIN_WHACKER = null,
cprnm_GuildEmblemType_GRRL_POWER = null,
cprnm_GuildEmblemType_HEART_OF_STONE = null,
cprnm_GuildEmblemType_HUNGER_PAIN = null,
cprnm_GuildEmblemType_ILLUMINATE = null,
cprnm_GuildEmblemType_IMPALE = null,
cprnm_GuildEmblemType_LOADED_DIE = null,
cprnm_GuildEmblemType_LUCKY_ORCS_FOOT = null,
cprnm_GuildEmblemType_MY_FIRST_SHIELD = null,
cprnm_GuildEmblemType_PAPER_CROWN = null,
cprnm_GuildEmblemType_PROFANE_STORM = null,
cprnm_GuildEmblemType_PUNCH_OUT = null,
cprnm_GuildEmblemType_RUBBER_VEST = null,
cprnm_GuildEmblemType_SNAZZY_VEST = null,
cprnm_GuildEmblemType_STICK_ON_MOUSTACHE = null,
cprnm_GuildEmblemType_STOLEN_SNEAKERS = null,
cprnm_GuildEmblemType_SWASH_BUCKLER = null,
cprnm_GuildEmblemType_values0 = null;
let cprnm_GuildEmblemType_$callClinit = () => {
    cprnm_GuildEmblemType_$callClinit = $rt_eraseClinit(cprnm_GuildEmblemType);
    cprnm_GuildEmblemType__clinit_();
},
cprnm_GuildEmblemType__clinit_ = () => {
    let var$1, var$2;
    cprnm_GuildEmblemType_LUCKY_ORCS_FOOT = cprnm_GuildEmblemType__init_($rt_s(94), 0);
    cprnm_GuildEmblemType_FLIPPANT_MISSLE = cprnm_GuildEmblemType__init_($rt_s(95), 1);
    cprnm_GuildEmblemType_ATTACK_OF_RIDICULE = cprnm_GuildEmblemType__init_($rt_s(96), 2);
    cprnm_GuildEmblemType_PROFANE_STORM = cprnm_GuildEmblemType__init_($rt_s(97), 3);
    cprnm_GuildEmblemType_BLUNT_FORCE_TRAUMA = cprnm_GuildEmblemType__init_($rt_s(98), 4);
    cprnm_GuildEmblemType_AWKWARD_SILENCE = cprnm_GuildEmblemType__init_($rt_s(99), 5);
    cprnm_GuildEmblemType_PUNCH_OUT = cprnm_GuildEmblemType__init_($rt_s(100), 6);
    cprnm_GuildEmblemType_HUNGER_PAIN = cprnm_GuildEmblemType__init_($rt_s(101), 7);
    cprnm_GuildEmblemType_FEAR_OF_THE_GODS = cprnm_GuildEmblemType__init_($rt_s(102), 8);
    cprnm_GuildEmblemType_EVANGELIZE = cprnm_GuildEmblemType__init_($rt_s(103), 9);
    cprnm_GuildEmblemType_AGGRAVATED_ASSAULT = cprnm_GuildEmblemType__init_($rt_s(104), 10);
    cprnm_GuildEmblemType_AGGRESSIVE_ARMOR = cprnm_GuildEmblemType__init_($rt_s(105), 11);
    cprnm_GuildEmblemType_ALE_JITSU = cprnm_GuildEmblemType__init_($rt_s(106), 12);
    cprnm_GuildEmblemType_BEACON = cprnm_GuildEmblemType__init_($rt_s(107), 13);
    cprnm_GuildEmblemType_BLINDING_LIGHT = cprnm_GuildEmblemType__init_($rt_s(108), 14);
    cprnm_GuildEmblemType_BOCK_JITSU = cprnm_GuildEmblemType__init_($rt_s(109), 15);
    cprnm_GuildEmblemType_BOMBARDMENT = cprnm_GuildEmblemType__init_($rt_s(110), 16);
    cprnm_GuildEmblemType_BRASS_KNUCKLES = cprnm_GuildEmblemType__init_($rt_s(111), 17);
    cprnm_GuildEmblemType_BROS_BEFORE_FOES = cprnm_GuildEmblemType__init_($rt_s(112), 18);
    cprnm_GuildEmblemType_BUST_A_MOVE = cprnm_GuildEmblemType__init_($rt_s(113), 19);
    cprnm_GuildEmblemType_CANNONBALLER = cprnm_GuildEmblemType__init_($rt_s(114), 20);
    cprnm_GuildEmblemType_DANCING_DEVIL = cprnm_GuildEmblemType__init_($rt_s(115), 21);
    cprnm_GuildEmblemType_FREQUENCY_MODULATION = cprnm_GuildEmblemType__init_($rt_s(116), 22);
    cprnm_GuildEmblemType_GET_ON_UP = cprnm_GuildEmblemType__init_($rt_s(117), 23);
    cprnm_GuildEmblemType_GRRL_POWER = cprnm_GuildEmblemType__init_($rt_s(118), 24);
    cprnm_GuildEmblemType_HEART_OF_STONE = cprnm_GuildEmblemType__init_($rt_s(119), 25);
    cprnm_GuildEmblemType_ILLUMINATE = cprnm_GuildEmblemType__init_($rt_s(120), 26);
    cprnm_GuildEmblemType_IMPALE = cprnm_GuildEmblemType__init_($rt_s(121), 27);
    cprnm_GuildEmblemType_PAPER_CROWN = cprnm_GuildEmblemType__init_($rt_s(122), 28);
    cprnm_GuildEmblemType_FREE_MANS_CROWBAR = cprnm_GuildEmblemType__init_($rt_s(123), 29);
    cprnm_GuildEmblemType_MY_FIRST_SHIELD = cprnm_GuildEmblemType__init_($rt_s(124), 30);
    cprnm_GuildEmblemType_RUBBER_VEST = cprnm_GuildEmblemType__init_($rt_s(125), 31);
    cprnm_GuildEmblemType_ENCHANTED_ELBOW_PADS = cprnm_GuildEmblemType__init_($rt_s(126), 32);
    cprnm_GuildEmblemType_GOBLIN_GROG = cprnm_GuildEmblemType__init_($rt_s(127), 33);
    cprnm_GuildEmblemType_FOAM_FINGER = cprnm_GuildEmblemType__init_($rt_s(128), 34);
    cprnm_GuildEmblemType_STOLEN_SNEAKERS = cprnm_GuildEmblemType__init_($rt_s(129), 35);
    cprnm_GuildEmblemType_BIT_O_NIP = cprnm_GuildEmblemType__init_($rt_s(130), 36);
    cprnm_GuildEmblemType_LOADED_DIE = cprnm_GuildEmblemType__init_($rt_s(131), 37);
    cprnm_GuildEmblemType_FINE_BRIE = cprnm_GuildEmblemType__init_($rt_s(132), 38);
    cprnm_GuildEmblemType_STICK_ON_MOUSTACHE = cprnm_GuildEmblemType__init_($rt_s(133), 39);
    cprnm_GuildEmblemType_SNAZZY_VEST = cprnm_GuildEmblemType__init_($rt_s(134), 40);
    cprnm_GuildEmblemType_CHUNKY_FEMUR = cprnm_GuildEmblemType__init_($rt_s(135), 41);
    cprnm_GuildEmblemType_GOBLIN_WHACKER = cprnm_GuildEmblemType__init_($rt_s(136), 42);
    cprnm_GuildEmblemType_BLOODY_BAT = cprnm_GuildEmblemType__init_($rt_s(137), 43);
    cprnm_GuildEmblemType_SWASH_BUCKLER = cprnm_GuildEmblemType__init_($rt_s(138), 44);
    cprnm_GuildEmblemType_BESSIES_BANE = cprnm_GuildEmblemType__init_($rt_s(139), 45);
    var$1 = $rt_createArray(cprnm_GuildEmblemType, 46);
    var$2 = var$1.data;
    var$2[0] = cprnm_GuildEmblemType_LUCKY_ORCS_FOOT;
    var$2[1] = cprnm_GuildEmblemType_FLIPPANT_MISSLE;
    var$2[2] = cprnm_GuildEmblemType_ATTACK_OF_RIDICULE;
    var$2[3] = cprnm_GuildEmblemType_PROFANE_STORM;
    var$2[4] = cprnm_GuildEmblemType_BLUNT_FORCE_TRAUMA;
    var$2[5] = cprnm_GuildEmblemType_AWKWARD_SILENCE;
    var$2[6] = cprnm_GuildEmblemType_PUNCH_OUT;
    var$2[7] = cprnm_GuildEmblemType_HUNGER_PAIN;
    var$2[8] = cprnm_GuildEmblemType_FEAR_OF_THE_GODS;
    var$2[9] = cprnm_GuildEmblemType_EVANGELIZE;
    var$2[10] = cprnm_GuildEmblemType_AGGRAVATED_ASSAULT;
    var$2[11] = cprnm_GuildEmblemType_AGGRESSIVE_ARMOR;
    var$2[12] = cprnm_GuildEmblemType_ALE_JITSU;
    var$2[13] = cprnm_GuildEmblemType_BEACON;
    var$2[14] = cprnm_GuildEmblemType_BLINDING_LIGHT;
    var$2[15] = cprnm_GuildEmblemType_BOCK_JITSU;
    var$2[16] = cprnm_GuildEmblemType_BOMBARDMENT;
    var$2[17] = cprnm_GuildEmblemType_BRASS_KNUCKLES;
    var$2[18] = cprnm_GuildEmblemType_BROS_BEFORE_FOES;
    var$2[19] = cprnm_GuildEmblemType_BUST_A_MOVE;
    var$2[20] = cprnm_GuildEmblemType_CANNONBALLER;
    var$2[21] = cprnm_GuildEmblemType_DANCING_DEVIL;
    var$2[22] = cprnm_GuildEmblemType_FREQUENCY_MODULATION;
    var$2[23] = cprnm_GuildEmblemType_GET_ON_UP;
    var$2[24] = cprnm_GuildEmblemType_GRRL_POWER;
    var$2[25] = cprnm_GuildEmblemType_HEART_OF_STONE;
    var$2[26] = cprnm_GuildEmblemType_ILLUMINATE;
    var$2[27] = cprnm_GuildEmblemType_IMPALE;
    var$2[28] = cprnm_GuildEmblemType_PAPER_CROWN;
    var$2[29] = cprnm_GuildEmblemType_FREE_MANS_CROWBAR;
    var$2[30] = cprnm_GuildEmblemType_MY_FIRST_SHIELD;
    var$2[31] = cprnm_GuildEmblemType_RUBBER_VEST;
    var$2[32] = cprnm_GuildEmblemType_ENCHANTED_ELBOW_PADS;
    var$2[33] = cprnm_GuildEmblemType_GOBLIN_GROG;
    var$2[34] = cprnm_GuildEmblemType_FOAM_FINGER;
    var$2[35] = cprnm_GuildEmblemType_STOLEN_SNEAKERS;
    var$2[36] = cprnm_GuildEmblemType_BIT_O_NIP;
    var$2[37] = cprnm_GuildEmblemType_LOADED_DIE;
    var$2[38] = cprnm_GuildEmblemType_FINE_BRIE;
    var$2[39] = cprnm_GuildEmblemType_STICK_ON_MOUSTACHE;
    var$2[40] = cprnm_GuildEmblemType_SNAZZY_VEST;
    var$2[41] = cprnm_GuildEmblemType_CHUNKY_FEMUR;
    var$2[42] = cprnm_GuildEmblemType_GOBLIN_WHACKER;
    var$2[43] = cprnm_GuildEmblemType_BLOODY_BAT;
    var$2[44] = cprnm_GuildEmblemType_SWASH_BUCKLER;
    var$2[45] = cprnm_GuildEmblemType_BESSIES_BANE;
    cprnm_GuildEmblemType_$VALUES = var$1;
    cprnm_GuildEmblemType_values0 = cprnm_GuildEmblemType_values();
},
cprnm_GuildEmblemType__init_0 = (var$0, var$1, var$2) => {
    cprnm_GuildEmblemType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_GuildEmblemType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_GuildEmblemType();
    cprnm_GuildEmblemType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_GuildEmblemType_values = () => {
    cprnm_GuildEmblemType_$callClinit();
    return cprnm_GuildEmblemType_$VALUES.$clone0();
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
jl_ClassCastException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_ClassCastException__init_0 = () => {
    let var_0 = new jl_ClassCastException();
    jl_ClassCastException__init_(var_0);
    return var_0;
},
cprt_CoffinRenderableAccessor = $rt_classWithoutFields(),
cprt_CoffinRenderableAccessor_$assertionsDisabled = 0,
cprt_CoffinRenderableAccessor_$callClinit = () => {
    cprt_CoffinRenderableAccessor_$callClinit = $rt_eraseClinit(cprt_CoffinRenderableAccessor);
    cprt_CoffinRenderableAccessor__clinit_();
},
cprt_CoffinRenderableAccessor__clinit_ = () => {
    cprt_CoffinRenderableAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_CoffinRenderableAccessor)) ? 0 : 1;
},
cprt_CoffinRenderableAccessor__init_ = var$0 => {
    cprt_CoffinRenderableAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_CoffinRenderableAccessor__init_0 = () => {
    let var_0 = new cprt_CoffinRenderableAccessor();
    cprt_CoffinRenderableAccessor__init_(var_0);
    return var_0;
},
cbgss_b = $rt_classWithoutFields(),
cbgssb_l = $rt_classWithoutFields(0),
cbgssu_n = $rt_classWithoutFields(cbgss_b),
cbgssu_f = $rt_classWithoutFields(cbgssu_n),
cpcea_a = $rt_classWithoutFields(cbgssu_f),
cprg_Renderable2D = $rt_classWithoutFields(0),
cprt_GenericEntityRenderableAccessor = $rt_classWithoutFields(),
cprt_GenericEntityRenderableAccessor_$assertionsDisabled = 0,
cprt_GenericEntityRenderableAccessor_$callClinit = () => {
    cprt_GenericEntityRenderableAccessor_$callClinit = $rt_eraseClinit(cprt_GenericEntityRenderableAccessor);
    cprt_GenericEntityRenderableAccessor__clinit_();
},
cprt_GenericEntityRenderableAccessor__clinit_ = () => {
    cprt_GenericEntityRenderableAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_GenericEntityRenderableAccessor)) ? 0 : 1;
},
cprt_GenericEntityRenderableAccessor__init_ = var$0 => {
    cprt_GenericEntityRenderableAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_GenericEntityRenderableAccessor__init_0 = () => {
    let var_0 = new cprt_GenericEntityRenderableAccessor();
    cprt_GenericEntityRenderableAccessor__init_(var_0);
    return var_0;
},
cprg_BaseEntityRenderable = $rt_classWithoutFields(),
cprg_CoffinRenderable = $rt_classWithoutFields(cprg_BaseEntityRenderable);
function jl_StackTraceElement() {
    jl_Object.call(this);
    this.$declaringClass = null;
}
let jl_StackTraceElement_getClassName = $this => {
    return $this.$declaringClass;
},
ji_Flushable = $rt_classWithoutFields(0);
function aa_h() {
    let a = this; jl_Object.call(a);
    a.$a14 = null;
    a.$b5 = 0;
}
let aa_h__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$a14 = ju_ArrayList__init_(20);
    var$0.$b5 = 0;
},
aa_h__init_0 = () => {
    let var_0 = new aa_h();
    aa_h__init_(var_0);
    return var_0;
},
cbggg_o = $rt_classWithoutFields(),
aa_a = $rt_classWithoutFields(),
aa_d = $rt_classWithoutFields(aa_a),
aa_d_e = 0,
aa_d_f = 0,
aa_d_g = null,
aa_d_h = null,
aa_d_i = null,
aa_d_y = 0,
aa_d_$callClinit = () => {
    aa_d_$callClinit = $rt_eraseClinit(aa_d);
    aa_d__clinit_();
},
aa_d__clinit_ = () => {
    aa_d_y = jl_Class_desiredAssertionStatus($rt_cls(aa_d)) ? 0 : 1;
    aa_d_e = 3;
    aa_d_f = 0;
    aa_d_g = aa_d$1__init_0();
    aa_d_h = aa_d$2__init_0(20, aa_d_g);
    aa_d_i = ju_HashMap__init_0();
},
aa_d_a = (var$1, var$2) => {
    aa_d_$callClinit();
    aa_d_i.$put(var$1, var$2);
},
aa_d_c = var$1 => {
    aa_d_$callClinit();
    aa_d_e = 4;
},
aa_d_d = var$1 => {
    aa_d_$callClinit();
    aa_d_f = 5;
},
cbgssb_e = $rt_classWithoutFields(0),
cbgss_e = $rt_classWithoutFields(cbgss_b),
cpruw_HexagonActor = $rt_classWithoutFields(cbgss_e),
cbggg_l = $rt_classWithoutFields(cbggg_o),
cprnm_UseItemEventType = $rt_classWithoutFields(jl_Enum),
cprnm_UseItemEventType_$VALUES = null,
cprnm_UseItemEventType_DEFAULT = null,
cprnm_UseItemEventType_DROP_BONUS_ELITE_2X = null,
cprnm_UseItemEventType_DROP_BONUS_EXPERT_2X = null,
cprnm_UseItemEventType_DROP_BONUS_NORMAL_2X = null,
cprnm_UseItemEventType_TEAM_XP_BONUS_2X = null,
cprnm_UseItemEventType_values0 = null,
cprnm_UseItemEventType_$callClinit = () => {
    cprnm_UseItemEventType_$callClinit = $rt_eraseClinit(cprnm_UseItemEventType);
    cprnm_UseItemEventType__clinit_();
},
cprnm_UseItemEventType__clinit_ = () => {
    let var$1, var$2;
    cprnm_UseItemEventType_DEFAULT = cprnm_UseItemEventType__init_($rt_s(12), 0);
    cprnm_UseItemEventType_DROP_BONUS_NORMAL_2X = cprnm_UseItemEventType__init_($rt_s(140), 1);
    cprnm_UseItemEventType_DROP_BONUS_ELITE_2X = cprnm_UseItemEventType__init_($rt_s(141), 2);
    cprnm_UseItemEventType_TEAM_XP_BONUS_2X = cprnm_UseItemEventType__init_($rt_s(142), 3);
    cprnm_UseItemEventType_DROP_BONUS_EXPERT_2X = cprnm_UseItemEventType__init_($rt_s(143), 4);
    var$1 = $rt_createArray(cprnm_UseItemEventType, 5);
    var$2 = var$1.data;
    var$2[0] = cprnm_UseItemEventType_DEFAULT;
    var$2[1] = cprnm_UseItemEventType_DROP_BONUS_NORMAL_2X;
    var$2[2] = cprnm_UseItemEventType_DROP_BONUS_ELITE_2X;
    var$2[3] = cprnm_UseItemEventType_TEAM_XP_BONUS_2X;
    var$2[4] = cprnm_UseItemEventType_DROP_BONUS_EXPERT_2X;
    cprnm_UseItemEventType_$VALUES = var$1;
    cprnm_UseItemEventType_values0 = cprnm_UseItemEventType_values();
},
cprnm_UseItemEventType__init_0 = (var$0, var$1, var$2) => {
    cprnm_UseItemEventType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_UseItemEventType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_UseItemEventType();
    cprnm_UseItemEventType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_UseItemEventType_values = () => {
    cprnm_UseItemEventType_$callClinit();
    return cprnm_UseItemEventType_$VALUES.$clone0();
},
ju_AbstractMap = $rt_classWithoutFields(),
ju_AbstractMap__init_ = $this => {
    jl_Object__init_($this);
},
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap__init_ = $this => {
    ju_AbstractMap__init_($this);
},
cbg_c = $rt_classWithoutFields(0),
cbg_b = $rt_classWithoutFields(),
cbg_b__init_ = var$0 => {
    jl_Object__init_(var$0);
};
function cpr_RPGMain() {
    let a = this; cbg_b.call(a);
    a.$agreementBody = null;
    a.$allEventsDismissed = 0;
    a.$allPerfData = null;
    a.$alwaysAuto = 0;
    a.$appStartTime = Long_ZERO;
    a.$automaticCampaign = 0;
    a.$automaticExpedition = 0;
    a.$bossBattlesData = null;
    a.$cachedMessages = null;
    a.$cachedPreferredLanguage = null;
    a.$cachedTutorialRuneID = Long_ZERO;
    a.$commonHelper = null;
    a.$connectionWindow = null;
    a.$contentLocation0 = null;
    a.$cryptRaid = null;
    a.$cryptUpdatePending = 0;
    a.$currentEventBannerTime = Long_ZERO;
    a.$currentPrivacyPolicyVersion = 0;
    a.$currentTermsOfServiceVersion = 0;
    a.$day2TimeSeen = Long_ZERO;
    a.$delayedBootData = null;
    a.$deviceInfo = null;
    a.$disconnected = 0;
    a.$dontResetSocialData = null;
    a.$errorPopupsInited = 0;
    a.$existingUsers = null;
    a.$expeditionRepeatCount = 0;
    a.$expeditionRepeatString = 0;
    a.$guildInfo = null;
    a.$handledRecoveryIDs = null;
    a.$hasHandledBootData = 0;
    a.$hasUpdate = 0;
    a.$heroesForHire = null;
    a.$iapProducts = null;
    a.$initializedPurchasing = 0;
    a.$lastFPS = 0;
    a.$lastForcedUserID = Long_ZERO;
    a.$lastPerfPrint = Long_ZERO;
    a.$lastPrintStats = Long_ZERO;
    a.$lastViewedRuneID = Long_ZERO;
    a.$monthlyDealTimeSeen = Long_ZERO;
    a.$needsUpdate = 0;
    a.$networkProvider = null;
    a.$newRelicInstrumentation = null;
    a.$notifType = null;
    a.$overrideNotifications = 0;
    a.$paused = 0;
    a.$perfReportNum = 0;
    a.$previousRestartsForMissingContent = null;
    a.$privacyPolicyBody = null;
    a.$privateUserInfo = null;
    a.$recordCombatVideo = 0;
    a.$requestFullWarInfoOnNextLoad = 0;
    a.$restartOnPopupsID = Long_ZERO;
    a.$restartOnPopupsInited = 0;
    a.$socialDataManager = null;
    a.$startupTasks = null;
    a.$systemDeprecationTimeSeen = Long_ZERO;
    a.$tapjoyPPEEvents = null;
    a.$termsofserviceBody = null;
    a.$titanTemples = null;
    a.$tweenManager = null;
    a.$unacknowledgedChestsRemaining = 0;
    a.$updateGameTimeSeen = Long_ZERO;
    a.$user = null;
    a.$viewFPSFlag = 0;
}
let cpr_RPGMain_LOG = null,
cpr_RPGMain_PING_DELAY = 0,
cpr_RPGMain_PING_DELAY_AFTER_BOOT_DATA = 0,
cpr_RPGMain_UNITS_PER_PIXEL = 0.0,
cpr_RPGMain_isDisplayAgreement = 0,
cpr_RPGMain_isDisplayPrivacyPolicy = 0,
cpr_RPGMain_isDisplayTermsOfService = 0,
cpr_RPGMain_isDisplayWarnAboutDownload = 0,
cpr_RPGMain_isGooglePlayInstalled = 0,
cpr_RPGMain_$callClinit = () => {
    cpr_RPGMain_$callClinit = $rt_eraseClinit(cpr_RPGMain);
    cpr_RPGMain__clinit_();
},
cpr_RPGMain__clinit_ = () => {
    juc_TimeUnit_$callClinit();
    cpr_RPGMain_PING_DELAY_AFTER_BOOT_DATA = Long_lo((juc_TimeUnit_toSeconds(juc_TimeUnit_SECONDS, Long_fromInt(10))));
    cpr_RPGMain_PING_DELAY = Long_lo((juc_TimeUnit_toSeconds(juc_TimeUnit_MINUTES, Long_fromInt(10))));
    cpr_RPGMain_UNITS_PER_PIXEL = 1.0;
    cpr_RPGMain_LOG = oacl_LogFactory_getLog($rt_cls(cpr_RPGMain));
    cpr_RPGMain_isGooglePlayInstalled = 1;
    cpr_RPGMain_isDisplayPrivacyPolicy = 0;
    cpr_RPGMain_isDisplayAgreement = 0;
    cpr_RPGMain_isDisplayTermsOfService = 0;
    cpr_RPGMain_isDisplayWarnAboutDownload = 0;
},
cpr_RPGMain__init_ = (var$0, var$1) => {
    cpr_RPGMain_$callClinit();
    cpr_RPGMain__init_0(var$0, null, 0, var$1);
},
cpr_RPGMain__init_1 = var_0 => {
    let var_1 = new cpr_RPGMain();
    cpr_RPGMain__init_(var_1, var_0);
    return var_1;
},
cpr_RPGMain__init_0 = (var$0, var$1, var$2, var$3) => {
    let var$4, var$5;
    cpr_RPGMain_$callClinit();
    var$4 = 1;
    cbg_b__init_(var$0);
    var$0.$lastPerfPrint = jl_System_currentTimeMillis();
    var$0.$lastFPS = (-1);
    var$0.$previousRestartsForMissingContent = ju_HashMap__init_0();
    cpr_BuildOptions_$callClinit();
    var$0.$contentLocation0 = cpr_ServerType_getContentLocation(cpr_BuildOptions_SERVER_TYPE);
    var$0.$disconnected = 0;
    var$0.$needsUpdate = 0;
    var$0.$existingUsers = null;
    var$0.$errorPopupsInited = 0;
    var$0.$cachedMessages = ju_ArrayList__init_1();
    var$0.$lastPrintStats = jl_System_currentTimeMillis();
    var$0.$handledRecoveryIDs = ju_ArrayList__init_1();
    var$0.$expeditionRepeatCount = 0;
    var$0.$expeditionRepeatString = 0;
    var$0.$delayedBootData = juca_AtomicReference__init_0();
    var$0.$dontResetSocialData = juca_AtomicBoolean__init_0(0);
    var$0.$recordCombatVideo = 0;
    var$0.$initializedPurchasing = 0;
    var$0.$paused = 0;
    var$0.$cachedPreferredLanguage = null;
    var$0.$requestFullWarInfoOnNextLoad = 0;
    var$0.$cachedTutorialRuneID = Long_ZERO;
    var$0.$lastForcedUserID = Long_ZERO;
    var$0.$user = cprgo_User__init_0();
    var$0.$iapProducts = cprnm_IAPProducts__init_0();
    var$0.$privateUserInfo = cprnm_PrivateUserInfo__init_0();
    var$0.$guildInfo = cprnm_GuildInfo__init_0();
    var$0.$heroesForHire = null;
    var$0.$cryptRaid = null;
    var$0.$tapjoyPPEEvents = ju_EnumMap__init_($rt_cls(cprnm_PPEEvent));
    var$0.$cryptUpdatePending = 0;
    var$0.$titanTemples = cprnm_TitanTempleSummaries__init_0();
    var$0.$lastViewedRuneID = Long_fromInt(-1);
    var$0.$startupTasks = null;
    var$0.$bossBattlesData = null;
    var$0.$hasUpdate = 0;
    var$0.$alwaysAuto = 0;
    var$0.$automaticCampaign = 0;
    var$0.$automaticExpedition = 0;
    var$0.$overrideNotifications = 0;
    var$0.$viewFPSFlag = 1;
    var$0.$unacknowledgedChestsRemaining = 1;
    var$0.$allEventsDismissed = 0;
    var$0.$day2TimeSeen = Long_ZERO;
    var$0.$monthlyDealTimeSeen = Long_ZERO;
    var$0.$updateGameTimeSeen = Long_ZERO;
    var$0.$systemDeprecationTimeSeen = Long_ZERO;
    var$0.$currentEventBannerTime = Long_ZERO;
    var$0.$allPerfData = cbgu_z__init_();
    var$0.$perfReportNum = 0;
    var$0.$newRelicInstrumentation = cpr_NewRelicInstrumentation__init_0();
    var$0.$hasHandledBootData = 0;
    var$0.$currentPrivacyPolicyVersion = 0;
    var$0.$privacyPolicyBody = $rt_s(91);
    var$0.$agreementBody = $rt_s(91);
    var$0.$currentTermsOfServiceVersion = 0;
    var$0.$termsofserviceBody = $rt_s(91);
    var$0.$restartOnPopupsInited = 0;
    var$0.$restartOnPopupsID = Long_ZERO;
    var$0.$connectionWindow = null;
    var$0.$commonHelper = cpr_UICommonHelper__init_0();
    var$0.$appStartTime = jl_System_currentTimeMillis();
    cpr_PerfStats_clear();
    cpr_PerfStats_start($rt_wrapArray(jl_String, [$rt_s(144), $rt_s(145)]));
    var$5 = cpr_BuildOptions_BUILD_TYPE;
    cpr_BuildType_$callClinit();
    if (var$5 !== cpr_BuildType_DEVELOPER)
        var$4 = 0;
    cpc_c_a(var$4);
    cprge_EventHelper_clearAll();
    cpru_Style_init();
    var$0.$deviceInfo = var$3;
    var$0.$notifType = var$1;
    cpr_RPGMain_isGooglePlayInstalled = var$2;
    var$0.$socialDataManager = cprgds_SocialDataManager__init_0();
    aa_d_a($rt_cls(cbgm_p), cprt_Vector2Accessor__init_0());
    aa_d_a($rt_cls(cbgm_q), cprt_Vector3Accessor__init_0());
    aa_d_a($rt_cls(cbgg_b), cprt_ColorAccessor__init_0());
    aa_d_a($rt_cls(cbgss_b), cprt_ActorAccessor__init_0());
    aa_d_a($rt_cls(ces_Skeleton), cprt_SkeletonAccessor__init_0());
    aa_d_a($rt_cls(cpcea_a), cprt_DFLabelAccessor__init_0());
    aa_d_a($rt_cls(cbggg_l), cprt_SpriteAccessor__init_0());
    aa_d_a($rt_cls(cprg_CombatTextLabel), cprt_CombatTextLabelAccessor__init_0());
    aa_d_a($rt_cls(cbgb_b), cprt_MusicAccessor__init_0());
    aa_d_a($rt_cls(cpru_PlayingSound), cprt_PlayingSoundAccessor__init_0());
    aa_d_a($rt_cls(cprg_GenericEntityRenderable), cprt_GenericEntityRenderableAccessor__init_0());
    aa_d_a($rt_cls(cprgo_Entity), cprt_EntityTweenAccessor__init_0());
    aa_d_a($rt_cls(cprgo_Projectile), cprt_ProjectileTweenAccessor__init_0());
    aa_d_a($rt_cls(cpruw_HexagonActor), cprt_HexagonActorAccessor__init_0());
    aa_d_a($rt_cls(cpruwc_ProgressBarView), cprt_ProgressBarViewAccessor__init_0());
    aa_d_a($rt_cls(cprg_CoffinRenderable), cprt_CoffinRenderableAccessor__init_0());
    aa_d_a($rt_cls(cbgssu_g), cprt_ScrollPaneAccessor__init_0());
    aa_d_a($rt_cls(cpruw_CombatManaBar), cprt_CombatManaBarAccessor__init_0());
    aa_d_d(5);
    aa_d_c(4);
    var$0.$tweenManager = aa_h__init_0();
    cpr_PerfStats_end($rt_s(145));
    if (cpr_BuildOptions_BUILD_TYPE === cpr_BuildType_DEVELOPER)
        var$0.$networkProvider = cprn_EmptyNetworkProvider__init_0();
},
cpr_RPGMain__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new cpr_RPGMain();
    cpr_RPGMain__init_0(var_3, var_0, var_1, var_2);
    return var_3;
};
function cbgg_b() {
    let a = this; jl_Object.call(a);
    a.$I = 0.0;
    a.$J = 0.0;
    a.$K = 0.0;
    a.$L = 0.0;
}
let cbgg_b_A = null,
cbgg_b_B = null,
cbgg_b_C = null,
cbgg_b_D = null,
cbgg_b_E = null,
cbgg_b_F = null,
cbgg_b_G = null,
cbgg_b_H = null,
cbgg_b_a = null,
cbgg_b_b = null,
cbgg_b_c = null,
cbgg_b_d = null,
cbgg_b_e = null,
cbgg_b_f = null,
cbgg_b_g = null,
cbgg_b_h = null,
cbgg_b_i = null,
cbgg_b_j = null,
cbgg_b_k = null,
cbgg_b_l = null,
cbgg_b_m = null,
cbgg_b_n = null,
cbgg_b_o = null,
cbgg_b_p = null,
cbgg_b_q = null,
cbgg_b_r = null,
cbgg_b_s = null,
cbgg_b_t = null,
cbgg_b_u = null,
cbgg_b_v = null,
cbgg_b_w = null,
cbgg_b_x = null,
cbgg_b_y = null,
cbgg_b_z = null,
cbgg_b_$callClinit = () => {
    cbgg_b_$callClinit = $rt_eraseClinit(cbgg_b);
    cbgg_b__clinit_();
},
cbgg_b__clinit_ = () => {
    cbgg_b_a = cbgg_b__init_0(0.0, 0.0, 0.0, 0.0);
    cbgg_b_b = cbgg_b__init_0(0.0, 0.0, 0.0, 1.0);
    cbgg_b_c = cbgg_b__init_((-1));
    cbgg_b_d = cbgg_b__init_((-1077952513));
    cbgg_b_e = cbgg_b__init_(2139062271);
    cbgg_b_f = cbgg_b__init_(1061109759);
    cbgg_b_g = cbgg_b__init_0(0.0, 0.0, 1.0, 1.0);
    cbgg_b_h = cbgg_b__init_0(0.0, 0.0, 0.5, 1.0);
    cbgg_b_i = cbgg_b__init_(1097458175);
    cbgg_b_j = cbgg_b__init_(1887473919);
    cbgg_b_k = cbgg_b__init_((-2016482305));
    cbgg_b_l = cbgg_b__init_0(0.0, 1.0, 1.0, 1.0);
    cbgg_b_m = cbgg_b__init_0(0.0, 0.5, 0.5, 1.0);
    cbgg_b_n = cbgg_b__init_(16711935);
    cbgg_b_o = cbgg_b__init_(2147418367);
    cbgg_b_p = cbgg_b__init_(852308735);
    cbgg_b_q = cbgg_b__init_(579543807);
    cbgg_b_r = cbgg_b__init_(1804477439);
    cbgg_b_s = cbgg_b__init_((-65281));
    cbgg_b_t = cbgg_b__init_((-2686721));
    cbgg_b_u = cbgg_b__init_((-626712321));
    cbgg_b_v = cbgg_b__init_((-5963521));
    cbgg_b_w = cbgg_b__init_((-1958407169));
    cbgg_b_x = cbgg_b__init_((-759919361));
    cbgg_b_y = cbgg_b__init_((-1306385665));
    cbgg_b_z = cbgg_b__init_((-16776961));
    cbgg_b_A = cbgg_b__init_((-13361921));
    cbgg_b_B = cbgg_b__init_((-8433409));
    cbgg_b_C = cbgg_b__init_((-92245249));
    cbgg_b_D = cbgg_b__init_((-9849601));
    cbgg_b_E = cbgg_b__init_0(1.0, 0.0, 1.0, 1.0);
    cbgg_b_F = cbgg_b__init_((-1608453889));
    cbgg_b_G = cbgg_b__init_((-293409025));
    cbgg_b_H = cbgg_b__init_((-1339006721));
},
cbgg_b__init_1 = (var$0, var$1, var$2, var$3, var$4) => {
    cbgg_b_$callClinit();
    jl_Object__init_(var$0);
    var$0.$I = var$1;
    var$0.$J = var$2;
    var$0.$K = var$3;
    var$0.$L = var$4;
    cbgg_b_a0(var$0);
},
cbgg_b__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new cbgg_b();
    cbgg_b__init_1(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
cbgg_b__init_2 = (var$0, var$1) => {
    cbgg_b_$callClinit();
    jl_Object__init_(var$0);
    cbgg_b_a1(var$0, var$1);
},
cbgg_b__init_ = var_0 => {
    let var_1 = new cbgg_b();
    cbgg_b__init_2(var_1, var_0);
    return var_1;
},
cbgg_b_a1 = (var$1, var$2) => {
    cbgg_b_$callClinit();
    var$1.$I = (((-16777216) & var$2) >>> 24 | 0) / 255.0;
    var$1.$J = ((var$2 >>> 16 | 0) & 255) / 255.0;
    var$1.$K = ((var$2 >>> 8 | 0) & 255) / 255.0;
    var$1.$L = (var$2 & 255) / 255.0;
},
cbgg_b_a0 = var$0 => {
    if (var$0.$I < 0.0)
        var$0.$I = 0.0;
    else if (var$0.$I > 1.0)
        var$0.$I = 1.0;
    if (var$0.$J < 0.0)
        var$0.$J = 0.0;
    else if (var$0.$J > 1.0)
        var$0.$J = 1.0;
    if (var$0.$K < 0.0)
        var$0.$K = 0.0;
    else if (var$0.$K > 1.0)
        var$0.$K = 1.0;
    if (var$0.$L < 0.0)
        var$0.$L = 0.0;
    else if (var$0.$L > 1.0) {
        var$0.$L = 1.0;
        return var$0;
    }
    return var$0;
},
cprg_EntityRenderable = $rt_classWithoutFields(cprg_BaseEntityRenderable),
cbgg_c = $rt_classWithoutFields(),
cbgg_c_a0 = null,
cbgg_c_$callClinit = () => {
    cbgg_c_$callClinit = $rt_eraseClinit(cbgg_c);
    cbgg_c__clinit_();
},
cbgg_c__clinit_ = () => {
    let var$1, var$2;
    var$1 = cbgu_z__init_();
    cbgg_c_a0 = var$1;
    var$1.$a5();
    var$2 = cbgg_c_a0;
    cbgg_b_$callClinit();
    var$2.$a6($rt_s(146), cbgg_b_a);
    cbgg_c_a0.$a6($rt_s(147), cbgg_b_b);
    cbgg_c_a0.$a6($rt_s(148), cbgg_b_c);
    cbgg_c_a0.$a6($rt_s(149), cbgg_b_d);
    cbgg_c_a0.$a6($rt_s(150), cbgg_b_e);
    cbgg_c_a0.$a6($rt_s(151), cbgg_b_f);
    cbgg_c_a0.$a6($rt_s(152), cbgg_b_g);
    cbgg_c_a0.$a6($rt_s(153), cbgg_b_h);
    cbgg_c_a0.$a6($rt_s(154), cbgg_b_i);
    cbgg_c_a0.$a6($rt_s(155), cbgg_b_j);
    cbgg_c_a0.$a6($rt_s(156), cbgg_b_k);
    cbgg_c_a0.$a6($rt_s(157), cbgg_b_l);
    cbgg_c_a0.$a6($rt_s(158), cbgg_b_m);
    cbgg_c_a0.$a6($rt_s(159), cbgg_b_n);
    cbgg_c_a0.$a6($rt_s(160), cbgg_b_o);
    cbgg_c_a0.$a6($rt_s(161), cbgg_b_p);
    cbgg_c_a0.$a6($rt_s(162), cbgg_b_q);
    cbgg_c_a0.$a6($rt_s(163), cbgg_b_r);
    cbgg_c_a0.$a6($rt_s(164), cbgg_b_s);
    cbgg_c_a0.$a6($rt_s(165), cbgg_b_t);
    cbgg_c_a0.$a6($rt_s(166), cbgg_b_u);
    cbgg_c_a0.$a6($rt_s(167), cbgg_b_v);
    cbgg_c_a0.$a6($rt_s(168), cbgg_b_w);
    cbgg_c_a0.$a6($rt_s(169), cbgg_b_x);
    cbgg_c_a0.$a6($rt_s(170), cbgg_b_y);
    cbgg_c_a0.$a6($rt_s(171), cbgg_b_z);
    cbgg_c_a0.$a6($rt_s(172), cbgg_b_A);
    cbgg_c_a0.$a6($rt_s(173), cbgg_b_B);
    cbgg_c_a0.$a6($rt_s(174), cbgg_b_C);
    cbgg_c_a0.$a6($rt_s(175), cbgg_b_D);
    cbgg_c_a0.$a6($rt_s(176), cbgg_b_E);
    cbgg_c_a0.$a6($rt_s(177), cbgg_b_F);
    cbgg_c_a0.$a6($rt_s(178), cbgg_b_G);
    cbgg_c_a0.$a6($rt_s(179), cbgg_b_H);
},
cbgg_c_a = (var$1, var$2) => {
    cbgg_c_$callClinit();
    return cbgg_c_a0.$a6(var$1, var$2);
},
ju_Iterator = $rt_classWithoutFields(0),
ju_ListIterator = $rt_classWithoutFields(0);
function ju_Date() {
    jl_Object.call(this);
    this.$value1 = Long_ZERO;
}
let ju_Date_$callClinit = () => {
    ju_Date_$callClinit = $rt_eraseClinit(ju_Date);
    ju_Date__clinit_();
},
ju_Date__init_ = ($this, $date) => {
    ju_Date_$callClinit();
    jl_Object__init_($this);
    $this.$value1 = $date;
},
ju_Date__init_0 = var_0 => {
    let var_1 = new ju_Date();
    ju_Date__init_(var_1, var_0);
    return var_1;
},
ju_Date__clinit_ = () => {
    return;
},
cprnm_GameMode = $rt_classWithoutFields(jl_Enum),
cprnm_GameMode_$VALUES = null,
cprnm_GameMode_BOSS_BATTLE = null,
cprnm_GameMode_BOSS_PIT = null,
cprnm_GameMode_CAMPAIGN = null,
cprnm_GameMode_CHALLENGES_MAGIC_IMMUNE = null,
cprnm_GameMode_CHALLENGES_ONLY_DRAGONS = null,
cprnm_GameMode_CHALLENGES_PHYSICAL_IMMUNE = null,
cprnm_GameMode_COLISEUM = null,
cprnm_GameMode_CRAFT = null,
cprnm_GameMode_CRYPT = null,
cprnm_GameMode_ELITE_CAMPAIGN = null,
cprnm_GameMode_ENCHANTING = null,
cprnm_GameMode_EXPEDITION = null,
cprnm_GameMode_EXPERT_CAMPAIGN = null,
cprnm_GameMode_FIGHT_PIT = null,
cprnm_GameMode_GUILD_WAR = null,
cprnm_GameMode_GUILD_WAR_REGISTRATION = null,
cprnm_GameMode_RUNES = null,
cprnm_GameMode_THE_MOUNTAIN_CAVES = null,
cprnm_GameMode_THE_MOUNTAIN_SUMMIT = null,
cprnm_GameMode_TITAN_TEMPLE = null,
cprnm_GameMode_XP_BONUS_TEAM = null,
cprnm_GameMode_values0 = null,
cprnm_GameMode_$callClinit = () => {
    cprnm_GameMode_$callClinit = $rt_eraseClinit(cprnm_GameMode);
    cprnm_GameMode__clinit_();
},
cprnm_GameMode__clinit_ = () => {
    let var$1, var$2;
    cprnm_GameMode_CAMPAIGN = cprnm_GameMode__init_($rt_s(180), 0);
    cprnm_GameMode_ELITE_CAMPAIGN = cprnm_GameMode__init_($rt_s(181), 1);
    cprnm_GameMode_EXPEDITION = cprnm_GameMode__init_($rt_s(182), 2);
    cprnm_GameMode_THE_MOUNTAIN_SUMMIT = cprnm_GameMode__init_($rt_s(183), 3);
    cprnm_GameMode_THE_MOUNTAIN_CAVES = cprnm_GameMode__init_($rt_s(184), 4);
    cprnm_GameMode_CHALLENGES_MAGIC_IMMUNE = cprnm_GameMode__init_($rt_s(185), 5);
    cprnm_GameMode_CHALLENGES_PHYSICAL_IMMUNE = cprnm_GameMode__init_($rt_s(186), 6);
    cprnm_GameMode_CHALLENGES_ONLY_DRAGONS = cprnm_GameMode__init_($rt_s(187), 7);
    cprnm_GameMode_FIGHT_PIT = cprnm_GameMode__init_($rt_s(24), 8);
    cprnm_GameMode_CRYPT = cprnm_GameMode__init_($rt_s(27), 9);
    cprnm_GameMode_ENCHANTING = cprnm_GameMode__init_($rt_s(26), 10);
    cprnm_GameMode_COLISEUM = cprnm_GameMode__init_($rt_s(188), 11);
    cprnm_GameMode_TITAN_TEMPLE = cprnm_GameMode__init_($rt_s(189), 12);
    cprnm_GameMode_BOSS_PIT = cprnm_GameMode__init_($rt_s(30), 13);
    cprnm_GameMode_GUILD_WAR = cprnm_GameMode__init_($rt_s(34), 14);
    cprnm_GameMode_GUILD_WAR_REGISTRATION = cprnm_GameMode__init_($rt_s(190), 15);
    cprnm_GameMode_RUNES = cprnm_GameMode__init_($rt_s(53), 16);
    cprnm_GameMode_CRAFT = cprnm_GameMode__init_($rt_s(191), 17);
    cprnm_GameMode_XP_BONUS_TEAM = cprnm_GameMode__init_($rt_s(192), 18);
    cprnm_GameMode_BOSS_BATTLE = cprnm_GameMode__init_($rt_s(193), 19);
    cprnm_GameMode_EXPERT_CAMPAIGN = cprnm_GameMode__init_($rt_s(194), 20);
    var$1 = $rt_createArray(cprnm_GameMode, 21);
    var$2 = var$1.data;
    var$2[0] = cprnm_GameMode_CAMPAIGN;
    var$2[1] = cprnm_GameMode_ELITE_CAMPAIGN;
    var$2[2] = cprnm_GameMode_EXPEDITION;
    var$2[3] = cprnm_GameMode_THE_MOUNTAIN_SUMMIT;
    var$2[4] = cprnm_GameMode_THE_MOUNTAIN_CAVES;
    var$2[5] = cprnm_GameMode_CHALLENGES_MAGIC_IMMUNE;
    var$2[6] = cprnm_GameMode_CHALLENGES_PHYSICAL_IMMUNE;
    var$2[7] = cprnm_GameMode_CHALLENGES_ONLY_DRAGONS;
    var$2[8] = cprnm_GameMode_FIGHT_PIT;
    var$2[9] = cprnm_GameMode_CRYPT;
    var$2[10] = cprnm_GameMode_ENCHANTING;
    var$2[11] = cprnm_GameMode_COLISEUM;
    var$2[12] = cprnm_GameMode_TITAN_TEMPLE;
    var$2[13] = cprnm_GameMode_BOSS_PIT;
    var$2[14] = cprnm_GameMode_GUILD_WAR;
    var$2[15] = cprnm_GameMode_GUILD_WAR_REGISTRATION;
    var$2[16] = cprnm_GameMode_RUNES;
    var$2[17] = cprnm_GameMode_CRAFT;
    var$2[18] = cprnm_GameMode_XP_BONUS_TEAM;
    var$2[19] = cprnm_GameMode_BOSS_BATTLE;
    var$2[20] = cprnm_GameMode_EXPERT_CAMPAIGN;
    cprnm_GameMode_$VALUES = var$1;
    cprnm_GameMode_values0 = cprnm_GameMode_values();
},
cprnm_GameMode__init_0 = (var$0, var$1, var$2) => {
    cprnm_GameMode_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_GameMode__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_GameMode();
    cprnm_GameMode__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_GameMode_values = () => {
    cprnm_GameMode_$callClinit();
    return cprnm_GameMode_$VALUES.$clone0();
},
otcit_DoubleAnalyzer$Result = $rt_classWithoutFields(),
otcit_DoubleAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_DoubleAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_(var_0);
    return var_0;
},
cpr_BuildType = $rt_classWithoutFields(jl_Enum),
cpr_BuildType_$VALUES = null,
cpr_BuildType_BETA = null,
cpr_BuildType_DEVELOPER = null,
cpr_BuildType_RELEASE = null,
cpr_BuildType_$callClinit = () => {
    cpr_BuildType_$callClinit = $rt_eraseClinit(cpr_BuildType);
    cpr_BuildType__clinit_();
},
cpr_BuildType__clinit_ = () => {
    let var$1, var$2;
    cpr_BuildType_DEVELOPER = cpr_BuildType__init_($rt_s(195), 0);
    cpr_BuildType_RELEASE = cpr_BuildType__init_($rt_s(196), 1);
    cpr_BuildType_BETA = cpr_BuildType__init_($rt_s(197), 2);
    var$1 = $rt_createArray(cpr_BuildType, 3);
    var$2 = var$1.data;
    var$2[0] = cpr_BuildType_DEVELOPER;
    var$2[1] = cpr_BuildType_RELEASE;
    var$2[2] = cpr_BuildType_BETA;
    cpr_BuildType_$VALUES = var$1;
},
cpr_BuildType__init_0 = (var$0, var$1, var$2) => {
    cpr_BuildType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cpr_BuildType__init_ = (var_0, var_1) => {
    let var_2 = new cpr_BuildType();
    cpr_BuildType__init_0(var_2, var_0, var_1);
    return var_2;
},
cpr_BuildType_values = () => {
    cpr_BuildType_$callClinit();
    return cpr_BuildType_$VALUES.$clone0();
},
cprnm_ArenaTier = $rt_classWithoutFields(jl_Enum),
cprnm_ArenaTier_$VALUES = null,
cprnm_ArenaTier_BRONZE = null,
cprnm_ArenaTier_CHALLENGER = null;
let cprnm_ArenaTier_COPPER = null,
cprnm_ArenaTier_DEFAULT = null,
cprnm_ArenaTier_GOLD = null,
cprnm_ArenaTier_PLATINUM = null,
cprnm_ArenaTier_SILVER = null,
cprnm_ArenaTier_values0 = null,
cprnm_ArenaTier_$callClinit = () => {
    cprnm_ArenaTier_$callClinit = $rt_eraseClinit(cprnm_ArenaTier);
    cprnm_ArenaTier__clinit_();
},
cprnm_ArenaTier__clinit_ = () => {
    let var$1, var$2;
    cprnm_ArenaTier_DEFAULT = cprnm_ArenaTier__init_($rt_s(12), 0);
    cprnm_ArenaTier_COPPER = cprnm_ArenaTier__init_($rt_s(198), 1);
    cprnm_ArenaTier_BRONZE = cprnm_ArenaTier__init_($rt_s(199), 2);
    cprnm_ArenaTier_SILVER = cprnm_ArenaTier__init_($rt_s(200), 3);
    cprnm_ArenaTier_GOLD = cprnm_ArenaTier__init_($rt_s(165), 4);
    cprnm_ArenaTier_PLATINUM = cprnm_ArenaTier__init_($rt_s(201), 5);
    cprnm_ArenaTier_CHALLENGER = cprnm_ArenaTier__init_($rt_s(202), 6);
    var$1 = $rt_createArray(cprnm_ArenaTier, 7);
    var$2 = var$1.data;
    var$2[0] = cprnm_ArenaTier_DEFAULT;
    var$2[1] = cprnm_ArenaTier_COPPER;
    var$2[2] = cprnm_ArenaTier_BRONZE;
    var$2[3] = cprnm_ArenaTier_SILVER;
    var$2[4] = cprnm_ArenaTier_GOLD;
    var$2[5] = cprnm_ArenaTier_PLATINUM;
    var$2[6] = cprnm_ArenaTier_CHALLENGER;
    cprnm_ArenaTier_$VALUES = var$1;
    cprnm_ArenaTier_values0 = cprnm_ArenaTier_values();
},
cprnm_ArenaTier__init_0 = (var$0, var$1, var$2) => {
    cprnm_ArenaTier_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_ArenaTier__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_ArenaTier();
    cprnm_ArenaTier__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_ArenaTier_values = () => {
    cprnm_ArenaTier_$callClinit();
    return cprnm_ArenaTier_$VALUES.$clone0();
},
ju_Random = $rt_classWithoutFields(),
ju_Random__init_ = $this => {
    jl_Object__init_($this);
},
ju_Random__init_0 = () => {
    let var_0 = new ju_Random();
    ju_Random__init_(var_0);
    return var_0;
},
ju_Random_nextInt = $this => {
    return 4.294967296E9 * $this.$nextDouble() + (-2.147483648E9) | 0;
},
ju_Random_nextLong = $this => {
    return Long_or(Long_shl(Long_fromInt($this.$nextInt()), 32), Long_and(Long_fromInt($this.$nextInt()), Long_create(4294967295, 0)));
},
ju_Random_nextDouble = $this => {
    return jl_Math_random();
},
cpce_a = $rt_classWithoutFields(0),
cpr_UICommonHelper = $rt_classWithoutFields(),
cpr_UICommonHelper__init_ = var$0 => {
    jl_Object__init_(var$0);
},
cpr_UICommonHelper__init_0 = () => {
    let var_0 = new cpr_UICommonHelper();
    cpr_UICommonHelper__init_(var_0);
    return var_0;
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(203);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_3($chars);
},
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
jl_DefaultUncaughtExceptionHandler__init_ = $this => {
    jl_Object__init_($this);
},
jl_DefaultUncaughtExceptionHandler__init_0 = () => {
    let var_0 = new jl_DefaultUncaughtExceptionHandler();
    jl_DefaultUncaughtExceptionHandler__init_(var_0);
    return var_0;
},
otcir_FieldInfo = $rt_classWithoutFields(),
cprnm_ResourceType = $rt_classWithoutFields(jl_Enum),
cprnm_ResourceType_$VALUES = null,
cprnm_ResourceType_BAZAAR_TOKENS = null,
cprnm_ResourceType_COLISEUM_TOKENS = null,
cprnm_ResourceType_CRYSTAL_SHRINE_ROLLS = null,
cprnm_ResourceType_DEFAULT = null,
cprnm_ResourceType_DIAMONDS = null,
cprnm_ResourceType_EXPEDITION_TOKENS = null,
cprnm_ResourceType_FIGHT_TOKENS = null,
cprnm_ResourceType_FREE_DIAMONDS = null,
cprnm_ResourceType_GOLD = null,
cprnm_ResourceType_GOLD_CHEST = null,
cprnm_ResourceType_GUILD_TOKENS = null,
cprnm_ResourceType_ORANGE_CHEST = null,
cprnm_ResourceType_PAID_DIAMONDS = null,
cprnm_ResourceType_POWER_POINTS = null,
cprnm_ResourceType_PURPLE_CHEST = null,
cprnm_ResourceType_RUNICITE = null,
cprnm_ResourceType_SILVER_CHEST = null,
cprnm_ResourceType_SOULMART_TOKENS = null,
cprnm_ResourceType_SOUL_CHEST = null,
cprnm_ResourceType_STAMINA = null;
let cprnm_ResourceType_STONE_SHRINE_ROLLS = null,
cprnm_ResourceType_TEAM_XP = null,
cprnm_ResourceType_VIP_TICKETS = null,
cprnm_ResourceType_WAR_TOKENS = null,
cprnm_ResourceType_values0 = null,
cprnm_ResourceType_$callClinit = () => {
    cprnm_ResourceType_$callClinit = $rt_eraseClinit(cprnm_ResourceType);
    cprnm_ResourceType__clinit_();
},
cprnm_ResourceType__clinit_ = () => {
    let var$1, var$2;
    cprnm_ResourceType_DEFAULT = cprnm_ResourceType__init_($rt_s(12), 0);
    cprnm_ResourceType_DIAMONDS = cprnm_ResourceType__init_($rt_s(204), 1);
    cprnm_ResourceType_GOLD = cprnm_ResourceType__init_($rt_s(165), 2);
    cprnm_ResourceType_STAMINA = cprnm_ResourceType__init_($rt_s(205), 3);
    cprnm_ResourceType_TEAM_XP = cprnm_ResourceType__init_($rt_s(206), 4);
    cprnm_ResourceType_POWER_POINTS = cprnm_ResourceType__init_($rt_s(19), 5);
    cprnm_ResourceType_VIP_TICKETS = cprnm_ResourceType__init_($rt_s(207), 6);
    cprnm_ResourceType_SILVER_CHEST = cprnm_ResourceType__init_($rt_s(208), 7);
    cprnm_ResourceType_GOLD_CHEST = cprnm_ResourceType__init_($rt_s(209), 8);
    cprnm_ResourceType_SOUL_CHEST = cprnm_ResourceType__init_($rt_s(210), 9);
    cprnm_ResourceType_FIGHT_TOKENS = cprnm_ResourceType__init_($rt_s(211), 10);
    cprnm_ResourceType_FREE_DIAMONDS = cprnm_ResourceType__init_($rt_s(212), 11);
    cprnm_ResourceType_PAID_DIAMONDS = cprnm_ResourceType__init_($rt_s(213), 12);
    cprnm_ResourceType_EXPEDITION_TOKENS = cprnm_ResourceType__init_($rt_s(214), 13);
    cprnm_ResourceType_GUILD_TOKENS = cprnm_ResourceType__init_($rt_s(215), 14);
    cprnm_ResourceType_COLISEUM_TOKENS = cprnm_ResourceType__init_($rt_s(216), 15);
    cprnm_ResourceType_SOULMART_TOKENS = cprnm_ResourceType__init_($rt_s(217), 16);
    cprnm_ResourceType_WAR_TOKENS = cprnm_ResourceType__init_($rt_s(218), 17);
    cprnm_ResourceType_RUNICITE = cprnm_ResourceType__init_($rt_s(219), 18);
    cprnm_ResourceType_STONE_SHRINE_ROLLS = cprnm_ResourceType__init_($rt_s(220), 19);
    cprnm_ResourceType_CRYSTAL_SHRINE_ROLLS = cprnm_ResourceType__init_($rt_s(221), 20);
    cprnm_ResourceType_BAZAAR_TOKENS = cprnm_ResourceType__init_($rt_s(222), 21);
    cprnm_ResourceType_PURPLE_CHEST = cprnm_ResourceType__init_($rt_s(223), 22);
    cprnm_ResourceType_ORANGE_CHEST = cprnm_ResourceType__init_($rt_s(224), 23);
    var$1 = $rt_createArray(cprnm_ResourceType, 24);
    var$2 = var$1.data;
    var$2[0] = cprnm_ResourceType_DEFAULT;
    var$2[1] = cprnm_ResourceType_DIAMONDS;
    var$2[2] = cprnm_ResourceType_GOLD;
    var$2[3] = cprnm_ResourceType_STAMINA;
    var$2[4] = cprnm_ResourceType_TEAM_XP;
    var$2[5] = cprnm_ResourceType_POWER_POINTS;
    var$2[6] = cprnm_ResourceType_VIP_TICKETS;
    var$2[7] = cprnm_ResourceType_SILVER_CHEST;
    var$2[8] = cprnm_ResourceType_GOLD_CHEST;
    var$2[9] = cprnm_ResourceType_SOUL_CHEST;
    var$2[10] = cprnm_ResourceType_FIGHT_TOKENS;
    var$2[11] = cprnm_ResourceType_FREE_DIAMONDS;
    var$2[12] = cprnm_ResourceType_PAID_DIAMONDS;
    var$2[13] = cprnm_ResourceType_EXPEDITION_TOKENS;
    var$2[14] = cprnm_ResourceType_GUILD_TOKENS;
    var$2[15] = cprnm_ResourceType_COLISEUM_TOKENS;
    var$2[16] = cprnm_ResourceType_SOULMART_TOKENS;
    var$2[17] = cprnm_ResourceType_WAR_TOKENS;
    var$2[18] = cprnm_ResourceType_RUNICITE;
    var$2[19] = cprnm_ResourceType_STONE_SHRINE_ROLLS;
    var$2[20] = cprnm_ResourceType_CRYSTAL_SHRINE_ROLLS;
    var$2[21] = cprnm_ResourceType_BAZAAR_TOKENS;
    var$2[22] = cprnm_ResourceType_PURPLE_CHEST;
    var$2[23] = cprnm_ResourceType_ORANGE_CHEST;
    cprnm_ResourceType_$VALUES = var$1;
    cprnm_ResourceType_values0 = cprnm_ResourceType_values();
},
cprnm_ResourceType__init_0 = (var$0, var$1, var$2) => {
    cprnm_ResourceType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_ResourceType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_ResourceType();
    cprnm_ResourceType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_ResourceType_values = () => {
    cprnm_ResourceType_$callClinit();
    return cprnm_ResourceType_$VALUES.$clone0();
};
function cprnm_UserExtra() {
    let a = this; cpaa_i.call(a);
    a.$aBGroups = null;
    a.$activeDropMultipliers = null;
    a.$activeUseItemEventMultipliers = null;
    a.$admin = null;
    a.$appReviewStatus = null;
    a.$avatar = null;
    a.$battleOptOutsPerGuild = null;
    a.$battlesMissed = null;
    a.$blockedUsers = null;
    a.$bossPitData = null;
    a.$bossPitStars = null;
    a.$claimedArenaRewards = null;
    a.$claimedColiseumRewards = null;
    a.$combatAutoSettings = null;
    a.$completedEvents = null;
    a.$completedQuests0 = null;
    a.$consumableItemsViewed = null;
    a.$cooldowns = null;
    a.$country0 = null;
    a.$counts = null;
    a.$currentTitanTemple = null;
    a.$customBanMessage = null;
    a.$dailyChances = null;
    a.$dailyUses = null;
    a.$eventSigninBonusLastSigninTime = null;
    a.$eventSigninBonusMonthlySignins = null;
    a.$expLootPool = null;
    a.$expeditionID = null;
    a.$facebookName = null;
    a.$flags = null;
    a.$gameCenterName0 = null;
    a.$gameCircleName0 = null;
    a.$gameModeProgressionTracker = null;
    a.$globalMailMessageData = null;
    a.$googlePlusName0 = null;
    a.$guildJoinTime = null;
    a.$guildTitanTemples = null;
    a.$heroLineups = null;
    a.$heroStoneCounts = null;
    a.$heroes = null;
    a.$hiredHeroes = null;
    a.$howToPlayFlags = null;
    a.$iAPProductPurchases = null;
    a.$items = null;
    a.$joinedWarID = null;
    a.$language = null;
    a.$lastLogout = null;
    a.$lastResourceGenerationTimes = null;
    a.$lastVIPItem = null;
    a.$lastViewedWarBattle = null;
    a.$levelStatuses = null;
    a.$likedHeroWallPosts = null;
    a.$loginDays = null;
    a.$lootMemory = null;
    a.$mercenariesPostedAtGuildID = null;
    a.$merchantData = null;
    a.$modeAutoUnlocks = null;
    a.$moderator = null;
    a.$monthlySignins = null;
    a.$newSkins = null;
    a.$nextRuneID = null;
    a.$oldAvatar = null;
    a.$oldExpeditionData = null;
    a.$oldExpeditionID = null;
    a.$oldLootMemory = null;
    a.$optedOutOfWarBy = null;
    a.$personalMessageHideTime = null;
    a.$previousEventSigninStatus = null;
    a.$previousName0 = null;
    a.$previousSigninStatus = null;
    a.$promoCodes = null;
    a.$questCompletionTimes = null;
    a.$questCounters = null;
    a.$resources = null;
    a.$runeEmpowerMemory = null;
    a.$runes = null;
    a.$settings = null;
    a.$snapshotEvents = null;
    a.$storedSeeds = null;
    a.$suspensionOffenceCount = null;
    a.$suspensionReason = null;
    a.$teamLevelEventStarts = null;
    a.$thirdPartyQuestStatuses = null;
    a.$timeZone = null;
    a.$timeZoneOffset = null;
    a.$times = null;
    a.$tutorialActs0 = null;
    a.$unclaimedArenaDemotionDivision = null;
    a.$unclaimedArenaDemotionTier = null;
    a.$unclaimedArenaPromotionDivision = null;
    a.$unclaimedArenaPromotionTier = null;
    a.$unclaimedColiseumDemotionDivision = null;
    a.$unclaimedColiseumDemotionTier = null;
    a.$unclaimedColiseumPromotionDivision = null;
    a.$unclaimedColiseumPromotionTier = null;
    a.$userEventsRecorded = null;
    a.$viewedDailyQuests = null;
}
let cprnm_UserExtra__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(225));
    var$0.$settings = ju_HashMap__init_(0);
    var$0.$blockedUsers = ju_HashMap__init_(0);
    var$0.$lastLogout = ju_Date__init_0(Long_ZERO);
    var$0.$admin = jl_Boolean_valueOf(0);
    var$0.$language = $rt_s(91);
    var$0.$flags = ju_HashMap__init_(0);
    var$0.$tutorialActs0 = ju_ArrayList__init_(0);
    var$0.$counts = ju_HashMap__init_(0);
    cprnm_AppReviewStatus_$callClinit();
    var$0.$appReviewStatus = cprnm_AppReviewStatus_NO_RESPONSE;
    var$0.$facebookName = $rt_s(91);
    var$0.$googlePlusName0 = $rt_s(91);
    var$0.$gameCenterName0 = $rt_s(91);
    var$0.$gameCircleName0 = $rt_s(91);
    var$0.$loginDays = ju_ArrayList__init_(0);
    var$0.$country0 = $rt_s(91);
    var$0.$heroes = ju_EnumMap__init_($rt_cls(cprnm_UnitType));
    var$0.$items = ju_EnumMap__init_($rt_cls(cprnm_ItemType));
    var$0.$heroLineups = ju_EnumMap__init_($rt_cls(cprnm_HeroLineupType));
    var$0.$resources = ju_EnumMap__init_($rt_cls(cprnm_ResourceType));
    var$0.$lastResourceGenerationTimes = ju_EnumMap__init_($rt_cls(cprnm_ResourceType));
    var$0.$iAPProductPurchases = ju_HashMap__init_(0);
    var$0.$dailyUses = ju_HashMap__init_(0);
    var$0.$dailyChances = ju_HashMap__init_(0);
    var$0.$cooldowns = ju_EnumMap__init_($rt_cls(cprnm_CooldownType));
    var$0.$merchantData = ju_EnumMap__init_($rt_cls(cprnm_MerchantType));
    var$0.$oldLootMemory = ju_EnumMap__init_($rt_cls(cprnm_ItemType));
    var$0.$levelStatuses = ju_ArrayList__init_(0);
    cprnm_UnitType_$callClinit();
    var$0.$oldAvatar = cprnm_UnitType_DEFAULT;
    var$0.$monthlySignins = jl_Integer_valueOf(0);
    var$0.$globalMailMessageData = ju_HashMap__init_(0);
    var$0.$completedQuests0 = ju_HashMap__init_(0);
    var$0.$questCompletionTimes = ju_HashMap__init_(0);
    cprnm_ArenaTier_$callClinit();
    var$0.$unclaimedArenaPromotionTier = cprnm_ArenaTier_DEFAULT;
    var$0.$unclaimedArenaPromotionDivision = jl_Integer_valueOf(0);
    var$0.$claimedArenaRewards = ju_HashMap__init_(0);
    var$0.$unclaimedArenaDemotionTier = cprnm_ArenaTier_DEFAULT;
    var$0.$unclaimedArenaDemotionDivision = jl_Integer_valueOf(0);
    var$0.$heroStoneCounts = ju_EnumMap__init_($rt_cls(cprnm_UnitType));
    var$0.$times = ju_EnumMap__init_($rt_cls(cprnm_TimeType));
    var$0.$timeZoneOffset = jl_Integer_valueOf(0);
    var$0.$userEventsRecorded = ju_ArrayList__init_(0);
    var$0.$aBGroups = ju_HashMap__init_(0);
    var$0.$previousSigninStatus = ju_HashMap__init_(0);
    var$0.$viewedDailyQuests = ju_ArrayList__init_(0);
    var$0.$oldExpeditionData = cprnm_ExpeditionRunData__init_0();
    var$0.$guildJoinTime = jl_Long_valueOf(Long_ZERO);
    var$0.$hiredHeroes = ju_EnumMap__init_($rt_cls(cprnm_GameMode));
    var$0.$mercenariesPostedAtGuildID = jl_Long_valueOf(Long_ZERO);
    var$0.$modeAutoUnlocks = ju_ArrayList__init_(0);
    var$0.$oldExpeditionID = jl_Integer_valueOf(0);
    var$0.$thirdPartyQuestStatuses = ju_HashMap__init_(0);
    var$0.$likedHeroWallPosts = ju_ArrayList__init_(0);
    var$0.$lootMemory = ju_EnumMap__init_($rt_cls(cprnm_ItemType));
    var$0.$unclaimedColiseumPromotionTier = cprnm_ArenaTier_DEFAULT;
    var$0.$unclaimedColiseumPromotionDivision = jl_Integer_valueOf(0);
    var$0.$claimedColiseumRewards = ju_HashMap__init_(0);
    var$0.$unclaimedColiseumDemotionTier = cprnm_ArenaTier_DEFAULT;
    var$0.$unclaimedColiseumDemotionDivision = jl_Integer_valueOf(0);
    var$0.$howToPlayFlags = ju_EnumMap__init_($rt_cls(cprnm_HowToPlayDeckType));
    var$0.$moderator = jl_Boolean_valueOf(0);
    var$0.$expLootPool = jl_Integer_valueOf(0);
    var$0.$currentTitanTemple = jl_Long_valueOf(Long_ZERO);
    var$0.$guildTitanTemples = ju_ArrayList__init_(0);
    var$0.$snapshotEvents = ju_ArrayList__init_(0);
    var$0.$bossPitData = cprnm_BossPitData__init_0();
    var$0.$promoCodes = ju_ArrayList__init_(0);
    var$0.$completedEvents = ju_HashMap__init_(0);
    var$0.$storedSeeds = ju_EnumMap__init_($rt_cls(cprnm_RandomSeedType));
    var$0.$teamLevelEventStarts = ju_HashMap__init_(0);
    var$0.$combatAutoSettings = ju_EnumMap__init_($rt_cls(cprnm_HeroLineupType));
    var$0.$questCounters = ju_HashMap__init_(0);
    var$0.$lastViewedWarBattle = jl_Long_valueOf(Long_ZERO);
    var$0.$expeditionID = jl_Long_valueOf(Long_ZERO);
    var$0.$runes = ju_ArrayList__init_(0);
    var$0.$nextRuneID = jl_Long_valueOf(Long_fromInt(1));
    var$0.$runeEmpowerMemory = ju_HashMap__init_(0);
    var$0.$avatar = cprnm_Avatar__init_();
    var$0.$timeZone = $rt_s(91);
    var$0.$consumableItemsViewed = ju_ArrayList__init_(0);
    var$0.$optedOutOfWarBy = $rt_s(91);
    var$0.$previousName0 = $rt_s(91);
    var$0.$newSkins = ju_EnumMap__init_($rt_cls(cprnm_ItemType));
    cprnm_ItemType_$callClinit();
    var$0.$lastVIPItem = cprnm_ItemType_DEFAULT;
    var$0.$bossPitStars = ju_HashMap__init_(0);
    var$0.$activeDropMultipliers = ju_HashMap__init_(0);
    var$0.$suspensionReason = $rt_s(91);
    var$0.$suspensionOffenceCount = jl_Integer_valueOf(0);
    var$0.$gameModeProgressionTracker = ju_HashMap__init_(0);
    var$0.$joinedWarID = jl_Long_valueOf(Long_ZERO);
    var$0.$customBanMessage = $rt_s(91);
    var$0.$battleOptOutsPerGuild = ju_HashMap__init_(0);
    var$0.$battlesMissed = ju_ArrayList__init_(0);
    var$0.$activeUseItemEventMultipliers = ju_EnumMap__init_($rt_cls(cprnm_UseItemEventType));
    var$0.$eventSigninBonusLastSigninTime = ju_HashMap__init_(0);
    var$0.$eventSigninBonusMonthlySignins = ju_HashMap__init_(0);
    var$0.$previousEventSigninStatus = ju_HashMap__init_(0);
    var$0.$personalMessageHideTime = ju_HashMap__init_(0);
},
cprnm_UserExtra__init_0 = () => {
    let var_0 = new cprnm_UserExtra();
    cprnm_UserExtra__init_(var_0);
    return var_0;
},
otji_JS = $rt_classWithoutFields(),
cbgm_o = $rt_classWithoutFields(0),
juc_ConcurrentMap = $rt_classWithoutFields(0);
function juc_ConcurrentHashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData0 = null;
    a.$modCount1 = 0;
    a.$loadFactor = 0.0;
    a.$threshold1 = 0;
}
let juc_ConcurrentHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(juc_ConcurrentHashMap$HashEntry, $s);
},
juc_ConcurrentHashMap__init_1 = $this => {
    juc_ConcurrentHashMap__init_0($this, 16);
},
juc_ConcurrentHashMap__init_2 = () => {
    let var_0 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_1(var_0);
    return var_0;
},
juc_ConcurrentHashMap__init_0 = ($this, $capacity) => {
    juc_ConcurrentHashMap__init_($this, $capacity, 0.75);
},
juc_ConcurrentHashMap__init_3 = var_0 => {
    let var_1 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_0(var_1, var_0);
    return var_1;
},
juc_ConcurrentHashMap_calculateCapacity = $x => {
    let var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
},
juc_ConcurrentHashMap__init_ = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = juc_ConcurrentHashMap_calculateCapacity($capacity);
        $this.$elementCount0 = 0;
        $this.$elementData0 = $this.$newElementArray(var$3);
        $this.$loadFactor = $loadFactor;
        juc_ConcurrentHashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
juc_ConcurrentHashMap__init_4 = (var_0, var_1) => {
    let var_2 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_(var_2, var_0, var_1);
    return var_2;
},
juc_ConcurrentHashMap_clear = $this => {
    if ($this.$elementCount0 > 0) {
        $this.$elementCount0 = 0;
        ju_Arrays_fill0($this.$elementData0, null);
        $this.$modCount1 = $this.$modCount1 + 1 | 0;
    }
},
juc_ConcurrentHashMap_computeThreshold = $this => {
    $this.$threshold1 = $this.$elementData0.data.length * $this.$loadFactor | 0;
},
cbgm_p = $rt_classWithoutFields(),
cbgm_q = $rt_classWithoutFields();
function cbgm_m() {
    let a = this; ju_Random.call(a);
    a.$a11 = Long_ZERO;
    a.$b2 = Long_ZERO;
}
let cbgm_m__init_ = var$0 => {
    ju_Random__init_(var$0);
    cbgm_m_setSeed(var$0, (ju_Random__init_0()).$nextLong());
},
cbgm_m__init_0 = () => {
    let var_0 = new cbgm_m();
    cbgm_m__init_(var_0);
    return var_0;
},
cbgm_m_a = var$1 => {
    var$1 = Long_mul(Long_xor(Long_shru(var$1, 33), var$1), Long_create(3981806797, 4283543511));
    var$1 = Long_mul(Long_xor(var$1, Long_shru(var$1, 33)), Long_create(444984403, 3301882366));
    return Long_xor(var$1, Long_shru(var$1, 33));
},
cbgm_m_nextInt = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = Long_fromInt(var$1);
    if (Long_le(var$2, Long_ZERO))
        $rt_throw(jl_IllegalArgumentException__init_0($rt_s(226)));
    while (true) {
        var$3 = Long_shru(cbgm_m_nextLong(var$0), 1);
        var$4 = Long_rem(var$3, var$2);
        if (Long_lt(Long_add(Long_sub(var$3, var$4), Long_sub(var$2, Long_fromInt(1))), Long_ZERO))
            continue;
        else
            break;
    }
    return Long_lo(var$4);
},
cbgm_m_nextLong = var$0 => {
    let var$1, var$2;
    var$1 = var$0.$a11;
    var$2 = var$0.$b2;
    var$0.$a11 = var$2;
    var$1 = Long_xor(var$1, Long_shl(var$1, 23));
    var$1 = Long_xor(Long_xor(Long_shru(var$1, 17), Long_xor(var$1, var$2)), Long_shru(var$2, 26));
    var$0.$b2 = var$1;
    return Long_add(var$1, var$2);
},
cbgm_m_setSeed = (var$0, var$1) => {
    let var$2;
    if (Long_eq(var$1, Long_ZERO))
        var$1 = Long_create(0, 2147483648);
    var$1 = cbgm_m_a(var$1);
    var$2 = cbgm_m_a(var$1);
    var$0.$a11 = var$1;
    var$0.$b2 = var$2;
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
};
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key = $theKey;
    $this.$value = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
},
cprnm_PPEEvent = $rt_classWithoutFields(jl_Enum),
cprnm_PPEEvent_$VALUES = null,
cprnm_PPEEvent_DEFAULT = null,
cprnm_PPEEvent_DEFEAT_1_1 = null,
cprnm_PPEEvent_TL10 = null,
cprnm_PPEEvent_TL15 = null,
cprnm_PPEEvent_TL5 = null,
cprnm_PPEEvent_TL7 = null,
cprnm_PPEEvent_values0 = null,
cprnm_PPEEvent_$callClinit = () => {
    cprnm_PPEEvent_$callClinit = $rt_eraseClinit(cprnm_PPEEvent);
    cprnm_PPEEvent__clinit_();
},
cprnm_PPEEvent__clinit_ = () => {
    let var$1, var$2;
    cprnm_PPEEvent_DEFAULT = cprnm_PPEEvent__init_($rt_s(12), 0);
    cprnm_PPEEvent_TL5 = cprnm_PPEEvent__init_($rt_s(227), 1);
    cprnm_PPEEvent_TL7 = cprnm_PPEEvent__init_($rt_s(228), 2);
    cprnm_PPEEvent_TL10 = cprnm_PPEEvent__init_($rt_s(229), 3);
    cprnm_PPEEvent_DEFEAT_1_1 = cprnm_PPEEvent__init_($rt_s(230), 4);
    cprnm_PPEEvent_TL15 = cprnm_PPEEvent__init_($rt_s(231), 5);
    var$1 = $rt_createArray(cprnm_PPEEvent, 6);
    var$2 = var$1.data;
    var$2[0] = cprnm_PPEEvent_DEFAULT;
    var$2[1] = cprnm_PPEEvent_TL5;
    var$2[2] = cprnm_PPEEvent_TL7;
    var$2[3] = cprnm_PPEEvent_TL10;
    var$2[4] = cprnm_PPEEvent_DEFEAT_1_1;
    var$2[5] = cprnm_PPEEvent_TL15;
    cprnm_PPEEvent_$VALUES = var$1;
    cprnm_PPEEvent_values0 = cprnm_PPEEvent_values();
},
cprnm_PPEEvent__init_0 = (var$0, var$1, var$2) => {
    cprnm_PPEEvent_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_PPEEvent__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_PPEEvent();
    cprnm_PPEEvent__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_PPEEvent_values = () => {
    cprnm_PPEEvent_$callClinit();
    return cprnm_PPEEvent_$VALUES.$clone0();
},
ju_Queue = $rt_classWithoutFields(0),
cprnm_UnitType = $rt_classWithoutFields(jl_Enum),
cprnm_UnitType_$VALUES = null,
cprnm_UnitType_ABYSS_DRAGON = null,
cprnm_UnitType_ANCIENT_DWARF = null,
cprnm_UnitType_ANGELIC_HERALD = null,
cprnm_UnitType_ANGEL_DRAGON = null,
cprnm_UnitType_AQUATIC_MAN = null,
cprnm_UnitType_BANSHEE = null,
cprnm_UnitType_BARDBARIAN = null,
cprnm_UnitType_BLACK_WING = null,
cprnm_UnitType_BONE_DRAGON = null,
cprnm_UnitType_BROZERKER = null,
cprnm_UnitType_BULWARK_ANGEL = null,
cprnm_UnitType_BURNT_ONE = null,
cprnm_UnitType_CATAPULT_KNIGHT = null,
cprnm_UnitType_CENTAUR_OF_ATTENTION = null,
cprnm_UnitType_CLAW_MAN = null,
cprnm_UnitType_COSMIC_ELF = null,
cprnm_UnitType_CRIMSON_WITCH = null,
cprnm_UnitType_CURSED_STATUE = null,
cprnm_UnitType_CYCLOPS_WIZARD = null,
cprnm_UnitType_DARK_DRACUL = null,
cprnm_UnitType_DARK_HERO = null,
cprnm_UnitType_DARK_HORSE = null,
cprnm_UnitType_DEEP_DRAGON = null,
cprnm_UnitType_DEFAULT = null,
cprnm_UnitType_DEMON_TOTEM = null,
cprnm_UnitType_DIGGER_MOLE = null,
cprnm_UnitType_DOPPELGANGER = null,
cprnm_UnitType_DRAGON_LADY = null,
cprnm_UnitType_DRAGON_SLAYER = null,
cprnm_UnitType_DRAGZILLA = null,
cprnm_UnitType_DRUIDINATRIX = null;
let cprnm_UnitType_DUNGEON_MAN = null,
cprnm_UnitType_DUST_DEVIL = null,
cprnm_UnitType_DWARVEN_ARCHER = null,
cprnm_UnitType_ELECTROYETI = null,
cprnm_UnitType_ETERNAL_ENCHANTER = null,
cprnm_UnitType_FAITH_HEALER = null,
cprnm_UnitType_FORGOTTEN_DRAGON = null,
cprnm_UnitType_FROST_GIANT = null,
cprnm_UnitType_GENIE = null,
cprnm_UnitType_GRAND_HUNTRESS = null,
cprnm_UnitType_GREED_DRAGON = null,
cprnm_UnitType_GROOVY_DRUID = null,
cprnm_UnitType_HYDRA = null,
cprnm_UnitType_KARAOKE_KING = null,
cprnm_UnitType_KRAKEN_KING = null,
cprnm_UnitType_LAST_DEFENDER = null,
cprnm_UnitType_MAGIC_DRAGON = null,
cprnm_UnitType_MEDUSA = null,
cprnm_UnitType_MINOTAUR = null,
cprnm_UnitType_MISTRESS_MANICURE = null,
cprnm_UnitType_MOON_DRAKE = null,
cprnm_UnitType_NINJA_DWARF = null,
cprnm_UnitType_NPC_ABYSS_DRAGON = null,
cprnm_UnitType_NPC_ANGELIC_AVENGER = null,
cprnm_UnitType_NPC_ANT = null,
cprnm_UnitType_NPC_ANUBIS_DRAGON = null,
cprnm_UnitType_NPC_BOSS_ABYSS_DRAGON = null,
cprnm_UnitType_NPC_BOSS_ANDRAGONUS_THE_FIRST = null,
cprnm_UnitType_NPC_BOSS_ANUBIS_DRAGON = null,
cprnm_UnitType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST = null,
cprnm_UnitType_NPC_BREAKER_MKII = null,
cprnm_UnitType_NPC_BUFF_SPRITE = null,
cprnm_UnitType_NPC_CAULDRON_MONSTER = null,
cprnm_UnitType_NPC_CLOUD_MONSTER = null,
cprnm_UnitType_NPC_CRYSTAL_GOLEM = null,
cprnm_UnitType_NPC_CRYSTAL_LIZARD = null,
cprnm_UnitType_NPC_EVIL_WIZARD = null,
cprnm_UnitType_NPC_EYEBALL = null,
cprnm_UnitType_NPC_FIRE_IMP = null,
cprnm_UnitType_NPC_FLEA_DEMON = null,
cprnm_UnitType_NPC_GENIE_CHICKEN = null,
cprnm_UnitType_NPC_GENIE_COW = null,
cprnm_UnitType_NPC_GENIE_GOAT = null,
cprnm_UnitType_NPC_GIANT_PLANT = null,
cprnm_UnitType_NPC_GIANT_PLANT_ROOT = null,
cprnm_UnitType_NPC_GOBLIN = null,
cprnm_UnitType_NPC_GOLD_COLOSSUS = null,
cprnm_UnitType_NPC_HEAD_CRAB = null,
cprnm_UnitType_NPC_HEALER_SPRITE = null,
cprnm_UnitType_NPC_ICE_GOLEM = null;
let cprnm_UnitType_NPC_INFERNO_SPIDER = null,
cprnm_UnitType_NPC_KAMIKAZE_GNOME = null,
cprnm_UnitType_NPC_KING_IMP = null,
cprnm_UnitType_NPC_LYING_LANTERN = null,
cprnm_UnitType_NPC_MR_SMASHY = null,
cprnm_UnitType_NPC_MUSHROOM = null,
cprnm_UnitType_NPC_MYSTIC_WILDLING = null,
cprnm_UnitType_NPC_PLAGUE_SKULKER = null,
cprnm_UnitType_NPC_POTTED_PLANT = null,
cprnm_UnitType_NPC_RED_TIGER = null,
cprnm_UnitType_NPC_SCARECROW = null,
cprnm_UnitType_NPC_SHARK = null,
cprnm_UnitType_NPC_SINISTER_ASSAILANT = null,
cprnm_UnitType_NPC_SKELETON_DEER = null,
cprnm_UnitType_NPC_SQUID = null,
cprnm_UnitType_NPC_SQUIRREL = null,
cprnm_UnitType_NPC_STONE_IMP = null,
cprnm_UnitType_NPC_TEST_DUMMY = null,
cprnm_UnitType_NPC_TROLL_BLOB = null,
cprnm_UnitType_NPC_UMLAUT_THE_FIFTH_FIRST = null,
cprnm_UnitType_NPC_WILDLING_ARCHER = null,
cprnm_UnitType_NPC_WILDLING_SNIPER = null,
cprnm_UnitType_ORC_MONK = null,
cprnm_UnitType_PCH_ANUBIS_DRAGON = null,
cprnm_UnitType_PIRATE = null,
cprnm_UnitType_PLAGUE_ENTREPRENEUR = null,
cprnm_UnitType_PLANT_SOUL = null,
cprnm_UnitType_POLEMASTER = null,
cprnm_UnitType_RABID_DRAGON = null,
cprnm_UnitType_RAGING_REVENANT = null,
cprnm_UnitType_ROLLER_WARRIOR = null,
cprnm_UnitType_SADISTIC_DANCER = null,
cprnm_UnitType_SATYR = null,
cprnm_UnitType_SAVAGE_CUTIE = null,
cprnm_UnitType_SHADOW_ASSASSIN = null,
cprnm_UnitType_SHADOW_OF_SVEN = null,
cprnm_UnitType_SILENT_SPIRIT = null,
cprnm_UnitType_SKELETON_KING = null,
cprnm_UnitType_SNAPPER_BONE = null,
cprnm_UnitType_SNAP_DRAGON = null,
cprnm_UnitType_SNIPER_WOLF = null,
cprnm_UnitType_SOJOURNER_SORCERESS = null,
cprnm_UnitType_SPECTRAL_DRAGON = null,
cprnm_UnitType_SPIDER_QUEEN = null,
cprnm_UnitType_SPIKEY_DRAGON = null,
cprnm_UnitType_STEPLADDER_BROTHERS = null,
cprnm_UnitType_STORM_DRAGON = null,
cprnm_UnitType_STOWAWAY = null,
cprnm_UnitType_SUN_SEEKER = null,
cprnm_UnitType_TITAN_BUFF = null;
let cprnm_UnitType_TOMB_ANGEL = null,
cprnm_UnitType_TRIPLE_THREAT = null,
cprnm_UnitType_UMLAUT_THE_FIRST = null,
cprnm_UnitType_UNICORGI = null,
cprnm_UnitType_UNRIPE_MYTHOLOGY = null,
cprnm_UnitType_UNSTABLE_UNDERSTUDY = null,
cprnm_UnitType_VERMILION_PRIESTESS = null,
cprnm_UnitType_VILE_BILE = null,
cprnm_UnitType_VOID_WYVERN = null,
cprnm_UnitType_VULTURE_DRAGON = null,
cprnm_UnitType_WEE_WITCH = null,
cprnm_UnitType_WEREDRAGON = null,
cprnm_UnitType_WHITE_TIGRESS = null,
cprnm_UnitType_ZOMBIE_SQUIRE = null,
cprnm_UnitType_values0 = null,
cprnm_UnitType_$callClinit = () => {
    cprnm_UnitType_$callClinit = $rt_eraseClinit(cprnm_UnitType);
    cprnm_UnitType__clinit_();
},
cprnm_UnitType__clinit_ = () => {
    let var$1, var$2;
    cprnm_UnitType_DEFAULT = cprnm_UnitType__init_($rt_s(12), 0);
    cprnm_UnitType_ELECTROYETI = cprnm_UnitType__init_($rt_s(232), 1);
    cprnm_UnitType_MEDUSA = cprnm_UnitType__init_($rt_s(233), 2);
    cprnm_UnitType_FAITH_HEALER = cprnm_UnitType__init_($rt_s(234), 3);
    cprnm_UnitType_DARK_DRACUL = cprnm_UnitType__init_($rt_s(235), 4);
    cprnm_UnitType_COSMIC_ELF = cprnm_UnitType__init_($rt_s(236), 5);
    cprnm_UnitType_ROLLER_WARRIOR = cprnm_UnitType__init_($rt_s(237), 6);
    cprnm_UnitType_DRAGON_LADY = cprnm_UnitType__init_($rt_s(238), 7);
    cprnm_UnitType_CENTAUR_OF_ATTENTION = cprnm_UnitType__init_($rt_s(239), 8);
    cprnm_UnitType_UNSTABLE_UNDERSTUDY = cprnm_UnitType__init_($rt_s(240), 9);
    cprnm_UnitType_MOON_DRAKE = cprnm_UnitType__init_($rt_s(241), 10);
    cprnm_UnitType_NPC_GOBLIN = cprnm_UnitType__init_($rt_s(242), 11);
    cprnm_UnitType_NPC_WILDLING_ARCHER = cprnm_UnitType__init_($rt_s(243), 12);
    cprnm_UnitType_NPC_CRYSTAL_GOLEM = cprnm_UnitType__init_($rt_s(244), 13);
    cprnm_UnitType_NPC_ICE_GOLEM = cprnm_UnitType__init_($rt_s(245), 14);
    cprnm_UnitType_NPC_FIRE_IMP = cprnm_UnitType__init_($rt_s(246), 15);
    cprnm_UnitType_NPC_STONE_IMP = cprnm_UnitType__init_($rt_s(247), 16);
    cprnm_UnitType_NPC_MYSTIC_WILDLING = cprnm_UnitType__init_($rt_s(248), 17);
    cprnm_UnitType_NPC_WILDLING_SNIPER = cprnm_UnitType__init_($rt_s(249), 18);
    cprnm_UnitType_POLEMASTER = cprnm_UnitType__init_($rt_s(250), 19);
    cprnm_UnitType_CATAPULT_KNIGHT = cprnm_UnitType__init_($rt_s(251), 20);
    cprnm_UnitType_BARDBARIAN = cprnm_UnitType__init_($rt_s(252), 21);
    cprnm_UnitType_SHADOW_ASSASSIN = cprnm_UnitType__init_($rt_s(253), 22);
    cprnm_UnitType_DUST_DEVIL = cprnm_UnitType__init_($rt_s(254), 23);
    cprnm_UnitType_SNAP_DRAGON = cprnm_UnitType__init_($rt_s(255), 24);
    cprnm_UnitType_HYDRA = cprnm_UnitType__init_($rt_s(256), 25);
    cprnm_UnitType_SAVAGE_CUTIE = cprnm_UnitType__init_($rt_s(257), 26);
    cprnm_UnitType_ZOMBIE_SQUIRE = cprnm_UnitType__init_($rt_s(258), 27);
    cprnm_UnitType_MAGIC_DRAGON = cprnm_UnitType__init_($rt_s(259), 28);
    cprnm_UnitType_AQUATIC_MAN = cprnm_UnitType__init_($rt_s(260), 29);
    cprnm_UnitType_CRIMSON_WITCH = cprnm_UnitType__init_($rt_s(261), 30);
    cprnm_UnitType_NINJA_DWARF = cprnm_UnitType__init_($rt_s(262), 31);
    cprnm_UnitType_BROZERKER = cprnm_UnitType__init_($rt_s(263), 32);
    cprnm_UnitType_GROOVY_DRUID = cprnm_UnitType__init_($rt_s(264), 33);
    cprnm_UnitType_BONE_DRAGON = cprnm_UnitType__init_($rt_s(265), 34);
    cprnm_UnitType_NPC_INFERNO_SPIDER = cprnm_UnitType__init_($rt_s(266), 35);
    cprnm_UnitType_NPC_HEALER_SPRITE = cprnm_UnitType__init_($rt_s(267), 36);
    cprnm_UnitType_NPC_BUFF_SPRITE = cprnm_UnitType__init_($rt_s(268), 37);
    cprnm_UnitType_NPC_TROLL_BLOB = cprnm_UnitType__init_($rt_s(269), 38);
    cprnm_UnitType_NPC_SCARECROW = cprnm_UnitType__init_($rt_s(270), 39);
    cprnm_UnitType_NPC_POTTED_PLANT = cprnm_UnitType__init_($rt_s(271), 40);
    cprnm_UnitType_SPIKEY_DRAGON = cprnm_UnitType__init_($rt_s(272), 41);
    cprnm_UnitType_FROST_GIANT = cprnm_UnitType__init_($rt_s(273), 42);
    cprnm_UnitType_MINOTAUR = cprnm_UnitType__init_($rt_s(274), 43);
    cprnm_UnitType_DARK_HORSE = cprnm_UnitType__init_($rt_s(275), 44);
    cprnm_UnitType_DRUIDINATRIX = cprnm_UnitType__init_($rt_s(276), 45);
    cprnm_UnitType_NPC_KAMIKAZE_GNOME = cprnm_UnitType__init_($rt_s(277), 46);
    cprnm_UnitType_NPC_MR_SMASHY = cprnm_UnitType__init_($rt_s(278), 47);
    cprnm_UnitType_TITAN_BUFF = cprnm_UnitType__init_($rt_s(279), 48);
    cprnm_UnitType_NPC_EVIL_WIZARD = cprnm_UnitType__init_($rt_s(280), 49);
    cprnm_UnitType_NPC_GIANT_PLANT = cprnm_UnitType__init_($rt_s(281), 50);
    cprnm_UnitType_NPC_GOLD_COLOSSUS = cprnm_UnitType__init_($rt_s(282), 51);
    cprnm_UnitType_ORC_MONK = cprnm_UnitType__init_($rt_s(283), 52);
    cprnm_UnitType_DWARVEN_ARCHER = cprnm_UnitType__init_($rt_s(284), 53);
    cprnm_UnitType_RABID_DRAGON = cprnm_UnitType__init_($rt_s(285), 54);
    cprnm_UnitType_NPC_CAULDRON_MONSTER = cprnm_UnitType__init_($rt_s(286), 55);
    cprnm_UnitType_NPC_SQUID = cprnm_UnitType__init_($rt_s(287), 56);
    cprnm_UnitType_NPC_GIANT_PLANT_ROOT = cprnm_UnitType__init_($rt_s(288), 57);
    cprnm_UnitType_SKELETON_KING = cprnm_UnitType__init_($rt_s(289), 58);
    cprnm_UnitType_SATYR = cprnm_UnitType__init_($rt_s(290), 59);
    cprnm_UnitType_STORM_DRAGON = cprnm_UnitType__init_($rt_s(291), 60);
    cprnm_UnitType_NPC_SKELETON_DEER = cprnm_UnitType__init_($rt_s(292), 61);
    cprnm_UnitType_NPC_MUSHROOM = cprnm_UnitType__init_($rt_s(293), 62);
    cprnm_UnitType_UNICORGI = cprnm_UnitType__init_($rt_s(294), 63);
    cprnm_UnitType_SNIPER_WOLF = cprnm_UnitType__init_($rt_s(295), 64);
    cprnm_UnitType_GENIE = cprnm_UnitType__init_($rt_s(296), 65);
    cprnm_UnitType_NPC_HEAD_CRAB = cprnm_UnitType__init_($rt_s(297), 66);
    cprnm_UnitType_NPC_CLOUD_MONSTER = cprnm_UnitType__init_($rt_s(298), 67);
    cprnm_UnitType_DRAGZILLA = cprnm_UnitType__init_($rt_s(299), 68);
    cprnm_UnitType_PIRATE = cprnm_UnitType__init_($rt_s(300), 69);
    cprnm_UnitType_CYCLOPS_WIZARD = cprnm_UnitType__init_($rt_s(301), 70);
    cprnm_UnitType_DEMON_TOTEM = cprnm_UnitType__init_($rt_s(302), 71);
    cprnm_UnitType_NPC_EYEBALL = cprnm_UnitType__init_($rt_s(303), 72);
    cprnm_UnitType_NPC_TEST_DUMMY = cprnm_UnitType__init_($rt_s(304), 73);
    cprnm_UnitType_DEEP_DRAGON = cprnm_UnitType__init_($rt_s(305), 74);
    cprnm_UnitType_DOPPELGANGER = cprnm_UnitType__init_($rt_s(306), 75);
    cprnm_UnitType_KRAKEN_KING = cprnm_UnitType__init_($rt_s(307), 76);
    cprnm_UnitType_STOWAWAY = cprnm_UnitType__init_($rt_s(308), 77);
    cprnm_UnitType_NPC_SHARK = cprnm_UnitType__init_($rt_s(309), 78);
    cprnm_UnitType_NPC_SQUIRREL = cprnm_UnitType__init_($rt_s(310), 79);
    cprnm_UnitType_CURSED_STATUE = cprnm_UnitType__init_($rt_s(311), 80);
    cprnm_UnitType_PLANT_SOUL = cprnm_UnitType__init_($rt_s(312), 81);
    cprnm_UnitType_SPIDER_QUEEN = cprnm_UnitType__init_($rt_s(313), 82);
    cprnm_UnitType_VULTURE_DRAGON = cprnm_UnitType__init_($rt_s(314), 83);
    cprnm_UnitType_NPC_ANT = cprnm_UnitType__init_($rt_s(315), 84);
    cprnm_UnitType_BANSHEE = cprnm_UnitType__init_($rt_s(316), 85);
    cprnm_UnitType_RAGING_REVENANT = cprnm_UnitType__init_($rt_s(317), 86);
    cprnm_UnitType_SILENT_SPIRIT = cprnm_UnitType__init_($rt_s(318), 87);
    cprnm_UnitType_SPECTRAL_DRAGON = cprnm_UnitType__init_($rt_s(319), 88);
    cprnm_UnitType_NPC_LYING_LANTERN = cprnm_UnitType__init_($rt_s(320), 89);
    cprnm_UnitType_WEREDRAGON = cprnm_UnitType__init_($rt_s(321), 90);
    cprnm_UnitType_WEE_WITCH = cprnm_UnitType__init_($rt_s(322), 91);
    cprnm_UnitType_DUNGEON_MAN = cprnm_UnitType__init_($rt_s(323), 92);
    cprnm_UnitType_NPC_PLAGUE_SKULKER = cprnm_UnitType__init_($rt_s(324), 93);
    cprnm_UnitType_PLAGUE_ENTREPRENEUR = cprnm_UnitType__init_($rt_s(325), 94);
    cprnm_UnitType_MISTRESS_MANICURE = cprnm_UnitType__init_($rt_s(326), 95);
    cprnm_UnitType_VILE_BILE = cprnm_UnitType__init_($rt_s(327), 96);
    cprnm_UnitType_NPC_FLEA_DEMON = cprnm_UnitType__init_($rt_s(328), 97);
    cprnm_UnitType_VOID_WYVERN = cprnm_UnitType__init_($rt_s(329), 98);
    cprnm_UnitType_BURNT_ONE = cprnm_UnitType__init_($rt_s(330), 99);
    cprnm_UnitType_NPC_ANGELIC_AVENGER = cprnm_UnitType__init_($rt_s(331), 100);
    cprnm_UnitType_NPC_GENIE_COW = cprnm_UnitType__init_($rt_s(332), 101);
    cprnm_UnitType_NPC_GENIE_GOAT = cprnm_UnitType__init_($rt_s(333), 102);
    cprnm_UnitType_NPC_GENIE_CHICKEN = cprnm_UnitType__init_($rt_s(334), 103);
    cprnm_UnitType_TOMB_ANGEL = cprnm_UnitType__init_($rt_s(335), 104);
    cprnm_UnitType_ANGELIC_HERALD = cprnm_UnitType__init_($rt_s(336), 105);
    cprnm_UnitType_BULWARK_ANGEL = cprnm_UnitType__init_($rt_s(337), 106);
    cprnm_UnitType_ANGEL_DRAGON = cprnm_UnitType__init_($rt_s(338), 107);
    cprnm_UnitType_DRAGON_SLAYER = cprnm_UnitType__init_($rt_s(339), 108);
    cprnm_UnitType_ETERNAL_ENCHANTER = cprnm_UnitType__init_($rt_s(340), 109);
    cprnm_UnitType_GRAND_HUNTRESS = cprnm_UnitType__init_($rt_s(341), 110);
    cprnm_UnitType_TRIPLE_THREAT = cprnm_UnitType__init_($rt_s(342), 111);
    cprnm_UnitType_LAST_DEFENDER = cprnm_UnitType__init_($rt_s(343), 112);
    cprnm_UnitType_SOJOURNER_SORCERESS = cprnm_UnitType__init_($rt_s(344), 113);
    cprnm_UnitType_KARAOKE_KING = cprnm_UnitType__init_($rt_s(345), 114);
    cprnm_UnitType_SHADOW_OF_SVEN = cprnm_UnitType__init_($rt_s(346), 115);
    cprnm_UnitType_SUN_SEEKER = cprnm_UnitType__init_($rt_s(347), 116);
    cprnm_UnitType_STEPLADDER_BROTHERS = cprnm_UnitType__init_($rt_s(348), 117);
    cprnm_UnitType_FORGOTTEN_DRAGON = cprnm_UnitType__init_($rt_s(349), 118);
    cprnm_UnitType_NPC_CRYSTAL_LIZARD = cprnm_UnitType__init_($rt_s(350), 119);
    cprnm_UnitType_BLACK_WING = cprnm_UnitType__init_($rt_s(351), 120);
    cprnm_UnitType_GREED_DRAGON = cprnm_UnitType__init_($rt_s(352), 121);
    cprnm_UnitType_UNRIPE_MYTHOLOGY = cprnm_UnitType__init_($rt_s(353), 122);
    cprnm_UnitType_NPC_BREAKER_MKII = cprnm_UnitType__init_($rt_s(354), 123);
    cprnm_UnitType_ANCIENT_DWARF = cprnm_UnitType__init_($rt_s(355), 124);
    cprnm_UnitType_DIGGER_MOLE = cprnm_UnitType__init_($rt_s(356), 125);
    cprnm_UnitType_SADISTIC_DANCER = cprnm_UnitType__init_($rt_s(357), 126);
    cprnm_UnitType_NPC_ANUBIS_DRAGON = cprnm_UnitType__init_($rt_s(358), 127);
    cprnm_UnitType_NPC_KING_IMP = cprnm_UnitType__init_($rt_s(359), 128);
    cprnm_UnitType_WHITE_TIGRESS = cprnm_UnitType__init_($rt_s(360), 129);
    cprnm_UnitType_SNAPPER_BONE = cprnm_UnitType__init_($rt_s(361), 130);
    cprnm_UnitType_VERMILION_PRIESTESS = cprnm_UnitType__init_($rt_s(362), 131);
    cprnm_UnitType_NPC_ABYSS_DRAGON = cprnm_UnitType__init_($rt_s(363), 132);
    cprnm_UnitType_NPC_BOSS_ANUBIS_DRAGON = cprnm_UnitType__init_($rt_s(364), 133);
    cprnm_UnitType_PCH_ANUBIS_DRAGON = cprnm_UnitType__init_($rt_s(365), 134);
    cprnm_UnitType_ABYSS_DRAGON = cprnm_UnitType__init_($rt_s(366), 135);
    cprnm_UnitType_UMLAUT_THE_FIRST = cprnm_UnitType__init_($rt_s(367), 136);
    cprnm_UnitType_NPC_UMLAUT_THE_FIFTH_FIRST = cprnm_UnitType__init_($rt_s(368), 137);
    cprnm_UnitType_NPC_BOSS_ABYSS_DRAGON = cprnm_UnitType__init_($rt_s(369), 138);
    cprnm_UnitType_NPC_BOSS_ANDRAGONUS_THE_FIRST = cprnm_UnitType__init_($rt_s(370), 139);
    cprnm_UnitType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST = cprnm_UnitType__init_($rt_s(371), 140);
    cprnm_UnitType_NPC_SINISTER_ASSAILANT = cprnm_UnitType__init_($rt_s(372), 141);
    cprnm_UnitType_NPC_RED_TIGER = cprnm_UnitType__init_($rt_s(373), 142);
    cprnm_UnitType_DARK_HERO = cprnm_UnitType__init_($rt_s(374), 143);
    cprnm_UnitType_CLAW_MAN = cprnm_UnitType__init_($rt_s(375), 144);
    var$1 = $rt_createArray(cprnm_UnitType, 145);
    var$2 = var$1.data;
    var$2[0] = cprnm_UnitType_DEFAULT;
    var$2[1] = cprnm_UnitType_ELECTROYETI;
    var$2[2] = cprnm_UnitType_MEDUSA;
    var$2[3] = cprnm_UnitType_FAITH_HEALER;
    var$2[4] = cprnm_UnitType_DARK_DRACUL;
    var$2[5] = cprnm_UnitType_COSMIC_ELF;
    var$2[6] = cprnm_UnitType_ROLLER_WARRIOR;
    var$2[7] = cprnm_UnitType_DRAGON_LADY;
    var$2[8] = cprnm_UnitType_CENTAUR_OF_ATTENTION;
    var$2[9] = cprnm_UnitType_UNSTABLE_UNDERSTUDY;
    var$2[10] = cprnm_UnitType_MOON_DRAKE;
    var$2[11] = cprnm_UnitType_NPC_GOBLIN;
    var$2[12] = cprnm_UnitType_NPC_WILDLING_ARCHER;
    var$2[13] = cprnm_UnitType_NPC_CRYSTAL_GOLEM;
    var$2[14] = cprnm_UnitType_NPC_ICE_GOLEM;
    var$2[15] = cprnm_UnitType_NPC_FIRE_IMP;
    var$2[16] = cprnm_UnitType_NPC_STONE_IMP;
    var$2[17] = cprnm_UnitType_NPC_MYSTIC_WILDLING;
    var$2[18] = cprnm_UnitType_NPC_WILDLING_SNIPER;
    var$2[19] = cprnm_UnitType_POLEMASTER;
    var$2[20] = cprnm_UnitType_CATAPULT_KNIGHT;
    var$2[21] = cprnm_UnitType_BARDBARIAN;
    var$2[22] = cprnm_UnitType_SHADOW_ASSASSIN;
    var$2[23] = cprnm_UnitType_DUST_DEVIL;
    var$2[24] = cprnm_UnitType_SNAP_DRAGON;
    var$2[25] = cprnm_UnitType_HYDRA;
    var$2[26] = cprnm_UnitType_SAVAGE_CUTIE;
    var$2[27] = cprnm_UnitType_ZOMBIE_SQUIRE;
    var$2[28] = cprnm_UnitType_MAGIC_DRAGON;
    var$2[29] = cprnm_UnitType_AQUATIC_MAN;
    var$2[30] = cprnm_UnitType_CRIMSON_WITCH;
    var$2[31] = cprnm_UnitType_NINJA_DWARF;
    var$2[32] = cprnm_UnitType_BROZERKER;
    var$2[33] = cprnm_UnitType_GROOVY_DRUID;
    var$2[34] = cprnm_UnitType_BONE_DRAGON;
    var$2[35] = cprnm_UnitType_NPC_INFERNO_SPIDER;
    var$2[36] = cprnm_UnitType_NPC_HEALER_SPRITE;
    var$2[37] = cprnm_UnitType_NPC_BUFF_SPRITE;
    var$2[38] = cprnm_UnitType_NPC_TROLL_BLOB;
    var$2[39] = cprnm_UnitType_NPC_SCARECROW;
    var$2[40] = cprnm_UnitType_NPC_POTTED_PLANT;
    var$2[41] = cprnm_UnitType_SPIKEY_DRAGON;
    var$2[42] = cprnm_UnitType_FROST_GIANT;
    var$2[43] = cprnm_UnitType_MINOTAUR;
    var$2[44] = cprnm_UnitType_DARK_HORSE;
    var$2[45] = cprnm_UnitType_DRUIDINATRIX;
    var$2[46] = cprnm_UnitType_NPC_KAMIKAZE_GNOME;
    var$2[47] = cprnm_UnitType_NPC_MR_SMASHY;
    var$2[48] = cprnm_UnitType_TITAN_BUFF;
    var$2[49] = cprnm_UnitType_NPC_EVIL_WIZARD;
    var$2[50] = cprnm_UnitType_NPC_GIANT_PLANT;
    var$2[51] = cprnm_UnitType_NPC_GOLD_COLOSSUS;
    var$2[52] = cprnm_UnitType_ORC_MONK;
    var$2[53] = cprnm_UnitType_DWARVEN_ARCHER;
    var$2[54] = cprnm_UnitType_RABID_DRAGON;
    var$2[55] = cprnm_UnitType_NPC_CAULDRON_MONSTER;
    var$2[56] = cprnm_UnitType_NPC_SQUID;
    var$2[57] = cprnm_UnitType_NPC_GIANT_PLANT_ROOT;
    var$2[58] = cprnm_UnitType_SKELETON_KING;
    var$2[59] = cprnm_UnitType_SATYR;
    var$2[60] = cprnm_UnitType_STORM_DRAGON;
    var$2[61] = cprnm_UnitType_NPC_SKELETON_DEER;
    var$2[62] = cprnm_UnitType_NPC_MUSHROOM;
    var$2[63] = cprnm_UnitType_UNICORGI;
    var$2[64] = cprnm_UnitType_SNIPER_WOLF;
    var$2[65] = cprnm_UnitType_GENIE;
    var$2[66] = cprnm_UnitType_NPC_HEAD_CRAB;
    var$2[67] = cprnm_UnitType_NPC_CLOUD_MONSTER;
    var$2[68] = cprnm_UnitType_DRAGZILLA;
    var$2[69] = cprnm_UnitType_PIRATE;
    var$2[70] = cprnm_UnitType_CYCLOPS_WIZARD;
    var$2[71] = cprnm_UnitType_DEMON_TOTEM;
    var$2[72] = cprnm_UnitType_NPC_EYEBALL;
    var$2[73] = cprnm_UnitType_NPC_TEST_DUMMY;
    var$2[74] = cprnm_UnitType_DEEP_DRAGON;
    var$2[75] = cprnm_UnitType_DOPPELGANGER;
    var$2[76] = cprnm_UnitType_KRAKEN_KING;
    var$2[77] = cprnm_UnitType_STOWAWAY;
    var$2[78] = cprnm_UnitType_NPC_SHARK;
    var$2[79] = cprnm_UnitType_NPC_SQUIRREL;
    var$2[80] = cprnm_UnitType_CURSED_STATUE;
    var$2[81] = cprnm_UnitType_PLANT_SOUL;
    var$2[82] = cprnm_UnitType_SPIDER_QUEEN;
    var$2[83] = cprnm_UnitType_VULTURE_DRAGON;
    var$2[84] = cprnm_UnitType_NPC_ANT;
    var$2[85] = cprnm_UnitType_BANSHEE;
    var$2[86] = cprnm_UnitType_RAGING_REVENANT;
    var$2[87] = cprnm_UnitType_SILENT_SPIRIT;
    var$2[88] = cprnm_UnitType_SPECTRAL_DRAGON;
    var$2[89] = cprnm_UnitType_NPC_LYING_LANTERN;
    var$2[90] = cprnm_UnitType_WEREDRAGON;
    var$2[91] = cprnm_UnitType_WEE_WITCH;
    var$2[92] = cprnm_UnitType_DUNGEON_MAN;
    var$2[93] = cprnm_UnitType_NPC_PLAGUE_SKULKER;
    var$2[94] = cprnm_UnitType_PLAGUE_ENTREPRENEUR;
    var$2[95] = cprnm_UnitType_MISTRESS_MANICURE;
    var$2[96] = cprnm_UnitType_VILE_BILE;
    var$2[97] = cprnm_UnitType_NPC_FLEA_DEMON;
    var$2[98] = cprnm_UnitType_VOID_WYVERN;
    var$2[99] = cprnm_UnitType_BURNT_ONE;
    var$2[100] = cprnm_UnitType_NPC_ANGELIC_AVENGER;
    var$2[101] = cprnm_UnitType_NPC_GENIE_COW;
    var$2[102] = cprnm_UnitType_NPC_GENIE_GOAT;
    var$2[103] = cprnm_UnitType_NPC_GENIE_CHICKEN;
    var$2[104] = cprnm_UnitType_TOMB_ANGEL;
    var$2[105] = cprnm_UnitType_ANGELIC_HERALD;
    var$2[106] = cprnm_UnitType_BULWARK_ANGEL;
    var$2[107] = cprnm_UnitType_ANGEL_DRAGON;
    var$2[108] = cprnm_UnitType_DRAGON_SLAYER;
    var$2[109] = cprnm_UnitType_ETERNAL_ENCHANTER;
    var$2[110] = cprnm_UnitType_GRAND_HUNTRESS;
    var$2[111] = cprnm_UnitType_TRIPLE_THREAT;
    var$2[112] = cprnm_UnitType_LAST_DEFENDER;
    var$2[113] = cprnm_UnitType_SOJOURNER_SORCERESS;
    var$2[114] = cprnm_UnitType_KARAOKE_KING;
    var$2[115] = cprnm_UnitType_SHADOW_OF_SVEN;
    var$2[116] = cprnm_UnitType_SUN_SEEKER;
    var$2[117] = cprnm_UnitType_STEPLADDER_BROTHERS;
    var$2[118] = cprnm_UnitType_FORGOTTEN_DRAGON;
    var$2[119] = cprnm_UnitType_NPC_CRYSTAL_LIZARD;
    var$2[120] = cprnm_UnitType_BLACK_WING;
    var$2[121] = cprnm_UnitType_GREED_DRAGON;
    var$2[122] = cprnm_UnitType_UNRIPE_MYTHOLOGY;
    var$2[123] = cprnm_UnitType_NPC_BREAKER_MKII;
    var$2[124] = cprnm_UnitType_ANCIENT_DWARF;
    var$2[125] = cprnm_UnitType_DIGGER_MOLE;
    var$2[126] = cprnm_UnitType_SADISTIC_DANCER;
    var$2[127] = cprnm_UnitType_NPC_ANUBIS_DRAGON;
    var$2[128] = cprnm_UnitType_NPC_KING_IMP;
    var$2[129] = cprnm_UnitType_WHITE_TIGRESS;
    var$2[130] = cprnm_UnitType_SNAPPER_BONE;
    var$2[131] = cprnm_UnitType_VERMILION_PRIESTESS;
    var$2[132] = cprnm_UnitType_NPC_ABYSS_DRAGON;
    var$2[133] = cprnm_UnitType_NPC_BOSS_ANUBIS_DRAGON;
    var$2[134] = cprnm_UnitType_PCH_ANUBIS_DRAGON;
    var$2[135] = cprnm_UnitType_ABYSS_DRAGON;
    var$2[136] = cprnm_UnitType_UMLAUT_THE_FIRST;
    var$2[137] = cprnm_UnitType_NPC_UMLAUT_THE_FIFTH_FIRST;
    var$2[138] = cprnm_UnitType_NPC_BOSS_ABYSS_DRAGON;
    var$2[139] = cprnm_UnitType_NPC_BOSS_ANDRAGONUS_THE_FIRST;
    var$2[140] = cprnm_UnitType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST;
    var$2[141] = cprnm_UnitType_NPC_SINISTER_ASSAILANT;
    var$2[142] = cprnm_UnitType_NPC_RED_TIGER;
    var$2[143] = cprnm_UnitType_DARK_HERO;
    var$2[144] = cprnm_UnitType_CLAW_MAN;
    cprnm_UnitType_$VALUES = var$1;
    cprnm_UnitType_values0 = cprnm_UnitType_values();
},
cprnm_UnitType__init_0 = (var$0, var$1, var$2) => {
    cprnm_UnitType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_UnitType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_UnitType();
    cprnm_UnitType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_UnitType_values = () => {
    cprnm_UnitType_$callClinit();
    return cprnm_UnitType_$VALUES.$clone0();
},
ju_SequencedCollection = $rt_classWithoutFields(0);
function cprgds_SocialDataManager() {
    let a = this; jl_Object.call(a);
    a.$blockedUsers0 = null;
    a.$chatLists = null;
    a.$dataListeners = null;
    a.$friends = null;
    a.$globalChat = null;
    a.$guildWallChat = null;
    a.$heroChat = null;
    a.$kingdomChat = null;
    a.$lastChatPreviewTime = Long_ZERO;
    a.$mostRecentChatTime = Long_ZERO;
    a.$playerNameCache = null;
    a.$pmRooms = null;
    a.$vipChat = null;
}
let cprgds_SocialDataManager_MAX_HISTORY = null,
cprgds_SocialDataManager_$callClinit = () => {
    cprgds_SocialDataManager_$callClinit = $rt_eraseClinit(cprgds_SocialDataManager);
    cprgds_SocialDataManager__clinit_();
},
cprgds_SocialDataManager__clinit_ = () => {
    let var$1;
    var$1 = ju_HashMap__init_0();
    cprgds_SocialDataManager_MAX_HISTORY = var$1;
    cprnm_ChatRoomType_$callClinit();
    var$1.$put(cprnm_ChatRoomType_GLOBAL, jl_Integer_valueOf(50));
    cprgds_SocialDataManager_MAX_HISTORY.$put(cprnm_ChatRoomType_GUILD, jl_Integer_valueOf(100));
    cprgds_SocialDataManager_MAX_HISTORY.$put(cprnm_ChatRoomType_GUILD_WALL, jl_Integer_valueOf(50));
    cprgds_SocialDataManager_MAX_HISTORY.$put(cprnm_ChatRoomType_HERO_WALL, jl_Integer_valueOf(100));
    cprgds_SocialDataManager_MAX_HISTORY.$put(cprnm_ChatRoomType_VIP, jl_Integer_valueOf(50));
    cprgds_SocialDataManager_MAX_HISTORY.$put(cprnm_ChatRoomType_PERSONAL_MESSAGE, jl_Integer_valueOf(50));
},
cprgds_SocialDataManager__init_ = var$0 => {
    cprgds_SocialDataManager_$callClinit();
    jl_Object__init_(var$0);
    var$0.$dataListeners = ju_HashSet__init_1();
    var$0.$lastChatPreviewTime = Long_ZERO;
    var$0.$mostRecentChatTime = Long_ZERO;
    var$0.$globalChat = ju_LinkedList__init_();
    var$0.$kingdomChat = ju_LinkedList__init_();
    var$0.$guildWallChat = ju_LinkedList__init_();
    var$0.$heroChat = ju_LinkedList__init_();
    var$0.$vipChat = ju_LinkedList__init_();
    var$0.$blockedUsers0 = ju_HashSet__init_1();
    var$0.$pmRooms = ju_HashMap__init_0();
    var$0.$friends = ju_HashMap__init_0();
    var$0.$playerNameCache = ju_HashMap__init_0();
    var$0.$chatLists = ju_LinkedList__init_();
    var$0.$chatLists.$add(var$0.$globalChat);
    var$0.$chatLists.$add(var$0.$kingdomChat);
    var$0.$chatLists.$add(var$0.$guildWallChat);
    var$0.$chatLists.$add(var$0.$heroChat);
    var$0.$chatLists.$add(var$0.$vipChat);
},
cprgds_SocialDataManager__init_0 = () => {
    let var_0 = new cprgds_SocialDataManager();
    cprgds_SocialDataManager__init_(var_0);
    return var_0;
},
cbgssu_o = $rt_classWithoutFields(cbgss_e),
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out0 = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out0 = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush, $charset) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset = $charset;
},
ji_PrintStream__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ji_PrintStream();
    ji_PrintStream__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, null, 0, null);
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(376));
},
otcic_JSStdoutPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStdoutPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStdoutPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStdoutPrintStream();
    otcic_JSStdoutPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStdoutPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(93);
    $rt_putStdout($rt_ustr($s));
};
function juca_AtomicBoolean() {
    jl_Object.call(this);
    this.$value0 = 0;
}
let juca_AtomicBoolean__init_ = ($this, $initialValue) => {
    jl_Object__init_($this);
    $this.$value0 = $initialValue;
},
juca_AtomicBoolean__init_0 = var_0 => {
    let var_1 = new juca_AtomicBoolean();
    juca_AtomicBoolean__init_(var_1, var_0);
    return var_1;
},
otji_JSWrapper = $rt_classWithoutFields();
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
let ju_HashSet__init_0 = $this => {
    ju_HashSet__init_($this, ju_HashMap__init_0());
},
ju_HashSet__init_1 = () => {
    let var_0 = new ju_HashSet();
    ju_HashSet__init_0(var_0);
    return var_0;
},
ju_HashSet__init_ = ($this, $backingMap) => {
    ju_AbstractSet__init_($this);
    $this.$backingMap = $backingMap;
},
ju_HashSet__init_2 = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_(var_1, var_0);
    return var_1;
},
cprgo_Projectile = $rt_classWithoutFields(cprgo_Entity),
cprt_CombatManaBarAccessor = $rt_classWithoutFields(),
cprt_CombatManaBarAccessor_$assertionsDisabled = 0,
cprt_CombatManaBarAccessor_$callClinit = () => {
    cprt_CombatManaBarAccessor_$callClinit = $rt_eraseClinit(cprt_CombatManaBarAccessor);
    cprt_CombatManaBarAccessor__clinit_();
},
cprt_CombatManaBarAccessor__clinit_ = () => {
    cprt_CombatManaBarAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_CombatManaBarAccessor)) ? 0 : 1;
},
cprt_CombatManaBarAccessor__init_ = var$0 => {
    cprt_CombatManaBarAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_CombatManaBarAccessor__init_0 = () => {
    let var_0 = new cprt_CombatManaBarAccessor();
    cprt_CombatManaBarAccessor__init_(var_0);
    return var_0;
},
cbgm_h = $rt_classWithoutFields(),
cbgm_h_a = null,
cbgm_h_$callClinit = () => {
    cbgm_h_$callClinit = $rt_eraseClinit(cbgm_h);
    cbgm_h__clinit_();
},
cbgm_h__clinit_ = () => {
    cbgm_h_a = cbgm_m__init_0();
},
cbgm_h_a0 = var$1 => {
    cbgm_h_$callClinit();
    return cbgm_h_a.$nextInt0(var$1 + 1 | 0);
},
cbgm_h_b = var$1 => {
    let var$2;
    cbgm_h_$callClinit();
    if (!var$1)
        return 1;
    var$2 = var$1 - 1 | 0;
    var$1 = var$2 | var$2 >> 1;
    var$1 = var$1 | var$1 >> 2;
    var$1 = var$1 | var$1 >> 4;
    var$1 = var$1 | var$1 >> 8;
    return (var$1 | var$1 >> 16) + 1 | 0;
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_getEnumConstants = var$1 => {
    let c = '$$enumConstants$$';
    cprnm_AppReviewStatus[c] = cprnm_AppReviewStatus_values;
    cprnm_GuildNewMemberPolicy[c] = cprnm_GuildNewMemberPolicy_values;
    cprnm_TutorialActType[c] = cprnm_TutorialActType_values;
    cprnm_GuildEmblemType[c] = cprnm_GuildEmblemType_values;
    cprnm_UseItemEventType[c] = cprnm_UseItemEventType_values;
    cprnm_GameMode[c] = cprnm_GameMode_values;
    cpr_BuildType[c] = cpr_BuildType_values;
    cprnm_ArenaTier[c] = cprnm_ArenaTier_values;
    cprnm_ResourceType[c] = cprnm_ResourceType_values;
    cprnm_PPEEvent[c] = cprnm_PPEEvent_values;
    cprnm_UnitType[c] = cprnm_UnitType_values;
    cprnm_ItemType[c] = cprnm_ItemType_values;
    cprnm_HowToPlayDeckType[c] = cprnm_HowToPlayDeckType_values;
    cprnm_CooldownType[c] = cprnm_CooldownType_values;
    cprnm_HeroLineupType[c] = cprnm_HeroLineupType_values;
    cprnm_TimeType[c] = cprnm_TimeType_values;
    cprnm_MerchantType[c] = cprnm_MerchantType_values;
    cprnm_RandomSeedType[c] = cprnm_RandomSeedType_values;
    cprnm_GuildRole[c] = cprnm_GuildRole_values;
    cprgo_UserFlag[c] = cprgo_UserFlag_values;
    cpaa_l[c] = cpaa_l_values;
    cprnm_ChatRoomType[c] = cprnm_ChatRoomType_values;
    cpr_ServerType[c] = cpr_ServerType_values;
    juc_TimeUnit[c] = juc_TimeUnit_values;
    cpr_ToolType[c] = cpr_ToolType_values;
    otp_Platform_getEnumConstants = cls => {
        if (!cls.hasOwnProperty(c)) {
            return null;
        }
        if (typeof cls[c] === "function") {
            cls[c] = cls[c]();
        }
        return cls[c];
    };
    return otp_Platform_getEnumConstants(var$1);
},
otp_Platform_isPrimitive = var$1 => {
    return var$1.$meta.primitive ? 1 : 0;
},
otp_Platform_getName = $cls => {
    return $rt_str($cls.$meta.name);
},
jnc_Charset = $rt_classWithoutFields(),
cbgssu_i = $rt_classWithoutFields(cbgssu_o);
function jl_Boolean() {
    jl_Object.call(this);
    this.$value2 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean_$callClinit = () => {
    jl_Boolean_$callClinit = $rt_eraseClinit(jl_Boolean);
    jl_Boolean__clinit_();
},
jl_Boolean__init_0 = ($this, $value) => {
    jl_Boolean_$callClinit();
    jl_Object__init_($this);
    $this.$value2 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean_valueOf = $value => {
    jl_Boolean_$callClinit();
    return !$value ? jl_Boolean_FALSE : jl_Boolean_TRUE;
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
cbgssu_g = $rt_classWithoutFields(cbgssu_o),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractList_add = ($this, $e) => {
    $this.$add0($this.$size(), $e);
    return 1;
},
ju_AbstractSequentialList = $rt_classWithoutFields(ju_AbstractList),
ju_AbstractSequentialList__init_ = $this => {
    ju_AbstractList__init_($this);
},
ju_AbstractSequentialList_add = ($this, $index, $element) => {
    let $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    $iter.$add1($element);
},
ju_Deque = $rt_classWithoutFields(0);
function ju_LinkedList() {
    let a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size0 = 0;
}
let ju_LinkedList__init_0 = $this => {
    ju_AbstractSequentialList__init_($this);
},
ju_LinkedList__init_ = () => {
    let var_0 = new ju_LinkedList();
    ju_LinkedList__init_0(var_0);
    return var_0;
},
ju_LinkedList_size = $this => {
    return $this.$size0;
},
ju_LinkedList_clear = $this => {
    $this.$firstEntry = null;
    $this.$lastEntry = null;
    $this.$size0 = 0;
    $this.$modCount = $this.$modCount + 1 | 0;
},
ju_LinkedList_listIterator = ($this, $index) => {
    let $next, $i, $prev;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($index <= ($this.$size0 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next0;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
    }
    if ($index > $this.$size0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < $this.$size0) {
        $prev = $prev.$previous;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next0, $prev, $index);
},
cbgssu_j = $rt_classWithoutFields(cbgssu_o),
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStderrPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStderrPrintStream();
    otcic_JSStderrPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStderrPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(93);
    $rt_putStderr($rt_ustr($s));
},
otcit_FloatAnalyzer = $rt_classWithoutFields(),
otcit_FloatAnalyzer_MAX_MANTISSA = 0,
otcit_FloatAnalyzer_mantissa10Table = null,
otcit_FloatAnalyzer_exp10Table = null,
otcit_FloatAnalyzer_$callClinit = () => {
    otcit_FloatAnalyzer_$callClinit = $rt_eraseClinit(otcit_FloatAnalyzer);
    otcit_FloatAnalyzer__clinit_();
},
otcit_FloatAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $decExponent, var$8, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_FloatAnalyzer_$callClinit();
    $bits = jl_Float_floatToIntBits($d);
    $result.$sign = !($bits & (-2147483648)) ? 0 : 1;
    $mantissa = $bits & 8388607;
    $exponent = $bits >> 23 & 255;
    if (!$mantissa && !$exponent) {
        $result.$mantissa = 0;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        var$6 = $mantissa | 8388608;
    else {
        var$6 = $mantissa << 1;
        while (Long_eq(Long_and(Long_fromInt(var$6), Long_fromInt(8388608)), Long_ZERO)) {
            var$6 = var$6 << 1;
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_FloatAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$8 = otcit_FloatAnalyzer_exp10Table.data;
    var$9 = $decExponent + 1 | 0;
    $binExponentCorrection = $exponent - var$8[var$9] | 0;
    $mantissaShift = 9 + $binExponentCorrection | 0;
    $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$6, otcit_FloatAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    if ($decMantissa < otcit_FloatAnalyzer_MAX_MANTISSA) {
        while ($rt_ucmp($decMantissa, otcit_FloatAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = ($decMantissa * 10 | 0) + 9 | 0;
        }
        var$8 = otcit_FloatAnalyzer_exp10Table.data;
        var$9 = $decExponent + 1 | 0;
        var$13 = $exponent - var$8[var$9] | 0;
        $mantissaShift = 9 + var$13 | 0;
        $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$6, otcit_FloatAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    }
    var$9 = var$6 << 1;
    var$6 = var$9 + 1 | 0;
    var$8 = otcit_FloatAnalyzer_mantissa10Table.data;
    var$13 = $decExponent + 1 | 0;
    var$14 = var$8[var$13];
    var$15 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_FloatAnalyzer_mulAndShiftRight(var$6, var$14, var$15);
    $decMantissaLow = otcit_FloatAnalyzer_mulAndShiftRight(var$9 - 1 | 0, otcit_FloatAnalyzer_mantissa10Table.data[var$13], var$15);
    $lowerPos = otcit_FloatAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_FloatAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = $rt_ucmp($lowerPos, $upperPos);
    var$9 = $posCmp > 0 ? $rt_imul($rt_udiv($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? $rt_imul($rt_udiv($decMantissa, $upperPos), $upperPos) + $upperPos | 0 : $rt_imul($rt_udiv(($decMantissa + ($upperPos / 2 | 0) | 0), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(Long_fromInt(var$9), Long_fromInt(1000000000)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$9 = $rt_udiv(var$9, 10);
            if ($rt_ucmp(var$9, 1000000000) < 0)
                break;
        }
    else if ($rt_ucmp(var$9, 100000000) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$9 = var$9 * 10 | 0;
    }
    $result.$mantissa = var$9;
    $result.$exponent = $decExponent - 50 | 0;
},
otcit_FloatAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($lower, $pos_0);
        if ($rt_ucmp(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($upper, $pos_0);
        if ($rt_ucmp(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $result;
    otcit_FloatAnalyzer_$callClinit();
    $result = Long_mul(Long_and(Long_fromInt($a), Long_create(4294967295, 0)), Long_and(Long_fromInt($b), Long_create(4294967295, 0)));
    return Long_lo(Long_shru($result, 32 - $shift | 0));
},
otcit_FloatAnalyzer__clinit_ = () => {
    otcit_FloatAnalyzer_MAX_MANTISSA = $rt_udiv((-1), 10);
    otcit_FloatAnalyzer_mantissa10Table = $rt_createIntArrayFromData([(-18543760), (-873828468), (-1558056233), (-2105438446), (-791721136), (-1492370368), (-2052889754), (-707643228), (-1425108042), (-1999079893), (-621547450), (-1356231419), (-1943978595), (-533385374), (-1285701758), (-1887554866), (-443107408), (-1213479385), (-1829776968), (-350662770), (-1139523676), (-1770612400), (-255999462), (-1063793029), (-1710027882), (-159064234), (-986244846), (-1647989336), (-59802560), (-906835507), (-1584461865),
    (-2126562952), (-825520345), (-1519409735), (-2074521247), (-742253618), (-1452796353), (-2021230542), (-656988489), (-1384584251), (-1966660860), (-569676998), (-1314735058), (-1910781505), (-480270031), (-1243209484), (-1853561046), (-388717296), (-1169967296), (-1794967296), (-294967296), (-1094967296), (-1734967296), (-198967296), (-1018167296), (-1673527296), (-100663296), (-939524096), (-1610612736), (-2147483648), (-858993460), (-1546188227), (-2095944041), (-776530088), (-1480217529), (-2043167483),
    (-692087595), (-1412663535), (-1989124287), (-605618482), (-1343488245), (-1933784055), (-517074110), (-1272652747), (-1877115657), (-426404674), (-1200117198), (-1819087218), (-333559171), (-1125840796), (-1759666096), (-238485376), (-1049781760), (-1698818867), (-141129810), (-971897307), (-1636511305), (-41437710), (-892143627), (-1572708361), (-2117160148), (-810475859), (-1507374147), (-2064892777), (-726848065), (-1440471911), (-2011370988), (-641213203), (-1371964022), (-1956564688)]);
    otcit_FloatAnalyzer_exp10Table = $rt_createIntArrayFromData([(-37), (-34), (-31), (-28), (-24), (-21), (-18), (-14), (-11), (-8), (-4), (-1), 2, 6, 9, 12, 16, 19, 22, 26, 29, 32, 36, 39, 42, 46, 49, 52, 56, 59, 62, 65, 69, 72, 75, 79, 82, 85, 89, 92, 95, 99, 102, 105, 109, 112, 115, 119, 122, 125, 129, 132, 135, 139, 142, 145, 149, 152, 155, 158, 162, 165, 168, 172, 175, 178, 182, 185, 188, 192, 195, 198, 202, 205, 208, 212, 215, 218, 222, 225, 228, 232, 235, 238, 242, 245, 248, 252, 255, 258, 261, 265,
    268, 271, 275, 278, 281, 285, 288, 291]);
},
cprnm_ItemType = $rt_classWithoutFields(jl_Enum),
cprnm_ItemType_$VALUES = null,
cprnm_ItemType_ADAMANTIUM_TIARA = null,
cprnm_ItemType_ADVENTURERS_RIDES = null,
cprnm_ItemType_ADVENTURERS_STARTER_PACK = null,
cprnm_ItemType_AGED_DRAGON_MILK = null,
cprnm_ItemType_ALCHEMIST_STARTER_PACK = null,
cprnm_ItemType_ALCHEMY_COST_RESET = null,
cprnm_ItemType_AMULET_OF_CONCENTRATED_AWESOME = null,
cprnm_ItemType_ANCIENT_CODE = null,
cprnm_ItemType_ANCIENT_COIN = null,
cprnm_ItemType_ANCIENT_TOME_OF_OCCULT_NONSENSE = null,
cprnm_ItemType_AND_MY_AXE = null,
cprnm_ItemType_ANNIVERSARY_1000TH_RESKIN = null,
cprnm_ItemType_ANTI_MAGIC_SHIELD = null,
cprnm_ItemType_ARCANE_DOODLES = null,
cprnm_ItemType_ARCANE_SLACKS = null,
cprnm_ItemType_ARTIFACT_OF_UNIMAGINABLE_POWER = null,
cprnm_ItemType_AUTO_FLUTE = null,
cprnm_ItemType_AXES_OF_DUAL_WIELDING = null,
cprnm_ItemType_AXE_OF_GRATUITOUS_GUITAR_SOLOS = null,
cprnm_ItemType_AXE_OF_GRINDING = null,
cprnm_ItemType_BAG_O_HAMMERS = null,
cprnm_ItemType_BALANCE_OF_LIFE = null,
cprnm_ItemType_BANANA_PEEL_MOUNTAIN = null,
cprnm_ItemType_BANJO_OF_DUELING = null,
cprnm_ItemType_BEARLY_THERE_BOOTS = null,
cprnm_ItemType_BELL_OF_SILENCE = null,
cprnm_ItemType_BESSIES_BANE = null,
cprnm_ItemType_BIG_STABBY_SPEAR = null;
let cprnm_ItemType_BIT_O_NIP = null,
cprnm_ItemType_BLACKBERRY_JAM = null,
cprnm_ItemType_BLACKSMITH_BREW = null,
cprnm_ItemType_BLACKSTEEL_BLADE = null,
cprnm_ItemType_BLISSFUL_IGNORANCE = null,
cprnm_ItemType_BLOODY_BAT = null,
cprnm_ItemType_BLUNT_BLADE = null,
cprnm_ItemType_BONE_CRUSHING_PLIERS = null,
cprnm_ItemType_BOOK_OF_IRMAC = null,
cprnm_ItemType_BOOM_BOX = null,
cprnm_ItemType_BOOTS_MADE_FOR_WALKIN = null,
cprnm_ItemType_BOSS_BATTLE_STAGE_RESET = null,
cprnm_ItemType_BOWIE_KNIFE = null,
cprnm_ItemType_BRACELET_OF_LIGHTNING = null,
cprnm_ItemType_BRAIN_GUARD_9000 = null,
cprnm_ItemType_BRAIN_PILLS = null,
cprnm_ItemType_BUNNY_BLADE = null,
cprnm_ItemType_BUNNY_SLIPPERS = null,
cprnm_ItemType_BUTTER_KNIFE = null,
cprnm_ItemType_CANNON_CANOE = null,
cprnm_ItemType_CAPTAINS_TIGHTPANTS = null,
cprnm_ItemType_CAT_O_NINE_TAILS = null,
cprnm_ItemType_CAVE_DAGGER = null,
cprnm_ItemType_CHAIN_WALLET = null,
cprnm_ItemType_CHAMPIONSHIP_BELT = null,
cprnm_ItemType_CHAPS_OF_ENDURANCE = null,
cprnm_ItemType_CHUGG_BOOTS = null,
cprnm_ItemType_CHUNKY_FEMUR = null,
cprnm_ItemType_CLOAK_OF_THE_OWL = null,
cprnm_ItemType_CLOUDY_MONOCULAR_TELESCOPE = null,
cprnm_ItemType_COG_NITIVE_MASK = null,
cprnm_ItemType_COPPER_ORE = null,
cprnm_ItemType_COSPLAY_SWORD = null,
cprnm_ItemType_CREATINE_CACTUS = null,
cprnm_ItemType_CROWNING_ACHIEVEMENT = null,
cprnm_ItemType_CRUDE_SHIELD = null,
cprnm_ItemType_CRUDE_SNIPPERS = null,
cprnm_ItemType_CRYSTAL_MUSHROOM = null,
cprnm_ItemType_DAISY_CHAINSAW = null,
cprnm_ItemType_DANCERS_BRA = null,
cprnm_ItemType_DEAD_EYE = null,
cprnm_ItemType_DEATH_METAL_BLADE = null,
cprnm_ItemType_DECODER_RING = null,
cprnm_ItemType_DECODER_RING_2_ORDER = null,
cprnm_ItemType_DECODER_RING_3_ORDER = null,
cprnm_ItemType_DEDICATED_BROZERKER = null,
cprnm_ItemType_DEDICATED_CENTAUR_OF_ATTENTION = null,
cprnm_ItemType_DEDICATED_COSMIC_ELF = null,
cprnm_ItemType_DEDICATED_DEEP_DRAGON = null,
cprnm_ItemType_DEDICATED_DEMON_TOTEM = null;
let cprnm_ItemType_DEDICATED_DRAGON_LADY = null,
cprnm_ItemType_DEDICATED_GENIE = null,
cprnm_ItemType_DEDICATED_MEDUSA = null,
cprnm_ItemType_DEDICATED_NINJA_DWARF = null,
cprnm_ItemType_DEDICATED_ORC_MONK = null,
cprnm_ItemType_DEDICATED_ROLLER_WARRIOR = null,
cprnm_ItemType_DEDICATED_SATYR = null,
cprnm_ItemType_DEDICATED_SHADOW_ASSASSIN = null,
cprnm_ItemType_DEDICATED_SNAP_DRAGON = null,
cprnm_ItemType_DEDICATED_UNSTABLE_UNDERSTUDY = null,
cprnm_ItemType_DEERSTALKER_HAT = null,
cprnm_ItemType_DEFAULT = null,
cprnm_ItemType_DENSE_CAKE_OF_HATE = null,
cprnm_ItemType_DESERT_SMASHER = null,
cprnm_ItemType_DEVILS_POT = null,
cprnm_ItemType_DIPLOMATIC_IMMUNITY = null,
cprnm_ItemType_DIRECTORS_CUT = null,
cprnm_ItemType_DIRK_OF_DISEMBOWELING = null,
cprnm_ItemType_DIRTY_BASTARD_SWORD = null,
cprnm_ItemType_DODGY_JEWELRY = null,
cprnm_ItemType_DONT_TASE_ME_BOW = null,
cprnm_ItemType_DOUBLE_AXE = null,
cprnm_ItemType_DOUBLE_BLADED_SWORD = null,
cprnm_ItemType_DOUBLE_ELITE_CAMPAIGN_DROPS = null,
cprnm_ItemType_DOUBLE_EXPERT_CAMPAIGN_DROPS = null,
cprnm_ItemType_DOUBLE_NORMAL_CAMPAIGN_DROPS = null,
cprnm_ItemType_DRACONIAN_DISH = null,
cprnm_ItemType_DRACONIC_FUSE = null,
cprnm_ItemType_DRAGONS_BALLZ = null,
cprnm_ItemType_DRAGONS_BLADE = null,
cprnm_ItemType_DRAGONS_POCKET_WATCH = null,
cprnm_ItemType_DRAGON_BLANKIE = null,
cprnm_ItemType_DRAGON_LEATHER_TIGHTS = null,
cprnm_ItemType_DRAGON_SAND_BOOTS = null,
cprnm_ItemType_DRAGON_SCALE = null,
cprnm_ItemType_DRAGON_SCALE_GROVE = null,
cprnm_ItemType_DROP_OF_MOONLIGHT = null,
cprnm_ItemType_DUELING_KNIVES_OF_HACKENSLASH = null,
cprnm_ItemType_DWARVEN_LIFTING_BELT = null,
cprnm_ItemType_ELITE_CHANCES_COST_RESET = null,
cprnm_ItemType_EMBARASSING_CHAINMAIL_OF_IMMENSE_POWER = null,
cprnm_ItemType_ENCHANTED_ELBOW_PADS = null,
cprnm_ItemType_END_CENTURY_FLAME_RADIATOR = null,
cprnm_ItemType_ENGAGEMENT_KNUCKLES = null,
cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR = null,
cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR_2_ORDER = null,
cprnm_ItemType_ESCUTCHEON_OF_EYES = null,
cprnm_ItemType_EVENT_CHEST_ROLL_X1 = null,
cprnm_ItemType_EXCALIBURTREYNOLDS = null,
cprnm_ItemType_EXOTIC_FAN = null;
let cprnm_ItemType_EXPLOSIVE_CANNON = null,
cprnm_ItemType_EXP_DECANTER = null,
cprnm_ItemType_EXP_FLASK = null,
cprnm_ItemType_EXP_PHILTER = null,
cprnm_ItemType_EXP_VIAL = null,
cprnm_ItemType_EXTREME_FAD_DIET = null,
cprnm_ItemType_EYE_OF_THE_BEHOLDER = null,
cprnm_ItemType_EYE_ON_THE_PRIZE = null,
cprnm_ItemType_FAMILIAR_ENERGY_TANK = null,
cprnm_ItemType_FAMILY_TREE_OF_UMLAUT = null,
cprnm_ItemType_FEATHERWEIGHT_WINGS = null,
cprnm_ItemType_FEATHER_OF_PHOENIX = null,
cprnm_ItemType_FEATHER_WEIGHT_FOIL = null,
cprnm_ItemType_FEATHER_WEIGHT_PAULDRONS = null,
cprnm_ItemType_FINE_BRIE = null,
cprnm_ItemType_FINS_OF_SEA_DRAGON = null,
cprnm_ItemType_FLAIL_OF_TOTAL_DEVASTATION = null,
cprnm_ItemType_FLAMEY_POOFS = null,
cprnm_ItemType_FLATTERING_MIRROR = null,
cprnm_ItemType_FLOPPIN_FLIP_FLOPS = null,
cprnm_ItemType_FOAM_FINGER = null,
cprnm_ItemType_FOUNTAIN_OF_OLD_AGE = null,
cprnm_ItemType_FOUR_D_GLASSES = null,
cprnm_ItemType_FRAMED_DIPLOMA = null,
cprnm_ItemType_FREE_MANS_CROWBAR = null,
cprnm_ItemType_FRIENDZONITE = null,
cprnm_ItemType_GAUNTLET_OF_THRONE = null,
cprnm_ItemType_GEAR_TICKET_CYAN = null,
cprnm_ItemType_GEAR_TICKET_ORANGE = null,
cprnm_ItemType_GEAR_TICKET_PURPLE = null,
cprnm_ItemType_GENERIC_ORANGE = null,
cprnm_ItemType_GENTLEMENS_CLUB = null,
cprnm_ItemType_GIANTS_GROG = null,
cprnm_ItemType_GIRDLE_OF_VICTORY = null,
cprnm_ItemType_GLAIVE_OF_DISMEMBERMENT = null,
cprnm_ItemType_GLASS_CANNON = null,
cprnm_ItemType_GLASS_CASE_OF_EMOTION = null,
cprnm_ItemType_GLORY_SEEKER = null,
cprnm_ItemType_GLOVES_OF_CRIT = null,
cprnm_ItemType_GOBLIN_GROG = null,
cprnm_ItemType_GOBLIN_WHACKER = null,
cprnm_ItemType_GOLDEN_SLINGSHOT = null,
cprnm_ItemType_GOLD_AX_SILVER_AX = null,
cprnm_ItemType_GOLD_CHEST_ROLL_X1 = null,
cprnm_ItemType_GOLD_RUSH = null,
cprnm_ItemType_GOOD_GREEN_GOO = null,
cprnm_ItemType_GOOD_SLEEPING_BED = null,
cprnm_ItemType_GOURD = null,
cprnm_ItemType_GREAT_HORNED_HORN = null,
cprnm_ItemType_GREAVES_OF_PLEIAS = null;
let cprnm_ItemType_GREENISH_LANTERN = null,
cprnm_ItemType_GRIEVOUS_BODILY_HARM = null,
cprnm_ItemType_GROUND_GEARS = null,
cprnm_ItemType_HAIR_OF_THE_DOG = null,
cprnm_ItemType_HAMMER_OF_WICKED_BEATS = null,
cprnm_ItemType_HAMMER_TIME = null,
cprnm_ItemType_HANDY_RASP = null,
cprnm_ItemType_HAROLDS_HOMEMADE_HALBERD = null,
cprnm_ItemType_HEAD_BANGER = null,
cprnm_ItemType_HEALTHY_DOSE_OF_SKEPTICISM = null,
cprnm_ItemType_HEAL_AID = null,
cprnm_ItemType_HEARTY_CHEST = null,
cprnm_ItemType_HEART_HAT = null,
cprnm_ItemType_HEART_HEALTH_CANDY = null,
cprnm_ItemType_HELMET_OF_FORESIGHT = null,
cprnm_ItemType_HELM_OF_SCREAMING_MANFACE = null,
cprnm_ItemType_HELM_OF_THE_RAGING_BEAR = null,
cprnm_ItemType_HEMP_BRACELET = null,
cprnm_ItemType_HERMITS_PILLS = null,
cprnm_ItemType_HERO_ABYSS_DRAGON = null,
cprnm_ItemType_HERO_ANCIENT_DWARF = null,
cprnm_ItemType_HERO_ANGELIC_HERALD = null,
cprnm_ItemType_HERO_ANGEL_DRAGON = null,
cprnm_ItemType_HERO_AQUATIC_MAN = null,
cprnm_ItemType_HERO_BANSHEE = null,
cprnm_ItemType_HERO_BARDBARIAN = null,
cprnm_ItemType_HERO_BLACK_WING = null,
cprnm_ItemType_HERO_BONE_DRAGON = null,
cprnm_ItemType_HERO_BROZERKER = null,
cprnm_ItemType_HERO_BULWARK_ANGEL = null,
cprnm_ItemType_HERO_BURNT_ONE = null,
cprnm_ItemType_HERO_CATAPULT_KNIGHT = null,
cprnm_ItemType_HERO_CENTAUR_OF_ATTENTION = null,
cprnm_ItemType_HERO_CLAW_MAN = null,
cprnm_ItemType_HERO_COSMIC_ELF = null,
cprnm_ItemType_HERO_CRIMSON_WITCH = null,
cprnm_ItemType_HERO_CURSED_STATUE = null,
cprnm_ItemType_HERO_CYCLOPS_WIZARD = null,
cprnm_ItemType_HERO_DARK_DRACUL = null,
cprnm_ItemType_HERO_DARK_HERO = null,
cprnm_ItemType_HERO_DARK_HORSE = null,
cprnm_ItemType_HERO_DEEP_DRAGON = null,
cprnm_ItemType_HERO_DEMON_TOTEM = null,
cprnm_ItemType_HERO_DIGGER_MOLE = null,
cprnm_ItemType_HERO_DOPPELGANGER = null,
cprnm_ItemType_HERO_DRAGON_LADY = null,
cprnm_ItemType_HERO_DRAGON_SLAYER = null,
cprnm_ItemType_HERO_DRAGZILLA = null,
cprnm_ItemType_HERO_DRUIDINATRIX = null,
cprnm_ItemType_HERO_DUNGEON_MAN = null;
let cprnm_ItemType_HERO_DUST_DEVIL = null,
cprnm_ItemType_HERO_DWARVEN_ARCHER = null,
cprnm_ItemType_HERO_ELECTROYETI = null,
cprnm_ItemType_HERO_ETERNAL_ENCHANTER = null,
cprnm_ItemType_HERO_FAITH_HEALER = null,
cprnm_ItemType_HERO_FORGOTTEN_DRAGON = null,
cprnm_ItemType_HERO_FROST_GIANT = null,
cprnm_ItemType_HERO_GENIE = null,
cprnm_ItemType_HERO_GRAND_HUNTRESS = null,
cprnm_ItemType_HERO_GREED_DRAGON = null,
cprnm_ItemType_HERO_GROOVY_DRUID = null,
cprnm_ItemType_HERO_HYDRA = null,
cprnm_ItemType_HERO_KARAOKE_KING = null,
cprnm_ItemType_HERO_KRAKEN_KING = null,
cprnm_ItemType_HERO_LAST_DEFENDER = null,
cprnm_ItemType_HERO_MAGIC_DRAGON = null,
cprnm_ItemType_HERO_MEDUSA = null,
cprnm_ItemType_HERO_MINOTAUR = null,
cprnm_ItemType_HERO_MISTRESS_MANICURE = null,
cprnm_ItemType_HERO_MOON_DRAKE = null,
cprnm_ItemType_HERO_NINJA_DWARF = null,
cprnm_ItemType_HERO_ORC_MONK = null,
cprnm_ItemType_HERO_PCH_ANUBIS_DRAGON = null,
cprnm_ItemType_HERO_PIRATE = null,
cprnm_ItemType_HERO_PLAGUE_ENTREPRENEUR = null,
cprnm_ItemType_HERO_PLANT_SOUL = null,
cprnm_ItemType_HERO_POLEMASTER = null,
cprnm_ItemType_HERO_RABID_DRAGON = null,
cprnm_ItemType_HERO_RAGING_REVENANT = null,
cprnm_ItemType_HERO_ROLLER_WARRIOR = null,
cprnm_ItemType_HERO_SADISTIC_DANCER = null,
cprnm_ItemType_HERO_SATYR = null,
cprnm_ItemType_HERO_SAVAGE_CUTIE = null,
cprnm_ItemType_HERO_SHADOW_ASSASSIN = null,
cprnm_ItemType_HERO_SHADOW_OF_SVEN = null,
cprnm_ItemType_HERO_SILENT_SPIRIT = null,
cprnm_ItemType_HERO_SKELETON_KING = null,
cprnm_ItemType_HERO_SNAPPER_BONE = null,
cprnm_ItemType_HERO_SNAP_DRAGON = null,
cprnm_ItemType_HERO_SNIPER_WOLF = null,
cprnm_ItemType_HERO_SOJOURNER_SORCERESS = null,
cprnm_ItemType_HERO_SPECTRAL_DRAGON = null,
cprnm_ItemType_HERO_SPIDER_QUEEN = null,
cprnm_ItemType_HERO_SPIKEY_DRAGON = null,
cprnm_ItemType_HERO_STEPLADDER_BROTHERS = null,
cprnm_ItemType_HERO_STORM_DRAGON = null,
cprnm_ItemType_HERO_STOWAWAY = null,
cprnm_ItemType_HERO_SUN_SEEKER = null,
cprnm_ItemType_HERO_TOMB_ANGEL = null,
cprnm_ItemType_HERO_TRIPLE_THREAT = null;
let cprnm_ItemType_HERO_UMLAUT_THE_FIRST = null,
cprnm_ItemType_HERO_UNICORGI = null,
cprnm_ItemType_HERO_UNRIPE_MYTHOLOGY = null,
cprnm_ItemType_HERO_UNSTABLE_UNDERSTUDY = null,
cprnm_ItemType_HERO_VERMILION_PRIESTESS = null,
cprnm_ItemType_HERO_VILE_BILE = null,
cprnm_ItemType_HERO_VOID_WYVERN = null,
cprnm_ItemType_HERO_VULTURE_DRAGON = null,
cprnm_ItemType_HERO_WEE_WITCH = null,
cprnm_ItemType_HERO_WEREDRAGON = null,
cprnm_ItemType_HERO_WHITE_TIGRESS = null,
cprnm_ItemType_HERO_ZOMBIE_SQUIRE = null,
cprnm_ItemType_HIGH_TEA = null,
cprnm_ItemType_HIPPY_GLO_STICKS = null,
cprnm_ItemType_HOLY_LANCE_OF_PLOT_ADVANCEMENT = null,
cprnm_ItemType_HORNS_OF_WHITE_DEER = null,
cprnm_ItemType_HOT_ARMOR = null,
cprnm_ItemType_ILLUSORY_HURDLE = null,
cprnm_ItemType_IMPRACTICAL_CHESTPLATE = null,
cprnm_ItemType_INTIMIDATING_BEARD = null,
cprnm_ItemType_IRON_CLAWS = null,
cprnm_ItemType_IRON_HELMET_OF_BIKING = null,
cprnm_ItemType_IRON_ORE = null,
cprnm_ItemType_ITEM_INFO = null,
cprnm_ItemType_IVY_LEAGUE_HAIRCUT = null,
cprnm_ItemType_JAR_OF_KITTEN_TEAR = null,
cprnm_ItemType_KEY_TO_THE_KINGDOM = null,
cprnm_ItemType_KINDNESS = null,
cprnm_ItemType_KING_JEFFS_CROSSBOW = null,
cprnm_ItemType_LASER_POINTER = null,
cprnm_ItemType_LASER_POINTER_2_ORDER = null,
cprnm_ItemType_LASER_POINTER_3_ORDER = null,
cprnm_ItemType_LASER_POINTER_4_ORDER = null,
cprnm_ItemType_LAVISHLY_ADORNED_RAPIER = null,
cprnm_ItemType_LAZARUS_BEANS = null,
cprnm_ItemType_LEAD_ZEPPELIN = null,
cprnm_ItemType_LEGENDARY_QUEST_SKIP = null,
cprnm_ItemType_LENSLESS_GLASSES = null,
cprnm_ItemType_LICHE_FINGER = null,
cprnm_ItemType_LIFEDRINKER = null,
cprnm_ItemType_LIFESIPPER = null,
cprnm_ItemType_LIGER_BALM = null,
cprnm_ItemType_LIGHTNING_GREASE = null,
cprnm_ItemType_LION_LIQUEUR = null,
cprnm_ItemType_LITTLE_PRICKS = null,
cprnm_ItemType_LOADED_DIE = null,
cprnm_ItemType_LOAFERS_OF_ALACRITY = null,
cprnm_ItemType_LORD_OF_RIVER = null,
cprnm_ItemType_LOST_CONCEPT_ART = null,
cprnm_ItemType_LOST_DISK_OF_POWER = null;
let cprnm_ItemType_LOST_GREAVES = null,
cprnm_ItemType_LUCKY_ORCS_FOOT = null,
cprnm_ItemType_MACE_OF_FRIENDSHIP = null,
cprnm_ItemType_MACGUFFIN_FRAGMENT_45 = null,
cprnm_ItemType_MAD_GODS_MUG = null,
cprnm_ItemType_MAGATAMA = null,
cprnm_ItemType_MAGICAL_CREAM = null,
cprnm_ItemType_MAGICAL_HATRACK = null,
cprnm_ItemType_MAGICAL_PEST_MAST = null,
cprnm_ItemType_MAGICAL_WATER_BOTTLE = null,
cprnm_ItemType_MAGIC_EIGHT_BALL = null,
cprnm_ItemType_MAI_TAI_OF_IMMUNITY = null,
cprnm_ItemType_MANLY_FIRST_AID_KIT = null,
cprnm_ItemType_MASK_OF_THE_ANCIENT_KING = null,
cprnm_ItemType_MEATY_BUTTER = null,
cprnm_ItemType_MELTY_CHOCOLATE_BAR = null,
cprnm_ItemType_MIND_MAP = null,
cprnm_ItemType_MIRACLE_FURNACE_OF_BLACKSMITH = null,
cprnm_ItemType_MITHRIL_ORE = null,
cprnm_ItemType_MITHRIL_OREEAL = null,
cprnm_ItemType_MJOLNIRBY = null,
cprnm_ItemType_MONSTER_HUNTER_ARMOR = null,
cprnm_ItemType_MOON_LIGHT = null,
cprnm_ItemType_MOTIVATIONAL_CASSETTE = null,
cprnm_ItemType_MUNDANE_MUSHROOMS = null,
cprnm_ItemType_MUSCLE_BOUND_BOOK = null,
cprnm_ItemType_MUSCLE_WAX = null,
cprnm_ItemType_MUSSEL_MILK = null,
cprnm_ItemType_MYSTERIOUS_EGG = null,
cprnm_ItemType_MYSTICAL_ELVEN_JUNK = null,
cprnm_ItemType_MY_FIRST_SHIELD = null,
cprnm_ItemType_MY_JAM = null,
cprnm_ItemType_NAUGHTY_TAPESTRY = null,
cprnm_ItemType_NAVIGATION_TO_THE_PAST = null,
cprnm_ItemType_NECRONOMICON = null,
cprnm_ItemType_NEW_KNIGHT_IN_TOWN = null,
cprnm_ItemType_NONSTICK_SHIELD = null,
cprnm_ItemType_NUMBER_529 = null,
cprnm_ItemType_OFFERING_BLOOD = null,
cprnm_ItemType_OFFERING_FIRE = null,
cprnm_ItemType_OFFERING_HAIL = null,
cprnm_ItemType_OFFERING_KEYSTONE = null,
cprnm_ItemType_OFFERING_LIGHTNING = null,
cprnm_ItemType_OFFERING_MAJOR_1 = null,
cprnm_ItemType_OFFERING_MAJOR_2 = null,
cprnm_ItemType_OFFERING_MINOR_1 = null,
cprnm_ItemType_OFFERING_MINOR_2 = null,
cprnm_ItemType_OFFERING_MINOR_3 = null,
cprnm_ItemType_OFFERING_MIST = null,
cprnm_ItemType_OFFERING_OCEAN = null;
let cprnm_ItemType_OFFERING_RIVER = null,
cprnm_ItemType_OFFERING_ROCK = null,
cprnm_ItemType_OFFERING_TREE = null,
cprnm_ItemType_OGRES_BATTERING_RAM = null,
cprnm_ItemType_ORANGE_CHEST_ROLL_X1 = null,
cprnm_ItemType_ORBITAL_KITTY = null,
cprnm_ItemType_ORB_OF_EVERLASTING_FLAVOR = null,
cprnm_ItemType_ORGANIC_BOOK_OF_NATURE = null,
cprnm_ItemType_ORNATE_CROWN_OF_THE_GM = null,
cprnm_ItemType_OVERPOWERING_FRAGRANCE = null,
cprnm_ItemType_PAPER_CROWN = null,
cprnm_ItemType_PENETRABLE_ARMOR = null,
cprnm_ItemType_PETER_PIPERS_PEPPER_SPRAY = null,
cprnm_ItemType_PHAT_PANTS = null,
cprnm_ItemType_PHILTER_OF_PURE_TESTOSTERONE = null,
cprnm_ItemType_PHOENIX_TALISMAN = null,
cprnm_ItemType_PHOTO_BOMB = null,
cprnm_ItemType_PIECE_OF_ACOLYTE_STATUE = null,
cprnm_ItemType_PLASTIC_VAMPIRE_TEETH = null,
cprnm_ItemType_PLUCKY_HEROINES_SHORTBOW = null,
cprnm_ItemType_POCKET_PROTECTOR = null,
cprnm_ItemType_POISONED_DAGGER = null,
cprnm_ItemType_POISONED_SILVER_ACCESSORY_OF_SCORPION = null,
cprnm_ItemType_POLITICAL_PLATFORM_SHOES = null,
cprnm_ItemType_PORTABLE_NUTRITIOUS_DIET = null,
cprnm_ItemType_POWER_OF_SCIENCE = null,
cprnm_ItemType_PRETTY_SWEET_CAPE = null,
cprnm_ItemType_PRICKLING_WHIP = null,
cprnm_ItemType_PRIMAL_ESSENCE = null,
cprnm_ItemType_PROTEIN_POWDER = null,
cprnm_ItemType_PURIFICATION_ROBE = null,
cprnm_ItemType_PURIFYING_TUNING_FORK = null,
cprnm_ItemType_PURPLE_CHEST_ROLL_X1 = null,
cprnm_ItemType_PURPLE_PILLS_OF_POTENCY = null,
cprnm_ItemType_PYRAMID_POWER = null,
cprnm_ItemType_RACING_STRIPES = null,
cprnm_ItemType_RAID_TICKET = null,
cprnm_ItemType_RATTLING_SABRE = null,
cprnm_ItemType_RAW_EGG = null,
cprnm_ItemType_READIN_RAIN_BOW = null,
cprnm_ItemType_REEL_ADVENTURERS_RIDES = null,
cprnm_ItemType_REEL_ANCIENT_CODE = null,
cprnm_ItemType_REEL_ANCIENT_COIN = null,
cprnm_ItemType_REEL_BAG_O_HAMMERS = null,
cprnm_ItemType_REEL_BALANCE_OF_LIFE = null,
cprnm_ItemType_REEL_BANANA_PEEL_MOUNTAIN = null,
cprnm_ItemType_REEL_BEARLY_THERE_BOOTS = null,
cprnm_ItemType_REEL_BIG_STABBY_SPEAR = null,
cprnm_ItemType_REEL_BLACKBERRY_JAM = null,
cprnm_ItemType_REEL_BLACKSMITH_BREW = null;
let cprnm_ItemType_REEL_BLACKSTEEL_BLADE = null,
cprnm_ItemType_REEL_BLOODY_BAT = null,
cprnm_ItemType_REEL_BLUNT_BLADE = null,
cprnm_ItemType_REEL_BONE_CRUSHING_PLIERS = null,
cprnm_ItemType_REEL_BOOM_BOX = null,
cprnm_ItemType_REEL_BRACELET_OF_LIGHTNING = null,
cprnm_ItemType_REEL_BRAIN_GUARD_9000 = null,
cprnm_ItemType_REEL_BUNNY_BLADE = null,
cprnm_ItemType_REEL_CHUGG_BOOTS = null,
cprnm_ItemType_REEL_CHUNKY_FEMUR = null,
cprnm_ItemType_REEL_CLOAK_OF_THE_OWL = null,
cprnm_ItemType_REEL_CLOUDY_MONOCULAR_TELESCOPE = null,
cprnm_ItemType_REEL_COG_NITIVE_MASK = null,
cprnm_ItemType_REEL_CRYSTAL_MUSHROOM = null,
cprnm_ItemType_REEL_DANCERS_BRA = null,
cprnm_ItemType_REEL_DEATH_METAL_BLADE = null,
cprnm_ItemType_REEL_DECODER_RING = null,
cprnm_ItemType_REEL_DEDICATED_BROZERKER = null,
cprnm_ItemType_REEL_DEDICATED_CENTAUR_OF_ATTENTION = null,
cprnm_ItemType_REEL_DEDICATED_COSMIC_ELF = null,
cprnm_ItemType_REEL_DEDICATED_DEEP_DRAGON = null,
cprnm_ItemType_REEL_DEDICATED_DEMON_TOTEM = null,
cprnm_ItemType_REEL_DEDICATED_DRAGON_LADY = null,
cprnm_ItemType_REEL_DEDICATED_GENIE = null,
cprnm_ItemType_REEL_DEDICATED_MEDUSA = null,
cprnm_ItemType_REEL_DEDICATED_NINJA_DWARF = null,
cprnm_ItemType_REEL_DEDICATED_ORC_MONK = null,
cprnm_ItemType_REEL_DEDICATED_ROLLER_WARRIOR = null,
cprnm_ItemType_REEL_DEDICATED_SATYR = null,
cprnm_ItemType_REEL_DEDICATED_SHADOW_ASSASSIN = null,
cprnm_ItemType_REEL_DEDICATED_SNAP_DRAGON = null,
cprnm_ItemType_REEL_DEDICATED_UNSTABLE_UNDERSTUDY = null,
cprnm_ItemType_REEL_DENSE_CAKE_OF_HATE = null,
cprnm_ItemType_REEL_DIPLOMATIC_IMMUNITY = null,
cprnm_ItemType_REEL_DIRK_OF_DISEMBOWELING = null,
cprnm_ItemType_REEL_DIRTY_BASTARD_SWORD = null,
cprnm_ItemType_REEL_DRACONIAN_DISH = null,
cprnm_ItemType_REEL_DRAGONS_BLADE = null,
cprnm_ItemType_REEL_DRAGON_LEATHER_TIGHTS = null,
cprnm_ItemType_REEL_DRAGON_SAND_BOOTS = null,
cprnm_ItemType_REEL_DRAGON_SCALE = null,
cprnm_ItemType_REEL_DRAGON_SCALE_GROVE = null,
cprnm_ItemType_REEL_DROP_OF_MOONLIGHT = null,
cprnm_ItemType_REEL_END_CENTURY_FLAME_RADIATOR = null,
cprnm_ItemType_REEL_ENIDS_EXPENSIVE_ELIXIR = null,
cprnm_ItemType_REEL_ESCUTCHEON_OF_EYES = null,
cprnm_ItemType_REEL_EXOTIC_FAN = null,
cprnm_ItemType_REEL_EXPLOSIVE_CANNON = null,
cprnm_ItemType_REEL_EYE_OF_THE_BEHOLDER = null,
cprnm_ItemType_REEL_EYE_ON_THE_PRIZE = null;
let cprnm_ItemType_REEL_FAMILY_TREE_OF_UMLAUT = null,
cprnm_ItemType_REEL_FEATHER_OF_PHOENIX = null,
cprnm_ItemType_REEL_FEATHER_WEIGHT_FOIL = null,
cprnm_ItemType_REEL_FEATHER_WEIGHT_PAULDRONS = null,
cprnm_ItemType_REEL_FINS_OF_SEA_DRAGON = null,
cprnm_ItemType_REEL_FLAIL_OF_TOTAL_DEVASTATION = null,
cprnm_ItemType_REEL_FLATTERING_MIRROR = null,
cprnm_ItemType_REEL_FLOPPIN_FLIP_FLOPS = null,
cprnm_ItemType_REEL_GIRDLE_OF_VICTORY = null,
cprnm_ItemType_REEL_GLASS_CASE_OF_EMOTION = null,
cprnm_ItemType_REEL_GLORY_SEEKER = null,
cprnm_ItemType_REEL_GOBLIN_WHACKER = null,
cprnm_ItemType_REEL_GOLD_AX_SILVER_AX = null,
cprnm_ItemType_REEL_GOLD_RUSH = null,
cprnm_ItemType_REEL_GOOD_SLEEPING_BED = null,
cprnm_ItemType_REEL_GOURD = null,
cprnm_ItemType_REEL_GREAVES_OF_PLEIAS = null,
cprnm_ItemType_REEL_GRIEVOUS_BODILY_HARM = null,
cprnm_ItemType_REEL_HAMMER_OF_WICKED_BEATS = null,
cprnm_ItemType_REEL_HAMMER_TIME = null,
cprnm_ItemType_REEL_HANDY_RASP = null,
cprnm_ItemType_REEL_HEART_HAT = null,
cprnm_ItemType_REEL_HEART_HEALTH_CANDY = null,
cprnm_ItemType_REEL_HELMET_OF_FORESIGHT = null,
cprnm_ItemType_REEL_HERMITS_PILLS = null,
cprnm_ItemType_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT = null,
cprnm_ItemType_REEL_HORNS_OF_WHITE_DEER = null,
cprnm_ItemType_REEL_INTIMIDATING_BEARD = null,
cprnm_ItemType_REEL_IRON_HELMET_OF_BIKING = null,
cprnm_ItemType_REEL_IVY_LEAGUE_HAIRCUT = null,
cprnm_ItemType_REEL_JAR_OF_KITTEN_TEAR = null,
cprnm_ItemType_REEL_KINDNESS = null,
cprnm_ItemType_REEL_LASER_POINTER = null,
cprnm_ItemType_REEL_LEAD_ZEPPELIN = null,
cprnm_ItemType_REEL_LIFEDRINKER = null,
cprnm_ItemType_REEL_LORD_OF_RIVER = null,
cprnm_ItemType_REEL_LOST_GREAVES = null,
cprnm_ItemType_REEL_LUCKY_ORCS_FOOT = null,
cprnm_ItemType_REEL_MAGATAMA = null,
cprnm_ItemType_REEL_MAGICAL_CREAM = null,
cprnm_ItemType_REEL_MAGICAL_HATRACK = null,
cprnm_ItemType_REEL_MAGICAL_PEST_MAST = null,
cprnm_ItemType_REEL_MAGIC_EIGHT_BALL = null,
cprnm_ItemType_REEL_MAI_TAI_OF_IMMUNITY = null,
cprnm_ItemType_REEL_MASK_OF_THE_ANCIENT_KING = null,
cprnm_ItemType_REEL_MIRACLE_FURNACE_OF_BLACKSMITH = null,
cprnm_ItemType_REEL_MJOLNIRBY = null,
cprnm_ItemType_REEL_MYSTERIOUS_EGG = null,
cprnm_ItemType_REEL_MYSTICAL_ELVEN_JUNK = null,
cprnm_ItemType_REEL_NAVIGATION_TO_THE_PAST = null;
let cprnm_ItemType_REEL_NECRONOMICON = null,
cprnm_ItemType_REEL_OGRES_BATTERING_RAM = null,
cprnm_ItemType_REEL_ORBITAL_KITTY = null,
cprnm_ItemType_REEL_ORB_OF_EVERLASTING_FLAVOR = null,
cprnm_ItemType_REEL_ORNATE_CROWN_OF_THE_GM = null,
cprnm_ItemType_REEL_PIECE_OF_ACOLYTE_STATUE = null,
cprnm_ItemType_REEL_PLASTIC_VAMPIRE_TEETH = null,
cprnm_ItemType_REEL_POCKET_PROTECTOR = null,
cprnm_ItemType_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION = null,
cprnm_ItemType_REEL_PORTABLE_NUTRITIOUS_DIET = null,
cprnm_ItemType_REEL_POWER_OF_SCIENCE = null,
cprnm_ItemType_REEL_PRETTY_SWEET_CAPE = null,
cprnm_ItemType_REEL_PURIFICATION_ROBE = null,
cprnm_ItemType_REEL_PYRAMID_POWER = null,
cprnm_ItemType_REEL_RATTLING_SABRE = null,
cprnm_ItemType_REEL_REMOTE_COMMUNICATION_FLOWER = null,
cprnm_ItemType_REEL_RING_OF_TEMPTATION = null,
cprnm_ItemType_REEL_ROCKET_CLOAK = null,
cprnm_ItemType_REEL_ROD_OF_WITTY_PARTY_BANTER = null,
cprnm_ItemType_REEL_RUBY_FLIP_FLOPS = null,
cprnm_ItemType_REEL_SAMURAI_SWORD = null,
cprnm_ItemType_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS = null,
cprnm_ItemType_REEL_SAND_STORM = null,
cprnm_ItemType_REEL_SECRET_HAND_SCROLL = null,
cprnm_ItemType_REEL_SHINING_HOLY_TREE = null,
cprnm_ItemType_REEL_SHINING_LIGHT_OF_FIREFLY = null,
cprnm_ItemType_REEL_SHINY_BOTTLECAP = null,
cprnm_ItemType_REEL_SHOES_OF_THE_MAD_GOD = null,
cprnm_ItemType_REEL_SHOVEL = null,
cprnm_ItemType_REEL_SHRIMPISH_CREATURE = null,
cprnm_ItemType_REEL_SICK_MULLET = null,
cprnm_ItemType_REEL_SIDE_OF_BACON = null,
cprnm_ItemType_REEL_SOUL_FOR_POWER_VOLUME_45 = null,
cprnm_ItemType_REEL_SPARKLE_PONY_KEYCHAIN = null,
cprnm_ItemType_REEL_SPUD_GUN = null,
cprnm_ItemType_REEL_STEAM_ENGINE = null,
cprnm_ItemType_REEL_SUNBLOCK_GOGGLES = null,
cprnm_ItemType_REEL_SUPER_SPIKEY_SPEAR = null,
cprnm_ItemType_REEL_SWORD_OF_DESPAIR = null,
cprnm_ItemType_REEL_TAROT_DECK_OF_HYPERBOLE = null,
cprnm_ItemType_REEL_TEN_FOOT_POLE = null,
cprnm_ItemType_REEL_THE_1_RING = null,
cprnm_ItemType_REEL_THE_COMPENSATOR = null,
cprnm_ItemType_REEL_THE_MAD_GODS_TRIDENT = null,
cprnm_ItemType_REEL_THE_POWER_OF_MEDICINE = null,
cprnm_ItemType_REEL_THE_SHIELD_STOPS_YOU = null,
cprnm_ItemType_REEL_THE_SPEAR_BRINGS_VICTORY = null,
cprnm_ItemType_REEL_THINKING_CAP = null,
cprnm_ItemType_REEL_TIGER_SALVE = null,
cprnm_ItemType_REEL_TIGER_UNDERWEAR = null;
let cprnm_ItemType_REEL_TOME_OF_CURSED_HORTICULTURE = null,
cprnm_ItemType_REEL_TOME_OF_FORBIDDEN_TRIVIA = null,
cprnm_ItemType_REEL_TRIASSIC_TRINKET = null,
cprnm_ItemType_REEL_UNICORN_PUKE = null,
cprnm_ItemType_REEL_UPHOLSTERED_THRONE = null,
cprnm_ItemType_REEL_VAMPIRE_BUNNYEARS = null,
cprnm_ItemType_REEL_WARRIORS_HELMET = null,
cprnm_ItemType_REEL_WRAITH_BARRIER = null,
cprnm_ItemType_REEL_YODELING_SWORD = null,
cprnm_ItemType_REMOTE_COMMUNICATION_FLOWER = null,
cprnm_ItemType_RINGS_OF_A_FEATHER = null,
cprnm_ItemType_RING_OF_FIRE = null,
cprnm_ItemType_RING_OF_ILL_WILL = null,
cprnm_ItemType_RING_OF_TEMPTATION = null,
cprnm_ItemType_RING_OF_THE_SQUIRREL = null,
cprnm_ItemType_ROBE_OF_SHARP_COMEBACKS = null,
cprnm_ItemType_ROCKET_CLOAK = null,
cprnm_ItemType_ROD_OF_BADASSERY = null,
cprnm_ItemType_ROD_OF_TASING = null,
cprnm_ItemType_ROD_OF_WITTY_PARTY_BANTER = null,
cprnm_ItemType_ROLL_OF_DUCT_TAPE = null,
cprnm_ItemType_RUBBER_VEST = null,
cprnm_ItemType_RUBY_FLIP_FLOPS = null,
cprnm_ItemType_RUNICITE_BLOCK = null,
cprnm_ItemType_RUNICITE_MONOLITH = null,
cprnm_ItemType_RUNICITE_SHARD = null,
cprnm_ItemType_RUNICITE_SLAB = null,
cprnm_ItemType_RUNICITE_STONE = null,
cprnm_ItemType_SACRED_CODEX = null,
cprnm_ItemType_SAMURAI_SWORD = null,
cprnm_ItemType_SANDWICH_OF_UNSURPASSED_MEATINESS = null,
cprnm_ItemType_SAND_STORM = null,
cprnm_ItemType_SECRET_HAND_SCROLL = null,
cprnm_ItemType_SELF_PRESERVER = null,
cprnm_ItemType_SHARD_ADAMANTIUM_TIARA = null,
cprnm_ItemType_SHARD_AGED_DRAGON_MILK = null,
cprnm_ItemType_SHARD_ANCIENT_TOME_OF_OCCULT_NONSENSE = null,
cprnm_ItemType_SHARD_AND_MY_AXE = null,
cprnm_ItemType_SHARD_ANTI_MAGIC_SHIELD = null,
cprnm_ItemType_SHARD_AXE_OF_GRATUITOUS_GUITAR_SOLOS = null,
cprnm_ItemType_SHARD_BOOK_OF_IRMAC = null,
cprnm_ItemType_SHARD_BOOTS_MADE_FOR_WALKIN = null,
cprnm_ItemType_SHARD_BOWIE_KNIFE = null,
cprnm_ItemType_SHARD_BUNNY_SLIPPERS = null,
cprnm_ItemType_SHARD_CAT_O_NINE_TAILS = null,
cprnm_ItemType_SHARD_COSPLAY_SWORD = null,
cprnm_ItemType_SHARD_CREATINE_CACTUS = null,
cprnm_ItemType_SHARD_CRUDE_SNIPPERS = null,
cprnm_ItemType_SHARD_DEAD_EYE = null,
cprnm_ItemType_SHARD_DEVILS_POT = null;
let cprnm_ItemType_SHARD_DONT_TASE_ME_BOW = null,
cprnm_ItemType_SHARD_DOUBLE_AXE = null,
cprnm_ItemType_SHARD_DOUBLE_BLADED_SWORD = null,
cprnm_ItemType_SHARD_DRAGONS_POCKET_WATCH = null,
cprnm_ItemType_SHARD_DRAGON_BLANKIE = null,
cprnm_ItemType_SHARD_EXTREME_FAD_DIET = null,
cprnm_ItemType_SHARD_FAMILIAR_ENERGY_TANK = null,
cprnm_ItemType_SHARD_FOUR_D_GLASSES = null,
cprnm_ItemType_SHARD_FRAMED_DIPLOMA = null,
cprnm_ItemType_SHARD_GAUNTLET_OF_THRONE = null,
cprnm_ItemType_SHARD_GENTLEMENS_CLUB = null,
cprnm_ItemType_SHARD_GIANTS_GROG = null,
cprnm_ItemType_SHARD_GOLDEN_SLINGSHOT = null,
cprnm_ItemType_SHARD_GROUND_GEARS = null,
cprnm_ItemType_SHARD_HAROLDS_HOMEMADE_HALBERD = null,
cprnm_ItemType_SHARD_HEAD_BANGER = null,
cprnm_ItemType_SHARD_HEALTHY_DOSE_OF_SKEPTICISM = null,
cprnm_ItemType_SHARD_HEAL_AID = null,
cprnm_ItemType_SHARD_HEARTY_CHEST = null,
cprnm_ItemType_SHARD_HELM_OF_THE_RAGING_BEAR = null,
cprnm_ItemType_SHARD_HIGH_TEA = null,
cprnm_ItemType_SHARD_IMPRACTICAL_CHESTPLATE = null,
cprnm_ItemType_SHARD_IRON_CLAWS = null,
cprnm_ItemType_SHARD_LAZARUS_BEANS = null,
cprnm_ItemType_SHARD_LENSLESS_GLASSES = null,
cprnm_ItemType_SHARD_LIGER_BALM = null,
cprnm_ItemType_SHARD_LIGHTNING_GREASE = null,
cprnm_ItemType_SHARD_LITTLE_PRICKS = null,
cprnm_ItemType_SHARD_LOST_CONCEPT_ART = null,
cprnm_ItemType_SHARD_LOST_DISK_OF_POWER = null,
cprnm_ItemType_SHARD_MACE_OF_FRIENDSHIP = null,
cprnm_ItemType_SHARD_MACGUFFIN_FRAGMENT_45 = null,
cprnm_ItemType_SHARD_MAD_GODS_MUG = null,
cprnm_ItemType_SHARD_MAGICAL_WATER_BOTTLE = null,
cprnm_ItemType_SHARD_MANLY_FIRST_AID_KIT = null,
cprnm_ItemType_SHARD_MUNDANE_MUSHROOMS = null,
cprnm_ItemType_SHARD_MUSCLE_WAX = null,
cprnm_ItemType_SHARD_NAUGHTY_TAPESTRY = null,
cprnm_ItemType_SHARD_PETER_PIPERS_PEPPER_SPRAY = null,
cprnm_ItemType_SHARD_PHAT_PANTS = null,
cprnm_ItemType_SHARD_PHILTER_OF_PURE_TESTOSTERONE = null,
cprnm_ItemType_SHARD_PHOENIX_TALISMAN = null,
cprnm_ItemType_SHARD_PHOTO_BOMB = null,
cprnm_ItemType_SHARD_POISONED_DAGGER = null,
cprnm_ItemType_SHARD_PRICKLING_WHIP = null,
cprnm_ItemType_SHARD_RACING_STRIPES = null,
cprnm_ItemType_SHARD_REEL_ADVENTURERS_RIDES = null,
cprnm_ItemType_SHARD_REEL_ANCIENT_CODE = null,
cprnm_ItemType_SHARD_REEL_ANCIENT_COIN = null,
cprnm_ItemType_SHARD_REEL_BALANCE_OF_LIFE = null;
let cprnm_ItemType_SHARD_REEL_BANANA_PEEL_MOUNTAIN = null,
cprnm_ItemType_SHARD_REEL_BEARLY_THERE_BOOTS = null,
cprnm_ItemType_SHARD_REEL_BIG_STABBY_SPEAR = null,
cprnm_ItemType_SHARD_REEL_BLACKBERRY_JAM = null,
cprnm_ItemType_SHARD_REEL_BLACKSMITH_BREW = null,
cprnm_ItemType_SHARD_REEL_BLACKSTEEL_BLADE = null,
cprnm_ItemType_SHARD_REEL_BLUNT_BLADE = null,
cprnm_ItemType_SHARD_REEL_BONE_CRUSHING_PLIERS = null,
cprnm_ItemType_SHARD_REEL_BOOM_BOX = null,
cprnm_ItemType_SHARD_REEL_BRACELET_OF_LIGHTNING = null,
cprnm_ItemType_SHARD_REEL_BRAIN_GUARD_9000 = null,
cprnm_ItemType_SHARD_REEL_BUNNY_BLADE = null,
cprnm_ItemType_SHARD_REEL_CHUGG_BOOTS = null,
cprnm_ItemType_SHARD_REEL_CLOAK_OF_THE_OWL = null,
cprnm_ItemType_SHARD_REEL_CLOUDY_MONOCULAR_TELESCOPE = null,
cprnm_ItemType_SHARD_REEL_COG_NITIVE_MASK = null,
cprnm_ItemType_SHARD_REEL_CRYSTAL_MUSHROOM = null,
cprnm_ItemType_SHARD_REEL_DANCERS_BRA = null,
cprnm_ItemType_SHARD_REEL_DEATH_METAL_BLADE = null,
cprnm_ItemType_SHARD_REEL_DECODER_RING = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_BROZERKER = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_CENTAUR_OF_ATTENTION = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_COSMIC_ELF = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_DEEP_DRAGON = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_DEMON_TOTEM = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_DRAGON_LADY = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_GENIE = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_MEDUSA = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_NINJA_DWARF = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_ORC_MONK = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_ROLLER_WARRIOR = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_SATYR = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_SHADOW_ASSASSIN = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_SNAP_DRAGON = null,
cprnm_ItemType_SHARD_REEL_DEDICATED_UNSTABLE_UNDERSTUDY = null,
cprnm_ItemType_SHARD_REEL_DENSE_CAKE_OF_HATE = null,
cprnm_ItemType_SHARD_REEL_DIPLOMATIC_IMMUNITY = null,
cprnm_ItemType_SHARD_REEL_DIRK_OF_DISEMBOWELING = null,
cprnm_ItemType_SHARD_REEL_DIRTY_BASTARD_SWORD = null,
cprnm_ItemType_SHARD_REEL_DRACONIAN_DISH = null,
cprnm_ItemType_SHARD_REEL_DRAGONS_BLADE = null,
cprnm_ItemType_SHARD_REEL_DRAGON_LEATHER_TIGHTS = null,
cprnm_ItemType_SHARD_REEL_DRAGON_SAND_BOOTS = null,
cprnm_ItemType_SHARD_REEL_DRAGON_SCALE = null,
cprnm_ItemType_SHARD_REEL_DRAGON_SCALE_GROVE = null,
cprnm_ItemType_SHARD_REEL_DROP_OF_MOONLIGHT = null,
cprnm_ItemType_SHARD_REEL_END_CENTURY_FLAME_RADIATOR = null,
cprnm_ItemType_SHARD_REEL_ENIDS_EXPENSIVE_ELIXIR = null,
cprnm_ItemType_SHARD_REEL_ESCUTCHEON_OF_EYES = null,
cprnm_ItemType_SHARD_REEL_EXOTIC_FAN = null;
let cprnm_ItemType_SHARD_REEL_EXPLOSIVE_CANNON = null,
cprnm_ItemType_SHARD_REEL_EYE_OF_THE_BEHOLDER = null,
cprnm_ItemType_SHARD_REEL_EYE_ON_THE_PRIZE = null,
cprnm_ItemType_SHARD_REEL_FAMILY_TREE_OF_UMLAUT = null,
cprnm_ItemType_SHARD_REEL_FEATHER_OF_PHOENIX = null,
cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_FOIL = null,
cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_PAULDRONS = null,
cprnm_ItemType_SHARD_REEL_FINS_OF_SEA_DRAGON = null,
cprnm_ItemType_SHARD_REEL_FLAIL_OF_TOTAL_DEVASTATION = null,
cprnm_ItemType_SHARD_REEL_FLATTERING_MIRROR = null,
cprnm_ItemType_SHARD_REEL_FLOPPIN_FLIP_FLOPS = null,
cprnm_ItemType_SHARD_REEL_GIRDLE_OF_VICTORY = null,
cprnm_ItemType_SHARD_REEL_GLASS_CASE_OF_EMOTION = null,
cprnm_ItemType_SHARD_REEL_GLORY_SEEKER = null,
cprnm_ItemType_SHARD_REEL_GOLD_AX_SILVER_AX = null,
cprnm_ItemType_SHARD_REEL_GOLD_RUSH = null,
cprnm_ItemType_SHARD_REEL_GOOD_SLEEPING_BED = null,
cprnm_ItemType_SHARD_REEL_GOURD = null,
cprnm_ItemType_SHARD_REEL_GREAVES_OF_PLEIAS = null,
cprnm_ItemType_SHARD_REEL_GRIEVOUS_BODILY_HARM = null,
cprnm_ItemType_SHARD_REEL_HAMMER_OF_WICKED_BEATS = null,
cprnm_ItemType_SHARD_REEL_HAMMER_TIME = null,
cprnm_ItemType_SHARD_REEL_HANDY_RASP = null,
cprnm_ItemType_SHARD_REEL_HEART_HAT = null,
cprnm_ItemType_SHARD_REEL_HEART_HEALTH_CANDY = null,
cprnm_ItemType_SHARD_REEL_HELMET_OF_FORESIGHT = null,
cprnm_ItemType_SHARD_REEL_HERMITS_PILLS = null,
cprnm_ItemType_SHARD_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT = null,
cprnm_ItemType_SHARD_REEL_HORNS_OF_WHITE_DEER = null,
cprnm_ItemType_SHARD_REEL_INTIMIDATING_BEARD = null,
cprnm_ItemType_SHARD_REEL_IRON_HELMET_OF_BIKING = null,
cprnm_ItemType_SHARD_REEL_IVY_LEAGUE_HAIRCUT = null,
cprnm_ItemType_SHARD_REEL_JAR_OF_KITTEN_TEAR = null,
cprnm_ItemType_SHARD_REEL_KINDNESS = null,
cprnm_ItemType_SHARD_REEL_LASER_POINTER = null,
cprnm_ItemType_SHARD_REEL_LEAD_ZEPPELIN = null,
cprnm_ItemType_SHARD_REEL_LIFEDRINKER = null,
cprnm_ItemType_SHARD_REEL_LORD_OF_RIVER = null,
cprnm_ItemType_SHARD_REEL_LOST_GREAVES = null,
cprnm_ItemType_SHARD_REEL_MAGATAMA = null,
cprnm_ItemType_SHARD_REEL_MAGICAL_CREAM = null,
cprnm_ItemType_SHARD_REEL_MAGICAL_HATRACK = null,
cprnm_ItemType_SHARD_REEL_MAGICAL_PEST_MAST = null,
cprnm_ItemType_SHARD_REEL_MAI_TAI_OF_IMMUNITY = null,
cprnm_ItemType_SHARD_REEL_MASK_OF_THE_ANCIENT_KING = null,
cprnm_ItemType_SHARD_REEL_MIRACLE_FURNACE_OF_BLACKSMITH = null,
cprnm_ItemType_SHARD_REEL_MJOLNIRBY = null,
cprnm_ItemType_SHARD_REEL_MYSTERIOUS_EGG = null,
cprnm_ItemType_SHARD_REEL_MYSTICAL_ELVEN_JUNK = null,
cprnm_ItemType_SHARD_REEL_NAVIGATION_TO_THE_PAST = null;
let cprnm_ItemType_SHARD_REEL_NECRONOMICON = null,
cprnm_ItemType_SHARD_REEL_OGRES_BATTERING_RAM = null,
cprnm_ItemType_SHARD_REEL_ORBITAL_KITTY = null,
cprnm_ItemType_SHARD_REEL_ORB_OF_EVERLASTING_FLAVOR = null,
cprnm_ItemType_SHARD_REEL_ORNATE_CROWN_OF_THE_GM = null,
cprnm_ItemType_SHARD_REEL_PIECE_OF_ACOLYTE_STATUE = null,
cprnm_ItemType_SHARD_REEL_POCKET_PROTECTOR = null,
cprnm_ItemType_SHARD_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION = null,
cprnm_ItemType_SHARD_REEL_PORTABLE_NUTRITIOUS_DIET = null,
cprnm_ItemType_SHARD_REEL_POWER_OF_SCIENCE = null,
cprnm_ItemType_SHARD_REEL_PURIFICATION_ROBE = null,
cprnm_ItemType_SHARD_REEL_PYRAMID_POWER = null,
cprnm_ItemType_SHARD_REEL_RATTLING_SABRE = null,
cprnm_ItemType_SHARD_REEL_REMOTE_COMMUNICATION_FLOWER = null,
cprnm_ItemType_SHARD_REEL_RING_OF_TEMPTATION = null,
cprnm_ItemType_SHARD_REEL_ROCKET_CLOAK = null,
cprnm_ItemType_SHARD_REEL_ROD_OF_WITTY_PARTY_BANTER = null,
cprnm_ItemType_SHARD_REEL_RUBY_FLIP_FLOPS = null,
cprnm_ItemType_SHARD_REEL_SAMURAI_SWORD = null,
cprnm_ItemType_SHARD_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS = null,
cprnm_ItemType_SHARD_REEL_SAND_STORM = null,
cprnm_ItemType_SHARD_REEL_SECRET_HAND_SCROLL = null,
cprnm_ItemType_SHARD_REEL_SHINING_HOLY_TREE = null,
cprnm_ItemType_SHARD_REEL_SHINING_LIGHT_OF_FIREFLY = null,
cprnm_ItemType_SHARD_REEL_SHOES_OF_THE_MAD_GOD = null,
cprnm_ItemType_SHARD_REEL_SHOVEL = null,
cprnm_ItemType_SHARD_REEL_SHRIMPISH_CREATURE = null,
cprnm_ItemType_SHARD_REEL_SICK_MULLET = null,
cprnm_ItemType_SHARD_REEL_SOUL_FOR_POWER_VOLUME_45 = null,
cprnm_ItemType_SHARD_REEL_STEAM_ENGINE = null,
cprnm_ItemType_SHARD_REEL_SUNBLOCK_GOGGLES = null,
cprnm_ItemType_SHARD_REEL_SUPER_SPIKEY_SPEAR = null,
cprnm_ItemType_SHARD_REEL_SWORD_OF_DESPAIR = null,
cprnm_ItemType_SHARD_REEL_TAROT_DECK_OF_HYPERBOLE = null,
cprnm_ItemType_SHARD_REEL_THE_1_RING = null,
cprnm_ItemType_SHARD_REEL_THE_COMPENSATOR = null,
cprnm_ItemType_SHARD_REEL_THE_MAD_GODS_TRIDENT = null,
cprnm_ItemType_SHARD_REEL_THE_SHIELD_STOPS_YOU = null,
cprnm_ItemType_SHARD_REEL_THE_SPEAR_BRINGS_VICTORY = null,
cprnm_ItemType_SHARD_REEL_THINKING_CAP = null,
cprnm_ItemType_SHARD_REEL_TIGER_SALVE = null,
cprnm_ItemType_SHARD_REEL_TIGER_UNDERWEAR = null,
cprnm_ItemType_SHARD_REEL_TOME_OF_CURSED_HORTICULTURE = null,
cprnm_ItemType_SHARD_REEL_TOME_OF_FORBIDDEN_TRIVIA = null,
cprnm_ItemType_SHARD_REEL_TRIASSIC_TRINKET = null,
cprnm_ItemType_SHARD_REEL_UNICORN_PUKE = null,
cprnm_ItemType_SHARD_REEL_UPHOLSTERED_THRONE = null,
cprnm_ItemType_SHARD_REEL_WARRIORS_HELMET = null,
cprnm_ItemType_SHARD_REEL_WRAITH_BARRIER = null,
cprnm_ItemType_SHARD_REEL_YODELING_SWORD = null;
let cprnm_ItemType_SHARD_RINGS_OF_A_FEATHER = null,
cprnm_ItemType_SHARD_RING_OF_FIRE = null,
cprnm_ItemType_SHARD_RING_OF_ILL_WILL = null,
cprnm_ItemType_SHARD_RING_OF_THE_SQUIRREL = null,
cprnm_ItemType_SHARD_ROLL_OF_DUCT_TAPE = null,
cprnm_ItemType_SHARD_SACRED_CODEX = null,
cprnm_ItemType_SHARD_SELF_PRESERVER = null,
cprnm_ItemType_SHARD_SOUL_PUPPET = null,
cprnm_ItemType_SHARD_STAFF_OF_BOSS_FIGHTING = null,
cprnm_ItemType_SHARD_SWEATBAND_OF_TRAINING_MONTAGES = null,
cprnm_ItemType_SHARD_THE_HOLY_PAIL = null,
cprnm_ItemType_SHARD_THE_HUSTLE = null,
cprnm_ItemType_SHARD_THE_UGLY_STICK = null,
cprnm_ItemType_SHARD_TIME_KILLER = null,
cprnm_ItemType_SHARD_UNTESTED_JETPACK = null,
cprnm_ItemType_SHARD_VOLATILE_SMOOTHIE = null,
cprnm_ItemType_SHARD_VORPAL_BOOMERANG = null,
cprnm_ItemType_SHARD_WAR_SANDALS = null,
cprnm_ItemType_SHARD_WILDYS_HAT = null,
cprnm_ItemType_SHARD_WIZARDY_FOR_IDIOTS = null,
cprnm_ItemType_SHIMMER_DUST = null,
cprnm_ItemType_SHINING_HOLY_TREE = null,
cprnm_ItemType_SHINING_LIGHT_OF_FIREFLY = null,
cprnm_ItemType_SHINY_BOTTLECAP = null,
cprnm_ItemType_SHOES_OF_THE_MAD_GOD = null,
cprnm_ItemType_SHOP_REFRESH = null,
cprnm_ItemType_SHOT_IN_THE_ARM = null,
cprnm_ItemType_SHOT_IN_THE_ARM_2_ORDER = null,
cprnm_ItemType_SHOT_IN_THE_ARM_3_ORDER = null,
cprnm_ItemType_SHOVEL = null,
cprnm_ItemType_SHRIMPISH_CREATURE = null,
cprnm_ItemType_SHRINE_ROLL_CRYSTAL = null,
cprnm_ItemType_SHRINE_ROLL_STONE = null,
cprnm_ItemType_SICK_MULLET = null,
cprnm_ItemType_SIDE_OF_BACON = null,
cprnm_ItemType_SILVER_CHEST_ROLL_X1 = null,
cprnm_ItemType_SILVER_ORE = null,
cprnm_ItemType_SKIN_ABYSS_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_ABYSS_DRAGON_WINTER = null,
cprnm_ItemType_SKIN_ANCIENT_DWARF_MECHA = null,
cprnm_ItemType_SKIN_ANGELIC_HERALD_PIGEON = null,
cprnm_ItemType_SKIN_ANGEL_DRAGON_FALLEN = null,
cprnm_ItemType_SKIN_ANGEL_DRAGON_USERCONTEST = null,
cprnm_ItemType_SKIN_AQUATIC_MAN_MANATEE = null,
cprnm_ItemType_SKIN_AQUATIC_MAN_MASTERY = null,
cprnm_ItemType_SKIN_BANSHEE_BUTTON_DOLL = null,
cprnm_ItemType_SKIN_BANSHEE_MASTERY = null,
cprnm_ItemType_SKIN_BARDBARIAN_CHAMPION = null,
cprnm_ItemType_SKIN_BARDBARIAN_EMO_FREDDIE = null,
cprnm_ItemType_SKIN_BARDBARIAN_HIGHSCORE = null;
let cprnm_ItemType_SKIN_BARDBARIAN_MASTERY = null,
cprnm_ItemType_SKIN_BARDBARIAN_WOOD_ELF = null,
cprnm_ItemType_SKIN_BLACK_WING_MECHA = null,
cprnm_ItemType_SKIN_BONE_DRAGON_ADAMANTIUM = null,
cprnm_ItemType_SKIN_BONE_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_BONE_DRAGON_PEPPERMINT = null,
cprnm_ItemType_SKIN_BROZERKER_BODYGUARD = null,
cprnm_ItemType_SKIN_BROZERKER_MASTERY = null,
cprnm_ItemType_SKIN_BROZERKER_VEGAS_DUDE = null,
cprnm_ItemType_SKIN_BROZERKER_VETERAN = null,
cprnm_ItemType_SKIN_BULWARK_ANGEL_SWAN = null,
cprnm_ItemType_SKIN_BURNT_ONE_VOODOO = null,
cprnm_ItemType_SKIN_CATAPULT_KNIGHT_MASTERY = null,
cprnm_ItemType_SKIN_CATAPULT_KNIGHT_UNICORN = null,
cprnm_ItemType_SKIN_CENTAUR_OF_ATTENTION_MASTERY = null,
cprnm_ItemType_SKIN_CENTAUR_RESPLENDENT = null,
cprnm_ItemType_SKIN_COSMIC_ELF_ALIEN = null,
cprnm_ItemType_SKIN_COSMIC_ELF_HORROR = null,
cprnm_ItemType_SKIN_COSMIC_ELF_MASTERY = null,
cprnm_ItemType_SKIN_COSMIC_ELF_VELVETEEN_FOX = null,
cprnm_ItemType_SKIN_CRIMSON_WITCH_CRIMSON_PANDA = null,
cprnm_ItemType_SKIN_CRIMSON_WITCH_CROW = null,
cprnm_ItemType_SKIN_CRIMSON_WITCH_MASTERY = null,
cprnm_ItemType_SKIN_CRIMSON_WITCH_SORCERESS = null,
cprnm_ItemType_SKIN_CURSED_STATUE_HAWAII = null,
cprnm_ItemType_SKIN_CURSED_STATUE_MEER = null,
cprnm_ItemType_SKIN_CURSED_STATUE_USERCONTEST = null,
cprnm_ItemType_SKIN_CYCLOPS_WIZARD_CYCLEOPS = null,
cprnm_ItemType_SKIN_CYCLOPS_WIZARD_MASTERY = null,
cprnm_ItemType_SKIN_CYCLOPS_WIZARD_VALENTINE = null,
cprnm_ItemType_SKIN_DARK_DRACUL_FLYING_SQUIRREL = null,
cprnm_ItemType_SKIN_DARK_DRACUL_HORROR = null,
cprnm_ItemType_SKIN_DARK_DRACUL_MASTERY = null,
cprnm_ItemType_SKIN_DARK_HORSE_MASTERY = null,
cprnm_ItemType_SKIN_DARK_HORSE_MECH = null,
cprnm_ItemType_SKIN_DARK_HORSE_ZEBRA = null,
cprnm_ItemType_SKIN_DEEP_DRAGON_WYRM = null,
cprnm_ItemType_SKIN_DEMON_TOTEM_KITTEN = null,
cprnm_ItemType_SKIN_DEMON_TOTEM_MASTERY = null,
cprnm_ItemType_SKIN_DOPPELGANGER_MASTERY = null,
cprnm_ItemType_SKIN_DOPPELGANGER_MOLTEN = null,
cprnm_ItemType_SKIN_DRAGON_LADY_3RD_ANNIVERSARY = null,
cprnm_ItemType_SKIN_DRAGON_LADY_ANNIVERSARY_1000TH = null,
cprnm_ItemType_SKIN_DRAGON_LADY_MASTERY = null,
cprnm_ItemType_SKIN_DRAGON_LADY_SPACE_KNIGHT = null,
cprnm_ItemType_SKIN_DRAGON_SLAYER_UNICORN = null,
cprnm_ItemType_SKIN_DRAGON_SLAYER_WINTER = null,
cprnm_ItemType_SKIN_DRAGZILLA_DRAG = null,
cprnm_ItemType_SKIN_DRAGZILLA_MASTERY = null,
cprnm_ItemType_SKIN_DRAGZILLA_MECHA = null;
let cprnm_ItemType_SKIN_DRAGZILLA_ZILLA = null,
cprnm_ItemType_SKIN_DRUIDINATRIX_EASTER = null,
cprnm_ItemType_SKIN_DRUIDINATRIX_MASTERY = null,
cprnm_ItemType_SKIN_DRUIDINATRIX_SPRING = null,
cprnm_ItemType_SKIN_DUNGEON_MAN_MASTERY = null,
cprnm_ItemType_SKIN_DUNGEON_MAN_MECHA = null,
cprnm_ItemType_SKIN_DUST_DEVIL_MASTERY = null,
cprnm_ItemType_SKIN_DUST_DEVIL_PARISIAN = null,
cprnm_ItemType_SKIN_DWARVEN_ARCHER_DWARVEN_HUNTRESS = null,
cprnm_ItemType_SKIN_DWARVEN_ARCHER_MASTERY = null,
cprnm_ItemType_SKIN_DWARVEN_ARCHER_ROMANTIC = null,
cprnm_ItemType_SKIN_ELECTROYETI_3RD_ANNIVERSARY = null,
cprnm_ItemType_SKIN_ELECTROYETI_MASTERY = null,
cprnm_ItemType_SKIN_ELECTROYETI_SASQUATCH = null,
cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_EASTER = null,
cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_MASTERY = null,
cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_USERCONTEST = null,
cprnm_ItemType_SKIN_FAITH_HEALER_CTHULU = null,
cprnm_ItemType_SKIN_FAITH_HEALER_MASTERY = null,
cprnm_ItemType_SKIN_FROST_GIANT_FLAMING = null,
cprnm_ItemType_SKIN_FROST_GIANT_FURIOUS = null,
cprnm_ItemType_SKIN_FROST_GIANT_MASTERY = null,
cprnm_ItemType_SKIN_GENIE_GOLDEN = null,
cprnm_ItemType_SKIN_GENIE_RANDOM_TUSKER = null,
cprnm_ItemType_SKIN_GENIE_TARNISHED_DJINN = null,
cprnm_ItemType_SKIN_GRAND_HUNTRESS_LEOPARD = null,
cprnm_ItemType_SKIN_GROOVY_DRUID_DISCO = null,
cprnm_ItemType_SKIN_GROOVY_DRUID_MASTERY = null,
cprnm_ItemType_SKIN_HYDRA_MASTERY = null,
cprnm_ItemType_SKIN_HYDRA_SEA_DRAGON = null,
cprnm_ItemType_SKIN_KARAOKE_KING_MONKEY = null,
cprnm_ItemType_SKIN_KRAKEN_KING_MASTERY = null,
cprnm_ItemType_SKIN_KRAKEN_KING_MECHALORD = null,
cprnm_ItemType_SKIN_LAST_DEFENDER_BUFFALO = null,
cprnm_ItemType_SKIN_MAGIC_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_MAGIC_DRAGON_SPAGHETTI = null,
cprnm_ItemType_SKIN_MEDUSA_BLACK_MAMBA = null,
cprnm_ItemType_SKIN_MEDUSA_HORROR = null,
cprnm_ItemType_SKIN_MEDUSA_MASTERY = null,
cprnm_ItemType_SKIN_MINOTAUR_HOLSTEIN = null,
cprnm_ItemType_SKIN_MINOTAUR_MARAUDER = null,
cprnm_ItemType_SKIN_MINOTAUR_MASTERY = null,
cprnm_ItemType_SKIN_MISTRESS_MANICURE_BAT = null,
cprnm_ItemType_SKIN_MISTRESS_MANICURE_MASTERY = null,
cprnm_ItemType_SKIN_MOON_DRAKE_FESTIVE_FAIRY = null,
cprnm_ItemType_SKIN_MOON_DRAKE_MASTERY = null,
cprnm_ItemType_SKIN_MOON_DRAKE_MECHA = null,
cprnm_ItemType_SKIN_MOON_DRAKE_USERCONTEST = null,
cprnm_ItemType_SKIN_NINJA_DWARF_DATENIGHT = null,
cprnm_ItemType_SKIN_NINJA_DWARF_FRIGGING_RABBIT = null;
let cprnm_ItemType_SKIN_NINJA_DWARF_MASTERY = null,
cprnm_ItemType_SKIN_NPC_ANUBIS_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_ORC_MONK_MASTERY = null,
cprnm_ItemType_SKIN_ORC_MONK_MECHA = null,
cprnm_ItemType_SKIN_ORC_MONK_ORCS = null,
cprnm_ItemType_SKIN_ORC_MONK_UNCLE = null,
cprnm_ItemType_SKIN_PCH_ANUBIS_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_PIRATE_MASTERY = null,
cprnm_ItemType_SKIN_PIRATE_SPACE = null,
cprnm_ItemType_SKIN_PLANT_SOUL_COUNTRY = null,
cprnm_ItemType_SKIN_PLANT_SOUL_HORSEY_SOUL = null,
cprnm_ItemType_SKIN_PLANT_SOUL_MASTERY = null,
cprnm_ItemType_SKIN_POLEMASTER_GYMNAST = null,
cprnm_ItemType_SKIN_POLEMASTER_MASTERY = null,
cprnm_ItemType_SKIN_RABID_DRAGON_DOGGY = null,
cprnm_ItemType_SKIN_RABID_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_RAGING_REVENANT_DOCTORING_REVENANT = null,
cprnm_ItemType_SKIN_RAGING_REVENANT_MASTERY = null,
cprnm_ItemType_SKIN_ROLLER_WARRIOR_DERBY_GIRL = null,
cprnm_ItemType_SKIN_ROLLER_WARRIOR_LUAU = null,
cprnm_ItemType_SKIN_ROLLER_WARRIOR_MASTERY = null,
cprnm_ItemType_SKIN_ROLLER_WARRIOR_VALENTINE = null,
cprnm_ItemType_SKIN_SADISTIC_DANCER_MECHA = null,
cprnm_ItemType_SKIN_SADISTIC_DANCER_WINTER = null,
cprnm_ItemType_SKIN_SATYR_MASTERY = null,
cprnm_ItemType_SKIN_SATYR_WOLF = null,
cprnm_ItemType_SKIN_SAVAGE_CUTIE_MASTERY = null,
cprnm_ItemType_SKIN_SAVAGE_CUTIE_RAVAGER = null,
cprnm_ItemType_SKIN_SAVAGE_CUTIE_TADPOLE = null,
cprnm_ItemType_SKIN_SHADOW_ASSASSIN_MASTERY = null,
cprnm_ItemType_SKIN_SHADOW_ASSASSIN_WATCH = null,
cprnm_ItemType_SKIN_SHADOW_OF_SVEN_MECHA = null,
cprnm_ItemType_SKIN_SILENT_SPIRIT_CLOWN = null,
cprnm_ItemType_SKIN_SILENT_SPIRIT_MASTERY = null,
cprnm_ItemType_SKIN_SKELETON_DEER_ASCENDANT_DEER = null,
cprnm_ItemType_SKIN_SKELETON_DEER_MASTERY = null,
cprnm_ItemType_SKIN_SKELETON_KING_ASCENDANT = null,
cprnm_ItemType_SKIN_SKELETON_KING_MASTERY = null,
cprnm_ItemType_SKIN_SNAPPER_BONE_LIZARD_BONE = null,
cprnm_ItemType_SKIN_SNAP_DRAGON_EVERGLADES = null,
cprnm_ItemType_SKIN_SNAP_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_SNIPER_WOLF_ASTRAL_SPIRIT = null,
cprnm_ItemType_SKIN_SNIPER_WOLF_DANCER = null,
cprnm_ItemType_SKIN_SOJOURNER_SORCERESS_CHRISTMAS = null,
cprnm_ItemType_SKIN_SPECTRAL_DRAGON_EASTER = null,
cprnm_ItemType_SKIN_SPECTRAL_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_SPECTRAL_DRAGON_REDDRAGON = null,
cprnm_ItemType_SKIN_SPIDER_QUEEN_MASTERY = null,
cprnm_ItemType_SKIN_SPIDER_QUEEN_TURTLE = null,
cprnm_ItemType_SKIN_SPIKEY_DRAGON_MASTERY = null;
let cprnm_ItemType_SKIN_SPIKEY_DRAGON_MECHA = null,
cprnm_ItemType_SKIN_SPIKEY_DRAGON_ROTUNDITY = null,
cprnm_ItemType_SKIN_STEPLADDER_BROTHERS_HORROR = null,
cprnm_ItemType_SKIN_STORM_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_STOWAWAY_BUISNESS = null,
cprnm_ItemType_SKIN_STOWAWAY_MASTERY = null,
cprnm_ItemType_SKIN_STOWAWAY_SANTAS_HELPER = null,
cprnm_ItemType_SKIN_SUN_SEEKER_SNOW = null,
cprnm_ItemType_SKIN_TOMB_ANGEL_USERCONTEST = null,
cprnm_ItemType_SKIN_TOMB_ANGEL_WINTER = null,
cprnm_ItemType_SKIN_UMLAUT_THE_FIRST_MASTERY = null,
cprnm_ItemType_SKIN_UNICORGI_ARMORED = null,
cprnm_ItemType_SKIN_UNICORGI_MASTERY = null,
cprnm_ItemType_SKIN_UNICORGI_PIZZA_MANAGER_CORGI = null,
cprnm_ItemType_SKIN_UNICORGI_RAINBOW = null,
cprnm_ItemType_SKIN_UNRIPE_MYTHOLOGY_WINTER = null,
cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_3RD_ANNIVERSARY = null,
cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_BALLERINA = null,
cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_MASTERY = null,
cprnm_ItemType_SKIN_VERMILION_PRIESTESS_CLERIC_OF_FALCONERS = null,
cprnm_ItemType_SKIN_VOID_WYVERN_IMAGINATION = null,
cprnm_ItemType_SKIN_VOID_WYVERN_MASTERY = null,
cprnm_ItemType_SKIN_VOID_WYVERN_TAPIR = null,
cprnm_ItemType_SKIN_VULTURE_DRAGON_MASTERY = null,
cprnm_ItemType_SKIN_WEE_WITCH_EASTER = null,
cprnm_ItemType_SKIN_WEE_WITCH_HORROR = null,
cprnm_ItemType_SKIN_WEE_WITCH_MASTERY = null,
cprnm_ItemType_SKIN_WEREDRAGON_FLORIST = null,
cprnm_ItemType_SKIN_WEREDRAGON_MASTERY = null,
cprnm_ItemType_SKIN_WHITE_TIGRESS_CAT_WOMAN = null,
cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_DIGITAL = null,
cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_MASTERY = null,
cprnm_ItemType_SLIGHTLY_EVIL_MAGIC_MIRROR = null,
cprnm_ItemType_SMARTY_PANTS = null,
cprnm_ItemType_SNAKE_OIL = null,
cprnm_ItemType_SNAZZY_VEST = null,
cprnm_ItemType_SOCK_FULL_O_PENNIES = null,
cprnm_ItemType_SOUL_CHEST_ROLL = null,
cprnm_ItemType_SOUL_FOR_POWER_VOLUME_45 = null,
cprnm_ItemType_SOUL_OF_DRAGONS = null,
cprnm_ItemType_SOUL_PUPPET = null,
cprnm_ItemType_SPARKLE_PONY_KEYCHAIN = null,
cprnm_ItemType_SPIDER_BOMB = null,
cprnm_ItemType_SPUD_GUN = null,
cprnm_ItemType_SREEL_FEATHER_WEIGHT_FOIL = null,
cprnm_ItemType_STAFF_OF_BOSS_FIGHTING = null,
cprnm_ItemType_STAMINA_CONSUMABLE = null,
cprnm_ItemType_STAMINA_COST_RESET = null,
cprnm_ItemType_STAY_BOARD = null,
cprnm_ItemType_STEAM_ENGINE = null;
let cprnm_ItemType_STICK_ON_MOUSTACHE = null,
cprnm_ItemType_STOLEN_SNEAKERS = null,
cprnm_ItemType_STONE_ABYSS_DRAGON = null,
cprnm_ItemType_STONE_ANCIENT_DWARF = null,
cprnm_ItemType_STONE_ANGELIC_HERALD = null,
cprnm_ItemType_STONE_ANGEL_DRAGON = null,
cprnm_ItemType_STONE_AQUATIC_MAN = null,
cprnm_ItemType_STONE_BANSHEE = null,
cprnm_ItemType_STONE_BARDBARIAN = null,
cprnm_ItemType_STONE_BLACK_WING = null,
cprnm_ItemType_STONE_BONE_DRAGON = null,
cprnm_ItemType_STONE_BROZERKER = null,
cprnm_ItemType_STONE_BULWARK_ANGEL = null,
cprnm_ItemType_STONE_BURNT_ONE = null,
cprnm_ItemType_STONE_CATAPULT_KNIGHT = null,
cprnm_ItemType_STONE_CENTAUR_OF_ATTENTION = null,
cprnm_ItemType_STONE_CLAW_MAN = null,
cprnm_ItemType_STONE_COSMIC_ELF = null,
cprnm_ItemType_STONE_CRIMSON_WITCH = null,
cprnm_ItemType_STONE_CURSED_STATUE = null,
cprnm_ItemType_STONE_CYCLOPS_WIZARD = null,
cprnm_ItemType_STONE_DARK_DRACUL = null,
cprnm_ItemType_STONE_DARK_HERO = null,
cprnm_ItemType_STONE_DARK_HORSE = null,
cprnm_ItemType_STONE_DEEP_DRAGON = null,
cprnm_ItemType_STONE_DEMON_TOTEM = null,
cprnm_ItemType_STONE_DIGGER_MOLE = null,
cprnm_ItemType_STONE_DOPPELGANGER = null,
cprnm_ItemType_STONE_DRAGON_LADY = null,
cprnm_ItemType_STONE_DRAGON_SLAYER = null,
cprnm_ItemType_STONE_DRAGZILLA = null,
cprnm_ItemType_STONE_DRUIDINATRIX = null,
cprnm_ItemType_STONE_DUNGEON_MAN = null,
cprnm_ItemType_STONE_DUST_DEVIL = null,
cprnm_ItemType_STONE_DWARVEN_ARCHER = null,
cprnm_ItemType_STONE_ELECTROYETI = null,
cprnm_ItemType_STONE_ETERNAL_ENCHANTER = null,
cprnm_ItemType_STONE_FAITH_HEALER = null,
cprnm_ItemType_STONE_FORGOTTEN_DRAGON = null,
cprnm_ItemType_STONE_FROST_GIANT = null,
cprnm_ItemType_STONE_GENIE = null,
cprnm_ItemType_STONE_GRAND_HUNTRESS = null,
cprnm_ItemType_STONE_GREED_DRAGON = null,
cprnm_ItemType_STONE_GROOVY_DRUID = null,
cprnm_ItemType_STONE_HYDRA = null,
cprnm_ItemType_STONE_KARAOKE_KING = null,
cprnm_ItemType_STONE_KRAKEN_KING = null,
cprnm_ItemType_STONE_LAST_DEFENDER = null,
cprnm_ItemType_STONE_MAGIC_DRAGON = null,
cprnm_ItemType_STONE_MEDUSA = null;
let cprnm_ItemType_STONE_MINOTAUR = null,
cprnm_ItemType_STONE_MISTRESS_MANICURE = null,
cprnm_ItemType_STONE_MOON_DRAKE = null,
cprnm_ItemType_STONE_NINJA_DWARF = null,
cprnm_ItemType_STONE_ORC_MONK = null,
cprnm_ItemType_STONE_PCH_ANUBIS_DRAGON = null,
cprnm_ItemType_STONE_PIRATE = null,
cprnm_ItemType_STONE_PLAGUE_ENTREPRENEUR = null,
cprnm_ItemType_STONE_PLANT_SOUL = null,
cprnm_ItemType_STONE_POLEMASTER = null,
cprnm_ItemType_STONE_RABID_DRAGON = null,
cprnm_ItemType_STONE_RAGING_REVENANT = null,
cprnm_ItemType_STONE_ROLLER_WARRIOR = null,
cprnm_ItemType_STONE_SADISTIC_DANCER = null,
cprnm_ItemType_STONE_SATYR = null,
cprnm_ItemType_STONE_SAVAGE_CUTIE = null,
cprnm_ItemType_STONE_SHADOW_ASSASSIN = null,
cprnm_ItemType_STONE_SHADOW_OF_SVEN = null,
cprnm_ItemType_STONE_SILENT_SPIRIT = null,
cprnm_ItemType_STONE_SKELETON_KING = null,
cprnm_ItemType_STONE_SNAPPER_BONE = null,
cprnm_ItemType_STONE_SNAP_DRAGON = null,
cprnm_ItemType_STONE_SNIPER_WOLF = null,
cprnm_ItemType_STONE_SOJOURNER_SORCERESS = null,
cprnm_ItemType_STONE_SPECTRAL_DRAGON = null,
cprnm_ItemType_STONE_SPIDER_QUEEN = null,
cprnm_ItemType_STONE_SPIKEY_DRAGON = null,
cprnm_ItemType_STONE_STEPLADDER_BROTHERS = null,
cprnm_ItemType_STONE_STORM_DRAGON = null,
cprnm_ItemType_STONE_STOWAWAY = null,
cprnm_ItemType_STONE_SUN_SEEKER = null,
cprnm_ItemType_STONE_TOMB_ANGEL = null,
cprnm_ItemType_STONE_TRIPLE_THREAT = null,
cprnm_ItemType_STONE_UMLAUT_THE_FIRST = null,
cprnm_ItemType_STONE_UNICORGI = null,
cprnm_ItemType_STONE_UNRIPE_MYTHOLOGY = null,
cprnm_ItemType_STONE_UNSTABLE_UNDERSTUDY = null,
cprnm_ItemType_STONE_VERMILION_PRIESTESS = null,
cprnm_ItemType_STONE_VILE_BILE = null,
cprnm_ItemType_STONE_VOID_WYVERN = null,
cprnm_ItemType_STONE_VULTURE_DRAGON = null,
cprnm_ItemType_STONE_WEE_WITCH = null,
cprnm_ItemType_STONE_WEREDRAGON = null,
cprnm_ItemType_STONE_WHITE_TIGRESS = null,
cprnm_ItemType_STONE_ZOMBIE_SQUIRE = null,
cprnm_ItemType_SUNBLOCK_GOGGLES = null,
cprnm_ItemType_SUPER_SPIKEY_SPEAR = null,
cprnm_ItemType_SVENS_SWORD_OF_DOOOOOM = null,
cprnm_ItemType_SWASH_BUCKLER = null,
cprnm_ItemType_SWEATBAND_OF_TRAINING_MONTAGES = null;
let cprnm_ItemType_SWORDY_MCEPICPANTS = null,
cprnm_ItemType_SWORD_OF_DESPAIR = null,
cprnm_ItemType_TAROT_DECK_OF_HYPERBOLE = null,
cprnm_ItemType_TEAM_XP_BONUS_ITEM_12_HOUR = null,
cprnm_ItemType_TEAM_XP_BONUS_ITEM_24_HOUR = null,
cprnm_ItemType_TEAM_XP_BONUS_ITEM_72_HOUR = null,
cprnm_ItemType_TEN_FOOT_POLE = null,
cprnm_ItemType_THE_1_RING = null,
cprnm_ItemType_THE_COMPENSATOR = null,
cprnm_ItemType_THE_HOLY_PAIL = null,
cprnm_ItemType_THE_HUSTLE = null,
cprnm_ItemType_THE_MAD_GODS_TRIDENT = null,
cprnm_ItemType_THE_POWER_OF_MEDICINE = null,
cprnm_ItemType_THE_POWER_OF_MEDICINE_2_ORDER = null,
cprnm_ItemType_THE_POWER_OF_MEDICINE_3_ORDER = null,
cprnm_ItemType_THE_POWER_OF_MEDICINE_4_ORDER = null,
cprnm_ItemType_THE_SHIELD_STOPS_YOU = null,
cprnm_ItemType_THE_SPEAR_BRINGS_VICTORY = null,
cprnm_ItemType_THE_UGLY_STICK = null,
cprnm_ItemType_THINKING_CAP = null,
cprnm_ItemType_THONG_OF_VITALITY = null,
cprnm_ItemType_TIGER_SALVE = null,
cprnm_ItemType_TIGER_UNDERWEAR = null,
cprnm_ItemType_TIME_KILLER = null,
cprnm_ItemType_TIME_SAVER = null,
cprnm_ItemType_TOME_OF_CURSED_HORTICULTURE = null,
cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA = null,
cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_2_ORDER = null,
cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_3_ORDER = null,
cprnm_ItemType_TOME_OF_NASTY_BEHAVIOR = null,
cprnm_ItemType_TRIASSIC_TRINKET = null,
cprnm_ItemType_TUNNEL_VISION = null,
cprnm_ItemType_UNICORN_PUKE = null,
cprnm_ItemType_UNTESTED_JETPACK = null,
cprnm_ItemType_UPHOLSTERED_THRONE = null,
cprnm_ItemType_VAMPIRE_BUNNYEARS = null,
cprnm_ItemType_VANISHING_SCROLL = null,
cprnm_ItemType_VIP5_CONSUMABLE = null,
cprnm_ItemType_VOID_DUST = null,
cprnm_ItemType_VOLATILE_SMOOTHIE = null,
cprnm_ItemType_VOLCANIC_BLADE = null,
cprnm_ItemType_VOLCANIC_ORE = null,
cprnm_ItemType_VORPAL_BOOMERANG = null,
cprnm_ItemType_WAND_OF_GOLD_SPARKLES = null,
cprnm_ItemType_WARRIORS_HELMET = null,
cprnm_ItemType_WAR_SANDALS = null,
cprnm_ItemType_WHITE_PICKET_SHIELD = null,
cprnm_ItemType_WICKED_MULLET = null,
cprnm_ItemType_WILDYS_HAT = null,
cprnm_ItemType_WIZARDY_FOR_IDIOTS = null;
let cprnm_ItemType_WORLD_EGG = null,
cprnm_ItemType_WRAITH_BARRIER = null,
cprnm_ItemType_YA_VAMPIRE_SERIES = null,
cprnm_ItemType_YODELING_SWORD = null,
cprnm_ItemType_values0 = null,
cprnm_ItemType_$callClinit = () => {
    cprnm_ItemType_$callClinit = $rt_eraseClinit(cprnm_ItemType);
    cprnm_ItemType__clinit_();
},
cprnm_ItemType__clinit_ = () => {
    let var$1, var$2;
    cprnm_ItemType_DEFAULT = cprnm_ItemType__init_($rt_s(12), 0);
    cprnm_ItemType_FREE_MANS_CROWBAR = cprnm_ItemType__init_($rt_s(123), 1);
    cprnm_ItemType_MY_FIRST_SHIELD = cprnm_ItemType__init_($rt_s(124), 2);
    cprnm_ItemType_RUBBER_VEST = cprnm_ItemType__init_($rt_s(125), 3);
    cprnm_ItemType_PAPER_CROWN = cprnm_ItemType__init_($rt_s(122), 4);
    cprnm_ItemType_ENCHANTED_ELBOW_PADS = cprnm_ItemType__init_($rt_s(126), 5);
    cprnm_ItemType_GOBLIN_GROG = cprnm_ItemType__init_($rt_s(127), 6);
    cprnm_ItemType_FOAM_FINGER = cprnm_ItemType__init_($rt_s(128), 7);
    cprnm_ItemType_STOLEN_SNEAKERS = cprnm_ItemType__init_($rt_s(129), 8);
    cprnm_ItemType_BIT_O_NIP = cprnm_ItemType__init_($rt_s(130), 9);
    cprnm_ItemType_LOADED_DIE = cprnm_ItemType__init_($rt_s(131), 10);
    cprnm_ItemType_FINE_BRIE = cprnm_ItemType__init_($rt_s(132), 11);
    cprnm_ItemType_STICK_ON_MOUSTACHE = cprnm_ItemType__init_($rt_s(133), 12);
    cprnm_ItemType_SNAZZY_VEST = cprnm_ItemType__init_($rt_s(134), 13);
    cprnm_ItemType_CHUNKY_FEMUR = cprnm_ItemType__init_($rt_s(135), 14);
    cprnm_ItemType_GOBLIN_WHACKER = cprnm_ItemType__init_($rt_s(136), 15);
    cprnm_ItemType_BLOODY_BAT = cprnm_ItemType__init_($rt_s(137), 16);
    cprnm_ItemType_SWASH_BUCKLER = cprnm_ItemType__init_($rt_s(138), 17);
    cprnm_ItemType_BESSIES_BANE = cprnm_ItemType__init_($rt_s(139), 18);
    cprnm_ItemType_LUCKY_ORCS_FOOT = cprnm_ItemType__init_($rt_s(94), 19);
    cprnm_ItemType_CAPTAINS_TIGHTPANTS = cprnm_ItemType__init_($rt_s(377), 20);
    cprnm_ItemType_PRETTY_SWEET_CAPE = cprnm_ItemType__init_($rt_s(378), 21);
    cprnm_ItemType_PROTEIN_POWDER = cprnm_ItemType__init_($rt_s(379), 22);
    cprnm_ItemType_LOAFERS_OF_ALACRITY = cprnm_ItemType__init_($rt_s(380), 23);
    cprnm_ItemType_SMARTY_PANTS = cprnm_ItemType__init_($rt_s(381), 24);
    cprnm_ItemType_GLOVES_OF_CRIT = cprnm_ItemType__init_($rt_s(382), 25);
    cprnm_ItemType_SPARKLE_PONY_KEYCHAIN = cprnm_ItemType__init_($rt_s(383), 26);
    cprnm_ItemType_BANJO_OF_DUELING = cprnm_ItemType__init_($rt_s(384), 27);
    cprnm_ItemType_SHINY_BOTTLECAP = cprnm_ItemType__init_($rt_s(385), 28);
    cprnm_ItemType_HEMP_BRACELET = cprnm_ItemType__init_($rt_s(386), 29);
    cprnm_ItemType_YA_VAMPIRE_SERIES = cprnm_ItemType__init_($rt_s(387), 30);
    cprnm_ItemType_WAND_OF_GOLD_SPARKLES = cprnm_ItemType__init_($rt_s(388), 31);
    cprnm_ItemType_RAW_EGG = cprnm_ItemType__init_($rt_s(389), 32);
    cprnm_ItemType_ARTIFACT_OF_UNIMAGINABLE_POWER = cprnm_ItemType__init_($rt_s(390), 33);
    cprnm_ItemType_ARCANE_SLACKS = cprnm_ItemType__init_($rt_s(391), 34);
    cprnm_ItemType_DAISY_CHAINSAW = cprnm_ItemType__init_($rt_s(392), 35);
    cprnm_ItemType_CHAPS_OF_ENDURANCE = cprnm_ItemType__init_($rt_s(393), 36);
    cprnm_ItemType_SIDE_OF_BACON = cprnm_ItemType__init_($rt_s(394), 37);
    cprnm_ItemType_HIPPY_GLO_STICKS = cprnm_ItemType__init_($rt_s(395), 38);
    cprnm_ItemType_MAGIC_EIGHT_BALL = cprnm_ItemType__init_($rt_s(396), 39);
    cprnm_ItemType_KING_JEFFS_CROSSBOW = cprnm_ItemType__init_($rt_s(397), 40);
    cprnm_ItemType_DIRECTORS_CUT = cprnm_ItemType__init_($rt_s(398), 41);
    cprnm_ItemType_PLUCKY_HEROINES_SHORTBOW = cprnm_ItemType__init_($rt_s(399), 42);
    cprnm_ItemType_BLISSFUL_IGNORANCE = cprnm_ItemType__init_($rt_s(400), 43);
    cprnm_ItemType_EXCALIBURTREYNOLDS = cprnm_ItemType__init_($rt_s(401), 44);
    cprnm_ItemType_BUTTER_KNIFE = cprnm_ItemType__init_($rt_s(402), 45);
    cprnm_ItemType_PLASTIC_VAMPIRE_TEETH = cprnm_ItemType__init_($rt_s(403), 46);
    cprnm_ItemType_THONG_OF_VITALITY = cprnm_ItemType__init_($rt_s(404), 47);
    cprnm_ItemType_LIFESIPPER = cprnm_ItemType__init_($rt_s(405), 48);
    cprnm_ItemType_SOCK_FULL_O_PENNIES = cprnm_ItemType__init_($rt_s(406), 49);
    cprnm_ItemType_PENETRABLE_ARMOR = cprnm_ItemType__init_($rt_s(407), 50);
    cprnm_ItemType_MELTY_CHOCOLATE_BAR = cprnm_ItemType__init_($rt_s(408), 51);
    cprnm_ItemType_TEN_FOOT_POLE = cprnm_ItemType__init_($rt_s(409), 52);
    cprnm_ItemType_THE_POWER_OF_MEDICINE = cprnm_ItemType__init_($rt_s(410), 53);
    cprnm_ItemType_VAMPIRE_BUNNYEARS = cprnm_ItemType__init_($rt_s(411), 54);
    cprnm_ItemType_NONSTICK_SHIELD = cprnm_ItemType__init_($rt_s(412), 55);
    cprnm_ItemType_MUSCLE_WAX = cprnm_ItemType__init_($rt_s(413), 56);
    cprnm_ItemType_RACING_STRIPES = cprnm_ItemType__init_($rt_s(414), 57);
    cprnm_ItemType_SACRED_CODEX = cprnm_ItemType__init_($rt_s(415), 58);
    cprnm_ItemType_AND_MY_AXE = cprnm_ItemType__init_($rt_s(416), 59);
    cprnm_ItemType_IMPRACTICAL_CHESTPLATE = cprnm_ItemType__init_($rt_s(417), 60);
    cprnm_ItemType_MACE_OF_FRIENDSHIP = cprnm_ItemType__init_($rt_s(418), 61);
    cprnm_ItemType_THE_UGLY_STICK = cprnm_ItemType__init_($rt_s(419), 62);
    cprnm_ItemType_GENTLEMENS_CLUB = cprnm_ItemType__init_($rt_s(420), 63);
    cprnm_ItemType_STAFF_OF_BOSS_FIGHTING = cprnm_ItemType__init_($rt_s(421), 64);
    cprnm_ItemType_DONT_TASE_ME_BOW = cprnm_ItemType__init_($rt_s(422), 65);
    cprnm_ItemType_BAG_O_HAMMERS = cprnm_ItemType__init_($rt_s(423), 66);
    cprnm_ItemType_SPUD_GUN = cprnm_ItemType__init_($rt_s(424), 67);
    cprnm_ItemType_NECRONOMICON = cprnm_ItemType__init_($rt_s(425), 68);
    cprnm_ItemType_INTIMIDATING_BEARD = cprnm_ItemType__init_($rt_s(426), 69);
    cprnm_ItemType_LEAD_ZEPPELIN = cprnm_ItemType__init_($rt_s(427), 70);
    cprnm_ItemType_LASER_POINTER = cprnm_ItemType__init_($rt_s(428), 71);
    cprnm_ItemType_GLAIVE_OF_DISMEMBERMENT = cprnm_ItemType__init_($rt_s(429), 72);
    cprnm_ItemType_ROBE_OF_SHARP_COMEBACKS = cprnm_ItemType__init_($rt_s(430), 73);
    cprnm_ItemType_THE_MAD_GODS_TRIDENT = cprnm_ItemType__init_($rt_s(431), 74);
    cprnm_ItemType_ROD_OF_BADASSERY = cprnm_ItemType__init_($rt_s(432), 75);
    cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA = cprnm_ItemType__init_($rt_s(433), 76);
    cprnm_ItemType_DEATH_METAL_BLADE = cprnm_ItemType__init_($rt_s(434), 77);
    cprnm_ItemType_SNAKE_OIL = cprnm_ItemType__init_($rt_s(435), 78);
    cprnm_ItemType_DECODER_RING = cprnm_ItemType__init_($rt_s(436), 79);
    cprnm_ItemType_AXES_OF_DUAL_WIELDING = cprnm_ItemType__init_($rt_s(437), 80);
    cprnm_ItemType_ROD_OF_TASING = cprnm_ItemType__init_($rt_s(438), 81);
    cprnm_ItemType_ORB_OF_EVERLASTING_FLAVOR = cprnm_ItemType__init_($rt_s(439), 82);
    cprnm_ItemType_THINKING_CAP = cprnm_ItemType__init_($rt_s(440), 83);
    cprnm_ItemType_THE_POWER_OF_MEDICINE_2_ORDER = cprnm_ItemType__init_($rt_s(441), 84);
    cprnm_ItemType_KINDNESS = cprnm_ItemType__init_($rt_s(442), 85);
    cprnm_ItemType_THE_COMPENSATOR = cprnm_ItemType__init_($rt_s(443), 86);
    cprnm_ItemType_MUSSEL_MILK = cprnm_ItemType__init_($rt_s(444), 87);
    cprnm_ItemType_FLAIL_OF_TOTAL_DEVASTATION = cprnm_ItemType__init_($rt_s(445), 88);
    cprnm_ItemType_SHOT_IN_THE_ARM = cprnm_ItemType__init_($rt_s(446), 89);
    cprnm_ItemType_BUNNY_SLIPPERS = cprnm_ItemType__init_($rt_s(447), 90);
    cprnm_ItemType_ADAMANTIUM_TIARA = cprnm_ItemType__init_($rt_s(448), 91);
    cprnm_ItemType_VORPAL_BOOMERANG = cprnm_ItemType__init_($rt_s(449), 92);
    cprnm_ItemType_FRAMED_DIPLOMA = cprnm_ItemType__init_($rt_s(450), 93);
    cprnm_ItemType_HEAD_BANGER = cprnm_ItemType__init_($rt_s(451), 94);
    cprnm_ItemType_SUPER_SPIKEY_SPEAR = cprnm_ItemType__init_($rt_s(452), 95);
    cprnm_ItemType_ROD_OF_WITTY_PARTY_BANTER = cprnm_ItemType__init_($rt_s(453), 96);
    cprnm_ItemType_LASER_POINTER_2_ORDER = cprnm_ItemType__init_($rt_s(454), 97);
    cprnm_ItemType_DIPLOMATIC_IMMUNITY = cprnm_ItemType__init_($rt_s(455), 98);
    cprnm_ItemType_THE_1_RING = cprnm_ItemType__init_($rt_s(456), 99);
    cprnm_ItemType_DIRK_OF_DISEMBOWELING = cprnm_ItemType__init_($rt_s(457), 100);
    cprnm_ItemType_HAMMER_OF_WICKED_BEATS = cprnm_ItemType__init_($rt_s(458), 101);
    cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR = cprnm_ItemType__init_($rt_s(459), 102);
    cprnm_ItemType_DECODER_RING_2_ORDER = cprnm_ItemType__init_($rt_s(460), 103);
    cprnm_ItemType_MJOLNIRBY = cprnm_ItemType__init_($rt_s(461), 104);
    cprnm_ItemType_THE_POWER_OF_MEDICINE_3_ORDER = cprnm_ItemType__init_($rt_s(462), 105);
    cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_2_ORDER = cprnm_ItemType__init_($rt_s(463), 106);
    cprnm_ItemType_SWORDY_MCEPICPANTS = cprnm_ItemType__init_($rt_s(464), 107);
    cprnm_ItemType_SHOVEL = cprnm_ItemType__init_($rt_s(465), 108);
    cprnm_ItemType_PHILTER_OF_PURE_TESTOSTERONE = cprnm_ItemType__init_($rt_s(466), 109);
    cprnm_ItemType_TOME_OF_NASTY_BEHAVIOR = cprnm_ItemType__init_($rt_s(467), 110);
    cprnm_ItemType_BOOTS_MADE_FOR_WALKIN = cprnm_ItemType__init_($rt_s(468), 111);
    cprnm_ItemType_POCKET_PROTECTOR = cprnm_ItemType__init_($rt_s(469), 112);
    cprnm_ItemType_HAROLDS_HOMEMADE_HALBERD = cprnm_ItemType__init_($rt_s(470), 113);
    cprnm_ItemType_SANDWICH_OF_UNSURPASSED_MEATINESS = cprnm_ItemType__init_($rt_s(471), 114);
    cprnm_ItemType_LAVISHLY_ADORNED_RAPIER = cprnm_ItemType__init_($rt_s(472), 115);
    cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_3_ORDER = cprnm_ItemType__init_($rt_s(473), 116);
    cprnm_ItemType_THE_POWER_OF_MEDICINE_4_ORDER = cprnm_ItemType__init_($rt_s(474), 117);
    cprnm_ItemType_SVENS_SWORD_OF_DOOOOOM = cprnm_ItemType__init_($rt_s(475), 118);
    cprnm_ItemType_LASER_POINTER_3_ORDER = cprnm_ItemType__init_($rt_s(476), 119);
    cprnm_ItemType_GRIEVOUS_BODILY_HARM = cprnm_ItemType__init_($rt_s(477), 120);
    cprnm_ItemType_DECODER_RING_3_ORDER = cprnm_ItemType__init_($rt_s(478), 121);
    cprnm_ItemType_LIFEDRINKER = cprnm_ItemType__init_($rt_s(479), 122);
    cprnm_ItemType_MITHRIL_OREEAL = cprnm_ItemType__init_($rt_s(480), 123);
    cprnm_ItemType_BIG_STABBY_SPEAR = cprnm_ItemType__init_($rt_s(481), 124);
    cprnm_ItemType_EXP_FLASK = cprnm_ItemType__init_($rt_s(482), 125);
    cprnm_ItemType_EXP_PHILTER = cprnm_ItemType__init_($rt_s(483), 126);
    cprnm_ItemType_EXP_VIAL = cprnm_ItemType__init_($rt_s(484), 127);
    cprnm_ItemType_VOID_DUST = cprnm_ItemType__init_($rt_s(485), 128);
    cprnm_ItemType_SHIMMER_DUST = cprnm_ItemType__init_($rt_s(486), 129);
    cprnm_ItemType_PRIMAL_ESSENCE = cprnm_ItemType__init_($rt_s(487), 130);
    cprnm_ItemType_IRON_ORE = cprnm_ItemType__init_($rt_s(488), 131);
    cprnm_ItemType_COPPER_ORE = cprnm_ItemType__init_($rt_s(489), 132);
    cprnm_ItemType_SILVER_ORE = cprnm_ItemType__init_($rt_s(490), 133);
    cprnm_ItemType_VOLCANIC_ORE = cprnm_ItemType__init_($rt_s(491), 134);
    cprnm_ItemType_EXP_DECANTER = cprnm_ItemType__init_($rt_s(492), 135);
    cprnm_ItemType_RAID_TICKET = cprnm_ItemType__init_($rt_s(493), 136);
    cprnm_ItemType_STONE_ELECTROYETI = cprnm_ItemType__init_($rt_s(494), 137);
    cprnm_ItemType_STONE_MEDUSA = cprnm_ItemType__init_($rt_s(495), 138);
    cprnm_ItemType_STONE_FAITH_HEALER = cprnm_ItemType__init_($rt_s(496), 139);
    cprnm_ItemType_HERO_ELECTROYETI = cprnm_ItemType__init_($rt_s(497), 140);
    cprnm_ItemType_HERO_MEDUSA = cprnm_ItemType__init_($rt_s(498), 141);
    cprnm_ItemType_HERO_FAITH_HEALER = cprnm_ItemType__init_($rt_s(499), 142);
    cprnm_ItemType_LASER_POINTER_4_ORDER = cprnm_ItemType__init_($rt_s(500), 143);
    cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR_2_ORDER = cprnm_ItemType__init_($rt_s(501), 144);
    cprnm_ItemType_SHOT_IN_THE_ARM_2_ORDER = cprnm_ItemType__init_($rt_s(502), 145);
    cprnm_ItemType_SHOT_IN_THE_ARM_3_ORDER = cprnm_ItemType__init_($rt_s(503), 146);
    cprnm_ItemType_SHARD_MACE_OF_FRIENDSHIP = cprnm_ItemType__init_($rt_s(504), 147);
    cprnm_ItemType_REEL_INTIMIDATING_BEARD = cprnm_ItemType__init_($rt_s(505), 148);
    cprnm_ItemType_REEL_SHINY_BOTTLECAP = cprnm_ItemType__init_($rt_s(506), 149);
    cprnm_ItemType_REEL_SUPER_SPIKEY_SPEAR = cprnm_ItemType__init_($rt_s(507), 150);
    cprnm_ItemType_SHARD_RACING_STRIPES = cprnm_ItemType__init_($rt_s(508), 151);
    cprnm_ItemType_SHARD_THE_UGLY_STICK = cprnm_ItemType__init_($rt_s(509), 152);
    cprnm_ItemType_REEL_DECODER_RING = cprnm_ItemType__init_($rt_s(510), 153);
    cprnm_ItemType_SHARD_MUSCLE_WAX = cprnm_ItemType__init_($rt_s(511), 154);
    cprnm_ItemType_REEL_THE_POWER_OF_MEDICINE = cprnm_ItemType__init_($rt_s(512), 155);
    cprnm_ItemType_REEL_THE_MAD_GODS_TRIDENT = cprnm_ItemType__init_($rt_s(513), 156);
    cprnm_ItemType_REEL_GRIEVOUS_BODILY_HARM = cprnm_ItemType__init_($rt_s(514), 157);
    cprnm_ItemType_REEL_SIDE_OF_BACON = cprnm_ItemType__init_($rt_s(515), 158);
    cprnm_ItemType_SHARD_DONT_TASE_ME_BOW = cprnm_ItemType__init_($rt_s(516), 159);
    cprnm_ItemType_SHARD_FRAMED_DIPLOMA = cprnm_ItemType__init_($rt_s(517), 160);
    cprnm_ItemType_REEL_ORB_OF_EVERLASTING_FLAVOR = cprnm_ItemType__init_($rt_s(518), 161);
    cprnm_ItemType_REEL_TOME_OF_FORBIDDEN_TRIVIA = cprnm_ItemType__init_($rt_s(519), 162);
    cprnm_ItemType_SHARD_SACRED_CODEX = cprnm_ItemType__init_($rt_s(520), 163);
    cprnm_ItemType_SHARD_IMPRACTICAL_CHESTPLATE = cprnm_ItemType__init_($rt_s(521), 164);
    cprnm_ItemType_REEL_SPARKLE_PONY_KEYCHAIN = cprnm_ItemType__init_($rt_s(522), 165);
    cprnm_ItemType_REEL_MJOLNIRBY = cprnm_ItemType__init_($rt_s(523), 166);
    cprnm_ItemType_REEL_BIG_STABBY_SPEAR = cprnm_ItemType__init_($rt_s(524), 167);
    cprnm_ItemType_REEL_KINDNESS = cprnm_ItemType__init_($rt_s(525), 168);
    cprnm_ItemType_SHARD_PHILTER_OF_PURE_TESTOSTERONE = cprnm_ItemType__init_($rt_s(526), 169);
    cprnm_ItemType_SHARD_STAFF_OF_BOSS_FIGHTING = cprnm_ItemType__init_($rt_s(527), 170);
    cprnm_ItemType_REEL_HAMMER_OF_WICKED_BEATS = cprnm_ItemType__init_($rt_s(528), 171);
    cprnm_ItemType_REEL_MAGIC_EIGHT_BALL = cprnm_ItemType__init_($rt_s(529), 172);
    cprnm_ItemType_REEL_DIRK_OF_DISEMBOWELING = cprnm_ItemType__init_($rt_s(530), 173);
    cprnm_ItemType_REEL_SPUD_GUN = cprnm_ItemType__init_($rt_s(531), 174);
    cprnm_ItemType_REEL_FLAIL_OF_TOTAL_DEVASTATION = cprnm_ItemType__init_($rt_s(532), 175);
    cprnm_ItemType_REEL_NECRONOMICON = cprnm_ItemType__init_($rt_s(533), 176);
    cprnm_ItemType_SHARD_HAROLDS_HOMEMADE_HALBERD = cprnm_ItemType__init_($rt_s(534), 177);
    cprnm_ItemType_REEL_LIFEDRINKER = cprnm_ItemType__init_($rt_s(535), 178);
    cprnm_ItemType_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS = cprnm_ItemType__init_($rt_s(536), 179);
    cprnm_ItemType_REEL_ENIDS_EXPENSIVE_ELIXIR = cprnm_ItemType__init_($rt_s(537), 180);
    cprnm_ItemType_REEL_PLASTIC_VAMPIRE_TEETH = cprnm_ItemType__init_($rt_s(538), 181);
    cprnm_ItemType_REEL_PRETTY_SWEET_CAPE = cprnm_ItemType__init_($rt_s(539), 182);
    cprnm_ItemType_REEL_VAMPIRE_BUNNYEARS = cprnm_ItemType__init_($rt_s(540), 183);
    cprnm_ItemType_REEL_THE_COMPENSATOR = cprnm_ItemType__init_($rt_s(541), 184);
    cprnm_ItemType_SHARD_GENTLEMENS_CLUB = cprnm_ItemType__init_($rt_s(542), 185);
    cprnm_ItemType_REEL_BLOODY_BAT = cprnm_ItemType__init_($rt_s(543), 186);
    cprnm_ItemType_REEL_POCKET_PROTECTOR = cprnm_ItemType__init_($rt_s(544), 187);
    cprnm_ItemType_REEL_CHUNKY_FEMUR = cprnm_ItemType__init_($rt_s(545), 188);
    cprnm_ItemType_REEL_DEATH_METAL_BLADE = cprnm_ItemType__init_($rt_s(546), 189);
    cprnm_ItemType_SHARD_HEAD_BANGER = cprnm_ItemType__init_($rt_s(547), 190);
    cprnm_ItemType_SHARD_AND_MY_AXE = cprnm_ItemType__init_($rt_s(548), 191);
    cprnm_ItemType_REEL_THE_1_RING = cprnm_ItemType__init_($rt_s(549), 192);
    cprnm_ItemType_REEL_GOBLIN_WHACKER = cprnm_ItemType__init_($rt_s(550), 193);
    cprnm_ItemType_REEL_LEAD_ZEPPELIN = cprnm_ItemType__init_($rt_s(551), 194);
    cprnm_ItemType_REEL_THINKING_CAP = cprnm_ItemType__init_($rt_s(552), 195);
    cprnm_ItemType_REEL_TEN_FOOT_POLE = cprnm_ItemType__init_($rt_s(553), 196);
    cprnm_ItemType_REEL_DIPLOMATIC_IMMUNITY = cprnm_ItemType__init_($rt_s(554), 197);
    cprnm_ItemType_SHARD_BOOTS_MADE_FOR_WALKIN = cprnm_ItemType__init_($rt_s(555), 198);
    cprnm_ItemType_REEL_LUCKY_ORCS_FOOT = cprnm_ItemType__init_($rt_s(556), 199);
    cprnm_ItemType_REEL_ROD_OF_WITTY_PARTY_BANTER = cprnm_ItemType__init_($rt_s(557), 200);
    cprnm_ItemType_SHARD_BUNNY_SLIPPERS = cprnm_ItemType__init_($rt_s(558), 201);
    cprnm_ItemType_SHARD_VORPAL_BOOMERANG = cprnm_ItemType__init_($rt_s(559), 202);
    cprnm_ItemType_REEL_BAG_O_HAMMERS = cprnm_ItemType__init_($rt_s(560), 203);
    cprnm_ItemType_REEL_LASER_POINTER = cprnm_ItemType__init_($rt_s(561), 204);
    cprnm_ItemType_REEL_SHOVEL = cprnm_ItemType__init_($rt_s(562), 205);
    cprnm_ItemType_SHARD_ADAMANTIUM_TIARA = cprnm_ItemType__init_($rt_s(563), 206);
    cprnm_ItemType_SHARD_REEL_THE_MAD_GODS_TRIDENT = cprnm_ItemType__init_($rt_s(564), 207);
    cprnm_ItemType_SHARD_REEL_INTIMIDATING_BEARD = cprnm_ItemType__init_($rt_s(565), 208);
    cprnm_ItemType_SHARD_REEL_FLAIL_OF_TOTAL_DEVASTATION = cprnm_ItemType__init_($rt_s(566), 209);
    cprnm_ItemType_SHARD_REEL_KINDNESS = cprnm_ItemType__init_($rt_s(567), 210);
    cprnm_ItemType_SHARD_REEL_LEAD_ZEPPELIN = cprnm_ItemType__init_($rt_s(568), 211);
    cprnm_ItemType_SHARD_REEL_DECODER_RING = cprnm_ItemType__init_($rt_s(569), 212);
    cprnm_ItemType_SHARD_REEL_NECRONOMICON = cprnm_ItemType__init_($rt_s(570), 213);
    cprnm_ItemType_SHARD_REEL_TOME_OF_FORBIDDEN_TRIVIA = cprnm_ItemType__init_($rt_s(571), 214);
    cprnm_ItemType_SHARD_REEL_THINKING_CAP = cprnm_ItemType__init_($rt_s(572), 215);
    cprnm_ItemType_SHARD_REEL_THE_COMPENSATOR = cprnm_ItemType__init_($rt_s(573), 216);
    cprnm_ItemType_SHARD_REEL_LASER_POINTER = cprnm_ItemType__init_($rt_s(574), 217);
    cprnm_ItemType_SHARD_REEL_ORB_OF_EVERLASTING_FLAVOR = cprnm_ItemType__init_($rt_s(575), 218);
    cprnm_ItemType_SHARD_REEL_GRIEVOUS_BODILY_HARM = cprnm_ItemType__init_($rt_s(576), 219);
    cprnm_ItemType_SHARD_REEL_LIFEDRINKER = cprnm_ItemType__init_($rt_s(577), 220);
    cprnm_ItemType_SHARD_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS = cprnm_ItemType__init_($rt_s(578), 221);
    cprnm_ItemType_SHARD_REEL_MJOLNIRBY = cprnm_ItemType__init_($rt_s(579), 222);
    cprnm_ItemType_SHARD_REEL_DIRK_OF_DISEMBOWELING = cprnm_ItemType__init_($rt_s(580), 223);
    cprnm_ItemType_SHARD_REEL_ROD_OF_WITTY_PARTY_BANTER = cprnm_ItemType__init_($rt_s(581), 224);
    cprnm_ItemType_SHARD_REEL_DIPLOMATIC_IMMUNITY = cprnm_ItemType__init_($rt_s(582), 225);
    cprnm_ItemType_SHARD_REEL_BIG_STABBY_SPEAR = cprnm_ItemType__init_($rt_s(583), 226);
    cprnm_ItemType_SHARD_REEL_ENIDS_EXPENSIVE_ELIXIR = cprnm_ItemType__init_($rt_s(584), 227);
    cprnm_ItemType_SHARD_REEL_SUPER_SPIKEY_SPEAR = cprnm_ItemType__init_($rt_s(585), 228);
    cprnm_ItemType_SHARD_REEL_HAMMER_OF_WICKED_BEATS = cprnm_ItemType__init_($rt_s(586), 229);
    cprnm_ItemType_SHARD_REEL_SHOVEL = cprnm_ItemType__init_($rt_s(587), 230);
    cprnm_ItemType_SHARD_REEL_THE_1_RING = cprnm_ItemType__init_($rt_s(588), 231);
    cprnm_ItemType_SHARD_REEL_DEATH_METAL_BLADE = cprnm_ItemType__init_($rt_s(589), 232);
    cprnm_ItemType_SHARD_REEL_POCKET_PROTECTOR = cprnm_ItemType__init_($rt_s(590), 233);
    cprnm_ItemType_STONE_DARK_DRACUL = cprnm_ItemType__init_($rt_s(591), 234);
    cprnm_ItemType_HERO_DARK_DRACUL = cprnm_ItemType__init_($rt_s(592), 235);
    cprnm_ItemType_STONE_COSMIC_ELF = cprnm_ItemType__init_($rt_s(593), 236);
    cprnm_ItemType_HERO_COSMIC_ELF = cprnm_ItemType__init_($rt_s(594), 237);
    cprnm_ItemType_STONE_ROLLER_WARRIOR = cprnm_ItemType__init_($rt_s(595), 238);
    cprnm_ItemType_HERO_ROLLER_WARRIOR = cprnm_ItemType__init_($rt_s(596), 239);
    cprnm_ItemType_STONE_DRAGON_LADY = cprnm_ItemType__init_($rt_s(597), 240);
    cprnm_ItemType_HERO_DRAGON_LADY = cprnm_ItemType__init_($rt_s(598), 241);
    cprnm_ItemType_STONE_CENTAUR_OF_ATTENTION = cprnm_ItemType__init_($rt_s(599), 242);
    cprnm_ItemType_HERO_CENTAUR_OF_ATTENTION = cprnm_ItemType__init_($rt_s(600), 243);
    cprnm_ItemType_STONE_UNSTABLE_UNDERSTUDY = cprnm_ItemType__init_($rt_s(601), 244);
    cprnm_ItemType_HERO_UNSTABLE_UNDERSTUDY = cprnm_ItemType__init_($rt_s(602), 245);
    cprnm_ItemType_STONE_MOON_DRAKE = cprnm_ItemType__init_($rt_s(603), 246);
    cprnm_ItemType_HERO_MOON_DRAKE = cprnm_ItemType__init_($rt_s(604), 247);
    cprnm_ItemType_STONE_POLEMASTER = cprnm_ItemType__init_($rt_s(605), 248);
    cprnm_ItemType_HERO_POLEMASTER = cprnm_ItemType__init_($rt_s(606), 249);
    cprnm_ItemType_STONE_CATAPULT_KNIGHT = cprnm_ItemType__init_($rt_s(607), 250);
    cprnm_ItemType_HERO_CATAPULT_KNIGHT = cprnm_ItemType__init_($rt_s(608), 251);
    cprnm_ItemType_STONE_BARDBARIAN = cprnm_ItemType__init_($rt_s(609), 252);
    cprnm_ItemType_HERO_BARDBARIAN = cprnm_ItemType__init_($rt_s(610), 253);
    cprnm_ItemType_STONE_SHADOW_ASSASSIN = cprnm_ItemType__init_($rt_s(611), 254);
    cprnm_ItemType_HERO_SHADOW_ASSASSIN = cprnm_ItemType__init_($rt_s(612), 255);
    cprnm_ItemType_STONE_DUST_DEVIL = cprnm_ItemType__init_($rt_s(613), 256);
    cprnm_ItemType_HERO_DUST_DEVIL = cprnm_ItemType__init_($rt_s(614), 257);
    cprnm_ItemType_STONE_SNAP_DRAGON = cprnm_ItemType__init_($rt_s(615), 258);
    cprnm_ItemType_HERO_SNAP_DRAGON = cprnm_ItemType__init_($rt_s(616), 259);
    cprnm_ItemType_STONE_HYDRA = cprnm_ItemType__init_($rt_s(617), 260);
    cprnm_ItemType_HERO_HYDRA = cprnm_ItemType__init_($rt_s(618), 261);
    cprnm_ItemType_STONE_SAVAGE_CUTIE = cprnm_ItemType__init_($rt_s(619), 262);
    cprnm_ItemType_HERO_SAVAGE_CUTIE = cprnm_ItemType__init_($rt_s(620), 263);
    cprnm_ItemType_STONE_ZOMBIE_SQUIRE = cprnm_ItemType__init_($rt_s(621), 264);
    cprnm_ItemType_HERO_ZOMBIE_SQUIRE = cprnm_ItemType__init_($rt_s(622), 265);
    cprnm_ItemType_STONE_MAGIC_DRAGON = cprnm_ItemType__init_($rt_s(623), 266);
    cprnm_ItemType_HERO_MAGIC_DRAGON = cprnm_ItemType__init_($rt_s(624), 267);
    cprnm_ItemType_STONE_AQUATIC_MAN = cprnm_ItemType__init_($rt_s(625), 268);
    cprnm_ItemType_HERO_AQUATIC_MAN = cprnm_ItemType__init_($rt_s(626), 269);
    cprnm_ItemType_STONE_CRIMSON_WITCH = cprnm_ItemType__init_($rt_s(627), 270);
    cprnm_ItemType_HERO_CRIMSON_WITCH = cprnm_ItemType__init_($rt_s(628), 271);
    cprnm_ItemType_STONE_NINJA_DWARF = cprnm_ItemType__init_($rt_s(629), 272);
    cprnm_ItemType_HERO_NINJA_DWARF = cprnm_ItemType__init_($rt_s(630), 273);
    cprnm_ItemType_STONE_BROZERKER = cprnm_ItemType__init_($rt_s(631), 274);
    cprnm_ItemType_HERO_BROZERKER = cprnm_ItemType__init_($rt_s(632), 275);
    cprnm_ItemType_STONE_GROOVY_DRUID = cprnm_ItemType__init_($rt_s(633), 276);
    cprnm_ItemType_HERO_GROOVY_DRUID = cprnm_ItemType__init_($rt_s(634), 277);
    cprnm_ItemType_STONE_BONE_DRAGON = cprnm_ItemType__init_($rt_s(635), 278);
    cprnm_ItemType_HERO_BONE_DRAGON = cprnm_ItemType__init_($rt_s(636), 279);
    cprnm_ItemType_MITHRIL_ORE = cprnm_ItemType__init_($rt_s(637), 280);
    cprnm_ItemType_STONE_SPIKEY_DRAGON = cprnm_ItemType__init_($rt_s(638), 281);
    cprnm_ItemType_HERO_SPIKEY_DRAGON = cprnm_ItemType__init_($rt_s(639), 282);
    cprnm_ItemType_STONE_FROST_GIANT = cprnm_ItemType__init_($rt_s(640), 283);
    cprnm_ItemType_HERO_FROST_GIANT = cprnm_ItemType__init_($rt_s(641), 284);
    cprnm_ItemType_STONE_MINOTAUR = cprnm_ItemType__init_($rt_s(642), 285);
    cprnm_ItemType_HERO_MINOTAUR = cprnm_ItemType__init_($rt_s(643), 286);
    cprnm_ItemType_STONE_DARK_HORSE = cprnm_ItemType__init_($rt_s(644), 287);
    cprnm_ItemType_HERO_DARK_HORSE = cprnm_ItemType__init_($rt_s(645), 288);
    cprnm_ItemType_STONE_DRUIDINATRIX = cprnm_ItemType__init_($rt_s(646), 289);
    cprnm_ItemType_HERO_DRUIDINATRIX = cprnm_ItemType__init_($rt_s(647), 290);
    cprnm_ItemType_STONE_ORC_MONK = cprnm_ItemType__init_($rt_s(648), 291);
    cprnm_ItemType_HERO_ORC_MONK = cprnm_ItemType__init_($rt_s(649), 292);
    cprnm_ItemType_STONE_RABID_DRAGON = cprnm_ItemType__init_($rt_s(650), 293);
    cprnm_ItemType_HERO_RABID_DRAGON = cprnm_ItemType__init_($rt_s(651), 294);
    cprnm_ItemType_STONE_DWARVEN_ARCHER = cprnm_ItemType__init_($rt_s(652), 295);
    cprnm_ItemType_HERO_DWARVEN_ARCHER = cprnm_ItemType__init_($rt_s(653), 296);
    cprnm_ItemType_DEAD_EYE = cprnm_ItemType__init_($rt_s(654), 297);
    cprnm_ItemType_DRAGON_SCALE = cprnm_ItemType__init_($rt_s(655), 298);
    cprnm_ItemType_LOST_DISK_OF_POWER = cprnm_ItemType__init_($rt_s(656), 299);
    cprnm_ItemType_LIGER_BALM = cprnm_ItemType__init_($rt_s(657), 300);
    cprnm_ItemType_OVERPOWERING_FRAGRANCE = cprnm_ItemType__init_($rt_s(658), 301);
    cprnm_ItemType_ANTI_MAGIC_SHIELD = cprnm_ItemType__init_($rt_s(659), 302);
    cprnm_ItemType_WAR_SANDALS = cprnm_ItemType__init_($rt_s(660), 303);
    cprnm_ItemType_WIZARDY_FOR_IDIOTS = cprnm_ItemType__init_($rt_s(661), 304);
    cprnm_ItemType_LICHE_FINGER = cprnm_ItemType__init_($rt_s(662), 305);
    cprnm_ItemType_MOTIVATIONAL_CASSETTE = cprnm_ItemType__init_($rt_s(663), 306);
    cprnm_ItemType_CHUGG_BOOTS = cprnm_ItemType__init_($rt_s(664), 307);
    cprnm_ItemType_PURPLE_PILLS_OF_POTENCY = cprnm_ItemType__init_($rt_s(665), 308);
    cprnm_ItemType_BLACKSTEEL_BLADE = cprnm_ItemType__init_($rt_s(666), 309);
    cprnm_ItemType_SHARD_DEAD_EYE = cprnm_ItemType__init_($rt_s(667), 310);
    cprnm_ItemType_SHARD_LOST_DISK_OF_POWER = cprnm_ItemType__init_($rt_s(668), 311);
    cprnm_ItemType_SHARD_LIGER_BALM = cprnm_ItemType__init_($rt_s(669), 312);
    cprnm_ItemType_SHARD_ANTI_MAGIC_SHIELD = cprnm_ItemType__init_($rt_s(670), 313);
    cprnm_ItemType_SHARD_WAR_SANDALS = cprnm_ItemType__init_($rt_s(671), 314);
    cprnm_ItemType_SHARD_WIZARDY_FOR_IDIOTS = cprnm_ItemType__init_($rt_s(672), 315);
    cprnm_ItemType_ALCHEMY_COST_RESET = cprnm_ItemType__init_($rt_s(673), 316);
    cprnm_ItemType_STAMINA_COST_RESET = cprnm_ItemType__init_($rt_s(674), 317);
    cprnm_ItemType_ELITE_CHANCES_COST_RESET = cprnm_ItemType__init_($rt_s(675), 318);
    cprnm_ItemType_STAMINA_CONSUMABLE = cprnm_ItemType__init_($rt_s(676), 319);
    cprnm_ItemType_DOUBLE_NORMAL_CAMPAIGN_DROPS = cprnm_ItemType__init_($rt_s(677), 320);
    cprnm_ItemType_DOUBLE_ELITE_CAMPAIGN_DROPS = cprnm_ItemType__init_($rt_s(678), 321);
    cprnm_ItemType_SHOP_REFRESH = cprnm_ItemType__init_($rt_s(679), 322);
    cprnm_ItemType_GENERIC_ORANGE = cprnm_ItemType__init_($rt_s(680), 323);
    cprnm_ItemType_STONE_SKELETON_KING = cprnm_ItemType__init_($rt_s(681), 324);
    cprnm_ItemType_HERO_SKELETON_KING = cprnm_ItemType__init_($rt_s(682), 325);
    cprnm_ItemType_STONE_SATYR = cprnm_ItemType__init_($rt_s(683), 326);
    cprnm_ItemType_HERO_SATYR = cprnm_ItemType__init_($rt_s(684), 327);
    cprnm_ItemType_STONE_STORM_DRAGON = cprnm_ItemType__init_($rt_s(685), 328);
    cprnm_ItemType_HERO_STORM_DRAGON = cprnm_ItemType__init_($rt_s(686), 329);
    cprnm_ItemType_YODELING_SWORD = cprnm_ItemType__init_($rt_s(687), 330);
    cprnm_ItemType_GIRDLE_OF_VICTORY = cprnm_ItemType__init_($rt_s(688), 331);
    cprnm_ItemType_RATTLING_SABRE = cprnm_ItemType__init_($rt_s(689), 332);
    cprnm_ItemType_PURIFYING_TUNING_FORK = cprnm_ItemType__init_($rt_s(690), 333);
    cprnm_ItemType_PETER_PIPERS_PEPPER_SPRAY = cprnm_ItemType__init_($rt_s(691), 334);
    cprnm_ItemType_RING_OF_THE_SQUIRREL = cprnm_ItemType__init_($rt_s(692), 335);
    cprnm_ItemType_POWER_OF_SCIENCE = cprnm_ItemType__init_($rt_s(693), 336);
    cprnm_ItemType_HIGH_TEA = cprnm_ItemType__init_($rt_s(694), 337);
    cprnm_ItemType_SELF_PRESERVER = cprnm_ItemType__init_($rt_s(695), 338);
    cprnm_ItemType_EXTREME_FAD_DIET = cprnm_ItemType__init_($rt_s(696), 339);
    cprnm_ItemType_BOWIE_KNIFE = cprnm_ItemType__init_($rt_s(697), 340);
    cprnm_ItemType_JAR_OF_KITTEN_TEAR = cprnm_ItemType__init_($rt_s(698), 341);
    cprnm_ItemType_MYSTICAL_ELVEN_JUNK = cprnm_ItemType__init_($rt_s(699), 342);
    cprnm_ItemType_PHOTO_BOMB = cprnm_ItemType__init_($rt_s(700), 343);
    cprnm_ItemType_READIN_RAIN_BOW = cprnm_ItemType__init_($rt_s(701), 344);
    cprnm_ItemType_GLASS_CASE_OF_EMOTION = cprnm_ItemType__init_($rt_s(702), 345);
    cprnm_ItemType_ROLL_OF_DUCT_TAPE = cprnm_ItemType__init_($rt_s(703), 346);
    cprnm_ItemType_WICKED_MULLET = cprnm_ItemType__init_($rt_s(704), 347);
    cprnm_ItemType_UNICORN_PUKE = cprnm_ItemType__init_($rt_s(705), 348);
    cprnm_ItemType_SHARD_PETER_PIPERS_PEPPER_SPRAY = cprnm_ItemType__init_($rt_s(706), 349);
    cprnm_ItemType_SHARD_RING_OF_THE_SQUIRREL = cprnm_ItemType__init_($rt_s(707), 350);
    cprnm_ItemType_SHARD_HIGH_TEA = cprnm_ItemType__init_($rt_s(708), 351);
    cprnm_ItemType_SHARD_SELF_PRESERVER = cprnm_ItemType__init_($rt_s(709), 352);
    cprnm_ItemType_SHARD_EXTREME_FAD_DIET = cprnm_ItemType__init_($rt_s(710), 353);
    cprnm_ItemType_SHARD_BOWIE_KNIFE = cprnm_ItemType__init_($rt_s(711), 354);
    cprnm_ItemType_SHARD_PHOTO_BOMB = cprnm_ItemType__init_($rt_s(712), 355);
    cprnm_ItemType_SHARD_ROLL_OF_DUCT_TAPE = cprnm_ItemType__init_($rt_s(713), 356);
    cprnm_ItemType_VIP5_CONSUMABLE = cprnm_ItemType__init_($rt_s(714), 357);
    cprnm_ItemType_STONE_UNICORGI = cprnm_ItemType__init_($rt_s(715), 358);
    cprnm_ItemType_HERO_UNICORGI = cprnm_ItemType__init_($rt_s(716), 359);
    cprnm_ItemType_STONE_SNIPER_WOLF = cprnm_ItemType__init_($rt_s(717), 360);
    cprnm_ItemType_HERO_SNIPER_WOLF = cprnm_ItemType__init_($rt_s(718), 361);
    cprnm_ItemType_STONE_GENIE = cprnm_ItemType__init_($rt_s(719), 362);
    cprnm_ItemType_HERO_GENIE = cprnm_ItemType__init_($rt_s(720), 363);
    cprnm_ItemType_SKIN_DARK_HORSE_ZEBRA = cprnm_ItemType__init_($rt_s(721), 364);
    cprnm_ItemType_SKIN_DARK_HORSE_MECH = cprnm_ItemType__init_($rt_s(722), 365);
    cprnm_ItemType_CHAMPIONSHIP_BELT = cprnm_ItemType__init_($rt_s(723), 366);
    cprnm_ItemType_HEALTHY_DOSE_OF_SKEPTICISM = cprnm_ItemType__init_($rt_s(724), 367);
    cprnm_ItemType_AXE_OF_GRATUITOUS_GUITAR_SOLOS = cprnm_ItemType__init_($rt_s(725), 368);
    cprnm_ItemType_ANCIENT_TOME_OF_OCCULT_NONSENSE = cprnm_ItemType__init_($rt_s(726), 369);
    cprnm_ItemType_DRAGONS_BALLZ = cprnm_ItemType__init_($rt_s(727), 370);
    cprnm_ItemType_HELM_OF_THE_RAGING_BEAR = cprnm_ItemType__init_($rt_s(728), 371);
    cprnm_ItemType_COSPLAY_SWORD = cprnm_ItemType__init_($rt_s(729), 372);
    cprnm_ItemType_IVY_LEAGUE_HAIRCUT = cprnm_ItemType__init_($rt_s(730), 373);
    cprnm_ItemType_DUELING_KNIVES_OF_HACKENSLASH = cprnm_ItemType__init_($rt_s(731), 374);
    cprnm_ItemType_DEERSTALKER_HAT = cprnm_ItemType__init_($rt_s(732), 375);
    cprnm_ItemType_LENSLESS_GLASSES = cprnm_ItemType__init_($rt_s(733), 376);
    cprnm_ItemType_UNTESTED_JETPACK = cprnm_ItemType__init_($rt_s(734), 377);
    cprnm_ItemType_HELM_OF_SCREAMING_MANFACE = cprnm_ItemType__init_($rt_s(735), 378);
    cprnm_ItemType_SWEATBAND_OF_TRAINING_MONTAGES = cprnm_ItemType__init_($rt_s(736), 379);
    cprnm_ItemType_MONSTER_HUNTER_ARMOR = cprnm_ItemType__init_($rt_s(737), 380);
    cprnm_ItemType_SHARD_HEALTHY_DOSE_OF_SKEPTICISM = cprnm_ItemType__init_($rt_s(738), 381);
    cprnm_ItemType_SHARD_AXE_OF_GRATUITOUS_GUITAR_SOLOS = cprnm_ItemType__init_($rt_s(739), 382);
    cprnm_ItemType_SHARD_ANCIENT_TOME_OF_OCCULT_NONSENSE = cprnm_ItemType__init_($rt_s(740), 383);
    cprnm_ItemType_SHARD_HELM_OF_THE_RAGING_BEAR = cprnm_ItemType__init_($rt_s(741), 384);
    cprnm_ItemType_SHARD_COSPLAY_SWORD = cprnm_ItemType__init_($rt_s(742), 385);
    cprnm_ItemType_SHARD_LENSLESS_GLASSES = cprnm_ItemType__init_($rt_s(743), 386);
    cprnm_ItemType_SHARD_UNTESTED_JETPACK = cprnm_ItemType__init_($rt_s(744), 387);
    cprnm_ItemType_SHARD_SWEATBAND_OF_TRAINING_MONTAGES = cprnm_ItemType__init_($rt_s(745), 388);
    cprnm_ItemType_RUNICITE_SHARD = cprnm_ItemType__init_($rt_s(746), 389);
    cprnm_ItemType_RUNICITE_STONE = cprnm_ItemType__init_($rt_s(747), 390);
    cprnm_ItemType_RUNICITE_BLOCK = cprnm_ItemType__init_($rt_s(748), 391);
    cprnm_ItemType_RUNICITE_SLAB = cprnm_ItemType__init_($rt_s(749), 392);
    cprnm_ItemType_RUNICITE_MONOLITH = cprnm_ItemType__init_($rt_s(750), 393);
    cprnm_ItemType_SILVER_CHEST_ROLL_X1 = cprnm_ItemType__init_($rt_s(751), 394);
    cprnm_ItemType_GOLD_CHEST_ROLL_X1 = cprnm_ItemType__init_($rt_s(752), 395);
    cprnm_ItemType_SOUL_CHEST_ROLL = cprnm_ItemType__init_($rt_s(753), 396);
    cprnm_ItemType_EVENT_CHEST_ROLL_X1 = cprnm_ItemType__init_($rt_s(754), 397);
    cprnm_ItemType_TAROT_DECK_OF_HYPERBOLE = cprnm_ItemType__init_($rt_s(755), 398);
    cprnm_ItemType_MACGUFFIN_FRAGMENT_45 = cprnm_ItemType__init_($rt_s(756), 399);
    cprnm_ItemType_DIRTY_BASTARD_SWORD = cprnm_ItemType__init_($rt_s(757), 400);
    cprnm_ItemType_THE_HOLY_PAIL = cprnm_ItemType__init_($rt_s(758), 401);
    cprnm_ItemType_ORNATE_CROWN_OF_THE_GM = cprnm_ItemType__init_($rt_s(759), 402);
    cprnm_ItemType_GLORY_SEEKER = cprnm_ItemType__init_($rt_s(760), 403);
    cprnm_ItemType_EYE_OF_THE_BEHOLDER = cprnm_ItemType__init_($rt_s(761), 404);
    cprnm_ItemType_HOLY_LANCE_OF_PLOT_ADVANCEMENT = cprnm_ItemType__init_($rt_s(762), 405);
    cprnm_ItemType_AXE_OF_GRINDING = cprnm_ItemType__init_($rt_s(763), 406);
    cprnm_ItemType_AMULET_OF_CONCENTRATED_AWESOME = cprnm_ItemType__init_($rt_s(764), 407);
    cprnm_ItemType_EMBARASSING_CHAINMAIL_OF_IMMENSE_POWER = cprnm_ItemType__init_($rt_s(765), 408);
    cprnm_ItemType_SLIGHTLY_EVIL_MAGIC_MIRROR = cprnm_ItemType__init_($rt_s(766), 409);
    cprnm_ItemType_STONE_DRAGZILLA = cprnm_ItemType__init_($rt_s(767), 410);
    cprnm_ItemType_HERO_DRAGZILLA = cprnm_ItemType__init_($rt_s(768), 411);
    cprnm_ItemType_STONE_PIRATE = cprnm_ItemType__init_($rt_s(769), 412);
    cprnm_ItemType_HERO_PIRATE = cprnm_ItemType__init_($rt_s(770), 413);
    cprnm_ItemType_STONE_CYCLOPS_WIZARD = cprnm_ItemType__init_($rt_s(771), 414);
    cprnm_ItemType_HERO_CYCLOPS_WIZARD = cprnm_ItemType__init_($rt_s(772), 415);
    cprnm_ItemType_STONE_DEMON_TOTEM = cprnm_ItemType__init_($rt_s(773), 416);
    cprnm_ItemType_HERO_DEMON_TOTEM = cprnm_ItemType__init_($rt_s(774), 417);
    cprnm_ItemType_SHARD_MACGUFFIN_FRAGMENT_45 = cprnm_ItemType__init_($rt_s(775), 418);
    cprnm_ItemType_SHARD_THE_HOLY_PAIL = cprnm_ItemType__init_($rt_s(776), 419);
    cprnm_ItemType_SKIN_CRIMSON_WITCH_CROW = cprnm_ItemType__init_($rt_s(777), 420);
    cprnm_ItemType_SKIN_ELECTROYETI_SASQUATCH = cprnm_ItemType__init_($rt_s(778), 421);
    cprnm_ItemType_SKIN_HYDRA_SEA_DRAGON = cprnm_ItemType__init_($rt_s(779), 422);
    cprnm_ItemType_SKIN_FAITH_HEALER_CTHULU = cprnm_ItemType__init_($rt_s(780), 423);
    cprnm_ItemType_OFFERING_TREE = cprnm_ItemType__init_($rt_s(781), 424);
    cprnm_ItemType_OFFERING_FIRE = cprnm_ItemType__init_($rt_s(782), 425);
    cprnm_ItemType_OFFERING_OCEAN = cprnm_ItemType__init_($rt_s(783), 426);
    cprnm_ItemType_OFFERING_ROCK = cprnm_ItemType__init_($rt_s(784), 427);
    cprnm_ItemType_OFFERING_MIST = cprnm_ItemType__init_($rt_s(785), 428);
    cprnm_ItemType_OFFERING_LIGHTNING = cprnm_ItemType__init_($rt_s(786), 429);
    cprnm_ItemType_OFFERING_BLOOD = cprnm_ItemType__init_($rt_s(787), 430);
    cprnm_ItemType_OFFERING_RIVER = cprnm_ItemType__init_($rt_s(788), 431);
    cprnm_ItemType_OFFERING_HAIL = cprnm_ItemType__init_($rt_s(789), 432);
    cprnm_ItemType_OFFERING_KEYSTONE = cprnm_ItemType__init_($rt_s(790), 433);
    cprnm_ItemType_OFFERING_MAJOR_1 = cprnm_ItemType__init_($rt_s(791), 434);
    cprnm_ItemType_OFFERING_MAJOR_2 = cprnm_ItemType__init_($rt_s(792), 435);
    cprnm_ItemType_OFFERING_MINOR_1 = cprnm_ItemType__init_($rt_s(793), 436);
    cprnm_ItemType_OFFERING_MINOR_2 = cprnm_ItemType__init_($rt_s(794), 437);
    cprnm_ItemType_OFFERING_MINOR_3 = cprnm_ItemType__init_($rt_s(795), 438);
    cprnm_ItemType_SHRINE_ROLL_STONE = cprnm_ItemType__init_($rt_s(796), 439);
    cprnm_ItemType_SHRINE_ROLL_CRYSTAL = cprnm_ItemType__init_($rt_s(797), 440);
    cprnm_ItemType_STONE_DEEP_DRAGON = cprnm_ItemType__init_($rt_s(798), 441);
    cprnm_ItemType_HERO_DEEP_DRAGON = cprnm_ItemType__init_($rt_s(799), 442);
    cprnm_ItemType_STONE_DOPPELGANGER = cprnm_ItemType__init_($rt_s(800), 443);
    cprnm_ItemType_HERO_DOPPELGANGER = cprnm_ItemType__init_($rt_s(801), 444);
    cprnm_ItemType_STONE_KRAKEN_KING = cprnm_ItemType__init_($rt_s(802), 445);
    cprnm_ItemType_HERO_KRAKEN_KING = cprnm_ItemType__init_($rt_s(803), 446);
    cprnm_ItemType_STONE_STOWAWAY = cprnm_ItemType__init_($rt_s(804), 447);
    cprnm_ItemType_HERO_STOWAWAY = cprnm_ItemType__init_($rt_s(805), 448);
    cprnm_ItemType_SKIN_BARDBARIAN_CHAMPION = cprnm_ItemType__init_($rt_s(806), 449);
    cprnm_ItemType_SKIN_CENTAUR_RESPLENDENT = cprnm_ItemType__init_($rt_s(807), 450);
    cprnm_ItemType_SKIN_DRAGON_LADY_MASTERY = cprnm_ItemType__init_($rt_s(808), 451);
    cprnm_ItemType_SKIN_MINOTAUR_HOLSTEIN = cprnm_ItemType__init_($rt_s(809), 452);
    cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_MASTERY = cprnm_ItemType__init_($rt_s(810), 453);
    cprnm_ItemType_REEL_DRAGON_SCALE = cprnm_ItemType__init_($rt_s(811), 454);
    cprnm_ItemType_REEL_CHUGG_BOOTS = cprnm_ItemType__init_($rt_s(812), 455);
    cprnm_ItemType_REEL_BLACKSTEEL_BLADE = cprnm_ItemType__init_($rt_s(813), 456);
    cprnm_ItemType_REEL_YODELING_SWORD = cprnm_ItemType__init_($rt_s(814), 457);
    cprnm_ItemType_REEL_POWER_OF_SCIENCE = cprnm_ItemType__init_($rt_s(815), 458);
    cprnm_ItemType_REEL_GIRDLE_OF_VICTORY = cprnm_ItemType__init_($rt_s(816), 459);
    cprnm_ItemType_REEL_RATTLING_SABRE = cprnm_ItemType__init_($rt_s(817), 460);
    cprnm_ItemType_REEL_MYSTICAL_ELVEN_JUNK = cprnm_ItemType__init_($rt_s(818), 461);
    cprnm_ItemType_REEL_JAR_OF_KITTEN_TEAR = cprnm_ItemType__init_($rt_s(819), 462);
    cprnm_ItemType_REEL_GLASS_CASE_OF_EMOTION = cprnm_ItemType__init_($rt_s(820), 463);
    cprnm_ItemType_REEL_UNICORN_PUKE = cprnm_ItemType__init_($rt_s(821), 464);
    cprnm_ItemType_REEL_IVY_LEAGUE_HAIRCUT = cprnm_ItemType__init_($rt_s(822), 465);
    cprnm_ItemType_REEL_ORNATE_CROWN_OF_THE_GM = cprnm_ItemType__init_($rt_s(823), 466);
    cprnm_ItemType_REEL_TAROT_DECK_OF_HYPERBOLE = cprnm_ItemType__init_($rt_s(824), 467);
    cprnm_ItemType_REEL_DIRTY_BASTARD_SWORD = cprnm_ItemType__init_($rt_s(825), 468);
    cprnm_ItemType_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT = cprnm_ItemType__init_($rt_s(826), 469);
    cprnm_ItemType_REEL_EYE_OF_THE_BEHOLDER = cprnm_ItemType__init_($rt_s(827), 470);
    cprnm_ItemType_REEL_GLORY_SEEKER = cprnm_ItemType__init_($rt_s(828), 471);
    cprnm_ItemType_SHARD_REEL_DRAGON_SCALE = cprnm_ItemType__init_($rt_s(829), 472);
    cprnm_ItemType_SHARD_REEL_CHUGG_BOOTS = cprnm_ItemType__init_($rt_s(830), 473);
    cprnm_ItemType_SHARD_REEL_BLACKSTEEL_BLADE = cprnm_ItemType__init_($rt_s(831), 474);
    cprnm_ItemType_SHARD_REEL_YODELING_SWORD = cprnm_ItemType__init_($rt_s(832), 475);
    cprnm_ItemType_SHARD_REEL_POWER_OF_SCIENCE = cprnm_ItemType__init_($rt_s(833), 476);
    cprnm_ItemType_SHARD_REEL_GIRDLE_OF_VICTORY = cprnm_ItemType__init_($rt_s(834), 477);
    cprnm_ItemType_SHARD_REEL_RATTLING_SABRE = cprnm_ItemType__init_($rt_s(835), 478);
    cprnm_ItemType_SHARD_REEL_MYSTICAL_ELVEN_JUNK = cprnm_ItemType__init_($rt_s(836), 479);
    cprnm_ItemType_SHARD_REEL_JAR_OF_KITTEN_TEAR = cprnm_ItemType__init_($rt_s(837), 480);
    cprnm_ItemType_SHARD_REEL_GLASS_CASE_OF_EMOTION = cprnm_ItemType__init_($rt_s(838), 481);
    cprnm_ItemType_SHARD_REEL_UNICORN_PUKE = cprnm_ItemType__init_($rt_s(839), 482);
    cprnm_ItemType_SHARD_REEL_IVY_LEAGUE_HAIRCUT = cprnm_ItemType__init_($rt_s(840), 483);
    cprnm_ItemType_SHARD_REEL_ORNATE_CROWN_OF_THE_GM = cprnm_ItemType__init_($rt_s(841), 484);
    cprnm_ItemType_SHARD_REEL_TAROT_DECK_OF_HYPERBOLE = cprnm_ItemType__init_($rt_s(842), 485);
    cprnm_ItemType_SHARD_REEL_DIRTY_BASTARD_SWORD = cprnm_ItemType__init_($rt_s(843), 486);
    cprnm_ItemType_SHARD_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT = cprnm_ItemType__init_($rt_s(844), 487);
    cprnm_ItemType_SHARD_REEL_EYE_OF_THE_BEHOLDER = cprnm_ItemType__init_($rt_s(845), 488);
    cprnm_ItemType_SHARD_REEL_GLORY_SEEKER = cprnm_ItemType__init_($rt_s(846), 489);
    cprnm_ItemType_SKIN_BROZERKER_BODYGUARD = cprnm_ItemType__init_($rt_s(847), 490);
    cprnm_ItemType_SKIN_SNAP_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(848), 491);
    cprnm_ItemType_SKIN_CATAPULT_KNIGHT_MASTERY = cprnm_ItemType__init_($rt_s(849), 492);
    cprnm_ItemType_SKIN_ELECTROYETI_MASTERY = cprnm_ItemType__init_($rt_s(850), 493);
    cprnm_ItemType_SKIN_MOON_DRAKE_MASTERY = cprnm_ItemType__init_($rt_s(851), 494);
    cprnm_ItemType_SKIN_MEDUSA_MASTERY = cprnm_ItemType__init_($rt_s(852), 495);
    cprnm_ItemType_SKIN_NINJA_DWARF_MASTERY = cprnm_ItemType__init_($rt_s(853), 496);
    cprnm_ItemType_SKIN_POLEMASTER_GYMNAST = cprnm_ItemType__init_($rt_s(854), 497);
    cprnm_ItemType_SKIN_ROLLER_WARRIOR_LUAU = cprnm_ItemType__init_($rt_s(855), 498);
    cprnm_ItemType_SKIN_DUST_DEVIL_PARISIAN = cprnm_ItemType__init_($rt_s(856), 499);
    cprnm_ItemType_SKIN_SKELETON_KING_MASTERY = cprnm_ItemType__init_($rt_s(857), 500);
    cprnm_ItemType_SKIN_SPIKEY_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(858), 501);
    cprnm_ItemType_SKIN_DARK_DRACUL_FLYING_SQUIRREL = cprnm_ItemType__init_($rt_s(859), 502);
    cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_MASTERY = cprnm_ItemType__init_($rt_s(860), 503);
    cprnm_ItemType_SKIN_DARK_DRACUL_MASTERY = cprnm_ItemType__init_($rt_s(861), 504);
    cprnm_ItemType_SKIN_POLEMASTER_MASTERY = cprnm_ItemType__init_($rt_s(862), 505);
    cprnm_ItemType_SKIN_SKELETON_DEER_MASTERY = cprnm_ItemType__init_($rt_s(863), 506);
    cprnm_ItemType_STONE_CURSED_STATUE = cprnm_ItemType__init_($rt_s(864), 507);
    cprnm_ItemType_HERO_CURSED_STATUE = cprnm_ItemType__init_($rt_s(865), 508);
    cprnm_ItemType_STONE_PLANT_SOUL = cprnm_ItemType__init_($rt_s(866), 509);
    cprnm_ItemType_HERO_PLANT_SOUL = cprnm_ItemType__init_($rt_s(867), 510);
    cprnm_ItemType_STONE_SPIDER_QUEEN = cprnm_ItemType__init_($rt_s(868), 511);
    cprnm_ItemType_HERO_SPIDER_QUEEN = cprnm_ItemType__init_($rt_s(869), 512);
    cprnm_ItemType_STONE_VULTURE_DRAGON = cprnm_ItemType__init_($rt_s(870), 513);
    cprnm_ItemType_HERO_VULTURE_DRAGON = cprnm_ItemType__init_($rt_s(871), 514);
    cprnm_ItemType_HAMMER_TIME = cprnm_ItemType__init_($rt_s(872), 515);
    cprnm_ItemType_MEATY_BUTTER = cprnm_ItemType__init_($rt_s(873), 516);
    cprnm_ItemType_FOUNTAIN_OF_OLD_AGE = cprnm_ItemType__init_($rt_s(874), 517);
    cprnm_ItemType_ORGANIC_BOOK_OF_NATURE = cprnm_ItemType__init_($rt_s(875), 518);
    cprnm_ItemType_VOLATILE_SMOOTHIE = cprnm_ItemType__init_($rt_s(876), 519);
    cprnm_ItemType_ITEM_INFO = cprnm_ItemType__init_($rt_s(877), 520);
    cprnm_ItemType_ROCKET_CLOAK = cprnm_ItemType__init_($rt_s(878), 521);
    cprnm_ItemType_POLITICAL_PLATFORM_SHOES = cprnm_ItemType__init_($rt_s(879), 522);
    cprnm_ItemType_GLASS_CANNON = cprnm_ItemType__init_($rt_s(880), 523);
    cprnm_ItemType_LITTLE_PRICKS = cprnm_ItemType__init_($rt_s(881), 524);
    cprnm_ItemType_ORBITAL_KITTY = cprnm_ItemType__init_($rt_s(882), 525);
    cprnm_ItemType_RING_OF_ILL_WILL = cprnm_ItemType__init_($rt_s(883), 526);
    cprnm_ItemType_GOOD_GREEN_GOO = cprnm_ItemType__init_($rt_s(884), 527);
    cprnm_ItemType_WHITE_PICKET_SHIELD = cprnm_ItemType__init_($rt_s(885), 528);
    cprnm_ItemType_NUMBER_529 = cprnm_ItemType__init_($rt_s(886), 529);
    cprnm_ItemType_SICK_MULLET = cprnm_ItemType__init_($rt_s(887), 530);
    cprnm_ItemType_FOUR_D_GLASSES = cprnm_ItemType__init_($rt_s(888), 531);
    cprnm_ItemType_HAIR_OF_THE_DOG = cprnm_ItemType__init_($rt_s(889), 532);
    cprnm_ItemType_SKIN_BROZERKER_VETERAN = cprnm_ItemType__init_($rt_s(890), 533);
    cprnm_ItemType_SKIN_CRIMSON_WITCH_SORCERESS = cprnm_ItemType__init_($rt_s(891), 534);
    cprnm_ItemType_SKIN_GENIE_GOLDEN = cprnm_ItemType__init_($rt_s(892), 535);
    cprnm_ItemType_SKIN_MINOTAUR_MARAUDER = cprnm_ItemType__init_($rt_s(893), 536);
    cprnm_ItemType_SKIN_SAVAGE_CUTIE_RAVAGER = cprnm_ItemType__init_($rt_s(894), 537);
    cprnm_ItemType_SKIN_UNICORGI_ARMORED = cprnm_ItemType__init_($rt_s(895), 538);
    cprnm_ItemType_SKIN_SNAP_DRAGON_EVERGLADES = cprnm_ItemType__init_($rt_s(896), 539);
    cprnm_ItemType_SKIN_MAGIC_DRAGON_SPAGHETTI = cprnm_ItemType__init_($rt_s(897), 540);
    cprnm_ItemType_SKIN_SPIKEY_DRAGON_MECHA = cprnm_ItemType__init_($rt_s(898), 541);
    cprnm_ItemType_SKIN_DRUIDINATRIX_SPRING = cprnm_ItemType__init_($rt_s(899), 542);
    cprnm_ItemType_SKIN_CATAPULT_KNIGHT_UNICORN = cprnm_ItemType__init_($rt_s(900), 543);
    cprnm_ItemType_SKIN_DRAGZILLA_ZILLA = cprnm_ItemType__init_($rt_s(901), 544);
    cprnm_ItemType_SKIN_SNIPER_WOLF_DANCER = cprnm_ItemType__init_($rt_s(902), 545);
    cprnm_ItemType_STONE_BANSHEE = cprnm_ItemType__init_($rt_s(903), 546);
    cprnm_ItemType_HERO_BANSHEE = cprnm_ItemType__init_($rt_s(904), 547);
    cprnm_ItemType_STONE_RAGING_REVENANT = cprnm_ItemType__init_($rt_s(905), 548);
    cprnm_ItemType_HERO_RAGING_REVENANT = cprnm_ItemType__init_($rt_s(906), 549);
    cprnm_ItemType_STONE_SILENT_SPIRIT = cprnm_ItemType__init_($rt_s(907), 550);
    cprnm_ItemType_HERO_SILENT_SPIRIT = cprnm_ItemType__init_($rt_s(908), 551);
    cprnm_ItemType_STONE_SPECTRAL_DRAGON = cprnm_ItemType__init_($rt_s(909), 552);
    cprnm_ItemType_HERO_SPECTRAL_DRAGON = cprnm_ItemType__init_($rt_s(910), 553);
    cprnm_ItemType_SKIN_CYCLOPS_WIZARD_MASTERY = cprnm_ItemType__init_($rt_s(911), 554);
    cprnm_ItemType_SKIN_DEMON_TOTEM_MASTERY = cprnm_ItemType__init_($rt_s(912), 555);
    cprnm_ItemType_SKIN_SATYR_MASTERY = cprnm_ItemType__init_($rt_s(913), 556);
    cprnm_ItemType_SKIN_SHADOW_ASSASSIN_MASTERY = cprnm_ItemType__init_($rt_s(914), 557);
    cprnm_ItemType_SKIN_STORM_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(915), 558);
    cprnm_ItemType_REEL_SICK_MULLET = cprnm_ItemType__init_($rt_s(916), 559);
    cprnm_ItemType_REEL_ORBITAL_KITTY = cprnm_ItemType__init_($rt_s(917), 560);
    cprnm_ItemType_REEL_HAMMER_TIME = cprnm_ItemType__init_($rt_s(918), 561);
    cprnm_ItemType_SHARD_VOLATILE_SMOOTHIE = cprnm_ItemType__init_($rt_s(919), 562);
    cprnm_ItemType_SHARD_RING_OF_ILL_WILL = cprnm_ItemType__init_($rt_s(920), 563);
    cprnm_ItemType_SHARD_LITTLE_PRICKS = cprnm_ItemType__init_($rt_s(921), 564);
    cprnm_ItemType_SHARD_FOUR_D_GLASSES = cprnm_ItemType__init_($rt_s(922), 565);
    cprnm_ItemType_SHARD_REEL_SICK_MULLET = cprnm_ItemType__init_($rt_s(923), 566);
    cprnm_ItemType_SHARD_REEL_ORBITAL_KITTY = cprnm_ItemType__init_($rt_s(924), 567);
    cprnm_ItemType_SHARD_REEL_HAMMER_TIME = cprnm_ItemType__init_($rt_s(925), 568);
    cprnm_ItemType_SKIN_COSMIC_ELF_ALIEN = cprnm_ItemType__init_($rt_s(926), 569);
    cprnm_ItemType_SKIN_DEMON_TOTEM_KITTEN = cprnm_ItemType__init_($rt_s(927), 570);
    cprnm_ItemType_SKIN_SAVAGE_CUTIE_TADPOLE = cprnm_ItemType__init_($rt_s(928), 571);
    cprnm_ItemType_SKIN_DARK_HORSE_MASTERY = cprnm_ItemType__init_($rt_s(929), 572);
    cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_BALLERINA = cprnm_ItemType__init_($rt_s(930), 573);
    cprnm_ItemType_SKIN_BONE_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(931), 574);
    cprnm_ItemType_SKIN_DWARVEN_ARCHER_MASTERY = cprnm_ItemType__init_($rt_s(932), 575);
    cprnm_ItemType_SKIN_FAITH_HEALER_MASTERY = cprnm_ItemType__init_($rt_s(933), 576);
    cprnm_ItemType_SKIN_FROST_GIANT_FLAMING = cprnm_ItemType__init_($rt_s(934), 577);
    cprnm_ItemType_STONE_WEREDRAGON = cprnm_ItemType__init_($rt_s(935), 578);
    cprnm_ItemType_HERO_WEREDRAGON = cprnm_ItemType__init_($rt_s(936), 579);
    cprnm_ItemType_BOOM_BOX = cprnm_ItemType__init_($rt_s(937), 580);
    cprnm_ItemType_UPHOLSTERED_THRONE = cprnm_ItemType__init_($rt_s(938), 581);
    cprnm_ItemType_SHOES_OF_THE_MAD_GOD = cprnm_ItemType__init_($rt_s(939), 582);
    cprnm_ItemType_LOST_CONCEPT_ART = cprnm_ItemType__init_($rt_s(940), 583);
    cprnm_ItemType_LIGHTNING_GREASE = cprnm_ItemType__init_($rt_s(941), 584);
    cprnm_ItemType_PHAT_PANTS = cprnm_ItemType__init_($rt_s(942), 585);
    cprnm_ItemType_HEAL_AID = cprnm_ItemType__init_($rt_s(943), 586);
    cprnm_ItemType_BRAIN_PILLS = cprnm_ItemType__init_($rt_s(944), 587);
    cprnm_ItemType_FLAMEY_POOFS = cprnm_ItemType__init_($rt_s(945), 588);
    cprnm_ItemType_TUNNEL_VISION = cprnm_ItemType__init_($rt_s(946), 589);
    cprnm_ItemType_STAY_BOARD = cprnm_ItemType__init_($rt_s(947), 590);
    cprnm_ItemType_CAVE_DAGGER = cprnm_ItemType__init_($rt_s(948), 591);
    cprnm_ItemType_DESERT_SMASHER = cprnm_ItemType__init_($rt_s(949), 592);
    cprnm_ItemType_FEATHER_WEIGHT_PAULDRONS = cprnm_ItemType__init_($rt_s(950), 593);
    cprnm_ItemType_MUSCLE_BOUND_BOOK = cprnm_ItemType__init_($rt_s(951), 594);
    cprnm_ItemType_HOT_ARMOR = cprnm_ItemType__init_($rt_s(952), 595);
    cprnm_ItemType_REEL_BOOM_BOX = cprnm_ItemType__init_($rt_s(953), 596);
    cprnm_ItemType_REEL_UPHOLSTERED_THRONE = cprnm_ItemType__init_($rt_s(954), 597);
    cprnm_ItemType_REEL_SHOES_OF_THE_MAD_GOD = cprnm_ItemType__init_($rt_s(955), 598);
    cprnm_ItemType_SHARD_LOST_CONCEPT_ART = cprnm_ItemType__init_($rt_s(956), 599);
    cprnm_ItemType_SHARD_LIGHTNING_GREASE = cprnm_ItemType__init_($rt_s(957), 600);
    cprnm_ItemType_SHARD_PHAT_PANTS = cprnm_ItemType__init_($rt_s(958), 601);
    cprnm_ItemType_SHARD_HEAL_AID = cprnm_ItemType__init_($rt_s(959), 602);
    cprnm_ItemType_SHARD_REEL_BOOM_BOX = cprnm_ItemType__init_($rt_s(960), 603);
    cprnm_ItemType_SHARD_REEL_UPHOLSTERED_THRONE = cprnm_ItemType__init_($rt_s(961), 604);
    cprnm_ItemType_SHARD_REEL_SHOES_OF_THE_MAD_GOD = cprnm_ItemType__init_($rt_s(962), 605);
    cprnm_ItemType_STONE_WEE_WITCH = cprnm_ItemType__init_($rt_s(963), 606);
    cprnm_ItemType_HERO_WEE_WITCH = cprnm_ItemType__init_($rt_s(964), 607);
    cprnm_ItemType_HERO_DUNGEON_MAN = cprnm_ItemType__init_($rt_s(965), 608);
    cprnm_ItemType_STONE_DUNGEON_MAN = cprnm_ItemType__init_($rt_s(966), 609);
    cprnm_ItemType_STONE_PLAGUE_ENTREPRENEUR = cprnm_ItemType__init_($rt_s(967), 610);
    cprnm_ItemType_HERO_PLAGUE_ENTREPRENEUR = cprnm_ItemType__init_($rt_s(968), 611);
    cprnm_ItemType_SKIN_MEDUSA_BLACK_MAMBA = cprnm_ItemType__init_($rt_s(969), 612);
    cprnm_ItemType_SKIN_GROOVY_DRUID_MASTERY = cprnm_ItemType__init_($rt_s(970), 613);
    cprnm_ItemType_SKIN_HYDRA_MASTERY = cprnm_ItemType__init_($rt_s(971), 614);
    cprnm_ItemType_SKIN_ORC_MONK_ORCS = cprnm_ItemType__init_($rt_s(972), 615);
    cprnm_ItemType_SKIN_DRAGZILLA_DRAG = cprnm_ItemType__init_($rt_s(973), 616);
    cprnm_ItemType_HERO_MISTRESS_MANICURE = cprnm_ItemType__init_($rt_s(974), 617);
    cprnm_ItemType_STONE_MISTRESS_MANICURE = cprnm_ItemType__init_($rt_s(975), 618);
    cprnm_ItemType_STONE_VILE_BILE = cprnm_ItemType__init_($rt_s(976), 619);
    cprnm_ItemType_HERO_VILE_BILE = cprnm_ItemType__init_($rt_s(977), 620);
    cprnm_ItemType_SKIN_NINJA_DWARF_DATENIGHT = cprnm_ItemType__init_($rt_s(978), 621);
    cprnm_ItemType_SKIN_RABID_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(979), 622);
    cprnm_ItemType_SKIN_CENTAUR_OF_ATTENTION_MASTERY = cprnm_ItemType__init_($rt_s(980), 623);
    cprnm_ItemType_STONE_VOID_WYVERN = cprnm_ItemType__init_($rt_s(981), 624);
    cprnm_ItemType_SKIN_ORC_MONK_UNCLE = cprnm_ItemType__init_($rt_s(982), 625);
    cprnm_ItemType_EYE_ON_THE_PRIZE = cprnm_ItemType__init_($rt_s(983), 626);
    cprnm_ItemType_BRAIN_GUARD_9000 = cprnm_ItemType__init_($rt_s(984), 627);
    cprnm_ItemType_BEARLY_THERE_BOOTS = cprnm_ItemType__init_($rt_s(985), 628);
    cprnm_ItemType_TIME_KILLER = cprnm_ItemType__init_($rt_s(986), 629);
    cprnm_ItemType_DOUBLE_BLADED_SWORD = cprnm_ItemType__init_($rt_s(987), 630);
    cprnm_ItemType_SOUL_PUPPET = cprnm_ItemType__init_($rt_s(988), 631);
    cprnm_ItemType_HEARTY_CHEST = cprnm_ItemType__init_($rt_s(989), 632);
    cprnm_ItemType_MIND_MAP = cprnm_ItemType__init_($rt_s(990), 633);
    cprnm_ItemType_TIME_SAVER = cprnm_ItemType__init_($rt_s(991), 634);
    cprnm_ItemType_CANNON_CANOE = cprnm_ItemType__init_($rt_s(992), 635);
    cprnm_ItemType_NEW_KNIGHT_IN_TOWN = cprnm_ItemType__init_($rt_s(993), 636);
    cprnm_ItemType_BLACKSMITH_BREW = cprnm_ItemType__init_($rt_s(994), 637);
    cprnm_ItemType_ARCANE_DOODLES = cprnm_ItemType__init_($rt_s(995), 638);
    cprnm_ItemType_BELL_OF_SILENCE = cprnm_ItemType__init_($rt_s(996), 639);
    cprnm_ItemType_FEATHERWEIGHT_WINGS = cprnm_ItemType__init_($rt_s(997), 640);
    cprnm_ItemType_ADVENTURERS_STARTER_PACK = cprnm_ItemType__init_($rt_s(998), 641);
    cprnm_ItemType_REEL_EYE_ON_THE_PRIZE = cprnm_ItemType__init_($rt_s(999), 642);
    cprnm_ItemType_REEL_BRAIN_GUARD_9000 = cprnm_ItemType__init_($rt_s(1000), 643);
    cprnm_ItemType_REEL_BEARLY_THERE_BOOTS = cprnm_ItemType__init_($rt_s(1001), 644);
    cprnm_ItemType_SHARD_TIME_KILLER = cprnm_ItemType__init_($rt_s(1002), 645);
    cprnm_ItemType_SHARD_DOUBLE_BLADED_SWORD = cprnm_ItemType__init_($rt_s(1003), 646);
    cprnm_ItemType_SHARD_SOUL_PUPPET = cprnm_ItemType__init_($rt_s(1004), 647);
    cprnm_ItemType_SHARD_HEARTY_CHEST = cprnm_ItemType__init_($rt_s(1005), 648);
    cprnm_ItemType_SHARD_REEL_EYE_ON_THE_PRIZE = cprnm_ItemType__init_($rt_s(1006), 649);
    cprnm_ItemType_SHARD_REEL_BRAIN_GUARD_9000 = cprnm_ItemType__init_($rt_s(1007), 650);
    cprnm_ItemType_SHARD_REEL_BEARLY_THERE_BOOTS = cprnm_ItemType__init_($rt_s(1008), 651);
    cprnm_ItemType_SKIN_STOWAWAY_SANTAS_HELPER = cprnm_ItemType__init_($rt_s(1009), 652);
    cprnm_ItemType_SKIN_FROST_GIANT_FURIOUS = cprnm_ItemType__init_($rt_s(1010), 653);
    cprnm_ItemType_SKIN_BONE_DRAGON_PEPPERMINT = cprnm_ItemType__init_($rt_s(1011), 654);
    cprnm_ItemType_SKIN_BARDBARIAN_WOOD_ELF = cprnm_ItemType__init_($rt_s(1012), 655);
    cprnm_ItemType_SKIN_MOON_DRAKE_FESTIVE_FAIRY = cprnm_ItemType__init_($rt_s(1013), 656);
    cprnm_ItemType_SKIN_DWARVEN_ARCHER_ROMANTIC = cprnm_ItemType__init_($rt_s(1014), 657);
    cprnm_ItemType_SKIN_RABID_DRAGON_DOGGY = cprnm_ItemType__init_($rt_s(1015), 658);
    cprnm_ItemType_SKIN_PIRATE_SPACE = cprnm_ItemType__init_($rt_s(1016), 659);
    cprnm_ItemType_SKIN_SILENT_SPIRIT_CLOWN = cprnm_ItemType__init_($rt_s(1017), 660);
    cprnm_ItemType_SKIN_PIRATE_MASTERY = cprnm_ItemType__init_($rt_s(1018), 661);
    cprnm_ItemType_SKIN_DUST_DEVIL_MASTERY = cprnm_ItemType__init_($rt_s(1019), 662);
    cprnm_ItemType_SKIN_ORC_MONK_MASTERY = cprnm_ItemType__init_($rt_s(1020), 663);
    cprnm_ItemType_HERO_VOID_WYVERN = cprnm_ItemType__init_($rt_s(1021), 664);
    cprnm_ItemType_SKIN_AQUATIC_MAN_MASTERY = cprnm_ItemType__init_($rt_s(1022), 665);
    cprnm_ItemType_SKIN_FROST_GIANT_MASTERY = cprnm_ItemType__init_($rt_s(1023), 666);
    cprnm_ItemType_SKIN_BANSHEE_BUTTON_DOLL = cprnm_ItemType__init_($rt_s(1024), 667);
    cprnm_ItemType_SKIN_COSMIC_ELF_MASTERY = cprnm_ItemType__init_($rt_s(1025), 668);
    cprnm_ItemType_MY_JAM = cprnm_ItemType__init_($rt_s(1026), 669);
    cprnm_ItemType_CREATINE_CACTUS = cprnm_ItemType__init_($rt_s(1027), 670);
    cprnm_ItemType_MUNDANE_MUSHROOMS = cprnm_ItemType__init_($rt_s(1028), 671);
    cprnm_ItemType_CROWNING_ACHIEVEMENT = cprnm_ItemType__init_($rt_s(1029), 672);
    cprnm_ItemType_FRIENDZONITE = cprnm_ItemType__init_($rt_s(1030), 673);
    cprnm_ItemType_THE_HUSTLE = cprnm_ItemType__init_($rt_s(1031), 674);
    cprnm_ItemType_FLOPPIN_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1032), 675);
    cprnm_ItemType_VOLCANIC_BLADE = cprnm_ItemType__init_($rt_s(1033), 676);
    cprnm_ItemType_ENGAGEMENT_KNUCKLES = cprnm_ItemType__init_($rt_s(1034), 677);
    cprnm_ItemType_MOON_LIGHT = cprnm_ItemType__init_($rt_s(1035), 678);
    cprnm_ItemType_GREAT_HORNED_HORN = cprnm_ItemType__init_($rt_s(1036), 679);
    cprnm_ItemType_HEART_HEALTH_CANDY = cprnm_ItemType__init_($rt_s(1037), 680);
    cprnm_ItemType_GROUND_GEARS = cprnm_ItemType__init_($rt_s(1038), 681);
    cprnm_ItemType_CLOAK_OF_THE_OWL = cprnm_ItemType__init_($rt_s(1039), 682);
    cprnm_ItemType_DODGY_JEWELRY = cprnm_ItemType__init_($rt_s(1040), 683);
    cprnm_ItemType_ALCHEMIST_STARTER_PACK = cprnm_ItemType__init_($rt_s(1041), 684);
    cprnm_ItemType_REEL_FLOPPIN_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1042), 685);
    cprnm_ItemType_REEL_HEART_HEALTH_CANDY = cprnm_ItemType__init_($rt_s(1043), 686);
    cprnm_ItemType_REEL_CLOAK_OF_THE_OWL = cprnm_ItemType__init_($rt_s(1044), 687);
    cprnm_ItemType_SHARD_REEL_FLOPPIN_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1045), 688);
    cprnm_ItemType_SHARD_REEL_HEART_HEALTH_CANDY = cprnm_ItemType__init_($rt_s(1046), 689);
    cprnm_ItemType_SHARD_REEL_CLOAK_OF_THE_OWL = cprnm_ItemType__init_($rt_s(1047), 690);
    cprnm_ItemType_SHARD_CREATINE_CACTUS = cprnm_ItemType__init_($rt_s(1048), 691);
    cprnm_ItemType_SHARD_MUNDANE_MUSHROOMS = cprnm_ItemType__init_($rt_s(1049), 692);
    cprnm_ItemType_SHARD_THE_HUSTLE = cprnm_ItemType__init_($rt_s(1050), 693);
    cprnm_ItemType_SHARD_GROUND_GEARS = cprnm_ItemType__init_($rt_s(1051), 694);
    cprnm_ItemType_STONE_BURNT_ONE = cprnm_ItemType__init_($rt_s(1052), 695);
    cprnm_ItemType_HERO_BURNT_ONE = cprnm_ItemType__init_($rt_s(1053), 696);
    cprnm_ItemType_SKIN_DOPPELGANGER_MOLTEN = cprnm_ItemType__init_($rt_s(1054), 697);
    cprnm_ItemType_CRUDE_SHIELD = cprnm_ItemType__init_($rt_s(1055), 698);
    cprnm_ItemType_DWARVEN_LIFTING_BELT = cprnm_ItemType__init_($rt_s(1056), 699);
    cprnm_ItemType_PURPLE_CHEST_ROLL_X1 = cprnm_ItemType__init_($rt_s(1057), 700);
    cprnm_ItemType_ORANGE_CHEST_ROLL_X1 = cprnm_ItemType__init_($rt_s(1058), 701);
    cprnm_ItemType_SKIN_STOWAWAY_MASTERY = cprnm_ItemType__init_($rt_s(1059), 702);
    cprnm_ItemType_SKIN_DOPPELGANGER_MASTERY = cprnm_ItemType__init_($rt_s(1060), 703);
    cprnm_ItemType_SKIN_KRAKEN_KING_MASTERY = cprnm_ItemType__init_($rt_s(1061), 704);
    cprnm_ItemType_SKIN_MAGIC_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1062), 705);
    cprnm_ItemType_SKIN_SNIPER_WOLF_ASTRAL_SPIRIT = cprnm_ItemType__init_($rt_s(1063), 706);
    cprnm_ItemType_SKIN_BARDBARIAN_HIGHSCORE = cprnm_ItemType__init_($rt_s(1064), 707);
    cprnm_ItemType_SKIN_GENIE_TARNISHED_DJINN = cprnm_ItemType__init_($rt_s(1065), 708);
    cprnm_ItemType_SKIN_AQUATIC_MAN_MANATEE = cprnm_ItemType__init_($rt_s(1066), 709);
    cprnm_ItemType_SKIN_UNICORGI_RAINBOW = cprnm_ItemType__init_($rt_s(1067), 710);
    cprnm_ItemType_SKIN_BONE_DRAGON_ADAMANTIUM = cprnm_ItemType__init_($rt_s(1068), 711);
    cprnm_ItemType_SKIN_SATYR_WOLF = cprnm_ItemType__init_($rt_s(1069), 712);
    cprnm_ItemType_SKIN_MOON_DRAKE_MECHA = cprnm_ItemType__init_($rt_s(1070), 713);
    cprnm_ItemType_SKIN_PLANT_SOUL_COUNTRY = cprnm_ItemType__init_($rt_s(1071), 714);
    cprnm_ItemType_SKIN_SKELETON_KING_ASCENDANT = cprnm_ItemType__init_($rt_s(1072), 715);
    cprnm_ItemType_SKIN_SKELETON_DEER_ASCENDANT_DEER = cprnm_ItemType__init_($rt_s(1073), 716);
    cprnm_ItemType_STONE_TOMB_ANGEL = cprnm_ItemType__init_($rt_s(1074), 717);
    cprnm_ItemType_HERO_TOMB_ANGEL = cprnm_ItemType__init_($rt_s(1075), 718);
    cprnm_ItemType_STONE_ANGELIC_HERALD = cprnm_ItemType__init_($rt_s(1076), 719);
    cprnm_ItemType_HERO_ANGELIC_HERALD = cprnm_ItemType__init_($rt_s(1077), 720);
    cprnm_ItemType_STONE_BULWARK_ANGEL = cprnm_ItemType__init_($rt_s(1078), 721);
    cprnm_ItemType_HERO_BULWARK_ANGEL = cprnm_ItemType__init_($rt_s(1079), 722);
    cprnm_ItemType_HERO_ANGEL_DRAGON = cprnm_ItemType__init_($rt_s(1080), 723);
    cprnm_ItemType_STONE_ANGEL_DRAGON = cprnm_ItemType__init_($rt_s(1081), 724);
    cprnm_ItemType_AGED_DRAGON_MILK = cprnm_ItemType__init_($rt_s(1082), 725);
    cprnm_ItemType_ANCIENT_CODE = cprnm_ItemType__init_($rt_s(1083), 726);
    cprnm_ItemType_AUTO_FLUTE = cprnm_ItemType__init_($rt_s(1084), 727);
    cprnm_ItemType_BLUNT_BLADE = cprnm_ItemType__init_($rt_s(1085), 728);
    cprnm_ItemType_DRACONIC_FUSE = cprnm_ItemType__init_($rt_s(1086), 729);
    cprnm_ItemType_FLATTERING_MIRROR = cprnm_ItemType__init_($rt_s(1087), 730);
    cprnm_ItemType_GIANTS_GROG = cprnm_ItemType__init_($rt_s(1088), 731);
    cprnm_ItemType_ILLUSORY_HURDLE = cprnm_ItemType__init_($rt_s(1089), 732);
    cprnm_ItemType_LION_LIQUEUR = cprnm_ItemType__init_($rt_s(1090), 733);
    cprnm_ItemType_LOST_GREAVES = cprnm_ItemType__init_($rt_s(1091), 734);
    cprnm_ItemType_POISONED_DAGGER = cprnm_ItemType__init_($rt_s(1092), 735);
    cprnm_ItemType_RINGS_OF_A_FEATHER = cprnm_ItemType__init_($rt_s(1093), 736);
    cprnm_ItemType_SPIDER_BOMB = cprnm_ItemType__init_($rt_s(1094), 737);
    cprnm_ItemType_VANISHING_SCROLL = cprnm_ItemType__init_($rt_s(1095), 738);
    cprnm_ItemType_SHARD_GIANTS_GROG = cprnm_ItemType__init_($rt_s(1096), 739);
    cprnm_ItemType_REEL_FLATTERING_MIRROR = cprnm_ItemType__init_($rt_s(1097), 740);
    cprnm_ItemType_REEL_BLUNT_BLADE = cprnm_ItemType__init_($rt_s(1098), 741);
    cprnm_ItemType_REEL_LOST_GREAVES = cprnm_ItemType__init_($rt_s(1099), 742);
    cprnm_ItemType_SHARD_AGED_DRAGON_MILK = cprnm_ItemType__init_($rt_s(1100), 743);
    cprnm_ItemType_SHARD_POISONED_DAGGER = cprnm_ItemType__init_($rt_s(1101), 744);
    cprnm_ItemType_SHARD_RINGS_OF_A_FEATHER = cprnm_ItemType__init_($rt_s(1102), 745);
    cprnm_ItemType_SHARD_REEL_FLATTERING_MIRROR = cprnm_ItemType__init_($rt_s(1103), 746);
    cprnm_ItemType_SHARD_REEL_BLUNT_BLADE = cprnm_ItemType__init_($rt_s(1104), 747);
    cprnm_ItemType_SHARD_REEL_LOST_GREAVES = cprnm_ItemType__init_($rt_s(1105), 748);
    cprnm_ItemType_STONE_DRAGON_SLAYER = cprnm_ItemType__init_($rt_s(1106), 749);
    cprnm_ItemType_HERO_DRAGON_SLAYER = cprnm_ItemType__init_($rt_s(1107), 750);
    cprnm_ItemType_STONE_ETERNAL_ENCHANTER = cprnm_ItemType__init_($rt_s(1108), 751);
    cprnm_ItemType_HERO_ETERNAL_ENCHANTER = cprnm_ItemType__init_($rt_s(1109), 752);
    cprnm_ItemType_STONE_GRAND_HUNTRESS = cprnm_ItemType__init_($rt_s(1110), 753);
    cprnm_ItemType_HERO_GRAND_HUNTRESS = cprnm_ItemType__init_($rt_s(1111), 754);
    cprnm_ItemType_STONE_TRIPLE_THREAT = cprnm_ItemType__init_($rt_s(1112), 755);
    cprnm_ItemType_HERO_TRIPLE_THREAT = cprnm_ItemType__init_($rt_s(1113), 756);
    cprnm_ItemType_SKIN_RAGING_REVENANT_MASTERY = cprnm_ItemType__init_($rt_s(1114), 757);
    cprnm_ItemType_SKIN_VULTURE_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1115), 758);
    cprnm_ItemType_TRIASSIC_TRINKET = cprnm_ItemType__init_($rt_s(1116), 759);
    cprnm_ItemType_RUBY_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1117), 760);
    cprnm_ItemType_PURIFICATION_ROBE = cprnm_ItemType__init_($rt_s(1118), 761);
    cprnm_ItemType_DENSE_CAKE_OF_HATE = cprnm_ItemType__init_($rt_s(1119), 762);
    cprnm_ItemType_CRUDE_SNIPPERS = cprnm_ItemType__init_($rt_s(1120), 763);
    cprnm_ItemType_MAD_GODS_MUG = cprnm_ItemType__init_($rt_s(1121), 764);
    cprnm_ItemType_GOLDEN_SLINGSHOT = cprnm_ItemType__init_($rt_s(1122), 765);
    cprnm_ItemType_CAT_O_NINE_TAILS = cprnm_ItemType__init_($rt_s(1123), 766);
    cprnm_ItemType_FEATHER_WEIGHT_FOIL = cprnm_ItemType__init_($rt_s(1124), 767);
    cprnm_ItemType_TOME_OF_CURSED_HORTICULTURE = cprnm_ItemType__init_($rt_s(1125), 768);
    cprnm_ItemType_ESCUTCHEON_OF_EYES = cprnm_ItemType__init_($rt_s(1126), 769);
    cprnm_ItemType_SOUL_FOR_POWER_VOLUME_45 = cprnm_ItemType__init_($rt_s(1127), 770);
    cprnm_ItemType_OGRES_BATTERING_RAM = cprnm_ItemType__init_($rt_s(1128), 771);
    cprnm_ItemType_COG_NITIVE_MASK = cprnm_ItemType__init_($rt_s(1129), 772);
    cprnm_ItemType_BUNNY_BLADE = cprnm_ItemType__init_($rt_s(1130), 773);
    cprnm_ItemType_HEART_HAT = cprnm_ItemType__init_($rt_s(1131), 774);
    cprnm_ItemType_DRAGON_BLANKIE = cprnm_ItemType__init_($rt_s(1132), 775);
    cprnm_ItemType_RING_OF_FIRE = cprnm_ItemType__init_($rt_s(1133), 776);
    cprnm_ItemType_NAUGHTY_TAPESTRY = cprnm_ItemType__init_($rt_s(1134), 777);
    cprnm_ItemType_MANLY_FIRST_AID_KIT = cprnm_ItemType__init_($rt_s(1135), 778);
    cprnm_ItemType_SHARD_CRUDE_SNIPPERS = cprnm_ItemType__init_($rt_s(1136), 779);
    cprnm_ItemType_SHARD_MAD_GODS_MUG = cprnm_ItemType__init_($rt_s(1137), 780);
    cprnm_ItemType_SHARD_GOLDEN_SLINGSHOT = cprnm_ItemType__init_($rt_s(1138), 781);
    cprnm_ItemType_SHARD_CAT_O_NINE_TAILS = cprnm_ItemType__init_($rt_s(1139), 782);
    cprnm_ItemType_SHARD_DRAGON_BLANKIE = cprnm_ItemType__init_($rt_s(1140), 783);
    cprnm_ItemType_SHARD_RING_OF_FIRE = cprnm_ItemType__init_($rt_s(1141), 784);
    cprnm_ItemType_SHARD_NAUGHTY_TAPESTRY = cprnm_ItemType__init_($rt_s(1142), 785);
    cprnm_ItemType_SHARD_MANLY_FIRST_AID_KIT = cprnm_ItemType__init_($rt_s(1143), 786);
    cprnm_ItemType_REEL_ROCKET_CLOAK = cprnm_ItemType__init_($rt_s(1144), 787);
    cprnm_ItemType_REEL_ANCIENT_CODE = cprnm_ItemType__init_($rt_s(1145), 788);
    cprnm_ItemType_REEL_BLACKSMITH_BREW = cprnm_ItemType__init_($rt_s(1146), 789);
    cprnm_ItemType_REEL_FEATHER_WEIGHT_PAULDRONS = cprnm_ItemType__init_($rt_s(1147), 790);
    cprnm_ItemType_REEL_TRIASSIC_TRINKET = cprnm_ItemType__init_($rt_s(1148), 791);
    cprnm_ItemType_REEL_RUBY_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1149), 792);
    cprnm_ItemType_REEL_PURIFICATION_ROBE = cprnm_ItemType__init_($rt_s(1150), 793);
    cprnm_ItemType_REEL_DENSE_CAKE_OF_HATE = cprnm_ItemType__init_($rt_s(1151), 794);
    cprnm_ItemType_SREEL_FEATHER_WEIGHT_FOIL = cprnm_ItemType__init_($rt_s(1152), 795);
    cprnm_ItemType_REEL_TOME_OF_CURSED_HORTICULTURE = cprnm_ItemType__init_($rt_s(1153), 796);
    cprnm_ItemType_REEL_ESCUTCHEON_OF_EYES = cprnm_ItemType__init_($rt_s(1154), 797);
    cprnm_ItemType_REEL_SOUL_FOR_POWER_VOLUME_45 = cprnm_ItemType__init_($rt_s(1155), 798);
    cprnm_ItemType_REEL_OGRES_BATTERING_RAM = cprnm_ItemType__init_($rt_s(1156), 799);
    cprnm_ItemType_REEL_COG_NITIVE_MASK = cprnm_ItemType__init_($rt_s(1157), 800);
    cprnm_ItemType_REEL_BUNNY_BLADE = cprnm_ItemType__init_($rt_s(1158), 801);
    cprnm_ItemType_REEL_HEART_HAT = cprnm_ItemType__init_($rt_s(1159), 802);
    cprnm_ItemType_REEL_FEATHER_WEIGHT_FOIL = cprnm_ItemType__init_($rt_s(1160), 803);
    cprnm_ItemType_SHARD_REEL_ANCIENT_CODE = cprnm_ItemType__init_($rt_s(1161), 804);
    cprnm_ItemType_SHARD_REEL_BLACKSMITH_BREW = cprnm_ItemType__init_($rt_s(1162), 805);
    cprnm_ItemType_SHARD_REEL_BUNNY_BLADE = cprnm_ItemType__init_($rt_s(1163), 806);
    cprnm_ItemType_SHARD_REEL_DENSE_CAKE_OF_HATE = cprnm_ItemType__init_($rt_s(1164), 807);
    cprnm_ItemType_SHARD_REEL_ESCUTCHEON_OF_EYES = cprnm_ItemType__init_($rt_s(1165), 808);
    cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_FOIL = cprnm_ItemType__init_($rt_s(1166), 809);
    cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_PAULDRONS = cprnm_ItemType__init_($rt_s(1167), 810);
    cprnm_ItemType_SHARD_REEL_HEART_HAT = cprnm_ItemType__init_($rt_s(1168), 811);
    cprnm_ItemType_SHARD_REEL_OGRES_BATTERING_RAM = cprnm_ItemType__init_($rt_s(1169), 812);
    cprnm_ItemType_SHARD_REEL_PURIFICATION_ROBE = cprnm_ItemType__init_($rt_s(1170), 813);
    cprnm_ItemType_SHARD_REEL_ROCKET_CLOAK = cprnm_ItemType__init_($rt_s(1171), 814);
    cprnm_ItemType_SHARD_REEL_RUBY_FLIP_FLOPS = cprnm_ItemType__init_($rt_s(1172), 815);
    cprnm_ItemType_SHARD_REEL_SOUL_FOR_POWER_VOLUME_45 = cprnm_ItemType__init_($rt_s(1173), 816);
    cprnm_ItemType_SHARD_REEL_TOME_OF_CURSED_HORTICULTURE = cprnm_ItemType__init_($rt_s(1174), 817);
    cprnm_ItemType_SHARD_REEL_TRIASSIC_TRINKET = cprnm_ItemType__init_($rt_s(1175), 818);
    cprnm_ItemType_STONE_LAST_DEFENDER = cprnm_ItemType__init_($rt_s(1176), 819);
    cprnm_ItemType_HERO_LAST_DEFENDER = cprnm_ItemType__init_($rt_s(1177), 820);
    cprnm_ItemType_STONE_SOJOURNER_SORCERESS = cprnm_ItemType__init_($rt_s(1178), 821);
    cprnm_ItemType_HERO_SOJOURNER_SORCERESS = cprnm_ItemType__init_($rt_s(1179), 822);
    cprnm_ItemType_STONE_KARAOKE_KING = cprnm_ItemType__init_($rt_s(1180), 823);
    cprnm_ItemType_HERO_KARAOKE_KING = cprnm_ItemType__init_($rt_s(1181), 824);
    cprnm_ItemType_SHARD_REEL_COG_NITIVE_MASK = cprnm_ItemType__init_($rt_s(1182), 825);
    cprnm_ItemType_SKIN_SOJOURNER_SORCERESS_CHRISTMAS = cprnm_ItemType__init_($rt_s(1183), 826);
    cprnm_ItemType_STONE_SHADOW_OF_SVEN = cprnm_ItemType__init_($rt_s(1184), 827);
    cprnm_ItemType_HERO_SHADOW_OF_SVEN = cprnm_ItemType__init_($rt_s(1185), 828);
    cprnm_ItemType_STONE_SUN_SEEKER = cprnm_ItemType__init_($rt_s(1186), 829);
    cprnm_ItemType_HERO_SUN_SEEKER = cprnm_ItemType__init_($rt_s(1187), 830);
    cprnm_ItemType_STONE_STEPLADDER_BROTHERS = cprnm_ItemType__init_($rt_s(1188), 831);
    cprnm_ItemType_HERO_STEPLADDER_BROTHERS = cprnm_ItemType__init_($rt_s(1189), 832);
    cprnm_ItemType_STONE_FORGOTTEN_DRAGON = cprnm_ItemType__init_($rt_s(1190), 833);
    cprnm_ItemType_HERO_FORGOTTEN_DRAGON = cprnm_ItemType__init_($rt_s(1191), 834);
    cprnm_ItemType_SKIN_WEE_WITCH_MASTERY = cprnm_ItemType__init_($rt_s(1192), 835);
    cprnm_ItemType_SKIN_BANSHEE_MASTERY = cprnm_ItemType__init_($rt_s(1193), 836);
    cprnm_ItemType_SKIN_SILENT_SPIRIT_MASTERY = cprnm_ItemType__init_($rt_s(1194), 837);
    cprnm_ItemType_SKIN_SPECTRAL_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1195), 838);
    cprnm_ItemType_TEAM_XP_BONUS_ITEM_12_HOUR = cprnm_ItemType__init_($rt_s(1196), 839);
    cprnm_ItemType_TEAM_XP_BONUS_ITEM_24_HOUR = cprnm_ItemType__init_($rt_s(1197), 840);
    cprnm_ItemType_TEAM_XP_BONUS_ITEM_72_HOUR = cprnm_ItemType__init_($rt_s(1198), 841);
    cprnm_ItemType_BRACELET_OF_LIGHTNING = cprnm_ItemType__init_($rt_s(1199), 842);
    cprnm_ItemType_HELMET_OF_FORESIGHT = cprnm_ItemType__init_($rt_s(1200), 843);
    cprnm_ItemType_DRAGONS_BLADE = cprnm_ItemType__init_($rt_s(1201), 844);
    cprnm_ItemType_GREAVES_OF_PLEIAS = cprnm_ItemType__init_($rt_s(1202), 845);
    cprnm_ItemType_SWORD_OF_DESPAIR = cprnm_ItemType__init_($rt_s(1203), 846);
    cprnm_ItemType_RING_OF_TEMPTATION = cprnm_ItemType__init_($rt_s(1204), 847);
    cprnm_ItemType_MAI_TAI_OF_IMMUNITY = cprnm_ItemType__init_($rt_s(1205), 848);
    cprnm_ItemType_WRAITH_BARRIER = cprnm_ItemType__init_($rt_s(1206), 849);
    cprnm_ItemType_GAUNTLET_OF_THRONE = cprnm_ItemType__init_($rt_s(1207), 850);
    cprnm_ItemType_BOOK_OF_IRMAC = cprnm_ItemType__init_($rt_s(1208), 851);
    cprnm_ItemType_PHOENIX_TALISMAN = cprnm_ItemType__init_($rt_s(1209), 852);
    cprnm_ItemType_LAZARUS_BEANS = cprnm_ItemType__init_($rt_s(1210), 853);
    cprnm_ItemType_REEL_BRACELET_OF_LIGHTNING = cprnm_ItemType__init_($rt_s(1211), 854);
    cprnm_ItemType_REEL_HELMET_OF_FORESIGHT = cprnm_ItemType__init_($rt_s(1212), 855);
    cprnm_ItemType_REEL_DRAGONS_BLADE = cprnm_ItemType__init_($rt_s(1213), 856);
    cprnm_ItemType_REEL_GREAVES_OF_PLEIAS = cprnm_ItemType__init_($rt_s(1214), 857);
    cprnm_ItemType_REEL_SWORD_OF_DESPAIR = cprnm_ItemType__init_($rt_s(1215), 858);
    cprnm_ItemType_REEL_RING_OF_TEMPTATION = cprnm_ItemType__init_($rt_s(1216), 859);
    cprnm_ItemType_REEL_MAI_TAI_OF_IMMUNITY = cprnm_ItemType__init_($rt_s(1217), 860);
    cprnm_ItemType_REEL_WRAITH_BARRIER = cprnm_ItemType__init_($rt_s(1218), 861);
    cprnm_ItemType_SHARD_GAUNTLET_OF_THRONE = cprnm_ItemType__init_($rt_s(1219), 862);
    cprnm_ItemType_SHARD_BOOK_OF_IRMAC = cprnm_ItemType__init_($rt_s(1220), 863);
    cprnm_ItemType_SHARD_PHOENIX_TALISMAN = cprnm_ItemType__init_($rt_s(1221), 864);
    cprnm_ItemType_SHARD_LAZARUS_BEANS = cprnm_ItemType__init_($rt_s(1222), 865);
    cprnm_ItemType_SHARD_REEL_BRACELET_OF_LIGHTNING = cprnm_ItemType__init_($rt_s(1223), 866);
    cprnm_ItemType_SHARD_REEL_HELMET_OF_FORESIGHT = cprnm_ItemType__init_($rt_s(1224), 867);
    cprnm_ItemType_SHARD_REEL_DRAGONS_BLADE = cprnm_ItemType__init_($rt_s(1225), 868);
    cprnm_ItemType_SHARD_REEL_GREAVES_OF_PLEIAS = cprnm_ItemType__init_($rt_s(1226), 869);
    cprnm_ItemType_SHARD_REEL_SWORD_OF_DESPAIR = cprnm_ItemType__init_($rt_s(1227), 870);
    cprnm_ItemType_SHARD_REEL_RING_OF_TEMPTATION = cprnm_ItemType__init_($rt_s(1228), 871);
    cprnm_ItemType_SHARD_REEL_MAI_TAI_OF_IMMUNITY = cprnm_ItemType__init_($rt_s(1229), 872);
    cprnm_ItemType_SHARD_REEL_WRAITH_BARRIER = cprnm_ItemType__init_($rt_s(1230), 873);
    cprnm_ItemType_SKIN_CYCLOPS_WIZARD_VALENTINE = cprnm_ItemType__init_($rt_s(1231), 874);
    cprnm_ItemType_SKIN_ROLLER_WARRIOR_VALENTINE = cprnm_ItemType__init_($rt_s(1232), 875);
    cprnm_ItemType_STONE_BLACK_WING = cprnm_ItemType__init_($rt_s(1233), 876);
    cprnm_ItemType_HERO_BLACK_WING = cprnm_ItemType__init_($rt_s(1234), 877);
    cprnm_ItemType_STONE_GREED_DRAGON = cprnm_ItemType__init_($rt_s(1235), 878);
    cprnm_ItemType_HERO_GREED_DRAGON = cprnm_ItemType__init_($rt_s(1236), 879);
    cprnm_ItemType_STONE_UNRIPE_MYTHOLOGY = cprnm_ItemType__init_($rt_s(1237), 880);
    cprnm_ItemType_HERO_UNRIPE_MYTHOLOGY = cprnm_ItemType__init_($rt_s(1238), 881);
    cprnm_ItemType_SKIN_WEREDRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1239), 882);
    cprnm_ItemType_SKIN_DUNGEON_MAN_MASTERY = cprnm_ItemType__init_($rt_s(1240), 883);
    cprnm_ItemType_STEAM_ENGINE = cprnm_ItemType__init_($rt_s(1241), 884);
    cprnm_ItemType_IRON_HELMET_OF_BIKING = cprnm_ItemType__init_($rt_s(1242), 885);
    cprnm_ItemType_ADVENTURERS_RIDES = cprnm_ItemType__init_($rt_s(1243), 886);
    cprnm_ItemType_DRAGON_LEATHER_TIGHTS = cprnm_ItemType__init_($rt_s(1244), 887);
    cprnm_ItemType_BONE_CRUSHING_PLIERS = cprnm_ItemType__init_($rt_s(1245), 888);
    cprnm_ItemType_MYSTERIOUS_EGG = cprnm_ItemType__init_($rt_s(1246), 889);
    cprnm_ItemType_MAGICAL_PEST_MAST = cprnm_ItemType__init_($rt_s(1247), 890);
    cprnm_ItemType_THE_SHIELD_STOPS_YOU = cprnm_ItemType__init_($rt_s(1248), 891);
    cprnm_ItemType_DOUBLE_AXE = cprnm_ItemType__init_($rt_s(1249), 892);
    cprnm_ItemType_DEVILS_POT = cprnm_ItemType__init_($rt_s(1250), 893);
    cprnm_ItemType_DRAGONS_POCKET_WATCH = cprnm_ItemType__init_($rt_s(1251), 894);
    cprnm_ItemType_FAMILIAR_ENERGY_TANK = cprnm_ItemType__init_($rt_s(1252), 895);
    cprnm_ItemType_REEL_STEAM_ENGINE = cprnm_ItemType__init_($rt_s(1253), 896);
    cprnm_ItemType_REEL_IRON_HELMET_OF_BIKING = cprnm_ItemType__init_($rt_s(1254), 897);
    cprnm_ItemType_REEL_ADVENTURERS_RIDES = cprnm_ItemType__init_($rt_s(1255), 898);
    cprnm_ItemType_REEL_DRAGON_LEATHER_TIGHTS = cprnm_ItemType__init_($rt_s(1256), 899);
    cprnm_ItemType_REEL_BONE_CRUSHING_PLIERS = cprnm_ItemType__init_($rt_s(1257), 900);
    cprnm_ItemType_REEL_MYSTERIOUS_EGG = cprnm_ItemType__init_($rt_s(1258), 901);
    cprnm_ItemType_REEL_MAGICAL_PEST_MAST = cprnm_ItemType__init_($rt_s(1259), 902);
    cprnm_ItemType_REEL_THE_SHIELD_STOPS_YOU = cprnm_ItemType__init_($rt_s(1260), 903);
    cprnm_ItemType_SHARD_DOUBLE_AXE = cprnm_ItemType__init_($rt_s(1261), 904);
    cprnm_ItemType_SHARD_DEVILS_POT = cprnm_ItemType__init_($rt_s(1262), 905);
    cprnm_ItemType_SHARD_DRAGONS_POCKET_WATCH = cprnm_ItemType__init_($rt_s(1263), 906);
    cprnm_ItemType_SHARD_FAMILIAR_ENERGY_TANK = cprnm_ItemType__init_($rt_s(1264), 907);
    cprnm_ItemType_SHARD_REEL_STEAM_ENGINE = cprnm_ItemType__init_($rt_s(1265), 908);
    cprnm_ItemType_SHARD_REEL_IRON_HELMET_OF_BIKING = cprnm_ItemType__init_($rt_s(1266), 909);
    cprnm_ItemType_SHARD_REEL_ADVENTURERS_RIDES = cprnm_ItemType__init_($rt_s(1267), 910);
    cprnm_ItemType_SHARD_REEL_DRAGON_LEATHER_TIGHTS = cprnm_ItemType__init_($rt_s(1268), 911);
    cprnm_ItemType_SHARD_REEL_BONE_CRUSHING_PLIERS = cprnm_ItemType__init_($rt_s(1269), 912);
    cprnm_ItemType_SHARD_REEL_MYSTERIOUS_EGG = cprnm_ItemType__init_($rt_s(1270), 913);
    cprnm_ItemType_SHARD_REEL_MAGICAL_PEST_MAST = cprnm_ItemType__init_($rt_s(1271), 914);
    cprnm_ItemType_SHARD_REEL_THE_SHIELD_STOPS_YOU = cprnm_ItemType__init_($rt_s(1272), 915);
    cprnm_ItemType_WORLD_EGG = cprnm_ItemType__init_($rt_s(1273), 916);
    cprnm_ItemType_SKIN_WEE_WITCH_EASTER = cprnm_ItemType__init_($rt_s(1274), 917);
    cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_EASTER = cprnm_ItemType__init_($rt_s(1275), 918);
    cprnm_ItemType_SKIN_SPECTRAL_DRAGON_EASTER = cprnm_ItemType__init_($rt_s(1276), 919);
    cprnm_ItemType_SKIN_DRUIDINATRIX_EASTER = cprnm_ItemType__init_($rt_s(1277), 920);
    cprnm_ItemType_STONE_ANCIENT_DWARF = cprnm_ItemType__init_($rt_s(1278), 921);
    cprnm_ItemType_HERO_ANCIENT_DWARF = cprnm_ItemType__init_($rt_s(1279), 922);
    cprnm_ItemType_STONE_DIGGER_MOLE = cprnm_ItemType__init_($rt_s(1280), 923);
    cprnm_ItemType_HERO_DIGGER_MOLE = cprnm_ItemType__init_($rt_s(1281), 924);
    cprnm_ItemType_STONE_SADISTIC_DANCER = cprnm_ItemType__init_($rt_s(1282), 925);
    cprnm_ItemType_HERO_SADISTIC_DANCER = cprnm_ItemType__init_($rt_s(1283), 926);
    cprnm_ItemType_DRAGON_SAND_BOOTS = cprnm_ItemType__init_($rt_s(1284), 927);
    cprnm_ItemType_PYRAMID_POWER = cprnm_ItemType__init_($rt_s(1285), 928);
    cprnm_ItemType_NAVIGATION_TO_THE_PAST = cprnm_ItemType__init_($rt_s(1286), 929);
    cprnm_ItemType_BALANCE_OF_LIFE = cprnm_ItemType__init_($rt_s(1287), 930);
    cprnm_ItemType_MIRACLE_FURNACE_OF_BLACKSMITH = cprnm_ItemType__init_($rt_s(1288), 931);
    cprnm_ItemType_GOOD_SLEEPING_BED = cprnm_ItemType__init_($rt_s(1289), 932);
    cprnm_ItemType_SUNBLOCK_GOGGLES = cprnm_ItemType__init_($rt_s(1290), 933);
    cprnm_ItemType_SAND_STORM = cprnm_ItemType__init_($rt_s(1291), 934);
    cprnm_ItemType_MASK_OF_THE_ANCIENT_KING = cprnm_ItemType__init_($rt_s(1292), 935);
    cprnm_ItemType_MAGICAL_CREAM = cprnm_ItemType__init_($rt_s(1293), 936);
    cprnm_ItemType_DANCERS_BRA = cprnm_ItemType__init_($rt_s(1294), 937);
    cprnm_ItemType_PRICKLING_WHIP = cprnm_ItemType__init_($rt_s(1295), 938);
    cprnm_ItemType_WILDYS_HAT = cprnm_ItemType__init_($rt_s(1296), 939);
    cprnm_ItemType_IRON_CLAWS = cprnm_ItemType__init_($rt_s(1297), 940);
    cprnm_ItemType_MAGICAL_WATER_BOTTLE = cprnm_ItemType__init_($rt_s(1298), 941);
    cprnm_ItemType_REEL_DRAGON_SAND_BOOTS = cprnm_ItemType__init_($rt_s(1299), 942);
    cprnm_ItemType_REEL_PYRAMID_POWER = cprnm_ItemType__init_($rt_s(1300), 943);
    cprnm_ItemType_REEL_NAVIGATION_TO_THE_PAST = cprnm_ItemType__init_($rt_s(1301), 944);
    cprnm_ItemType_REEL_BALANCE_OF_LIFE = cprnm_ItemType__init_($rt_s(1302), 945);
    cprnm_ItemType_REEL_MIRACLE_FURNACE_OF_BLACKSMITH = cprnm_ItemType__init_($rt_s(1303), 946);
    cprnm_ItemType_REEL_GOOD_SLEEPING_BED = cprnm_ItemType__init_($rt_s(1304), 947);
    cprnm_ItemType_REEL_SUNBLOCK_GOGGLES = cprnm_ItemType__init_($rt_s(1305), 948);
    cprnm_ItemType_REEL_SAND_STORM = cprnm_ItemType__init_($rt_s(1306), 949);
    cprnm_ItemType_REEL_MASK_OF_THE_ANCIENT_KING = cprnm_ItemType__init_($rt_s(1307), 950);
    cprnm_ItemType_REEL_MAGICAL_CREAM = cprnm_ItemType__init_($rt_s(1308), 951);
    cprnm_ItemType_REEL_DANCERS_BRA = cprnm_ItemType__init_($rt_s(1309), 952);
    cprnm_ItemType_SHARD_PRICKLING_WHIP = cprnm_ItemType__init_($rt_s(1310), 953);
    cprnm_ItemType_SHARD_WILDYS_HAT = cprnm_ItemType__init_($rt_s(1311), 954);
    cprnm_ItemType_SHARD_IRON_CLAWS = cprnm_ItemType__init_($rt_s(1312), 955);
    cprnm_ItemType_SHARD_MAGICAL_WATER_BOTTLE = cprnm_ItemType__init_($rt_s(1313), 956);
    cprnm_ItemType_SHARD_REEL_DRAGON_SAND_BOOTS = cprnm_ItemType__init_($rt_s(1314), 957);
    cprnm_ItemType_SHARD_REEL_PYRAMID_POWER = cprnm_ItemType__init_($rt_s(1315), 958);
    cprnm_ItemType_SHARD_REEL_NAVIGATION_TO_THE_PAST = cprnm_ItemType__init_($rt_s(1316), 959);
    cprnm_ItemType_SHARD_REEL_BALANCE_OF_LIFE = cprnm_ItemType__init_($rt_s(1317), 960);
    cprnm_ItemType_SHARD_REEL_MIRACLE_FURNACE_OF_BLACKSMITH = cprnm_ItemType__init_($rt_s(1318), 961);
    cprnm_ItemType_SHARD_REEL_GOOD_SLEEPING_BED = cprnm_ItemType__init_($rt_s(1319), 962);
    cprnm_ItemType_SHARD_REEL_SUNBLOCK_GOGGLES = cprnm_ItemType__init_($rt_s(1320), 963);
    cprnm_ItemType_SHARD_REEL_SAND_STORM = cprnm_ItemType__init_($rt_s(1321), 964);
    cprnm_ItemType_SHARD_REEL_MASK_OF_THE_ANCIENT_KING = cprnm_ItemType__init_($rt_s(1322), 965);
    cprnm_ItemType_SHARD_REEL_MAGICAL_CREAM = cprnm_ItemType__init_($rt_s(1323), 966);
    cprnm_ItemType_SHARD_REEL_DANCERS_BRA = cprnm_ItemType__init_($rt_s(1324), 967);
    cprnm_ItemType_SKIN_MISTRESS_MANICURE_MASTERY = cprnm_ItemType__init_($rt_s(1325), 968);
    cprnm_ItemType_SKIN_VOID_WYVERN_MASTERY = cprnm_ItemType__init_($rt_s(1326), 969);
    cprnm_ItemType_SKIN_DRAGZILLA_MASTERY = cprnm_ItemType__init_($rt_s(1327), 970);
    cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_MASTERY = cprnm_ItemType__init_($rt_s(1328), 971);
    cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_DIGITAL = cprnm_ItemType__init_($rt_s(1329), 972);
    cprnm_ItemType_SKIN_DRAGON_LADY_SPACE_KNIGHT = cprnm_ItemType__init_($rt_s(1330), 973);
    cprnm_ItemType_SKIN_SHADOW_ASSASSIN_WATCH = cprnm_ItemType__init_($rt_s(1331), 974);
    cprnm_ItemType_SKIN_CYCLOPS_WIZARD_CYCLEOPS = cprnm_ItemType__init_($rt_s(1332), 975);
    cprnm_ItemType_SKIN_VOID_WYVERN_IMAGINATION = cprnm_ItemType__init_($rt_s(1333), 976);
    cprnm_ItemType_SKIN_DEEP_DRAGON_WYRM = cprnm_ItemType__init_($rt_s(1334), 977);
    cprnm_ItemType_BOSS_BATTLE_STAGE_RESET = cprnm_ItemType__init_($rt_s(1335), 978);
    cprnm_ItemType_ANNIVERSARY_1000TH_RESKIN = cprnm_ItemType__init_($rt_s(1336), 979);
    cprnm_ItemType_DOUBLE_EXPERT_CAMPAIGN_DROPS = cprnm_ItemType__init_($rt_s(1337), 980);
    cprnm_ItemType_STONE_WHITE_TIGRESS = cprnm_ItemType__init_($rt_s(1338), 981);
    cprnm_ItemType_HERO_WHITE_TIGRESS = cprnm_ItemType__init_($rt_s(1339), 982);
    cprnm_ItemType_STONE_SNAPPER_BONE = cprnm_ItemType__init_($rt_s(1340), 983);
    cprnm_ItemType_HERO_SNAPPER_BONE = cprnm_ItemType__init_($rt_s(1341), 984);
    cprnm_ItemType_DEDICATED_MEDUSA = cprnm_ItemType__init_($rt_s(1342), 985);
    cprnm_ItemType_DEDICATED_GENIE = cprnm_ItemType__init_($rt_s(1343), 986);
    cprnm_ItemType_DEDICATED_DRAGON_LADY = cprnm_ItemType__init_($rt_s(1344), 987);
    cprnm_ItemType_DEDICATED_SATYR = cprnm_ItemType__init_($rt_s(1345), 988);
    cprnm_ItemType_DEDICATED_CENTAUR_OF_ATTENTION = cprnm_ItemType__init_($rt_s(1346), 989);
    cprnm_ItemType_REEL_DEDICATED_MEDUSA = cprnm_ItemType__init_($rt_s(1347), 990);
    cprnm_ItemType_REEL_DEDICATED_GENIE = cprnm_ItemType__init_($rt_s(1348), 991);
    cprnm_ItemType_REEL_DEDICATED_DRAGON_LADY = cprnm_ItemType__init_($rt_s(1349), 992);
    cprnm_ItemType_REEL_DEDICATED_SATYR = cprnm_ItemType__init_($rt_s(1350), 993);
    cprnm_ItemType_REEL_DEDICATED_CENTAUR_OF_ATTENTION = cprnm_ItemType__init_($rt_s(1351), 994);
    cprnm_ItemType_SHARD_REEL_DEDICATED_MEDUSA = cprnm_ItemType__init_($rt_s(1352), 995);
    cprnm_ItemType_SHARD_REEL_DEDICATED_GENIE = cprnm_ItemType__init_($rt_s(1353), 996);
    cprnm_ItemType_SHARD_REEL_DEDICATED_DRAGON_LADY = cprnm_ItemType__init_($rt_s(1354), 997);
    cprnm_ItemType_SHARD_REEL_DEDICATED_SATYR = cprnm_ItemType__init_($rt_s(1355), 998);
    cprnm_ItemType_SHARD_REEL_DEDICATED_CENTAUR_OF_ATTENTION = cprnm_ItemType__init_($rt_s(1356), 999);
    cprnm_ItemType_STONE_VERMILION_PRIESTESS = cprnm_ItemType__init_($rt_s(1357), 1000);
    cprnm_ItemType_HERO_VERMILION_PRIESTESS = cprnm_ItemType__init_($rt_s(1358), 1001);
    cprnm_ItemType_SKIN_ANGEL_DRAGON_FALLEN = cprnm_ItemType__init_($rt_s(1359), 1002);
    cprnm_ItemType_SKIN_BURNT_ONE_VOODOO = cprnm_ItemType__init_($rt_s(1360), 1003);
    cprnm_ItemType_SKIN_CURSED_STATUE_HAWAII = cprnm_ItemType__init_($rt_s(1361), 1004);
    cprnm_ItemType_SKIN_DRAGON_SLAYER_UNICORN = cprnm_ItemType__init_($rt_s(1362), 1005);
    cprnm_ItemType_SKIN_GROOVY_DRUID_DISCO = cprnm_ItemType__init_($rt_s(1363), 1006);
    cprnm_ItemType_SKIN_KRAKEN_KING_MECHALORD = cprnm_ItemType__init_($rt_s(1364), 1007);
    cprnm_ItemType_SKIN_DRUIDINATRIX_MASTERY = cprnm_ItemType__init_($rt_s(1365), 1008);
    cprnm_ItemType_SKIN_ROLLER_WARRIOR_MASTERY = cprnm_ItemType__init_($rt_s(1366), 1009);
    cprnm_ItemType_SKIN_PLANT_SOUL_MASTERY = cprnm_ItemType__init_($rt_s(1367), 1010);
    cprnm_ItemType_SKIN_SPIDER_QUEEN_MASTERY = cprnm_ItemType__init_($rt_s(1368), 1011);
    cprnm_ItemType_HERMITS_PILLS = cprnm_ItemType__init_($rt_s(1369), 1012);
    cprnm_ItemType_SECRET_HAND_SCROLL = cprnm_ItemType__init_($rt_s(1370), 1013);
    cprnm_ItemType_EXOTIC_FAN = cprnm_ItemType__init_($rt_s(1371), 1014);
    cprnm_ItemType_FINS_OF_SEA_DRAGON = cprnm_ItemType__init_($rt_s(1372), 1015);
    cprnm_ItemType_TIGER_UNDERWEAR = cprnm_ItemType__init_($rt_s(1373), 1016);
    cprnm_ItemType_GOLD_RUSH = cprnm_ItemType__init_($rt_s(1374), 1017);
    cprnm_ItemType_SAMURAI_SWORD = cprnm_ItemType__init_($rt_s(1375), 1018);
    cprnm_ItemType_GOURD = cprnm_ItemType__init_($rt_s(1376), 1019);
    cprnm_ItemType_MAGATAMA = cprnm_ItemType__init_($rt_s(1377), 1020);
    cprnm_ItemType_TIGER_SALVE = cprnm_ItemType__init_($rt_s(1378), 1021);
    cprnm_ItemType_WARRIORS_HELMET = cprnm_ItemType__init_($rt_s(1379), 1022);
    cprnm_ItemType_FEATHER_OF_PHOENIX = cprnm_ItemType__init_($rt_s(1380), 1023);
    cprnm_ItemType_REEL_HERMITS_PILLS = cprnm_ItemType__init_($rt_s(1381), 1024);
    cprnm_ItemType_REEL_SECRET_HAND_SCROLL = cprnm_ItemType__init_($rt_s(1382), 1025);
    cprnm_ItemType_REEL_EXOTIC_FAN = cprnm_ItemType__init_($rt_s(1383), 1026);
    cprnm_ItemType_REEL_FINS_OF_SEA_DRAGON = cprnm_ItemType__init_($rt_s(1384), 1027);
    cprnm_ItemType_REEL_TIGER_UNDERWEAR = cprnm_ItemType__init_($rt_s(1385), 1028);
    cprnm_ItemType_REEL_GOLD_RUSH = cprnm_ItemType__init_($rt_s(1386), 1029);
    cprnm_ItemType_REEL_SAMURAI_SWORD = cprnm_ItemType__init_($rt_s(1387), 1030);
    cprnm_ItemType_REEL_GOURD = cprnm_ItemType__init_($rt_s(1388), 1031);
    cprnm_ItemType_REEL_MAGATAMA = cprnm_ItemType__init_($rt_s(1389), 1032);
    cprnm_ItemType_REEL_TIGER_SALVE = cprnm_ItemType__init_($rt_s(1390), 1033);
    cprnm_ItemType_REEL_WARRIORS_HELMET = cprnm_ItemType__init_($rt_s(1391), 1034);
    cprnm_ItemType_REEL_FEATHER_OF_PHOENIX = cprnm_ItemType__init_($rt_s(1392), 1035);
    cprnm_ItemType_SHARD_REEL_HERMITS_PILLS = cprnm_ItemType__init_($rt_s(1393), 1036);
    cprnm_ItemType_SHARD_REEL_SECRET_HAND_SCROLL = cprnm_ItemType__init_($rt_s(1394), 1037);
    cprnm_ItemType_SHARD_REEL_EXOTIC_FAN = cprnm_ItemType__init_($rt_s(1395), 1038);
    cprnm_ItemType_SHARD_REEL_FINS_OF_SEA_DRAGON = cprnm_ItemType__init_($rt_s(1396), 1039);
    cprnm_ItemType_SHARD_REEL_TIGER_UNDERWEAR = cprnm_ItemType__init_($rt_s(1397), 1040);
    cprnm_ItemType_SHARD_REEL_GOLD_RUSH = cprnm_ItemType__init_($rt_s(1398), 1041);
    cprnm_ItemType_SHARD_REEL_SAMURAI_SWORD = cprnm_ItemType__init_($rt_s(1399), 1042);
    cprnm_ItemType_SHARD_REEL_GOURD = cprnm_ItemType__init_($rt_s(1400), 1043);
    cprnm_ItemType_SHARD_REEL_MAGATAMA = cprnm_ItemType__init_($rt_s(1401), 1044);
    cprnm_ItemType_SHARD_REEL_TIGER_SALVE = cprnm_ItemType__init_($rt_s(1402), 1045);
    cprnm_ItemType_SHARD_REEL_WARRIORS_HELMET = cprnm_ItemType__init_($rt_s(1403), 1046);
    cprnm_ItemType_SHARD_REEL_FEATHER_OF_PHOENIX = cprnm_ItemType__init_($rt_s(1404), 1047);
    cprnm_ItemType_SKIN_DRAGON_LADY_ANNIVERSARY_1000TH = cprnm_ItemType__init_($rt_s(1405), 1048);
    cprnm_ItemType_KEY_TO_THE_KINGDOM = cprnm_ItemType__init_($rt_s(1406), 1049);
    cprnm_ItemType_GREENISH_LANTERN = cprnm_ItemType__init_($rt_s(1407), 1050);
    cprnm_ItemType_CHAIN_WALLET = cprnm_ItemType__init_($rt_s(1408), 1051);
    cprnm_ItemType_SKIN_BROZERKER_VEGAS_DUDE = cprnm_ItemType__init_($rt_s(1409), 1052);
    cprnm_ItemType_SKIN_UNICORGI_PIZZA_MANAGER_CORGI = cprnm_ItemType__init_($rt_s(1410), 1053);
    cprnm_ItemType_SKIN_ROLLER_WARRIOR_DERBY_GIRL = cprnm_ItemType__init_($rt_s(1411), 1054);
    cprnm_ItemType_SKIN_BARDBARIAN_EMO_FREDDIE = cprnm_ItemType__init_($rt_s(1412), 1055);
    cprnm_ItemType_SKIN_NINJA_DWARF_FRIGGING_RABBIT = cprnm_ItemType__init_($rt_s(1413), 1056);
    cprnm_ItemType_SKIN_DWARVEN_ARCHER_DWARVEN_HUNTRESS = cprnm_ItemType__init_($rt_s(1414), 1057);
    cprnm_ItemType_SKIN_CRIMSON_WITCH_CRIMSON_PANDA = cprnm_ItemType__init_($rt_s(1415), 1058);
    cprnm_ItemType_SKIN_PLANT_SOUL_HORSEY_SOUL = cprnm_ItemType__init_($rt_s(1416), 1059);
    cprnm_ItemType_SKIN_COSMIC_ELF_VELVETEEN_FOX = cprnm_ItemType__init_($rt_s(1417), 1060);
    cprnm_ItemType_SKIN_GENIE_RANDOM_TUSKER = cprnm_ItemType__init_($rt_s(1418), 1061);
    cprnm_ItemType_STONE_PCH_ANUBIS_DRAGON = cprnm_ItemType__init_($rt_s(1419), 1062);
    cprnm_ItemType_HERO_PCH_ANUBIS_DRAGON = cprnm_ItemType__init_($rt_s(1420), 1063);
    cprnm_ItemType_STONE_ABYSS_DRAGON = cprnm_ItemType__init_($rt_s(1421), 1064);
    cprnm_ItemType_HERO_ABYSS_DRAGON = cprnm_ItemType__init_($rt_s(1422), 1065);
    cprnm_ItemType_STONE_UMLAUT_THE_FIRST = cprnm_ItemType__init_($rt_s(1423), 1066);
    cprnm_ItemType_HERO_UMLAUT_THE_FIRST = cprnm_ItemType__init_($rt_s(1424), 1067);
    cprnm_ItemType_SKIN_NPC_ANUBIS_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1425), 1068);
    cprnm_ItemType_SKIN_PCH_ANUBIS_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1426), 1069);
    cprnm_ItemType_SKIN_ABYSS_DRAGON_MASTERY = cprnm_ItemType__init_($rt_s(1427), 1070);
    cprnm_ItemType_SKIN_VOID_WYVERN_TAPIR = cprnm_ItemType__init_($rt_s(1428), 1071);
    cprnm_ItemType_SKIN_SPIKEY_DRAGON_ROTUNDITY = cprnm_ItemType__init_($rt_s(1429), 1072);
    cprnm_ItemType_SKIN_SPIDER_QUEEN_TURTLE = cprnm_ItemType__init_($rt_s(1430), 1073);
    cprnm_ItemType_SKIN_CURSED_STATUE_MEER = cprnm_ItemType__init_($rt_s(1431), 1074);
    cprnm_ItemType_LEGENDARY_QUEST_SKIP = cprnm_ItemType__init_($rt_s(1432), 1075);
    cprnm_ItemType_END_CENTURY_FLAME_RADIATOR = cprnm_ItemType__init_($rt_s(1433), 1076);
    cprnm_ItemType_REEL_END_CENTURY_FLAME_RADIATOR = cprnm_ItemType__init_($rt_s(1434), 1077);
    cprnm_ItemType_SHARD_REEL_THE_SPEAR_BRINGS_VICTORY = cprnm_ItemType__init_($rt_s(1435), 1078);
    cprnm_ItemType_PIECE_OF_ACOLYTE_STATUE = cprnm_ItemType__init_($rt_s(1436), 1079);
    cprnm_ItemType_REEL_PIECE_OF_ACOLYTE_STATUE = cprnm_ItemType__init_($rt_s(1437), 1080);
    cprnm_ItemType_SHARD_REEL_DRAGON_SCALE_GROVE = cprnm_ItemType__init_($rt_s(1438), 1081);
    cprnm_ItemType_THE_SPEAR_BRINGS_VICTORY = cprnm_ItemType__init_($rt_s(1439), 1082);
    cprnm_ItemType_REEL_THE_SPEAR_BRINGS_VICTORY = cprnm_ItemType__init_($rt_s(1440), 1083);
    cprnm_ItemType_SHARD_REEL_END_CENTURY_FLAME_RADIATOR = cprnm_ItemType__init_($rt_s(1441), 1084);
    cprnm_ItemType_DROP_OF_MOONLIGHT = cprnm_ItemType__init_($rt_s(1442), 1085);
    cprnm_ItemType_REEL_DROP_OF_MOONLIGHT = cprnm_ItemType__init_($rt_s(1443), 1086);
    cprnm_ItemType_SHARD_REEL_DROP_OF_MOONLIGHT = cprnm_ItemType__init_($rt_s(1444), 1087);
    cprnm_ItemType_DRAGON_SCALE_GROVE = cprnm_ItemType__init_($rt_s(1445), 1088);
    cprnm_ItemType_REEL_DRAGON_SCALE_GROVE = cprnm_ItemType__init_($rt_s(1446), 1089);
    cprnm_ItemType_SHARD_REEL_PIECE_OF_ACOLYTE_STATUE = cprnm_ItemType__init_($rt_s(1447), 1090);
    cprnm_ItemType_EXPLOSIVE_CANNON = cprnm_ItemType__init_($rt_s(1448), 1091);
    cprnm_ItemType_REEL_EXPLOSIVE_CANNON = cprnm_ItemType__init_($rt_s(1449), 1092);
    cprnm_ItemType_SHARD_REEL_EXPLOSIVE_CANNON = cprnm_ItemType__init_($rt_s(1450), 1093);
    cprnm_ItemType_CLOUDY_MONOCULAR_TELESCOPE = cprnm_ItemType__init_($rt_s(1451), 1094);
    cprnm_ItemType_REEL_CLOUDY_MONOCULAR_TELESCOPE = cprnm_ItemType__init_($rt_s(1452), 1095);
    cprnm_ItemType_SHARD_REEL_CLOUDY_MONOCULAR_TELESCOPE = cprnm_ItemType__init_($rt_s(1453), 1096);
    cprnm_ItemType_BANANA_PEEL_MOUNTAIN = cprnm_ItemType__init_($rt_s(1454), 1097);
    cprnm_ItemType_REEL_BANANA_PEEL_MOUNTAIN = cprnm_ItemType__init_($rt_s(1455), 1098);
    cprnm_ItemType_SHARD_REEL_BANANA_PEEL_MOUNTAIN = cprnm_ItemType__init_($rt_s(1456), 1099);
    cprnm_ItemType_DRACONIAN_DISH = cprnm_ItemType__init_($rt_s(1457), 1100);
    cprnm_ItemType_REEL_DRACONIAN_DISH = cprnm_ItemType__init_($rt_s(1458), 1101);
    cprnm_ItemType_SHARD_REEL_DRACONIAN_DISH = cprnm_ItemType__init_($rt_s(1459), 1102);
    cprnm_ItemType_PORTABLE_NUTRITIOUS_DIET = cprnm_ItemType__init_($rt_s(1460), 1103);
    cprnm_ItemType_REEL_PORTABLE_NUTRITIOUS_DIET = cprnm_ItemType__init_($rt_s(1461), 1104);
    cprnm_ItemType_SHARD_REEL_PORTABLE_NUTRITIOUS_DIET = cprnm_ItemType__init_($rt_s(1462), 1105);
    cprnm_ItemType_ANCIENT_COIN = cprnm_ItemType__init_($rt_s(1463), 1106);
    cprnm_ItemType_REEL_ANCIENT_COIN = cprnm_ItemType__init_($rt_s(1464), 1107);
    cprnm_ItemType_SHARD_REEL_ANCIENT_COIN = cprnm_ItemType__init_($rt_s(1465), 1108);
    cprnm_ItemType_FAMILY_TREE_OF_UMLAUT = cprnm_ItemType__init_($rt_s(1466), 1109);
    cprnm_ItemType_REEL_FAMILY_TREE_OF_UMLAUT = cprnm_ItemType__init_($rt_s(1467), 1110);
    cprnm_ItemType_SHARD_REEL_FAMILY_TREE_OF_UMLAUT = cprnm_ItemType__init_($rt_s(1468), 1111);
    cprnm_ItemType_DEDICATED_BROZERKER = cprnm_ItemType__init_($rt_s(1469), 1112);
    cprnm_ItemType_REEL_DEDICATED_BROZERKER = cprnm_ItemType__init_($rt_s(1470), 1113);
    cprnm_ItemType_SHARD_REEL_DEDICATED_BROZERKER = cprnm_ItemType__init_($rt_s(1471), 1114);
    cprnm_ItemType_DEDICATED_COSMIC_ELF = cprnm_ItemType__init_($rt_s(1472), 1115);
    cprnm_ItemType_REEL_DEDICATED_COSMIC_ELF = cprnm_ItemType__init_($rt_s(1473), 1116);
    cprnm_ItemType_SHARD_REEL_DEDICATED_COSMIC_ELF = cprnm_ItemType__init_($rt_s(1474), 1117);
    cprnm_ItemType_DEDICATED_ORC_MONK = cprnm_ItemType__init_($rt_s(1475), 1118);
    cprnm_ItemType_REEL_DEDICATED_ORC_MONK = cprnm_ItemType__init_($rt_s(1476), 1119);
    cprnm_ItemType_SHARD_REEL_DEDICATED_ORC_MONK = cprnm_ItemType__init_($rt_s(1477), 1120);
    cprnm_ItemType_DEDICATED_ROLLER_WARRIOR = cprnm_ItemType__init_($rt_s(1478), 1121);
    cprnm_ItemType_REEL_DEDICATED_ROLLER_WARRIOR = cprnm_ItemType__init_($rt_s(1479), 1122);
    cprnm_ItemType_SHARD_REEL_DEDICATED_ROLLER_WARRIOR = cprnm_ItemType__init_($rt_s(1480), 1123);
    cprnm_ItemType_DEDICATED_SHADOW_ASSASSIN = cprnm_ItemType__init_($rt_s(1481), 1124);
    cprnm_ItemType_REEL_DEDICATED_SHADOW_ASSASSIN = cprnm_ItemType__init_($rt_s(1482), 1125);
    cprnm_ItemType_SHARD_REEL_DEDICATED_SHADOW_ASSASSIN = cprnm_ItemType__init_($rt_s(1483), 1126);
    cprnm_ItemType_SKIN_ANGELIC_HERALD_PIGEON = cprnm_ItemType__init_($rt_s(1484), 1127);
    cprnm_ItemType_SKIN_BULWARK_ANGEL_SWAN = cprnm_ItemType__init_($rt_s(1485), 1128);
    cprnm_ItemType_SKIN_GRAND_HUNTRESS_LEOPARD = cprnm_ItemType__init_($rt_s(1486), 1129);
    cprnm_ItemType_SKIN_KARAOKE_KING_MONKEY = cprnm_ItemType__init_($rt_s(1487), 1130);
    cprnm_ItemType_SKIN_LAST_DEFENDER_BUFFALO = cprnm_ItemType__init_($rt_s(1488), 1131);
    cprnm_ItemType_SKIN_MISTRESS_MANICURE_BAT = cprnm_ItemType__init_($rt_s(1489), 1132);
    cprnm_ItemType_SKIN_CURSED_STATUE_USERCONTEST = cprnm_ItemType__init_($rt_s(1490), 1133);
    cprnm_ItemType_SKIN_ANGEL_DRAGON_USERCONTEST = cprnm_ItemType__init_($rt_s(1491), 1134);
    cprnm_ItemType_SKIN_MOON_DRAKE_USERCONTEST = cprnm_ItemType__init_($rt_s(1492), 1135);
    cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_USERCONTEST = cprnm_ItemType__init_($rt_s(1493), 1136);
    cprnm_ItemType_SKIN_TOMB_ANGEL_USERCONTEST = cprnm_ItemType__init_($rt_s(1494), 1137);
    cprnm_ItemType_SKIN_DRAGON_LADY_3RD_ANNIVERSARY = cprnm_ItemType__init_($rt_s(1495), 1138);
    cprnm_ItemType_SKIN_DARK_DRACUL_HORROR = cprnm_ItemType__init_($rt_s(1496), 1139);
    cprnm_ItemType_SKIN_STEPLADDER_BROTHERS_HORROR = cprnm_ItemType__init_($rt_s(1497), 1140);
    cprnm_ItemType_SKIN_COSMIC_ELF_HORROR = cprnm_ItemType__init_($rt_s(1498), 1141);
    cprnm_ItemType_SKIN_MEDUSA_HORROR = cprnm_ItemType__init_($rt_s(1499), 1142);
    cprnm_ItemType_SKIN_WEE_WITCH_HORROR = cprnm_ItemType__init_($rt_s(1500), 1143);
    cprnm_ItemType_SKIN_UMLAUT_THE_FIRST_MASTERY = cprnm_ItemType__init_($rt_s(1501), 1144);
    cprnm_ItemType_SOUL_OF_DRAGONS = cprnm_ItemType__init_($rt_s(1502), 1145);
    cprnm_ItemType_SKIN_ANCIENT_DWARF_MECHA = cprnm_ItemType__init_($rt_s(1503), 1146);
    cprnm_ItemType_SKIN_BLACK_WING_MECHA = cprnm_ItemType__init_($rt_s(1504), 1147);
    cprnm_ItemType_SKIN_DRAGZILLA_MECHA = cprnm_ItemType__init_($rt_s(1505), 1148);
    cprnm_ItemType_SKIN_DUNGEON_MAN_MECHA = cprnm_ItemType__init_($rt_s(1506), 1149);
    cprnm_ItemType_SKIN_ORC_MONK_MECHA = cprnm_ItemType__init_($rt_s(1507), 1150);
    cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_3RD_ANNIVERSARY = cprnm_ItemType__init_($rt_s(1508), 1151);
    cprnm_ItemType_SKIN_ELECTROYETI_3RD_ANNIVERSARY = cprnm_ItemType__init_($rt_s(1509), 1152);
    cprnm_ItemType_SKIN_BROZERKER_MASTERY = cprnm_ItemType__init_($rt_s(1510), 1153);
    cprnm_ItemType_SKIN_UNICORGI_MASTERY = cprnm_ItemType__init_($rt_s(1511), 1154);
    cprnm_ItemType_SKIN_BARDBARIAN_MASTERY = cprnm_ItemType__init_($rt_s(1512), 1155);
    cprnm_ItemType_SKIN_SADISTIC_DANCER_MECHA = cprnm_ItemType__init_($rt_s(1513), 1156);
    cprnm_ItemType_SKIN_SHADOW_OF_SVEN_MECHA = cprnm_ItemType__init_($rt_s(1514), 1157);
    cprnm_ItemType_SKIN_MINOTAUR_MASTERY = cprnm_ItemType__init_($rt_s(1515), 1158);
    cprnm_ItemType_SKIN_UNRIPE_MYTHOLOGY_WINTER = cprnm_ItemType__init_($rt_s(1516), 1159);
    cprnm_ItemType_SKIN_SADISTIC_DANCER_WINTER = cprnm_ItemType__init_($rt_s(1517), 1160);
    cprnm_ItemType_SKIN_DRAGON_SLAYER_WINTER = cprnm_ItemType__init_($rt_s(1518), 1161);
    cprnm_ItemType_SKIN_ABYSS_DRAGON_WINTER = cprnm_ItemType__init_($rt_s(1519), 1162);
    cprnm_ItemType_SKIN_TOMB_ANGEL_WINTER = cprnm_ItemType__init_($rt_s(1520), 1163);
    cprnm_ItemType_DEDICATED_DEEP_DRAGON = cprnm_ItemType__init_($rt_s(1521), 1164);
    cprnm_ItemType_DEDICATED_DEMON_TOTEM = cprnm_ItemType__init_($rt_s(1522), 1165);
    cprnm_ItemType_DEDICATED_SNAP_DRAGON = cprnm_ItemType__init_($rt_s(1523), 1166);
    cprnm_ItemType_DEDICATED_NINJA_DWARF = cprnm_ItemType__init_($rt_s(1524), 1167);
    cprnm_ItemType_DEDICATED_UNSTABLE_UNDERSTUDY = cprnm_ItemType__init_($rt_s(1525), 1168);
    cprnm_ItemType_REEL_DEDICATED_DEEP_DRAGON = cprnm_ItemType__init_($rt_s(1526), 1169);
    cprnm_ItemType_REEL_DEDICATED_DEMON_TOTEM = cprnm_ItemType__init_($rt_s(1527), 1170);
    cprnm_ItemType_REEL_DEDICATED_SNAP_DRAGON = cprnm_ItemType__init_($rt_s(1528), 1171);
    cprnm_ItemType_REEL_DEDICATED_NINJA_DWARF = cprnm_ItemType__init_($rt_s(1529), 1172);
    cprnm_ItemType_REEL_DEDICATED_UNSTABLE_UNDERSTUDY = cprnm_ItemType__init_($rt_s(1530), 1173);
    cprnm_ItemType_SHARD_REEL_DEDICATED_DEEP_DRAGON = cprnm_ItemType__init_($rt_s(1531), 1174);
    cprnm_ItemType_SHARD_REEL_DEDICATED_DEMON_TOTEM = cprnm_ItemType__init_($rt_s(1532), 1175);
    cprnm_ItemType_SHARD_REEL_DEDICATED_SNAP_DRAGON = cprnm_ItemType__init_($rt_s(1533), 1176);
    cprnm_ItemType_SHARD_REEL_DEDICATED_NINJA_DWARF = cprnm_ItemType__init_($rt_s(1534), 1177);
    cprnm_ItemType_SHARD_REEL_DEDICATED_UNSTABLE_UNDERSTUDY = cprnm_ItemType__init_($rt_s(1535), 1178);
    cprnm_ItemType_GEAR_TICKET_CYAN = cprnm_ItemType__init_($rt_s(1536), 1179);
    cprnm_ItemType_GEAR_TICKET_ORANGE = cprnm_ItemType__init_($rt_s(1537), 1180);
    cprnm_ItemType_GEAR_TICKET_PURPLE = cprnm_ItemType__init_($rt_s(1538), 1181);
    cprnm_ItemType_SKIN_CRIMSON_WITCH_MASTERY = cprnm_ItemType__init_($rt_s(1539), 1182);
    cprnm_ItemType_SKIN_SNAPPER_BONE_LIZARD_BONE = cprnm_ItemType__init_($rt_s(1540), 1183);
    cprnm_ItemType_SKIN_WHITE_TIGRESS_CAT_WOMAN = cprnm_ItemType__init_($rt_s(1541), 1184);
    cprnm_ItemType_SKIN_VERMILION_PRIESTESS_CLERIC_OF_FALCONERS = cprnm_ItemType__init_($rt_s(1542), 1185);
    cprnm_ItemType_SKIN_RAGING_REVENANT_DOCTORING_REVENANT = cprnm_ItemType__init_($rt_s(1543), 1186);
    cprnm_ItemType_STONE_DARK_HERO = cprnm_ItemType__init_($rt_s(1544), 1187);
    cprnm_ItemType_HERO_DARK_HERO = cprnm_ItemType__init_($rt_s(1545), 1188);
    cprnm_ItemType_STONE_CLAW_MAN = cprnm_ItemType__init_($rt_s(1546), 1189);
    cprnm_ItemType_HERO_CLAW_MAN = cprnm_ItemType__init_($rt_s(1547), 1190);
    cprnm_ItemType_SKIN_SAVAGE_CUTIE_MASTERY = cprnm_ItemType__init_($rt_s(1548), 1191);
    cprnm_ItemType_SKIN_SPECTRAL_DRAGON_REDDRAGON = cprnm_ItemType__init_($rt_s(1549), 1192);
    cprnm_ItemType_SKIN_SUN_SEEKER_SNOW = cprnm_ItemType__init_($rt_s(1550), 1193);
    cprnm_ItemType_SKIN_STOWAWAY_BUISNESS = cprnm_ItemType__init_($rt_s(1551), 1194);
    cprnm_ItemType_SKIN_WEREDRAGON_FLORIST = cprnm_ItemType__init_($rt_s(1552), 1195);
    cprnm_ItemType_MAGICAL_HATRACK = cprnm_ItemType__init_($rt_s(1553), 1196);
    cprnm_ItemType_SHINING_HOLY_TREE = cprnm_ItemType__init_($rt_s(1554), 1197);
    cprnm_ItemType_HORNS_OF_WHITE_DEER = cprnm_ItemType__init_($rt_s(1555), 1198);
    cprnm_ItemType_LORD_OF_RIVER = cprnm_ItemType__init_($rt_s(1556), 1199);
    cprnm_ItemType_GOLD_AX_SILVER_AX = cprnm_ItemType__init_($rt_s(1557), 1200);
    cprnm_ItemType_POISONED_SILVER_ACCESSORY_OF_SCORPION = cprnm_ItemType__init_($rt_s(1558), 1201);
    cprnm_ItemType_HANDY_RASP = cprnm_ItemType__init_($rt_s(1559), 1202);
    cprnm_ItemType_BLACKBERRY_JAM = cprnm_ItemType__init_($rt_s(1560), 1203);
    cprnm_ItemType_CRYSTAL_MUSHROOM = cprnm_ItemType__init_($rt_s(1561), 1204);
    cprnm_ItemType_REMOTE_COMMUNICATION_FLOWER = cprnm_ItemType__init_($rt_s(1562), 1205);
    cprnm_ItemType_SHINING_LIGHT_OF_FIREFLY = cprnm_ItemType__init_($rt_s(1563), 1206);
    cprnm_ItemType_SHRIMPISH_CREATURE = cprnm_ItemType__init_($rt_s(1564), 1207);
    cprnm_ItemType_REEL_MAGICAL_HATRACK = cprnm_ItemType__init_($rt_s(1565), 1208);
    cprnm_ItemType_REEL_SHINING_HOLY_TREE = cprnm_ItemType__init_($rt_s(1566), 1209);
    cprnm_ItemType_REEL_HORNS_OF_WHITE_DEER = cprnm_ItemType__init_($rt_s(1567), 1210);
    cprnm_ItemType_REEL_LORD_OF_RIVER = cprnm_ItemType__init_($rt_s(1568), 1211);
    cprnm_ItemType_REEL_GOLD_AX_SILVER_AX = cprnm_ItemType__init_($rt_s(1569), 1212);
    cprnm_ItemType_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION = cprnm_ItemType__init_($rt_s(1570), 1213);
    cprnm_ItemType_REEL_HANDY_RASP = cprnm_ItemType__init_($rt_s(1571), 1214);
    cprnm_ItemType_REEL_BLACKBERRY_JAM = cprnm_ItemType__init_($rt_s(1572), 1215);
    cprnm_ItemType_REEL_CRYSTAL_MUSHROOM = cprnm_ItemType__init_($rt_s(1573), 1216);
    cprnm_ItemType_REEL_REMOTE_COMMUNICATION_FLOWER = cprnm_ItemType__init_($rt_s(1574), 1217);
    cprnm_ItemType_REEL_SHINING_LIGHT_OF_FIREFLY = cprnm_ItemType__init_($rt_s(1575), 1218);
    cprnm_ItemType_REEL_SHRIMPISH_CREATURE = cprnm_ItemType__init_($rt_s(1576), 1219);
    cprnm_ItemType_SHARD_REEL_MAGICAL_HATRACK = cprnm_ItemType__init_($rt_s(1577), 1220);
    cprnm_ItemType_SHARD_REEL_SHINING_HOLY_TREE = cprnm_ItemType__init_($rt_s(1578), 1221);
    cprnm_ItemType_SHARD_REEL_HORNS_OF_WHITE_DEER = cprnm_ItemType__init_($rt_s(1579), 1222);
    cprnm_ItemType_SHARD_REEL_LORD_OF_RIVER = cprnm_ItemType__init_($rt_s(1580), 1223);
    cprnm_ItemType_SHARD_REEL_GOLD_AX_SILVER_AX = cprnm_ItemType__init_($rt_s(1581), 1224);
    cprnm_ItemType_SHARD_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION = cprnm_ItemType__init_($rt_s(1582), 1225);
    cprnm_ItemType_SHARD_REEL_HANDY_RASP = cprnm_ItemType__init_($rt_s(1583), 1226);
    cprnm_ItemType_SHARD_REEL_BLACKBERRY_JAM = cprnm_ItemType__init_($rt_s(1584), 1227);
    cprnm_ItemType_SHARD_REEL_CRYSTAL_MUSHROOM = cprnm_ItemType__init_($rt_s(1585), 1228);
    cprnm_ItemType_SHARD_REEL_REMOTE_COMMUNICATION_FLOWER = cprnm_ItemType__init_($rt_s(1586), 1229);
    cprnm_ItemType_SHARD_REEL_SHINING_LIGHT_OF_FIREFLY = cprnm_ItemType__init_($rt_s(1587), 1230);
    cprnm_ItemType_SHARD_REEL_SHRIMPISH_CREATURE = cprnm_ItemType__init_($rt_s(1588), 1231);
    var$1 = $rt_createArray(cprnm_ItemType, 1232);
    var$2 = var$1.data;
    var$2[0] = cprnm_ItemType_DEFAULT;
    var$2[1] = cprnm_ItemType_FREE_MANS_CROWBAR;
    var$2[2] = cprnm_ItemType_MY_FIRST_SHIELD;
    var$2[3] = cprnm_ItemType_RUBBER_VEST;
    var$2[4] = cprnm_ItemType_PAPER_CROWN;
    var$2[5] = cprnm_ItemType_ENCHANTED_ELBOW_PADS;
    var$2[6] = cprnm_ItemType_GOBLIN_GROG;
    var$2[7] = cprnm_ItemType_FOAM_FINGER;
    var$2[8] = cprnm_ItemType_STOLEN_SNEAKERS;
    var$2[9] = cprnm_ItemType_BIT_O_NIP;
    var$2[10] = cprnm_ItemType_LOADED_DIE;
    var$2[11] = cprnm_ItemType_FINE_BRIE;
    var$2[12] = cprnm_ItemType_STICK_ON_MOUSTACHE;
    var$2[13] = cprnm_ItemType_SNAZZY_VEST;
    var$2[14] = cprnm_ItemType_CHUNKY_FEMUR;
    var$2[15] = cprnm_ItemType_GOBLIN_WHACKER;
    var$2[16] = cprnm_ItemType_BLOODY_BAT;
    var$2[17] = cprnm_ItemType_SWASH_BUCKLER;
    var$2[18] = cprnm_ItemType_BESSIES_BANE;
    var$2[19] = cprnm_ItemType_LUCKY_ORCS_FOOT;
    var$2[20] = cprnm_ItemType_CAPTAINS_TIGHTPANTS;
    var$2[21] = cprnm_ItemType_PRETTY_SWEET_CAPE;
    var$2[22] = cprnm_ItemType_PROTEIN_POWDER;
    var$2[23] = cprnm_ItemType_LOAFERS_OF_ALACRITY;
    var$2[24] = cprnm_ItemType_SMARTY_PANTS;
    var$2[25] = cprnm_ItemType_GLOVES_OF_CRIT;
    var$2[26] = cprnm_ItemType_SPARKLE_PONY_KEYCHAIN;
    var$2[27] = cprnm_ItemType_BANJO_OF_DUELING;
    var$2[28] = cprnm_ItemType_SHINY_BOTTLECAP;
    var$2[29] = cprnm_ItemType_HEMP_BRACELET;
    var$2[30] = cprnm_ItemType_YA_VAMPIRE_SERIES;
    var$2[31] = cprnm_ItemType_WAND_OF_GOLD_SPARKLES;
    var$2[32] = cprnm_ItemType_RAW_EGG;
    var$2[33] = cprnm_ItemType_ARTIFACT_OF_UNIMAGINABLE_POWER;
    var$2[34] = cprnm_ItemType_ARCANE_SLACKS;
    var$2[35] = cprnm_ItemType_DAISY_CHAINSAW;
    var$2[36] = cprnm_ItemType_CHAPS_OF_ENDURANCE;
    var$2[37] = cprnm_ItemType_SIDE_OF_BACON;
    var$2[38] = cprnm_ItemType_HIPPY_GLO_STICKS;
    var$2[39] = cprnm_ItemType_MAGIC_EIGHT_BALL;
    var$2[40] = cprnm_ItemType_KING_JEFFS_CROSSBOW;
    var$2[41] = cprnm_ItemType_DIRECTORS_CUT;
    var$2[42] = cprnm_ItemType_PLUCKY_HEROINES_SHORTBOW;
    var$2[43] = cprnm_ItemType_BLISSFUL_IGNORANCE;
    var$2[44] = cprnm_ItemType_EXCALIBURTREYNOLDS;
    var$2[45] = cprnm_ItemType_BUTTER_KNIFE;
    var$2[46] = cprnm_ItemType_PLASTIC_VAMPIRE_TEETH;
    var$2[47] = cprnm_ItemType_THONG_OF_VITALITY;
    var$2[48] = cprnm_ItemType_LIFESIPPER;
    var$2[49] = cprnm_ItemType_SOCK_FULL_O_PENNIES;
    var$2[50] = cprnm_ItemType_PENETRABLE_ARMOR;
    var$2[51] = cprnm_ItemType_MELTY_CHOCOLATE_BAR;
    var$2[52] = cprnm_ItemType_TEN_FOOT_POLE;
    var$2[53] = cprnm_ItemType_THE_POWER_OF_MEDICINE;
    var$2[54] = cprnm_ItemType_VAMPIRE_BUNNYEARS;
    var$2[55] = cprnm_ItemType_NONSTICK_SHIELD;
    var$2[56] = cprnm_ItemType_MUSCLE_WAX;
    var$2[57] = cprnm_ItemType_RACING_STRIPES;
    var$2[58] = cprnm_ItemType_SACRED_CODEX;
    var$2[59] = cprnm_ItemType_AND_MY_AXE;
    var$2[60] = cprnm_ItemType_IMPRACTICAL_CHESTPLATE;
    var$2[61] = cprnm_ItemType_MACE_OF_FRIENDSHIP;
    var$2[62] = cprnm_ItemType_THE_UGLY_STICK;
    var$2[63] = cprnm_ItemType_GENTLEMENS_CLUB;
    var$2[64] = cprnm_ItemType_STAFF_OF_BOSS_FIGHTING;
    var$2[65] = cprnm_ItemType_DONT_TASE_ME_BOW;
    var$2[66] = cprnm_ItemType_BAG_O_HAMMERS;
    var$2[67] = cprnm_ItemType_SPUD_GUN;
    var$2[68] = cprnm_ItemType_NECRONOMICON;
    var$2[69] = cprnm_ItemType_INTIMIDATING_BEARD;
    var$2[70] = cprnm_ItemType_LEAD_ZEPPELIN;
    var$2[71] = cprnm_ItemType_LASER_POINTER;
    var$2[72] = cprnm_ItemType_GLAIVE_OF_DISMEMBERMENT;
    var$2[73] = cprnm_ItemType_ROBE_OF_SHARP_COMEBACKS;
    var$2[74] = cprnm_ItemType_THE_MAD_GODS_TRIDENT;
    var$2[75] = cprnm_ItemType_ROD_OF_BADASSERY;
    var$2[76] = cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA;
    var$2[77] = cprnm_ItemType_DEATH_METAL_BLADE;
    var$2[78] = cprnm_ItemType_SNAKE_OIL;
    var$2[79] = cprnm_ItemType_DECODER_RING;
    var$2[80] = cprnm_ItemType_AXES_OF_DUAL_WIELDING;
    var$2[81] = cprnm_ItemType_ROD_OF_TASING;
    var$2[82] = cprnm_ItemType_ORB_OF_EVERLASTING_FLAVOR;
    var$2[83] = cprnm_ItemType_THINKING_CAP;
    var$2[84] = cprnm_ItemType_THE_POWER_OF_MEDICINE_2_ORDER;
    var$2[85] = cprnm_ItemType_KINDNESS;
    var$2[86] = cprnm_ItemType_THE_COMPENSATOR;
    var$2[87] = cprnm_ItemType_MUSSEL_MILK;
    var$2[88] = cprnm_ItemType_FLAIL_OF_TOTAL_DEVASTATION;
    var$2[89] = cprnm_ItemType_SHOT_IN_THE_ARM;
    var$2[90] = cprnm_ItemType_BUNNY_SLIPPERS;
    var$2[91] = cprnm_ItemType_ADAMANTIUM_TIARA;
    var$2[92] = cprnm_ItemType_VORPAL_BOOMERANG;
    var$2[93] = cprnm_ItemType_FRAMED_DIPLOMA;
    var$2[94] = cprnm_ItemType_HEAD_BANGER;
    var$2[95] = cprnm_ItemType_SUPER_SPIKEY_SPEAR;
    var$2[96] = cprnm_ItemType_ROD_OF_WITTY_PARTY_BANTER;
    var$2[97] = cprnm_ItemType_LASER_POINTER_2_ORDER;
    var$2[98] = cprnm_ItemType_DIPLOMATIC_IMMUNITY;
    var$2[99] = cprnm_ItemType_THE_1_RING;
    var$2[100] = cprnm_ItemType_DIRK_OF_DISEMBOWELING;
    var$2[101] = cprnm_ItemType_HAMMER_OF_WICKED_BEATS;
    var$2[102] = cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR;
    var$2[103] = cprnm_ItemType_DECODER_RING_2_ORDER;
    var$2[104] = cprnm_ItemType_MJOLNIRBY;
    var$2[105] = cprnm_ItemType_THE_POWER_OF_MEDICINE_3_ORDER;
    var$2[106] = cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_2_ORDER;
    var$2[107] = cprnm_ItemType_SWORDY_MCEPICPANTS;
    var$2[108] = cprnm_ItemType_SHOVEL;
    var$2[109] = cprnm_ItemType_PHILTER_OF_PURE_TESTOSTERONE;
    var$2[110] = cprnm_ItemType_TOME_OF_NASTY_BEHAVIOR;
    var$2[111] = cprnm_ItemType_BOOTS_MADE_FOR_WALKIN;
    var$2[112] = cprnm_ItemType_POCKET_PROTECTOR;
    var$2[113] = cprnm_ItemType_HAROLDS_HOMEMADE_HALBERD;
    var$2[114] = cprnm_ItemType_SANDWICH_OF_UNSURPASSED_MEATINESS;
    var$2[115] = cprnm_ItemType_LAVISHLY_ADORNED_RAPIER;
    var$2[116] = cprnm_ItemType_TOME_OF_FORBIDDEN_TRIVIA_3_ORDER;
    var$2[117] = cprnm_ItemType_THE_POWER_OF_MEDICINE_4_ORDER;
    var$2[118] = cprnm_ItemType_SVENS_SWORD_OF_DOOOOOM;
    var$2[119] = cprnm_ItemType_LASER_POINTER_3_ORDER;
    var$2[120] = cprnm_ItemType_GRIEVOUS_BODILY_HARM;
    var$2[121] = cprnm_ItemType_DECODER_RING_3_ORDER;
    var$2[122] = cprnm_ItemType_LIFEDRINKER;
    var$2[123] = cprnm_ItemType_MITHRIL_OREEAL;
    var$2[124] = cprnm_ItemType_BIG_STABBY_SPEAR;
    var$2[125] = cprnm_ItemType_EXP_FLASK;
    var$2[126] = cprnm_ItemType_EXP_PHILTER;
    var$2[127] = cprnm_ItemType_EXP_VIAL;
    var$2[128] = cprnm_ItemType_VOID_DUST;
    var$2[129] = cprnm_ItemType_SHIMMER_DUST;
    var$2[130] = cprnm_ItemType_PRIMAL_ESSENCE;
    var$2[131] = cprnm_ItemType_IRON_ORE;
    var$2[132] = cprnm_ItemType_COPPER_ORE;
    var$2[133] = cprnm_ItemType_SILVER_ORE;
    var$2[134] = cprnm_ItemType_VOLCANIC_ORE;
    var$2[135] = cprnm_ItemType_EXP_DECANTER;
    var$2[136] = cprnm_ItemType_RAID_TICKET;
    var$2[137] = cprnm_ItemType_STONE_ELECTROYETI;
    var$2[138] = cprnm_ItemType_STONE_MEDUSA;
    var$2[139] = cprnm_ItemType_STONE_FAITH_HEALER;
    var$2[140] = cprnm_ItemType_HERO_ELECTROYETI;
    var$2[141] = cprnm_ItemType_HERO_MEDUSA;
    var$2[142] = cprnm_ItemType_HERO_FAITH_HEALER;
    var$2[143] = cprnm_ItemType_LASER_POINTER_4_ORDER;
    var$2[144] = cprnm_ItemType_ENIDS_EXPENSIVE_ELIXIR_2_ORDER;
    var$2[145] = cprnm_ItemType_SHOT_IN_THE_ARM_2_ORDER;
    var$2[146] = cprnm_ItemType_SHOT_IN_THE_ARM_3_ORDER;
    var$2[147] = cprnm_ItemType_SHARD_MACE_OF_FRIENDSHIP;
    var$2[148] = cprnm_ItemType_REEL_INTIMIDATING_BEARD;
    var$2[149] = cprnm_ItemType_REEL_SHINY_BOTTLECAP;
    var$2[150] = cprnm_ItemType_REEL_SUPER_SPIKEY_SPEAR;
    var$2[151] = cprnm_ItemType_SHARD_RACING_STRIPES;
    var$2[152] = cprnm_ItemType_SHARD_THE_UGLY_STICK;
    var$2[153] = cprnm_ItemType_REEL_DECODER_RING;
    var$2[154] = cprnm_ItemType_SHARD_MUSCLE_WAX;
    var$2[155] = cprnm_ItemType_REEL_THE_POWER_OF_MEDICINE;
    var$2[156] = cprnm_ItemType_REEL_THE_MAD_GODS_TRIDENT;
    var$2[157] = cprnm_ItemType_REEL_GRIEVOUS_BODILY_HARM;
    var$2[158] = cprnm_ItemType_REEL_SIDE_OF_BACON;
    var$2[159] = cprnm_ItemType_SHARD_DONT_TASE_ME_BOW;
    var$2[160] = cprnm_ItemType_SHARD_FRAMED_DIPLOMA;
    var$2[161] = cprnm_ItemType_REEL_ORB_OF_EVERLASTING_FLAVOR;
    var$2[162] = cprnm_ItemType_REEL_TOME_OF_FORBIDDEN_TRIVIA;
    var$2[163] = cprnm_ItemType_SHARD_SACRED_CODEX;
    var$2[164] = cprnm_ItemType_SHARD_IMPRACTICAL_CHESTPLATE;
    var$2[165] = cprnm_ItemType_REEL_SPARKLE_PONY_KEYCHAIN;
    var$2[166] = cprnm_ItemType_REEL_MJOLNIRBY;
    var$2[167] = cprnm_ItemType_REEL_BIG_STABBY_SPEAR;
    var$2[168] = cprnm_ItemType_REEL_KINDNESS;
    var$2[169] = cprnm_ItemType_SHARD_PHILTER_OF_PURE_TESTOSTERONE;
    var$2[170] = cprnm_ItemType_SHARD_STAFF_OF_BOSS_FIGHTING;
    var$2[171] = cprnm_ItemType_REEL_HAMMER_OF_WICKED_BEATS;
    var$2[172] = cprnm_ItemType_REEL_MAGIC_EIGHT_BALL;
    var$2[173] = cprnm_ItemType_REEL_DIRK_OF_DISEMBOWELING;
    var$2[174] = cprnm_ItemType_REEL_SPUD_GUN;
    var$2[175] = cprnm_ItemType_REEL_FLAIL_OF_TOTAL_DEVASTATION;
    var$2[176] = cprnm_ItemType_REEL_NECRONOMICON;
    var$2[177] = cprnm_ItemType_SHARD_HAROLDS_HOMEMADE_HALBERD;
    var$2[178] = cprnm_ItemType_REEL_LIFEDRINKER;
    var$2[179] = cprnm_ItemType_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS;
    var$2[180] = cprnm_ItemType_REEL_ENIDS_EXPENSIVE_ELIXIR;
    var$2[181] = cprnm_ItemType_REEL_PLASTIC_VAMPIRE_TEETH;
    var$2[182] = cprnm_ItemType_REEL_PRETTY_SWEET_CAPE;
    var$2[183] = cprnm_ItemType_REEL_VAMPIRE_BUNNYEARS;
    var$2[184] = cprnm_ItemType_REEL_THE_COMPENSATOR;
    var$2[185] = cprnm_ItemType_SHARD_GENTLEMENS_CLUB;
    var$2[186] = cprnm_ItemType_REEL_BLOODY_BAT;
    var$2[187] = cprnm_ItemType_REEL_POCKET_PROTECTOR;
    var$2[188] = cprnm_ItemType_REEL_CHUNKY_FEMUR;
    var$2[189] = cprnm_ItemType_REEL_DEATH_METAL_BLADE;
    var$2[190] = cprnm_ItemType_SHARD_HEAD_BANGER;
    var$2[191] = cprnm_ItemType_SHARD_AND_MY_AXE;
    var$2[192] = cprnm_ItemType_REEL_THE_1_RING;
    var$2[193] = cprnm_ItemType_REEL_GOBLIN_WHACKER;
    var$2[194] = cprnm_ItemType_REEL_LEAD_ZEPPELIN;
    var$2[195] = cprnm_ItemType_REEL_THINKING_CAP;
    var$2[196] = cprnm_ItemType_REEL_TEN_FOOT_POLE;
    var$2[197] = cprnm_ItemType_REEL_DIPLOMATIC_IMMUNITY;
    var$2[198] = cprnm_ItemType_SHARD_BOOTS_MADE_FOR_WALKIN;
    var$2[199] = cprnm_ItemType_REEL_LUCKY_ORCS_FOOT;
    var$2[200] = cprnm_ItemType_REEL_ROD_OF_WITTY_PARTY_BANTER;
    var$2[201] = cprnm_ItemType_SHARD_BUNNY_SLIPPERS;
    var$2[202] = cprnm_ItemType_SHARD_VORPAL_BOOMERANG;
    var$2[203] = cprnm_ItemType_REEL_BAG_O_HAMMERS;
    var$2[204] = cprnm_ItemType_REEL_LASER_POINTER;
    var$2[205] = cprnm_ItemType_REEL_SHOVEL;
    var$2[206] = cprnm_ItemType_SHARD_ADAMANTIUM_TIARA;
    var$2[207] = cprnm_ItemType_SHARD_REEL_THE_MAD_GODS_TRIDENT;
    var$2[208] = cprnm_ItemType_SHARD_REEL_INTIMIDATING_BEARD;
    var$2[209] = cprnm_ItemType_SHARD_REEL_FLAIL_OF_TOTAL_DEVASTATION;
    var$2[210] = cprnm_ItemType_SHARD_REEL_KINDNESS;
    var$2[211] = cprnm_ItemType_SHARD_REEL_LEAD_ZEPPELIN;
    var$2[212] = cprnm_ItemType_SHARD_REEL_DECODER_RING;
    var$2[213] = cprnm_ItemType_SHARD_REEL_NECRONOMICON;
    var$2[214] = cprnm_ItemType_SHARD_REEL_TOME_OF_FORBIDDEN_TRIVIA;
    var$2[215] = cprnm_ItemType_SHARD_REEL_THINKING_CAP;
    var$2[216] = cprnm_ItemType_SHARD_REEL_THE_COMPENSATOR;
    var$2[217] = cprnm_ItemType_SHARD_REEL_LASER_POINTER;
    var$2[218] = cprnm_ItemType_SHARD_REEL_ORB_OF_EVERLASTING_FLAVOR;
    var$2[219] = cprnm_ItemType_SHARD_REEL_GRIEVOUS_BODILY_HARM;
    var$2[220] = cprnm_ItemType_SHARD_REEL_LIFEDRINKER;
    var$2[221] = cprnm_ItemType_SHARD_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS;
    var$2[222] = cprnm_ItemType_SHARD_REEL_MJOLNIRBY;
    var$2[223] = cprnm_ItemType_SHARD_REEL_DIRK_OF_DISEMBOWELING;
    var$2[224] = cprnm_ItemType_SHARD_REEL_ROD_OF_WITTY_PARTY_BANTER;
    var$2[225] = cprnm_ItemType_SHARD_REEL_DIPLOMATIC_IMMUNITY;
    var$2[226] = cprnm_ItemType_SHARD_REEL_BIG_STABBY_SPEAR;
    var$2[227] = cprnm_ItemType_SHARD_REEL_ENIDS_EXPENSIVE_ELIXIR;
    var$2[228] = cprnm_ItemType_SHARD_REEL_SUPER_SPIKEY_SPEAR;
    var$2[229] = cprnm_ItemType_SHARD_REEL_HAMMER_OF_WICKED_BEATS;
    var$2[230] = cprnm_ItemType_SHARD_REEL_SHOVEL;
    var$2[231] = cprnm_ItemType_SHARD_REEL_THE_1_RING;
    var$2[232] = cprnm_ItemType_SHARD_REEL_DEATH_METAL_BLADE;
    var$2[233] = cprnm_ItemType_SHARD_REEL_POCKET_PROTECTOR;
    var$2[234] = cprnm_ItemType_STONE_DARK_DRACUL;
    var$2[235] = cprnm_ItemType_HERO_DARK_DRACUL;
    var$2[236] = cprnm_ItemType_STONE_COSMIC_ELF;
    var$2[237] = cprnm_ItemType_HERO_COSMIC_ELF;
    var$2[238] = cprnm_ItemType_STONE_ROLLER_WARRIOR;
    var$2[239] = cprnm_ItemType_HERO_ROLLER_WARRIOR;
    var$2[240] = cprnm_ItemType_STONE_DRAGON_LADY;
    var$2[241] = cprnm_ItemType_HERO_DRAGON_LADY;
    var$2[242] = cprnm_ItemType_STONE_CENTAUR_OF_ATTENTION;
    var$2[243] = cprnm_ItemType_HERO_CENTAUR_OF_ATTENTION;
    var$2[244] = cprnm_ItemType_STONE_UNSTABLE_UNDERSTUDY;
    var$2[245] = cprnm_ItemType_HERO_UNSTABLE_UNDERSTUDY;
    var$2[246] = cprnm_ItemType_STONE_MOON_DRAKE;
    var$2[247] = cprnm_ItemType_HERO_MOON_DRAKE;
    var$2[248] = cprnm_ItemType_STONE_POLEMASTER;
    var$2[249] = cprnm_ItemType_HERO_POLEMASTER;
    var$2[250] = cprnm_ItemType_STONE_CATAPULT_KNIGHT;
    var$2[251] = cprnm_ItemType_HERO_CATAPULT_KNIGHT;
    var$2[252] = cprnm_ItemType_STONE_BARDBARIAN;
    var$2[253] = cprnm_ItemType_HERO_BARDBARIAN;
    var$2[254] = cprnm_ItemType_STONE_SHADOW_ASSASSIN;
    var$2[255] = cprnm_ItemType_HERO_SHADOW_ASSASSIN;
    var$2[256] = cprnm_ItemType_STONE_DUST_DEVIL;
    var$2[257] = cprnm_ItemType_HERO_DUST_DEVIL;
    var$2[258] = cprnm_ItemType_STONE_SNAP_DRAGON;
    var$2[259] = cprnm_ItemType_HERO_SNAP_DRAGON;
    var$2[260] = cprnm_ItemType_STONE_HYDRA;
    var$2[261] = cprnm_ItemType_HERO_HYDRA;
    var$2[262] = cprnm_ItemType_STONE_SAVAGE_CUTIE;
    var$2[263] = cprnm_ItemType_HERO_SAVAGE_CUTIE;
    var$2[264] = cprnm_ItemType_STONE_ZOMBIE_SQUIRE;
    var$2[265] = cprnm_ItemType_HERO_ZOMBIE_SQUIRE;
    var$2[266] = cprnm_ItemType_STONE_MAGIC_DRAGON;
    var$2[267] = cprnm_ItemType_HERO_MAGIC_DRAGON;
    var$2[268] = cprnm_ItemType_STONE_AQUATIC_MAN;
    var$2[269] = cprnm_ItemType_HERO_AQUATIC_MAN;
    var$2[270] = cprnm_ItemType_STONE_CRIMSON_WITCH;
    var$2[271] = cprnm_ItemType_HERO_CRIMSON_WITCH;
    var$2[272] = cprnm_ItemType_STONE_NINJA_DWARF;
    var$2[273] = cprnm_ItemType_HERO_NINJA_DWARF;
    var$2[274] = cprnm_ItemType_STONE_BROZERKER;
    var$2[275] = cprnm_ItemType_HERO_BROZERKER;
    var$2[276] = cprnm_ItemType_STONE_GROOVY_DRUID;
    var$2[277] = cprnm_ItemType_HERO_GROOVY_DRUID;
    var$2[278] = cprnm_ItemType_STONE_BONE_DRAGON;
    var$2[279] = cprnm_ItemType_HERO_BONE_DRAGON;
    var$2[280] = cprnm_ItemType_MITHRIL_ORE;
    var$2[281] = cprnm_ItemType_STONE_SPIKEY_DRAGON;
    var$2[282] = cprnm_ItemType_HERO_SPIKEY_DRAGON;
    var$2[283] = cprnm_ItemType_STONE_FROST_GIANT;
    var$2[284] = cprnm_ItemType_HERO_FROST_GIANT;
    var$2[285] = cprnm_ItemType_STONE_MINOTAUR;
    var$2[286] = cprnm_ItemType_HERO_MINOTAUR;
    var$2[287] = cprnm_ItemType_STONE_DARK_HORSE;
    var$2[288] = cprnm_ItemType_HERO_DARK_HORSE;
    var$2[289] = cprnm_ItemType_STONE_DRUIDINATRIX;
    var$2[290] = cprnm_ItemType_HERO_DRUIDINATRIX;
    var$2[291] = cprnm_ItemType_STONE_ORC_MONK;
    var$2[292] = cprnm_ItemType_HERO_ORC_MONK;
    var$2[293] = cprnm_ItemType_STONE_RABID_DRAGON;
    var$2[294] = cprnm_ItemType_HERO_RABID_DRAGON;
    var$2[295] = cprnm_ItemType_STONE_DWARVEN_ARCHER;
    var$2[296] = cprnm_ItemType_HERO_DWARVEN_ARCHER;
    var$2[297] = cprnm_ItemType_DEAD_EYE;
    var$2[298] = cprnm_ItemType_DRAGON_SCALE;
    var$2[299] = cprnm_ItemType_LOST_DISK_OF_POWER;
    var$2[300] = cprnm_ItemType_LIGER_BALM;
    var$2[301] = cprnm_ItemType_OVERPOWERING_FRAGRANCE;
    var$2[302] = cprnm_ItemType_ANTI_MAGIC_SHIELD;
    var$2[303] = cprnm_ItemType_WAR_SANDALS;
    var$2[304] = cprnm_ItemType_WIZARDY_FOR_IDIOTS;
    var$2[305] = cprnm_ItemType_LICHE_FINGER;
    var$2[306] = cprnm_ItemType_MOTIVATIONAL_CASSETTE;
    var$2[307] = cprnm_ItemType_CHUGG_BOOTS;
    var$2[308] = cprnm_ItemType_PURPLE_PILLS_OF_POTENCY;
    var$2[309] = cprnm_ItemType_BLACKSTEEL_BLADE;
    var$2[310] = cprnm_ItemType_SHARD_DEAD_EYE;
    var$2[311] = cprnm_ItemType_SHARD_LOST_DISK_OF_POWER;
    var$2[312] = cprnm_ItemType_SHARD_LIGER_BALM;
    var$2[313] = cprnm_ItemType_SHARD_ANTI_MAGIC_SHIELD;
    var$2[314] = cprnm_ItemType_SHARD_WAR_SANDALS;
    var$2[315] = cprnm_ItemType_SHARD_WIZARDY_FOR_IDIOTS;
    var$2[316] = cprnm_ItemType_ALCHEMY_COST_RESET;
    var$2[317] = cprnm_ItemType_STAMINA_COST_RESET;
    var$2[318] = cprnm_ItemType_ELITE_CHANCES_COST_RESET;
    var$2[319] = cprnm_ItemType_STAMINA_CONSUMABLE;
    var$2[320] = cprnm_ItemType_DOUBLE_NORMAL_CAMPAIGN_DROPS;
    var$2[321] = cprnm_ItemType_DOUBLE_ELITE_CAMPAIGN_DROPS;
    var$2[322] = cprnm_ItemType_SHOP_REFRESH;
    var$2[323] = cprnm_ItemType_GENERIC_ORANGE;
    var$2[324] = cprnm_ItemType_STONE_SKELETON_KING;
    var$2[325] = cprnm_ItemType_HERO_SKELETON_KING;
    var$2[326] = cprnm_ItemType_STONE_SATYR;
    var$2[327] = cprnm_ItemType_HERO_SATYR;
    var$2[328] = cprnm_ItemType_STONE_STORM_DRAGON;
    var$2[329] = cprnm_ItemType_HERO_STORM_DRAGON;
    var$2[330] = cprnm_ItemType_YODELING_SWORD;
    var$2[331] = cprnm_ItemType_GIRDLE_OF_VICTORY;
    var$2[332] = cprnm_ItemType_RATTLING_SABRE;
    var$2[333] = cprnm_ItemType_PURIFYING_TUNING_FORK;
    var$2[334] = cprnm_ItemType_PETER_PIPERS_PEPPER_SPRAY;
    var$2[335] = cprnm_ItemType_RING_OF_THE_SQUIRREL;
    var$2[336] = cprnm_ItemType_POWER_OF_SCIENCE;
    var$2[337] = cprnm_ItemType_HIGH_TEA;
    var$2[338] = cprnm_ItemType_SELF_PRESERVER;
    var$2[339] = cprnm_ItemType_EXTREME_FAD_DIET;
    var$2[340] = cprnm_ItemType_BOWIE_KNIFE;
    var$2[341] = cprnm_ItemType_JAR_OF_KITTEN_TEAR;
    var$2[342] = cprnm_ItemType_MYSTICAL_ELVEN_JUNK;
    var$2[343] = cprnm_ItemType_PHOTO_BOMB;
    var$2[344] = cprnm_ItemType_READIN_RAIN_BOW;
    var$2[345] = cprnm_ItemType_GLASS_CASE_OF_EMOTION;
    var$2[346] = cprnm_ItemType_ROLL_OF_DUCT_TAPE;
    var$2[347] = cprnm_ItemType_WICKED_MULLET;
    var$2[348] = cprnm_ItemType_UNICORN_PUKE;
    var$2[349] = cprnm_ItemType_SHARD_PETER_PIPERS_PEPPER_SPRAY;
    var$2[350] = cprnm_ItemType_SHARD_RING_OF_THE_SQUIRREL;
    var$2[351] = cprnm_ItemType_SHARD_HIGH_TEA;
    var$2[352] = cprnm_ItemType_SHARD_SELF_PRESERVER;
    var$2[353] = cprnm_ItemType_SHARD_EXTREME_FAD_DIET;
    var$2[354] = cprnm_ItemType_SHARD_BOWIE_KNIFE;
    var$2[355] = cprnm_ItemType_SHARD_PHOTO_BOMB;
    var$2[356] = cprnm_ItemType_SHARD_ROLL_OF_DUCT_TAPE;
    var$2[357] = cprnm_ItemType_VIP5_CONSUMABLE;
    var$2[358] = cprnm_ItemType_STONE_UNICORGI;
    var$2[359] = cprnm_ItemType_HERO_UNICORGI;
    var$2[360] = cprnm_ItemType_STONE_SNIPER_WOLF;
    var$2[361] = cprnm_ItemType_HERO_SNIPER_WOLF;
    var$2[362] = cprnm_ItemType_STONE_GENIE;
    var$2[363] = cprnm_ItemType_HERO_GENIE;
    var$2[364] = cprnm_ItemType_SKIN_DARK_HORSE_ZEBRA;
    var$2[365] = cprnm_ItemType_SKIN_DARK_HORSE_MECH;
    var$2[366] = cprnm_ItemType_CHAMPIONSHIP_BELT;
    var$2[367] = cprnm_ItemType_HEALTHY_DOSE_OF_SKEPTICISM;
    var$2[368] = cprnm_ItemType_AXE_OF_GRATUITOUS_GUITAR_SOLOS;
    var$2[369] = cprnm_ItemType_ANCIENT_TOME_OF_OCCULT_NONSENSE;
    var$2[370] = cprnm_ItemType_DRAGONS_BALLZ;
    var$2[371] = cprnm_ItemType_HELM_OF_THE_RAGING_BEAR;
    var$2[372] = cprnm_ItemType_COSPLAY_SWORD;
    var$2[373] = cprnm_ItemType_IVY_LEAGUE_HAIRCUT;
    var$2[374] = cprnm_ItemType_DUELING_KNIVES_OF_HACKENSLASH;
    var$2[375] = cprnm_ItemType_DEERSTALKER_HAT;
    var$2[376] = cprnm_ItemType_LENSLESS_GLASSES;
    var$2[377] = cprnm_ItemType_UNTESTED_JETPACK;
    var$2[378] = cprnm_ItemType_HELM_OF_SCREAMING_MANFACE;
    var$2[379] = cprnm_ItemType_SWEATBAND_OF_TRAINING_MONTAGES;
    var$2[380] = cprnm_ItemType_MONSTER_HUNTER_ARMOR;
    var$2[381] = cprnm_ItemType_SHARD_HEALTHY_DOSE_OF_SKEPTICISM;
    var$2[382] = cprnm_ItemType_SHARD_AXE_OF_GRATUITOUS_GUITAR_SOLOS;
    var$2[383] = cprnm_ItemType_SHARD_ANCIENT_TOME_OF_OCCULT_NONSENSE;
    var$2[384] = cprnm_ItemType_SHARD_HELM_OF_THE_RAGING_BEAR;
    var$2[385] = cprnm_ItemType_SHARD_COSPLAY_SWORD;
    var$2[386] = cprnm_ItemType_SHARD_LENSLESS_GLASSES;
    var$2[387] = cprnm_ItemType_SHARD_UNTESTED_JETPACK;
    var$2[388] = cprnm_ItemType_SHARD_SWEATBAND_OF_TRAINING_MONTAGES;
    var$2[389] = cprnm_ItemType_RUNICITE_SHARD;
    var$2[390] = cprnm_ItemType_RUNICITE_STONE;
    var$2[391] = cprnm_ItemType_RUNICITE_BLOCK;
    var$2[392] = cprnm_ItemType_RUNICITE_SLAB;
    var$2[393] = cprnm_ItemType_RUNICITE_MONOLITH;
    var$2[394] = cprnm_ItemType_SILVER_CHEST_ROLL_X1;
    var$2[395] = cprnm_ItemType_GOLD_CHEST_ROLL_X1;
    var$2[396] = cprnm_ItemType_SOUL_CHEST_ROLL;
    var$2[397] = cprnm_ItemType_EVENT_CHEST_ROLL_X1;
    var$2[398] = cprnm_ItemType_TAROT_DECK_OF_HYPERBOLE;
    var$2[399] = cprnm_ItemType_MACGUFFIN_FRAGMENT_45;
    var$2[400] = cprnm_ItemType_DIRTY_BASTARD_SWORD;
    var$2[401] = cprnm_ItemType_THE_HOLY_PAIL;
    var$2[402] = cprnm_ItemType_ORNATE_CROWN_OF_THE_GM;
    var$2[403] = cprnm_ItemType_GLORY_SEEKER;
    var$2[404] = cprnm_ItemType_EYE_OF_THE_BEHOLDER;
    var$2[405] = cprnm_ItemType_HOLY_LANCE_OF_PLOT_ADVANCEMENT;
    var$2[406] = cprnm_ItemType_AXE_OF_GRINDING;
    var$2[407] = cprnm_ItemType_AMULET_OF_CONCENTRATED_AWESOME;
    var$2[408] = cprnm_ItemType_EMBARASSING_CHAINMAIL_OF_IMMENSE_POWER;
    var$2[409] = cprnm_ItemType_SLIGHTLY_EVIL_MAGIC_MIRROR;
    var$2[410] = cprnm_ItemType_STONE_DRAGZILLA;
    var$2[411] = cprnm_ItemType_HERO_DRAGZILLA;
    var$2[412] = cprnm_ItemType_STONE_PIRATE;
    var$2[413] = cprnm_ItemType_HERO_PIRATE;
    var$2[414] = cprnm_ItemType_STONE_CYCLOPS_WIZARD;
    var$2[415] = cprnm_ItemType_HERO_CYCLOPS_WIZARD;
    var$2[416] = cprnm_ItemType_STONE_DEMON_TOTEM;
    var$2[417] = cprnm_ItemType_HERO_DEMON_TOTEM;
    var$2[418] = cprnm_ItemType_SHARD_MACGUFFIN_FRAGMENT_45;
    var$2[419] = cprnm_ItemType_SHARD_THE_HOLY_PAIL;
    var$2[420] = cprnm_ItemType_SKIN_CRIMSON_WITCH_CROW;
    var$2[421] = cprnm_ItemType_SKIN_ELECTROYETI_SASQUATCH;
    var$2[422] = cprnm_ItemType_SKIN_HYDRA_SEA_DRAGON;
    var$2[423] = cprnm_ItemType_SKIN_FAITH_HEALER_CTHULU;
    var$2[424] = cprnm_ItemType_OFFERING_TREE;
    var$2[425] = cprnm_ItemType_OFFERING_FIRE;
    var$2[426] = cprnm_ItemType_OFFERING_OCEAN;
    var$2[427] = cprnm_ItemType_OFFERING_ROCK;
    var$2[428] = cprnm_ItemType_OFFERING_MIST;
    var$2[429] = cprnm_ItemType_OFFERING_LIGHTNING;
    var$2[430] = cprnm_ItemType_OFFERING_BLOOD;
    var$2[431] = cprnm_ItemType_OFFERING_RIVER;
    var$2[432] = cprnm_ItemType_OFFERING_HAIL;
    var$2[433] = cprnm_ItemType_OFFERING_KEYSTONE;
    var$2[434] = cprnm_ItemType_OFFERING_MAJOR_1;
    var$2[435] = cprnm_ItemType_OFFERING_MAJOR_2;
    var$2[436] = cprnm_ItemType_OFFERING_MINOR_1;
    var$2[437] = cprnm_ItemType_OFFERING_MINOR_2;
    var$2[438] = cprnm_ItemType_OFFERING_MINOR_3;
    var$2[439] = cprnm_ItemType_SHRINE_ROLL_STONE;
    var$2[440] = cprnm_ItemType_SHRINE_ROLL_CRYSTAL;
    var$2[441] = cprnm_ItemType_STONE_DEEP_DRAGON;
    var$2[442] = cprnm_ItemType_HERO_DEEP_DRAGON;
    var$2[443] = cprnm_ItemType_STONE_DOPPELGANGER;
    var$2[444] = cprnm_ItemType_HERO_DOPPELGANGER;
    var$2[445] = cprnm_ItemType_STONE_KRAKEN_KING;
    var$2[446] = cprnm_ItemType_HERO_KRAKEN_KING;
    var$2[447] = cprnm_ItemType_STONE_STOWAWAY;
    var$2[448] = cprnm_ItemType_HERO_STOWAWAY;
    var$2[449] = cprnm_ItemType_SKIN_BARDBARIAN_CHAMPION;
    var$2[450] = cprnm_ItemType_SKIN_CENTAUR_RESPLENDENT;
    var$2[451] = cprnm_ItemType_SKIN_DRAGON_LADY_MASTERY;
    var$2[452] = cprnm_ItemType_SKIN_MINOTAUR_HOLSTEIN;
    var$2[453] = cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_MASTERY;
    var$2[454] = cprnm_ItemType_REEL_DRAGON_SCALE;
    var$2[455] = cprnm_ItemType_REEL_CHUGG_BOOTS;
    var$2[456] = cprnm_ItemType_REEL_BLACKSTEEL_BLADE;
    var$2[457] = cprnm_ItemType_REEL_YODELING_SWORD;
    var$2[458] = cprnm_ItemType_REEL_POWER_OF_SCIENCE;
    var$2[459] = cprnm_ItemType_REEL_GIRDLE_OF_VICTORY;
    var$2[460] = cprnm_ItemType_REEL_RATTLING_SABRE;
    var$2[461] = cprnm_ItemType_REEL_MYSTICAL_ELVEN_JUNK;
    var$2[462] = cprnm_ItemType_REEL_JAR_OF_KITTEN_TEAR;
    var$2[463] = cprnm_ItemType_REEL_GLASS_CASE_OF_EMOTION;
    var$2[464] = cprnm_ItemType_REEL_UNICORN_PUKE;
    var$2[465] = cprnm_ItemType_REEL_IVY_LEAGUE_HAIRCUT;
    var$2[466] = cprnm_ItemType_REEL_ORNATE_CROWN_OF_THE_GM;
    var$2[467] = cprnm_ItemType_REEL_TAROT_DECK_OF_HYPERBOLE;
    var$2[468] = cprnm_ItemType_REEL_DIRTY_BASTARD_SWORD;
    var$2[469] = cprnm_ItemType_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT;
    var$2[470] = cprnm_ItemType_REEL_EYE_OF_THE_BEHOLDER;
    var$2[471] = cprnm_ItemType_REEL_GLORY_SEEKER;
    var$2[472] = cprnm_ItemType_SHARD_REEL_DRAGON_SCALE;
    var$2[473] = cprnm_ItemType_SHARD_REEL_CHUGG_BOOTS;
    var$2[474] = cprnm_ItemType_SHARD_REEL_BLACKSTEEL_BLADE;
    var$2[475] = cprnm_ItemType_SHARD_REEL_YODELING_SWORD;
    var$2[476] = cprnm_ItemType_SHARD_REEL_POWER_OF_SCIENCE;
    var$2[477] = cprnm_ItemType_SHARD_REEL_GIRDLE_OF_VICTORY;
    var$2[478] = cprnm_ItemType_SHARD_REEL_RATTLING_SABRE;
    var$2[479] = cprnm_ItemType_SHARD_REEL_MYSTICAL_ELVEN_JUNK;
    var$2[480] = cprnm_ItemType_SHARD_REEL_JAR_OF_KITTEN_TEAR;
    var$2[481] = cprnm_ItemType_SHARD_REEL_GLASS_CASE_OF_EMOTION;
    var$2[482] = cprnm_ItemType_SHARD_REEL_UNICORN_PUKE;
    var$2[483] = cprnm_ItemType_SHARD_REEL_IVY_LEAGUE_HAIRCUT;
    var$2[484] = cprnm_ItemType_SHARD_REEL_ORNATE_CROWN_OF_THE_GM;
    var$2[485] = cprnm_ItemType_SHARD_REEL_TAROT_DECK_OF_HYPERBOLE;
    var$2[486] = cprnm_ItemType_SHARD_REEL_DIRTY_BASTARD_SWORD;
    var$2[487] = cprnm_ItemType_SHARD_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT;
    var$2[488] = cprnm_ItemType_SHARD_REEL_EYE_OF_THE_BEHOLDER;
    var$2[489] = cprnm_ItemType_SHARD_REEL_GLORY_SEEKER;
    var$2[490] = cprnm_ItemType_SKIN_BROZERKER_BODYGUARD;
    var$2[491] = cprnm_ItemType_SKIN_SNAP_DRAGON_MASTERY;
    var$2[492] = cprnm_ItemType_SKIN_CATAPULT_KNIGHT_MASTERY;
    var$2[493] = cprnm_ItemType_SKIN_ELECTROYETI_MASTERY;
    var$2[494] = cprnm_ItemType_SKIN_MOON_DRAKE_MASTERY;
    var$2[495] = cprnm_ItemType_SKIN_MEDUSA_MASTERY;
    var$2[496] = cprnm_ItemType_SKIN_NINJA_DWARF_MASTERY;
    var$2[497] = cprnm_ItemType_SKIN_POLEMASTER_GYMNAST;
    var$2[498] = cprnm_ItemType_SKIN_ROLLER_WARRIOR_LUAU;
    var$2[499] = cprnm_ItemType_SKIN_DUST_DEVIL_PARISIAN;
    var$2[500] = cprnm_ItemType_SKIN_SKELETON_KING_MASTERY;
    var$2[501] = cprnm_ItemType_SKIN_SPIKEY_DRAGON_MASTERY;
    var$2[502] = cprnm_ItemType_SKIN_DARK_DRACUL_FLYING_SQUIRREL;
    var$2[503] = cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_MASTERY;
    var$2[504] = cprnm_ItemType_SKIN_DARK_DRACUL_MASTERY;
    var$2[505] = cprnm_ItemType_SKIN_POLEMASTER_MASTERY;
    var$2[506] = cprnm_ItemType_SKIN_SKELETON_DEER_MASTERY;
    var$2[507] = cprnm_ItemType_STONE_CURSED_STATUE;
    var$2[508] = cprnm_ItemType_HERO_CURSED_STATUE;
    var$2[509] = cprnm_ItemType_STONE_PLANT_SOUL;
    var$2[510] = cprnm_ItemType_HERO_PLANT_SOUL;
    var$2[511] = cprnm_ItemType_STONE_SPIDER_QUEEN;
    var$2[512] = cprnm_ItemType_HERO_SPIDER_QUEEN;
    var$2[513] = cprnm_ItemType_STONE_VULTURE_DRAGON;
    var$2[514] = cprnm_ItemType_HERO_VULTURE_DRAGON;
    var$2[515] = cprnm_ItemType_HAMMER_TIME;
    var$2[516] = cprnm_ItemType_MEATY_BUTTER;
    var$2[517] = cprnm_ItemType_FOUNTAIN_OF_OLD_AGE;
    var$2[518] = cprnm_ItemType_ORGANIC_BOOK_OF_NATURE;
    var$2[519] = cprnm_ItemType_VOLATILE_SMOOTHIE;
    var$2[520] = cprnm_ItemType_ITEM_INFO;
    var$2[521] = cprnm_ItemType_ROCKET_CLOAK;
    var$2[522] = cprnm_ItemType_POLITICAL_PLATFORM_SHOES;
    var$2[523] = cprnm_ItemType_GLASS_CANNON;
    var$2[524] = cprnm_ItemType_LITTLE_PRICKS;
    var$2[525] = cprnm_ItemType_ORBITAL_KITTY;
    var$2[526] = cprnm_ItemType_RING_OF_ILL_WILL;
    var$2[527] = cprnm_ItemType_GOOD_GREEN_GOO;
    var$2[528] = cprnm_ItemType_WHITE_PICKET_SHIELD;
    var$2[529] = cprnm_ItemType_NUMBER_529;
    var$2[530] = cprnm_ItemType_SICK_MULLET;
    var$2[531] = cprnm_ItemType_FOUR_D_GLASSES;
    var$2[532] = cprnm_ItemType_HAIR_OF_THE_DOG;
    var$2[533] = cprnm_ItemType_SKIN_BROZERKER_VETERAN;
    var$2[534] = cprnm_ItemType_SKIN_CRIMSON_WITCH_SORCERESS;
    var$2[535] = cprnm_ItemType_SKIN_GENIE_GOLDEN;
    var$2[536] = cprnm_ItemType_SKIN_MINOTAUR_MARAUDER;
    var$2[537] = cprnm_ItemType_SKIN_SAVAGE_CUTIE_RAVAGER;
    var$2[538] = cprnm_ItemType_SKIN_UNICORGI_ARMORED;
    var$2[539] = cprnm_ItemType_SKIN_SNAP_DRAGON_EVERGLADES;
    var$2[540] = cprnm_ItemType_SKIN_MAGIC_DRAGON_SPAGHETTI;
    var$2[541] = cprnm_ItemType_SKIN_SPIKEY_DRAGON_MECHA;
    var$2[542] = cprnm_ItemType_SKIN_DRUIDINATRIX_SPRING;
    var$2[543] = cprnm_ItemType_SKIN_CATAPULT_KNIGHT_UNICORN;
    var$2[544] = cprnm_ItemType_SKIN_DRAGZILLA_ZILLA;
    var$2[545] = cprnm_ItemType_SKIN_SNIPER_WOLF_DANCER;
    var$2[546] = cprnm_ItemType_STONE_BANSHEE;
    var$2[547] = cprnm_ItemType_HERO_BANSHEE;
    var$2[548] = cprnm_ItemType_STONE_RAGING_REVENANT;
    var$2[549] = cprnm_ItemType_HERO_RAGING_REVENANT;
    var$2[550] = cprnm_ItemType_STONE_SILENT_SPIRIT;
    var$2[551] = cprnm_ItemType_HERO_SILENT_SPIRIT;
    var$2[552] = cprnm_ItemType_STONE_SPECTRAL_DRAGON;
    var$2[553] = cprnm_ItemType_HERO_SPECTRAL_DRAGON;
    var$2[554] = cprnm_ItemType_SKIN_CYCLOPS_WIZARD_MASTERY;
    var$2[555] = cprnm_ItemType_SKIN_DEMON_TOTEM_MASTERY;
    var$2[556] = cprnm_ItemType_SKIN_SATYR_MASTERY;
    var$2[557] = cprnm_ItemType_SKIN_SHADOW_ASSASSIN_MASTERY;
    var$2[558] = cprnm_ItemType_SKIN_STORM_DRAGON_MASTERY;
    var$2[559] = cprnm_ItemType_REEL_SICK_MULLET;
    var$2[560] = cprnm_ItemType_REEL_ORBITAL_KITTY;
    var$2[561] = cprnm_ItemType_REEL_HAMMER_TIME;
    var$2[562] = cprnm_ItemType_SHARD_VOLATILE_SMOOTHIE;
    var$2[563] = cprnm_ItemType_SHARD_RING_OF_ILL_WILL;
    var$2[564] = cprnm_ItemType_SHARD_LITTLE_PRICKS;
    var$2[565] = cprnm_ItemType_SHARD_FOUR_D_GLASSES;
    var$2[566] = cprnm_ItemType_SHARD_REEL_SICK_MULLET;
    var$2[567] = cprnm_ItemType_SHARD_REEL_ORBITAL_KITTY;
    var$2[568] = cprnm_ItemType_SHARD_REEL_HAMMER_TIME;
    var$2[569] = cprnm_ItemType_SKIN_COSMIC_ELF_ALIEN;
    var$2[570] = cprnm_ItemType_SKIN_DEMON_TOTEM_KITTEN;
    var$2[571] = cprnm_ItemType_SKIN_SAVAGE_CUTIE_TADPOLE;
    var$2[572] = cprnm_ItemType_SKIN_DARK_HORSE_MASTERY;
    var$2[573] = cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_BALLERINA;
    var$2[574] = cprnm_ItemType_SKIN_BONE_DRAGON_MASTERY;
    var$2[575] = cprnm_ItemType_SKIN_DWARVEN_ARCHER_MASTERY;
    var$2[576] = cprnm_ItemType_SKIN_FAITH_HEALER_MASTERY;
    var$2[577] = cprnm_ItemType_SKIN_FROST_GIANT_FLAMING;
    var$2[578] = cprnm_ItemType_STONE_WEREDRAGON;
    var$2[579] = cprnm_ItemType_HERO_WEREDRAGON;
    var$2[580] = cprnm_ItemType_BOOM_BOX;
    var$2[581] = cprnm_ItemType_UPHOLSTERED_THRONE;
    var$2[582] = cprnm_ItemType_SHOES_OF_THE_MAD_GOD;
    var$2[583] = cprnm_ItemType_LOST_CONCEPT_ART;
    var$2[584] = cprnm_ItemType_LIGHTNING_GREASE;
    var$2[585] = cprnm_ItemType_PHAT_PANTS;
    var$2[586] = cprnm_ItemType_HEAL_AID;
    var$2[587] = cprnm_ItemType_BRAIN_PILLS;
    var$2[588] = cprnm_ItemType_FLAMEY_POOFS;
    var$2[589] = cprnm_ItemType_TUNNEL_VISION;
    var$2[590] = cprnm_ItemType_STAY_BOARD;
    var$2[591] = cprnm_ItemType_CAVE_DAGGER;
    var$2[592] = cprnm_ItemType_DESERT_SMASHER;
    var$2[593] = cprnm_ItemType_FEATHER_WEIGHT_PAULDRONS;
    var$2[594] = cprnm_ItemType_MUSCLE_BOUND_BOOK;
    var$2[595] = cprnm_ItemType_HOT_ARMOR;
    var$2[596] = cprnm_ItemType_REEL_BOOM_BOX;
    var$2[597] = cprnm_ItemType_REEL_UPHOLSTERED_THRONE;
    var$2[598] = cprnm_ItemType_REEL_SHOES_OF_THE_MAD_GOD;
    var$2[599] = cprnm_ItemType_SHARD_LOST_CONCEPT_ART;
    var$2[600] = cprnm_ItemType_SHARD_LIGHTNING_GREASE;
    var$2[601] = cprnm_ItemType_SHARD_PHAT_PANTS;
    var$2[602] = cprnm_ItemType_SHARD_HEAL_AID;
    var$2[603] = cprnm_ItemType_SHARD_REEL_BOOM_BOX;
    var$2[604] = cprnm_ItemType_SHARD_REEL_UPHOLSTERED_THRONE;
    var$2[605] = cprnm_ItemType_SHARD_REEL_SHOES_OF_THE_MAD_GOD;
    var$2[606] = cprnm_ItemType_STONE_WEE_WITCH;
    var$2[607] = cprnm_ItemType_HERO_WEE_WITCH;
    var$2[608] = cprnm_ItemType_HERO_DUNGEON_MAN;
    var$2[609] = cprnm_ItemType_STONE_DUNGEON_MAN;
    var$2[610] = cprnm_ItemType_STONE_PLAGUE_ENTREPRENEUR;
    var$2[611] = cprnm_ItemType_HERO_PLAGUE_ENTREPRENEUR;
    var$2[612] = cprnm_ItemType_SKIN_MEDUSA_BLACK_MAMBA;
    var$2[613] = cprnm_ItemType_SKIN_GROOVY_DRUID_MASTERY;
    var$2[614] = cprnm_ItemType_SKIN_HYDRA_MASTERY;
    var$2[615] = cprnm_ItemType_SKIN_ORC_MONK_ORCS;
    var$2[616] = cprnm_ItemType_SKIN_DRAGZILLA_DRAG;
    var$2[617] = cprnm_ItemType_HERO_MISTRESS_MANICURE;
    var$2[618] = cprnm_ItemType_STONE_MISTRESS_MANICURE;
    var$2[619] = cprnm_ItemType_STONE_VILE_BILE;
    var$2[620] = cprnm_ItemType_HERO_VILE_BILE;
    var$2[621] = cprnm_ItemType_SKIN_NINJA_DWARF_DATENIGHT;
    var$2[622] = cprnm_ItemType_SKIN_RABID_DRAGON_MASTERY;
    var$2[623] = cprnm_ItemType_SKIN_CENTAUR_OF_ATTENTION_MASTERY;
    var$2[624] = cprnm_ItemType_STONE_VOID_WYVERN;
    var$2[625] = cprnm_ItemType_SKIN_ORC_MONK_UNCLE;
    var$2[626] = cprnm_ItemType_EYE_ON_THE_PRIZE;
    var$2[627] = cprnm_ItemType_BRAIN_GUARD_9000;
    var$2[628] = cprnm_ItemType_BEARLY_THERE_BOOTS;
    var$2[629] = cprnm_ItemType_TIME_KILLER;
    var$2[630] = cprnm_ItemType_DOUBLE_BLADED_SWORD;
    var$2[631] = cprnm_ItemType_SOUL_PUPPET;
    var$2[632] = cprnm_ItemType_HEARTY_CHEST;
    var$2[633] = cprnm_ItemType_MIND_MAP;
    var$2[634] = cprnm_ItemType_TIME_SAVER;
    var$2[635] = cprnm_ItemType_CANNON_CANOE;
    var$2[636] = cprnm_ItemType_NEW_KNIGHT_IN_TOWN;
    var$2[637] = cprnm_ItemType_BLACKSMITH_BREW;
    var$2[638] = cprnm_ItemType_ARCANE_DOODLES;
    var$2[639] = cprnm_ItemType_BELL_OF_SILENCE;
    var$2[640] = cprnm_ItemType_FEATHERWEIGHT_WINGS;
    var$2[641] = cprnm_ItemType_ADVENTURERS_STARTER_PACK;
    var$2[642] = cprnm_ItemType_REEL_EYE_ON_THE_PRIZE;
    var$2[643] = cprnm_ItemType_REEL_BRAIN_GUARD_9000;
    var$2[644] = cprnm_ItemType_REEL_BEARLY_THERE_BOOTS;
    var$2[645] = cprnm_ItemType_SHARD_TIME_KILLER;
    var$2[646] = cprnm_ItemType_SHARD_DOUBLE_BLADED_SWORD;
    var$2[647] = cprnm_ItemType_SHARD_SOUL_PUPPET;
    var$2[648] = cprnm_ItemType_SHARD_HEARTY_CHEST;
    var$2[649] = cprnm_ItemType_SHARD_REEL_EYE_ON_THE_PRIZE;
    var$2[650] = cprnm_ItemType_SHARD_REEL_BRAIN_GUARD_9000;
    var$2[651] = cprnm_ItemType_SHARD_REEL_BEARLY_THERE_BOOTS;
    var$2[652] = cprnm_ItemType_SKIN_STOWAWAY_SANTAS_HELPER;
    var$2[653] = cprnm_ItemType_SKIN_FROST_GIANT_FURIOUS;
    var$2[654] = cprnm_ItemType_SKIN_BONE_DRAGON_PEPPERMINT;
    var$2[655] = cprnm_ItemType_SKIN_BARDBARIAN_WOOD_ELF;
    var$2[656] = cprnm_ItemType_SKIN_MOON_DRAKE_FESTIVE_FAIRY;
    var$2[657] = cprnm_ItemType_SKIN_DWARVEN_ARCHER_ROMANTIC;
    var$2[658] = cprnm_ItemType_SKIN_RABID_DRAGON_DOGGY;
    var$2[659] = cprnm_ItemType_SKIN_PIRATE_SPACE;
    var$2[660] = cprnm_ItemType_SKIN_SILENT_SPIRIT_CLOWN;
    var$2[661] = cprnm_ItemType_SKIN_PIRATE_MASTERY;
    var$2[662] = cprnm_ItemType_SKIN_DUST_DEVIL_MASTERY;
    var$2[663] = cprnm_ItemType_SKIN_ORC_MONK_MASTERY;
    var$2[664] = cprnm_ItemType_HERO_VOID_WYVERN;
    var$2[665] = cprnm_ItemType_SKIN_AQUATIC_MAN_MASTERY;
    var$2[666] = cprnm_ItemType_SKIN_FROST_GIANT_MASTERY;
    var$2[667] = cprnm_ItemType_SKIN_BANSHEE_BUTTON_DOLL;
    var$2[668] = cprnm_ItemType_SKIN_COSMIC_ELF_MASTERY;
    var$2[669] = cprnm_ItemType_MY_JAM;
    var$2[670] = cprnm_ItemType_CREATINE_CACTUS;
    var$2[671] = cprnm_ItemType_MUNDANE_MUSHROOMS;
    var$2[672] = cprnm_ItemType_CROWNING_ACHIEVEMENT;
    var$2[673] = cprnm_ItemType_FRIENDZONITE;
    var$2[674] = cprnm_ItemType_THE_HUSTLE;
    var$2[675] = cprnm_ItemType_FLOPPIN_FLIP_FLOPS;
    var$2[676] = cprnm_ItemType_VOLCANIC_BLADE;
    var$2[677] = cprnm_ItemType_ENGAGEMENT_KNUCKLES;
    var$2[678] = cprnm_ItemType_MOON_LIGHT;
    var$2[679] = cprnm_ItemType_GREAT_HORNED_HORN;
    var$2[680] = cprnm_ItemType_HEART_HEALTH_CANDY;
    var$2[681] = cprnm_ItemType_GROUND_GEARS;
    var$2[682] = cprnm_ItemType_CLOAK_OF_THE_OWL;
    var$2[683] = cprnm_ItemType_DODGY_JEWELRY;
    var$2[684] = cprnm_ItemType_ALCHEMIST_STARTER_PACK;
    var$2[685] = cprnm_ItemType_REEL_FLOPPIN_FLIP_FLOPS;
    var$2[686] = cprnm_ItemType_REEL_HEART_HEALTH_CANDY;
    var$2[687] = cprnm_ItemType_REEL_CLOAK_OF_THE_OWL;
    var$2[688] = cprnm_ItemType_SHARD_REEL_FLOPPIN_FLIP_FLOPS;
    var$2[689] = cprnm_ItemType_SHARD_REEL_HEART_HEALTH_CANDY;
    var$2[690] = cprnm_ItemType_SHARD_REEL_CLOAK_OF_THE_OWL;
    var$2[691] = cprnm_ItemType_SHARD_CREATINE_CACTUS;
    var$2[692] = cprnm_ItemType_SHARD_MUNDANE_MUSHROOMS;
    var$2[693] = cprnm_ItemType_SHARD_THE_HUSTLE;
    var$2[694] = cprnm_ItemType_SHARD_GROUND_GEARS;
    var$2[695] = cprnm_ItemType_STONE_BURNT_ONE;
    var$2[696] = cprnm_ItemType_HERO_BURNT_ONE;
    var$2[697] = cprnm_ItemType_SKIN_DOPPELGANGER_MOLTEN;
    var$2[698] = cprnm_ItemType_CRUDE_SHIELD;
    var$2[699] = cprnm_ItemType_DWARVEN_LIFTING_BELT;
    var$2[700] = cprnm_ItemType_PURPLE_CHEST_ROLL_X1;
    var$2[701] = cprnm_ItemType_ORANGE_CHEST_ROLL_X1;
    var$2[702] = cprnm_ItemType_SKIN_STOWAWAY_MASTERY;
    var$2[703] = cprnm_ItemType_SKIN_DOPPELGANGER_MASTERY;
    var$2[704] = cprnm_ItemType_SKIN_KRAKEN_KING_MASTERY;
    var$2[705] = cprnm_ItemType_SKIN_MAGIC_DRAGON_MASTERY;
    var$2[706] = cprnm_ItemType_SKIN_SNIPER_WOLF_ASTRAL_SPIRIT;
    var$2[707] = cprnm_ItemType_SKIN_BARDBARIAN_HIGHSCORE;
    var$2[708] = cprnm_ItemType_SKIN_GENIE_TARNISHED_DJINN;
    var$2[709] = cprnm_ItemType_SKIN_AQUATIC_MAN_MANATEE;
    var$2[710] = cprnm_ItemType_SKIN_UNICORGI_RAINBOW;
    var$2[711] = cprnm_ItemType_SKIN_BONE_DRAGON_ADAMANTIUM;
    var$2[712] = cprnm_ItemType_SKIN_SATYR_WOLF;
    var$2[713] = cprnm_ItemType_SKIN_MOON_DRAKE_MECHA;
    var$2[714] = cprnm_ItemType_SKIN_PLANT_SOUL_COUNTRY;
    var$2[715] = cprnm_ItemType_SKIN_SKELETON_KING_ASCENDANT;
    var$2[716] = cprnm_ItemType_SKIN_SKELETON_DEER_ASCENDANT_DEER;
    var$2[717] = cprnm_ItemType_STONE_TOMB_ANGEL;
    var$2[718] = cprnm_ItemType_HERO_TOMB_ANGEL;
    var$2[719] = cprnm_ItemType_STONE_ANGELIC_HERALD;
    var$2[720] = cprnm_ItemType_HERO_ANGELIC_HERALD;
    var$2[721] = cprnm_ItemType_STONE_BULWARK_ANGEL;
    var$2[722] = cprnm_ItemType_HERO_BULWARK_ANGEL;
    var$2[723] = cprnm_ItemType_HERO_ANGEL_DRAGON;
    var$2[724] = cprnm_ItemType_STONE_ANGEL_DRAGON;
    var$2[725] = cprnm_ItemType_AGED_DRAGON_MILK;
    var$2[726] = cprnm_ItemType_ANCIENT_CODE;
    var$2[727] = cprnm_ItemType_AUTO_FLUTE;
    var$2[728] = cprnm_ItemType_BLUNT_BLADE;
    var$2[729] = cprnm_ItemType_DRACONIC_FUSE;
    var$2[730] = cprnm_ItemType_FLATTERING_MIRROR;
    var$2[731] = cprnm_ItemType_GIANTS_GROG;
    var$2[732] = cprnm_ItemType_ILLUSORY_HURDLE;
    var$2[733] = cprnm_ItemType_LION_LIQUEUR;
    var$2[734] = cprnm_ItemType_LOST_GREAVES;
    var$2[735] = cprnm_ItemType_POISONED_DAGGER;
    var$2[736] = cprnm_ItemType_RINGS_OF_A_FEATHER;
    var$2[737] = cprnm_ItemType_SPIDER_BOMB;
    var$2[738] = cprnm_ItemType_VANISHING_SCROLL;
    var$2[739] = cprnm_ItemType_SHARD_GIANTS_GROG;
    var$2[740] = cprnm_ItemType_REEL_FLATTERING_MIRROR;
    var$2[741] = cprnm_ItemType_REEL_BLUNT_BLADE;
    var$2[742] = cprnm_ItemType_REEL_LOST_GREAVES;
    var$2[743] = cprnm_ItemType_SHARD_AGED_DRAGON_MILK;
    var$2[744] = cprnm_ItemType_SHARD_POISONED_DAGGER;
    var$2[745] = cprnm_ItemType_SHARD_RINGS_OF_A_FEATHER;
    var$2[746] = cprnm_ItemType_SHARD_REEL_FLATTERING_MIRROR;
    var$2[747] = cprnm_ItemType_SHARD_REEL_BLUNT_BLADE;
    var$2[748] = cprnm_ItemType_SHARD_REEL_LOST_GREAVES;
    var$2[749] = cprnm_ItemType_STONE_DRAGON_SLAYER;
    var$2[750] = cprnm_ItemType_HERO_DRAGON_SLAYER;
    var$2[751] = cprnm_ItemType_STONE_ETERNAL_ENCHANTER;
    var$2[752] = cprnm_ItemType_HERO_ETERNAL_ENCHANTER;
    var$2[753] = cprnm_ItemType_STONE_GRAND_HUNTRESS;
    var$2[754] = cprnm_ItemType_HERO_GRAND_HUNTRESS;
    var$2[755] = cprnm_ItemType_STONE_TRIPLE_THREAT;
    var$2[756] = cprnm_ItemType_HERO_TRIPLE_THREAT;
    var$2[757] = cprnm_ItemType_SKIN_RAGING_REVENANT_MASTERY;
    var$2[758] = cprnm_ItemType_SKIN_VULTURE_DRAGON_MASTERY;
    var$2[759] = cprnm_ItemType_TRIASSIC_TRINKET;
    var$2[760] = cprnm_ItemType_RUBY_FLIP_FLOPS;
    var$2[761] = cprnm_ItemType_PURIFICATION_ROBE;
    var$2[762] = cprnm_ItemType_DENSE_CAKE_OF_HATE;
    var$2[763] = cprnm_ItemType_CRUDE_SNIPPERS;
    var$2[764] = cprnm_ItemType_MAD_GODS_MUG;
    var$2[765] = cprnm_ItemType_GOLDEN_SLINGSHOT;
    var$2[766] = cprnm_ItemType_CAT_O_NINE_TAILS;
    var$2[767] = cprnm_ItemType_FEATHER_WEIGHT_FOIL;
    var$2[768] = cprnm_ItemType_TOME_OF_CURSED_HORTICULTURE;
    var$2[769] = cprnm_ItemType_ESCUTCHEON_OF_EYES;
    var$2[770] = cprnm_ItemType_SOUL_FOR_POWER_VOLUME_45;
    var$2[771] = cprnm_ItemType_OGRES_BATTERING_RAM;
    var$2[772] = cprnm_ItemType_COG_NITIVE_MASK;
    var$2[773] = cprnm_ItemType_BUNNY_BLADE;
    var$2[774] = cprnm_ItemType_HEART_HAT;
    var$2[775] = cprnm_ItemType_DRAGON_BLANKIE;
    var$2[776] = cprnm_ItemType_RING_OF_FIRE;
    var$2[777] = cprnm_ItemType_NAUGHTY_TAPESTRY;
    var$2[778] = cprnm_ItemType_MANLY_FIRST_AID_KIT;
    var$2[779] = cprnm_ItemType_SHARD_CRUDE_SNIPPERS;
    var$2[780] = cprnm_ItemType_SHARD_MAD_GODS_MUG;
    var$2[781] = cprnm_ItemType_SHARD_GOLDEN_SLINGSHOT;
    var$2[782] = cprnm_ItemType_SHARD_CAT_O_NINE_TAILS;
    var$2[783] = cprnm_ItemType_SHARD_DRAGON_BLANKIE;
    var$2[784] = cprnm_ItemType_SHARD_RING_OF_FIRE;
    var$2[785] = cprnm_ItemType_SHARD_NAUGHTY_TAPESTRY;
    var$2[786] = cprnm_ItemType_SHARD_MANLY_FIRST_AID_KIT;
    var$2[787] = cprnm_ItemType_REEL_ROCKET_CLOAK;
    var$2[788] = cprnm_ItemType_REEL_ANCIENT_CODE;
    var$2[789] = cprnm_ItemType_REEL_BLACKSMITH_BREW;
    var$2[790] = cprnm_ItemType_REEL_FEATHER_WEIGHT_PAULDRONS;
    var$2[791] = cprnm_ItemType_REEL_TRIASSIC_TRINKET;
    var$2[792] = cprnm_ItemType_REEL_RUBY_FLIP_FLOPS;
    var$2[793] = cprnm_ItemType_REEL_PURIFICATION_ROBE;
    var$2[794] = cprnm_ItemType_REEL_DENSE_CAKE_OF_HATE;
    var$2[795] = cprnm_ItemType_SREEL_FEATHER_WEIGHT_FOIL;
    var$2[796] = cprnm_ItemType_REEL_TOME_OF_CURSED_HORTICULTURE;
    var$2[797] = cprnm_ItemType_REEL_ESCUTCHEON_OF_EYES;
    var$2[798] = cprnm_ItemType_REEL_SOUL_FOR_POWER_VOLUME_45;
    var$2[799] = cprnm_ItemType_REEL_OGRES_BATTERING_RAM;
    var$2[800] = cprnm_ItemType_REEL_COG_NITIVE_MASK;
    var$2[801] = cprnm_ItemType_REEL_BUNNY_BLADE;
    var$2[802] = cprnm_ItemType_REEL_HEART_HAT;
    var$2[803] = cprnm_ItemType_REEL_FEATHER_WEIGHT_FOIL;
    var$2[804] = cprnm_ItemType_SHARD_REEL_ANCIENT_CODE;
    var$2[805] = cprnm_ItemType_SHARD_REEL_BLACKSMITH_BREW;
    var$2[806] = cprnm_ItemType_SHARD_REEL_BUNNY_BLADE;
    var$2[807] = cprnm_ItemType_SHARD_REEL_DENSE_CAKE_OF_HATE;
    var$2[808] = cprnm_ItemType_SHARD_REEL_ESCUTCHEON_OF_EYES;
    var$2[809] = cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_FOIL;
    var$2[810] = cprnm_ItemType_SHARD_REEL_FEATHER_WEIGHT_PAULDRONS;
    var$2[811] = cprnm_ItemType_SHARD_REEL_HEART_HAT;
    var$2[812] = cprnm_ItemType_SHARD_REEL_OGRES_BATTERING_RAM;
    var$2[813] = cprnm_ItemType_SHARD_REEL_PURIFICATION_ROBE;
    var$2[814] = cprnm_ItemType_SHARD_REEL_ROCKET_CLOAK;
    var$2[815] = cprnm_ItemType_SHARD_REEL_RUBY_FLIP_FLOPS;
    var$2[816] = cprnm_ItemType_SHARD_REEL_SOUL_FOR_POWER_VOLUME_45;
    var$2[817] = cprnm_ItemType_SHARD_REEL_TOME_OF_CURSED_HORTICULTURE;
    var$2[818] = cprnm_ItemType_SHARD_REEL_TRIASSIC_TRINKET;
    var$2[819] = cprnm_ItemType_STONE_LAST_DEFENDER;
    var$2[820] = cprnm_ItemType_HERO_LAST_DEFENDER;
    var$2[821] = cprnm_ItemType_STONE_SOJOURNER_SORCERESS;
    var$2[822] = cprnm_ItemType_HERO_SOJOURNER_SORCERESS;
    var$2[823] = cprnm_ItemType_STONE_KARAOKE_KING;
    var$2[824] = cprnm_ItemType_HERO_KARAOKE_KING;
    var$2[825] = cprnm_ItemType_SHARD_REEL_COG_NITIVE_MASK;
    var$2[826] = cprnm_ItemType_SKIN_SOJOURNER_SORCERESS_CHRISTMAS;
    var$2[827] = cprnm_ItemType_STONE_SHADOW_OF_SVEN;
    var$2[828] = cprnm_ItemType_HERO_SHADOW_OF_SVEN;
    var$2[829] = cprnm_ItemType_STONE_SUN_SEEKER;
    var$2[830] = cprnm_ItemType_HERO_SUN_SEEKER;
    var$2[831] = cprnm_ItemType_STONE_STEPLADDER_BROTHERS;
    var$2[832] = cprnm_ItemType_HERO_STEPLADDER_BROTHERS;
    var$2[833] = cprnm_ItemType_STONE_FORGOTTEN_DRAGON;
    var$2[834] = cprnm_ItemType_HERO_FORGOTTEN_DRAGON;
    var$2[835] = cprnm_ItemType_SKIN_WEE_WITCH_MASTERY;
    var$2[836] = cprnm_ItemType_SKIN_BANSHEE_MASTERY;
    var$2[837] = cprnm_ItemType_SKIN_SILENT_SPIRIT_MASTERY;
    var$2[838] = cprnm_ItemType_SKIN_SPECTRAL_DRAGON_MASTERY;
    var$2[839] = cprnm_ItemType_TEAM_XP_BONUS_ITEM_12_HOUR;
    var$2[840] = cprnm_ItemType_TEAM_XP_BONUS_ITEM_24_HOUR;
    var$2[841] = cprnm_ItemType_TEAM_XP_BONUS_ITEM_72_HOUR;
    var$2[842] = cprnm_ItemType_BRACELET_OF_LIGHTNING;
    var$2[843] = cprnm_ItemType_HELMET_OF_FORESIGHT;
    var$2[844] = cprnm_ItemType_DRAGONS_BLADE;
    var$2[845] = cprnm_ItemType_GREAVES_OF_PLEIAS;
    var$2[846] = cprnm_ItemType_SWORD_OF_DESPAIR;
    var$2[847] = cprnm_ItemType_RING_OF_TEMPTATION;
    var$2[848] = cprnm_ItemType_MAI_TAI_OF_IMMUNITY;
    var$2[849] = cprnm_ItemType_WRAITH_BARRIER;
    var$2[850] = cprnm_ItemType_GAUNTLET_OF_THRONE;
    var$2[851] = cprnm_ItemType_BOOK_OF_IRMAC;
    var$2[852] = cprnm_ItemType_PHOENIX_TALISMAN;
    var$2[853] = cprnm_ItemType_LAZARUS_BEANS;
    var$2[854] = cprnm_ItemType_REEL_BRACELET_OF_LIGHTNING;
    var$2[855] = cprnm_ItemType_REEL_HELMET_OF_FORESIGHT;
    var$2[856] = cprnm_ItemType_REEL_DRAGONS_BLADE;
    var$2[857] = cprnm_ItemType_REEL_GREAVES_OF_PLEIAS;
    var$2[858] = cprnm_ItemType_REEL_SWORD_OF_DESPAIR;
    var$2[859] = cprnm_ItemType_REEL_RING_OF_TEMPTATION;
    var$2[860] = cprnm_ItemType_REEL_MAI_TAI_OF_IMMUNITY;
    var$2[861] = cprnm_ItemType_REEL_WRAITH_BARRIER;
    var$2[862] = cprnm_ItemType_SHARD_GAUNTLET_OF_THRONE;
    var$2[863] = cprnm_ItemType_SHARD_BOOK_OF_IRMAC;
    var$2[864] = cprnm_ItemType_SHARD_PHOENIX_TALISMAN;
    var$2[865] = cprnm_ItemType_SHARD_LAZARUS_BEANS;
    var$2[866] = cprnm_ItemType_SHARD_REEL_BRACELET_OF_LIGHTNING;
    var$2[867] = cprnm_ItemType_SHARD_REEL_HELMET_OF_FORESIGHT;
    var$2[868] = cprnm_ItemType_SHARD_REEL_DRAGONS_BLADE;
    var$2[869] = cprnm_ItemType_SHARD_REEL_GREAVES_OF_PLEIAS;
    var$2[870] = cprnm_ItemType_SHARD_REEL_SWORD_OF_DESPAIR;
    var$2[871] = cprnm_ItemType_SHARD_REEL_RING_OF_TEMPTATION;
    var$2[872] = cprnm_ItemType_SHARD_REEL_MAI_TAI_OF_IMMUNITY;
    var$2[873] = cprnm_ItemType_SHARD_REEL_WRAITH_BARRIER;
    var$2[874] = cprnm_ItemType_SKIN_CYCLOPS_WIZARD_VALENTINE;
    var$2[875] = cprnm_ItemType_SKIN_ROLLER_WARRIOR_VALENTINE;
    var$2[876] = cprnm_ItemType_STONE_BLACK_WING;
    var$2[877] = cprnm_ItemType_HERO_BLACK_WING;
    var$2[878] = cprnm_ItemType_STONE_GREED_DRAGON;
    var$2[879] = cprnm_ItemType_HERO_GREED_DRAGON;
    var$2[880] = cprnm_ItemType_STONE_UNRIPE_MYTHOLOGY;
    var$2[881] = cprnm_ItemType_HERO_UNRIPE_MYTHOLOGY;
    var$2[882] = cprnm_ItemType_SKIN_WEREDRAGON_MASTERY;
    var$2[883] = cprnm_ItemType_SKIN_DUNGEON_MAN_MASTERY;
    var$2[884] = cprnm_ItemType_STEAM_ENGINE;
    var$2[885] = cprnm_ItemType_IRON_HELMET_OF_BIKING;
    var$2[886] = cprnm_ItemType_ADVENTURERS_RIDES;
    var$2[887] = cprnm_ItemType_DRAGON_LEATHER_TIGHTS;
    var$2[888] = cprnm_ItemType_BONE_CRUSHING_PLIERS;
    var$2[889] = cprnm_ItemType_MYSTERIOUS_EGG;
    var$2[890] = cprnm_ItemType_MAGICAL_PEST_MAST;
    var$2[891] = cprnm_ItemType_THE_SHIELD_STOPS_YOU;
    var$2[892] = cprnm_ItemType_DOUBLE_AXE;
    var$2[893] = cprnm_ItemType_DEVILS_POT;
    var$2[894] = cprnm_ItemType_DRAGONS_POCKET_WATCH;
    var$2[895] = cprnm_ItemType_FAMILIAR_ENERGY_TANK;
    var$2[896] = cprnm_ItemType_REEL_STEAM_ENGINE;
    var$2[897] = cprnm_ItemType_REEL_IRON_HELMET_OF_BIKING;
    var$2[898] = cprnm_ItemType_REEL_ADVENTURERS_RIDES;
    var$2[899] = cprnm_ItemType_REEL_DRAGON_LEATHER_TIGHTS;
    var$2[900] = cprnm_ItemType_REEL_BONE_CRUSHING_PLIERS;
    var$2[901] = cprnm_ItemType_REEL_MYSTERIOUS_EGG;
    var$2[902] = cprnm_ItemType_REEL_MAGICAL_PEST_MAST;
    var$2[903] = cprnm_ItemType_REEL_THE_SHIELD_STOPS_YOU;
    var$2[904] = cprnm_ItemType_SHARD_DOUBLE_AXE;
    var$2[905] = cprnm_ItemType_SHARD_DEVILS_POT;
    var$2[906] = cprnm_ItemType_SHARD_DRAGONS_POCKET_WATCH;
    var$2[907] = cprnm_ItemType_SHARD_FAMILIAR_ENERGY_TANK;
    var$2[908] = cprnm_ItemType_SHARD_REEL_STEAM_ENGINE;
    var$2[909] = cprnm_ItemType_SHARD_REEL_IRON_HELMET_OF_BIKING;
    var$2[910] = cprnm_ItemType_SHARD_REEL_ADVENTURERS_RIDES;
    var$2[911] = cprnm_ItemType_SHARD_REEL_DRAGON_LEATHER_TIGHTS;
    var$2[912] = cprnm_ItemType_SHARD_REEL_BONE_CRUSHING_PLIERS;
    var$2[913] = cprnm_ItemType_SHARD_REEL_MYSTERIOUS_EGG;
    var$2[914] = cprnm_ItemType_SHARD_REEL_MAGICAL_PEST_MAST;
    var$2[915] = cprnm_ItemType_SHARD_REEL_THE_SHIELD_STOPS_YOU;
    var$2[916] = cprnm_ItemType_WORLD_EGG;
    var$2[917] = cprnm_ItemType_SKIN_WEE_WITCH_EASTER;
    var$2[918] = cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_EASTER;
    var$2[919] = cprnm_ItemType_SKIN_SPECTRAL_DRAGON_EASTER;
    var$2[920] = cprnm_ItemType_SKIN_DRUIDINATRIX_EASTER;
    var$2[921] = cprnm_ItemType_STONE_ANCIENT_DWARF;
    var$2[922] = cprnm_ItemType_HERO_ANCIENT_DWARF;
    var$2[923] = cprnm_ItemType_STONE_DIGGER_MOLE;
    var$2[924] = cprnm_ItemType_HERO_DIGGER_MOLE;
    var$2[925] = cprnm_ItemType_STONE_SADISTIC_DANCER;
    var$2[926] = cprnm_ItemType_HERO_SADISTIC_DANCER;
    var$2[927] = cprnm_ItemType_DRAGON_SAND_BOOTS;
    var$2[928] = cprnm_ItemType_PYRAMID_POWER;
    var$2[929] = cprnm_ItemType_NAVIGATION_TO_THE_PAST;
    var$2[930] = cprnm_ItemType_BALANCE_OF_LIFE;
    var$2[931] = cprnm_ItemType_MIRACLE_FURNACE_OF_BLACKSMITH;
    var$2[932] = cprnm_ItemType_GOOD_SLEEPING_BED;
    var$2[933] = cprnm_ItemType_SUNBLOCK_GOGGLES;
    var$2[934] = cprnm_ItemType_SAND_STORM;
    var$2[935] = cprnm_ItemType_MASK_OF_THE_ANCIENT_KING;
    var$2[936] = cprnm_ItemType_MAGICAL_CREAM;
    var$2[937] = cprnm_ItemType_DANCERS_BRA;
    var$2[938] = cprnm_ItemType_PRICKLING_WHIP;
    var$2[939] = cprnm_ItemType_WILDYS_HAT;
    var$2[940] = cprnm_ItemType_IRON_CLAWS;
    var$2[941] = cprnm_ItemType_MAGICAL_WATER_BOTTLE;
    var$2[942] = cprnm_ItemType_REEL_DRAGON_SAND_BOOTS;
    var$2[943] = cprnm_ItemType_REEL_PYRAMID_POWER;
    var$2[944] = cprnm_ItemType_REEL_NAVIGATION_TO_THE_PAST;
    var$2[945] = cprnm_ItemType_REEL_BALANCE_OF_LIFE;
    var$2[946] = cprnm_ItemType_REEL_MIRACLE_FURNACE_OF_BLACKSMITH;
    var$2[947] = cprnm_ItemType_REEL_GOOD_SLEEPING_BED;
    var$2[948] = cprnm_ItemType_REEL_SUNBLOCK_GOGGLES;
    var$2[949] = cprnm_ItemType_REEL_SAND_STORM;
    var$2[950] = cprnm_ItemType_REEL_MASK_OF_THE_ANCIENT_KING;
    var$2[951] = cprnm_ItemType_REEL_MAGICAL_CREAM;
    var$2[952] = cprnm_ItemType_REEL_DANCERS_BRA;
    var$2[953] = cprnm_ItemType_SHARD_PRICKLING_WHIP;
    var$2[954] = cprnm_ItemType_SHARD_WILDYS_HAT;
    var$2[955] = cprnm_ItemType_SHARD_IRON_CLAWS;
    var$2[956] = cprnm_ItemType_SHARD_MAGICAL_WATER_BOTTLE;
    var$2[957] = cprnm_ItemType_SHARD_REEL_DRAGON_SAND_BOOTS;
    var$2[958] = cprnm_ItemType_SHARD_REEL_PYRAMID_POWER;
    var$2[959] = cprnm_ItemType_SHARD_REEL_NAVIGATION_TO_THE_PAST;
    var$2[960] = cprnm_ItemType_SHARD_REEL_BALANCE_OF_LIFE;
    var$2[961] = cprnm_ItemType_SHARD_REEL_MIRACLE_FURNACE_OF_BLACKSMITH;
    var$2[962] = cprnm_ItemType_SHARD_REEL_GOOD_SLEEPING_BED;
    var$2[963] = cprnm_ItemType_SHARD_REEL_SUNBLOCK_GOGGLES;
    var$2[964] = cprnm_ItemType_SHARD_REEL_SAND_STORM;
    var$2[965] = cprnm_ItemType_SHARD_REEL_MASK_OF_THE_ANCIENT_KING;
    var$2[966] = cprnm_ItemType_SHARD_REEL_MAGICAL_CREAM;
    var$2[967] = cprnm_ItemType_SHARD_REEL_DANCERS_BRA;
    var$2[968] = cprnm_ItemType_SKIN_MISTRESS_MANICURE_MASTERY;
    var$2[969] = cprnm_ItemType_SKIN_VOID_WYVERN_MASTERY;
    var$2[970] = cprnm_ItemType_SKIN_DRAGZILLA_MASTERY;
    var$2[971] = cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_MASTERY;
    var$2[972] = cprnm_ItemType_SKIN_ZOMBIE_SQUIRE_DIGITAL;
    var$2[973] = cprnm_ItemType_SKIN_DRAGON_LADY_SPACE_KNIGHT;
    var$2[974] = cprnm_ItemType_SKIN_SHADOW_ASSASSIN_WATCH;
    var$2[975] = cprnm_ItemType_SKIN_CYCLOPS_WIZARD_CYCLEOPS;
    var$2[976] = cprnm_ItemType_SKIN_VOID_WYVERN_IMAGINATION;
    var$2[977] = cprnm_ItemType_SKIN_DEEP_DRAGON_WYRM;
    var$2[978] = cprnm_ItemType_BOSS_BATTLE_STAGE_RESET;
    var$2[979] = cprnm_ItemType_ANNIVERSARY_1000TH_RESKIN;
    var$2[980] = cprnm_ItemType_DOUBLE_EXPERT_CAMPAIGN_DROPS;
    var$2[981] = cprnm_ItemType_STONE_WHITE_TIGRESS;
    var$2[982] = cprnm_ItemType_HERO_WHITE_TIGRESS;
    var$2[983] = cprnm_ItemType_STONE_SNAPPER_BONE;
    var$2[984] = cprnm_ItemType_HERO_SNAPPER_BONE;
    var$2[985] = cprnm_ItemType_DEDICATED_MEDUSA;
    var$2[986] = cprnm_ItemType_DEDICATED_GENIE;
    var$2[987] = cprnm_ItemType_DEDICATED_DRAGON_LADY;
    var$2[988] = cprnm_ItemType_DEDICATED_SATYR;
    var$2[989] = cprnm_ItemType_DEDICATED_CENTAUR_OF_ATTENTION;
    var$2[990] = cprnm_ItemType_REEL_DEDICATED_MEDUSA;
    var$2[991] = cprnm_ItemType_REEL_DEDICATED_GENIE;
    var$2[992] = cprnm_ItemType_REEL_DEDICATED_DRAGON_LADY;
    var$2[993] = cprnm_ItemType_REEL_DEDICATED_SATYR;
    var$2[994] = cprnm_ItemType_REEL_DEDICATED_CENTAUR_OF_ATTENTION;
    var$2[995] = cprnm_ItemType_SHARD_REEL_DEDICATED_MEDUSA;
    var$2[996] = cprnm_ItemType_SHARD_REEL_DEDICATED_GENIE;
    var$2[997] = cprnm_ItemType_SHARD_REEL_DEDICATED_DRAGON_LADY;
    var$2[998] = cprnm_ItemType_SHARD_REEL_DEDICATED_SATYR;
    var$2[999] = cprnm_ItemType_SHARD_REEL_DEDICATED_CENTAUR_OF_ATTENTION;
    var$2[1000] = cprnm_ItemType_STONE_VERMILION_PRIESTESS;
    var$2[1001] = cprnm_ItemType_HERO_VERMILION_PRIESTESS;
    var$2[1002] = cprnm_ItemType_SKIN_ANGEL_DRAGON_FALLEN;
    var$2[1003] = cprnm_ItemType_SKIN_BURNT_ONE_VOODOO;
    var$2[1004] = cprnm_ItemType_SKIN_CURSED_STATUE_HAWAII;
    var$2[1005] = cprnm_ItemType_SKIN_DRAGON_SLAYER_UNICORN;
    var$2[1006] = cprnm_ItemType_SKIN_GROOVY_DRUID_DISCO;
    var$2[1007] = cprnm_ItemType_SKIN_KRAKEN_KING_MECHALORD;
    var$2[1008] = cprnm_ItemType_SKIN_DRUIDINATRIX_MASTERY;
    var$2[1009] = cprnm_ItemType_SKIN_ROLLER_WARRIOR_MASTERY;
    var$2[1010] = cprnm_ItemType_SKIN_PLANT_SOUL_MASTERY;
    var$2[1011] = cprnm_ItemType_SKIN_SPIDER_QUEEN_MASTERY;
    var$2[1012] = cprnm_ItemType_HERMITS_PILLS;
    var$2[1013] = cprnm_ItemType_SECRET_HAND_SCROLL;
    var$2[1014] = cprnm_ItemType_EXOTIC_FAN;
    var$2[1015] = cprnm_ItemType_FINS_OF_SEA_DRAGON;
    var$2[1016] = cprnm_ItemType_TIGER_UNDERWEAR;
    var$2[1017] = cprnm_ItemType_GOLD_RUSH;
    var$2[1018] = cprnm_ItemType_SAMURAI_SWORD;
    var$2[1019] = cprnm_ItemType_GOURD;
    var$2[1020] = cprnm_ItemType_MAGATAMA;
    var$2[1021] = cprnm_ItemType_TIGER_SALVE;
    var$2[1022] = cprnm_ItemType_WARRIORS_HELMET;
    var$2[1023] = cprnm_ItemType_FEATHER_OF_PHOENIX;
    var$2[1024] = cprnm_ItemType_REEL_HERMITS_PILLS;
    var$2[1025] = cprnm_ItemType_REEL_SECRET_HAND_SCROLL;
    var$2[1026] = cprnm_ItemType_REEL_EXOTIC_FAN;
    var$2[1027] = cprnm_ItemType_REEL_FINS_OF_SEA_DRAGON;
    var$2[1028] = cprnm_ItemType_REEL_TIGER_UNDERWEAR;
    var$2[1029] = cprnm_ItemType_REEL_GOLD_RUSH;
    var$2[1030] = cprnm_ItemType_REEL_SAMURAI_SWORD;
    var$2[1031] = cprnm_ItemType_REEL_GOURD;
    var$2[1032] = cprnm_ItemType_REEL_MAGATAMA;
    var$2[1033] = cprnm_ItemType_REEL_TIGER_SALVE;
    var$2[1034] = cprnm_ItemType_REEL_WARRIORS_HELMET;
    var$2[1035] = cprnm_ItemType_REEL_FEATHER_OF_PHOENIX;
    var$2[1036] = cprnm_ItemType_SHARD_REEL_HERMITS_PILLS;
    var$2[1037] = cprnm_ItemType_SHARD_REEL_SECRET_HAND_SCROLL;
    var$2[1038] = cprnm_ItemType_SHARD_REEL_EXOTIC_FAN;
    var$2[1039] = cprnm_ItemType_SHARD_REEL_FINS_OF_SEA_DRAGON;
    var$2[1040] = cprnm_ItemType_SHARD_REEL_TIGER_UNDERWEAR;
    var$2[1041] = cprnm_ItemType_SHARD_REEL_GOLD_RUSH;
    var$2[1042] = cprnm_ItemType_SHARD_REEL_SAMURAI_SWORD;
    var$2[1043] = cprnm_ItemType_SHARD_REEL_GOURD;
    var$2[1044] = cprnm_ItemType_SHARD_REEL_MAGATAMA;
    var$2[1045] = cprnm_ItemType_SHARD_REEL_TIGER_SALVE;
    var$2[1046] = cprnm_ItemType_SHARD_REEL_WARRIORS_HELMET;
    var$2[1047] = cprnm_ItemType_SHARD_REEL_FEATHER_OF_PHOENIX;
    var$2[1048] = cprnm_ItemType_SKIN_DRAGON_LADY_ANNIVERSARY_1000TH;
    var$2[1049] = cprnm_ItemType_KEY_TO_THE_KINGDOM;
    var$2[1050] = cprnm_ItemType_GREENISH_LANTERN;
    var$2[1051] = cprnm_ItemType_CHAIN_WALLET;
    var$2[1052] = cprnm_ItemType_SKIN_BROZERKER_VEGAS_DUDE;
    var$2[1053] = cprnm_ItemType_SKIN_UNICORGI_PIZZA_MANAGER_CORGI;
    var$2[1054] = cprnm_ItemType_SKIN_ROLLER_WARRIOR_DERBY_GIRL;
    var$2[1055] = cprnm_ItemType_SKIN_BARDBARIAN_EMO_FREDDIE;
    var$2[1056] = cprnm_ItemType_SKIN_NINJA_DWARF_FRIGGING_RABBIT;
    var$2[1057] = cprnm_ItemType_SKIN_DWARVEN_ARCHER_DWARVEN_HUNTRESS;
    var$2[1058] = cprnm_ItemType_SKIN_CRIMSON_WITCH_CRIMSON_PANDA;
    var$2[1059] = cprnm_ItemType_SKIN_PLANT_SOUL_HORSEY_SOUL;
    var$2[1060] = cprnm_ItemType_SKIN_COSMIC_ELF_VELVETEEN_FOX;
    var$2[1061] = cprnm_ItemType_SKIN_GENIE_RANDOM_TUSKER;
    var$2[1062] = cprnm_ItemType_STONE_PCH_ANUBIS_DRAGON;
    var$2[1063] = cprnm_ItemType_HERO_PCH_ANUBIS_DRAGON;
    var$2[1064] = cprnm_ItemType_STONE_ABYSS_DRAGON;
    var$2[1065] = cprnm_ItemType_HERO_ABYSS_DRAGON;
    var$2[1066] = cprnm_ItemType_STONE_UMLAUT_THE_FIRST;
    var$2[1067] = cprnm_ItemType_HERO_UMLAUT_THE_FIRST;
    var$2[1068] = cprnm_ItemType_SKIN_NPC_ANUBIS_DRAGON_MASTERY;
    var$2[1069] = cprnm_ItemType_SKIN_PCH_ANUBIS_DRAGON_MASTERY;
    var$2[1070] = cprnm_ItemType_SKIN_ABYSS_DRAGON_MASTERY;
    var$2[1071] = cprnm_ItemType_SKIN_VOID_WYVERN_TAPIR;
    var$2[1072] = cprnm_ItemType_SKIN_SPIKEY_DRAGON_ROTUNDITY;
    var$2[1073] = cprnm_ItemType_SKIN_SPIDER_QUEEN_TURTLE;
    var$2[1074] = cprnm_ItemType_SKIN_CURSED_STATUE_MEER;
    var$2[1075] = cprnm_ItemType_LEGENDARY_QUEST_SKIP;
    var$2[1076] = cprnm_ItemType_END_CENTURY_FLAME_RADIATOR;
    var$2[1077] = cprnm_ItemType_REEL_END_CENTURY_FLAME_RADIATOR;
    var$2[1078] = cprnm_ItemType_SHARD_REEL_THE_SPEAR_BRINGS_VICTORY;
    var$2[1079] = cprnm_ItemType_PIECE_OF_ACOLYTE_STATUE;
    var$2[1080] = cprnm_ItemType_REEL_PIECE_OF_ACOLYTE_STATUE;
    var$2[1081] = cprnm_ItemType_SHARD_REEL_DRAGON_SCALE_GROVE;
    var$2[1082] = cprnm_ItemType_THE_SPEAR_BRINGS_VICTORY;
    var$2[1083] = cprnm_ItemType_REEL_THE_SPEAR_BRINGS_VICTORY;
    var$2[1084] = cprnm_ItemType_SHARD_REEL_END_CENTURY_FLAME_RADIATOR;
    var$2[1085] = cprnm_ItemType_DROP_OF_MOONLIGHT;
    var$2[1086] = cprnm_ItemType_REEL_DROP_OF_MOONLIGHT;
    var$2[1087] = cprnm_ItemType_SHARD_REEL_DROP_OF_MOONLIGHT;
    var$2[1088] = cprnm_ItemType_DRAGON_SCALE_GROVE;
    var$2[1089] = cprnm_ItemType_REEL_DRAGON_SCALE_GROVE;
    var$2[1090] = cprnm_ItemType_SHARD_REEL_PIECE_OF_ACOLYTE_STATUE;
    var$2[1091] = cprnm_ItemType_EXPLOSIVE_CANNON;
    var$2[1092] = cprnm_ItemType_REEL_EXPLOSIVE_CANNON;
    var$2[1093] = cprnm_ItemType_SHARD_REEL_EXPLOSIVE_CANNON;
    var$2[1094] = cprnm_ItemType_CLOUDY_MONOCULAR_TELESCOPE;
    var$2[1095] = cprnm_ItemType_REEL_CLOUDY_MONOCULAR_TELESCOPE;
    var$2[1096] = cprnm_ItemType_SHARD_REEL_CLOUDY_MONOCULAR_TELESCOPE;
    var$2[1097] = cprnm_ItemType_BANANA_PEEL_MOUNTAIN;
    var$2[1098] = cprnm_ItemType_REEL_BANANA_PEEL_MOUNTAIN;
    var$2[1099] = cprnm_ItemType_SHARD_REEL_BANANA_PEEL_MOUNTAIN;
    var$2[1100] = cprnm_ItemType_DRACONIAN_DISH;
    var$2[1101] = cprnm_ItemType_REEL_DRACONIAN_DISH;
    var$2[1102] = cprnm_ItemType_SHARD_REEL_DRACONIAN_DISH;
    var$2[1103] = cprnm_ItemType_PORTABLE_NUTRITIOUS_DIET;
    var$2[1104] = cprnm_ItemType_REEL_PORTABLE_NUTRITIOUS_DIET;
    var$2[1105] = cprnm_ItemType_SHARD_REEL_PORTABLE_NUTRITIOUS_DIET;
    var$2[1106] = cprnm_ItemType_ANCIENT_COIN;
    var$2[1107] = cprnm_ItemType_REEL_ANCIENT_COIN;
    var$2[1108] = cprnm_ItemType_SHARD_REEL_ANCIENT_COIN;
    var$2[1109] = cprnm_ItemType_FAMILY_TREE_OF_UMLAUT;
    var$2[1110] = cprnm_ItemType_REEL_FAMILY_TREE_OF_UMLAUT;
    var$2[1111] = cprnm_ItemType_SHARD_REEL_FAMILY_TREE_OF_UMLAUT;
    var$2[1112] = cprnm_ItemType_DEDICATED_BROZERKER;
    var$2[1113] = cprnm_ItemType_REEL_DEDICATED_BROZERKER;
    var$2[1114] = cprnm_ItemType_SHARD_REEL_DEDICATED_BROZERKER;
    var$2[1115] = cprnm_ItemType_DEDICATED_COSMIC_ELF;
    var$2[1116] = cprnm_ItemType_REEL_DEDICATED_COSMIC_ELF;
    var$2[1117] = cprnm_ItemType_SHARD_REEL_DEDICATED_COSMIC_ELF;
    var$2[1118] = cprnm_ItemType_DEDICATED_ORC_MONK;
    var$2[1119] = cprnm_ItemType_REEL_DEDICATED_ORC_MONK;
    var$2[1120] = cprnm_ItemType_SHARD_REEL_DEDICATED_ORC_MONK;
    var$2[1121] = cprnm_ItemType_DEDICATED_ROLLER_WARRIOR;
    var$2[1122] = cprnm_ItemType_REEL_DEDICATED_ROLLER_WARRIOR;
    var$2[1123] = cprnm_ItemType_SHARD_REEL_DEDICATED_ROLLER_WARRIOR;
    var$2[1124] = cprnm_ItemType_DEDICATED_SHADOW_ASSASSIN;
    var$2[1125] = cprnm_ItemType_REEL_DEDICATED_SHADOW_ASSASSIN;
    var$2[1126] = cprnm_ItemType_SHARD_REEL_DEDICATED_SHADOW_ASSASSIN;
    var$2[1127] = cprnm_ItemType_SKIN_ANGELIC_HERALD_PIGEON;
    var$2[1128] = cprnm_ItemType_SKIN_BULWARK_ANGEL_SWAN;
    var$2[1129] = cprnm_ItemType_SKIN_GRAND_HUNTRESS_LEOPARD;
    var$2[1130] = cprnm_ItemType_SKIN_KARAOKE_KING_MONKEY;
    var$2[1131] = cprnm_ItemType_SKIN_LAST_DEFENDER_BUFFALO;
    var$2[1132] = cprnm_ItemType_SKIN_MISTRESS_MANICURE_BAT;
    var$2[1133] = cprnm_ItemType_SKIN_CURSED_STATUE_USERCONTEST;
    var$2[1134] = cprnm_ItemType_SKIN_ANGEL_DRAGON_USERCONTEST;
    var$2[1135] = cprnm_ItemType_SKIN_MOON_DRAKE_USERCONTEST;
    var$2[1136] = cprnm_ItemType_SKIN_ETERNAL_ENCHANTER_USERCONTEST;
    var$2[1137] = cprnm_ItemType_SKIN_TOMB_ANGEL_USERCONTEST;
    var$2[1138] = cprnm_ItemType_SKIN_DRAGON_LADY_3RD_ANNIVERSARY;
    var$2[1139] = cprnm_ItemType_SKIN_DARK_DRACUL_HORROR;
    var$2[1140] = cprnm_ItemType_SKIN_STEPLADDER_BROTHERS_HORROR;
    var$2[1141] = cprnm_ItemType_SKIN_COSMIC_ELF_HORROR;
    var$2[1142] = cprnm_ItemType_SKIN_MEDUSA_HORROR;
    var$2[1143] = cprnm_ItemType_SKIN_WEE_WITCH_HORROR;
    var$2[1144] = cprnm_ItemType_SKIN_UMLAUT_THE_FIRST_MASTERY;
    var$2[1145] = cprnm_ItemType_SOUL_OF_DRAGONS;
    var$2[1146] = cprnm_ItemType_SKIN_ANCIENT_DWARF_MECHA;
    var$2[1147] = cprnm_ItemType_SKIN_BLACK_WING_MECHA;
    var$2[1148] = cprnm_ItemType_SKIN_DRAGZILLA_MECHA;
    var$2[1149] = cprnm_ItemType_SKIN_DUNGEON_MAN_MECHA;
    var$2[1150] = cprnm_ItemType_SKIN_ORC_MONK_MECHA;
    var$2[1151] = cprnm_ItemType_SKIN_UNSTABLE_UNDERSTUDY_3RD_ANNIVERSARY;
    var$2[1152] = cprnm_ItemType_SKIN_ELECTROYETI_3RD_ANNIVERSARY;
    var$2[1153] = cprnm_ItemType_SKIN_BROZERKER_MASTERY;
    var$2[1154] = cprnm_ItemType_SKIN_UNICORGI_MASTERY;
    var$2[1155] = cprnm_ItemType_SKIN_BARDBARIAN_MASTERY;
    var$2[1156] = cprnm_ItemType_SKIN_SADISTIC_DANCER_MECHA;
    var$2[1157] = cprnm_ItemType_SKIN_SHADOW_OF_SVEN_MECHA;
    var$2[1158] = cprnm_ItemType_SKIN_MINOTAUR_MASTERY;
    var$2[1159] = cprnm_ItemType_SKIN_UNRIPE_MYTHOLOGY_WINTER;
    var$2[1160] = cprnm_ItemType_SKIN_SADISTIC_DANCER_WINTER;
    var$2[1161] = cprnm_ItemType_SKIN_DRAGON_SLAYER_WINTER;
    var$2[1162] = cprnm_ItemType_SKIN_ABYSS_DRAGON_WINTER;
    var$2[1163] = cprnm_ItemType_SKIN_TOMB_ANGEL_WINTER;
    var$2[1164] = cprnm_ItemType_DEDICATED_DEEP_DRAGON;
    var$2[1165] = cprnm_ItemType_DEDICATED_DEMON_TOTEM;
    var$2[1166] = cprnm_ItemType_DEDICATED_SNAP_DRAGON;
    var$2[1167] = cprnm_ItemType_DEDICATED_NINJA_DWARF;
    var$2[1168] = cprnm_ItemType_DEDICATED_UNSTABLE_UNDERSTUDY;
    var$2[1169] = cprnm_ItemType_REEL_DEDICATED_DEEP_DRAGON;
    var$2[1170] = cprnm_ItemType_REEL_DEDICATED_DEMON_TOTEM;
    var$2[1171] = cprnm_ItemType_REEL_DEDICATED_SNAP_DRAGON;
    var$2[1172] = cprnm_ItemType_REEL_DEDICATED_NINJA_DWARF;
    var$2[1173] = cprnm_ItemType_REEL_DEDICATED_UNSTABLE_UNDERSTUDY;
    var$2[1174] = cprnm_ItemType_SHARD_REEL_DEDICATED_DEEP_DRAGON;
    var$2[1175] = cprnm_ItemType_SHARD_REEL_DEDICATED_DEMON_TOTEM;
    var$2[1176] = cprnm_ItemType_SHARD_REEL_DEDICATED_SNAP_DRAGON;
    var$2[1177] = cprnm_ItemType_SHARD_REEL_DEDICATED_NINJA_DWARF;
    var$2[1178] = cprnm_ItemType_SHARD_REEL_DEDICATED_UNSTABLE_UNDERSTUDY;
    var$2[1179] = cprnm_ItemType_GEAR_TICKET_CYAN;
    var$2[1180] = cprnm_ItemType_GEAR_TICKET_ORANGE;
    var$2[1181] = cprnm_ItemType_GEAR_TICKET_PURPLE;
    var$2[1182] = cprnm_ItemType_SKIN_CRIMSON_WITCH_MASTERY;
    var$2[1183] = cprnm_ItemType_SKIN_SNAPPER_BONE_LIZARD_BONE;
    var$2[1184] = cprnm_ItemType_SKIN_WHITE_TIGRESS_CAT_WOMAN;
    var$2[1185] = cprnm_ItemType_SKIN_VERMILION_PRIESTESS_CLERIC_OF_FALCONERS;
    var$2[1186] = cprnm_ItemType_SKIN_RAGING_REVENANT_DOCTORING_REVENANT;
    var$2[1187] = cprnm_ItemType_STONE_DARK_HERO;
    var$2[1188] = cprnm_ItemType_HERO_DARK_HERO;
    var$2[1189] = cprnm_ItemType_STONE_CLAW_MAN;
    var$2[1190] = cprnm_ItemType_HERO_CLAW_MAN;
    var$2[1191] = cprnm_ItemType_SKIN_SAVAGE_CUTIE_MASTERY;
    var$2[1192] = cprnm_ItemType_SKIN_SPECTRAL_DRAGON_REDDRAGON;
    var$2[1193] = cprnm_ItemType_SKIN_SUN_SEEKER_SNOW;
    var$2[1194] = cprnm_ItemType_SKIN_STOWAWAY_BUISNESS;
    var$2[1195] = cprnm_ItemType_SKIN_WEREDRAGON_FLORIST;
    var$2[1196] = cprnm_ItemType_MAGICAL_HATRACK;
    var$2[1197] = cprnm_ItemType_SHINING_HOLY_TREE;
    var$2[1198] = cprnm_ItemType_HORNS_OF_WHITE_DEER;
    var$2[1199] = cprnm_ItemType_LORD_OF_RIVER;
    var$2[1200] = cprnm_ItemType_GOLD_AX_SILVER_AX;
    var$2[1201] = cprnm_ItemType_POISONED_SILVER_ACCESSORY_OF_SCORPION;
    var$2[1202] = cprnm_ItemType_HANDY_RASP;
    var$2[1203] = cprnm_ItemType_BLACKBERRY_JAM;
    var$2[1204] = cprnm_ItemType_CRYSTAL_MUSHROOM;
    var$2[1205] = cprnm_ItemType_REMOTE_COMMUNICATION_FLOWER;
    var$2[1206] = cprnm_ItemType_SHINING_LIGHT_OF_FIREFLY;
    var$2[1207] = cprnm_ItemType_SHRIMPISH_CREATURE;
    var$2[1208] = cprnm_ItemType_REEL_MAGICAL_HATRACK;
    var$2[1209] = cprnm_ItemType_REEL_SHINING_HOLY_TREE;
    var$2[1210] = cprnm_ItemType_REEL_HORNS_OF_WHITE_DEER;
    var$2[1211] = cprnm_ItemType_REEL_LORD_OF_RIVER;
    var$2[1212] = cprnm_ItemType_REEL_GOLD_AX_SILVER_AX;
    var$2[1213] = cprnm_ItemType_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION;
    var$2[1214] = cprnm_ItemType_REEL_HANDY_RASP;
    var$2[1215] = cprnm_ItemType_REEL_BLACKBERRY_JAM;
    var$2[1216] = cprnm_ItemType_REEL_CRYSTAL_MUSHROOM;
    var$2[1217] = cprnm_ItemType_REEL_REMOTE_COMMUNICATION_FLOWER;
    var$2[1218] = cprnm_ItemType_REEL_SHINING_LIGHT_OF_FIREFLY;
    var$2[1219] = cprnm_ItemType_REEL_SHRIMPISH_CREATURE;
    var$2[1220] = cprnm_ItemType_SHARD_REEL_MAGICAL_HATRACK;
    var$2[1221] = cprnm_ItemType_SHARD_REEL_SHINING_HOLY_TREE;
    var$2[1222] = cprnm_ItemType_SHARD_REEL_HORNS_OF_WHITE_DEER;
    var$2[1223] = cprnm_ItemType_SHARD_REEL_LORD_OF_RIVER;
    var$2[1224] = cprnm_ItemType_SHARD_REEL_GOLD_AX_SILVER_AX;
    var$2[1225] = cprnm_ItemType_SHARD_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION;
    var$2[1226] = cprnm_ItemType_SHARD_REEL_HANDY_RASP;
    var$2[1227] = cprnm_ItemType_SHARD_REEL_BLACKBERRY_JAM;
    var$2[1228] = cprnm_ItemType_SHARD_REEL_CRYSTAL_MUSHROOM;
    var$2[1229] = cprnm_ItemType_SHARD_REEL_REMOTE_COMMUNICATION_FLOWER;
    var$2[1230] = cprnm_ItemType_SHARD_REEL_SHINING_LIGHT_OF_FIREFLY;
    var$2[1231] = cprnm_ItemType_SHARD_REEL_SHRIMPISH_CREATURE;
    cprnm_ItemType_$VALUES = var$1;
    cprnm_ItemType_values0 = cprnm_ItemType_values();
},
cprnm_ItemType__init_0 = (var$0, var$1, var$2) => {
    cprnm_ItemType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_ItemType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_ItemType();
    cprnm_ItemType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_ItemType_values = () => {
    cprnm_ItemType_$callClinit();
    return cprnm_ItemType_$VALUES.$clone0();
},
cprnm_HowToPlayDeckType = $rt_classWithoutFields(jl_Enum),
cprnm_HowToPlayDeckType_$VALUES = null,
cprnm_HowToPlayDeckType_BOSS_BATTLE = null,
cprnm_HowToPlayDeckType_BOSS_BATTLE_LAYER = null,
cprnm_HowToPlayDeckType_BOSS_BATTLE_REWARD = null,
cprnm_HowToPlayDeckType_BOSS_PIT = null,
cprnm_HowToPlayDeckType_CHAT_RULES = null,
cprnm_HowToPlayDeckType_COLISEUM = null,
cprnm_HowToPlayDeckType_CONTESTS = null,
cprnm_HowToPlayDeckType_CRYPT = null,
cprnm_HowToPlayDeckType_DEFAULT = null,
cprnm_HowToPlayDeckType_ENCHANTING = null,
cprnm_HowToPlayDeckType_EXPEDITION = null,
cprnm_HowToPlayDeckType_FIGHT_PIT = null,
cprnm_HowToPlayDeckType_GOLD_CHEST = null,
cprnm_HowToPlayDeckType_GUILD = null,
cprnm_HowToPlayDeckType_HERO_STATS = null,
cprnm_HowToPlayDeckType_IAP_PURCHASING = null,
cprnm_HowToPlayDeckType_LEGENDARY = null,
cprnm_HowToPlayDeckType_MONTHLY_DEAL = null,
cprnm_HowToPlayDeckType_ORANGE_CHEST = null,
cprnm_HowToPlayDeckType_PURPLE_CHEST = null,
cprnm_HowToPlayDeckType_RUNES = null,
cprnm_HowToPlayDeckType_RUNE_SHRINE = null,
cprnm_HowToPlayDeckType_SILVER_CHEST = null,
cprnm_HowToPlayDeckType_SOUL_CHEST = null,
cprnm_HowToPlayDeckType_TITAN_TEMPLE_OTHER = null,
cprnm_HowToPlayDeckType_TITAN_TEMPLE_OWNER = null,
cprnm_HowToPlayDeckType_VIP = null,
cprnm_HowToPlayDeckType_WAR = null,
cprnm_HowToPlayDeckType_values0 = null,
cprnm_HowToPlayDeckType_$callClinit = () => {
    cprnm_HowToPlayDeckType_$callClinit = $rt_eraseClinit(cprnm_HowToPlayDeckType);
    cprnm_HowToPlayDeckType__clinit_();
},
cprnm_HowToPlayDeckType__clinit_ = () => {
    let var$1, var$2;
    cprnm_HowToPlayDeckType_DEFAULT = cprnm_HowToPlayDeckType__init_($rt_s(12), 0);
    cprnm_HowToPlayDeckType_VIP = cprnm_HowToPlayDeckType__init_($rt_s(1589), 1);
    cprnm_HowToPlayDeckType_EXPEDITION = cprnm_HowToPlayDeckType__init_($rt_s(182), 2);
    cprnm_HowToPlayDeckType_MONTHLY_DEAL = cprnm_HowToPlayDeckType__init_($rt_s(1590), 3);
    cprnm_HowToPlayDeckType_CHAT_RULES = cprnm_HowToPlayDeckType__init_($rt_s(1591), 4);
    cprnm_HowToPlayDeckType_CRYPT = cprnm_HowToPlayDeckType__init_($rt_s(27), 5);
    cprnm_HowToPlayDeckType_ENCHANTING = cprnm_HowToPlayDeckType__init_($rt_s(26), 6);
    cprnm_HowToPlayDeckType_TITAN_TEMPLE_OWNER = cprnm_HowToPlayDeckType__init_($rt_s(1592), 7);
    cprnm_HowToPlayDeckType_TITAN_TEMPLE_OTHER = cprnm_HowToPlayDeckType__init_($rt_s(1593), 8);
    cprnm_HowToPlayDeckType_HERO_STATS = cprnm_HowToPlayDeckType__init_($rt_s(1594), 9);
    cprnm_HowToPlayDeckType_BOSS_PIT = cprnm_HowToPlayDeckType__init_($rt_s(30), 10);
    cprnm_HowToPlayDeckType_GUILD = cprnm_HowToPlayDeckType__init_($rt_s(1595), 11);
    cprnm_HowToPlayDeckType_WAR = cprnm_HowToPlayDeckType__init_($rt_s(1596), 12);
    cprnm_HowToPlayDeckType_LEGENDARY = cprnm_HowToPlayDeckType__init_($rt_s(1597), 13);
    cprnm_HowToPlayDeckType_CONTESTS = cprnm_HowToPlayDeckType__init_($rt_s(1598), 14);
    cprnm_HowToPlayDeckType_RUNES = cprnm_HowToPlayDeckType__init_($rt_s(53), 15);
    cprnm_HowToPlayDeckType_SILVER_CHEST = cprnm_HowToPlayDeckType__init_($rt_s(208), 16);
    cprnm_HowToPlayDeckType_IAP_PURCHASING = cprnm_HowToPlayDeckType__init_($rt_s(1599), 17);
    cprnm_HowToPlayDeckType_RUNE_SHRINE = cprnm_HowToPlayDeckType__init_($rt_s(54), 18);
    cprnm_HowToPlayDeckType_GOLD_CHEST = cprnm_HowToPlayDeckType__init_($rt_s(209), 19);
    cprnm_HowToPlayDeckType_SOUL_CHEST = cprnm_HowToPlayDeckType__init_($rt_s(210), 20);
    cprnm_HowToPlayDeckType_COLISEUM = cprnm_HowToPlayDeckType__init_($rt_s(188), 21);
    cprnm_HowToPlayDeckType_FIGHT_PIT = cprnm_HowToPlayDeckType__init_($rt_s(24), 22);
    cprnm_HowToPlayDeckType_PURPLE_CHEST = cprnm_HowToPlayDeckType__init_($rt_s(223), 23);
    cprnm_HowToPlayDeckType_ORANGE_CHEST = cprnm_HowToPlayDeckType__init_($rt_s(224), 24);
    cprnm_HowToPlayDeckType_BOSS_BATTLE = cprnm_HowToPlayDeckType__init_($rt_s(193), 25);
    cprnm_HowToPlayDeckType_BOSS_BATTLE_REWARD = cprnm_HowToPlayDeckType__init_($rt_s(1600), 26);
    cprnm_HowToPlayDeckType_BOSS_BATTLE_LAYER = cprnm_HowToPlayDeckType__init_($rt_s(1601), 27);
    var$1 = $rt_createArray(cprnm_HowToPlayDeckType, 28);
    var$2 = var$1.data;
    var$2[0] = cprnm_HowToPlayDeckType_DEFAULT;
    var$2[1] = cprnm_HowToPlayDeckType_VIP;
    var$2[2] = cprnm_HowToPlayDeckType_EXPEDITION;
    var$2[3] = cprnm_HowToPlayDeckType_MONTHLY_DEAL;
    var$2[4] = cprnm_HowToPlayDeckType_CHAT_RULES;
    var$2[5] = cprnm_HowToPlayDeckType_CRYPT;
    var$2[6] = cprnm_HowToPlayDeckType_ENCHANTING;
    var$2[7] = cprnm_HowToPlayDeckType_TITAN_TEMPLE_OWNER;
    var$2[8] = cprnm_HowToPlayDeckType_TITAN_TEMPLE_OTHER;
    var$2[9] = cprnm_HowToPlayDeckType_HERO_STATS;
    var$2[10] = cprnm_HowToPlayDeckType_BOSS_PIT;
    var$2[11] = cprnm_HowToPlayDeckType_GUILD;
    var$2[12] = cprnm_HowToPlayDeckType_WAR;
    var$2[13] = cprnm_HowToPlayDeckType_LEGENDARY;
    var$2[14] = cprnm_HowToPlayDeckType_CONTESTS;
    var$2[15] = cprnm_HowToPlayDeckType_RUNES;
    var$2[16] = cprnm_HowToPlayDeckType_SILVER_CHEST;
    var$2[17] = cprnm_HowToPlayDeckType_IAP_PURCHASING;
    var$2[18] = cprnm_HowToPlayDeckType_RUNE_SHRINE;
    var$2[19] = cprnm_HowToPlayDeckType_GOLD_CHEST;
    var$2[20] = cprnm_HowToPlayDeckType_SOUL_CHEST;
    var$2[21] = cprnm_HowToPlayDeckType_COLISEUM;
    var$2[22] = cprnm_HowToPlayDeckType_FIGHT_PIT;
    var$2[23] = cprnm_HowToPlayDeckType_PURPLE_CHEST;
    var$2[24] = cprnm_HowToPlayDeckType_ORANGE_CHEST;
    var$2[25] = cprnm_HowToPlayDeckType_BOSS_BATTLE;
    var$2[26] = cprnm_HowToPlayDeckType_BOSS_BATTLE_REWARD;
    var$2[27] = cprnm_HowToPlayDeckType_BOSS_BATTLE_LAYER;
    cprnm_HowToPlayDeckType_$VALUES = var$1;
    cprnm_HowToPlayDeckType_values0 = cprnm_HowToPlayDeckType_values();
},
cprnm_HowToPlayDeckType__init_0 = (var$0, var$1, var$2) => {
    cprnm_HowToPlayDeckType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_HowToPlayDeckType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_HowToPlayDeckType();
    cprnm_HowToPlayDeckType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_HowToPlayDeckType_values = () => {
    cprnm_HowToPlayDeckType_$callClinit();
    return cprnm_HowToPlayDeckType_$VALUES.$clone0();
},
cprnm_CooldownType = $rt_classWithoutFields(jl_Enum),
cprnm_CooldownType_$VALUES = null,
cprnm_CooldownType_CHALLENGES_DRAGON_ATTACK = null,
cprnm_CooldownType_CHALLENGES_MAGIC_ATTACK = null;
let cprnm_CooldownType_CHALLENGES_PHYSICAL_ATTACK = null,
cprnm_CooldownType_COLISEUM_ATTACK = null,
cprnm_CooldownType_DEFAULT = null,
cprnm_CooldownType_FIGHT_PIT_ATTACK = null,
cprnm_CooldownType_THE_CAVES_ATTACK = null,
cprnm_CooldownType_THE_SUMMIT_ATTACK = null,
cprnm_CooldownType_WAR_OPT_OUT = null,
cprnm_CooldownType_values0 = null,
cprnm_CooldownType_$callClinit = () => {
    cprnm_CooldownType_$callClinit = $rt_eraseClinit(cprnm_CooldownType);
    cprnm_CooldownType__clinit_();
},
cprnm_CooldownType__clinit_ = () => {
    let var$1, var$2;
    cprnm_CooldownType_DEFAULT = cprnm_CooldownType__init_($rt_s(12), 0);
    cprnm_CooldownType_FIGHT_PIT_ATTACK = cprnm_CooldownType__init_($rt_s(1602), 1);
    cprnm_CooldownType_THE_SUMMIT_ATTACK = cprnm_CooldownType__init_($rt_s(1603), 2);
    cprnm_CooldownType_THE_CAVES_ATTACK = cprnm_CooldownType__init_($rt_s(1604), 3);
    cprnm_CooldownType_CHALLENGES_MAGIC_ATTACK = cprnm_CooldownType__init_($rt_s(1605), 4);
    cprnm_CooldownType_CHALLENGES_PHYSICAL_ATTACK = cprnm_CooldownType__init_($rt_s(1606), 5);
    cprnm_CooldownType_CHALLENGES_DRAGON_ATTACK = cprnm_CooldownType__init_($rt_s(1607), 6);
    cprnm_CooldownType_COLISEUM_ATTACK = cprnm_CooldownType__init_($rt_s(1608), 7);
    cprnm_CooldownType_WAR_OPT_OUT = cprnm_CooldownType__init_($rt_s(1609), 8);
    var$1 = $rt_createArray(cprnm_CooldownType, 9);
    var$2 = var$1.data;
    var$2[0] = cprnm_CooldownType_DEFAULT;
    var$2[1] = cprnm_CooldownType_FIGHT_PIT_ATTACK;
    var$2[2] = cprnm_CooldownType_THE_SUMMIT_ATTACK;
    var$2[3] = cprnm_CooldownType_THE_CAVES_ATTACK;
    var$2[4] = cprnm_CooldownType_CHALLENGES_MAGIC_ATTACK;
    var$2[5] = cprnm_CooldownType_CHALLENGES_PHYSICAL_ATTACK;
    var$2[6] = cprnm_CooldownType_CHALLENGES_DRAGON_ATTACK;
    var$2[7] = cprnm_CooldownType_COLISEUM_ATTACK;
    var$2[8] = cprnm_CooldownType_WAR_OPT_OUT;
    cprnm_CooldownType_$VALUES = var$1;
    cprnm_CooldownType_values0 = cprnm_CooldownType_values();
},
cprnm_CooldownType__init_0 = (var$0, var$1, var$2) => {
    cprnm_CooldownType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_CooldownType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_CooldownType();
    cprnm_CooldownType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_CooldownType_values = () => {
    cprnm_CooldownType_$callClinit();
    return cprnm_CooldownType_$VALUES.$clone0();
},
cbgb_b = $rt_classWithoutFields(0),
cprnm_HeroLineupType = $rt_classWithoutFields(jl_Enum),
cprnm_HeroLineupType_$VALUES = null,
cprnm_HeroLineupType_BOSS_BATTLE = null,
cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_1 = null,
cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_2 = null,
cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_3 = null,
cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_1 = null,
cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_2 = null,
cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_3 = null,
cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_1 = null,
cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_2 = null,
cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_3 = null,
cprnm_HeroLineupType_CHALLENGES_MAGIC_IMMUNE = null,
cprnm_HeroLineupType_CHALLENGES_ONLY_DRAGONS = null,
cprnm_HeroLineupType_CHALLENGES_PHYSICAL_IMMUNE = null,
cprnm_HeroLineupType_COLISEUM_ATTACK_1 = null,
cprnm_HeroLineupType_COLISEUM_ATTACK_2 = null,
cprnm_HeroLineupType_COLISEUM_ATTACK_3 = null,
cprnm_HeroLineupType_COLISEUM_DEFENSE_1 = null,
cprnm_HeroLineupType_COLISEUM_DEFENSE_2 = null,
cprnm_HeroLineupType_COLISEUM_DEFENSE_3 = null,
cprnm_HeroLineupType_CRYPT_RAID = null,
cprnm_HeroLineupType_DEFAULT = null,
cprnm_HeroLineupType_ELITE_CAMPAIGN = null,
cprnm_HeroLineupType_EXPEDITION = null,
cprnm_HeroLineupType_EXPERT_CAMPAIGN = null,
cprnm_HeroLineupType_FIGHT_PIT_ATTACK = null,
cprnm_HeroLineupType_FIGHT_PIT_DEFENSE = null,
cprnm_HeroLineupType_GUILD_WAR_ATTACK = null,
cprnm_HeroLineupType_GUILD_WAR_DEFENSE_1 = null,
cprnm_HeroLineupType_GUILD_WAR_DEFENSE_2 = null,
cprnm_HeroLineupType_GUILD_WAR_DEFENSE_3 = null,
cprnm_HeroLineupType_NORMAL_CAMPAIGN = null,
cprnm_HeroLineupType_THE_MOUNTAIN_CAVES = null,
cprnm_HeroLineupType_THE_MOUNTAIN_SUMMIT = null,
cprnm_HeroLineupType_TITAN_TEMPLE = null;
let cprnm_HeroLineupType_values0 = null,
cprnm_HeroLineupType_$callClinit = () => {
    cprnm_HeroLineupType_$callClinit = $rt_eraseClinit(cprnm_HeroLineupType);
    cprnm_HeroLineupType__clinit_();
},
cprnm_HeroLineupType__clinit_ = () => {
    let var$1, var$2;
    cprnm_HeroLineupType_DEFAULT = cprnm_HeroLineupType__init_($rt_s(12), 0);
    cprnm_HeroLineupType_NORMAL_CAMPAIGN = cprnm_HeroLineupType__init_($rt_s(1610), 1);
    cprnm_HeroLineupType_ELITE_CAMPAIGN = cprnm_HeroLineupType__init_($rt_s(181), 2);
    cprnm_HeroLineupType_FIGHT_PIT_DEFENSE = cprnm_HeroLineupType__init_($rt_s(1611), 3);
    cprnm_HeroLineupType_FIGHT_PIT_ATTACK = cprnm_HeroLineupType__init_($rt_s(1602), 4);
    cprnm_HeroLineupType_THE_MOUNTAIN_SUMMIT = cprnm_HeroLineupType__init_($rt_s(183), 5);
    cprnm_HeroLineupType_THE_MOUNTAIN_CAVES = cprnm_HeroLineupType__init_($rt_s(184), 6);
    cprnm_HeroLineupType_CHALLENGES_MAGIC_IMMUNE = cprnm_HeroLineupType__init_($rt_s(185), 7);
    cprnm_HeroLineupType_CHALLENGES_PHYSICAL_IMMUNE = cprnm_HeroLineupType__init_($rt_s(186), 8);
    cprnm_HeroLineupType_CHALLENGES_ONLY_DRAGONS = cprnm_HeroLineupType__init_($rt_s(187), 9);
    cprnm_HeroLineupType_EXPEDITION = cprnm_HeroLineupType__init_($rt_s(182), 10);
    cprnm_HeroLineupType_CRYPT_RAID = cprnm_HeroLineupType__init_($rt_s(1612), 11);
    cprnm_HeroLineupType_COLISEUM_DEFENSE_1 = cprnm_HeroLineupType__init_($rt_s(1613), 12);
    cprnm_HeroLineupType_COLISEUM_DEFENSE_2 = cprnm_HeroLineupType__init_($rt_s(1614), 13);
    cprnm_HeroLineupType_COLISEUM_DEFENSE_3 = cprnm_HeroLineupType__init_($rt_s(1615), 14);
    cprnm_HeroLineupType_COLISEUM_ATTACK_1 = cprnm_HeroLineupType__init_($rt_s(1616), 15);
    cprnm_HeroLineupType_COLISEUM_ATTACK_2 = cprnm_HeroLineupType__init_($rt_s(1617), 16);
    cprnm_HeroLineupType_COLISEUM_ATTACK_3 = cprnm_HeroLineupType__init_($rt_s(1618), 17);
    cprnm_HeroLineupType_TITAN_TEMPLE = cprnm_HeroLineupType__init_($rt_s(189), 18);
    cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_1 = cprnm_HeroLineupType__init_($rt_s(1619), 19);
    cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_2 = cprnm_HeroLineupType__init_($rt_s(1620), 20);
    cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_3 = cprnm_HeroLineupType__init_($rt_s(1621), 21);
    cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_1 = cprnm_HeroLineupType__init_($rt_s(1622), 22);
    cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_2 = cprnm_HeroLineupType__init_($rt_s(1623), 23);
    cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_3 = cprnm_HeroLineupType__init_($rt_s(1624), 24);
    cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_1 = cprnm_HeroLineupType__init_($rt_s(1625), 25);
    cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_2 = cprnm_HeroLineupType__init_($rt_s(1626), 26);
    cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_3 = cprnm_HeroLineupType__init_($rt_s(1627), 27);
    cprnm_HeroLineupType_GUILD_WAR_ATTACK = cprnm_HeroLineupType__init_($rt_s(1628), 28);
    cprnm_HeroLineupType_GUILD_WAR_DEFENSE_1 = cprnm_HeroLineupType__init_($rt_s(1629), 29);
    cprnm_HeroLineupType_GUILD_WAR_DEFENSE_2 = cprnm_HeroLineupType__init_($rt_s(1630), 30);
    cprnm_HeroLineupType_GUILD_WAR_DEFENSE_3 = cprnm_HeroLineupType__init_($rt_s(1631), 31);
    cprnm_HeroLineupType_BOSS_BATTLE = cprnm_HeroLineupType__init_($rt_s(193), 32);
    cprnm_HeroLineupType_EXPERT_CAMPAIGN = cprnm_HeroLineupType__init_($rt_s(194), 33);
    var$1 = $rt_createArray(cprnm_HeroLineupType, 34);
    var$2 = var$1.data;
    var$2[0] = cprnm_HeroLineupType_DEFAULT;
    var$2[1] = cprnm_HeroLineupType_NORMAL_CAMPAIGN;
    var$2[2] = cprnm_HeroLineupType_ELITE_CAMPAIGN;
    var$2[3] = cprnm_HeroLineupType_FIGHT_PIT_DEFENSE;
    var$2[4] = cprnm_HeroLineupType_FIGHT_PIT_ATTACK;
    var$2[5] = cprnm_HeroLineupType_THE_MOUNTAIN_SUMMIT;
    var$2[6] = cprnm_HeroLineupType_THE_MOUNTAIN_CAVES;
    var$2[7] = cprnm_HeroLineupType_CHALLENGES_MAGIC_IMMUNE;
    var$2[8] = cprnm_HeroLineupType_CHALLENGES_PHYSICAL_IMMUNE;
    var$2[9] = cprnm_HeroLineupType_CHALLENGES_ONLY_DRAGONS;
    var$2[10] = cprnm_HeroLineupType_EXPEDITION;
    var$2[11] = cprnm_HeroLineupType_CRYPT_RAID;
    var$2[12] = cprnm_HeroLineupType_COLISEUM_DEFENSE_1;
    var$2[13] = cprnm_HeroLineupType_COLISEUM_DEFENSE_2;
    var$2[14] = cprnm_HeroLineupType_COLISEUM_DEFENSE_3;
    var$2[15] = cprnm_HeroLineupType_COLISEUM_ATTACK_1;
    var$2[16] = cprnm_HeroLineupType_COLISEUM_ATTACK_2;
    var$2[17] = cprnm_HeroLineupType_COLISEUM_ATTACK_3;
    var$2[18] = cprnm_HeroLineupType_TITAN_TEMPLE;
    var$2[19] = cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_1;
    var$2[20] = cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_2;
    var$2[21] = cprnm_HeroLineupType_BOSS_PIT_EVIL_WIZARD_3;
    var$2[22] = cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_1;
    var$2[23] = cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_2;
    var$2[24] = cprnm_HeroLineupType_BOSS_PIT_GIANT_PLANT_3;
    var$2[25] = cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_1;
    var$2[26] = cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_2;
    var$2[27] = cprnm_HeroLineupType_BOSS_PIT_GOLDEN_COLOSSUS_3;
    var$2[28] = cprnm_HeroLineupType_GUILD_WAR_ATTACK;
    var$2[29] = cprnm_HeroLineupType_GUILD_WAR_DEFENSE_1;
    var$2[30] = cprnm_HeroLineupType_GUILD_WAR_DEFENSE_2;
    var$2[31] = cprnm_HeroLineupType_GUILD_WAR_DEFENSE_3;
    var$2[32] = cprnm_HeroLineupType_BOSS_BATTLE;
    var$2[33] = cprnm_HeroLineupType_EXPERT_CAMPAIGN;
    cprnm_HeroLineupType_$VALUES = var$1;
    cprnm_HeroLineupType_values0 = cprnm_HeroLineupType_values();
},
cprnm_HeroLineupType__init_0 = (var$0, var$1, var$2) => {
    cprnm_HeroLineupType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_HeroLineupType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_HeroLineupType();
    cprnm_HeroLineupType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_HeroLineupType_values = () => {
    cprnm_HeroLineupType_$callClinit();
    return cprnm_HeroLineupType_$VALUES.$clone0();
},
otcir_MethodInfo = $rt_classWithoutFields(),
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
let jl_Class__init_0 = ($this, $platformClass) => {
    let var$2;
    jl_Object__init_($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
},
jl_Class__init_ = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
},
jl_Class_getClass = $cls => {
    let $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
},
jl_Class_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_isInterface($this) ? $rt_s(1632) : !jl_Class_isPrimitive($this) ? $rt_s(1633) : $rt_s(91);
    var$2 = jl_Class_getName($this);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Class_getPlatformClass = $this => {
    return $this.$platformClass;
},
jl_Class_getName = $this => {
    if ($this.$name === null)
        $this.$name = otp_Platform_getName($this.$platformClass);
    return $this.$name;
},
jl_Class_isPrimitive = $this => {
    return otp_Platform_isPrimitive($this.$platformClass);
},
jl_Class_isInterface = $this => {
    return !($this.$platformClass.$meta.flags & 2) ? 0 : 1;
},
jl_Class_desiredAssertionStatus = $this => {
    return 1;
},
jl_Class_getSuperclass = $this => {
    return jl_Class_getClass($this.$platformClass.$meta.superclass);
},
cprt_ColorAccessor = $rt_classWithoutFields(),
cprt_ColorAccessor_$assertionsDisabled = 0,
cprt_ColorAccessor_$callClinit = () => {
    cprt_ColorAccessor_$callClinit = $rt_eraseClinit(cprt_ColorAccessor);
    cprt_ColorAccessor__clinit_();
},
cprt_ColorAccessor__clinit_ = () => {
    cprt_ColorAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_ColorAccessor)) ? 0 : 1;
},
cprt_ColorAccessor__init_ = var$0 => {
    cprt_ColorAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_ColorAccessor__init_0 = () => {
    let var_0 = new cprt_ColorAccessor();
    cprt_ColorAccessor__init_(var_0);
    return var_0;
},
jl_Float = $rt_classWithoutFields(jl_Number),
jl_Float_TYPE = null,
jl_Float_$callClinit = () => {
    jl_Float_$callClinit = $rt_eraseClinit(jl_Float);
    jl_Float__clinit_();
},
jl_Float_floatToIntBits = $value => {
    jl_Float_$callClinit();
    if (isNaN($value) ? 1 : 0)
        return 2143289344;
    return $rt_floatToRawIntBits($value);
},
jl_Float__clinit_ = () => {
    jl_Float_TYPE = $rt_cls($rt_floatcls);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill0 = ($a, $val) => {
    ju_Arrays_fill($a, 0, $a.data.length, $val);
},
ju_Arrays_binarySearch = ($a, $key) => {
    return ju_Arrays_binarySearch0($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch0 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, var$6, $i, $e;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        if ($e == $key)
            break;
        if ($key >= $e)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
};
function cprnm_TitanTempleSummaries() {
    let a = this; cpaa_i.call(a);
    a.$invitedTemples = null;
    a.$yourTemple = null;
}
let cprnm_TitanTempleSummaries__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1634));
    var$0.$yourTemple = cprnm_TitanTempleSummary__init_0();
    var$0.$invitedTemples = ju_ArrayList__init_(0);
},
cprnm_TitanTempleSummaries__init_0 = () => {
    let var_0 = new cprnm_TitanTempleSummaries();
    cprnm_TitanTempleSummaries__init_(var_0);
    return var_0;
},
cprn_EmptyNetworkProvider$1 = $rt_classWithoutFields(),
cprn_EmptyNetworkProvider$1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
cprn_EmptyNetworkProvider$1__init_0 = () => {
    let var_0 = new cprn_EmptyNetworkProvider$1();
    cprn_EmptyNetworkProvider$1__init_(var_0);
    return var_0;
},
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_errCache = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = otcic_JSStdoutPrintStream__init_0();
    return jl_System_outCache;
},
jl_System_err = () => {
    if (jl_System_errCache === null)
        jl_System_errCache = otcic_JSStderrPrintStream__init_0();
    return jl_System_errCache;
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
cpru_Style = $rt_classWithoutFields(),
cpru_Style_init = () => {
    cbgg_c_a($rt_s(1635), cbgg_b__init_((-1)));
    cbgg_c_a($rt_s(1636), cbgg_b__init_(255));
    cbgg_c_a($rt_s(1637), cbgg_b__init_((-2116949505)));
    cbgg_c_a($rt_s(1638), cbgg_b__init_((-694225665)));
    cbgg_c_a($rt_s(1639), cbgg_b__init_((-205754881)));
    cbgg_c_a($rt_s(1640), cbgg_b__init_((-413511681)));
    cbgg_c_a($rt_s(1641), cbgg_b__init_(13959167));
    cbgg_c_a($rt_s(1642), cbgg_b__init_(16721663));
    cbgg_c_a($rt_s(1643), cbgg_b__init_(12255231));
    cbgg_c_a($rt_s(1644), cbgg_b__init_((-9849601)));
    cbgg_c_a($rt_s(1645), cbgg_b__init_(13959167));
    cbgg_c_a($rt_s(1646), cbgg_b__init_(603124735));
    cbgg_c_a($rt_s(1647), cbgg_b__init_(16724223));
    cbgg_c_a($rt_s(1648), cbgg_b__init_((-16776961)));
    cbgg_c_a($rt_s(1649), cbgg_b__init_((-162442497)));
    cbgg_c_a($rt_s(1650), cbgg_b__init_(267391487));
    cbgg_c_a($rt_s(1651), cbgg_b__init_((-840019201)));
    cbgg_c_a($rt_s(1652), cbgg_b__init_(293911807));
    cbgg_c_a($rt_s(1653), cbgg_b__init_((-1773153793)));
    cbgg_c_a($rt_s(1654), cbgg_b__init_((-65281)));
    cbgg_c_a($rt_s(1655), cbgg_b__init_((-271306753)));
    cbgg_c_a($rt_s(1656), cbgg_b__init_((-7864065)));
    cbgg_c_a($rt_s(1657), cbgg_b__init_(13434879));
    cbgg_c_a($rt_s(1658), cbgg_b__init_((-205754881)));
    cbgg_c_a($rt_s(1659), cbgg_b__init_((-2004317953)));
    cbgg_c_a($rt_s(1660), cbgg_b__init_((-1077952513)));
    cbgg_c_a($rt_s(1661), cbgg_b__init_((-1951018497)));
    cbgg_c_a($rt_s(1662), cbgg_b__init_((-2049445889)));
    cbgg_c_a($rt_s(1663), cbgg_b__init_(486490623));
    cbgg_c_a($rt_s(1664), cbgg_b__init_(1100873215));
    cbgg_c_a($rt_s(1665), cbgg_b__init_((-251002881)));
    cbgg_c_a($rt_s(1666), cbgg_b__init_((-4257281)));
    cbgg_c_a($rt_s(1667), cbgg_b__init_(1886284287));
    cbgg_c_a($rt_s(1668), cbgg_b__init_((-3587841)));
    cbgg_c_a($rt_s(1669), cbgg_b__init_((-205754881)));
    cbgg_c_a($rt_s(1670), cbgg_b__init_((-3407361)));
    cbgg_c_a($rt_s(1671), cbgg_b__init_(790170623));
    cbgg_c_a($rt_s(1672), cbgg_b__init_(890966015));
    cbgg_c_a($rt_s(1673), cbgg_b__init_(296132095));
    cbgg_c_a($rt_s(1674), cbgg_b__init_((-1779330817)));
    cbgg_c_a($rt_s(1675), cbgg_b__init_((-188813313)));
    cbgg_c_a($rt_s(1676), cbgg_b__init_0(0.800000011920929, 0.0, 0.0, 1.0));
};
function cprnm_ExpeditionRunData() {
    let a = this; cpaa_i.call(a);
    a.$chestsOpened = null;
    a.$defenders = null;
    a.$deprecatedHardMode = null;
    a.$difficulty = null;
    a.$nodeRewards = null;
    a.$nodesDefeated = null;
    a.$totalGoldEarned = null;
}
let cprnm_ExpeditionRunData__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1677));
    var$0.$defenders = ju_ArrayList__init_(0);
    var$0.$nodesDefeated = jl_Integer_valueOf(0);
    var$0.$nodeRewards = ju_ArrayList__init_(0);
    var$0.$chestsOpened = jl_Integer_valueOf(0);
    var$0.$totalGoldEarned = jl_Integer_valueOf(0);
    var$0.$deprecatedHardMode = jl_Boolean_valueOf(0);
    var$0.$difficulty = jl_Integer_valueOf(0);
},
cprnm_ExpeditionRunData__init_0 = () => {
    let var_0 = new cprnm_ExpeditionRunData();
    cprnm_ExpeditionRunData__init_(var_0);
    return var_0;
},
cprt_MusicAccessor = $rt_classWithoutFields(),
cprt_MusicAccessor_$assertionsDisabled = 0,
cprt_MusicAccessor_$callClinit = () => {
    cprt_MusicAccessor_$callClinit = $rt_eraseClinit(cprt_MusicAccessor);
    cprt_MusicAccessor__clinit_();
},
cprt_MusicAccessor__clinit_ = () => {
    cprt_MusicAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_MusicAccessor)) ? 0 : 1;
},
cprt_MusicAccessor__init_ = var$0 => {
    cprt_MusicAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_MusicAccessor__init_0 = () => {
    let var_0 = new cprt_MusicAccessor();
    cprt_MusicAccessor__init_(var_0);
    return var_0;
},
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$5__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$5__init_0 = () => {
    let var_0 = new ju_Collections$5();
    ju_Collections$5__init_(var_0);
    return var_0;
};
function ju_LinkedList$Entry() {
    let a = this; jl_Object.call(a);
    a.$item = null;
    a.$next0 = null;
    a.$previous = null;
}
let ju_LinkedList$Entry__init_ = $this => {
    jl_Object__init_($this);
},
ju_LinkedList$Entry__init_0 = () => {
    let var_0 = new ju_LinkedList$Entry();
    ju_LinkedList$Entry__init_(var_0);
    return var_0;
},
DragonSoulLauncher = $rt_classWithoutFields(),
DragonSoulLauncher_$callClinit = () => {
    DragonSoulLauncher_$callClinit = $rt_eraseClinit(DragonSoulLauncher);
    DragonSoulLauncher__clinit_();
},
DragonSoulLauncher_main = var$1 => {
    DragonSoulLauncher_$callClinit();
    (jl_System_out()).$println($rt_s(1678));
    cpr_RPGMain__init_(new cpr_RPGMain, null);
},
DragonSoulLauncher__clinit_ = () => {
    return;
},
ju_RandomAccess = $rt_classWithoutFields(0),
ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_TemplateCollections$AbstractImmutableList__init_ = $this => {
    ju_AbstractList__init_($this);
},
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Collections$3__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableList__init_($this);
},
ju_Collections$3__init_0 = () => {
    let var_0 = new ju_Collections$3();
    ju_Collections$3__init_(var_0);
    return var_0;
},
ju_Collections$4 = $rt_classWithoutFields(),
ju_Collections$4__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$4__init_0 = () => {
    let var_0 = new ju_Collections$4();
    ju_Collections$4__init_(var_0);
    return var_0;
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
};
function cprnm_PrivateUserInfo() {
    let a = this; cpaa_i.call(a);
    a.$email = null;
    a.$facebookID = null;
    a.$facebookName0 = null;
    a.$gameCenterID = null;
    a.$gameCenterName = null;
    a.$gameCircleID = null;
    a.$gameCircleName = null;
    a.$googlePlusID = null;
    a.$googlePlusName = null;
    a.$zendeskUserToken = null;
}
let cprnm_PrivateUserInfo__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1679));
    var$0.$email = $rt_s(91);
    var$0.$facebookID = jl_Long_valueOf(Long_ZERO);
    var$0.$googlePlusID = $rt_s(91);
    var$0.$gameCenterID = $rt_s(91);
    var$0.$gameCircleID = $rt_s(91);
    var$0.$facebookName0 = $rt_s(91);
    var$0.$googlePlusName = $rt_s(91);
    var$0.$gameCenterName = $rt_s(91);
    var$0.$gameCircleName = $rt_s(91);
    var$0.$zendeskUserToken = $rt_s(91);
},
cprnm_PrivateUserInfo__init_0 = () => {
    let var_0 = new cprnm_PrivateUserInfo();
    cprnm_PrivateUserInfo__init_(var_0);
    return var_0;
},
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet),
ju_TemplateCollections$AbstractImmutableSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_Collections$1__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableSet__init_($this);
},
ju_Collections$1__init_0 = () => {
    let var_0 = new ju_Collections$1();
    ju_Collections$1__init_(var_0);
    return var_0;
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_Collections$2__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableMap__init_($this);
},
ju_Collections$2__init_0 = () => {
    let var_0 = new ju_Collections$2();
    ju_Collections$2__init_(var_0);
    return var_0;
};
function cprnm_BossPitData() {
    let a = this; cpaa_i.call(a);
    a.$completedBosses = null;
    a.$currentBoss = null;
    a.$currentDifficulty = null;
    a.$currentDifficultyCap = null;
    a.$currentPhase = null;
    a.$currentPhaseComplete = null;
    a.$lastAttackTime = null;
    a.$wins = null;
}
let cprnm_BossPitData__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1680));
    cprnm_UnitType_$callClinit();
    var$0.$currentBoss = cprnm_UnitType_DEFAULT;
    var$0.$currentPhase = jl_Integer_valueOf(0);
    var$0.$currentDifficulty = jl_Integer_valueOf(0);
    var$0.$currentDifficultyCap = jl_Integer_valueOf(6);
    var$0.$currentPhaseComplete = jl_Boolean_valueOf(0);
    var$0.$lastAttackTime = jl_Long_valueOf(Long_ZERO);
    var$0.$completedBosses = ju_ArrayList__init_(0);
    var$0.$wins = ju_HashMap__init_(0);
},
cprnm_BossPitData__init_0 = () => {
    let var_0 = new cprnm_BossPitData();
    cprnm_BossPitData__init_(var_0);
    return var_0;
};
function ju_EnumMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$keyType = null;
    a.$data = null;
    a.$provided = null;
    a.$size1 = 0;
}
let ju_EnumMap__init_0 = ($this, $keyType) => {
    ju_AbstractMap__init_($this);
    ju_EnumMap_initFromKeyType($this, $keyType);
},
ju_EnumMap__init_ = var_0 => {
    let var_1 = new ju_EnumMap();
    ju_EnumMap__init_0(var_1, var_0);
    return var_1;
},
ju_EnumMap_initFromKeyType = ($this, $keyType) => {
    $this.$keyType = $keyType;
    $this.$data = $rt_createArray(jl_Object, (ju_GenericEnumSet_getConstants($keyType)).data.length);
    $this.$provided = $rt_createBooleanArray($this.$data.data.length);
},
ju_EnumMap_put = ($this, $key, $value) => {
    let $cls, $index, $old;
    $cls = jl_Object_getClass($key);
    if ($cls !== $this.$keyType && jl_Class_getSuperclass($cls) !== $this.$keyType)
        $rt_throw(jl_ClassCastException__init_0());
    $index = jl_Enum_ordinal($key);
    $old = $this.$data.data[$index];
    if (!$this.$provided.data[$index]) {
        $this.$provided.data[$index] = 1;
        $this.$size1 = $this.$size1 + 1 | 0;
    }
    $this.$data.data[$index] = $value;
    return $old;
},
ju_EnumMap_put0 = ($this, var$1, var$2) => {
    return $this.$put0(var$1, var$2);
},
cprt_DFLabelAccessor = $rt_classWithoutFields(),
cprt_DFLabelAccessor_$assertionsDisabled = 0,
cprt_DFLabelAccessor_$callClinit = () => {
    cprt_DFLabelAccessor_$callClinit = $rt_eraseClinit(cprt_DFLabelAccessor);
    cprt_DFLabelAccessor__clinit_();
},
cprt_DFLabelAccessor__clinit_ = () => {
    cprt_DFLabelAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_DFLabelAccessor)) ? 0 : 1;
},
cprt_DFLabelAccessor__init_ = var$0 => {
    cprt_DFLabelAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_DFLabelAccessor__init_0 = () => {
    let var_0 = new cprt_DFLabelAccessor();
    cprt_DFLabelAccessor__init_(var_0);
    return var_0;
},
cprnm_TimeType = $rt_classWithoutFields(jl_Enum),
cprnm_TimeType_$VALUES = null,
cprnm_TimeType_CHAT_APP_AUTH_TOKEN_IAT = null,
cprnm_TimeType_CHAT_APP_LAST_LOGIN = null,
cprnm_TimeType_CHAT_SILENCE_END = null,
cprnm_TimeType_CRAFT_SUCCESS_END = null,
cprnm_TimeType_CRAFT_SUCCESS_START = null,
cprnm_TimeType_DEFAULT = null,
cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_END = null,
cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_START = null,
cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_END = null,
cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_START = null,
cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_END = null,
cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_START = null,
cprnm_TimeType_GUILD_LEAVE_TIME = null,
cprnm_TimeType_LAPSED_CATCH_UP_LAST_LOGOUT = null,
cprnm_TimeType_LAST_CHESTS_VIEW_TIME = null,
cprnm_TimeType_LAST_DAILY_RESET = null,
cprnm_TimeType_LAST_DOUBLE_ELITE_PAUSE = null,
cprnm_TimeType_LAST_DOUBLE_EXPERT_PAUSE = null,
cprnm_TimeType_LAST_DOUBLE_NORMAL_PAUSE = null,
cprnm_TimeType_LAST_EVENT_CHEST_RESET = null,
cprnm_TimeType_LAST_EVENT_VIEW_TIME = null,
cprnm_TimeType_LAST_GUILD_WALL_VIEW = null,
cprnm_TimeType_LAST_MERCENARY_EARN_RESET = null,
cprnm_TimeType_LAST_MERCHANT_VIEW_TIME = null,
cprnm_TimeType_LAST_MONTHLY_SERVER_SIGNIN = null,
cprnm_TimeType_LAST_MONTHLY_SIGNIN = null,
cprnm_TimeType_LAST_NON_FREE_TIME_ZONE_CHANGE = null,
cprnm_TimeType_LAST_PURCHASE = null,
cprnm_TimeType_LAST_SOUL_CHEST_RESET = null,
cprnm_TimeType_LAST_SPECIAL_EVENT_CHECK = null,
cprnm_TimeType_LAST_SUSPENSION_TIME = null,
cprnm_TimeType_LAST_TIME_ZONE_CHANGE = null,
cprnm_TimeType_LAST_USER_DAILY_RESET = null,
cprnm_TimeType_MONTHLY_CARD_EXPIRE_TIME = null,
cprnm_TimeType_MONTHLY_DIAMOND_END = null,
cprnm_TimeType_SUSPENSION_END = null,
cprnm_TimeType_TEMPLE_EXPIRATION = null;
let cprnm_TimeType_TEMPORARY_VIP_END = null,
cprnm_TimeType_XP_BONUS_TEAM_END = null,
cprnm_TimeType_XP_BONUS_TEAM_PAUSE = null,
cprnm_TimeType_XP_BONUS_TEAM_START = null,
cprnm_TimeType_values0 = null,
cprnm_TimeType_$callClinit = () => {
    cprnm_TimeType_$callClinit = $rt_eraseClinit(cprnm_TimeType);
    cprnm_TimeType__clinit_();
},
cprnm_TimeType__clinit_ = () => {
    let var$1, var$2;
    cprnm_TimeType_DEFAULT = cprnm_TimeType__init_($rt_s(12), 0);
    cprnm_TimeType_LAST_NON_FREE_TIME_ZONE_CHANGE = cprnm_TimeType__init_($rt_s(1681), 1);
    cprnm_TimeType_CHAT_SILENCE_END = cprnm_TimeType__init_($rt_s(1682), 2);
    cprnm_TimeType_MONTHLY_DIAMOND_END = cprnm_TimeType__init_($rt_s(1683), 3);
    cprnm_TimeType_LAST_DAILY_RESET = cprnm_TimeType__init_($rt_s(1684), 4);
    cprnm_TimeType_LAST_MONTHLY_SIGNIN = cprnm_TimeType__init_($rt_s(1685), 5);
    cprnm_TimeType_LAST_SPECIAL_EVENT_CHECK = cprnm_TimeType__init_($rt_s(1686), 6);
    cprnm_TimeType_LAST_USER_DAILY_RESET = cprnm_TimeType__init_($rt_s(1687), 7);
    cprnm_TimeType_LAST_EVENT_VIEW_TIME = cprnm_TimeType__init_($rt_s(1688), 8);
    cprnm_TimeType_LAST_MERCHANT_VIEW_TIME = cprnm_TimeType__init_($rt_s(1689), 9);
    cprnm_TimeType_LAST_MERCENARY_EARN_RESET = cprnm_TimeType__init_($rt_s(1690), 10);
    cprnm_TimeType_LAST_PURCHASE = cprnm_TimeType__init_($rt_s(1691), 11);
    cprnm_TimeType_LAST_EVENT_CHEST_RESET = cprnm_TimeType__init_($rt_s(1692), 12);
    cprnm_TimeType_MONTHLY_CARD_EXPIRE_TIME = cprnm_TimeType__init_($rt_s(1693), 13);
    cprnm_TimeType_TEMPLE_EXPIRATION = cprnm_TimeType__init_($rt_s(1694), 14);
    cprnm_TimeType_LAST_GUILD_WALL_VIEW = cprnm_TimeType__init_($rt_s(1695), 15);
    cprnm_TimeType_LAST_SOUL_CHEST_RESET = cprnm_TimeType__init_($rt_s(1696), 16);
    cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_END = cprnm_TimeType__init_($rt_s(1697), 17);
    cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_END = cprnm_TimeType__init_($rt_s(1698), 18);
    cprnm_TimeType_LAST_MONTHLY_SERVER_SIGNIN = cprnm_TimeType__init_($rt_s(1699), 19);
    cprnm_TimeType_LAST_DOUBLE_NORMAL_PAUSE = cprnm_TimeType__init_($rt_s(1700), 20);
    cprnm_TimeType_LAST_DOUBLE_ELITE_PAUSE = cprnm_TimeType__init_($rt_s(1701), 21);
    cprnm_TimeType_GUILD_LEAVE_TIME = cprnm_TimeType__init_($rt_s(1702), 22);
    cprnm_TimeType_TEMPORARY_VIP_END = cprnm_TimeType__init_($rt_s(1703), 23);
    cprnm_TimeType_LAST_TIME_ZONE_CHANGE = cprnm_TimeType__init_($rt_s(1704), 24);
    cprnm_TimeType_CHAT_APP_AUTH_TOKEN_IAT = cprnm_TimeType__init_($rt_s(1705), 25);
    cprnm_TimeType_CHAT_APP_LAST_LOGIN = cprnm_TimeType__init_($rt_s(1706), 26);
    cprnm_TimeType_LAPSED_CATCH_UP_LAST_LOGOUT = cprnm_TimeType__init_($rt_s(1707), 27);
    cprnm_TimeType_LAST_CHESTS_VIEW_TIME = cprnm_TimeType__init_($rt_s(1708), 28);
    cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_START = cprnm_TimeType__init_($rt_s(1709), 29);
    cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_START = cprnm_TimeType__init_($rt_s(1710), 30);
    cprnm_TimeType_SUSPENSION_END = cprnm_TimeType__init_($rt_s(1711), 31);
    cprnm_TimeType_LAST_SUSPENSION_TIME = cprnm_TimeType__init_($rt_s(1712), 32);
    cprnm_TimeType_CRAFT_SUCCESS_START = cprnm_TimeType__init_($rt_s(1713), 33);
    cprnm_TimeType_CRAFT_SUCCESS_END = cprnm_TimeType__init_($rt_s(1714), 34);
    cprnm_TimeType_XP_BONUS_TEAM_START = cprnm_TimeType__init_($rt_s(1715), 35);
    cprnm_TimeType_XP_BONUS_TEAM_END = cprnm_TimeType__init_($rt_s(1716), 36);
    cprnm_TimeType_XP_BONUS_TEAM_PAUSE = cprnm_TimeType__init_($rt_s(1717), 37);
    cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_START = cprnm_TimeType__init_($rt_s(1718), 38);
    cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_END = cprnm_TimeType__init_($rt_s(1719), 39);
    cprnm_TimeType_LAST_DOUBLE_EXPERT_PAUSE = cprnm_TimeType__init_($rt_s(1720), 40);
    var$1 = $rt_createArray(cprnm_TimeType, 41);
    var$2 = var$1.data;
    var$2[0] = cprnm_TimeType_DEFAULT;
    var$2[1] = cprnm_TimeType_LAST_NON_FREE_TIME_ZONE_CHANGE;
    var$2[2] = cprnm_TimeType_CHAT_SILENCE_END;
    var$2[3] = cprnm_TimeType_MONTHLY_DIAMOND_END;
    var$2[4] = cprnm_TimeType_LAST_DAILY_RESET;
    var$2[5] = cprnm_TimeType_LAST_MONTHLY_SIGNIN;
    var$2[6] = cprnm_TimeType_LAST_SPECIAL_EVENT_CHECK;
    var$2[7] = cprnm_TimeType_LAST_USER_DAILY_RESET;
    var$2[8] = cprnm_TimeType_LAST_EVENT_VIEW_TIME;
    var$2[9] = cprnm_TimeType_LAST_MERCHANT_VIEW_TIME;
    var$2[10] = cprnm_TimeType_LAST_MERCENARY_EARN_RESET;
    var$2[11] = cprnm_TimeType_LAST_PURCHASE;
    var$2[12] = cprnm_TimeType_LAST_EVENT_CHEST_RESET;
    var$2[13] = cprnm_TimeType_MONTHLY_CARD_EXPIRE_TIME;
    var$2[14] = cprnm_TimeType_TEMPLE_EXPIRATION;
    var$2[15] = cprnm_TimeType_LAST_GUILD_WALL_VIEW;
    var$2[16] = cprnm_TimeType_LAST_SOUL_CHEST_RESET;
    var$2[17] = cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_END;
    var$2[18] = cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_END;
    var$2[19] = cprnm_TimeType_LAST_MONTHLY_SERVER_SIGNIN;
    var$2[20] = cprnm_TimeType_LAST_DOUBLE_NORMAL_PAUSE;
    var$2[21] = cprnm_TimeType_LAST_DOUBLE_ELITE_PAUSE;
    var$2[22] = cprnm_TimeType_GUILD_LEAVE_TIME;
    var$2[23] = cprnm_TimeType_TEMPORARY_VIP_END;
    var$2[24] = cprnm_TimeType_LAST_TIME_ZONE_CHANGE;
    var$2[25] = cprnm_TimeType_CHAT_APP_AUTH_TOKEN_IAT;
    var$2[26] = cprnm_TimeType_CHAT_APP_LAST_LOGIN;
    var$2[27] = cprnm_TimeType_LAPSED_CATCH_UP_LAST_LOGOUT;
    var$2[28] = cprnm_TimeType_LAST_CHESTS_VIEW_TIME;
    var$2[29] = cprnm_TimeType_DOUBLE_NORMAL_DROP_ITEM_START;
    var$2[30] = cprnm_TimeType_DOUBLE_ELITE_DROP_ITEM_START;
    var$2[31] = cprnm_TimeType_SUSPENSION_END;
    var$2[32] = cprnm_TimeType_LAST_SUSPENSION_TIME;
    var$2[33] = cprnm_TimeType_CRAFT_SUCCESS_START;
    var$2[34] = cprnm_TimeType_CRAFT_SUCCESS_END;
    var$2[35] = cprnm_TimeType_XP_BONUS_TEAM_START;
    var$2[36] = cprnm_TimeType_XP_BONUS_TEAM_END;
    var$2[37] = cprnm_TimeType_XP_BONUS_TEAM_PAUSE;
    var$2[38] = cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_START;
    var$2[39] = cprnm_TimeType_DOUBLE_EXPERT_DROP_ITEM_END;
    var$2[40] = cprnm_TimeType_LAST_DOUBLE_EXPERT_PAUSE;
    cprnm_TimeType_$VALUES = var$1;
    cprnm_TimeType_values0 = cprnm_TimeType_values();
},
cprnm_TimeType__init_0 = (var$0, var$1, var$2) => {
    cprnm_TimeType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_TimeType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_TimeType();
    cprnm_TimeType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_TimeType_values = () => {
    cprnm_TimeType_$callClinit();
    return cprnm_TimeType_$VALUES.$clone0();
},
cprt_SkeletonAccessor = $rt_classWithoutFields(),
cprt_SkeletonAccessor_$assertionsDisabled = 0,
cprt_SkeletonAccessor_$callClinit = () => {
    cprt_SkeletonAccessor_$callClinit = $rt_eraseClinit(cprt_SkeletonAccessor);
    cprt_SkeletonAccessor__clinit_();
},
cprt_SkeletonAccessor__clinit_ = () => {
    cprt_SkeletonAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_SkeletonAccessor)) ? 0 : 1;
},
cprt_SkeletonAccessor__init_ = var$0 => {
    cprt_SkeletonAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_SkeletonAccessor__init_0 = () => {
    let var_0 = new cprt_SkeletonAccessor();
    cprt_SkeletonAccessor__init_(var_0);
    return var_0;
},
otcir_ClassList = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ju_Collections$_clinit_$lambda$_59_0__init_0 = () => {
    let var_0 = new ju_Collections$_clinit_$lambda$_59_0();
    ju_Collections$_clinit_$lambda$_59_0__init_(var_0);
    return var_0;
},
cpruw_CombatManaBar = $rt_classWithoutFields(cbgssu_i),
cprt_EntityTweenAccessor = $rt_classWithoutFields(),
cprt_EntityTweenAccessor_$assertionsDisabled = 0,
cprt_EntityTweenAccessor_$callClinit = () => {
    cprt_EntityTweenAccessor_$callClinit = $rt_eraseClinit(cprt_EntityTweenAccessor);
    cprt_EntityTweenAccessor__clinit_();
},
cprt_EntityTweenAccessor__clinit_ = () => {
    cprt_EntityTweenAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_EntityTweenAccessor)) ? 0 : 1;
},
cprt_EntityTweenAccessor__init_ = var$0 => {
    cprt_EntityTweenAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_EntityTweenAccessor__init_0 = () => {
    let var_0 = new cprt_EntityTweenAccessor();
    cprt_EntityTweenAccessor__init_(var_0);
    return var_0;
},
oacl_LogFactory = $rt_classWithoutFields(),
oacl_LogFactory_INSTANCE = null,
oacl_LogFactory_$callClinit = () => {
    oacl_LogFactory_$callClinit = $rt_eraseClinit(oacl_LogFactory);
    oacl_LogFactory__clinit_();
},
oacl_LogFactory__init_ = var$0 => {
    oacl_LogFactory_$callClinit();
    jl_Object__init_(var$0);
},
oacl_LogFactory__init_0 = () => {
    let var_0 = new oacl_LogFactory();
    oacl_LogFactory__init_(var_0);
    return var_0;
},
oacl_LogFactory_getLog = var$1 => {
    oacl_LogFactory_$callClinit();
    return oacl_LogFactory_INSTANCE;
},
oacl_LogFactory_getFactory = () => {
    oacl_LogFactory_$callClinit();
    return oacl_LogFactory__init_0();
},
oacl_LogFactory_getInstance0 = (var$0, var$1) => {
    oacl_LogFactory_$callClinit();
    return oacl_LogFactory_INSTANCE;
},
oacl_LogFactory_getInstance = (var$0, var$1) => {
    oacl_LogFactory_$callClinit();
    return oacl_LogFactory_INSTANCE;
},
oacl_LogFactory__clinit_ = () => {
    oacl_LogFactory_INSTANCE = oacl_SimpleLog__init_0();
},
cprnm_MerchantType = $rt_classWithoutFields(jl_Enum),
cprnm_MerchantType_$VALUES = null,
cprnm_MerchantType_BAZAAR = null,
cprnm_MerchantType_BLACK_MARKET = null,
cprnm_MerchantType_COLISEUM = null,
cprnm_MerchantType_DEFAULT = null,
cprnm_MerchantType_EXPEDITIONS = null,
cprnm_MerchantType_FIGHT_PIT = null,
cprnm_MerchantType_GUILD = null,
cprnm_MerchantType_GUILD_WAR = null,
cprnm_MerchantType_NORMAL = null,
cprnm_MerchantType_PEDDLER = null,
cprnm_MerchantType_SOULMART = null;
let cprnm_MerchantType_values0 = null,
cprnm_MerchantType_$callClinit = () => {
    cprnm_MerchantType_$callClinit = $rt_eraseClinit(cprnm_MerchantType);
    cprnm_MerchantType__clinit_();
},
cprnm_MerchantType__clinit_ = () => {
    let var$1, var$2;
    cprnm_MerchantType_DEFAULT = cprnm_MerchantType__init_($rt_s(12), 0);
    cprnm_MerchantType_NORMAL = cprnm_MerchantType__init_($rt_s(1721), 1);
    cprnm_MerchantType_FIGHT_PIT = cprnm_MerchantType__init_($rt_s(24), 2);
    cprnm_MerchantType_EXPEDITIONS = cprnm_MerchantType__init_($rt_s(1722), 3);
    cprnm_MerchantType_GUILD = cprnm_MerchantType__init_($rt_s(1595), 4);
    cprnm_MerchantType_PEDDLER = cprnm_MerchantType__init_($rt_s(1723), 5);
    cprnm_MerchantType_BLACK_MARKET = cprnm_MerchantType__init_($rt_s(1724), 6);
    cprnm_MerchantType_COLISEUM = cprnm_MerchantType__init_($rt_s(188), 7);
    cprnm_MerchantType_SOULMART = cprnm_MerchantType__init_($rt_s(1725), 8);
    cprnm_MerchantType_GUILD_WAR = cprnm_MerchantType__init_($rt_s(34), 9);
    cprnm_MerchantType_BAZAAR = cprnm_MerchantType__init_($rt_s(1726), 10);
    var$1 = $rt_createArray(cprnm_MerchantType, 11);
    var$2 = var$1.data;
    var$2[0] = cprnm_MerchantType_DEFAULT;
    var$2[1] = cprnm_MerchantType_NORMAL;
    var$2[2] = cprnm_MerchantType_FIGHT_PIT;
    var$2[3] = cprnm_MerchantType_EXPEDITIONS;
    var$2[4] = cprnm_MerchantType_GUILD;
    var$2[5] = cprnm_MerchantType_PEDDLER;
    var$2[6] = cprnm_MerchantType_BLACK_MARKET;
    var$2[7] = cprnm_MerchantType_COLISEUM;
    var$2[8] = cprnm_MerchantType_SOULMART;
    var$2[9] = cprnm_MerchantType_GUILD_WAR;
    var$2[10] = cprnm_MerchantType_BAZAAR;
    cprnm_MerchantType_$VALUES = var$1;
    cprnm_MerchantType_values0 = cprnm_MerchantType_values();
},
cprnm_MerchantType__init_0 = (var$0, var$1, var$2) => {
    cprnm_MerchantType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_MerchantType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_MerchantType();
    cprnm_MerchantType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_MerchantType_values = () => {
    cprnm_MerchantType_$callClinit();
    return cprnm_MerchantType_$VALUES.$clone0();
},
cprnm_MerchantType_valuesCached = () => {
    cprnm_MerchantType_$callClinit();
    return cprnm_MerchantType_values0;
},
ces_Skeleton = $rt_classWithoutFields(),
cpc_c = $rt_classWithoutFields(),
cpc_c_a0 = 0,
cpc_c_b = null,
cpc_c_$callClinit = () => {
    cpc_c_$callClinit = $rt_eraseClinit(cpc_c);
    cpc_c__clinit_();
},
cpc_c__clinit_ = () => {
    cpc_c_b = cpch_a_a0();
},
cpc_c_a = var$1 => {
    cpc_c_$callClinit();
    cpc_c_a0 = var$1;
},
cbgu_ac$a = $rt_classWithoutFields(0);
function jlr_ReferenceQueue() {
    let a = this; jl_Object.call(a);
    a.$inner = null;
    a.$registry = null;
}
let jlr_ReferenceQueue__init_ = var$0 => {
    var$0.$inner = [];
},
jlr_ReferenceQueue__init_0 = () => {
    let var_0 = new jlr_ReferenceQueue();
    jlr_ReferenceQueue__init_(var_0);
    return var_0;
};
function ju_ArrayList() {
    ju_AbstractList.call(this);
    this.$array = null;
}
let ju_ArrayList__init_2 = var$0 => {
    ju_ArrayList__init_0(var$0, 10);
},
ju_ArrayList__init_1 = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_2(var_0);
    return var_0;
},
ju_ArrayList__init_0 = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_ArrayList__init_ = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_0(var_1, var_0);
    return var_1;
};
function ju_LinkedList$SequentialListIterator() {
    let a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry = null;
    a.$currentEntry = null;
    a.$index = 0;
    a.$version = 0;
    a.$this$0 = null;
}
let ju_LinkedList$SequentialListIterator__init_0 = ($this, var$1, $nextEntry, $prevEntry, $index) => {
    $this.$this$0 = var$1;
    jl_Object__init_($this);
    $this.$version = $this.$this$0.$modCount;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry = $prevEntry;
    $this.$index = $index;
},
ju_LinkedList$SequentialListIterator__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
ju_LinkedList$SequentialListIterator_add = ($this, $e) => {
    let $newEntry, var$3;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    $newEntry = ju_LinkedList$Entry__init_0();
    $newEntry.$item = $e;
    $newEntry.$previous = $this.$prevEntry;
    $newEntry.$next0 = $this.$nextEntry;
    if ($this.$prevEntry === null)
        $this.$this$0.$firstEntry = $newEntry;
    else
        $this.$prevEntry.$next0 = $newEntry;
    if ($this.$nextEntry === null)
        $this.$this$0.$lastEntry = $newEntry;
    else
        $this.$nextEntry.$previous = $newEntry;
    $this.$prevEntry = $newEntry;
    var$3 = $this.$this$0;
    var$3.$size0 = var$3.$size0 + 1 | 0;
    var$3 = $this.$this$0;
    var$3.$modCount = var$3.$modCount + 1 | 0;
    $this.$version = $this.$this$0.$modCount;
    $this.$currentEntry = null;
},
ju_LinkedList$SequentialListIterator_checkConcurrentModification = $this => {
    if ($this.$version >= $this.$this$0.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_0());
},
cprt_Vector3Accessor = $rt_classWithoutFields(),
cprt_Vector3Accessor_$assertionsDisabled = 0,
cprt_Vector3Accessor_$callClinit = () => {
    cprt_Vector3Accessor_$callClinit = $rt_eraseClinit(cprt_Vector3Accessor);
    cprt_Vector3Accessor__clinit_();
},
cprt_Vector3Accessor__clinit_ = () => {
    cprt_Vector3Accessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_Vector3Accessor)) ? 0 : 1;
},
cprt_Vector3Accessor__init_ = var$0 => {
    cprt_Vector3Accessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_Vector3Accessor__init_0 = () => {
    let var_0 = new cprt_Vector3Accessor();
    cprt_Vector3Accessor__init_(var_0);
    return var_0;
};
function jl_String() {
    jl_Object.call(this);
    this.$hashCode0 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_ = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_5 = () => {
    let var_0 = new jl_String();
    jl_String__init_(var_0);
    return var_0;
},
jl_String__init_0 = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_3 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
},
jl_String__init_1 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_6 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
},
jl_String__init_2 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_4 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_toString = $this => {
    return $this;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(93) : $obj.$toString();
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode0) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode0;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_5();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_118_0__init_0();
},
cprt_ActorAccessor = $rt_classWithoutFields(),
cprt_ActorAccessor_$assertionsDisabled = 0,
cprt_ActorAccessor_$callClinit = () => {
    cprt_ActorAccessor_$callClinit = $rt_eraseClinit(cprt_ActorAccessor);
    cprt_ActorAccessor__clinit_();
},
cprt_ActorAccessor__clinit_ = () => {
    cprt_ActorAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_ActorAccessor)) ? 0 : 1;
},
cprt_ActorAccessor__init_ = var$0 => {
    cprt_ActorAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_ActorAccessor__init_0 = () => {
    let var_0 = new cprt_ActorAccessor();
    cprt_ActorAccessor__init_(var_0);
    return var_0;
},
cprg_CombatTextLabel = $rt_classWithoutFields(cbgssu_j),
cpr_PerfStats = $rt_classWithoutFields(),
cpr_PerfStats_TAG = null,
cpr_PerfStats_stats = null,
cpr_PerfStats_tmpKeys = null,
cpr_PerfStats_$callClinit = () => {
    cpr_PerfStats_$callClinit = $rt_eraseClinit(cpr_PerfStats);
    cpr_PerfStats__clinit_();
},
cpr_PerfStats__clinit_ = () => {
    cpr_PerfStats_TAG = jl_Class_toString($rt_cls(cpr_PerfStats));
    cpr_PerfStats_stats = cbgu_z__init_();
    cpr_PerfStats_tmpKeys = cbgu_a__init_();
},
cpr_PerfStats_clear = () => {
    cpr_PerfStats_$callClinit();
    cpr_PerfStats_stats.$a5();
},
cpr_PerfStats_end = var$1 => {
    cpr_PerfStats_$callClinit();
},
cpr_PerfStats_start = var$1 => {
    cpr_PerfStats_$callClinit();
},
cpru_PlayingSound = $rt_classWithoutFields(),
oacl_Log = $rt_classWithoutFields(0),
oacl_SimpleLog = $rt_classWithoutFields(),
oacl_SimpleLog__init_ = var$0 => {
    jl_Object__init_(var$0);
},
oacl_SimpleLog__init_0 = () => {
    let var_0 = new oacl_SimpleLog();
    oacl_SimpleLog__init_(var_0);
    return var_0;
},
oacl_SimpleLog_error = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = jl_System_err();
    var$1 = jl_String_valueOf(var$1);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(1727)), var$1);
    var$2.$println(jl_StringBuilder_toString(var$3));
},
cprt_Vector2Accessor = $rt_classWithoutFields(),
cprt_Vector2Accessor_$assertionsDisabled = 0,
cprt_Vector2Accessor_$callClinit = () => {
    cprt_Vector2Accessor_$callClinit = $rt_eraseClinit(cprt_Vector2Accessor);
    cprt_Vector2Accessor__clinit_();
},
cprt_Vector2Accessor__clinit_ = () => {
    cprt_Vector2Accessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_Vector2Accessor)) ? 0 : 1;
},
cprt_Vector2Accessor__init_ = var$0 => {
    cprt_Vector2Accessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_Vector2Accessor__init_0 = () => {
    let var_0 = new cprt_Vector2Accessor();
    cprt_Vector2Accessor__init_(var_0);
    return var_0;
},
cprt_ProjectileTweenAccessor = $rt_classWithoutFields(),
cprt_ProjectileTweenAccessor_$assertionsDisabled = 0;
let cprt_ProjectileTweenAccessor_$callClinit = () => {
    cprt_ProjectileTweenAccessor_$callClinit = $rt_eraseClinit(cprt_ProjectileTweenAccessor);
    cprt_ProjectileTweenAccessor__clinit_();
},
cprt_ProjectileTweenAccessor__clinit_ = () => {
    cprt_ProjectileTweenAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_ProjectileTweenAccessor)) ? 0 : 1;
},
cprt_ProjectileTweenAccessor__init_ = var$0 => {
    cprt_ProjectileTweenAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_ProjectileTweenAccessor__init_0 = () => {
    let var_0 = new cprt_ProjectileTweenAccessor();
    cprt_ProjectileTweenAccessor__init_(var_0);
    return var_0;
},
cprnm_RandomSeedType = $rt_classWithoutFields(jl_Enum),
cprnm_RandomSeedType_$VALUES = null,
cprnm_RandomSeedType_ALCHEMY = null,
cprnm_RandomSeedType_BOSS_PIT_LOOT = null,
cprnm_RandomSeedType_CHEST = null,
cprnm_RandomSeedType_CHEST_EVENT_1 = null,
cprnm_RandomSeedType_CHEST_EVENT_10 = null,
cprnm_RandomSeedType_CHEST_GOLD_1 = null,
cprnm_RandomSeedType_CHEST_GOLD_10 = null,
cprnm_RandomSeedType_CHEST_ORANGE_1 = null,
cprnm_RandomSeedType_CHEST_ORANGE_10 = null,
cprnm_RandomSeedType_CHEST_PURPLE_1 = null,
cprnm_RandomSeedType_CHEST_PURPLE_10 = null,
cprnm_RandomSeedType_CHEST_SILVER_1 = null,
cprnm_RandomSeedType_CHEST_SILVER_10 = null,
cprnm_RandomSeedType_CHEST_SOUL = null,
cprnm_RandomSeedType_COLISEUM = null,
cprnm_RandomSeedType_COMBAT = null,
cprnm_RandomSeedType_CRYPT_RAID = null,
cprnm_RandomSeedType_DEFAULT = null,
cprnm_RandomSeedType_DIFFICULTY_MODE_LOOT = null,
cprnm_RandomSeedType_EXPEDITION_CHEST = null,
cprnm_RandomSeedType_FIGHT_PIT = null,
cprnm_RandomSeedType_GUILD_WAR = null,
cprnm_RandomSeedType_GUILD_WAR_REWARDS = null,
cprnm_RandomSeedType_LOOT = null,
cprnm_RandomSeedType_MERCHANT = null,
cprnm_RandomSeedType_RUNES = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_KEYSTONE = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_1 = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_2 = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_1 = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_2 = null,
cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_3 = null,
cprnm_RandomSeedType_SHRINE_STONE_DEFAULT = null,
cprnm_RandomSeedType_SHRINE_STONE_KEYSTONE = null,
cprnm_RandomSeedType_SHRINE_STONE_MAJOR_1 = null,
cprnm_RandomSeedType_SHRINE_STONE_MAJOR_2 = null,
cprnm_RandomSeedType_SHRINE_STONE_MINOR_1 = null,
cprnm_RandomSeedType_SHRINE_STONE_MINOR_2 = null,
cprnm_RandomSeedType_SHRINE_STONE_MINOR_3 = null,
cprnm_RandomSeedType_SHRINE_WOODEN_DEFAULT = null,
cprnm_RandomSeedType_SHRINE_WOODEN_KEYSTONE = null,
cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_1 = null,
cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_2 = null,
cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_1 = null;
let cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_2 = null,
cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_3 = null,
cprnm_RandomSeedType_TITAN_TEMPLE = null,
cprnm_RandomSeedType_values0 = null,
cprnm_RandomSeedType_$callClinit = () => {
    cprnm_RandomSeedType_$callClinit = $rt_eraseClinit(cprnm_RandomSeedType);
    cprnm_RandomSeedType__clinit_();
},
cprnm_RandomSeedType__clinit_ = () => {
    let var$1, var$2;
    cprnm_RandomSeedType_DEFAULT = cprnm_RandomSeedType__init_($rt_s(12), 0);
    cprnm_RandomSeedType_CHEST = cprnm_RandomSeedType__init_($rt_s(1728), 1);
    cprnm_RandomSeedType_ALCHEMY = cprnm_RandomSeedType__init_($rt_s(1729), 2);
    cprnm_RandomSeedType_LOOT = cprnm_RandomSeedType__init_($rt_s(1730), 3);
    cprnm_RandomSeedType_COMBAT = cprnm_RandomSeedType__init_($rt_s(1731), 4);
    cprnm_RandomSeedType_FIGHT_PIT = cprnm_RandomSeedType__init_($rt_s(24), 5);
    cprnm_RandomSeedType_CRYPT_RAID = cprnm_RandomSeedType__init_($rt_s(1612), 6);
    cprnm_RandomSeedType_MERCHANT = cprnm_RandomSeedType__init_($rt_s(1732), 7);
    cprnm_RandomSeedType_COLISEUM = cprnm_RandomSeedType__init_($rt_s(188), 8);
    cprnm_RandomSeedType_TITAN_TEMPLE = cprnm_RandomSeedType__init_($rt_s(189), 9);
    cprnm_RandomSeedType_CHEST_SILVER_1 = cprnm_RandomSeedType__init_($rt_s(1733), 10);
    cprnm_RandomSeedType_CHEST_SILVER_10 = cprnm_RandomSeedType__init_($rt_s(1734), 11);
    cprnm_RandomSeedType_CHEST_GOLD_1 = cprnm_RandomSeedType__init_($rt_s(1735), 12);
    cprnm_RandomSeedType_CHEST_GOLD_10 = cprnm_RandomSeedType__init_($rt_s(1736), 13);
    cprnm_RandomSeedType_CHEST_SOUL = cprnm_RandomSeedType__init_($rt_s(1737), 14);
    cprnm_RandomSeedType_CHEST_EVENT_1 = cprnm_RandomSeedType__init_($rt_s(1738), 15);
    cprnm_RandomSeedType_CHEST_EVENT_10 = cprnm_RandomSeedType__init_($rt_s(1739), 16);
    cprnm_RandomSeedType_GUILD_WAR = cprnm_RandomSeedType__init_($rt_s(34), 17);
    cprnm_RandomSeedType_GUILD_WAR_REWARDS = cprnm_RandomSeedType__init_($rt_s(1740), 18);
    cprnm_RandomSeedType_RUNES = cprnm_RandomSeedType__init_($rt_s(53), 19);
    cprnm_RandomSeedType_SHRINE_WOODEN_DEFAULT = cprnm_RandomSeedType__init_($rt_s(1741), 20);
    cprnm_RandomSeedType_SHRINE_WOODEN_KEYSTONE = cprnm_RandomSeedType__init_($rt_s(1742), 21);
    cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_1 = cprnm_RandomSeedType__init_($rt_s(1743), 22);
    cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_2 = cprnm_RandomSeedType__init_($rt_s(1744), 23);
    cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_1 = cprnm_RandomSeedType__init_($rt_s(1745), 24);
    cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_2 = cprnm_RandomSeedType__init_($rt_s(1746), 25);
    cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_3 = cprnm_RandomSeedType__init_($rt_s(1747), 26);
    cprnm_RandomSeedType_SHRINE_STONE_DEFAULT = cprnm_RandomSeedType__init_($rt_s(1748), 27);
    cprnm_RandomSeedType_SHRINE_STONE_KEYSTONE = cprnm_RandomSeedType__init_($rt_s(1749), 28);
    cprnm_RandomSeedType_SHRINE_STONE_MAJOR_1 = cprnm_RandomSeedType__init_($rt_s(1750), 29);
    cprnm_RandomSeedType_SHRINE_STONE_MAJOR_2 = cprnm_RandomSeedType__init_($rt_s(1751), 30);
    cprnm_RandomSeedType_SHRINE_STONE_MINOR_1 = cprnm_RandomSeedType__init_($rt_s(1752), 31);
    cprnm_RandomSeedType_SHRINE_STONE_MINOR_2 = cprnm_RandomSeedType__init_($rt_s(1753), 32);
    cprnm_RandomSeedType_SHRINE_STONE_MINOR_3 = cprnm_RandomSeedType__init_($rt_s(1754), 33);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_KEYSTONE = cprnm_RandomSeedType__init_($rt_s(1755), 34);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_1 = cprnm_RandomSeedType__init_($rt_s(1756), 35);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_2 = cprnm_RandomSeedType__init_($rt_s(1757), 36);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_1 = cprnm_RandomSeedType__init_($rt_s(1758), 37);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_2 = cprnm_RandomSeedType__init_($rt_s(1759), 38);
    cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_3 = cprnm_RandomSeedType__init_($rt_s(1760), 39);
    cprnm_RandomSeedType_BOSS_PIT_LOOT = cprnm_RandomSeedType__init_($rt_s(1761), 40);
    cprnm_RandomSeedType_DIFFICULTY_MODE_LOOT = cprnm_RandomSeedType__init_($rt_s(1762), 41);
    cprnm_RandomSeedType_EXPEDITION_CHEST = cprnm_RandomSeedType__init_($rt_s(1763), 42);
    cprnm_RandomSeedType_CHEST_PURPLE_1 = cprnm_RandomSeedType__init_($rt_s(1764), 43);
    cprnm_RandomSeedType_CHEST_PURPLE_10 = cprnm_RandomSeedType__init_($rt_s(1765), 44);
    cprnm_RandomSeedType_CHEST_ORANGE_1 = cprnm_RandomSeedType__init_($rt_s(1766), 45);
    cprnm_RandomSeedType_CHEST_ORANGE_10 = cprnm_RandomSeedType__init_($rt_s(1767), 46);
    var$1 = $rt_createArray(cprnm_RandomSeedType, 47);
    var$2 = var$1.data;
    var$2[0] = cprnm_RandomSeedType_DEFAULT;
    var$2[1] = cprnm_RandomSeedType_CHEST;
    var$2[2] = cprnm_RandomSeedType_ALCHEMY;
    var$2[3] = cprnm_RandomSeedType_LOOT;
    var$2[4] = cprnm_RandomSeedType_COMBAT;
    var$2[5] = cprnm_RandomSeedType_FIGHT_PIT;
    var$2[6] = cprnm_RandomSeedType_CRYPT_RAID;
    var$2[7] = cprnm_RandomSeedType_MERCHANT;
    var$2[8] = cprnm_RandomSeedType_COLISEUM;
    var$2[9] = cprnm_RandomSeedType_TITAN_TEMPLE;
    var$2[10] = cprnm_RandomSeedType_CHEST_SILVER_1;
    var$2[11] = cprnm_RandomSeedType_CHEST_SILVER_10;
    var$2[12] = cprnm_RandomSeedType_CHEST_GOLD_1;
    var$2[13] = cprnm_RandomSeedType_CHEST_GOLD_10;
    var$2[14] = cprnm_RandomSeedType_CHEST_SOUL;
    var$2[15] = cprnm_RandomSeedType_CHEST_EVENT_1;
    var$2[16] = cprnm_RandomSeedType_CHEST_EVENT_10;
    var$2[17] = cprnm_RandomSeedType_GUILD_WAR;
    var$2[18] = cprnm_RandomSeedType_GUILD_WAR_REWARDS;
    var$2[19] = cprnm_RandomSeedType_RUNES;
    var$2[20] = cprnm_RandomSeedType_SHRINE_WOODEN_DEFAULT;
    var$2[21] = cprnm_RandomSeedType_SHRINE_WOODEN_KEYSTONE;
    var$2[22] = cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_1;
    var$2[23] = cprnm_RandomSeedType_SHRINE_WOODEN_MAJOR_2;
    var$2[24] = cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_1;
    var$2[25] = cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_2;
    var$2[26] = cprnm_RandomSeedType_SHRINE_WOODEN_MINOR_3;
    var$2[27] = cprnm_RandomSeedType_SHRINE_STONE_DEFAULT;
    var$2[28] = cprnm_RandomSeedType_SHRINE_STONE_KEYSTONE;
    var$2[29] = cprnm_RandomSeedType_SHRINE_STONE_MAJOR_1;
    var$2[30] = cprnm_RandomSeedType_SHRINE_STONE_MAJOR_2;
    var$2[31] = cprnm_RandomSeedType_SHRINE_STONE_MINOR_1;
    var$2[32] = cprnm_RandomSeedType_SHRINE_STONE_MINOR_2;
    var$2[33] = cprnm_RandomSeedType_SHRINE_STONE_MINOR_3;
    var$2[34] = cprnm_RandomSeedType_SHRINE_CRYSTAL_KEYSTONE;
    var$2[35] = cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_1;
    var$2[36] = cprnm_RandomSeedType_SHRINE_CRYSTAL_MAJOR_2;
    var$2[37] = cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_1;
    var$2[38] = cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_2;
    var$2[39] = cprnm_RandomSeedType_SHRINE_CRYSTAL_MINOR_3;
    var$2[40] = cprnm_RandomSeedType_BOSS_PIT_LOOT;
    var$2[41] = cprnm_RandomSeedType_DIFFICULTY_MODE_LOOT;
    var$2[42] = cprnm_RandomSeedType_EXPEDITION_CHEST;
    var$2[43] = cprnm_RandomSeedType_CHEST_PURPLE_1;
    var$2[44] = cprnm_RandomSeedType_CHEST_PURPLE_10;
    var$2[45] = cprnm_RandomSeedType_CHEST_ORANGE_1;
    var$2[46] = cprnm_RandomSeedType_CHEST_ORANGE_10;
    cprnm_RandomSeedType_$VALUES = var$1;
    cprnm_RandomSeedType_values0 = cprnm_RandomSeedType_values();
},
cprnm_RandomSeedType__init_0 = (var$0, var$1, var$2) => {
    cprnm_RandomSeedType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_RandomSeedType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_RandomSeedType();
    cprnm_RandomSeedType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_RandomSeedType_values = () => {
    cprnm_RandomSeedType_$callClinit();
    return cprnm_RandomSeedType_$VALUES.$clone0();
},
jl_Math = $rt_classWithoutFields(),
jl_Math_log = var$1 => {
    return Math.log(var$1);
},
jl_Math_sqrt = var$1 => {
    return Math.sqrt(var$1);
},
jl_Math_ceil = var$1 => {
    return Math.ceil(var$1);
},
jl_Math_random = () => {
    return jl_Math_randomImpl();
},
jl_Math_randomImpl = () => {
    return Math.random();
},
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
cprnm_GuildRole = $rt_classWithoutFields(jl_Enum),
cprnm_GuildRole_$VALUES = null,
cprnm_GuildRole_CHAMPION = null,
cprnm_GuildRole_MEMBER = null,
cprnm_GuildRole_NONE = null,
cprnm_GuildRole_OFFICER = null,
cprnm_GuildRole_RULER = null,
cprnm_GuildRole_VETERAN = null,
cprnm_GuildRole_values0 = null,
cprnm_GuildRole_$callClinit = () => {
    cprnm_GuildRole_$callClinit = $rt_eraseClinit(cprnm_GuildRole);
    cprnm_GuildRole__clinit_();
},
cprnm_GuildRole__clinit_ = () => {
    let var$1, var$2;
    cprnm_GuildRole_MEMBER = cprnm_GuildRole__init_($rt_s(1768), 0);
    cprnm_GuildRole_RULER = cprnm_GuildRole__init_($rt_s(1769), 1);
    cprnm_GuildRole_OFFICER = cprnm_GuildRole__init_($rt_s(1770), 2);
    cprnm_GuildRole_CHAMPION = cprnm_GuildRole__init_($rt_s(1771), 3);
    cprnm_GuildRole_VETERAN = cprnm_GuildRole__init_($rt_s(1772), 4);
    cprnm_GuildRole_NONE = cprnm_GuildRole__init_($rt_s(1773), 5);
    var$1 = $rt_createArray(cprnm_GuildRole, 6);
    var$2 = var$1.data;
    var$2[0] = cprnm_GuildRole_MEMBER;
    var$2[1] = cprnm_GuildRole_RULER;
    var$2[2] = cprnm_GuildRole_OFFICER;
    var$2[3] = cprnm_GuildRole_CHAMPION;
    var$2[4] = cprnm_GuildRole_VETERAN;
    var$2[5] = cprnm_GuildRole_NONE;
    cprnm_GuildRole_$VALUES = var$1;
    cprnm_GuildRole_values0 = cprnm_GuildRole_values();
},
cprnm_GuildRole__init_0 = (var$0, var$1, var$2) => {
    cprnm_GuildRole_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_GuildRole__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_GuildRole();
    cprnm_GuildRole__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_GuildRole_values = () => {
    cprnm_GuildRole_$callClinit();
    return cprnm_GuildRole_$VALUES.$clone0();
};
function cprnm_Avatar() {
    let a = this; cpaa_i.call(a);
    a.$skin = null;
    a.$unit = null;
}
let cprnm_Avatar__init_0 = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1774));
    cprnm_UnitType_$callClinit();
    var$0.$unit = cprnm_UnitType_DEFAULT;
    cprnm_ItemType_$callClinit();
    var$0.$skin = cprnm_ItemType_DEFAULT;
},
cprnm_Avatar__init_ = () => {
    let var_0 = new cprnm_Avatar();
    cprnm_Avatar__init_0(var_0);
    return var_0;
},
cprgo_UserFlag = $rt_classWithoutFields(jl_Enum),
cprgo_UserFlag_$VALUES = null,
cprgo_UserFlag_AB_VIP5_FREE_CONSUMABLE_SHOULD_BE_GIVEN = null,
cprgo_UserFlag_BETA_0_2 = null,
cprgo_UserFlag_BETA_0_3 = null,
cprgo_UserFlag_BOSS_BATTLE_COUNT = null,
cprgo_UserFlag_BOSS_PIT_BATTLE_COUNT = null,
cprgo_UserFlag_CAMPAIGN_BATTLES_DONE = null,
cprgo_UserFlag_CAMPAIGN_KILLS = null,
cprgo_UserFlag_CAMPAIGN_UNLOCKED = null,
cprgo_UserFlag_CHATS = null,
cprgo_UserFlag_CHAT_APP_REWARD_SENT = null,
cprgo_UserFlag_COLISEUM_BATTLE_COUNT = null,
cprgo_UserFlag_COLISEUM_RUNS = null,
cprgo_UserFlag_COLISEUM_VICTORIES = null,
cprgo_UserFlag_COMMUNITY_BUTTON_SHOWN_NAME_CHANGE_PROMPT = null,
cprgo_UserFlag_CONTEST_PARTICIPATION_COUNT = null,
cprgo_UserFlag_CRYPT_BATTLE_COUNT = null,
cprgo_UserFlag_CRYPT_OPPONENTS_DEFEAT_COUNT = null,
cprgo_UserFlag_CRYPT_OPPONENT_HEROES_DEFEAT_COUNT = null,
cprgo_UserFlag_CRYPT_RAID_WIN_COUNT = null,
cprgo_UserFlag_ELITE_CAMPAIGN_BATTLES_DONE = null,
cprgo_UserFlag_EVENTS_WINDOW_ON_MAINSCREEN = null,
cprgo_UserFlag_EVENT_10_CHEST_ROLLS = null,
cprgo_UserFlag_EVENT_CHEST_ROLLS = null,
cprgo_UserFlag_EXPEDITION_BATTLE_COUNT = null,
cprgo_UserFlag_EXPEDITION_MAX_DIFFICULTY = null,
cprgo_UserFlag_EXPERT_CAMPAIGN_BATTLES_DONE = null,
cprgo_UserFlag_FACEBOOK_LIKED = null,
cprgo_UserFlag_FAILED_AN_EMPOWER = null,
cprgo_UserFlag_FIGHT_PIT_BATTLE_COUNT = null,
cprgo_UserFlag_FIGHT_PIT_VICTORIES = null,
cprgo_UserFlag_FREE_GOLD_CHEST_ROLLS = null,
cprgo_UserFlag_FREE_NAME_CHANGE = null,
cprgo_UserFlag_FREE_ORANGE_CHEST_ROLLS = null,
cprgo_UserFlag_FREE_PURPLE_CHEST_ROLLS = null,
cprgo_UserFlag_FREE_TIME_ZONE_RESET = null,
cprgo_UserFlag_GOLD_10_CHEST_ROLLS = null,
cprgo_UserFlag_GOLD_CHEST_ROLLS = null,
cprgo_UserFlag_GOT_TUTORIAL_RUNE = null,
cprgo_UserFlag_GOT_TUTORIAL_RUNE_OFFERING = null,
cprgo_UserFlag_HAS_NEW_MAINSCREEN_CONTEST_PROGRESS = null,
cprgo_UserFlag_HAS_SEEN_CONTEST_START = null,
cprgo_UserFlag_HAS_SKIN_FOR_TUTORIAL = null,
cprgo_UserFlag_HOW_TO_PLAY_EXPEDITION = null,
cprgo_UserFlag_HOW_TO_PLAY_VIP = null,
cprgo_UserFlag_IN_LAPSED_CATCH_UP_PERIOD = null,
cprgo_UserFlag_IS_RUNE_TOGGLE_ON = null;
let cprgo_UserFlag_L15_RUNES_CREATED = null,
cprgo_UserFlag_LAST_CRYPT_SCORE = null,
cprgo_UserFlag_MERCENARY_GOLD = null,
cprgo_UserFlag_MONTHLY_DIAMOND_DAYS = null,
cprgo_UserFlag_MONTHLY_PURCHASE = null,
cprgo_UserFlag_NEW_CHEST_SEEDS = null,
cprgo_UserFlag_NOT_FIRST_ACCOUNT = null,
cprgo_UserFlag_NO_LOOT_LAST_BATTLE = null,
cprgo_UserFlag_OPTED_OUT_OF_WAR = null,
cprgo_UserFlag_ORANGE_10_CHEST_ROLLS = null,
cprgo_UserFlag_ORANGE_CHEST_ROLLS = null,
cprgo_UserFlag_PAID_SOUL_CHEST_ROLLS = null,
cprgo_UserFlag_PROMO_CODE_ATTEMPTS = null,
cprgo_UserFlag_PURPLE_10_CHEST_ROLLS = null,
cprgo_UserFlag_PURPLE_CHEST_ROLLS = null,
cprgo_UserFlag_REPLAYKIT_COUNT = null,
cprgo_UserFlag_SILVER_10_CHEST_ROLLS = null,
cprgo_UserFlag_SILVER_CHEST_ROLLS = null,
cprgo_UserFlag_SOUL_CHEST_ROLLS = null,
cprgo_UserFlag_TEMPLE_INVITES = null,
cprgo_UserFlag_TEMPLE_STAMINA_MEMORY = null,
cprgo_UserFlag_TEMPLE_WIN_COUNT = null,
cprgo_UserFlag_TEMPLE_WIN_STREAK = null,
cprgo_UserFlag_TEMPROARY_VIP_LEVEL = null,
cprgo_UserFlag_TITANS_KILLED = null,
cprgo_UserFlag_TUTORIAL_RIGGED_RUNE_SHRINE = null,
cprgo_UserFlag_UNLOCKED_HARD_EXPEDITION = null,
cprgo_UserFlag_VIEWED_BATTLE_STATS = null,
cprgo_UserFlag_VIEWED_CRYPT_RESULTS = null,
cprgo_UserFlag_VIEWED_LAST_CHANCE_PROMO_WINDOW = null,
cprgo_UserFlag_VIEWED_SOULMART_INFO = null,
cprgo_UserFlag_VIP_TICKET_FIXED = null,
cprgo_UserFlag_WAR_ATTACK_ATTEMPTS = null,
cprgo_UserFlag_WW_1_0 = null,
cprgo_UserFlag_$callClinit = () => {
    cprgo_UserFlag_$callClinit = $rt_eraseClinit(cprgo_UserFlag);
    cprgo_UserFlag__clinit_();
},
cprgo_UserFlag__clinit_ = () => {
    let var$1, var$2;
    cprgo_UserFlag_SILVER_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1775), 0);
    cprgo_UserFlag_GOLD_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1776), 1);
    cprgo_UserFlag_SOUL_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1777), 2);
    cprgo_UserFlag_PURPLE_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1778), 3);
    cprgo_UserFlag_ORANGE_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1779), 4);
    cprgo_UserFlag_CAMPAIGN_BATTLES_DONE = cprgo_UserFlag__init_($rt_s(1780), 5);
    cprgo_UserFlag_ELITE_CAMPAIGN_BATTLES_DONE = cprgo_UserFlag__init_($rt_s(1781), 6);
    cprgo_UserFlag_CAMPAIGN_UNLOCKED = cprgo_UserFlag__init_($rt_s(1782), 7);
    cprgo_UserFlag_MONTHLY_DIAMOND_DAYS = cprgo_UserFlag__init_($rt_s(1783), 8);
    cprgo_UserFlag_FREE_NAME_CHANGE = cprgo_UserFlag__init_($rt_s(1784), 9);
    cprgo_UserFlag_FIGHT_PIT_VICTORIES = cprgo_UserFlag__init_($rt_s(1785), 10);
    cprgo_UserFlag_CAMPAIGN_KILLS = cprgo_UserFlag__init_($rt_s(1786), 11);
    cprgo_UserFlag_MERCENARY_GOLD = cprgo_UserFlag__init_($rt_s(1787), 12);
    cprgo_UserFlag_BETA_0_2 = cprgo_UserFlag__init_($rt_s(1788), 13);
    cprgo_UserFlag_NO_LOOT_LAST_BATTLE = cprgo_UserFlag__init_($rt_s(1789), 14);
    cprgo_UserFlag_BETA_0_3 = cprgo_UserFlag__init_($rt_s(1790), 15);
    cprgo_UserFlag_WW_1_0 = cprgo_UserFlag__init_($rt_s(1791), 16);
    cprgo_UserFlag_SILVER_10_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1792), 17);
    cprgo_UserFlag_GOLD_10_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1793), 18);
    cprgo_UserFlag_PURPLE_10_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1794), 19);
    cprgo_UserFlag_ORANGE_10_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1795), 20);
    cprgo_UserFlag_CHATS = cprgo_UserFlag__init_($rt_s(1796), 21);
    cprgo_UserFlag_LAST_CRYPT_SCORE = cprgo_UserFlag__init_($rt_s(1797), 22);
    cprgo_UserFlag_EVENT_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1798), 23);
    cprgo_UserFlag_EVENT_10_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1799), 24);
    cprgo_UserFlag_COLISEUM_RUNS = cprgo_UserFlag__init_($rt_s(1800), 25);
    cprgo_UserFlag_COLISEUM_VICTORIES = cprgo_UserFlag__init_($rt_s(1801), 26);
    cprgo_UserFlag_FREE_TIME_ZONE_RESET = cprgo_UserFlag__init_($rt_s(1802), 27);
    cprgo_UserFlag_UNLOCKED_HARD_EXPEDITION = cprgo_UserFlag__init_($rt_s(1803), 28);
    cprgo_UserFlag_FACEBOOK_LIKED = cprgo_UserFlag__init_($rt_s(1804), 29);
    cprgo_UserFlag_HOW_TO_PLAY_EXPEDITION = cprgo_UserFlag__init_($rt_s(1805), 30);
    cprgo_UserFlag_HOW_TO_PLAY_VIP = cprgo_UserFlag__init_($rt_s(1806), 31);
    cprgo_UserFlag_VIEWED_CRYPT_RESULTS = cprgo_UserFlag__init_($rt_s(1807), 32);
    cprgo_UserFlag_TITANS_KILLED = cprgo_UserFlag__init_($rt_s(1808), 33);
    cprgo_UserFlag_TEMPLE_INVITES = cprgo_UserFlag__init_($rt_s(1809), 34);
    cprgo_UserFlag_TEMPLE_STAMINA_MEMORY = cprgo_UserFlag__init_($rt_s(1810), 35);
    cprgo_UserFlag_TEMPLE_WIN_STREAK = cprgo_UserFlag__init_($rt_s(1811), 36);
    cprgo_UserFlag_NEW_CHEST_SEEDS = cprgo_UserFlag__init_($rt_s(1812), 37);
    cprgo_UserFlag_REPLAYKIT_COUNT = cprgo_UserFlag__init_($rt_s(1813), 38);
    cprgo_UserFlag_NOT_FIRST_ACCOUNT = cprgo_UserFlag__init_($rt_s(1814), 39);
    cprgo_UserFlag_PROMO_CODE_ATTEMPTS = cprgo_UserFlag__init_($rt_s(1815), 40);
    cprgo_UserFlag_VIEWED_LAST_CHANCE_PROMO_WINDOW = cprgo_UserFlag__init_($rt_s(1816), 41);
    cprgo_UserFlag_PAID_SOUL_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1817), 42);
    cprgo_UserFlag_VIEWED_SOULMART_INFO = cprgo_UserFlag__init_($rt_s(1818), 43);
    cprgo_UserFlag_FREE_GOLD_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1819), 44);
    cprgo_UserFlag_FREE_PURPLE_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1820), 45);
    cprgo_UserFlag_FREE_ORANGE_CHEST_ROLLS = cprgo_UserFlag__init_($rt_s(1821), 46);
    cprgo_UserFlag_TEMPROARY_VIP_LEVEL = cprgo_UserFlag__init_($rt_s(1822), 47);
    cprgo_UserFlag_VIEWED_BATTLE_STATS = cprgo_UserFlag__init_($rt_s(1823), 48);
    cprgo_UserFlag_L15_RUNES_CREATED = cprgo_UserFlag__init_($rt_s(1824), 49);
    cprgo_UserFlag_GOT_TUTORIAL_RUNE = cprgo_UserFlag__init_($rt_s(1825), 50);
    cprgo_UserFlag_OPTED_OUT_OF_WAR = cprgo_UserFlag__init_($rt_s(1826), 51);
    cprgo_UserFlag_WAR_ATTACK_ATTEMPTS = cprgo_UserFlag__init_($rt_s(1827), 52);
    cprgo_UserFlag_GOT_TUTORIAL_RUNE_OFFERING = cprgo_UserFlag__init_($rt_s(1828), 53);
    cprgo_UserFlag_TUTORIAL_RIGGED_RUNE_SHRINE = cprgo_UserFlag__init_($rt_s(1829), 54);
    cprgo_UserFlag_FAILED_AN_EMPOWER = cprgo_UserFlag__init_($rt_s(1830), 55);
    cprgo_UserFlag_MONTHLY_PURCHASE = cprgo_UserFlag__init_($rt_s(1831), 56);
    cprgo_UserFlag_HAS_SEEN_CONTEST_START = cprgo_UserFlag__init_($rt_s(1832), 57);
    cprgo_UserFlag_HAS_NEW_MAINSCREEN_CONTEST_PROGRESS = cprgo_UserFlag__init_($rt_s(1833), 58);
    cprgo_UserFlag_IS_RUNE_TOGGLE_ON = cprgo_UserFlag__init_($rt_s(1834), 59);
    cprgo_UserFlag_CHAT_APP_REWARD_SENT = cprgo_UserFlag__init_($rt_s(1835), 60);
    cprgo_UserFlag_IN_LAPSED_CATCH_UP_PERIOD = cprgo_UserFlag__init_($rt_s(1836), 61);
    cprgo_UserFlag_COMMUNITY_BUTTON_SHOWN_NAME_CHANGE_PROMPT = cprgo_UserFlag__init_($rt_s(1837), 62);
    cprgo_UserFlag_EVENTS_WINDOW_ON_MAINSCREEN = cprgo_UserFlag__init_($rt_s(1838), 63);
    cprgo_UserFlag_HAS_SKIN_FOR_TUTORIAL = cprgo_UserFlag__init_($rt_s(1839), 64);
    cprgo_UserFlag_AB_VIP5_FREE_CONSUMABLE_SHOULD_BE_GIVEN = cprgo_UserFlag__init_($rt_s(1840), 65);
    cprgo_UserFlag_EXPEDITION_MAX_DIFFICULTY = cprgo_UserFlag__init_($rt_s(1841), 66);
    cprgo_UserFlag_VIP_TICKET_FIXED = cprgo_UserFlag__init_($rt_s(1842), 67);
    cprgo_UserFlag_FIGHT_PIT_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1843), 68);
    cprgo_UserFlag_COLISEUM_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1844), 69);
    cprgo_UserFlag_CRYPT_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1845), 70);
    cprgo_UserFlag_CRYPT_RAID_WIN_COUNT = cprgo_UserFlag__init_($rt_s(1846), 71);
    cprgo_UserFlag_CRYPT_OPPONENTS_DEFEAT_COUNT = cprgo_UserFlag__init_($rt_s(1847), 72);
    cprgo_UserFlag_CRYPT_OPPONENT_HEROES_DEFEAT_COUNT = cprgo_UserFlag__init_($rt_s(1848), 73);
    cprgo_UserFlag_EXPEDITION_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1849), 74);
    cprgo_UserFlag_BOSS_PIT_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1850), 75);
    cprgo_UserFlag_TEMPLE_WIN_COUNT = cprgo_UserFlag__init_($rt_s(1851), 76);
    cprgo_UserFlag_CONTEST_PARTICIPATION_COUNT = cprgo_UserFlag__init_($rt_s(1852), 77);
    cprgo_UserFlag_BOSS_BATTLE_COUNT = cprgo_UserFlag__init_($rt_s(1853), 78);
    cprgo_UserFlag_EXPERT_CAMPAIGN_BATTLES_DONE = cprgo_UserFlag__init_($rt_s(1854), 79);
    var$1 = $rt_createArray(cprgo_UserFlag, 80);
    var$2 = var$1.data;
    var$2[0] = cprgo_UserFlag_SILVER_CHEST_ROLLS;
    var$2[1] = cprgo_UserFlag_GOLD_CHEST_ROLLS;
    var$2[2] = cprgo_UserFlag_SOUL_CHEST_ROLLS;
    var$2[3] = cprgo_UserFlag_PURPLE_CHEST_ROLLS;
    var$2[4] = cprgo_UserFlag_ORANGE_CHEST_ROLLS;
    var$2[5] = cprgo_UserFlag_CAMPAIGN_BATTLES_DONE;
    var$2[6] = cprgo_UserFlag_ELITE_CAMPAIGN_BATTLES_DONE;
    var$2[7] = cprgo_UserFlag_CAMPAIGN_UNLOCKED;
    var$2[8] = cprgo_UserFlag_MONTHLY_DIAMOND_DAYS;
    var$2[9] = cprgo_UserFlag_FREE_NAME_CHANGE;
    var$2[10] = cprgo_UserFlag_FIGHT_PIT_VICTORIES;
    var$2[11] = cprgo_UserFlag_CAMPAIGN_KILLS;
    var$2[12] = cprgo_UserFlag_MERCENARY_GOLD;
    var$2[13] = cprgo_UserFlag_BETA_0_2;
    var$2[14] = cprgo_UserFlag_NO_LOOT_LAST_BATTLE;
    var$2[15] = cprgo_UserFlag_BETA_0_3;
    var$2[16] = cprgo_UserFlag_WW_1_0;
    var$2[17] = cprgo_UserFlag_SILVER_10_CHEST_ROLLS;
    var$2[18] = cprgo_UserFlag_GOLD_10_CHEST_ROLLS;
    var$2[19] = cprgo_UserFlag_PURPLE_10_CHEST_ROLLS;
    var$2[20] = cprgo_UserFlag_ORANGE_10_CHEST_ROLLS;
    var$2[21] = cprgo_UserFlag_CHATS;
    var$2[22] = cprgo_UserFlag_LAST_CRYPT_SCORE;
    var$2[23] = cprgo_UserFlag_EVENT_CHEST_ROLLS;
    var$2[24] = cprgo_UserFlag_EVENT_10_CHEST_ROLLS;
    var$2[25] = cprgo_UserFlag_COLISEUM_RUNS;
    var$2[26] = cprgo_UserFlag_COLISEUM_VICTORIES;
    var$2[27] = cprgo_UserFlag_FREE_TIME_ZONE_RESET;
    var$2[28] = cprgo_UserFlag_UNLOCKED_HARD_EXPEDITION;
    var$2[29] = cprgo_UserFlag_FACEBOOK_LIKED;
    var$2[30] = cprgo_UserFlag_HOW_TO_PLAY_EXPEDITION;
    var$2[31] = cprgo_UserFlag_HOW_TO_PLAY_VIP;
    var$2[32] = cprgo_UserFlag_VIEWED_CRYPT_RESULTS;
    var$2[33] = cprgo_UserFlag_TITANS_KILLED;
    var$2[34] = cprgo_UserFlag_TEMPLE_INVITES;
    var$2[35] = cprgo_UserFlag_TEMPLE_STAMINA_MEMORY;
    var$2[36] = cprgo_UserFlag_TEMPLE_WIN_STREAK;
    var$2[37] = cprgo_UserFlag_NEW_CHEST_SEEDS;
    var$2[38] = cprgo_UserFlag_REPLAYKIT_COUNT;
    var$2[39] = cprgo_UserFlag_NOT_FIRST_ACCOUNT;
    var$2[40] = cprgo_UserFlag_PROMO_CODE_ATTEMPTS;
    var$2[41] = cprgo_UserFlag_VIEWED_LAST_CHANCE_PROMO_WINDOW;
    var$2[42] = cprgo_UserFlag_PAID_SOUL_CHEST_ROLLS;
    var$2[43] = cprgo_UserFlag_VIEWED_SOULMART_INFO;
    var$2[44] = cprgo_UserFlag_FREE_GOLD_CHEST_ROLLS;
    var$2[45] = cprgo_UserFlag_FREE_PURPLE_CHEST_ROLLS;
    var$2[46] = cprgo_UserFlag_FREE_ORANGE_CHEST_ROLLS;
    var$2[47] = cprgo_UserFlag_TEMPROARY_VIP_LEVEL;
    var$2[48] = cprgo_UserFlag_VIEWED_BATTLE_STATS;
    var$2[49] = cprgo_UserFlag_L15_RUNES_CREATED;
    var$2[50] = cprgo_UserFlag_GOT_TUTORIAL_RUNE;
    var$2[51] = cprgo_UserFlag_OPTED_OUT_OF_WAR;
    var$2[52] = cprgo_UserFlag_WAR_ATTACK_ATTEMPTS;
    var$2[53] = cprgo_UserFlag_GOT_TUTORIAL_RUNE_OFFERING;
    var$2[54] = cprgo_UserFlag_TUTORIAL_RIGGED_RUNE_SHRINE;
    var$2[55] = cprgo_UserFlag_FAILED_AN_EMPOWER;
    var$2[56] = cprgo_UserFlag_MONTHLY_PURCHASE;
    var$2[57] = cprgo_UserFlag_HAS_SEEN_CONTEST_START;
    var$2[58] = cprgo_UserFlag_HAS_NEW_MAINSCREEN_CONTEST_PROGRESS;
    var$2[59] = cprgo_UserFlag_IS_RUNE_TOGGLE_ON;
    var$2[60] = cprgo_UserFlag_CHAT_APP_REWARD_SENT;
    var$2[61] = cprgo_UserFlag_IN_LAPSED_CATCH_UP_PERIOD;
    var$2[62] = cprgo_UserFlag_COMMUNITY_BUTTON_SHOWN_NAME_CHANGE_PROMPT;
    var$2[63] = cprgo_UserFlag_EVENTS_WINDOW_ON_MAINSCREEN;
    var$2[64] = cprgo_UserFlag_HAS_SKIN_FOR_TUTORIAL;
    var$2[65] = cprgo_UserFlag_AB_VIP5_FREE_CONSUMABLE_SHOULD_BE_GIVEN;
    var$2[66] = cprgo_UserFlag_EXPEDITION_MAX_DIFFICULTY;
    var$2[67] = cprgo_UserFlag_VIP_TICKET_FIXED;
    var$2[68] = cprgo_UserFlag_FIGHT_PIT_BATTLE_COUNT;
    var$2[69] = cprgo_UserFlag_COLISEUM_BATTLE_COUNT;
    var$2[70] = cprgo_UserFlag_CRYPT_BATTLE_COUNT;
    var$2[71] = cprgo_UserFlag_CRYPT_RAID_WIN_COUNT;
    var$2[72] = cprgo_UserFlag_CRYPT_OPPONENTS_DEFEAT_COUNT;
    var$2[73] = cprgo_UserFlag_CRYPT_OPPONENT_HEROES_DEFEAT_COUNT;
    var$2[74] = cprgo_UserFlag_EXPEDITION_BATTLE_COUNT;
    var$2[75] = cprgo_UserFlag_BOSS_PIT_BATTLE_COUNT;
    var$2[76] = cprgo_UserFlag_TEMPLE_WIN_COUNT;
    var$2[77] = cprgo_UserFlag_CONTEST_PARTICIPATION_COUNT;
    var$2[78] = cprgo_UserFlag_BOSS_BATTLE_COUNT;
    var$2[79] = cprgo_UserFlag_EXPERT_CAMPAIGN_BATTLES_DONE;
    cprgo_UserFlag_$VALUES = var$1;
},
cprgo_UserFlag__init_0 = (var$0, var$1, var$2) => {
    cprgo_UserFlag_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprgo_UserFlag__init_ = (var_0, var_1) => {
    let var_2 = new cprgo_UserFlag();
    cprgo_UserFlag__init_0(var_2, var_0, var_1);
    return var_2;
},
cprgo_UserFlag_values = () => {
    cprgo_UserFlag_$callClinit();
    return cprgo_UserFlag_$VALUES.$clone0();
},
cprt_PlayingSoundAccessor = $rt_classWithoutFields(),
cprt_PlayingSoundAccessor_$assertionsDisabled = 0,
cprt_PlayingSoundAccessor_$callClinit = () => {
    cprt_PlayingSoundAccessor_$callClinit = $rt_eraseClinit(cprt_PlayingSoundAccessor);
    cprt_PlayingSoundAccessor__clinit_();
},
cprt_PlayingSoundAccessor__clinit_ = () => {
    cprt_PlayingSoundAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_PlayingSoundAccessor)) ? 0 : 1;
},
cprt_PlayingSoundAccessor__init_ = var$0 => {
    cprt_PlayingSoundAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_PlayingSoundAccessor__init_0 = () => {
    let var_0 = new cprt_PlayingSoundAccessor();
    cprt_PlayingSoundAccessor__init_(var_0);
    return var_0;
};
function cpaa_l() {
    jl_Enum.call(this);
    this.$c5 = 0;
}
let cpaa_l_a = null,
cpaa_l_b = null,
cpaa_l_d = null,
cpaa_l_$callClinit = () => {
    cpaa_l_$callClinit = $rt_eraseClinit(cpaa_l);
    cpaa_l__clinit_();
},
cpaa_l__clinit_ = () => {
    let var$1, var$2;
    cpaa_l_a = cpaa_l__init_($rt_s(1855), 0, 42);
    cpaa_l_b = cpaa_l__init_($rt_s(1856), 1, 43);
    var$1 = $rt_createArray(cpaa_l, 2);
    var$2 = var$1.data;
    var$2[0] = cpaa_l_a;
    var$2[1] = cpaa_l_b;
    cpaa_l_d = var$1;
},
cpaa_l__init_0 = (var$0, var$1, var$2, var$3) => {
    cpaa_l_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
    var$0.$c5 = var$3;
},
cpaa_l__init_ = (var_0, var_1, var_2) => {
    let var_3 = new cpaa_l();
    cpaa_l__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
cpaa_l_values = () => {
    cpaa_l_$callClinit();
    return cpaa_l_d.$clone0();
},
cbgu_a$1 = $rt_classWithoutFields(cbgu_ac),
cbgu_a$1__init_ = (var$0, var$1, var$2) => {
    cbgu_ac__init_(var$0, 4, 16);
},
cbgu_a$1__init_0 = (var_0, var_1) => {
    let var_2 = new cbgu_a$1();
    cbgu_a$1__init_(var_2, var_0, var_1);
    return var_2;
},
cpruwc_IProgressBar = $rt_classWithoutFields(0),
cprnm_ChatRoomType = $rt_classWithoutFields(jl_Enum),
cprnm_ChatRoomType_$VALUES = null,
cprnm_ChatRoomType_GLOBAL = null,
cprnm_ChatRoomType_GUILD = null,
cprnm_ChatRoomType_GUILD_WALL = null,
cprnm_ChatRoomType_HERO_WALL = null,
cprnm_ChatRoomType_PERSONAL_MESSAGE = null,
cprnm_ChatRoomType_VIP = null,
cprnm_ChatRoomType_values0 = null,
cprnm_ChatRoomType_$callClinit = () => {
    cprnm_ChatRoomType_$callClinit = $rt_eraseClinit(cprnm_ChatRoomType);
    cprnm_ChatRoomType__clinit_();
},
cprnm_ChatRoomType__clinit_ = () => {
    let var$1, var$2;
    cprnm_ChatRoomType_GLOBAL = cprnm_ChatRoomType__init_($rt_s(1857), 0);
    cprnm_ChatRoomType_GUILD = cprnm_ChatRoomType__init_($rt_s(1595), 1);
    cprnm_ChatRoomType_HERO_WALL = cprnm_ChatRoomType__init_($rt_s(1858), 2);
    cprnm_ChatRoomType_VIP = cprnm_ChatRoomType__init_($rt_s(1589), 3);
    cprnm_ChatRoomType_GUILD_WALL = cprnm_ChatRoomType__init_($rt_s(1859), 4);
    cprnm_ChatRoomType_PERSONAL_MESSAGE = cprnm_ChatRoomType__init_($rt_s(1860), 5);
    var$1 = $rt_createArray(cprnm_ChatRoomType, 6);
    var$2 = var$1.data;
    var$2[0] = cprnm_ChatRoomType_GLOBAL;
    var$2[1] = cprnm_ChatRoomType_GUILD;
    var$2[2] = cprnm_ChatRoomType_HERO_WALL;
    var$2[3] = cprnm_ChatRoomType_VIP;
    var$2[4] = cprnm_ChatRoomType_GUILD_WALL;
    var$2[5] = cprnm_ChatRoomType_PERSONAL_MESSAGE;
    cprnm_ChatRoomType_$VALUES = var$1;
    cprnm_ChatRoomType_values0 = cprnm_ChatRoomType_values();
},
cprnm_ChatRoomType__init_0 = (var$0, var$1, var$2) => {
    cprnm_ChatRoomType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_ChatRoomType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_ChatRoomType();
    cprnm_ChatRoomType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_ChatRoomType_values = () => {
    cprnm_ChatRoomType_$callClinit();
    return cprnm_ChatRoomType_$VALUES.$clone0();
},
cprge_EventHelper = $rt_classWithoutFields(),
cprge_EventHelper_EVENTS = null,
cprge_EventHelper_LISTENERS_BY_EVENT_TYPE = null,
cprge_EventHelper_LISTENERS_BY_ID = null,
cprge_EventHelper_SOURCE_LISTENERS = null,
cprge_EventHelper_inTransaction = 0,
cprge_EventHelper_$callClinit = () => {
    cprge_EventHelper_$callClinit = $rt_eraseClinit(cprge_EventHelper);
    cprge_EventHelper__clinit_();
},
cprge_EventHelper__clinit_ = () => {
    cprge_EventHelper_SOURCE_LISTENERS = ju_WeakHashMap__init_1();
    cprge_EventHelper_LISTENERS_BY_EVENT_TYPE = juc_ConcurrentHashMap__init_2();
    cprge_EventHelper_LISTENERS_BY_ID = juc_ConcurrentHashMap__init_2();
    cprge_EventHelper_EVENTS = ju_LinkedList__init_();
    cprge_EventHelper_inTransaction = 0;
},
cprge_EventHelper_clearAll = () => {
    cprge_EventHelper_$callClinit();
    cprge_EventHelper_LISTENERS_BY_EVENT_TYPE.$clear();
    cprge_EventHelper_LISTENERS_BY_ID.$clear();
    cprge_EventHelper_EVENTS.$clear();
    cprge_EventHelper_inTransaction = 0;
},
cprt_ScrollPaneAccessor = $rt_classWithoutFields(),
cprt_ScrollPaneAccessor_$assertionsDisabled = 0,
cprt_ScrollPaneAccessor_$callClinit = () => {
    cprt_ScrollPaneAccessor_$callClinit = $rt_eraseClinit(cprt_ScrollPaneAccessor);
    cprt_ScrollPaneAccessor__clinit_();
},
cprt_ScrollPaneAccessor__clinit_ = () => {
    cprt_ScrollPaneAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_ScrollPaneAccessor)) ? 0 : 1;
},
cprt_ScrollPaneAccessor__init_ = var$0 => {
    cprt_ScrollPaneAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_ScrollPaneAccessor__init_0 = () => {
    let var_0 = new cprt_ScrollPaneAccessor();
    cprt_ScrollPaneAccessor__init_(var_0);
    return var_0;
},
cpr_BuildOptions = $rt_classWithoutFields(),
cpr_BuildOptions_BUILD_TYPE = null,
cpr_BuildOptions_DESKTOP_DEVICE_NAME = null,
cpr_BuildOptions_SERVER_TYPE = null,
cpr_BuildOptions_TEST_ACCOUNT_NUMBER = null,
cpr_BuildOptions_TOOL_MODE = null,
cpr_BuildOptions_USE_EXTERNAL_ASSETS = 0,
cpr_BuildOptions_$callClinit = () => {
    cpr_BuildOptions_$callClinit = $rt_eraseClinit(cpr_BuildOptions);
    cpr_BuildOptions__clinit_();
},
cpr_BuildOptions__clinit_ = () => {
    cpr_BuildType_$callClinit();
    cpr_BuildOptions_BUILD_TYPE = cpr_BuildType_RELEASE;
    cpr_ServerType_$callClinit();
    cpr_BuildOptions_SERVER_TYPE = cpr_ServerType_LIVE;
    cpr_BuildOptions_USE_EXTERNAL_ASSETS = 1;
    cpr_BuildOptions_DESKTOP_DEVICE_NAME = null;
    cpr_BuildOptions_TEST_ACCOUNT_NUMBER = null;
    cpr_ToolType_$callClinit();
    cpr_BuildOptions_TOOL_MODE = cpr_ToolType_NONE;
};
function cpr_ServerType() {
    let a = this; jl_Enum.call(a);
    a.$contentLocation = null;
    a.$gameHost = null;
    a.$gamePort = 0;
}
let cpr_ServerType_$VALUES = null,
cpr_ServerType_DEV = null,
cpr_ServerType_LIVE = null,
cpr_ServerType_LOCAL = null,
cpr_ServerType_NONE = null,
cpr_ServerType_QA1 = null,
cpr_ServerType_QA2 = null,
cpr_ServerType_TRUNK = null,
cpr_ServerType_$callClinit = () => {
    cpr_ServerType_$callClinit = $rt_eraseClinit(cpr_ServerType);
    cpr_ServerType__clinit_();
},
cpr_ServerType__clinit_ = () => {
    let var$1, var$2;
    cpr_ServerType_NONE = cpr_ServerType__init_($rt_s(1773), 0, $rt_s(91), $rt_s(91), 0, $rt_s(91));
    cpr_ServerType_LOCAL = cpr_ServerType__init_($rt_s(1861), 1, $rt_s(1862), $rt_s(1863), 8080, $rt_s(1864));
    cpr_ServerType_TRUNK = cpr_ServerType__init_($rt_s(1865), 2, $rt_s(1866), $rt_s(1867), 8080, $rt_s(1868));
    cpr_ServerType_DEV = cpr_ServerType__init_($rt_s(1869), 3, $rt_s(1866), $rt_s(1870), 8080, $rt_s(1864));
    cpr_ServerType_QA1 = cpr_ServerType__init_($rt_s(1871), 4, $rt_s(1866), $rt_s(1872), 443, $rt_s(1873));
    cpr_ServerType_QA2 = cpr_ServerType__init_($rt_s(1874), 5, $rt_s(1866), $rt_s(1875), 443, $rt_s(1876));
    cpr_ServerType_LIVE = cpr_ServerType__init_($rt_s(1877), 6, $rt_s(1862), $rt_s(1878), 8080, $rt_s(1879));
    var$1 = $rt_createArray(cpr_ServerType, 7);
    var$2 = var$1.data;
    var$2[0] = cpr_ServerType_NONE;
    var$2[1] = cpr_ServerType_LOCAL;
    var$2[2] = cpr_ServerType_TRUNK;
    var$2[3] = cpr_ServerType_DEV;
    var$2[4] = cpr_ServerType_QA1;
    var$2[5] = cpr_ServerType_QA2;
    var$2[6] = cpr_ServerType_LIVE;
    cpr_ServerType_$VALUES = var$1;
},
cpr_ServerType__init_0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    cpr_ServerType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
    var$0.$gameHost = (((jl_StringBuilder__init_()).$append9(var$3)).$append9(var$4)).$toString();
    var$0.$gamePort = var$5;
    var$0.$contentLocation = var$6;
},
cpr_ServerType__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new cpr_ServerType();
    cpr_ServerType__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
cpr_ServerType_values = () => {
    cpr_ServerType_$callClinit();
    return cpr_ServerType_$VALUES.$clone0();
},
cpr_ServerType_getContentLocation = var$0 => {
    return var$0.$contentLocation;
};
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount0 = 0;
    a.$loadFactor1 = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_3 = $this => {
    ju_HashMap__init_1($this, 16);
},
ju_HashMap__init_0 = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_3(var_0);
    return var_0;
},
ju_HashMap__init_1 = ($this, $capacity) => {
    ju_HashMap__init_2($this, $capacity, 0.75);
},
ju_HashMap__init_ = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_1(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
},
ju_HashMap__init_2 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray0(var$3);
        $this.$loadFactor1 = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_HashMap__init_4 = (var_0, var_1) => {
    let var_2 = new ju_HashMap();
    ju_HashMap__init_2(var_2, var_0, var_1);
    return var_2;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor1 | 0;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))) {
        $m = $m.$next;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next;
    }
    return $m;
},
ju_HashMap_put = ($this, $key, $value) => {
    return ju_HashMap_putImpl($this, $key, $value);
},
ju_HashMap_putImpl = ($this, $key, $value) => {
    let $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = $key.$hashCode();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    }
    $result = $entry.$value;
    $entry.$value = $value;
    return $result;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    $entry.$next = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash = ($this, $capacity) => {
    let $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray0($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next;
            $entry.$next = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash0 = $this => {
    $this.$rehash0($this.$elementData.data.length);
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
};
function cprnm_BasicUserInfo() {
    let a = this; cpaa_i.call(a);
    a.$avatar0 = null;
    a.$creationTime = null;
    a.$guildID = null;
    a.$guildRole = null;
    a.$iD = null;
    a.$name3 = null;
    a.$oldAvatar0 = null;
    a.$previousName = null;
    a.$teamLevel = null;
    a.$userLastActive = null;
    a.$vIPLevel = null;
}
let cprnm_BasicUserInfo__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1880));
    var$0.$iD = jl_Long_valueOf(Long_ZERO);
    var$0.$name3 = $rt_s(91);
    var$0.$userLastActive = jl_Long_valueOf(Long_ZERO);
    var$0.$teamLevel = jl_Integer_valueOf(0);
    cprnm_UnitType_$callClinit();
    var$0.$oldAvatar0 = cprnm_UnitType_DEFAULT;
    var$0.$vIPLevel = jl_Integer_valueOf(0);
    var$0.$guildID = jl_Long_valueOf(Long_ZERO);
    cprnm_GuildRole_$callClinit();
    var$0.$guildRole = cprnm_GuildRole_MEMBER;
    var$0.$creationTime = jl_Long_valueOf(Long_ZERO);
    var$0.$avatar0 = cprnm_Avatar__init_();
    var$0.$previousName = $rt_s(91);
},
cprnm_BasicUserInfo__init_0 = () => {
    let var_0 = new cprnm_BasicUserInfo();
    cprnm_BasicUserInfo__init_(var_0);
    return var_0;
},
juca_AtomicReference = $rt_classWithoutFields(),
juca_AtomicReference__init_ = $this => {
    jl_Object__init_($this);
},
juca_AtomicReference__init_0 = () => {
    let var_0 = new juca_AtomicReference();
    juca_AtomicReference__init_(var_0);
    return var_0;
},
cprg_GenericEntityRenderable = $rt_classWithoutFields(cprg_EntityRenderable),
cpruwc_ProgressBarView = $rt_classWithoutFields(cbgssu_o);
function ju_WeakHashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$referenceQueue = null;
    a.$elementCount1 = 0;
    a.$elementData1 = null;
    a.$loadFactor0 = 0;
    a.$threshold0 = 0;
}
let ju_WeakHashMap_newEntryArray = $size => {
    return $rt_createArray(ju_WeakHashMap$Entry, $size);
},
ju_WeakHashMap__init_0 = $this => {
    ju_WeakHashMap__init_($this, 16);
},
ju_WeakHashMap__init_1 = () => {
    let var_0 = new ju_WeakHashMap();
    ju_WeakHashMap__init_0(var_0);
    return var_0;
},
ju_WeakHashMap__init_ = ($this, $capacity) => {
    ju_AbstractMap__init_($this);
    if ($capacity < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    $this.$elementCount1 = 0;
    if (!$capacity)
        $capacity = 1;
    $this.$elementData1 = ju_WeakHashMap_newEntryArray($capacity);
    $this.$loadFactor0 = 7500;
    ju_WeakHashMap_computeMaxSize($this);
    $this.$referenceQueue = jlr_ReferenceQueue__init_0();
},
ju_WeakHashMap__init_2 = var_0 => {
    let var_1 = new ju_WeakHashMap();
    ju_WeakHashMap__init_(var_1, var_0);
    return var_1;
},
ju_WeakHashMap_computeMaxSize = $this => {
    $this.$threshold0 = Long_lo(Long_div(Long_mul(Long_fromInt($this.$elementData1.data.length), Long_fromInt($this.$loadFactor0)), Long_fromInt(10000)));
};
function cprnm_GuildInfo() {
    let a = this; cpaa_i.call(a);
    a.$basicInfo = null;
    a.$birthdayPoints = null;
    a.$birthdayRank = null;
    a.$campaignKills = null;
    a.$country = null;
    a.$cryptDifficulty = null;
    a.$cryptMaxAttacks = null;
    a.$cryptRaidWins = null;
    a.$fightPitWins = null;
    a.$highestCryptDifficulty = null;
    a.$lastExtraCryptRaid = null;
    a.$memberCount = null;
    a.$minTeamLevel = null;
    a.$motto = null;
    a.$newMemberPolicy = null;
    a.$teamPower = null;
    a.$teamPowerRank = null;
    a.$timeZone0 = null;
    a.$totalPower = null;
    a.$totalPowerRank = null;
    a.$totalStars = null;
    a.$totalStarsRank = null;
}
let cprnm_GuildInfo__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1881));
    var$0.$basicInfo = cprnm_BasicGuildInfo__init_0();
    var$0.$memberCount = jl_Integer_valueOf(0);
    var$0.$motto = $rt_s(91);
    cprnm_GuildNewMemberPolicy_$callClinit();
    var$0.$newMemberPolicy = cprnm_GuildNewMemberPolicy_PRIVATE;
    var$0.$minTeamLevel = jl_Integer_valueOf(0);
    var$0.$country = $rt_s(91);
    var$0.$totalPower = jl_Integer_valueOf(0);
    var$0.$totalStars = jl_Integer_valueOf(0);
    var$0.$totalPowerRank = jl_Integer_valueOf(0);
    var$0.$totalStarsRank = jl_Integer_valueOf(0);
    var$0.$fightPitWins = jl_Integer_valueOf(0);
    var$0.$campaignKills = jl_Integer_valueOf(0);
    var$0.$teamPower = jl_Integer_valueOf(0);
    var$0.$teamPowerRank = jl_Integer_valueOf(0);
    var$0.$cryptRaidWins = jl_Integer_valueOf(0);
    var$0.$timeZone0 = $rt_s(91);
    var$0.$cryptDifficulty = jl_Integer_valueOf(0);
    var$0.$highestCryptDifficulty = jl_Integer_valueOf(0);
    var$0.$cryptMaxAttacks = jl_Integer_valueOf(0);
    var$0.$lastExtraCryptRaid = jl_Long_valueOf(Long_ZERO);
    var$0.$birthdayPoints = jl_Integer_valueOf(0);
    var$0.$birthdayRank = jl_Integer_valueOf(0);
},
cprnm_GuildInfo__init_0 = () => {
    let var_0 = new cprnm_GuildInfo();
    cprnm_GuildInfo__init_(var_0);
    return var_0;
};
function cprnm_IAPProducts() {
    cpaa_i.call(this);
    this.$products = null;
}
let cprnm_IAPProducts__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1882));
    var$0.$products = ju_ArrayList__init_(0);
},
cprnm_IAPProducts__init_0 = () => {
    let var_0 = new cprnm_IAPProducts();
    cprnm_IAPProducts__init_(var_0);
    return var_0;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_ = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_0 = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_1, var_0);
    return var_1;
};
function juc_TimeUnit() {
    jl_Enum.call(this);
    this.$nanoseconds = Long_ZERO;
}
let juc_TimeUnit_NANOSECONDS = null,
juc_TimeUnit_MICROSECONDS = null,
juc_TimeUnit_MILLISECONDS = null,
juc_TimeUnit_SECONDS = null,
juc_TimeUnit_MINUTES = null,
juc_TimeUnit_HOURS = null,
juc_TimeUnit_DAYS = null,
juc_TimeUnit_$VALUES = null,
juc_TimeUnit_$callClinit = () => {
    juc_TimeUnit_$callClinit = $rt_eraseClinit(juc_TimeUnit);
    juc_TimeUnit__clinit_();
},
juc_TimeUnit_values = () => {
    juc_TimeUnit_$callClinit();
    return juc_TimeUnit_$VALUES.$clone0();
},
juc_TimeUnit__init_0 = ($this, var$1, var$2, $nanoseconds) => {
    juc_TimeUnit_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$nanoseconds = $nanoseconds;
},
juc_TimeUnit__init_ = (var_0, var_1, var_2) => {
    let var_3 = new juc_TimeUnit();
    juc_TimeUnit__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
juc_TimeUnit_convert = ($this, $sourceDuration, $sourceUnit) => {
    let $sourceNanos, $targetNanos;
    $sourceNanos = $sourceUnit.$nanoseconds;
    $targetNanos = $this.$nanoseconds;
    if (Long_ge($sourceNanos, $targetNanos))
        return Long_mul($sourceDuration, Long_div($sourceNanos, $targetNanos));
    return Long_div($sourceDuration, Long_div($targetNanos, $sourceNanos));
},
juc_TimeUnit_toSeconds = ($this, $duration) => {
    juc_TimeUnit_$callClinit();
    return juc_TimeUnit_convert(juc_TimeUnit_SECONDS, $duration, $this);
},
juc_TimeUnit_$values = () => {
    let var$1, var$2;
    juc_TimeUnit_$callClinit();
    var$1 = $rt_createArray(juc_TimeUnit, 7);
    var$2 = var$1.data;
    var$2[0] = juc_TimeUnit_NANOSECONDS;
    var$2[1] = juc_TimeUnit_MICROSECONDS;
    var$2[2] = juc_TimeUnit_MILLISECONDS;
    var$2[3] = juc_TimeUnit_SECONDS;
    var$2[4] = juc_TimeUnit_MINUTES;
    var$2[5] = juc_TimeUnit_HOURS;
    var$2[6] = juc_TimeUnit_DAYS;
    return var$1;
},
juc_TimeUnit__clinit_ = () => {
    juc_TimeUnit_NANOSECONDS = juc_TimeUnit__init_($rt_s(1883), 0, Long_fromInt(1));
    juc_TimeUnit_MICROSECONDS = juc_TimeUnit__init_($rt_s(1884), 1, Long_fromInt(1000));
    juc_TimeUnit_MILLISECONDS = juc_TimeUnit__init_($rt_s(1885), 2, Long_fromInt(1000000));
    juc_TimeUnit_SECONDS = juc_TimeUnit__init_($rt_s(1886), 3, Long_fromInt(1000000000));
    juc_TimeUnit_MINUTES = juc_TimeUnit__init_($rt_s(1887), 4, Long_create(4165425152, 13));
    juc_TimeUnit_HOURS = juc_TimeUnit__init_($rt_s(1888), 5, Long_create(817405952, 838));
    juc_TimeUnit_DAYS = juc_TimeUnit__init_($rt_s(1889), 6, Long_create(2437873664, 20116));
    juc_TimeUnit_$VALUES = juc_TimeUnit_$values();
};
function otcit_FloatAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = 0;
    a.$exponent = 0;
    a.$sign = 0;
}
let otcit_FloatAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_FloatAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_(var_0);
    return var_0;
},
cprt_ProgressBarViewAccessor = $rt_classWithoutFields(),
cprt_ProgressBarViewAccessor_$assertionsDisabled = 0,
cprt_ProgressBarViewAccessor_$callClinit = () => {
    cprt_ProgressBarViewAccessor_$callClinit = $rt_eraseClinit(cprt_ProgressBarViewAccessor);
    cprt_ProgressBarViewAccessor__clinit_();
},
cprt_ProgressBarViewAccessor__clinit_ = () => {
    cprt_ProgressBarViewAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_ProgressBarViewAccessor)) ? 0 : 1;
},
cprt_ProgressBarViewAccessor__init_ = var$0 => {
    cprt_ProgressBarViewAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_ProgressBarViewAccessor__init_0 = () => {
    let var_0 = new cprt_ProgressBarViewAccessor();
    cprt_ProgressBarViewAccessor__init_(var_0);
    return var_0;
};
function cprnm_BasicGuildInfo() {
    let a = this; cpaa_i.call(a);
    a.$emblem = null;
    a.$iD0 = null;
    a.$name2 = null;
    a.$warBorder = null;
}
let cprnm_BasicGuildInfo__init_ = var$0 => {
    cpaa_i__init_(var$0, $rt_s(1890));
    var$0.$iD0 = jl_Long_valueOf(Long_ZERO);
    var$0.$name2 = $rt_s(91);
    cprnm_GuildEmblemType_$callClinit();
    var$0.$emblem = cprnm_GuildEmblemType_LUCKY_ORCS_FOOT;
    var$0.$warBorder = jl_Integer_valueOf(0);
},
cprnm_BasicGuildInfo__init_0 = () => {
    let var_0 = new cprnm_BasicGuildInfo();
    cprnm_BasicGuildInfo__init_(var_0);
    return var_0;
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections_emptyList = () => {
    ju_Collections_$callClinit();
    return ju_Collections_EMPTY_LIST;
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = ju_Collections$1__init_0();
    ju_Collections_EMPTY_MAP = ju_Collections$2__init_0();
    ju_Collections_EMPTY_LIST = ju_Collections$3__init_0();
    ju_Collections_EMPTY_ITERATOR = ju_Collections$4__init_0();
    ju_Collections_EMPTY_LIST_ITERATOR = ju_Collections$5__init_0();
    ju_Collections_reverseOrder = ju_Collections$_clinit_$lambda$_59_0__init_0();
},
cprt_SpriteAccessor = $rt_classWithoutFields(),
cprt_SpriteAccessor_$assertionsDisabled = 0,
cprt_SpriteAccessor_$callClinit = () => {
    cprt_SpriteAccessor_$callClinit = $rt_eraseClinit(cprt_SpriteAccessor);
    cprt_SpriteAccessor__clinit_();
},
cprt_SpriteAccessor__clinit_ = () => {
    cprt_SpriteAccessor_$assertionsDisabled = jl_Class_desiredAssertionStatus($rt_cls(cprt_SpriteAccessor)) ? 0 : 1;
},
cprt_SpriteAccessor__init_ = var$0 => {
    cprt_SpriteAccessor_$callClinit();
    jl_Object__init_(var$0);
},
cprt_SpriteAccessor__init_0 = () => {
    let var_0 = new cprt_SpriteAccessor();
    cprt_SpriteAccessor__init_(var_0);
    return var_0;
},
cpr_ToolType = $rt_classWithoutFields(jl_Enum),
cpr_ToolType_$VALUES = null,
cpr_ToolType_ANIMATION = null,
cpr_ToolType_COMBAT_AUTOMATOR = null,
cpr_ToolType_COMBAT_RENDER = null,
cpr_ToolType_COMBAT_SIMULATOR = null,
cpr_ToolType_COMBAT_SIMULATOR_RANDOM = null,
cpr_ToolType_NONE = null,
cpr_ToolType_$callClinit = () => {
    cpr_ToolType_$callClinit = $rt_eraseClinit(cpr_ToolType);
    cpr_ToolType__clinit_();
},
cpr_ToolType__clinit_ = () => {
    let var$1, var$2;
    cpr_ToolType_NONE = cpr_ToolType__init_($rt_s(1773), 0);
    cpr_ToolType_ANIMATION = cpr_ToolType__init_($rt_s(1891), 1);
    cpr_ToolType_COMBAT_SIMULATOR = cpr_ToolType__init_($rt_s(1892), 2);
    cpr_ToolType_COMBAT_RENDER = cpr_ToolType__init_($rt_s(1893), 3);
    cpr_ToolType_COMBAT_AUTOMATOR = cpr_ToolType__init_($rt_s(1894), 4);
    cpr_ToolType_COMBAT_SIMULATOR_RANDOM = cpr_ToolType__init_($rt_s(1895), 5);
    var$1 = $rt_createArray(cpr_ToolType, 6);
    var$2 = var$1.data;
    var$2[0] = cpr_ToolType_NONE;
    var$2[1] = cpr_ToolType_ANIMATION;
    var$2[2] = cpr_ToolType_COMBAT_SIMULATOR;
    var$2[3] = cpr_ToolType_COMBAT_RENDER;
    var$2[4] = cpr_ToolType_COMBAT_AUTOMATOR;
    var$2[5] = cpr_ToolType_COMBAT_SIMULATOR_RANDOM;
    cpr_ToolType_$VALUES = var$1;
},
cpr_ToolType__init_0 = (var$0, var$1, var$2) => {
    cpr_ToolType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cpr_ToolType__init_ = (var_0, var_1) => {
    let var_2 = new cpr_ToolType();
    cpr_ToolType__init_0(var_2, var_0, var_1);
    return var_2;
},
cpr_ToolType_values = () => {
    cpr_ToolType_$callClinit();
    return cpr_ToolType_$VALUES.$clone0();
};
$rt_packages([-1, "com", 0, "perblue", 1, "rpg", -1, "java", 3, "lang"
]);
$rt_metadata([jl_Object, "Object", 4, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$hashCode", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_), "$_init_0", $rt_wrapFunction1(jl_Exception__init_0)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0)],
cpr_NewRelicInstrumentation, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cpr_NewRelicInstrumentation__init_)],
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
cbgu_z, 0, jl_Object, [jl_Iterable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cbgu_z__init_0), "$a6", $rt_wrapFunction2(cbgu_z_a0), "$a5", $rt_wrapFunction0(cbgu_z_a1)],
cprgo_IEntity, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, ["$_init_2", $rt_wrapFunction1(jl_Integer__init_)],
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, ["$_init_3", $rt_wrapFunction1(jl_Long__init_)],
ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, jl_Thread_$callClinit, ["$_init_0", $rt_wrapFunction1(jl_Thread__init_0), "$_init_4", $rt_wrapFunction2(jl_Thread__init_), "$getStackTrace", $rt_wrapFunction0(jl_Thread_getStackTrace)],
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
juc_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, 0,
juc_ConcurrentHashMap$HashEntry, 0, juc_MapEntry, [], 0, 0, 0, 0, 0,
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, ["$_init_5", $rt_wrapFunction2(jl_Enum__init_), "$ordinal", $rt_wrapFunction0(jl_Enum_ordinal), "$equals", $rt_wrapFunction1(jl_Enum_equals), "$hashCode", $rt_wrapFunction0(jl_Enum_hashCode)],
cprnm_AppReviewStatus, 0, jl_Enum, [], 12, 3, 0, cprnm_AppReviewStatus_$callClinit, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_)],
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractSet__init_)],
ju_EnumSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_EnumSet__init_)],
cpaa_i, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(cpaa_i__init_)],
cprnm_TitanTempleSummary, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_TitanTempleSummary__init_)],
aa_e, 0, jl_Object, [], 3, 3, 0, 0, 0,
cprt_CombatTextLabelAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_CombatTextLabelAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_CombatTextLabelAccessor__init_)],
cprgo_IUser, 0, jl_Object, [], 3, 3, 0, 0, 0,
cprgo_User, 0, jl_Object, [cprgo_IUser], 0, 3, 0, cprgo_User_$callClinit, ["$_init_", $rt_wrapFunction0(cprgo_User__init_)],
cbgu_a, 0, jl_Object, [ju_Collection], 0, 3, 0, cbgu_a_$callClinit, ["$_init_", $rt_wrapFunction0(cbgu_a__init_1), "$_init_8", $rt_wrapFunction2(cbgu_a__init_0)],
cprnm_GuildNewMemberPolicy, 0, jl_Enum, [], 12, 3, 0, cprnm_GuildNewMemberPolicy_$callClinit, 0,
cprnm_TutorialActType, 0, jl_Enum, [], 12, 3, 0, cprnm_TutorialActType_$callClinit, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
aa_b, 0, jl_Object, [], 1, 0, 0, 0, ["$_init_9", $rt_wrapFunction2(aa_b__init_)],
aa_d$2, 0, aa_b, [], 4, 0, 0, 0, ["$_init_9", $rt_wrapFunction2(aa_d$2__init_)],
cprn_NetworkProvider, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_10", $rt_wrapFunction2(cprn_NetworkProvider__init_)],
cprn_EmptyNetworkProvider, 0, cprn_NetworkProvider, [], 0, 3, 0, cprn_EmptyNetworkProvider_$callClinit, ["$_init_", $rt_wrapFunction0(cprn_EmptyNetworkProvider__init_)],
cbgu_p, 0, jl_Object, [jl_Iterable], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cbgu_p__init_0)],
cprt_HexagonActorAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_HexagonActorAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_HexagonActorAccessor__init_)],
ju_GenericEnumSet, 0, ju_EnumSet, [], 0, 0, 0, 0, ["$_init_6", $rt_wrapFunction1(ju_GenericEnumSet__init_)],
cpch_a, 0, jl_Object, [], 1, 3, 0, cpch_a_$callClinit, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0]);
$rt_metadata([jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_118_0__init_)],
jlr_Reference, 0, jl_Object, [], 1, 3, 0, 0, 0,
jlr_WeakReference, 0, jlr_Reference, [], 0, 3, 0, 0, 0,
ju_WeakHashMap$Entry, 0, jlr_WeakReference, [ju_Map$Entry], 4, 0, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_2", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$_init_0", $rt_wrapFunction1(jl_AbstractStringBuilder__init_1), "$_init_11", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1),
"$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$append3", $rt_wrapFunction2(jl_AbstractStringBuilder_append4), "$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert3), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$append8", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$insert3", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert),
"$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_2), "$_init_0", $rt_wrapFunction1(jl_StringBuilder__init_1), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append9", $rt_wrapFunction1(jl_StringBuilder_append1), "$append1", $rt_wrapFunction1(jl_StringBuilder_append3), "$append2", $rt_wrapFunction1(jl_StringBuilder_append2), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert6", $rt_wrapFunction2(jl_StringBuilder_insert4),
"$insert4", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert7", $rt_wrapFunction2(jl_StringBuilder_insert0), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert2), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert6)],
cbgu_i, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ConcurrentModificationException__init_)],
aa_b$a, 0, jl_Object, [], 3, 3, 0, 0, 0,
aa_d$1, 0, jl_Object, [aa_b$a], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(aa_d$1__init_)],
cprgo_Entity, 0, jl_Object, [cprgo_IEntity], 1, 3, 0, 0, 0,
jur_RandomGenerator, 0, jl_Object, [], 3, 3, 0, 0, 0,
cbgu_ac, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_7", $rt_wrapFunction2(cbgu_ac__init_)],
cprnm_GuildEmblemType, 0, jl_Enum, [], 12, 3, 0, cprnm_GuildEmblemType_$callClinit, 0,
jl_ClassCastException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ClassCastException__init_)],
cprt_CoffinRenderableAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_CoffinRenderableAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_CoffinRenderableAccessor__init_)],
cbgss_b, 0, jl_Object, [], 0, 3, 0, 0, 0,
cbgssb_l, 0, jl_Object, [], 3, 3, 0, 0, 0,
cbgssu_n, 0, cbgss_b, [cbgssb_l], 0, 3, 0, 0, 0,
cbgssu_f, 0, cbgssu_n, [], 0, 3, 0, 0, 0,
cpcea_a, 0, cbgssu_f, [], 0, 3, 0, 0, 0,
cprg_Renderable2D, 0, jl_Object, [], 3, 3, 0, 0, 0,
cprt_GenericEntityRenderableAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_GenericEntityRenderableAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_GenericEntityRenderableAccessor__init_)],
cprg_BaseEntityRenderable, 0, jl_Object, [cprg_Renderable2D], 1, 3, 0, 0, 0,
cprg_CoffinRenderable, 0, cprg_BaseEntityRenderable, [], 0, 3, 0, 0, 0,
jl_StackTraceElement, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$getClassName", $rt_wrapFunction0(jl_StackTraceElement_getClassName)],
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
aa_h, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(aa_h__init_)],
cbggg_o, 0, jl_Object, [], 0, 3, 0, 0, 0,
aa_a, 0, jl_Object, [], 1, 3, 0, 0, 0,
aa_d, 0, aa_a, [], 4, 3, 0, aa_d_$callClinit, 0,
cbgssb_e, 0, jl_Object, [], 3, 3, 0, 0, 0,
cbgss_e, 0, cbgss_b, [cbgssb_e], 0, 3, 0, 0, 0,
cpruw_HexagonActor, 0, cbgss_e, [], 0, 3, 0, 0, 0,
cbggg_l, 0, cbggg_o, [], 0, 3, 0, 0, 0,
cprnm_UseItemEventType, 0, jl_Enum, [], 12, 3, 0, cprnm_UseItemEventType_$callClinit, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractMap__init_)],
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableMap__init_)],
cbg_c, 0, jl_Object, [], 3, 3, 0, 0, 0,
cbg_b, 0, jl_Object, [cbg_c], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cbg_b__init_)],
cpr_RPGMain, 0, cbg_b, [], 0, 3, 0, cpr_RPGMain_$callClinit, ["$_init_23", $rt_wrapFunction1(cpr_RPGMain__init_), "$_init_13", $rt_wrapFunction3(cpr_RPGMain__init_0)],
cbgg_b, 0, jl_Object, [], 0, 3, 0, cbgg_b_$callClinit, ["$_init_15", $rt_wrapFunction4(cbgg_b__init_1), "$_init_2", $rt_wrapFunction1(cbgg_b__init_2), "$a3", $rt_wrapFunction0(cbgg_b_a0)],
cprg_EntityRenderable, 0, cprg_BaseEntityRenderable, [], 1, 3, 0, 0, 0,
cbgg_c, 0, jl_Object, [], 4, 3, 0, cbgg_c_$callClinit, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0, 0,
ju_Date, 0, jl_Object, [jl_Comparable], 0, 3, 0, ju_Date_$callClinit, ["$_init_3", $rt_wrapFunction1(ju_Date__init_)],
cprnm_GameMode, 0, jl_Enum, [], 12, 3, 0, cprnm_GameMode_$callClinit, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_)]]);
$rt_metadata([cpr_BuildType, 0, jl_Enum, [], 12, 3, 0, cpr_BuildType_$callClinit, 0,
cprnm_ArenaTier, 0, jl_Enum, [], 12, 3, 0, cprnm_ArenaTier_$callClinit, 0,
ju_Random, 0, jl_Object, [jur_RandomGenerator, ji_Serializable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Random__init_), "$nextInt", $rt_wrapFunction0(ju_Random_nextInt), "$nextLong", $rt_wrapFunction0(ju_Random_nextLong), "$nextDouble", $rt_wrapFunction0(ju_Random_nextDouble)],
cpce_a, 0, jl_Object, [], 3, 3, 0, 0, 0,
cpr_UICommonHelper, 0, jl_Object, [cpce_a], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cpr_UICommonHelper__init_)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_DefaultUncaughtExceptionHandler__init_)],
otcir_FieldInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
cprnm_ResourceType, 0, jl_Enum, [], 12, 3, 0, cprnm_ResourceType_$callClinit, 0,
cprnm_UserExtra, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_UserExtra__init_)],
otji_JS, 0, jl_Object, [], 4, 3, 0, 0, 0,
cbgm_o, 0, jl_Object, [], 3, 3, 0, 0, 0,
juc_ConcurrentMap, 0, jl_Object, [ju_Map], 3, 3, 0, 0, 0,
juc_ConcurrentHashMap, 0, ju_AbstractMap, [juc_ConcurrentMap, jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(juc_ConcurrentHashMap_newElementArray), "$_init_", $rt_wrapFunction0(juc_ConcurrentHashMap__init_1), "$_init_2", $rt_wrapFunction1(juc_ConcurrentHashMap__init_0), "$_init_1", $rt_wrapFunction2(juc_ConcurrentHashMap__init_), "$clear", $rt_wrapFunction0(juc_ConcurrentHashMap_clear)],
cbgm_p, 0, jl_Object, [cbgm_o, ji_Serializable], 0, 3, 0, 0, 0,
cbgm_q, 0, jl_Object, [cbgm_o, ji_Serializable], 0, 3, 0, 0, 0,
cbgm_m, 0, ju_Random, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cbgm_m__init_), "$nextInt0", $rt_wrapFunction1(cbgm_m_nextInt), "$nextLong", $rt_wrapFunction0(cbgm_m_nextLong), "$setSeed", $rt_wrapFunction1(cbgm_m_setSeed)],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, ["$_init_17", $rt_wrapFunction2(ju_MapEntry__init_)],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, ["$_init_26", $rt_wrapFunction2(ju_HashMap$HashEntry__init_)],
cprnm_PPEEvent, 0, jl_Enum, [], 12, 3, 0, cprnm_PPEEvent_$callClinit, 0,
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
cprnm_UnitType, 0, jl_Enum, [], 12, 3, 0, cprnm_UnitType_$callClinit, 0,
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
cprgds_SocialDataManager, 0, jl_Object, [], 0, 3, 0, cprgds_SocialDataManager_$callClinit, ["$_init_", $rt_wrapFunction0(cprgds_SocialDataManager__init_)],
cbgssu_o, 0, cbgss_e, [cbgssb_l], 0, 3, 0, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_18", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 0, 3, 0, 0, ["$_init_19", $rt_wrapFunction3(ji_PrintStream__init_)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
juca_AtomicBoolean, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, ["$_init_14", $rt_wrapFunction1(juca_AtomicBoolean__init_)],
otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_HashSet__init_0), "$_init_20", $rt_wrapFunction1(ju_HashSet__init_)],
cprgo_Projectile, 0, cprgo_Entity, [], 0, 3, 0, 0, 0,
cprt_CombatManaBarAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_CombatManaBarAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_CombatManaBarAccessor__init_)],
cbgm_h, 0, jl_Object, [], 4, 3, 0, cbgm_h_$callClinit, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, 0,
cbgssu_i, 0, cbgssu_o, [], 0, 3, 0, 0, 0,
jl_Boolean, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, jl_Boolean_$callClinit, ["$_init_14", $rt_wrapFunction1(jl_Boolean__init_0)],
cbgssu_g, 0, cbgssu_o, [], 0, 3, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_), "$add", $rt_wrapFunction1(ju_AbstractList_add)],
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractSequentialList__init_), "$add0", $rt_wrapFunction2(ju_AbstractSequentialList_add)],
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_LinkedList__init_0), "$size", $rt_wrapFunction0(ju_LinkedList_size), "$clear", $rt_wrapFunction0(ju_LinkedList_clear), "$listIterator", $rt_wrapFunction1(ju_LinkedList_listIterator)]]);
$rt_metadata([cbgssu_j, 0, cbgssu_o, [], 0, 3, 0, 0, 0,
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStderrPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStderrPrintStream_print)],
otcit_FloatAnalyzer, 0, jl_Object, [], 4, 3, 0, otcit_FloatAnalyzer_$callClinit, 0,
cprnm_ItemType, 0, jl_Enum, [], 12, 3, 0, cprnm_ItemType_$callClinit, 0,
cprnm_HowToPlayDeckType, 0, jl_Enum, [], 12, 3, 0, cprnm_HowToPlayDeckType_$callClinit, 0,
cprnm_CooldownType, 0, jl_Enum, [], 12, 3, 0, cprnm_CooldownType_$callClinit, 0,
cbgb_b, 0, jl_Object, [cbgu_i], 3, 3, 0, 0, 0,
cprnm_HeroLineupType, 0, jl_Enum, [], 12, 3, 0, cprnm_HeroLineupType_$callClinit, 0,
otcir_MethodInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 4, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_Class_toString), "$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$isInterface", $rt_wrapFunction0(jl_Class_isInterface), "$desiredAssertionStatus", $rt_wrapFunction0(jl_Class_desiredAssertionStatus), "$getSuperclass", $rt_wrapFunction0(jl_Class_getSuperclass)],
cprt_ColorAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_ColorAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_ColorAccessor__init_)],
jl_Float, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Float_$callClinit, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
cprnm_TitanTempleSummaries, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_TitanTempleSummaries__init_)],
cprn_EmptyNetworkProvider$1, 0, jl_Object, [jl_Runnable], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(cprn_EmptyNetworkProvider$1__init_)],
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
cpru_Style, 0, jl_Object, [], 4, 3, 0, 0, 0,
cprnm_ExpeditionRunData, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_ExpeditionRunData__init_)],
cprt_MusicAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_MusicAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_MusicAccessor__init_)],
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$5__init_)],
ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_LinkedList$Entry__init_)],
DragonSoulLauncher, 0, jl_Object, [], 0, 3, 0, DragonSoulLauncher_$callClinit, 0,
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableList__init_)],
ju_Collections$3, 0, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$3__init_)],
ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$4__init_)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
cprnm_PrivateUserInfo, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_PrivateUserInfo__init_)],
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableSet__init_)],
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$1__init_)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$2__init_)],
cprnm_BossPitData, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_BossPitData__init_)],
ju_EnumMap, 0, ju_AbstractMap, [ji_Serializable, jl_Cloneable], 0, 3, 0, 0, ["$_init_6", $rt_wrapFunction1(ju_EnumMap__init_0), "$put0", $rt_wrapFunction2(ju_EnumMap_put), "$put", $rt_wrapFunction2(ju_EnumMap_put0)],
cprt_DFLabelAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_DFLabelAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_DFLabelAccessor__init_)],
cprnm_TimeType, 0, jl_Enum, [], 12, 3, 0, cprnm_TimeType_$callClinit, 0,
cprt_SkeletonAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_SkeletonAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_SkeletonAccessor__init_)],
otcir_ClassList, 0, jl_Object, [], 0, 3, 0, 0, 0,
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$_clinit_$lambda$_59_0__init_)],
cpruw_CombatManaBar, 0, cbgssu_i, [], 0, 3, 0, 0, 0,
cprt_EntityTweenAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_EntityTweenAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_EntityTweenAccessor__init_)],
oacl_LogFactory, 0, jl_Object, [], 0, 3, 0, oacl_LogFactory_$callClinit, ["$_init_", $rt_wrapFunction0(oacl_LogFactory__init_), "$getInstance", $rt_wrapFunction1(oacl_LogFactory_getInstance0), "$getInstance0", $rt_wrapFunction1(oacl_LogFactory_getInstance)],
cprnm_MerchantType, 0, jl_Enum, [], 12, 3, 0, cprnm_MerchantType_$callClinit, 0,
ces_Skeleton, 0, jl_Object, [], 0, 3, 0, 0, 0,
cpc_c, 0, jl_Object, [], 4, 3, 0, cpc_c_$callClinit, 0,
cbgu_ac$a, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_ReferenceQueue, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jlr_ReferenceQueue__init_)],
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_2), "$_init_2", $rt_wrapFunction1(ju_ArrayList__init_0)],
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, ["$_init_21", $rt_wrapFunction4(ju_LinkedList$SequentialListIterator__init_0), "$add1", $rt_wrapFunction1(ju_LinkedList$SequentialListIterator_add)]]);
$rt_metadata([cprt_Vector3Accessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_Vector3Accessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_Vector3Accessor__init_)],
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_), "$_init_16", $rt_wrapFunction1(jl_String__init_0), "$_init_28", $rt_wrapFunction1(jl_String__init_1), "$_init_12", $rt_wrapFunction3(jl_String__init_2), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$toString", $rt_wrapFunction0(jl_String_toString), "$equals",
$rt_wrapFunction1(jl_String_equals), "$hashCode", $rt_wrapFunction0(jl_String_hashCode)],
cprt_ActorAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_ActorAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_ActorAccessor__init_)],
cprg_CombatTextLabel, 0, cbgssu_j, [cbgu_ac$a], 0, 3, 0, 0, 0,
cpr_PerfStats, "PerfStats", 2, jl_Object, [], 0, 3, 0, cpr_PerfStats_$callClinit, 0,
cpru_PlayingSound, 0, jl_Object, [cbgu_ac$a], 0, 3, 0, 0, 0,
oacl_Log, 0, jl_Object, [], 3, 3, 0, 0, 0,
oacl_SimpleLog, 0, jl_Object, [oacl_Log], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(oacl_SimpleLog__init_), "$error", $rt_wrapFunction1(oacl_SimpleLog_error)],
cprt_Vector2Accessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_Vector2Accessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_Vector2Accessor__init_)],
cprt_ProjectileTweenAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_ProjectileTweenAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_ProjectileTweenAccessor__init_)],
cprnm_RandomSeedType, 0, jl_Enum, [], 12, 3, 0, cprnm_RandomSeedType_$callClinit, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
cprnm_GuildRole, 0, jl_Enum, [], 12, 3, 0, cprnm_GuildRole_$callClinit, 0,
cprnm_Avatar, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_Avatar__init_0)],
cprgo_UserFlag, 0, jl_Enum, [], 12, 3, 0, cprgo_UserFlag_$callClinit, 0,
cprt_PlayingSoundAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_PlayingSoundAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_PlayingSoundAccessor__init_)],
cpaa_l, 0, jl_Enum, [], 12, 3, 0, cpaa_l_$callClinit, 0,
cbgu_a$1, 0, cbgu_ac, [], 4, 0, 0, 0, ["$_init_7", $rt_wrapFunction2(cbgu_a$1__init_)],
cpruwc_IProgressBar, 0, jl_Object, [], 3, 3, 0, 0, 0,
cprnm_ChatRoomType, 0, jl_Enum, [], 12, 3, 0, cprnm_ChatRoomType_$callClinit, 0,
cprge_EventHelper, 0, jl_Object, [], 1, 3, 0, cprge_EventHelper_$callClinit, 0,
cprt_ScrollPaneAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_ScrollPaneAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_ScrollPaneAccessor__init_)],
cpr_BuildOptions, 0, jl_Object, [], 0, 3, 0, cpr_BuildOptions_$callClinit, 0,
cpr_ServerType, 0, jl_Enum, [], 12, 3, 0, cpr_ServerType_$callClinit, ["$getContentLocation", $rt_wrapFunction0(cpr_ServerType_getContentLocation)],
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray0", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_", $rt_wrapFunction0(ju_HashMap__init_3), "$_init_2", $rt_wrapFunction1(ju_HashMap__init_1), "$_init_1", $rt_wrapFunction2(ju_HashMap__init_2), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry), "$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry), "$put", $rt_wrapFunction2(ju_HashMap_put), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash),
"$rehash", $rt_wrapFunction0(ju_HashMap_rehash0)],
cprnm_BasicUserInfo, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_BasicUserInfo__init_)],
juca_AtomicReference, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(juca_AtomicReference__init_)],
cprg_GenericEntityRenderable, 0, cprg_EntityRenderable, [], 0, 3, 0, 0, 0,
cpruwc_ProgressBarView, 0, cbgssu_o, [cpruwc_IProgressBar], 0, 3, 0, 0, 0,
ju_WeakHashMap, 0, ju_AbstractMap, [ju_Map], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_WeakHashMap__init_0), "$_init_2", $rt_wrapFunction1(ju_WeakHashMap__init_)],
cprnm_GuildInfo, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_GuildInfo__init_)],
cprnm_IAPProducts, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_IAPProducts__init_)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_1), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_2)],
juc_TimeUnit, 0, jl_Enum, [], 12, 3, 0, juc_TimeUnit_$callClinit, ["$convert", $rt_wrapFunction2(juc_TimeUnit_convert), "$toSeconds", $rt_wrapFunction1(juc_TimeUnit_toSeconds)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_)],
cprt_ProgressBarViewAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_ProgressBarViewAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_ProgressBarViewAccessor__init_)],
cprnm_BasicGuildInfo, 0, cpaa_i, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(cprnm_BasicGuildInfo__init_)],
ju_Collections, 0, jl_Object, [], 4, 3, 0, ju_Collections_$callClinit, 0,
cprt_SpriteAccessor, 0, jl_Object, [aa_e], 0, 3, 0, cprt_SpriteAccessor_$callClinit, ["$_init_", $rt_wrapFunction0(cprt_SpriteAccessor__init_)],
cpr_ToolType, 0, jl_Enum, [], 12, 3, 0, cpr_ToolType_$callClinit, 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls);
$rt_stringPool(["initialCapacity must be >= 0: ", "initialCapacity is too large: ", "loadFactor must be > 0: ", "key cannot be null.", "main", "NO_RESPONSE", "REVIEWED", "NEVER", "TitanTempleSummary1", "PRIVATE", "APPLICATION_ONLY", "OPEN", "DEFAULT", "INTRO", "POWER_USE", "ACHIEVEMENTS", "UNLOCK_HERO", "PROMOTE_HERO", "DAILY_QUEST", "POWER_POINTS", "CRAFTING", "EQUIPPING_HERO", "EVOLVING_HERO", "AUTO_FIGHT", "FIGHT_PIT", "STORY", "ENCHANTING", "CRYPT", "TEMPLE_YOURS", "TEMPLE_INVITE", "BOSS_PIT", "EVIL_WIZARD_STORY",
"GIANT_PLANT_STORY", "GOLD_COLOSSUS_STORY", "GUILD_WAR", "LEGENDARY_QUEST_INFO", "LQ_BROZERKER", "LQ_MEDUSA", "LQ_DUST_DEVIL", "LQ_FAITH_HEALER", "LQ_DARK_DRAKUL", "LQ_CATAPULT_KNIGHT", "LQ_NINJA_DWARF", "LQ_SNAP_DRAGON", "LQ_POLEMASTER", "LQ_ZOMBIE_SQUIRE", "LQ_MAGIC_DRAGON", "LQ_GROOVY_DRUID", "LQ_DRAGON_LADY", "LQ_SHADOW_ASSASSIN", "LQ_ELECTROYETI", "LQ_FROST_GIANT", "LQ_UNSTABLE_UNDERSTUDY", "RUNES", "RUNE_SHRINE", "RUNE_FUSION", "LQ_HYDRA", "LQ_BARDBARIAN", "LQ_AQUATIC_MAN", "LQ_DRUIDINATRIX", "LQ_CENTAUR_OF_ATTENTION",
"LQ_MOON_DRAKE", "LQ_COSMIC_ELF", "LQ_SAVAGE_CUTIE", "MYSTIC_CLOSET", "MYSTIC_CLOSET_EQUIP", "LQ_BONE_DRAGON", "LQ_SPIRIT_WOLF", "LQ_RABID_DRAGON", "LQ_ORC_MONK", "LQ_ROLLER_WARRIOR", "LQ_UNICORGI", "LQ_PIRATE", "LQ_DWARVEN_ARCHER", "LQ_SATYR", "LQ_SKELETON_KING", "LQ_DARK_HORSE", "LQ_DEEP_DRAGON", "LQ_STORM_DRAGON", "LQ_MINOTAUR", "LQ_SPIKEY_DRAGON", "LQ_CRIMSON_WITCH", "LQ_DEMON_TOTEM", "LQ_GENIE", "LQ_ETERNAL_ENCHANTER", "LQ_DRAGZILLA", "LQ_RAGING_REVENANT", "LQ_ANGELIC_HERALD", "LQ_WEREDRAGON", "LQ_VULTURE_DRAGON",
"LQ_SOJOURNER_SORCERESS", "", "Problem geting log", "null", "LUCKY_ORCS_FOOT", "FLIPPANT_MISSLE", "ATTACK_OF_RIDICULE", "PROFANE_STORM", "BLUNT_FORCE_TRAUMA", "AWKWARD_SILENCE", "PUNCH_OUT", "HUNGER_PAIN", "FEAR_OF_THE_GODS", "EVANGELIZE", "AGGRAVATED_ASSAULT", "AGGRESSIVE_ARMOR", "ALE_JITSU", "BEACON", "BLINDING_LIGHT", "BOCK_JITSU", "BOMBARDMENT", "BRASS_KNUCKLES", "BROS_BEFORE_FOES", "BUST_A_MOVE", "CANNONBALLER", "DANCING_DEVIL", "FREQUENCY_MODULATION", "GET_ON_UP", "GRRL_POWER", "HEART_OF_STONE", "ILLUMINATE",
"IMPALE", "PAPER_CROWN", "FREE_MANS_CROWBAR", "MY_FIRST_SHIELD", "RUBBER_VEST", "ENCHANTED_ELBOW_PADS", "GOBLIN_GROG", "FOAM_FINGER", "STOLEN_SNEAKERS", "BIT_O_NIP", "LOADED_DIE", "FINE_BRIE", "STICK_ON_MOUSTACHE", "SNAZZY_VEST", "CHUNKY_FEMUR", "GOBLIN_WHACKER", "BLOODY_BAT", "SWASH_BUCKLER", "BESSIES_BANE", "DROP_BONUS_NORMAL_2X", "DROP_BONUS_ELITE_2X", "TEAM_XP_BONUS_2X", "DROP_BONUS_EXPERT_2X", "FullLoad", "RPGMain", "CLEAR", "BLACK", "WHITE", "LIGHT_GRAY", "GRAY", "DARK_GRAY", "BLUE", "NAVY", "ROYAL", "SLATE",
"SKY", "CYAN", "TEAL", "GREEN", "CHARTREUSE", "LIME", "FOREST", "OLIVE", "YELLOW", "GOLD", "GOLDENROD", "ORANGE", "BROWN", "TAN", "FIREBRICK", "RED", "SCARLET", "CORAL", "SALMON", "PINK", "MAGENTA", "PURPLE", "VIOLET", "MAROON", "CAMPAIGN", "ELITE_CAMPAIGN", "EXPEDITION", "THE_MOUNTAIN_SUMMIT", "THE_MOUNTAIN_CAVES", "CHALLENGES_MAGIC_IMMUNE", "CHALLENGES_PHYSICAL_IMMUNE", "CHALLENGES_ONLY_DRAGONS", "COLISEUM", "TITAN_TEMPLE", "GUILD_WAR_REGISTRATION", "CRAFT", "XP_BONUS_TEAM", "BOSS_BATTLE", "EXPERT_CAMPAIGN",
"DEVELOPER", "RELEASE", "BETA", "COPPER", "BRONZE", "SILVER", "PLATINUM", "CHALLENGER", "0", "DIAMONDS", "STAMINA", "TEAM_XP", "VIP_TICKETS", "SILVER_CHEST", "GOLD_CHEST", "SOUL_CHEST", "FIGHT_TOKENS", "FREE_DIAMONDS", "PAID_DIAMONDS", "EXPEDITION_TOKENS", "GUILD_TOKENS", "COLISEUM_TOKENS", "SOULMART_TOKENS", "WAR_TOKENS", "RUNICITE", "STONE_SHRINE_ROLLS", "CRYSTAL_SHRINE_ROLLS", "BAZAAR_TOKENS", "PURPLE_CHEST", "ORANGE_CHEST", "UserExtra1", "n must be positive", "TL5", "TL7", "TL10", "DEFEAT_1_1", "TL15", "ELECTROYETI",
"MEDUSA", "FAITH_HEALER", "DARK_DRACUL", "COSMIC_ELF", "ROLLER_WARRIOR", "DRAGON_LADY", "CENTAUR_OF_ATTENTION", "UNSTABLE_UNDERSTUDY", "MOON_DRAKE", "NPC_GOBLIN", "NPC_WILDLING_ARCHER", "NPC_CRYSTAL_GOLEM", "NPC_ICE_GOLEM", "NPC_FIRE_IMP", "NPC_STONE_IMP", "NPC_MYSTIC_WILDLING", "NPC_WILDLING_SNIPER", "POLEMASTER", "CATAPULT_KNIGHT", "BARDBARIAN", "SHADOW_ASSASSIN", "DUST_DEVIL", "SNAP_DRAGON", "HYDRA", "SAVAGE_CUTIE", "ZOMBIE_SQUIRE", "MAGIC_DRAGON", "AQUATIC_MAN", "CRIMSON_WITCH", "NINJA_DWARF", "BROZERKER",
"GROOVY_DRUID", "BONE_DRAGON", "NPC_INFERNO_SPIDER", "NPC_HEALER_SPRITE", "NPC_BUFF_SPRITE", "NPC_TROLL_BLOB", "NPC_SCARECROW", "NPC_POTTED_PLANT", "SPIKEY_DRAGON", "FROST_GIANT", "MINOTAUR", "DARK_HORSE", "DRUIDINATRIX", "NPC_KAMIKAZE_GNOME", "NPC_MR_SMASHY", "TITAN_BUFF", "NPC_EVIL_WIZARD", "NPC_GIANT_PLANT", "NPC_GOLD_COLOSSUS", "ORC_MONK", "DWARVEN_ARCHER", "RABID_DRAGON", "NPC_CAULDRON_MONSTER", "NPC_SQUID", "NPC_GIANT_PLANT_ROOT", "SKELETON_KING", "SATYR", "STORM_DRAGON", "NPC_SKELETON_DEER", "NPC_MUSHROOM",
"UNICORGI", "SNIPER_WOLF", "GENIE", "NPC_HEAD_CRAB", "NPC_CLOUD_MONSTER", "DRAGZILLA", "PIRATE", "CYCLOPS_WIZARD", "DEMON_TOTEM", "NPC_EYEBALL", "NPC_TEST_DUMMY", "DEEP_DRAGON", "DOPPELGANGER", "KRAKEN_KING", "STOWAWAY", "NPC_SHARK", "NPC_SQUIRREL", "CURSED_STATUE", "PLANT_SOUL", "SPIDER_QUEEN", "VULTURE_DRAGON", "NPC_ANT", "BANSHEE", "RAGING_REVENANT", "SILENT_SPIRIT", "SPECTRAL_DRAGON", "NPC_LYING_LANTERN", "WEREDRAGON", "WEE_WITCH", "DUNGEON_MAN", "NPC_PLAGUE_SKULKER", "PLAGUE_ENTREPRENEUR", "MISTRESS_MANICURE",
"VILE_BILE", "NPC_FLEA_DEMON", "VOID_WYVERN", "BURNT_ONE", "NPC_ANGELIC_AVENGER", "NPC_GENIE_COW", "NPC_GENIE_GOAT", "NPC_GENIE_CHICKEN", "TOMB_ANGEL", "ANGELIC_HERALD", "BULWARK_ANGEL", "ANGEL_DRAGON", "DRAGON_SLAYER", "ETERNAL_ENCHANTER", "GRAND_HUNTRESS", "TRIPLE_THREAT", "LAST_DEFENDER", "SOJOURNER_SORCERESS", "KARAOKE_KING", "SHADOW_OF_SVEN", "SUN_SEEKER", "STEPLADDER_BROTHERS", "FORGOTTEN_DRAGON", "NPC_CRYSTAL_LIZARD", "BLACK_WING", "GREED_DRAGON", "UNRIPE_MYTHOLOGY", "NPC_BREAKER_MKII", "ANCIENT_DWARF",
"DIGGER_MOLE", "SADISTIC_DANCER", "NPC_ANUBIS_DRAGON", "NPC_KING_IMP", "WHITE_TIGRESS", "SNAPPER_BONE", "VERMILION_PRIESTESS", "NPC_ABYSS_DRAGON", "NPC_BOSS_ANUBIS_DRAGON", "PCH_ANUBIS_DRAGON", "ABYSS_DRAGON", "UMLAUT_THE_FIRST", "NPC_UMLAUT_THE_FIFTH_FIRST", "NPC_BOSS_ABYSS_DRAGON", "NPC_BOSS_ANDRAGONUS_THE_FIRST", "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST", "NPC_SINISTER_ASSAILANT", "NPC_RED_TIGER", "DARK_HERO", "CLAW_MAN", "\n", "CAPTAINS_TIGHTPANTS", "PRETTY_SWEET_CAPE", "PROTEIN_POWDER", "LOAFERS_OF_ALACRITY", "SMARTY_PANTS",
"GLOVES_OF_CRIT", "SPARKLE_PONY_KEYCHAIN", "BANJO_OF_DUELING", "SHINY_BOTTLECAP", "HEMP_BRACELET", "YA_VAMPIRE_SERIES", "WAND_OF_GOLD_SPARKLES", "RAW_EGG", "ARTIFACT_OF_UNIMAGINABLE_POWER", "ARCANE_SLACKS", "DAISY_CHAINSAW", "CHAPS_OF_ENDURANCE", "SIDE_OF_BACON", "HIPPY_GLO_STICKS", "MAGIC_EIGHT_BALL", "KING_JEFFS_CROSSBOW", "DIRECTORS_CUT", "PLUCKY_HEROINES_SHORTBOW", "BLISSFUL_IGNORANCE", "EXCALIBURTREYNOLDS", "BUTTER_KNIFE", "PLASTIC_VAMPIRE_TEETH", "THONG_OF_VITALITY", "LIFESIPPER", "SOCK_FULL_O_PENNIES",
"PENETRABLE_ARMOR", "MELTY_CHOCOLATE_BAR", "TEN_FOOT_POLE", "THE_POWER_OF_MEDICINE", "VAMPIRE_BUNNYEARS", "NONSTICK_SHIELD", "MUSCLE_WAX", "RACING_STRIPES", "SACRED_CODEX", "AND_MY_AXE", "IMPRACTICAL_CHESTPLATE", "MACE_OF_FRIENDSHIP", "THE_UGLY_STICK", "GENTLEMENS_CLUB", "STAFF_OF_BOSS_FIGHTING", "DONT_TASE_ME_BOW", "BAG_O_HAMMERS", "SPUD_GUN", "NECRONOMICON", "INTIMIDATING_BEARD", "LEAD_ZEPPELIN", "LASER_POINTER", "GLAIVE_OF_DISMEMBERMENT", "ROBE_OF_SHARP_COMEBACKS", "THE_MAD_GODS_TRIDENT", "ROD_OF_BADASSERY",
"TOME_OF_FORBIDDEN_TRIVIA", "DEATH_METAL_BLADE", "SNAKE_OIL", "DECODER_RING", "AXES_OF_DUAL_WIELDING", "ROD_OF_TASING", "ORB_OF_EVERLASTING_FLAVOR", "THINKING_CAP", "THE_POWER_OF_MEDICINE_2_ORDER", "KINDNESS", "THE_COMPENSATOR", "MUSSEL_MILK", "FLAIL_OF_TOTAL_DEVASTATION", "SHOT_IN_THE_ARM", "BUNNY_SLIPPERS", "ADAMANTIUM_TIARA", "VORPAL_BOOMERANG", "FRAMED_DIPLOMA", "HEAD_BANGER", "SUPER_SPIKEY_SPEAR", "ROD_OF_WITTY_PARTY_BANTER", "LASER_POINTER_2_ORDER", "DIPLOMATIC_IMMUNITY", "THE_1_RING", "DIRK_OF_DISEMBOWELING",
"HAMMER_OF_WICKED_BEATS", "ENIDS_EXPENSIVE_ELIXIR", "DECODER_RING_2_ORDER", "MJOLNIRBY", "THE_POWER_OF_MEDICINE_3_ORDER", "TOME_OF_FORBIDDEN_TRIVIA_2_ORDER", "SWORDY_MCEPICPANTS", "SHOVEL", "PHILTER_OF_PURE_TESTOSTERONE", "TOME_OF_NASTY_BEHAVIOR", "BOOTS_MADE_FOR_WALKIN", "POCKET_PROTECTOR", "HAROLDS_HOMEMADE_HALBERD", "SANDWICH_OF_UNSURPASSED_MEATINESS", "LAVISHLY_ADORNED_RAPIER", "TOME_OF_FORBIDDEN_TRIVIA_3_ORDER", "THE_POWER_OF_MEDICINE_4_ORDER", "SVENS_SWORD_OF_DOOOOOM", "LASER_POINTER_3_ORDER", "GRIEVOUS_BODILY_HARM",
"DECODER_RING_3_ORDER", "LIFEDRINKER", "MITHRIL_OREEAL", "BIG_STABBY_SPEAR", "EXP_FLASK", "EXP_PHILTER", "EXP_VIAL", "VOID_DUST", "SHIMMER_DUST", "PRIMAL_ESSENCE", "IRON_ORE", "COPPER_ORE", "SILVER_ORE", "VOLCANIC_ORE", "EXP_DECANTER", "RAID_TICKET", "STONE_ELECTROYETI", "STONE_MEDUSA", "STONE_FAITH_HEALER", "HERO_ELECTROYETI", "HERO_MEDUSA", "HERO_FAITH_HEALER", "LASER_POINTER_4_ORDER", "ENIDS_EXPENSIVE_ELIXIR_2_ORDER", "SHOT_IN_THE_ARM_2_ORDER", "SHOT_IN_THE_ARM_3_ORDER", "SHARD_MACE_OF_FRIENDSHIP", "REEL_INTIMIDATING_BEARD",
"REEL_SHINY_BOTTLECAP", "REEL_SUPER_SPIKEY_SPEAR", "SHARD_RACING_STRIPES", "SHARD_THE_UGLY_STICK", "REEL_DECODER_RING", "SHARD_MUSCLE_WAX", "REEL_THE_POWER_OF_MEDICINE", "REEL_THE_MAD_GODS_TRIDENT", "REEL_GRIEVOUS_BODILY_HARM", "REEL_SIDE_OF_BACON", "SHARD_DONT_TASE_ME_BOW", "SHARD_FRAMED_DIPLOMA", "REEL_ORB_OF_EVERLASTING_FLAVOR", "REEL_TOME_OF_FORBIDDEN_TRIVIA", "SHARD_SACRED_CODEX", "SHARD_IMPRACTICAL_CHESTPLATE", "REEL_SPARKLE_PONY_KEYCHAIN", "REEL_MJOLNIRBY", "REEL_BIG_STABBY_SPEAR", "REEL_KINDNESS", "SHARD_PHILTER_OF_PURE_TESTOSTERONE",
"SHARD_STAFF_OF_BOSS_FIGHTING", "REEL_HAMMER_OF_WICKED_BEATS", "REEL_MAGIC_EIGHT_BALL", "REEL_DIRK_OF_DISEMBOWELING", "REEL_SPUD_GUN", "REEL_FLAIL_OF_TOTAL_DEVASTATION", "REEL_NECRONOMICON", "SHARD_HAROLDS_HOMEMADE_HALBERD", "REEL_LIFEDRINKER", "REEL_SANDWICH_OF_UNSURPASSED_MEATINESS", "REEL_ENIDS_EXPENSIVE_ELIXIR", "REEL_PLASTIC_VAMPIRE_TEETH", "REEL_PRETTY_SWEET_CAPE", "REEL_VAMPIRE_BUNNYEARS", "REEL_THE_COMPENSATOR", "SHARD_GENTLEMENS_CLUB", "REEL_BLOODY_BAT", "REEL_POCKET_PROTECTOR", "REEL_CHUNKY_FEMUR",
"REEL_DEATH_METAL_BLADE", "SHARD_HEAD_BANGER", "SHARD_AND_MY_AXE", "REEL_THE_1_RING", "REEL_GOBLIN_WHACKER", "REEL_LEAD_ZEPPELIN", "REEL_THINKING_CAP", "REEL_TEN_FOOT_POLE", "REEL_DIPLOMATIC_IMMUNITY", "SHARD_BOOTS_MADE_FOR_WALKIN", "REEL_LUCKY_ORCS_FOOT", "REEL_ROD_OF_WITTY_PARTY_BANTER", "SHARD_BUNNY_SLIPPERS", "SHARD_VORPAL_BOOMERANG", "REEL_BAG_O_HAMMERS", "REEL_LASER_POINTER", "REEL_SHOVEL", "SHARD_ADAMANTIUM_TIARA", "SHARD_REEL_THE_MAD_GODS_TRIDENT", "SHARD_REEL_INTIMIDATING_BEARD", "SHARD_REEL_FLAIL_OF_TOTAL_DEVASTATION",
"SHARD_REEL_KINDNESS", "SHARD_REEL_LEAD_ZEPPELIN", "SHARD_REEL_DECODER_RING", "SHARD_REEL_NECRONOMICON", "SHARD_REEL_TOME_OF_FORBIDDEN_TRIVIA", "SHARD_REEL_THINKING_CAP", "SHARD_REEL_THE_COMPENSATOR", "SHARD_REEL_LASER_POINTER", "SHARD_REEL_ORB_OF_EVERLASTING_FLAVOR", "SHARD_REEL_GRIEVOUS_BODILY_HARM", "SHARD_REEL_LIFEDRINKER", "SHARD_REEL_SANDWICH_OF_UNSURPASSED_MEATINESS", "SHARD_REEL_MJOLNIRBY", "SHARD_REEL_DIRK_OF_DISEMBOWELING", "SHARD_REEL_ROD_OF_WITTY_PARTY_BANTER", "SHARD_REEL_DIPLOMATIC_IMMUNITY", "SHARD_REEL_BIG_STABBY_SPEAR",
"SHARD_REEL_ENIDS_EXPENSIVE_ELIXIR", "SHARD_REEL_SUPER_SPIKEY_SPEAR", "SHARD_REEL_HAMMER_OF_WICKED_BEATS", "SHARD_REEL_SHOVEL", "SHARD_REEL_THE_1_RING", "SHARD_REEL_DEATH_METAL_BLADE", "SHARD_REEL_POCKET_PROTECTOR", "STONE_DARK_DRACUL", "HERO_DARK_DRACUL", "STONE_COSMIC_ELF", "HERO_COSMIC_ELF", "STONE_ROLLER_WARRIOR", "HERO_ROLLER_WARRIOR", "STONE_DRAGON_LADY", "HERO_DRAGON_LADY", "STONE_CENTAUR_OF_ATTENTION", "HERO_CENTAUR_OF_ATTENTION", "STONE_UNSTABLE_UNDERSTUDY", "HERO_UNSTABLE_UNDERSTUDY", "STONE_MOON_DRAKE",
"HERO_MOON_DRAKE", "STONE_POLEMASTER", "HERO_POLEMASTER", "STONE_CATAPULT_KNIGHT", "HERO_CATAPULT_KNIGHT", "STONE_BARDBARIAN", "HERO_BARDBARIAN", "STONE_SHADOW_ASSASSIN", "HERO_SHADOW_ASSASSIN", "STONE_DUST_DEVIL", "HERO_DUST_DEVIL", "STONE_SNAP_DRAGON", "HERO_SNAP_DRAGON", "STONE_HYDRA", "HERO_HYDRA", "STONE_SAVAGE_CUTIE", "HERO_SAVAGE_CUTIE", "STONE_ZOMBIE_SQUIRE", "HERO_ZOMBIE_SQUIRE", "STONE_MAGIC_DRAGON", "HERO_MAGIC_DRAGON", "STONE_AQUATIC_MAN", "HERO_AQUATIC_MAN", "STONE_CRIMSON_WITCH", "HERO_CRIMSON_WITCH",
"STONE_NINJA_DWARF", "HERO_NINJA_DWARF", "STONE_BROZERKER", "HERO_BROZERKER", "STONE_GROOVY_DRUID", "HERO_GROOVY_DRUID", "STONE_BONE_DRAGON", "HERO_BONE_DRAGON", "MITHRIL_ORE", "STONE_SPIKEY_DRAGON", "HERO_SPIKEY_DRAGON", "STONE_FROST_GIANT", "HERO_FROST_GIANT", "STONE_MINOTAUR", "HERO_MINOTAUR", "STONE_DARK_HORSE", "HERO_DARK_HORSE", "STONE_DRUIDINATRIX", "HERO_DRUIDINATRIX", "STONE_ORC_MONK", "HERO_ORC_MONK", "STONE_RABID_DRAGON", "HERO_RABID_DRAGON", "STONE_DWARVEN_ARCHER", "HERO_DWARVEN_ARCHER", "DEAD_EYE",
"DRAGON_SCALE", "LOST_DISK_OF_POWER", "LIGER_BALM", "OVERPOWERING_FRAGRANCE", "ANTI_MAGIC_SHIELD", "WAR_SANDALS", "WIZARDY_FOR_IDIOTS", "LICHE_FINGER", "MOTIVATIONAL_CASSETTE", "CHUGG_BOOTS", "PURPLE_PILLS_OF_POTENCY", "BLACKSTEEL_BLADE", "SHARD_DEAD_EYE", "SHARD_LOST_DISK_OF_POWER", "SHARD_LIGER_BALM", "SHARD_ANTI_MAGIC_SHIELD", "SHARD_WAR_SANDALS", "SHARD_WIZARDY_FOR_IDIOTS", "ALCHEMY_COST_RESET", "STAMINA_COST_RESET", "ELITE_CHANCES_COST_RESET", "STAMINA_CONSUMABLE", "DOUBLE_NORMAL_CAMPAIGN_DROPS", "DOUBLE_ELITE_CAMPAIGN_DROPS",
"SHOP_REFRESH", "GENERIC_ORANGE", "STONE_SKELETON_KING", "HERO_SKELETON_KING", "STONE_SATYR", "HERO_SATYR", "STONE_STORM_DRAGON", "HERO_STORM_DRAGON", "YODELING_SWORD", "GIRDLE_OF_VICTORY", "RATTLING_SABRE", "PURIFYING_TUNING_FORK", "PETER_PIPERS_PEPPER_SPRAY", "RING_OF_THE_SQUIRREL", "POWER_OF_SCIENCE", "HIGH_TEA", "SELF_PRESERVER", "EXTREME_FAD_DIET", "BOWIE_KNIFE", "JAR_OF_KITTEN_TEAR", "MYSTICAL_ELVEN_JUNK", "PHOTO_BOMB", "READIN_RAIN_BOW", "GLASS_CASE_OF_EMOTION", "ROLL_OF_DUCT_TAPE", "WICKED_MULLET", "UNICORN_PUKE",
"SHARD_PETER_PIPERS_PEPPER_SPRAY", "SHARD_RING_OF_THE_SQUIRREL", "SHARD_HIGH_TEA", "SHARD_SELF_PRESERVER", "SHARD_EXTREME_FAD_DIET", "SHARD_BOWIE_KNIFE", "SHARD_PHOTO_BOMB", "SHARD_ROLL_OF_DUCT_TAPE", "VIP5_CONSUMABLE", "STONE_UNICORGI", "HERO_UNICORGI", "STONE_SNIPER_WOLF", "HERO_SNIPER_WOLF", "STONE_GENIE", "HERO_GENIE", "SKIN_DARK_HORSE_ZEBRA", "SKIN_DARK_HORSE_MECH", "CHAMPIONSHIP_BELT", "HEALTHY_DOSE_OF_SKEPTICISM", "AXE_OF_GRATUITOUS_GUITAR_SOLOS", "ANCIENT_TOME_OF_OCCULT_NONSENSE", "DRAGONS_BALLZ", "HELM_OF_THE_RAGING_BEAR",
"COSPLAY_SWORD", "IVY_LEAGUE_HAIRCUT", "DUELING_KNIVES_OF_HACKENSLASH", "DEERSTALKER_HAT", "LENSLESS_GLASSES", "UNTESTED_JETPACK", "HELM_OF_SCREAMING_MANFACE", "SWEATBAND_OF_TRAINING_MONTAGES", "MONSTER_HUNTER_ARMOR", "SHARD_HEALTHY_DOSE_OF_SKEPTICISM", "SHARD_AXE_OF_GRATUITOUS_GUITAR_SOLOS", "SHARD_ANCIENT_TOME_OF_OCCULT_NONSENSE", "SHARD_HELM_OF_THE_RAGING_BEAR", "SHARD_COSPLAY_SWORD", "SHARD_LENSLESS_GLASSES", "SHARD_UNTESTED_JETPACK", "SHARD_SWEATBAND_OF_TRAINING_MONTAGES", "RUNICITE_SHARD", "RUNICITE_STONE",
"RUNICITE_BLOCK", "RUNICITE_SLAB", "RUNICITE_MONOLITH", "SILVER_CHEST_ROLL_X1", "GOLD_CHEST_ROLL_X1", "SOUL_CHEST_ROLL", "EVENT_CHEST_ROLL_X1", "TAROT_DECK_OF_HYPERBOLE", "MACGUFFIN_FRAGMENT_45", "DIRTY_BASTARD_SWORD", "THE_HOLY_PAIL", "ORNATE_CROWN_OF_THE_GM", "GLORY_SEEKER", "EYE_OF_THE_BEHOLDER", "HOLY_LANCE_OF_PLOT_ADVANCEMENT", "AXE_OF_GRINDING", "AMULET_OF_CONCENTRATED_AWESOME", "EMBARASSING_CHAINMAIL_OF_IMMENSE_POWER", "SLIGHTLY_EVIL_MAGIC_MIRROR", "STONE_DRAGZILLA", "HERO_DRAGZILLA", "STONE_PIRATE",
"HERO_PIRATE", "STONE_CYCLOPS_WIZARD", "HERO_CYCLOPS_WIZARD", "STONE_DEMON_TOTEM", "HERO_DEMON_TOTEM", "SHARD_MACGUFFIN_FRAGMENT_45", "SHARD_THE_HOLY_PAIL", "SKIN_CRIMSON_WITCH_CROW", "SKIN_ELECTROYETI_SASQUATCH", "SKIN_HYDRA_SEA_DRAGON", "SKIN_FAITH_HEALER_CTHULU", "OFFERING_TREE", "OFFERING_FIRE", "OFFERING_OCEAN", "OFFERING_ROCK", "OFFERING_MIST", "OFFERING_LIGHTNING", "OFFERING_BLOOD", "OFFERING_RIVER", "OFFERING_HAIL", "OFFERING_KEYSTONE", "OFFERING_MAJOR_1", "OFFERING_MAJOR_2", "OFFERING_MINOR_1", "OFFERING_MINOR_2",
"OFFERING_MINOR_3", "SHRINE_ROLL_STONE", "SHRINE_ROLL_CRYSTAL", "STONE_DEEP_DRAGON", "HERO_DEEP_DRAGON", "STONE_DOPPELGANGER", "HERO_DOPPELGANGER", "STONE_KRAKEN_KING", "HERO_KRAKEN_KING", "STONE_STOWAWAY", "HERO_STOWAWAY", "SKIN_BARDBARIAN_CHAMPION", "SKIN_CENTAUR_RESPLENDENT", "SKIN_DRAGON_LADY_MASTERY", "SKIN_MINOTAUR_HOLSTEIN", "SKIN_UNSTABLE_UNDERSTUDY_MASTERY", "REEL_DRAGON_SCALE", "REEL_CHUGG_BOOTS", "REEL_BLACKSTEEL_BLADE", "REEL_YODELING_SWORD", "REEL_POWER_OF_SCIENCE", "REEL_GIRDLE_OF_VICTORY", "REEL_RATTLING_SABRE",
"REEL_MYSTICAL_ELVEN_JUNK", "REEL_JAR_OF_KITTEN_TEAR", "REEL_GLASS_CASE_OF_EMOTION", "REEL_UNICORN_PUKE", "REEL_IVY_LEAGUE_HAIRCUT", "REEL_ORNATE_CROWN_OF_THE_GM", "REEL_TAROT_DECK_OF_HYPERBOLE", "REEL_DIRTY_BASTARD_SWORD", "REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT", "REEL_EYE_OF_THE_BEHOLDER", "REEL_GLORY_SEEKER", "SHARD_REEL_DRAGON_SCALE", "SHARD_REEL_CHUGG_BOOTS", "SHARD_REEL_BLACKSTEEL_BLADE", "SHARD_REEL_YODELING_SWORD", "SHARD_REEL_POWER_OF_SCIENCE", "SHARD_REEL_GIRDLE_OF_VICTORY", "SHARD_REEL_RATTLING_SABRE",
"SHARD_REEL_MYSTICAL_ELVEN_JUNK", "SHARD_REEL_JAR_OF_KITTEN_TEAR", "SHARD_REEL_GLASS_CASE_OF_EMOTION", "SHARD_REEL_UNICORN_PUKE", "SHARD_REEL_IVY_LEAGUE_HAIRCUT", "SHARD_REEL_ORNATE_CROWN_OF_THE_GM", "SHARD_REEL_TAROT_DECK_OF_HYPERBOLE", "SHARD_REEL_DIRTY_BASTARD_SWORD", "SHARD_REEL_HOLY_LANCE_OF_PLOT_ADVANCEMENT", "SHARD_REEL_EYE_OF_THE_BEHOLDER", "SHARD_REEL_GLORY_SEEKER", "SKIN_BROZERKER_BODYGUARD", "SKIN_SNAP_DRAGON_MASTERY", "SKIN_CATAPULT_KNIGHT_MASTERY", "SKIN_ELECTROYETI_MASTERY", "SKIN_MOON_DRAKE_MASTERY",
"SKIN_MEDUSA_MASTERY", "SKIN_NINJA_DWARF_MASTERY", "SKIN_POLEMASTER_GYMNAST", "SKIN_ROLLER_WARRIOR_LUAU", "SKIN_DUST_DEVIL_PARISIAN", "SKIN_SKELETON_KING_MASTERY", "SKIN_SPIKEY_DRAGON_MASTERY", "SKIN_DARK_DRACUL_FLYING_SQUIRREL", "SKIN_ZOMBIE_SQUIRE_MASTERY", "SKIN_DARK_DRACUL_MASTERY", "SKIN_POLEMASTER_MASTERY", "SKIN_SKELETON_DEER_MASTERY", "STONE_CURSED_STATUE", "HERO_CURSED_STATUE", "STONE_PLANT_SOUL", "HERO_PLANT_SOUL", "STONE_SPIDER_QUEEN", "HERO_SPIDER_QUEEN", "STONE_VULTURE_DRAGON", "HERO_VULTURE_DRAGON",
"HAMMER_TIME", "MEATY_BUTTER", "FOUNTAIN_OF_OLD_AGE", "ORGANIC_BOOK_OF_NATURE", "VOLATILE_SMOOTHIE", "ITEM_INFO", "ROCKET_CLOAK", "POLITICAL_PLATFORM_SHOES", "GLASS_CANNON", "LITTLE_PRICKS", "ORBITAL_KITTY", "RING_OF_ILL_WILL", "GOOD_GREEN_GOO", "WHITE_PICKET_SHIELD", "NUMBER_529", "SICK_MULLET", "FOUR_D_GLASSES", "HAIR_OF_THE_DOG", "SKIN_BROZERKER_VETERAN", "SKIN_CRIMSON_WITCH_SORCERESS", "SKIN_GENIE_GOLDEN", "SKIN_MINOTAUR_MARAUDER", "SKIN_SAVAGE_CUTIE_RAVAGER", "SKIN_UNICORGI_ARMORED", "SKIN_SNAP_DRAGON_EVERGLADES",
"SKIN_MAGIC_DRAGON_SPAGHETTI", "SKIN_SPIKEY_DRAGON_MECHA", "SKIN_DRUIDINATRIX_SPRING", "SKIN_CATAPULT_KNIGHT_UNICORN", "SKIN_DRAGZILLA_ZILLA", "SKIN_SNIPER_WOLF_DANCER", "STONE_BANSHEE", "HERO_BANSHEE", "STONE_RAGING_REVENANT", "HERO_RAGING_REVENANT", "STONE_SILENT_SPIRIT", "HERO_SILENT_SPIRIT", "STONE_SPECTRAL_DRAGON", "HERO_SPECTRAL_DRAGON", "SKIN_CYCLOPS_WIZARD_MASTERY", "SKIN_DEMON_TOTEM_MASTERY", "SKIN_SATYR_MASTERY", "SKIN_SHADOW_ASSASSIN_MASTERY", "SKIN_STORM_DRAGON_MASTERY", "REEL_SICK_MULLET", "REEL_ORBITAL_KITTY",
"REEL_HAMMER_TIME", "SHARD_VOLATILE_SMOOTHIE", "SHARD_RING_OF_ILL_WILL", "SHARD_LITTLE_PRICKS", "SHARD_FOUR_D_GLASSES", "SHARD_REEL_SICK_MULLET", "SHARD_REEL_ORBITAL_KITTY", "SHARD_REEL_HAMMER_TIME", "SKIN_COSMIC_ELF_ALIEN", "SKIN_DEMON_TOTEM_KITTEN", "SKIN_SAVAGE_CUTIE_TADPOLE", "SKIN_DARK_HORSE_MASTERY", "SKIN_UNSTABLE_UNDERSTUDY_BALLERINA", "SKIN_BONE_DRAGON_MASTERY", "SKIN_DWARVEN_ARCHER_MASTERY", "SKIN_FAITH_HEALER_MASTERY", "SKIN_FROST_GIANT_FLAMING", "STONE_WEREDRAGON", "HERO_WEREDRAGON", "BOOM_BOX",
"UPHOLSTERED_THRONE", "SHOES_OF_THE_MAD_GOD", "LOST_CONCEPT_ART", "LIGHTNING_GREASE", "PHAT_PANTS", "HEAL_AID", "BRAIN_PILLS", "FLAMEY_POOFS", "TUNNEL_VISION", "STAY_BOARD", "CAVE_DAGGER", "DESERT_SMASHER", "FEATHER_WEIGHT_PAULDRONS", "MUSCLE_BOUND_BOOK", "HOT_ARMOR", "REEL_BOOM_BOX", "REEL_UPHOLSTERED_THRONE", "REEL_SHOES_OF_THE_MAD_GOD", "SHARD_LOST_CONCEPT_ART", "SHARD_LIGHTNING_GREASE", "SHARD_PHAT_PANTS", "SHARD_HEAL_AID", "SHARD_REEL_BOOM_BOX", "SHARD_REEL_UPHOLSTERED_THRONE", "SHARD_REEL_SHOES_OF_THE_MAD_GOD",
"STONE_WEE_WITCH", "HERO_WEE_WITCH", "HERO_DUNGEON_MAN", "STONE_DUNGEON_MAN", "STONE_PLAGUE_ENTREPRENEUR", "HERO_PLAGUE_ENTREPRENEUR", "SKIN_MEDUSA_BLACK_MAMBA", "SKIN_GROOVY_DRUID_MASTERY", "SKIN_HYDRA_MASTERY", "SKIN_ORC_MONK_ORCS", "SKIN_DRAGZILLA_DRAG", "HERO_MISTRESS_MANICURE", "STONE_MISTRESS_MANICURE", "STONE_VILE_BILE", "HERO_VILE_BILE", "SKIN_NINJA_DWARF_DATENIGHT", "SKIN_RABID_DRAGON_MASTERY", "SKIN_CENTAUR_OF_ATTENTION_MASTERY", "STONE_VOID_WYVERN", "SKIN_ORC_MONK_UNCLE", "EYE_ON_THE_PRIZE", "BRAIN_GUARD_9000",
"BEARLY_THERE_BOOTS", "TIME_KILLER", "DOUBLE_BLADED_SWORD", "SOUL_PUPPET", "HEARTY_CHEST", "MIND_MAP", "TIME_SAVER", "CANNON_CANOE", "NEW_KNIGHT_IN_TOWN", "BLACKSMITH_BREW", "ARCANE_DOODLES", "BELL_OF_SILENCE", "FEATHERWEIGHT_WINGS", "ADVENTURERS_STARTER_PACK", "REEL_EYE_ON_THE_PRIZE", "REEL_BRAIN_GUARD_9000", "REEL_BEARLY_THERE_BOOTS", "SHARD_TIME_KILLER", "SHARD_DOUBLE_BLADED_SWORD", "SHARD_SOUL_PUPPET", "SHARD_HEARTY_CHEST", "SHARD_REEL_EYE_ON_THE_PRIZE", "SHARD_REEL_BRAIN_GUARD_9000", "SHARD_REEL_BEARLY_THERE_BOOTS",
"SKIN_STOWAWAY_SANTAS_HELPER", "SKIN_FROST_GIANT_FURIOUS", "SKIN_BONE_DRAGON_PEPPERMINT", "SKIN_BARDBARIAN_WOOD_ELF", "SKIN_MOON_DRAKE_FESTIVE_FAIRY", "SKIN_DWARVEN_ARCHER_ROMANTIC", "SKIN_RABID_DRAGON_DOGGY", "SKIN_PIRATE_SPACE", "SKIN_SILENT_SPIRIT_CLOWN", "SKIN_PIRATE_MASTERY", "SKIN_DUST_DEVIL_MASTERY", "SKIN_ORC_MONK_MASTERY", "HERO_VOID_WYVERN", "SKIN_AQUATIC_MAN_MASTERY", "SKIN_FROST_GIANT_MASTERY", "SKIN_BANSHEE_BUTTON_DOLL", "SKIN_COSMIC_ELF_MASTERY", "MY_JAM", "CREATINE_CACTUS", "MUNDANE_MUSHROOMS",
"CROWNING_ACHIEVEMENT", "FRIENDZONITE", "THE_HUSTLE", "FLOPPIN_FLIP_FLOPS", "VOLCANIC_BLADE", "ENGAGEMENT_KNUCKLES", "MOON_LIGHT", "GREAT_HORNED_HORN", "HEART_HEALTH_CANDY", "GROUND_GEARS", "CLOAK_OF_THE_OWL", "DODGY_JEWELRY", "ALCHEMIST_STARTER_PACK", "REEL_FLOPPIN_FLIP_FLOPS", "REEL_HEART_HEALTH_CANDY", "REEL_CLOAK_OF_THE_OWL", "SHARD_REEL_FLOPPIN_FLIP_FLOPS", "SHARD_REEL_HEART_HEALTH_CANDY", "SHARD_REEL_CLOAK_OF_THE_OWL", "SHARD_CREATINE_CACTUS", "SHARD_MUNDANE_MUSHROOMS", "SHARD_THE_HUSTLE", "SHARD_GROUND_GEARS",
"STONE_BURNT_ONE", "HERO_BURNT_ONE", "SKIN_DOPPELGANGER_MOLTEN", "CRUDE_SHIELD", "DWARVEN_LIFTING_BELT", "PURPLE_CHEST_ROLL_X1", "ORANGE_CHEST_ROLL_X1", "SKIN_STOWAWAY_MASTERY", "SKIN_DOPPELGANGER_MASTERY", "SKIN_KRAKEN_KING_MASTERY", "SKIN_MAGIC_DRAGON_MASTERY", "SKIN_SNIPER_WOLF_ASTRAL_SPIRIT", "SKIN_BARDBARIAN_HIGHSCORE", "SKIN_GENIE_TARNISHED_DJINN", "SKIN_AQUATIC_MAN_MANATEE", "SKIN_UNICORGI_RAINBOW", "SKIN_BONE_DRAGON_ADAMANTIUM", "SKIN_SATYR_WOLF", "SKIN_MOON_DRAKE_MECHA", "SKIN_PLANT_SOUL_COUNTRY", "SKIN_SKELETON_KING_ASCENDANT",
"SKIN_SKELETON_DEER_ASCENDANT_DEER", "STONE_TOMB_ANGEL", "HERO_TOMB_ANGEL", "STONE_ANGELIC_HERALD", "HERO_ANGELIC_HERALD", "STONE_BULWARK_ANGEL", "HERO_BULWARK_ANGEL", "HERO_ANGEL_DRAGON", "STONE_ANGEL_DRAGON", "AGED_DRAGON_MILK", "ANCIENT_CODE", "AUTO_FLUTE", "BLUNT_BLADE", "DRACONIC_FUSE", "FLATTERING_MIRROR", "GIANTS_GROG", "ILLUSORY_HURDLE", "LION_LIQUEUR", "LOST_GREAVES", "POISONED_DAGGER", "RINGS_OF_A_FEATHER", "SPIDER_BOMB", "VANISHING_SCROLL", "SHARD_GIANTS_GROG", "REEL_FLATTERING_MIRROR", "REEL_BLUNT_BLADE",
"REEL_LOST_GREAVES", "SHARD_AGED_DRAGON_MILK", "SHARD_POISONED_DAGGER", "SHARD_RINGS_OF_A_FEATHER", "SHARD_REEL_FLATTERING_MIRROR", "SHARD_REEL_BLUNT_BLADE", "SHARD_REEL_LOST_GREAVES", "STONE_DRAGON_SLAYER", "HERO_DRAGON_SLAYER", "STONE_ETERNAL_ENCHANTER", "HERO_ETERNAL_ENCHANTER", "STONE_GRAND_HUNTRESS", "HERO_GRAND_HUNTRESS", "STONE_TRIPLE_THREAT", "HERO_TRIPLE_THREAT", "SKIN_RAGING_REVENANT_MASTERY", "SKIN_VULTURE_DRAGON_MASTERY", "TRIASSIC_TRINKET", "RUBY_FLIP_FLOPS", "PURIFICATION_ROBE", "DENSE_CAKE_OF_HATE",
"CRUDE_SNIPPERS", "MAD_GODS_MUG", "GOLDEN_SLINGSHOT", "CAT_O_NINE_TAILS", "FEATHER_WEIGHT_FOIL", "TOME_OF_CURSED_HORTICULTURE", "ESCUTCHEON_OF_EYES", "SOUL_FOR_POWER_VOLUME_45", "OGRES_BATTERING_RAM", "COG_NITIVE_MASK", "BUNNY_BLADE", "HEART_HAT", "DRAGON_BLANKIE", "RING_OF_FIRE", "NAUGHTY_TAPESTRY", "MANLY_FIRST_AID_KIT", "SHARD_CRUDE_SNIPPERS", "SHARD_MAD_GODS_MUG", "SHARD_GOLDEN_SLINGSHOT", "SHARD_CAT_O_NINE_TAILS", "SHARD_DRAGON_BLANKIE", "SHARD_RING_OF_FIRE", "SHARD_NAUGHTY_TAPESTRY", "SHARD_MANLY_FIRST_AID_KIT",
"REEL_ROCKET_CLOAK", "REEL_ANCIENT_CODE", "REEL_BLACKSMITH_BREW", "REEL_FEATHER_WEIGHT_PAULDRONS", "REEL_TRIASSIC_TRINKET", "REEL_RUBY_FLIP_FLOPS", "REEL_PURIFICATION_ROBE", "REEL_DENSE_CAKE_OF_HATE", "SREEL_FEATHER_WEIGHT_FOIL", "REEL_TOME_OF_CURSED_HORTICULTURE", "REEL_ESCUTCHEON_OF_EYES", "REEL_SOUL_FOR_POWER_VOLUME_45", "REEL_OGRES_BATTERING_RAM", "REEL_COG_NITIVE_MASK", "REEL_BUNNY_BLADE", "REEL_HEART_HAT", "REEL_FEATHER_WEIGHT_FOIL", "SHARD_REEL_ANCIENT_CODE", "SHARD_REEL_BLACKSMITH_BREW", "SHARD_REEL_BUNNY_BLADE",
"SHARD_REEL_DENSE_CAKE_OF_HATE", "SHARD_REEL_ESCUTCHEON_OF_EYES", "SHARD_REEL_FEATHER_WEIGHT_FOIL", "SHARD_REEL_FEATHER_WEIGHT_PAULDRONS", "SHARD_REEL_HEART_HAT", "SHARD_REEL_OGRES_BATTERING_RAM", "SHARD_REEL_PURIFICATION_ROBE", "SHARD_REEL_ROCKET_CLOAK", "SHARD_REEL_RUBY_FLIP_FLOPS", "SHARD_REEL_SOUL_FOR_POWER_VOLUME_45", "SHARD_REEL_TOME_OF_CURSED_HORTICULTURE", "SHARD_REEL_TRIASSIC_TRINKET", "STONE_LAST_DEFENDER", "HERO_LAST_DEFENDER", "STONE_SOJOURNER_SORCERESS", "HERO_SOJOURNER_SORCERESS", "STONE_KARAOKE_KING",
"HERO_KARAOKE_KING", "SHARD_REEL_COG_NITIVE_MASK", "SKIN_SOJOURNER_SORCERESS_CHRISTMAS", "STONE_SHADOW_OF_SVEN", "HERO_SHADOW_OF_SVEN", "STONE_SUN_SEEKER", "HERO_SUN_SEEKER", "STONE_STEPLADDER_BROTHERS", "HERO_STEPLADDER_BROTHERS", "STONE_FORGOTTEN_DRAGON", "HERO_FORGOTTEN_DRAGON", "SKIN_WEE_WITCH_MASTERY", "SKIN_BANSHEE_MASTERY", "SKIN_SILENT_SPIRIT_MASTERY", "SKIN_SPECTRAL_DRAGON_MASTERY", "TEAM_XP_BONUS_ITEM_12_HOUR", "TEAM_XP_BONUS_ITEM_24_HOUR", "TEAM_XP_BONUS_ITEM_72_HOUR", "BRACELET_OF_LIGHTNING", "HELMET_OF_FORESIGHT",
"DRAGONS_BLADE", "GREAVES_OF_PLEIAS", "SWORD_OF_DESPAIR", "RING_OF_TEMPTATION", "MAI_TAI_OF_IMMUNITY", "WRAITH_BARRIER", "GAUNTLET_OF_THRONE", "BOOK_OF_IRMAC", "PHOENIX_TALISMAN", "LAZARUS_BEANS", "REEL_BRACELET_OF_LIGHTNING", "REEL_HELMET_OF_FORESIGHT", "REEL_DRAGONS_BLADE", "REEL_GREAVES_OF_PLEIAS", "REEL_SWORD_OF_DESPAIR", "REEL_RING_OF_TEMPTATION", "REEL_MAI_TAI_OF_IMMUNITY", "REEL_WRAITH_BARRIER", "SHARD_GAUNTLET_OF_THRONE", "SHARD_BOOK_OF_IRMAC", "SHARD_PHOENIX_TALISMAN", "SHARD_LAZARUS_BEANS", "SHARD_REEL_BRACELET_OF_LIGHTNING",
"SHARD_REEL_HELMET_OF_FORESIGHT", "SHARD_REEL_DRAGONS_BLADE", "SHARD_REEL_GREAVES_OF_PLEIAS", "SHARD_REEL_SWORD_OF_DESPAIR", "SHARD_REEL_RING_OF_TEMPTATION", "SHARD_REEL_MAI_TAI_OF_IMMUNITY", "SHARD_REEL_WRAITH_BARRIER", "SKIN_CYCLOPS_WIZARD_VALENTINE", "SKIN_ROLLER_WARRIOR_VALENTINE", "STONE_BLACK_WING", "HERO_BLACK_WING", "STONE_GREED_DRAGON", "HERO_GREED_DRAGON", "STONE_UNRIPE_MYTHOLOGY", "HERO_UNRIPE_MYTHOLOGY", "SKIN_WEREDRAGON_MASTERY", "SKIN_DUNGEON_MAN_MASTERY", "STEAM_ENGINE", "IRON_HELMET_OF_BIKING",
"ADVENTURERS_RIDES", "DRAGON_LEATHER_TIGHTS", "BONE_CRUSHING_PLIERS", "MYSTERIOUS_EGG", "MAGICAL_PEST_MAST", "THE_SHIELD_STOPS_YOU", "DOUBLE_AXE", "DEVILS_POT", "DRAGONS_POCKET_WATCH", "FAMILIAR_ENERGY_TANK", "REEL_STEAM_ENGINE", "REEL_IRON_HELMET_OF_BIKING", "REEL_ADVENTURERS_RIDES", "REEL_DRAGON_LEATHER_TIGHTS", "REEL_BONE_CRUSHING_PLIERS", "REEL_MYSTERIOUS_EGG", "REEL_MAGICAL_PEST_MAST", "REEL_THE_SHIELD_STOPS_YOU", "SHARD_DOUBLE_AXE", "SHARD_DEVILS_POT", "SHARD_DRAGONS_POCKET_WATCH", "SHARD_FAMILIAR_ENERGY_TANK",
"SHARD_REEL_STEAM_ENGINE", "SHARD_REEL_IRON_HELMET_OF_BIKING", "SHARD_REEL_ADVENTURERS_RIDES", "SHARD_REEL_DRAGON_LEATHER_TIGHTS", "SHARD_REEL_BONE_CRUSHING_PLIERS", "SHARD_REEL_MYSTERIOUS_EGG", "SHARD_REEL_MAGICAL_PEST_MAST", "SHARD_REEL_THE_SHIELD_STOPS_YOU", "WORLD_EGG", "SKIN_WEE_WITCH_EASTER", "SKIN_ETERNAL_ENCHANTER_EASTER", "SKIN_SPECTRAL_DRAGON_EASTER", "SKIN_DRUIDINATRIX_EASTER", "STONE_ANCIENT_DWARF", "HERO_ANCIENT_DWARF", "STONE_DIGGER_MOLE", "HERO_DIGGER_MOLE", "STONE_SADISTIC_DANCER", "HERO_SADISTIC_DANCER",
"DRAGON_SAND_BOOTS", "PYRAMID_POWER", "NAVIGATION_TO_THE_PAST", "BALANCE_OF_LIFE", "MIRACLE_FURNACE_OF_BLACKSMITH", "GOOD_SLEEPING_BED", "SUNBLOCK_GOGGLES", "SAND_STORM", "MASK_OF_THE_ANCIENT_KING", "MAGICAL_CREAM", "DANCERS_BRA", "PRICKLING_WHIP", "WILDYS_HAT", "IRON_CLAWS", "MAGICAL_WATER_BOTTLE", "REEL_DRAGON_SAND_BOOTS", "REEL_PYRAMID_POWER", "REEL_NAVIGATION_TO_THE_PAST", "REEL_BALANCE_OF_LIFE", "REEL_MIRACLE_FURNACE_OF_BLACKSMITH", "REEL_GOOD_SLEEPING_BED", "REEL_SUNBLOCK_GOGGLES", "REEL_SAND_STORM", "REEL_MASK_OF_THE_ANCIENT_KING",
"REEL_MAGICAL_CREAM", "REEL_DANCERS_BRA", "SHARD_PRICKLING_WHIP", "SHARD_WILDYS_HAT", "SHARD_IRON_CLAWS", "SHARD_MAGICAL_WATER_BOTTLE", "SHARD_REEL_DRAGON_SAND_BOOTS", "SHARD_REEL_PYRAMID_POWER", "SHARD_REEL_NAVIGATION_TO_THE_PAST", "SHARD_REEL_BALANCE_OF_LIFE", "SHARD_REEL_MIRACLE_FURNACE_OF_BLACKSMITH", "SHARD_REEL_GOOD_SLEEPING_BED", "SHARD_REEL_SUNBLOCK_GOGGLES", "SHARD_REEL_SAND_STORM", "SHARD_REEL_MASK_OF_THE_ANCIENT_KING", "SHARD_REEL_MAGICAL_CREAM", "SHARD_REEL_DANCERS_BRA", "SKIN_MISTRESS_MANICURE_MASTERY",
"SKIN_VOID_WYVERN_MASTERY", "SKIN_DRAGZILLA_MASTERY", "SKIN_ETERNAL_ENCHANTER_MASTERY", "SKIN_ZOMBIE_SQUIRE_DIGITAL", "SKIN_DRAGON_LADY_SPACE_KNIGHT", "SKIN_SHADOW_ASSASSIN_WATCH", "SKIN_CYCLOPS_WIZARD_CYCLEOPS", "SKIN_VOID_WYVERN_IMAGINATION", "SKIN_DEEP_DRAGON_WYRM", "BOSS_BATTLE_STAGE_RESET", "ANNIVERSARY_1000TH_RESKIN", "DOUBLE_EXPERT_CAMPAIGN_DROPS", "STONE_WHITE_TIGRESS", "HERO_WHITE_TIGRESS", "STONE_SNAPPER_BONE", "HERO_SNAPPER_BONE", "DEDICATED_MEDUSA", "DEDICATED_GENIE", "DEDICATED_DRAGON_LADY", "DEDICATED_SATYR",
"DEDICATED_CENTAUR_OF_ATTENTION", "REEL_DEDICATED_MEDUSA", "REEL_DEDICATED_GENIE", "REEL_DEDICATED_DRAGON_LADY", "REEL_DEDICATED_SATYR", "REEL_DEDICATED_CENTAUR_OF_ATTENTION", "SHARD_REEL_DEDICATED_MEDUSA", "SHARD_REEL_DEDICATED_GENIE", "SHARD_REEL_DEDICATED_DRAGON_LADY", "SHARD_REEL_DEDICATED_SATYR", "SHARD_REEL_DEDICATED_CENTAUR_OF_ATTENTION", "STONE_VERMILION_PRIESTESS", "HERO_VERMILION_PRIESTESS", "SKIN_ANGEL_DRAGON_FALLEN", "SKIN_BURNT_ONE_VOODOO", "SKIN_CURSED_STATUE_HAWAII", "SKIN_DRAGON_SLAYER_UNICORN",
"SKIN_GROOVY_DRUID_DISCO", "SKIN_KRAKEN_KING_MECHALORD", "SKIN_DRUIDINATRIX_MASTERY", "SKIN_ROLLER_WARRIOR_MASTERY", "SKIN_PLANT_SOUL_MASTERY", "SKIN_SPIDER_QUEEN_MASTERY", "HERMITS_PILLS", "SECRET_HAND_SCROLL", "EXOTIC_FAN", "FINS_OF_SEA_DRAGON", "TIGER_UNDERWEAR", "GOLD_RUSH", "SAMURAI_SWORD", "GOURD", "MAGATAMA", "TIGER_SALVE", "WARRIORS_HELMET", "FEATHER_OF_PHOENIX", "REEL_HERMITS_PILLS", "REEL_SECRET_HAND_SCROLL", "REEL_EXOTIC_FAN", "REEL_FINS_OF_SEA_DRAGON", "REEL_TIGER_UNDERWEAR", "REEL_GOLD_RUSH", "REEL_SAMURAI_SWORD",
"REEL_GOURD", "REEL_MAGATAMA", "REEL_TIGER_SALVE", "REEL_WARRIORS_HELMET", "REEL_FEATHER_OF_PHOENIX", "SHARD_REEL_HERMITS_PILLS", "SHARD_REEL_SECRET_HAND_SCROLL", "SHARD_REEL_EXOTIC_FAN", "SHARD_REEL_FINS_OF_SEA_DRAGON", "SHARD_REEL_TIGER_UNDERWEAR", "SHARD_REEL_GOLD_RUSH", "SHARD_REEL_SAMURAI_SWORD", "SHARD_REEL_GOURD", "SHARD_REEL_MAGATAMA", "SHARD_REEL_TIGER_SALVE", "SHARD_REEL_WARRIORS_HELMET", "SHARD_REEL_FEATHER_OF_PHOENIX", "SKIN_DRAGON_LADY_ANNIVERSARY_1000TH", "KEY_TO_THE_KINGDOM", "GREENISH_LANTERN",
"CHAIN_WALLET", "SKIN_BROZERKER_VEGAS_DUDE", "SKIN_UNICORGI_PIZZA_MANAGER_CORGI", "SKIN_ROLLER_WARRIOR_DERBY_GIRL", "SKIN_BARDBARIAN_EMO_FREDDIE", "SKIN_NINJA_DWARF_FRIGGING_RABBIT", "SKIN_DWARVEN_ARCHER_DWARVEN_HUNTRESS", "SKIN_CRIMSON_WITCH_CRIMSON_PANDA", "SKIN_PLANT_SOUL_HORSEY_SOUL", "SKIN_COSMIC_ELF_VELVETEEN_FOX", "SKIN_GENIE_RANDOM_TUSKER", "STONE_PCH_ANUBIS_DRAGON", "HERO_PCH_ANUBIS_DRAGON", "STONE_ABYSS_DRAGON", "HERO_ABYSS_DRAGON", "STONE_UMLAUT_THE_FIRST", "HERO_UMLAUT_THE_FIRST", "SKIN_NPC_ANUBIS_DRAGON_MASTERY",
"SKIN_PCH_ANUBIS_DRAGON_MASTERY", "SKIN_ABYSS_DRAGON_MASTERY", "SKIN_VOID_WYVERN_TAPIR", "SKIN_SPIKEY_DRAGON_ROTUNDITY", "SKIN_SPIDER_QUEEN_TURTLE", "SKIN_CURSED_STATUE_MEER", "LEGENDARY_QUEST_SKIP", "END_CENTURY_FLAME_RADIATOR", "REEL_END_CENTURY_FLAME_RADIATOR", "SHARD_REEL_THE_SPEAR_BRINGS_VICTORY", "PIECE_OF_ACOLYTE_STATUE", "REEL_PIECE_OF_ACOLYTE_STATUE", "SHARD_REEL_DRAGON_SCALE_GROVE", "THE_SPEAR_BRINGS_VICTORY", "REEL_THE_SPEAR_BRINGS_VICTORY", "SHARD_REEL_END_CENTURY_FLAME_RADIATOR", "DROP_OF_MOONLIGHT",
"REEL_DROP_OF_MOONLIGHT", "SHARD_REEL_DROP_OF_MOONLIGHT", "DRAGON_SCALE_GROVE", "REEL_DRAGON_SCALE_GROVE", "SHARD_REEL_PIECE_OF_ACOLYTE_STATUE", "EXPLOSIVE_CANNON", "REEL_EXPLOSIVE_CANNON", "SHARD_REEL_EXPLOSIVE_CANNON", "CLOUDY_MONOCULAR_TELESCOPE", "REEL_CLOUDY_MONOCULAR_TELESCOPE", "SHARD_REEL_CLOUDY_MONOCULAR_TELESCOPE", "BANANA_PEEL_MOUNTAIN", "REEL_BANANA_PEEL_MOUNTAIN", "SHARD_REEL_BANANA_PEEL_MOUNTAIN", "DRACONIAN_DISH", "REEL_DRACONIAN_DISH", "SHARD_REEL_DRACONIAN_DISH", "PORTABLE_NUTRITIOUS_DIET",
"REEL_PORTABLE_NUTRITIOUS_DIET", "SHARD_REEL_PORTABLE_NUTRITIOUS_DIET", "ANCIENT_COIN", "REEL_ANCIENT_COIN", "SHARD_REEL_ANCIENT_COIN", "FAMILY_TREE_OF_UMLAUT", "REEL_FAMILY_TREE_OF_UMLAUT", "SHARD_REEL_FAMILY_TREE_OF_UMLAUT", "DEDICATED_BROZERKER", "REEL_DEDICATED_BROZERKER", "SHARD_REEL_DEDICATED_BROZERKER", "DEDICATED_COSMIC_ELF", "REEL_DEDICATED_COSMIC_ELF", "SHARD_REEL_DEDICATED_COSMIC_ELF", "DEDICATED_ORC_MONK", "REEL_DEDICATED_ORC_MONK", "SHARD_REEL_DEDICATED_ORC_MONK", "DEDICATED_ROLLER_WARRIOR", "REEL_DEDICATED_ROLLER_WARRIOR",
"SHARD_REEL_DEDICATED_ROLLER_WARRIOR", "DEDICATED_SHADOW_ASSASSIN", "REEL_DEDICATED_SHADOW_ASSASSIN", "SHARD_REEL_DEDICATED_SHADOW_ASSASSIN", "SKIN_ANGELIC_HERALD_PIGEON", "SKIN_BULWARK_ANGEL_SWAN", "SKIN_GRAND_HUNTRESS_LEOPARD", "SKIN_KARAOKE_KING_MONKEY", "SKIN_LAST_DEFENDER_BUFFALO", "SKIN_MISTRESS_MANICURE_BAT", "SKIN_CURSED_STATUE_USERCONTEST", "SKIN_ANGEL_DRAGON_USERCONTEST", "SKIN_MOON_DRAKE_USERCONTEST", "SKIN_ETERNAL_ENCHANTER_USERCONTEST", "SKIN_TOMB_ANGEL_USERCONTEST", "SKIN_DRAGON_LADY_3RD_ANNIVERSARY",
"SKIN_DARK_DRACUL_HORROR", "SKIN_STEPLADDER_BROTHERS_HORROR", "SKIN_COSMIC_ELF_HORROR", "SKIN_MEDUSA_HORROR", "SKIN_WEE_WITCH_HORROR", "SKIN_UMLAUT_THE_FIRST_MASTERY", "SOUL_OF_DRAGONS", "SKIN_ANCIENT_DWARF_MECHA", "SKIN_BLACK_WING_MECHA", "SKIN_DRAGZILLA_MECHA", "SKIN_DUNGEON_MAN_MECHA", "SKIN_ORC_MONK_MECHA", "SKIN_UNSTABLE_UNDERSTUDY_3RD_ANNIVERSARY", "SKIN_ELECTROYETI_3RD_ANNIVERSARY", "SKIN_BROZERKER_MASTERY", "SKIN_UNICORGI_MASTERY", "SKIN_BARDBARIAN_MASTERY", "SKIN_SADISTIC_DANCER_MECHA", "SKIN_SHADOW_OF_SVEN_MECHA",
"SKIN_MINOTAUR_MASTERY", "SKIN_UNRIPE_MYTHOLOGY_WINTER", "SKIN_SADISTIC_DANCER_WINTER", "SKIN_DRAGON_SLAYER_WINTER", "SKIN_ABYSS_DRAGON_WINTER", "SKIN_TOMB_ANGEL_WINTER", "DEDICATED_DEEP_DRAGON", "DEDICATED_DEMON_TOTEM", "DEDICATED_SNAP_DRAGON", "DEDICATED_NINJA_DWARF", "DEDICATED_UNSTABLE_UNDERSTUDY", "REEL_DEDICATED_DEEP_DRAGON", "REEL_DEDICATED_DEMON_TOTEM", "REEL_DEDICATED_SNAP_DRAGON", "REEL_DEDICATED_NINJA_DWARF", "REEL_DEDICATED_UNSTABLE_UNDERSTUDY", "SHARD_REEL_DEDICATED_DEEP_DRAGON", "SHARD_REEL_DEDICATED_DEMON_TOTEM",
"SHARD_REEL_DEDICATED_SNAP_DRAGON", "SHARD_REEL_DEDICATED_NINJA_DWARF", "SHARD_REEL_DEDICATED_UNSTABLE_UNDERSTUDY", "GEAR_TICKET_CYAN", "GEAR_TICKET_ORANGE", "GEAR_TICKET_PURPLE", "SKIN_CRIMSON_WITCH_MASTERY", "SKIN_SNAPPER_BONE_LIZARD_BONE", "SKIN_WHITE_TIGRESS_CAT_WOMAN", "SKIN_VERMILION_PRIESTESS_CLERIC_OF_FALCONERS", "SKIN_RAGING_REVENANT_DOCTORING_REVENANT", "STONE_DARK_HERO", "HERO_DARK_HERO", "STONE_CLAW_MAN", "HERO_CLAW_MAN", "SKIN_SAVAGE_CUTIE_MASTERY", "SKIN_SPECTRAL_DRAGON_REDDRAGON", "SKIN_SUN_SEEKER_SNOW",
"SKIN_STOWAWAY_BUISNESS", "SKIN_WEREDRAGON_FLORIST", "MAGICAL_HATRACK", "SHINING_HOLY_TREE", "HORNS_OF_WHITE_DEER", "LORD_OF_RIVER", "GOLD_AX_SILVER_AX", "POISONED_SILVER_ACCESSORY_OF_SCORPION", "HANDY_RASP", "BLACKBERRY_JAM", "CRYSTAL_MUSHROOM", "REMOTE_COMMUNICATION_FLOWER", "SHINING_LIGHT_OF_FIREFLY", "SHRIMPISH_CREATURE", "REEL_MAGICAL_HATRACK", "REEL_SHINING_HOLY_TREE", "REEL_HORNS_OF_WHITE_DEER", "REEL_LORD_OF_RIVER", "REEL_GOLD_AX_SILVER_AX", "REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION", "REEL_HANDY_RASP",
"REEL_BLACKBERRY_JAM", "REEL_CRYSTAL_MUSHROOM", "REEL_REMOTE_COMMUNICATION_FLOWER", "REEL_SHINING_LIGHT_OF_FIREFLY", "REEL_SHRIMPISH_CREATURE", "SHARD_REEL_MAGICAL_HATRACK", "SHARD_REEL_SHINING_HOLY_TREE", "SHARD_REEL_HORNS_OF_WHITE_DEER", "SHARD_REEL_LORD_OF_RIVER", "SHARD_REEL_GOLD_AX_SILVER_AX", "SHARD_REEL_POISONED_SILVER_ACCESSORY_OF_SCORPION", "SHARD_REEL_HANDY_RASP", "SHARD_REEL_BLACKBERRY_JAM", "SHARD_REEL_CRYSTAL_MUSHROOM", "SHARD_REEL_REMOTE_COMMUNICATION_FLOWER", "SHARD_REEL_SHINING_LIGHT_OF_FIREFLY",
"SHARD_REEL_SHRIMPISH_CREATURE", "VIP", "MONTHLY_DEAL", "CHAT_RULES", "TITAN_TEMPLE_OWNER", "TITAN_TEMPLE_OTHER", "HERO_STATS", "GUILD", "WAR", "LEGENDARY", "CONTESTS", "IAP_PURCHASING", "BOSS_BATTLE_REWARD", "BOSS_BATTLE_LAYER", "FIGHT_PIT_ATTACK", "THE_SUMMIT_ATTACK", "THE_CAVES_ATTACK", "CHALLENGES_MAGIC_ATTACK", "CHALLENGES_PHYSICAL_ATTACK", "CHALLENGES_DRAGON_ATTACK", "COLISEUM_ATTACK", "WAR_OPT_OUT", "NORMAL_CAMPAIGN", "FIGHT_PIT_DEFENSE", "CRYPT_RAID", "COLISEUM_DEFENSE_1", "COLISEUM_DEFENSE_2", "COLISEUM_DEFENSE_3",
"COLISEUM_ATTACK_1", "COLISEUM_ATTACK_2", "COLISEUM_ATTACK_3", "BOSS_PIT_EVIL_WIZARD_1", "BOSS_PIT_EVIL_WIZARD_2", "BOSS_PIT_EVIL_WIZARD_3", "BOSS_PIT_GIANT_PLANT_1", "BOSS_PIT_GIANT_PLANT_2", "BOSS_PIT_GIANT_PLANT_3", "BOSS_PIT_GOLDEN_COLOSSUS_1", "BOSS_PIT_GOLDEN_COLOSSUS_2", "BOSS_PIT_GOLDEN_COLOSSUS_3", "GUILD_WAR_ATTACK", "GUILD_WAR_DEFENSE_1", "GUILD_WAR_DEFENSE_2", "GUILD_WAR_DEFENSE_3", "interface ", "class ", "TitanTempleSummaries1", "white", "black", "soft_blue", "soft_purple", "soft_orange", "soft_red",
"quest", "item", "gem", "pink", "bright_blue", "war_progress_blue", "bright_green", "red", "attack_health_red", "green", "attack_health_green", "blue", "purple", "yellow", "yellow_pow", "orange", "cyan", "vip", "gray", "light_gray", "gray_blue", "med_blue", "progress_battle_green", "progress_soul_stones", "progress_experience", "progress_vip", "main_dim", "main_lit", "campaign_heading_gold", "tut_gold", "brown", "coliseum_brown", "coliseum_platinum", "soft_green", "personal_message_purple", "gear_red", "ExpeditionRunData1",
"DragonSoul Web Prototype", "PrivateUserInfo1", "BossPitData1", "LAST_NON_FREE_TIME_ZONE_CHANGE", "CHAT_SILENCE_END", "MONTHLY_DIAMOND_END", "LAST_DAILY_RESET", "LAST_MONTHLY_SIGNIN", "LAST_SPECIAL_EVENT_CHECK", "LAST_USER_DAILY_RESET", "LAST_EVENT_VIEW_TIME", "LAST_MERCHANT_VIEW_TIME", "LAST_MERCENARY_EARN_RESET", "LAST_PURCHASE", "LAST_EVENT_CHEST_RESET", "MONTHLY_CARD_EXPIRE_TIME", "TEMPLE_EXPIRATION", "LAST_GUILD_WALL_VIEW", "LAST_SOUL_CHEST_RESET", "DOUBLE_NORMAL_DROP_ITEM_END", "DOUBLE_ELITE_DROP_ITEM_END",
"LAST_MONTHLY_SERVER_SIGNIN", "LAST_DOUBLE_NORMAL_PAUSE", "LAST_DOUBLE_ELITE_PAUSE", "GUILD_LEAVE_TIME", "TEMPORARY_VIP_END", "LAST_TIME_ZONE_CHANGE", "CHAT_APP_AUTH_TOKEN_IAT", "CHAT_APP_LAST_LOGIN", "LAPSED_CATCH_UP_LAST_LOGOUT", "LAST_CHESTS_VIEW_TIME", "DOUBLE_NORMAL_DROP_ITEM_START", "DOUBLE_ELITE_DROP_ITEM_START", "SUSPENSION_END", "LAST_SUSPENSION_TIME", "CRAFT_SUCCESS_START", "CRAFT_SUCCESS_END", "XP_BONUS_TEAM_START", "XP_BONUS_TEAM_END", "XP_BONUS_TEAM_PAUSE", "DOUBLE_EXPERT_DROP_ITEM_START", "DOUBLE_EXPERT_DROP_ITEM_END",
"LAST_DOUBLE_EXPERT_PAUSE", "NORMAL", "EXPEDITIONS", "PEDDLER", "BLACK_MARKET", "SOULMART", "BAZAAR", "[ERROR] ", "CHEST", "ALCHEMY", "LOOT", "COMBAT", "MERCHANT", "CHEST_SILVER_1", "CHEST_SILVER_10", "CHEST_GOLD_1", "CHEST_GOLD_10", "CHEST_SOUL", "CHEST_EVENT_1", "CHEST_EVENT_10", "GUILD_WAR_REWARDS", "SHRINE_WOODEN_DEFAULT", "SHRINE_WOODEN_KEYSTONE", "SHRINE_WOODEN_MAJOR_1", "SHRINE_WOODEN_MAJOR_2", "SHRINE_WOODEN_MINOR_1", "SHRINE_WOODEN_MINOR_2", "SHRINE_WOODEN_MINOR_3", "SHRINE_STONE_DEFAULT", "SHRINE_STONE_KEYSTONE",
"SHRINE_STONE_MAJOR_1", "SHRINE_STONE_MAJOR_2", "SHRINE_STONE_MINOR_1", "SHRINE_STONE_MINOR_2", "SHRINE_STONE_MINOR_3", "SHRINE_CRYSTAL_KEYSTONE", "SHRINE_CRYSTAL_MAJOR_1", "SHRINE_CRYSTAL_MAJOR_2", "SHRINE_CRYSTAL_MINOR_1", "SHRINE_CRYSTAL_MINOR_2", "SHRINE_CRYSTAL_MINOR_3", "BOSS_PIT_LOOT", "DIFFICULTY_MODE_LOOT", "EXPEDITION_CHEST", "CHEST_PURPLE_1", "CHEST_PURPLE_10", "CHEST_ORANGE_1", "CHEST_ORANGE_10", "MEMBER", "RULER", "OFFICER", "CHAMPION", "VETERAN", "NONE", "Avatar1", "SILVER_CHEST_ROLLS", "GOLD_CHEST_ROLLS",
"SOUL_CHEST_ROLLS", "PURPLE_CHEST_ROLLS", "ORANGE_CHEST_ROLLS", "CAMPAIGN_BATTLES_DONE", "ELITE_CAMPAIGN_BATTLES_DONE", "CAMPAIGN_UNLOCKED", "MONTHLY_DIAMOND_DAYS", "FREE_NAME_CHANGE", "FIGHT_PIT_VICTORIES", "CAMPAIGN_KILLS", "MERCENARY_GOLD", "BETA_0_2", "NO_LOOT_LAST_BATTLE", "BETA_0_3", "WW_1_0", "SILVER_10_CHEST_ROLLS", "GOLD_10_CHEST_ROLLS", "PURPLE_10_CHEST_ROLLS", "ORANGE_10_CHEST_ROLLS", "CHATS", "LAST_CRYPT_SCORE", "EVENT_CHEST_ROLLS", "EVENT_10_CHEST_ROLLS", "COLISEUM_RUNS", "COLISEUM_VICTORIES", "FREE_TIME_ZONE_RESET",
"UNLOCKED_HARD_EXPEDITION", "FACEBOOK_LIKED", "HOW_TO_PLAY_EXPEDITION", "HOW_TO_PLAY_VIP", "VIEWED_CRYPT_RESULTS", "TITANS_KILLED", "TEMPLE_INVITES", "TEMPLE_STAMINA_MEMORY", "TEMPLE_WIN_STREAK", "NEW_CHEST_SEEDS", "REPLAYKIT_COUNT", "NOT_FIRST_ACCOUNT", "PROMO_CODE_ATTEMPTS", "VIEWED_LAST_CHANCE_PROMO_WINDOW", "PAID_SOUL_CHEST_ROLLS", "VIEWED_SOULMART_INFO", "FREE_GOLD_CHEST_ROLLS", "FREE_PURPLE_CHEST_ROLLS", "FREE_ORANGE_CHEST_ROLLS", "TEMPROARY_VIP_LEVEL", "VIEWED_BATTLE_STATS", "L15_RUNES_CREATED", "GOT_TUTORIAL_RUNE",
"OPTED_OUT_OF_WAR", "WAR_ATTACK_ATTEMPTS", "GOT_TUTORIAL_RUNE_OFFERING", "TUTORIAL_RIGGED_RUNE_SHRINE", "FAILED_AN_EMPOWER", "MONTHLY_PURCHASE", "HAS_SEEN_CONTEST_START", "HAS_NEW_MAINSCREEN_CONTEST_PROGRESS", "IS_RUNE_TOGGLE_ON", "CHAT_APP_REWARD_SENT", "IN_LAPSED_CATCH_UP_PERIOD", "COMMUNITY_BUTTON_SHOWN_NAME_CHANGE_PROMPT", "EVENTS_WINDOW_ON_MAINSCREEN", "HAS_SKIN_FOR_TUTORIAL", "AB_VIP5_FREE_CONSUMABLE_SHOULD_BE_GIVEN", "EXPEDITION_MAX_DIFFICULTY", "VIP_TICKET_FIXED", "FIGHT_PIT_BATTLE_COUNT", "COLISEUM_BATTLE_COUNT",
"CRYPT_BATTLE_COUNT", "CRYPT_RAID_WIN_COUNT", "CRYPT_OPPONENTS_DEFEAT_COUNT", "CRYPT_OPPONENT_HEROES_DEFEAT_COUNT", "EXPEDITION_BATTLE_COUNT", "BOSS_PIT_BATTLE_COUNT", "TEMPLE_WIN_COUNT", "CONTEST_PARTICIPATION_COUNT", "BOSS_BATTLE_COUNT", "EXPERT_CAMPAIGN_BATTLES_DONE", "V1", "V2", "GLOBAL", "HERO_WALL", "GUILD_WALL", "PERSONAL_MESSAGE", "LOCAL", "http://", "localhost", "http://s3.amazonaws.com/qa-content.dragonsoulgame.com/dev/index.txt", "TRUNK", "https://", "trunk.dragonsoulgame.com", "http://s3.amazonaws.com/qa-content.dragonsoulgame.com/trunk/index.txt",
"DEV", "dev.dragonsoulgame.com", "QA1", "qa1.dragonsoulgame.com", "http://s3.amazonaws.com/qa-content.dragonsoulgame.com/qa1/index.txt", "QA2", "qa2.dragonsoulgame.com", "http://s3.amazonaws.com/qa-content.dragonsoulgame.com/qa2/index.txt", "LIVE", "127.0.0.1", "http://127.0.0.1:8080/live/index.txt", "BasicUserInfo1", "GuildInfo1", "IAPProducts1", "NANOSECONDS", "MICROSECONDS", "MILLISECONDS", "SECONDS", "MINUTES", "HOURS", "DAYS", "BasicGuildInfo1", "ANIMATION", "COMBAT_SIMULATOR", "COMBAT_RENDER", "COMBAT_AUTOMATOR",
"COMBAT_SIMULATOR_RANDOM"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(DragonSoulLauncher_main);
$rt_export_main.javaException = $rt_javaException;
$rt_exports.main = $rt_export_main;
}));
