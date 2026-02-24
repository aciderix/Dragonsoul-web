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
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B"),
$rt_intcls = $rt_createPrimitiveCls("int", "I");
if (typeof BigInt !== 'function') {
} else if (typeof BigInt64Array !== 'function') {
} else {
}
let $rt_imul = Math.imul || function(a, b) {
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
};
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
if (typeof BigInt !== "function") {
} else {
}
if (typeof BigInt !== 'function') {
    function LongInt(lo, hi, sup) {
        this.lo = lo;
        this.hi = hi;
        this.sup = sup;
    }
} else {
}
let $rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
};
if (typeof BigInt64Array !== 'function') {
} else {
}
let $rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
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
$rt_str = str => str === null ? null : jl_String__init_5(str),
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
    let err = ex.$jsException;
    if (!err) {
        let javaCause = $rt_throwableCause(ex);
        let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
        let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
        err = new JavaError("Java exception thrown", cause);
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
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
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
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
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = (jl_Object_getClass($this)).$getName();
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$3, var$1), 64), var$2);
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
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_1 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_2 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
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
jl_IndexOutOfBoundsException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_(var_0);
    return var_0;
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
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = otcic_JSStdoutPrintStream__init_0();
    return jl_System_outCache;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Comparable = $rt_classWithoutFields(0),
jl_Integer = $rt_classWithoutFields(jl_Number),
jl_Integer_TYPE = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
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
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
jl_AutoCloseable = $rt_classWithoutFields(0),
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name1 = null;
    a.$ordinal = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name1 = $name;
    $this.$ordinal = $ordinal;
},
jl_Enum_name = $this => {
    return $this.$name1;
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
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(0);
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
jl_Math = $rt_classWithoutFields(),
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
jl_Cloneable = $rt_classWithoutFields(0),
otji_JS = $rt_classWithoutFields(),
jl_CharSequence = $rt_classWithoutFields(0),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_ = $this => {
    jl_IndexOutOfBoundsException__init_($this);
},
jl_StringIndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_(var_0);
    return var_0;
},
ji_Closeable = $rt_classWithoutFields(0),
ji_Flushable = $rt_classWithoutFields(0),
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
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
jlr_Type = $rt_classWithoutFields(0);
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_1 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_2 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append0 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(1);
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
    $rt_throw(jl_StringIndexOutOfBoundsException__init_0());
},
jl_AbstractStringBuilder_append = ($this, $value) => {
    return $this.$append1($value, 10);
},
jl_AbstractStringBuilder_append2 = ($this, $value, $radix) => {
    return $this.$insert0($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert2 = ($this, $target, $value, $radix) => {
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
jl_AbstractStringBuilder_append1 = ($this, $c) => {
    return $this.$insert1($this.$length0, $c);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $obj) => {
    return $this.$insert2($index, $obj === null ? $rt_s(1) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_6($this.$buffer, 0, $this.$length0);
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
jl_StringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append0($this, $obj);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append($this, $value);
    return $this;
},
jl_StringBuilder_append1 = ($this, $c) => {
    jl_AbstractStringBuilder_append1($this, $c);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert0($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert1($this, $index, $c);
    return $this;
},
jl_StringBuilder_insert3 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert3(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert4(var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2) => {
    return $this.$insert5(var$1, var$2);
},
cprnm_SkillType = $rt_classWithoutFields(jl_Enum),
cprnm_SkillType_$VALUES = null,
cprnm_SkillType_ABYSS_DRAGON_0 = null,
cprnm_SkillType_ABYSS_DRAGON_1 = null,
cprnm_SkillType_ABYSS_DRAGON_2 = null,
cprnm_SkillType_ABYSS_DRAGON_3 = null,
cprnm_SkillType_ABYSS_DRAGON_4 = null,
cprnm_SkillType_ANCIENT_DWARF_0 = null,
cprnm_SkillType_ANCIENT_DWARF_1 = null,
cprnm_SkillType_ANCIENT_DWARF_2 = null,
cprnm_SkillType_ANCIENT_DWARF_3 = null,
cprnm_SkillType_ANCIENT_DWARF_4 = null,
cprnm_SkillType_ANGELIC_HERALD_0 = null,
cprnm_SkillType_ANGELIC_HERALD_1 = null,
cprnm_SkillType_ANGELIC_HERALD_2 = null,
cprnm_SkillType_ANGELIC_HERALD_3 = null,
cprnm_SkillType_ANGELIC_HERALD_4 = null,
cprnm_SkillType_ANGELIC_HERALD_5 = null,
cprnm_SkillType_ANGEL_DRAGON_0 = null,
cprnm_SkillType_ANGEL_DRAGON_1 = null;
let cprnm_SkillType_ANGEL_DRAGON_2 = null,
cprnm_SkillType_ANGEL_DRAGON_3 = null,
cprnm_SkillType_ANGEL_DRAGON_4 = null,
cprnm_SkillType_AQUATIC_MAN_0 = null,
cprnm_SkillType_AQUATIC_MAN_1 = null,
cprnm_SkillType_AQUATIC_MAN_2 = null,
cprnm_SkillType_AQUATIC_MAN_3 = null,
cprnm_SkillType_AQUATIC_MAN_4 = null,
cprnm_SkillType_AQUATIC_MAN_5 = null,
cprnm_SkillType_AQUATIC_MAN_TITAN = null,
cprnm_SkillType_BANSHEE_0 = null,
cprnm_SkillType_BANSHEE_1 = null,
cprnm_SkillType_BANSHEE_2 = null,
cprnm_SkillType_BANSHEE_3 = null,
cprnm_SkillType_BANSHEE_4 = null,
cprnm_SkillType_BARDBARIAN_0 = null,
cprnm_SkillType_BARDBARIAN_1 = null,
cprnm_SkillType_BARDBARIAN_2 = null,
cprnm_SkillType_BARDBARIAN_3 = null,
cprnm_SkillType_BARDBARIAN_4 = null,
cprnm_SkillType_BARDBARIAN_5 = null,
cprnm_SkillType_BARDBARIAN_TITAN = null,
cprnm_SkillType_BLACK_WING_0 = null,
cprnm_SkillType_BLACK_WING_1 = null,
cprnm_SkillType_BLACK_WING_2 = null,
cprnm_SkillType_BLACK_WING_3 = null,
cprnm_SkillType_BLACK_WING_4 = null,
cprnm_SkillType_BONE_DRAGON_0 = null,
cprnm_SkillType_BONE_DRAGON_1 = null,
cprnm_SkillType_BONE_DRAGON_2 = null,
cprnm_SkillType_BONE_DRAGON_3 = null,
cprnm_SkillType_BONE_DRAGON_4 = null,
cprnm_SkillType_BONE_DRAGON_5 = null,
cprnm_SkillType_BONE_DRAGON_TITAN = null,
cprnm_SkillType_BOSS_BATTLE_FIELD_BUFF = null,
cprnm_SkillType_BOSS_CANT_BE_DISABLED = null,
cprnm_SkillType_BROZERKER_0 = null,
cprnm_SkillType_BROZERKER_1 = null,
cprnm_SkillType_BROZERKER_2 = null,
cprnm_SkillType_BROZERKER_3 = null,
cprnm_SkillType_BROZERKER_4 = null,
cprnm_SkillType_BROZERKER_5 = null,
cprnm_SkillType_BROZERKER_6 = null,
cprnm_SkillType_BROZERKER_TITAN = null,
cprnm_SkillType_BULWARK_ANGEL_0 = null,
cprnm_SkillType_BULWARK_ANGEL_1 = null,
cprnm_SkillType_BULWARK_ANGEL_2 = null,
cprnm_SkillType_BULWARK_ANGEL_3 = null,
cprnm_SkillType_BULWARK_ANGEL_4 = null,
cprnm_SkillType_BURNT_ONE_0 = null;
let cprnm_SkillType_BURNT_ONE_1 = null,
cprnm_SkillType_BURNT_ONE_2 = null,
cprnm_SkillType_BURNT_ONE_3 = null,
cprnm_SkillType_BURNT_ONE_4 = null,
cprnm_SkillType_CATAPULT_KNIGHT_0 = null,
cprnm_SkillType_CATAPULT_KNIGHT_1 = null,
cprnm_SkillType_CATAPULT_KNIGHT_2 = null,
cprnm_SkillType_CATAPULT_KNIGHT_3 = null,
cprnm_SkillType_CATAPULT_KNIGHT_4 = null,
cprnm_SkillType_CATAPULT_KNIGHT_5 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_0 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_1 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_2 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_3 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_4 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_5 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_6 = null,
cprnm_SkillType_CENTAUR_OF_ATTENTION_TITAN = null,
cprnm_SkillType_CLAW_MAN_0 = null,
cprnm_SkillType_CLAW_MAN_1 = null,
cprnm_SkillType_CLAW_MAN_2 = null,
cprnm_SkillType_CLAW_MAN_3 = null,
cprnm_SkillType_CLAW_MAN_4 = null,
cprnm_SkillType_COSMIC_ELF_0 = null,
cprnm_SkillType_COSMIC_ELF_1 = null,
cprnm_SkillType_COSMIC_ELF_2 = null,
cprnm_SkillType_COSMIC_ELF_3 = null,
cprnm_SkillType_COSMIC_ELF_4 = null,
cprnm_SkillType_COSMIC_ELF_5 = null,
cprnm_SkillType_COSMIC_ELF_6 = null,
cprnm_SkillType_CRIMSON_WITCH_0 = null,
cprnm_SkillType_CRIMSON_WITCH_1 = null,
cprnm_SkillType_CRIMSON_WITCH_2 = null,
cprnm_SkillType_CRIMSON_WITCH_3 = null,
cprnm_SkillType_CRIMSON_WITCH_4 = null,
cprnm_SkillType_CRIMSON_WITCH_5 = null,
cprnm_SkillType_CURSED_STATUE_0 = null,
cprnm_SkillType_CURSED_STATUE_1 = null,
cprnm_SkillType_CURSED_STATUE_2 = null,
cprnm_SkillType_CURSED_STATUE_3 = null,
cprnm_SkillType_CURSED_STATUE_4 = null,
cprnm_SkillType_CYCLOPS_WIZARD_0 = null,
cprnm_SkillType_CYCLOPS_WIZARD_1 = null,
cprnm_SkillType_CYCLOPS_WIZARD_2 = null,
cprnm_SkillType_CYCLOPS_WIZARD_3 = null,
cprnm_SkillType_CYCLOPS_WIZARD_4 = null,
cprnm_SkillType_DARK_DRACUL_0 = null,
cprnm_SkillType_DARK_DRACUL_1 = null,
cprnm_SkillType_DARK_DRACUL_2 = null,
cprnm_SkillType_DARK_DRACUL_3 = null;
let cprnm_SkillType_DARK_DRACUL_4 = null,
cprnm_SkillType_DARK_DRACUL_5 = null,
cprnm_SkillType_DARK_HERO_0 = null,
cprnm_SkillType_DARK_HERO_1 = null,
cprnm_SkillType_DARK_HERO_2 = null,
cprnm_SkillType_DARK_HERO_3 = null,
cprnm_SkillType_DARK_HERO_4 = null,
cprnm_SkillType_DARK_HORSE_0 = null,
cprnm_SkillType_DARK_HORSE_1 = null,
cprnm_SkillType_DARK_HORSE_2 = null,
cprnm_SkillType_DARK_HORSE_3 = null,
cprnm_SkillType_DARK_HORSE_4 = null,
cprnm_SkillType_DARK_HORSE_5 = null,
cprnm_SkillType_DEEP_DRAGON_0 = null,
cprnm_SkillType_DEEP_DRAGON_1 = null,
cprnm_SkillType_DEEP_DRAGON_2 = null,
cprnm_SkillType_DEEP_DRAGON_3 = null,
cprnm_SkillType_DEEP_DRAGON_4 = null,
cprnm_SkillType_DEEP_DRAGON_5 = null,
cprnm_SkillType_DEEP_DRAGON_6 = null,
cprnm_SkillType_DEFAULT = null,
cprnm_SkillType_DEMON_TOTEM_0 = null,
cprnm_SkillType_DEMON_TOTEM_1 = null,
cprnm_SkillType_DEMON_TOTEM_2 = null,
cprnm_SkillType_DEMON_TOTEM_3 = null,
cprnm_SkillType_DEMON_TOTEM_4 = null,
cprnm_SkillType_DEMON_TOTEM_5 = null,
cprnm_SkillType_DEMON_TOTEM_6 = null,
cprnm_SkillType_DIGGER_MOLE_0 = null,
cprnm_SkillType_DIGGER_MOLE_1 = null,
cprnm_SkillType_DIGGER_MOLE_2 = null,
cprnm_SkillType_DIGGER_MOLE_3 = null,
cprnm_SkillType_DIGGER_MOLE_4 = null,
cprnm_SkillType_DOPPELGANGER_0 = null,
cprnm_SkillType_DOPPELGANGER_1 = null,
cprnm_SkillType_DOPPELGANGER_2 = null,
cprnm_SkillType_DOPPELGANGER_3 = null,
cprnm_SkillType_DOPPELGANGER_4 = null,
cprnm_SkillType_DRAGON_LADY_0 = null,
cprnm_SkillType_DRAGON_LADY_1 = null,
cprnm_SkillType_DRAGON_LADY_2 = null,
cprnm_SkillType_DRAGON_LADY_3 = null,
cprnm_SkillType_DRAGON_LADY_4 = null,
cprnm_SkillType_DRAGON_LADY_5 = null,
cprnm_SkillType_DRAGON_LADY_6 = null,
cprnm_SkillType_DRAGON_LADY_TITAN = null,
cprnm_SkillType_DRAGON_SLAYER_0 = null,
cprnm_SkillType_DRAGON_SLAYER_1 = null,
cprnm_SkillType_DRAGON_SLAYER_2 = null,
cprnm_SkillType_DRAGON_SLAYER_3 = null;
let cprnm_SkillType_DRAGON_SLAYER_4 = null,
cprnm_SkillType_DRAGZILLA_0 = null,
cprnm_SkillType_DRAGZILLA_1 = null,
cprnm_SkillType_DRAGZILLA_2 = null,
cprnm_SkillType_DRAGZILLA_3 = null,
cprnm_SkillType_DRAGZILLA_4 = null,
cprnm_SkillType_DRAGZILLA_5 = null,
cprnm_SkillType_DRUIDINATRIX_0 = null,
cprnm_SkillType_DRUIDINATRIX_1 = null,
cprnm_SkillType_DRUIDINATRIX_2 = null,
cprnm_SkillType_DRUIDINATRIX_3 = null,
cprnm_SkillType_DRUIDINATRIX_4 = null,
cprnm_SkillType_DRUIDINATRIX_5 = null,
cprnm_SkillType_DUNGEON_MAN_0 = null,
cprnm_SkillType_DUNGEON_MAN_1 = null,
cprnm_SkillType_DUNGEON_MAN_2 = null,
cprnm_SkillType_DUNGEON_MAN_3 = null,
cprnm_SkillType_DUNGEON_MAN_4 = null,
cprnm_SkillType_DUST_DEVIL_0 = null,
cprnm_SkillType_DUST_DEVIL_1 = null,
cprnm_SkillType_DUST_DEVIL_2 = null,
cprnm_SkillType_DUST_DEVIL_3 = null,
cprnm_SkillType_DUST_DEVIL_4 = null,
cprnm_SkillType_DUST_DEVIL_5 = null,
cprnm_SkillType_DWARVEN_ARCHER_0 = null,
cprnm_SkillType_DWARVEN_ARCHER_1 = null,
cprnm_SkillType_DWARVEN_ARCHER_2 = null,
cprnm_SkillType_DWARVEN_ARCHER_3 = null,
cprnm_SkillType_DWARVEN_ARCHER_4 = null,
cprnm_SkillType_DWARVEN_ARCHER_5 = null,
cprnm_SkillType_ELECTROYETI_0 = null,
cprnm_SkillType_ELECTROYETI_1 = null,
cprnm_SkillType_ELECTROYETI_2 = null,
cprnm_SkillType_ELECTROYETI_3 = null,
cprnm_SkillType_ELECTROYETI_4 = null,
cprnm_SkillType_ELECTROYETI_5 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_0 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_1 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_2 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_3 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_4 = null,
cprnm_SkillType_ETERNAL_ENCHANTER_5 = null,
cprnm_SkillType_FAITH_HEALER_0 = null,
cprnm_SkillType_FAITH_HEALER_1 = null,
cprnm_SkillType_FAITH_HEALER_2 = null,
cprnm_SkillType_FAITH_HEALER_3 = null,
cprnm_SkillType_FAITH_HEALER_4 = null,
cprnm_SkillType_FAITH_HEALER_5 = null,
cprnm_SkillType_FAITH_HEALER_TITAN = null,
cprnm_SkillType_FORGOTTEN_DRAGON_0 = null;
let cprnm_SkillType_FORGOTTEN_DRAGON_1 = null,
cprnm_SkillType_FORGOTTEN_DRAGON_2 = null,
cprnm_SkillType_FORGOTTEN_DRAGON_3 = null,
cprnm_SkillType_FORGOTTEN_DRAGON_4 = null,
cprnm_SkillType_FROST_GIANT_0 = null,
cprnm_SkillType_FROST_GIANT_1 = null,
cprnm_SkillType_FROST_GIANT_2 = null,
cprnm_SkillType_FROST_GIANT_3 = null,
cprnm_SkillType_FROST_GIANT_4 = null,
cprnm_SkillType_FROST_GIANT_5 = null,
cprnm_SkillType_FROST_GIANT_TITAN = null,
cprnm_SkillType_GENIE_0 = null,
cprnm_SkillType_GENIE_1 = null,
cprnm_SkillType_GENIE_2 = null,
cprnm_SkillType_GENIE_3 = null,
cprnm_SkillType_GENIE_4 = null,
cprnm_SkillType_GENIE_5 = null,
cprnm_SkillType_GENIE_6 = null,
cprnm_SkillType_GENIE_TITAN = null,
cprnm_SkillType_GRAND_HUNTRESS_0 = null,
cprnm_SkillType_GRAND_HUNTRESS_1 = null,
cprnm_SkillType_GRAND_HUNTRESS_2 = null,
cprnm_SkillType_GRAND_HUNTRESS_3 = null,
cprnm_SkillType_GRAND_HUNTRESS_4 = null,
cprnm_SkillType_GREED_DRAGON_0 = null,
cprnm_SkillType_GREED_DRAGON_1 = null,
cprnm_SkillType_GREED_DRAGON_2 = null,
cprnm_SkillType_GREED_DRAGON_3 = null,
cprnm_SkillType_GREED_DRAGON_4 = null,
cprnm_SkillType_GROOVY_DRUID_0 = null,
cprnm_SkillType_GROOVY_DRUID_1 = null,
cprnm_SkillType_GROOVY_DRUID_2 = null,
cprnm_SkillType_GROOVY_DRUID_3 = null,
cprnm_SkillType_GROOVY_DRUID_4 = null,
cprnm_SkillType_GROOVY_DRUID_5 = null,
cprnm_SkillType_HYDRA_0 = null,
cprnm_SkillType_HYDRA_1 = null,
cprnm_SkillType_HYDRA_2 = null,
cprnm_SkillType_HYDRA_3 = null,
cprnm_SkillType_HYDRA_4 = null,
cprnm_SkillType_HYDRA_5 = null,
cprnm_SkillType_KARAOKE_KING_0 = null,
cprnm_SkillType_KARAOKE_KING_1 = null,
cprnm_SkillType_KARAOKE_KING_2 = null,
cprnm_SkillType_KARAOKE_KING_3 = null,
cprnm_SkillType_KARAOKE_KING_4 = null,
cprnm_SkillType_KRAKEN_KING_0 = null,
cprnm_SkillType_KRAKEN_KING_1 = null,
cprnm_SkillType_KRAKEN_KING_2 = null,
cprnm_SkillType_KRAKEN_KING_3 = null;
let cprnm_SkillType_KRAKEN_KING_4 = null,
cprnm_SkillType_LAST_DEFENDER_0 = null,
cprnm_SkillType_LAST_DEFENDER_1 = null,
cprnm_SkillType_LAST_DEFENDER_2 = null,
cprnm_SkillType_LAST_DEFENDER_3 = null,
cprnm_SkillType_LAST_DEFENDER_4 = null,
cprnm_SkillType_MAGIC_DRAGON_0 = null,
cprnm_SkillType_MAGIC_DRAGON_1 = null,
cprnm_SkillType_MAGIC_DRAGON_2 = null,
cprnm_SkillType_MAGIC_DRAGON_3 = null,
cprnm_SkillType_MAGIC_DRAGON_4 = null,
cprnm_SkillType_MAGIC_DRAGON_5 = null,
cprnm_SkillType_MEDUSA_0 = null,
cprnm_SkillType_MEDUSA_1 = null,
cprnm_SkillType_MEDUSA_2 = null,
cprnm_SkillType_MEDUSA_3 = null,
cprnm_SkillType_MEDUSA_4 = null,
cprnm_SkillType_MEDUSA_5 = null,
cprnm_SkillType_MEDUSA_6 = null,
cprnm_SkillType_MEDUSA_TITAN = null,
cprnm_SkillType_MINOTAUR_0 = null,
cprnm_SkillType_MINOTAUR_1 = null,
cprnm_SkillType_MINOTAUR_2 = null,
cprnm_SkillType_MINOTAUR_3 = null,
cprnm_SkillType_MINOTAUR_4 = null,
cprnm_SkillType_MINOTAUR_5 = null,
cprnm_SkillType_MISTRESS_MANICURE_0 = null,
cprnm_SkillType_MISTRESS_MANICURE_1 = null,
cprnm_SkillType_MISTRESS_MANICURE_2 = null,
cprnm_SkillType_MISTRESS_MANICURE_3 = null,
cprnm_SkillType_MISTRESS_MANICURE_4 = null,
cprnm_SkillType_MOON_DRAKE_0 = null,
cprnm_SkillType_MOON_DRAKE_1 = null,
cprnm_SkillType_MOON_DRAKE_2 = null,
cprnm_SkillType_MOON_DRAKE_3 = null,
cprnm_SkillType_MOON_DRAKE_4 = null,
cprnm_SkillType_MOON_DRAKE_5 = null,
cprnm_SkillType_NINJA_DWARF_0 = null,
cprnm_SkillType_NINJA_DWARF_1 = null,
cprnm_SkillType_NINJA_DWARF_2 = null,
cprnm_SkillType_NINJA_DWARF_3 = null,
cprnm_SkillType_NINJA_DWARF_4 = null,
cprnm_SkillType_NINJA_DWARF_5 = null,
cprnm_SkillType_NINJA_DWARF_6 = null,
cprnm_SkillType_NPC_ABYSS_DRAGON_0 = null,
cprnm_SkillType_NPC_ABYSS_DRAGON_1 = null,
cprnm_SkillType_NPC_ABYSS_DRAGON_2 = null,
cprnm_SkillType_NPC_ANGELIC_AVENGER_0 = null,
cprnm_SkillType_NPC_ANT_0 = null,
cprnm_SkillType_NPC_ANT_1 = null;
let cprnm_SkillType_NPC_ANUBIS_DRAGON_0 = null,
cprnm_SkillType_NPC_ANUBIS_DRAGON_1 = null,
cprnm_SkillType_NPC_ANUBIS_DRAGON_2 = null,
cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_0 = null,
cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_1 = null,
cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_2 = null,
cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_0 = null,
cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_1 = null,
cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_2 = null,
cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_0 = null,
cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_1 = null,
cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_2 = null,
cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_0 = null,
cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_1 = null,
cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_2 = null,
cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_3 = null,
cprnm_SkillType_NPC_BREAKER_MKII_0 = null,
cprnm_SkillType_NPC_BREAKER_MKII_1 = null,
cprnm_SkillType_NPC_BUFF_SPRITE_0 = null,
cprnm_SkillType_NPC_CAULDRON_MONSTER_0 = null,
cprnm_SkillType_NPC_CLOUD_MONSTER_0 = null,
cprnm_SkillType_NPC_CLOUD_MONSTER_1 = null,
cprnm_SkillType_NPC_CRYSTAL_GOLEM_0 = null,
cprnm_SkillType_NPC_CRYSTAL_LIZARD_0 = null,
cprnm_SkillType_NPC_CRYSTAL_LIZARD_1 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_0 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_1 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_2 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_0 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_1 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_2 = null,
cprnm_SkillType_NPC_EVIL_WIZARD_UNTARGETABLE = null,
cprnm_SkillType_NPC_EYEBALL_0 = null,
cprnm_SkillType_NPC_FIRE_IMP_0 = null,
cprnm_SkillType_NPC_FIRE_IMP_1 = null,
cprnm_SkillType_NPC_FLEA_DEMON_0 = null,
cprnm_SkillType_NPC_GIANT_PLANT_BITE = null,
cprnm_SkillType_NPC_GIANT_PLANT_HOP_FORWARD = null,
cprnm_SkillType_NPC_GIANT_PLANT_ROOT_0 = null,
cprnm_SkillType_NPC_GIANT_PLANT_SPAWNER = null,
cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_0 = null,
cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_1 = null,
cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_2 = null,
cprnm_SkillType_NPC_GOBLIN_0 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_EAT_GOLD_2 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_0 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_1 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_2 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_0 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_1 = null;
let cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_2 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_0 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_1 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_2 = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_SPIKES = null,
cprnm_SkillType_NPC_GOLD_COLOSSUS_WIND = null,
cprnm_SkillType_NPC_HEAD_CRAB_0 = null,
cprnm_SkillType_NPC_HEALER_SPRITE_0 = null,
cprnm_SkillType_NPC_ICE_GOLEM_0 = null,
cprnm_SkillType_NPC_INFERNO_SPIDER_0 = null,
cprnm_SkillType_NPC_KAMIKAZE_GNOME_0 = null,
cprnm_SkillType_NPC_KING_IMP_0 = null,
cprnm_SkillType_NPC_KING_IMP_1 = null,
cprnm_SkillType_NPC_LYING_LANTERN_0 = null,
cprnm_SkillType_NPC_LYING_LANTERN_1 = null,
cprnm_SkillType_NPC_LYING_LANTERN_2 = null,
cprnm_SkillType_NPC_MR_SMASHY_0 = null,
cprnm_SkillType_NPC_MUSHROOM_0 = null,
cprnm_SkillType_NPC_MYSTIC_WILDLING_0 = null,
cprnm_SkillType_NPC_PLAGUE_SKULKER_0 = null,
cprnm_SkillType_NPC_PLAGUE_SKULKER_1 = null,
cprnm_SkillType_NPC_POTTED_PLANT_0 = null,
cprnm_SkillType_NPC_POTTED_PLANT_1 = null,
cprnm_SkillType_NPC_RED_TIGER_0 = null,
cprnm_SkillType_NPC_RED_TIGER_1 = null,
cprnm_SkillType_NPC_SCARECROW_0 = null,
cprnm_SkillType_NPC_SHARK_0 = null,
cprnm_SkillType_NPC_SHARK_1 = null,
cprnm_SkillType_NPC_SINISTER_ASSAILANT_0 = null,
cprnm_SkillType_NPC_SINISTER_ASSAILANT_1 = null,
cprnm_SkillType_NPC_SKELETON_DEER_0 = null,
cprnm_SkillType_NPC_SKELETON_DEER_1 = null,
cprnm_SkillType_NPC_SKELETON_DEER_2 = null,
cprnm_SkillType_NPC_SQUID_0 = null,
cprnm_SkillType_NPC_SQUIRREL_0 = null,
cprnm_SkillType_NPC_STONE_IMP_0 = null,
cprnm_SkillType_NPC_STONE_IMP_1 = null,
cprnm_SkillType_NPC_TROLL_BLOB_0 = null,
cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_0 = null,
cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_1 = null,
cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_2 = null,
cprnm_SkillType_NPC_WILDLING_ARCHER_0 = null,
cprnm_SkillType_NPC_WILDLING_SNIPER_0 = null,
cprnm_SkillType_NUMBER_493 = null,
cprnm_SkillType_NUMBER_505 = null,
cprnm_SkillType_NUMBER_511 = null,
cprnm_SkillType_NUMBER_517 = null,
cprnm_SkillType_NUMBER_523 = null,
cprnm_SkillType_NUMBER_529 = null,
cprnm_SkillType_NUMBER_538 = null;
let cprnm_SkillType_NUMBER_544 = null,
cprnm_SkillType_NUMBER_550 = null,
cprnm_SkillType_NUMBER_559 = null,
cprnm_SkillType_NUMBER_565 = null,
cprnm_SkillType_NUMBER_571 = null,
cprnm_SkillType_NUMBER_583 = null,
cprnm_SkillType_NUMBER_589 = null,
cprnm_SkillType_NUMBER_590 = null,
cprnm_SkillType_NUMBER_591 = null,
cprnm_SkillType_NUMBER_592 = null,
cprnm_SkillType_NUMBER_593 = null,
cprnm_SkillType_NUMBER_594 = null,
cprnm_SkillType_NUMBER_595 = null,
cprnm_SkillType_NUMBER_596 = null,
cprnm_SkillType_NUMBER_597 = null,
cprnm_SkillType_NUMBER_598 = null,
cprnm_SkillType_NUMBER_609 = null,
cprnm_SkillType_NUMBER_623 = null,
cprnm_SkillType_NUMBER_629 = null,
cprnm_SkillType_NUMBER_635 = null,
cprnm_SkillType_NUMBER_670 = null,
cprnm_SkillType_ORC_MONK_0 = null,
cprnm_SkillType_ORC_MONK_1 = null,
cprnm_SkillType_ORC_MONK_2 = null,
cprnm_SkillType_ORC_MONK_3 = null,
cprnm_SkillType_ORC_MONK_4 = null,
cprnm_SkillType_ORC_MONK_5 = null,
cprnm_SkillType_ORC_MONK_6 = null,
cprnm_SkillType_ORC_MONK_TITAN = null,
cprnm_SkillType_PCH_ANUBIS_DRAGON_0 = null,
cprnm_SkillType_PCH_ANUBIS_DRAGON_1 = null,
cprnm_SkillType_PCH_ANUBIS_DRAGON_2 = null,
cprnm_SkillType_PCH_ANUBIS_DRAGON_3 = null,
cprnm_SkillType_PCH_ANUBIS_DRAGON_4 = null,
cprnm_SkillType_PIRATE_0 = null,
cprnm_SkillType_PIRATE_1 = null,
cprnm_SkillType_PIRATE_2 = null,
cprnm_SkillType_PIRATE_3 = null,
cprnm_SkillType_PIRATE_4 = null,
cprnm_SkillType_PIRATE_5 = null,
cprnm_SkillType_PLAGUE_ENTREPRENEUR_0 = null,
cprnm_SkillType_PLAGUE_ENTREPRENEUR_1 = null,
cprnm_SkillType_PLAGUE_ENTREPRENEUR_2 = null,
cprnm_SkillType_PLAGUE_ENTREPRENEUR_3 = null,
cprnm_SkillType_PLAGUE_ENTREPRENEUR_4 = null,
cprnm_SkillType_PLANT_SOUL_0 = null,
cprnm_SkillType_PLANT_SOUL_1 = null,
cprnm_SkillType_PLANT_SOUL_2 = null,
cprnm_SkillType_PLANT_SOUL_3 = null,
cprnm_SkillType_PLANT_SOUL_4 = null;
let cprnm_SkillType_POLEMASTER_0 = null,
cprnm_SkillType_POLEMASTER_1 = null,
cprnm_SkillType_POLEMASTER_2 = null,
cprnm_SkillType_POLEMASTER_3 = null,
cprnm_SkillType_POLEMASTER_4 = null,
cprnm_SkillType_POLEMASTER_5 = null,
cprnm_SkillType_RABID_DRAGON_0 = null,
cprnm_SkillType_RABID_DRAGON_1 = null,
cprnm_SkillType_RABID_DRAGON_2 = null,
cprnm_SkillType_RABID_DRAGON_3 = null,
cprnm_SkillType_RABID_DRAGON_4 = null,
cprnm_SkillType_RABID_DRAGON_5 = null,
cprnm_SkillType_RABID_DRAGON_TITAN = null,
cprnm_SkillType_RAGING_REVENANT_0 = null,
cprnm_SkillType_RAGING_REVENANT_1 = null,
cprnm_SkillType_RAGING_REVENANT_2 = null,
cprnm_SkillType_RAGING_REVENANT_3 = null,
cprnm_SkillType_RAGING_REVENANT_4 = null,
cprnm_SkillType_RAGING_REVENANT_5 = null,
cprnm_SkillType_ROLLER_WARRIOR_0 = null,
cprnm_SkillType_ROLLER_WARRIOR_1 = null,
cprnm_SkillType_ROLLER_WARRIOR_2 = null,
cprnm_SkillType_ROLLER_WARRIOR_3 = null,
cprnm_SkillType_ROLLER_WARRIOR_4 = null,
cprnm_SkillType_ROLLER_WARRIOR_5 = null,
cprnm_SkillType_ROLLER_WARRIOR_6 = null,
cprnm_SkillType_SADISTIC_DANCER_0 = null,
cprnm_SkillType_SADISTIC_DANCER_1 = null,
cprnm_SkillType_SADISTIC_DANCER_2 = null,
cprnm_SkillType_SADISTIC_DANCER_3 = null,
cprnm_SkillType_SADISTIC_DANCER_4 = null,
cprnm_SkillType_SATYR_0 = null,
cprnm_SkillType_SATYR_1 = null,
cprnm_SkillType_SATYR_2 = null,
cprnm_SkillType_SATYR_3 = null,
cprnm_SkillType_SATYR_4 = null,
cprnm_SkillType_SATYR_5 = null,
cprnm_SkillType_SATYR_6 = null,
cprnm_SkillType_SAVAGE_CUTIE_0 = null,
cprnm_SkillType_SAVAGE_CUTIE_1 = null,
cprnm_SkillType_SAVAGE_CUTIE_2 = null,
cprnm_SkillType_SAVAGE_CUTIE_3 = null,
cprnm_SkillType_SAVAGE_CUTIE_4 = null,
cprnm_SkillType_SAVAGE_CUTIE_5 = null,
cprnm_SkillType_SHADOW_ASSASSIN_0 = null,
cprnm_SkillType_SHADOW_ASSASSIN_1 = null,
cprnm_SkillType_SHADOW_ASSASSIN_2 = null,
cprnm_SkillType_SHADOW_ASSASSIN_3 = null,
cprnm_SkillType_SHADOW_ASSASSIN_4 = null,
cprnm_SkillType_SHADOW_ASSASSIN_5 = null;
let cprnm_SkillType_SHADOW_ASSASSIN_6 = null,
cprnm_SkillType_SHADOW_OF_SVEN_0 = null,
cprnm_SkillType_SHADOW_OF_SVEN_1 = null,
cprnm_SkillType_SHADOW_OF_SVEN_2 = null,
cprnm_SkillType_SHADOW_OF_SVEN_3 = null,
cprnm_SkillType_SHADOW_OF_SVEN_4 = null,
cprnm_SkillType_SILENT_SPIRIT_0 = null,
cprnm_SkillType_SILENT_SPIRIT_1 = null,
cprnm_SkillType_SILENT_SPIRIT_2 = null,
cprnm_SkillType_SILENT_SPIRIT_3 = null,
cprnm_SkillType_SILENT_SPIRIT_4 = null,
cprnm_SkillType_SKELETON_KING_0 = null,
cprnm_SkillType_SKELETON_KING_1 = null,
cprnm_SkillType_SKELETON_KING_2 = null,
cprnm_SkillType_SKELETON_KING_3 = null,
cprnm_SkillType_SKELETON_KING_4 = null,
cprnm_SkillType_SKELETON_KING_5 = null,
cprnm_SkillType_SKELETON_KING_TITAN = null,
cprnm_SkillType_SNAPPER_BONE_0 = null,
cprnm_SkillType_SNAPPER_BONE_1 = null,
cprnm_SkillType_SNAPPER_BONE_2 = null,
cprnm_SkillType_SNAPPER_BONE_3 = null,
cprnm_SkillType_SNAPPER_BONE_4 = null,
cprnm_SkillType_SNAP_DRAGON_0 = null,
cprnm_SkillType_SNAP_DRAGON_1 = null,
cprnm_SkillType_SNAP_DRAGON_2 = null,
cprnm_SkillType_SNAP_DRAGON_3 = null,
cprnm_SkillType_SNAP_DRAGON_4 = null,
cprnm_SkillType_SNAP_DRAGON_5 = null,
cprnm_SkillType_SNAP_DRAGON_6 = null,
cprnm_SkillType_SNAP_DRAGON_TITAN = null,
cprnm_SkillType_SNIPER_WOLF_0 = null,
cprnm_SkillType_SNIPER_WOLF_1 = null,
cprnm_SkillType_SNIPER_WOLF_2 = null,
cprnm_SkillType_SNIPER_WOLF_3 = null,
cprnm_SkillType_SNIPER_WOLF_4 = null,
cprnm_SkillType_SNIPER_WOLF_5 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_0 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_1 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_2 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_3 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_4 = null,
cprnm_SkillType_SOJOURNER_SORCERESS_5 = null,
cprnm_SkillType_SPECTRAL_DRAGON_0 = null,
cprnm_SkillType_SPECTRAL_DRAGON_1 = null,
cprnm_SkillType_SPECTRAL_DRAGON_2 = null,
cprnm_SkillType_SPECTRAL_DRAGON_3 = null,
cprnm_SkillType_SPECTRAL_DRAGON_4 = null,
cprnm_SkillType_SPIDER_QUEEN_0 = null,
cprnm_SkillType_SPIDER_QUEEN_1 = null;
let cprnm_SkillType_SPIDER_QUEEN_2 = null,
cprnm_SkillType_SPIDER_QUEEN_3 = null,
cprnm_SkillType_SPIDER_QUEEN_4 = null,
cprnm_SkillType_SPIKEY_DRAGON_0 = null,
cprnm_SkillType_SPIKEY_DRAGON_1 = null,
cprnm_SkillType_SPIKEY_DRAGON_2 = null,
cprnm_SkillType_SPIKEY_DRAGON_3 = null,
cprnm_SkillType_SPIKEY_DRAGON_4 = null,
cprnm_SkillType_SPIKEY_DRAGON_5 = null,
cprnm_SkillType_SPIKEY_DRAGON_TITAN = null,
cprnm_SkillType_STEPLADDER_BROTHERS_0 = null,
cprnm_SkillType_STEPLADDER_BROTHERS_1 = null,
cprnm_SkillType_STEPLADDER_BROTHERS_2 = null,
cprnm_SkillType_STEPLADDER_BROTHERS_3 = null,
cprnm_SkillType_STEPLADDER_BROTHERS_4 = null,
cprnm_SkillType_STORM_DRAGON_0 = null,
cprnm_SkillType_STORM_DRAGON_1 = null,
cprnm_SkillType_STORM_DRAGON_2 = null,
cprnm_SkillType_STORM_DRAGON_3 = null,
cprnm_SkillType_STORM_DRAGON_4 = null,
cprnm_SkillType_STORM_DRAGON_5 = null,
cprnm_SkillType_STOWAWAY_0 = null,
cprnm_SkillType_STOWAWAY_1 = null,
cprnm_SkillType_STOWAWAY_2 = null,
cprnm_SkillType_STOWAWAY_3 = null,
cprnm_SkillType_STOWAWAY_4 = null,
cprnm_SkillType_SUN_SEEKER_0 = null,
cprnm_SkillType_SUN_SEEKER_1 = null,
cprnm_SkillType_SUN_SEEKER_2 = null,
cprnm_SkillType_SUN_SEEKER_3 = null,
cprnm_SkillType_SUN_SEEKER_4 = null,
cprnm_SkillType_TOMB_ANGEL_0 = null,
cprnm_SkillType_TOMB_ANGEL_1 = null,
cprnm_SkillType_TOMB_ANGEL_2 = null,
cprnm_SkillType_TOMB_ANGEL_3 = null,
cprnm_SkillType_TOMB_ANGEL_4 = null,
cprnm_SkillType_TRIPLE_THREAT_0 = null,
cprnm_SkillType_TRIPLE_THREAT_1 = null,
cprnm_SkillType_TRIPLE_THREAT_2 = null,
cprnm_SkillType_TRIPLE_THREAT_3 = null,
cprnm_SkillType_TRIPLE_THREAT_4 = null,
cprnm_SkillType_UMLAUT_THE_FIRST_0 = null,
cprnm_SkillType_UMLAUT_THE_FIRST_1 = null,
cprnm_SkillType_UMLAUT_THE_FIRST_2 = null,
cprnm_SkillType_UMLAUT_THE_FIRST_3 = null,
cprnm_SkillType_UMLAUT_THE_FIRST_4 = null,
cprnm_SkillType_UNICORGI_0 = null,
cprnm_SkillType_UNICORGI_1 = null,
cprnm_SkillType_UNICORGI_2 = null,
cprnm_SkillType_UNICORGI_3 = null;
let cprnm_SkillType_UNICORGI_4 = null,
cprnm_SkillType_UNICORGI_5 = null,
cprnm_SkillType_UNRIPE_MYTHOLOGY_0 = null,
cprnm_SkillType_UNRIPE_MYTHOLOGY_1 = null,
cprnm_SkillType_UNRIPE_MYTHOLOGY_2 = null,
cprnm_SkillType_UNRIPE_MYTHOLOGY_3 = null,
cprnm_SkillType_UNRIPE_MYTHOLOGY_4 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_0 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_1 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_2 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_3 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_4 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_5 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_6 = null,
cprnm_SkillType_UNSTABLE_UNDERSTUDY_TITAN = null,
cprnm_SkillType_VERMILION_PRIESTESS_0 = null,
cprnm_SkillType_VERMILION_PRIESTESS_1 = null,
cprnm_SkillType_VERMILION_PRIESTESS_2 = null,
cprnm_SkillType_VERMILION_PRIESTESS_3 = null,
cprnm_SkillType_VERMILION_PRIESTESS_4 = null,
cprnm_SkillType_VILE_BILE_0 = null,
cprnm_SkillType_VILE_BILE_1 = null,
cprnm_SkillType_VILE_BILE_2 = null,
cprnm_SkillType_VILE_BILE_3 = null,
cprnm_SkillType_VILE_BILE_4 = null,
cprnm_SkillType_VOID_WYVERN_0 = null,
cprnm_SkillType_VOID_WYVERN_1 = null,
cprnm_SkillType_VOID_WYVERN_2 = null,
cprnm_SkillType_VOID_WYVERN_3 = null,
cprnm_SkillType_VOID_WYVERN_4 = null,
cprnm_SkillType_VULTURE_DRAGON_0 = null,
cprnm_SkillType_VULTURE_DRAGON_1 = null,
cprnm_SkillType_VULTURE_DRAGON_2 = null,
cprnm_SkillType_VULTURE_DRAGON_3 = null,
cprnm_SkillType_VULTURE_DRAGON_4 = null,
cprnm_SkillType_VULTURE_DRAGON_5 = null,
cprnm_SkillType_WEE_WITCH_0 = null,
cprnm_SkillType_WEE_WITCH_1 = null,
cprnm_SkillType_WEE_WITCH_2 = null,
cprnm_SkillType_WEE_WITCH_3 = null,
cprnm_SkillType_WEE_WITCH_4 = null,
cprnm_SkillType_WEREDRAGON_0 = null,
cprnm_SkillType_WEREDRAGON_1 = null,
cprnm_SkillType_WEREDRAGON_2 = null,
cprnm_SkillType_WEREDRAGON_3 = null,
cprnm_SkillType_WEREDRAGON_4 = null,
cprnm_SkillType_WEREDRAGON_5 = null,
cprnm_SkillType_WHITE_TIGRESS_0 = null,
cprnm_SkillType_WHITE_TIGRESS_1 = null,
cprnm_SkillType_WHITE_TIGRESS_2 = null;
let cprnm_SkillType_WHITE_TIGRESS_3 = null,
cprnm_SkillType_WHITE_TIGRESS_4 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_0 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_1 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_2 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_3 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_4 = null,
cprnm_SkillType_ZOMBIE_SQUIRE_5 = null,
cprnm_SkillType_values0 = null,
cprnm_SkillType_$callClinit = () => {
    cprnm_SkillType_$callClinit = $rt_eraseClinit(cprnm_SkillType);
    cprnm_SkillType__clinit_();
},
cprnm_SkillType__clinit_ = () => {
    let var$1, var$2;
    cprnm_SkillType_DEFAULT = cprnm_SkillType__init_($rt_s(2), 0);
    cprnm_SkillType_ELECTROYETI_0 = cprnm_SkillType__init_($rt_s(3), 1);
    cprnm_SkillType_ELECTROYETI_1 = cprnm_SkillType__init_($rt_s(4), 2);
    cprnm_SkillType_ELECTROYETI_2 = cprnm_SkillType__init_($rt_s(5), 3);
    cprnm_SkillType_ELECTROYETI_3 = cprnm_SkillType__init_($rt_s(6), 4);
    cprnm_SkillType_ELECTROYETI_4 = cprnm_SkillType__init_($rt_s(7), 5);
    cprnm_SkillType_MEDUSA_0 = cprnm_SkillType__init_($rt_s(8), 6);
    cprnm_SkillType_MEDUSA_1 = cprnm_SkillType__init_($rt_s(9), 7);
    cprnm_SkillType_MEDUSA_2 = cprnm_SkillType__init_($rt_s(10), 8);
    cprnm_SkillType_MEDUSA_3 = cprnm_SkillType__init_($rt_s(11), 9);
    cprnm_SkillType_MEDUSA_4 = cprnm_SkillType__init_($rt_s(12), 10);
    cprnm_SkillType_FAITH_HEALER_0 = cprnm_SkillType__init_($rt_s(13), 11);
    cprnm_SkillType_FAITH_HEALER_1 = cprnm_SkillType__init_($rt_s(14), 12);
    cprnm_SkillType_FAITH_HEALER_2 = cprnm_SkillType__init_($rt_s(15), 13);
    cprnm_SkillType_FAITH_HEALER_3 = cprnm_SkillType__init_($rt_s(16), 14);
    cprnm_SkillType_FAITH_HEALER_4 = cprnm_SkillType__init_($rt_s(17), 15);
    cprnm_SkillType_DARK_DRACUL_0 = cprnm_SkillType__init_($rt_s(18), 16);
    cprnm_SkillType_DARK_DRACUL_1 = cprnm_SkillType__init_($rt_s(19), 17);
    cprnm_SkillType_DARK_DRACUL_2 = cprnm_SkillType__init_($rt_s(20), 18);
    cprnm_SkillType_DARK_DRACUL_3 = cprnm_SkillType__init_($rt_s(21), 19);
    cprnm_SkillType_DARK_DRACUL_4 = cprnm_SkillType__init_($rt_s(22), 20);
    cprnm_SkillType_COSMIC_ELF_0 = cprnm_SkillType__init_($rt_s(23), 21);
    cprnm_SkillType_COSMIC_ELF_1 = cprnm_SkillType__init_($rt_s(24), 22);
    cprnm_SkillType_COSMIC_ELF_2 = cprnm_SkillType__init_($rt_s(25), 23);
    cprnm_SkillType_COSMIC_ELF_3 = cprnm_SkillType__init_($rt_s(26), 24);
    cprnm_SkillType_COSMIC_ELF_4 = cprnm_SkillType__init_($rt_s(27), 25);
    cprnm_SkillType_ROLLER_WARRIOR_0 = cprnm_SkillType__init_($rt_s(28), 26);
    cprnm_SkillType_ROLLER_WARRIOR_1 = cprnm_SkillType__init_($rt_s(29), 27);
    cprnm_SkillType_ROLLER_WARRIOR_2 = cprnm_SkillType__init_($rt_s(30), 28);
    cprnm_SkillType_ROLLER_WARRIOR_3 = cprnm_SkillType__init_($rt_s(31), 29);
    cprnm_SkillType_ROLLER_WARRIOR_4 = cprnm_SkillType__init_($rt_s(32), 30);
    cprnm_SkillType_DRAGON_LADY_0 = cprnm_SkillType__init_($rt_s(33), 31);
    cprnm_SkillType_DRAGON_LADY_1 = cprnm_SkillType__init_($rt_s(34), 32);
    cprnm_SkillType_DRAGON_LADY_2 = cprnm_SkillType__init_($rt_s(35), 33);
    cprnm_SkillType_DRAGON_LADY_3 = cprnm_SkillType__init_($rt_s(36), 34);
    cprnm_SkillType_DRAGON_LADY_4 = cprnm_SkillType__init_($rt_s(37), 35);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_0 = cprnm_SkillType__init_($rt_s(38), 36);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_1 = cprnm_SkillType__init_($rt_s(39), 37);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_2 = cprnm_SkillType__init_($rt_s(40), 38);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_3 = cprnm_SkillType__init_($rt_s(41), 39);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_4 = cprnm_SkillType__init_($rt_s(42), 40);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_0 = cprnm_SkillType__init_($rt_s(43), 41);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_1 = cprnm_SkillType__init_($rt_s(44), 42);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_2 = cprnm_SkillType__init_($rt_s(45), 43);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_3 = cprnm_SkillType__init_($rt_s(46), 44);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_4 = cprnm_SkillType__init_($rt_s(47), 45);
    cprnm_SkillType_MOON_DRAKE_0 = cprnm_SkillType__init_($rt_s(48), 46);
    cprnm_SkillType_MOON_DRAKE_1 = cprnm_SkillType__init_($rt_s(49), 47);
    cprnm_SkillType_MOON_DRAKE_2 = cprnm_SkillType__init_($rt_s(50), 48);
    cprnm_SkillType_MOON_DRAKE_3 = cprnm_SkillType__init_($rt_s(51), 49);
    cprnm_SkillType_MOON_DRAKE_4 = cprnm_SkillType__init_($rt_s(52), 50);
    cprnm_SkillType_NPC_GOBLIN_0 = cprnm_SkillType__init_($rt_s(53), 51);
    cprnm_SkillType_NPC_WILDLING_ARCHER_0 = cprnm_SkillType__init_($rt_s(54), 52);
    cprnm_SkillType_NPC_CRYSTAL_GOLEM_0 = cprnm_SkillType__init_($rt_s(55), 53);
    cprnm_SkillType_NPC_ICE_GOLEM_0 = cprnm_SkillType__init_($rt_s(56), 54);
    cprnm_SkillType_NPC_FIRE_IMP_0 = cprnm_SkillType__init_($rt_s(57), 55);
    cprnm_SkillType_NPC_FIRE_IMP_1 = cprnm_SkillType__init_($rt_s(58), 56);
    cprnm_SkillType_NPC_STONE_IMP_0 = cprnm_SkillType__init_($rt_s(59), 57);
    cprnm_SkillType_NPC_STONE_IMP_1 = cprnm_SkillType__init_($rt_s(60), 58);
    cprnm_SkillType_NPC_MYSTIC_WILDLING_0 = cprnm_SkillType__init_($rt_s(61), 59);
    cprnm_SkillType_NPC_WILDLING_SNIPER_0 = cprnm_SkillType__init_($rt_s(62), 60);
    cprnm_SkillType_POLEMASTER_0 = cprnm_SkillType__init_($rt_s(63), 61);
    cprnm_SkillType_POLEMASTER_1 = cprnm_SkillType__init_($rt_s(64), 62);
    cprnm_SkillType_POLEMASTER_2 = cprnm_SkillType__init_($rt_s(65), 63);
    cprnm_SkillType_POLEMASTER_3 = cprnm_SkillType__init_($rt_s(66), 64);
    cprnm_SkillType_POLEMASTER_4 = cprnm_SkillType__init_($rt_s(67), 65);
    cprnm_SkillType_CATAPULT_KNIGHT_0 = cprnm_SkillType__init_($rt_s(68), 66);
    cprnm_SkillType_CATAPULT_KNIGHT_1 = cprnm_SkillType__init_($rt_s(69), 67);
    cprnm_SkillType_CATAPULT_KNIGHT_2 = cprnm_SkillType__init_($rt_s(70), 68);
    cprnm_SkillType_CATAPULT_KNIGHT_3 = cprnm_SkillType__init_($rt_s(71), 69);
    cprnm_SkillType_CATAPULT_KNIGHT_4 = cprnm_SkillType__init_($rt_s(72), 70);
    cprnm_SkillType_BARDBARIAN_0 = cprnm_SkillType__init_($rt_s(73), 71);
    cprnm_SkillType_BARDBARIAN_1 = cprnm_SkillType__init_($rt_s(74), 72);
    cprnm_SkillType_BARDBARIAN_2 = cprnm_SkillType__init_($rt_s(75), 73);
    cprnm_SkillType_BARDBARIAN_3 = cprnm_SkillType__init_($rt_s(76), 74);
    cprnm_SkillType_BARDBARIAN_4 = cprnm_SkillType__init_($rt_s(77), 75);
    cprnm_SkillType_SHADOW_ASSASSIN_0 = cprnm_SkillType__init_($rt_s(78), 76);
    cprnm_SkillType_SHADOW_ASSASSIN_1 = cprnm_SkillType__init_($rt_s(79), 77);
    cprnm_SkillType_SHADOW_ASSASSIN_2 = cprnm_SkillType__init_($rt_s(80), 78);
    cprnm_SkillType_SHADOW_ASSASSIN_3 = cprnm_SkillType__init_($rt_s(81), 79);
    cprnm_SkillType_SHADOW_ASSASSIN_4 = cprnm_SkillType__init_($rt_s(82), 80);
    cprnm_SkillType_DUST_DEVIL_0 = cprnm_SkillType__init_($rt_s(83), 81);
    cprnm_SkillType_DUST_DEVIL_1 = cprnm_SkillType__init_($rt_s(84), 82);
    cprnm_SkillType_DUST_DEVIL_2 = cprnm_SkillType__init_($rt_s(85), 83);
    cprnm_SkillType_DUST_DEVIL_3 = cprnm_SkillType__init_($rt_s(86), 84);
    cprnm_SkillType_DUST_DEVIL_4 = cprnm_SkillType__init_($rt_s(87), 85);
    cprnm_SkillType_SNAP_DRAGON_0 = cprnm_SkillType__init_($rt_s(88), 86);
    cprnm_SkillType_SNAP_DRAGON_1 = cprnm_SkillType__init_($rt_s(89), 87);
    cprnm_SkillType_SNAP_DRAGON_2 = cprnm_SkillType__init_($rt_s(90), 88);
    cprnm_SkillType_SNAP_DRAGON_3 = cprnm_SkillType__init_($rt_s(91), 89);
    cprnm_SkillType_SNAP_DRAGON_4 = cprnm_SkillType__init_($rt_s(92), 90);
    cprnm_SkillType_HYDRA_0 = cprnm_SkillType__init_($rt_s(93), 91);
    cprnm_SkillType_HYDRA_1 = cprnm_SkillType__init_($rt_s(94), 92);
    cprnm_SkillType_HYDRA_2 = cprnm_SkillType__init_($rt_s(95), 93);
    cprnm_SkillType_HYDRA_3 = cprnm_SkillType__init_($rt_s(96), 94);
    cprnm_SkillType_HYDRA_4 = cprnm_SkillType__init_($rt_s(97), 95);
    cprnm_SkillType_SAVAGE_CUTIE_0 = cprnm_SkillType__init_($rt_s(98), 96);
    cprnm_SkillType_SAVAGE_CUTIE_1 = cprnm_SkillType__init_($rt_s(99), 97);
    cprnm_SkillType_SAVAGE_CUTIE_2 = cprnm_SkillType__init_($rt_s(100), 98);
    cprnm_SkillType_SAVAGE_CUTIE_3 = cprnm_SkillType__init_($rt_s(101), 99);
    cprnm_SkillType_SAVAGE_CUTIE_4 = cprnm_SkillType__init_($rt_s(102), 100);
    cprnm_SkillType_ZOMBIE_SQUIRE_0 = cprnm_SkillType__init_($rt_s(103), 101);
    cprnm_SkillType_ZOMBIE_SQUIRE_1 = cprnm_SkillType__init_($rt_s(104), 102);
    cprnm_SkillType_ZOMBIE_SQUIRE_2 = cprnm_SkillType__init_($rt_s(105), 103);
    cprnm_SkillType_ZOMBIE_SQUIRE_3 = cprnm_SkillType__init_($rt_s(106), 104);
    cprnm_SkillType_ZOMBIE_SQUIRE_4 = cprnm_SkillType__init_($rt_s(107), 105);
    cprnm_SkillType_MAGIC_DRAGON_0 = cprnm_SkillType__init_($rt_s(108), 106);
    cprnm_SkillType_MAGIC_DRAGON_1 = cprnm_SkillType__init_($rt_s(109), 107);
    cprnm_SkillType_MAGIC_DRAGON_2 = cprnm_SkillType__init_($rt_s(110), 108);
    cprnm_SkillType_MAGIC_DRAGON_3 = cprnm_SkillType__init_($rt_s(111), 109);
    cprnm_SkillType_MAGIC_DRAGON_4 = cprnm_SkillType__init_($rt_s(112), 110);
    cprnm_SkillType_AQUATIC_MAN_0 = cprnm_SkillType__init_($rt_s(113), 111);
    cprnm_SkillType_AQUATIC_MAN_1 = cprnm_SkillType__init_($rt_s(114), 112);
    cprnm_SkillType_AQUATIC_MAN_2 = cprnm_SkillType__init_($rt_s(115), 113);
    cprnm_SkillType_AQUATIC_MAN_3 = cprnm_SkillType__init_($rt_s(116), 114);
    cprnm_SkillType_AQUATIC_MAN_4 = cprnm_SkillType__init_($rt_s(117), 115);
    cprnm_SkillType_CRIMSON_WITCH_0 = cprnm_SkillType__init_($rt_s(118), 116);
    cprnm_SkillType_CRIMSON_WITCH_1 = cprnm_SkillType__init_($rt_s(119), 117);
    cprnm_SkillType_CRIMSON_WITCH_2 = cprnm_SkillType__init_($rt_s(120), 118);
    cprnm_SkillType_CRIMSON_WITCH_3 = cprnm_SkillType__init_($rt_s(121), 119);
    cprnm_SkillType_CRIMSON_WITCH_4 = cprnm_SkillType__init_($rt_s(122), 120);
    cprnm_SkillType_NINJA_DWARF_0 = cprnm_SkillType__init_($rt_s(123), 121);
    cprnm_SkillType_NINJA_DWARF_1 = cprnm_SkillType__init_($rt_s(124), 122);
    cprnm_SkillType_NINJA_DWARF_2 = cprnm_SkillType__init_($rt_s(125), 123);
    cprnm_SkillType_NINJA_DWARF_3 = cprnm_SkillType__init_($rt_s(126), 124);
    cprnm_SkillType_NINJA_DWARF_4 = cprnm_SkillType__init_($rt_s(127), 125);
    cprnm_SkillType_BROZERKER_0 = cprnm_SkillType__init_($rt_s(128), 126);
    cprnm_SkillType_BROZERKER_1 = cprnm_SkillType__init_($rt_s(129), 127);
    cprnm_SkillType_BROZERKER_2 = cprnm_SkillType__init_($rt_s(130), 128);
    cprnm_SkillType_BROZERKER_3 = cprnm_SkillType__init_($rt_s(131), 129);
    cprnm_SkillType_BROZERKER_4 = cprnm_SkillType__init_($rt_s(132), 130);
    cprnm_SkillType_GROOVY_DRUID_0 = cprnm_SkillType__init_($rt_s(133), 131);
    cprnm_SkillType_GROOVY_DRUID_1 = cprnm_SkillType__init_($rt_s(134), 132);
    cprnm_SkillType_GROOVY_DRUID_2 = cprnm_SkillType__init_($rt_s(135), 133);
    cprnm_SkillType_GROOVY_DRUID_3 = cprnm_SkillType__init_($rt_s(136), 134);
    cprnm_SkillType_GROOVY_DRUID_4 = cprnm_SkillType__init_($rt_s(137), 135);
    cprnm_SkillType_BONE_DRAGON_0 = cprnm_SkillType__init_($rt_s(138), 136);
    cprnm_SkillType_BONE_DRAGON_1 = cprnm_SkillType__init_($rt_s(139), 137);
    cprnm_SkillType_BONE_DRAGON_2 = cprnm_SkillType__init_($rt_s(140), 138);
    cprnm_SkillType_BONE_DRAGON_3 = cprnm_SkillType__init_($rt_s(141), 139);
    cprnm_SkillType_BONE_DRAGON_4 = cprnm_SkillType__init_($rt_s(142), 140);
    cprnm_SkillType_NPC_HEALER_SPRITE_0 = cprnm_SkillType__init_($rt_s(143), 141);
    cprnm_SkillType_NPC_BUFF_SPRITE_0 = cprnm_SkillType__init_($rt_s(144), 142);
    cprnm_SkillType_NPC_TROLL_BLOB_0 = cprnm_SkillType__init_($rt_s(145), 143);
    cprnm_SkillType_NPC_INFERNO_SPIDER_0 = cprnm_SkillType__init_($rt_s(146), 144);
    cprnm_SkillType_NPC_SCARECROW_0 = cprnm_SkillType__init_($rt_s(147), 145);
    cprnm_SkillType_NPC_POTTED_PLANT_0 = cprnm_SkillType__init_($rt_s(148), 146);
    cprnm_SkillType_NPC_POTTED_PLANT_1 = cprnm_SkillType__init_($rt_s(149), 147);
    cprnm_SkillType_SPIKEY_DRAGON_0 = cprnm_SkillType__init_($rt_s(150), 148);
    cprnm_SkillType_SPIKEY_DRAGON_1 = cprnm_SkillType__init_($rt_s(151), 149);
    cprnm_SkillType_SPIKEY_DRAGON_2 = cprnm_SkillType__init_($rt_s(152), 150);
    cprnm_SkillType_SPIKEY_DRAGON_3 = cprnm_SkillType__init_($rt_s(153), 151);
    cprnm_SkillType_SPIKEY_DRAGON_4 = cprnm_SkillType__init_($rt_s(154), 152);
    cprnm_SkillType_FROST_GIANT_0 = cprnm_SkillType__init_($rt_s(155), 153);
    cprnm_SkillType_FROST_GIANT_1 = cprnm_SkillType__init_($rt_s(156), 154);
    cprnm_SkillType_FROST_GIANT_2 = cprnm_SkillType__init_($rt_s(157), 155);
    cprnm_SkillType_FROST_GIANT_3 = cprnm_SkillType__init_($rt_s(158), 156);
    cprnm_SkillType_FROST_GIANT_4 = cprnm_SkillType__init_($rt_s(159), 157);
    cprnm_SkillType_MINOTAUR_0 = cprnm_SkillType__init_($rt_s(160), 158);
    cprnm_SkillType_MINOTAUR_1 = cprnm_SkillType__init_($rt_s(161), 159);
    cprnm_SkillType_MINOTAUR_2 = cprnm_SkillType__init_($rt_s(162), 160);
    cprnm_SkillType_MINOTAUR_3 = cprnm_SkillType__init_($rt_s(163), 161);
    cprnm_SkillType_MINOTAUR_4 = cprnm_SkillType__init_($rt_s(164), 162);
    cprnm_SkillType_DARK_HORSE_0 = cprnm_SkillType__init_($rt_s(165), 163);
    cprnm_SkillType_DARK_HORSE_1 = cprnm_SkillType__init_($rt_s(166), 164);
    cprnm_SkillType_DARK_HORSE_2 = cprnm_SkillType__init_($rt_s(167), 165);
    cprnm_SkillType_DARK_HORSE_3 = cprnm_SkillType__init_($rt_s(168), 166);
    cprnm_SkillType_DARK_HORSE_4 = cprnm_SkillType__init_($rt_s(169), 167);
    cprnm_SkillType_DRUIDINATRIX_0 = cprnm_SkillType__init_($rt_s(170), 168);
    cprnm_SkillType_DRUIDINATRIX_1 = cprnm_SkillType__init_($rt_s(171), 169);
    cprnm_SkillType_DRUIDINATRIX_2 = cprnm_SkillType__init_($rt_s(172), 170);
    cprnm_SkillType_DRUIDINATRIX_3 = cprnm_SkillType__init_($rt_s(173), 171);
    cprnm_SkillType_DRUIDINATRIX_4 = cprnm_SkillType__init_($rt_s(174), 172);
    cprnm_SkillType_NPC_KAMIKAZE_GNOME_0 = cprnm_SkillType__init_($rt_s(175), 173);
    cprnm_SkillType_NPC_MR_SMASHY_0 = cprnm_SkillType__init_($rt_s(176), 174);
    cprnm_SkillType_BARDBARIAN_TITAN = cprnm_SkillType__init_($rt_s(177), 175);
    cprnm_SkillType_BROZERKER_TITAN = cprnm_SkillType__init_($rt_s(178), 176);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_TITAN = cprnm_SkillType__init_($rt_s(179), 177);
    cprnm_SkillType_SNAP_DRAGON_TITAN = cprnm_SkillType__init_($rt_s(180), 178);
    cprnm_SkillType_FAITH_HEALER_TITAN = cprnm_SkillType__init_($rt_s(181), 179);
    cprnm_SkillType_MEDUSA_TITAN = cprnm_SkillType__init_($rt_s(182), 180);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_TITAN = cprnm_SkillType__init_($rt_s(183), 181);
    cprnm_SkillType_BONE_DRAGON_TITAN = cprnm_SkillType__init_($rt_s(184), 182);
    cprnm_SkillType_DRAGON_LADY_TITAN = cprnm_SkillType__init_($rt_s(185), 183);
    cprnm_SkillType_AQUATIC_MAN_TITAN = cprnm_SkillType__init_($rt_s(186), 184);
    cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_0 = cprnm_SkillType__init_($rt_s(187), 185);
    cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_0 = cprnm_SkillType__init_($rt_s(188), 186);
    cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_1 = cprnm_SkillType__init_($rt_s(189), 187);
    cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_1 = cprnm_SkillType__init_($rt_s(190), 188);
    cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_2 = cprnm_SkillType__init_($rt_s(191), 189);
    cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_2 = cprnm_SkillType__init_($rt_s(192), 190);
    cprnm_SkillType_NPC_EVIL_WIZARD_UNTARGETABLE = cprnm_SkillType__init_($rt_s(193), 191);
    cprnm_SkillType_ORC_MONK_0 = cprnm_SkillType__init_($rt_s(194), 192);
    cprnm_SkillType_ORC_MONK_1 = cprnm_SkillType__init_($rt_s(195), 193);
    cprnm_SkillType_ORC_MONK_2 = cprnm_SkillType__init_($rt_s(196), 194);
    cprnm_SkillType_ORC_MONK_3 = cprnm_SkillType__init_($rt_s(197), 195);
    cprnm_SkillType_ORC_MONK_4 = cprnm_SkillType__init_($rt_s(198), 196);
    cprnm_SkillType_DWARVEN_ARCHER_0 = cprnm_SkillType__init_($rt_s(199), 197);
    cprnm_SkillType_DWARVEN_ARCHER_1 = cprnm_SkillType__init_($rt_s(200), 198);
    cprnm_SkillType_DWARVEN_ARCHER_2 = cprnm_SkillType__init_($rt_s(201), 199);
    cprnm_SkillType_DWARVEN_ARCHER_3 = cprnm_SkillType__init_($rt_s(202), 200);
    cprnm_SkillType_DWARVEN_ARCHER_4 = cprnm_SkillType__init_($rt_s(203), 201);
    cprnm_SkillType_RABID_DRAGON_0 = cprnm_SkillType__init_($rt_s(204), 202);
    cprnm_SkillType_RABID_DRAGON_1 = cprnm_SkillType__init_($rt_s(205), 203);
    cprnm_SkillType_RABID_DRAGON_2 = cprnm_SkillType__init_($rt_s(206), 204);
    cprnm_SkillType_RABID_DRAGON_3 = cprnm_SkillType__init_($rt_s(207), 205);
    cprnm_SkillType_RABID_DRAGON_4 = cprnm_SkillType__init_($rt_s(208), 206);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_0 = cprnm_SkillType__init_($rt_s(209), 207);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_0 = cprnm_SkillType__init_($rt_s(210), 208);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_0 = cprnm_SkillType__init_($rt_s(211), 209);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_1 = cprnm_SkillType__init_($rt_s(212), 210);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_1 = cprnm_SkillType__init_($rt_s(213), 211);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_1 = cprnm_SkillType__init_($rt_s(214), 212);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_2 = cprnm_SkillType__init_($rt_s(215), 213);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_2 = cprnm_SkillType__init_($rt_s(216), 214);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_2 = cprnm_SkillType__init_($rt_s(217), 215);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_EAT_GOLD_2 = cprnm_SkillType__init_($rt_s(218), 216);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_WIND = cprnm_SkillType__init_($rt_s(219), 217);
    cprnm_SkillType_NPC_GOLD_COLOSSUS_SPIKES = cprnm_SkillType__init_($rt_s(220), 218);
    cprnm_SkillType_NPC_CAULDRON_MONSTER_0 = cprnm_SkillType__init_($rt_s(221), 219);
    cprnm_SkillType_NPC_SQUID_0 = cprnm_SkillType__init_($rt_s(222), 220);
    cprnm_SkillType_NPC_GIANT_PLANT_BITE = cprnm_SkillType__init_($rt_s(223), 221);
    cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_0 = cprnm_SkillType__init_($rt_s(224), 222);
    cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_1 = cprnm_SkillType__init_($rt_s(225), 223);
    cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_2 = cprnm_SkillType__init_($rt_s(226), 224);
    cprnm_SkillType_NPC_GIANT_PLANT_HOP_FORWARD = cprnm_SkillType__init_($rt_s(227), 225);
    cprnm_SkillType_NPC_GIANT_PLANT_SPAWNER = cprnm_SkillType__init_($rt_s(228), 226);
    cprnm_SkillType_NPC_GIANT_PLANT_ROOT_0 = cprnm_SkillType__init_($rt_s(229), 227);
    cprnm_SkillType_BOSS_CANT_BE_DISABLED = cprnm_SkillType__init_($rt_s(230), 228);
    cprnm_SkillType_SKELETON_KING_0 = cprnm_SkillType__init_($rt_s(231), 229);
    cprnm_SkillType_SKELETON_KING_1 = cprnm_SkillType__init_($rt_s(232), 230);
    cprnm_SkillType_SKELETON_KING_2 = cprnm_SkillType__init_($rt_s(233), 231);
    cprnm_SkillType_SKELETON_KING_3 = cprnm_SkillType__init_($rt_s(234), 232);
    cprnm_SkillType_SKELETON_KING_4 = cprnm_SkillType__init_($rt_s(235), 233);
    cprnm_SkillType_SATYR_0 = cprnm_SkillType__init_($rt_s(236), 234);
    cprnm_SkillType_SATYR_1 = cprnm_SkillType__init_($rt_s(237), 235);
    cprnm_SkillType_SATYR_2 = cprnm_SkillType__init_($rt_s(238), 236);
    cprnm_SkillType_SATYR_3 = cprnm_SkillType__init_($rt_s(239), 237);
    cprnm_SkillType_SATYR_4 = cprnm_SkillType__init_($rt_s(240), 238);
    cprnm_SkillType_STORM_DRAGON_0 = cprnm_SkillType__init_($rt_s(241), 239);
    cprnm_SkillType_STORM_DRAGON_1 = cprnm_SkillType__init_($rt_s(242), 240);
    cprnm_SkillType_STORM_DRAGON_2 = cprnm_SkillType__init_($rt_s(243), 241);
    cprnm_SkillType_STORM_DRAGON_3 = cprnm_SkillType__init_($rt_s(244), 242);
    cprnm_SkillType_STORM_DRAGON_4 = cprnm_SkillType__init_($rt_s(245), 243);
    cprnm_SkillType_NPC_SKELETON_DEER_0 = cprnm_SkillType__init_($rt_s(246), 244);
    cprnm_SkillType_NPC_SKELETON_DEER_1 = cprnm_SkillType__init_($rt_s(247), 245);
    cprnm_SkillType_NPC_SKELETON_DEER_2 = cprnm_SkillType__init_($rt_s(248), 246);
    cprnm_SkillType_NPC_MUSHROOM_0 = cprnm_SkillType__init_($rt_s(249), 247);
    cprnm_SkillType_BROZERKER_5 = cprnm_SkillType__init_($rt_s(250), 248);
    cprnm_SkillType_MEDUSA_5 = cprnm_SkillType__init_($rt_s(251), 249);
    cprnm_SkillType_DUST_DEVIL_5 = cprnm_SkillType__init_($rt_s(252), 250);
    cprnm_SkillType_FAITH_HEALER_5 = cprnm_SkillType__init_($rt_s(253), 251);
    cprnm_SkillType_POLEMASTER_5 = cprnm_SkillType__init_($rt_s(254), 252);
    cprnm_SkillType_DARK_DRACUL_5 = cprnm_SkillType__init_($rt_s(255), 253);
    cprnm_SkillType_CATAPULT_KNIGHT_5 = cprnm_SkillType__init_($rt_s(256), 254);
    cprnm_SkillType_NINJA_DWARF_5 = cprnm_SkillType__init_($rt_s(257), 255);
    cprnm_SkillType_SNAP_DRAGON_5 = cprnm_SkillType__init_($rt_s(258), 256);
    cprnm_SkillType_UNICORGI_0 = cprnm_SkillType__init_($rt_s(259), 257);
    cprnm_SkillType_UNICORGI_1 = cprnm_SkillType__init_($rt_s(260), 258);
    cprnm_SkillType_UNICORGI_2 = cprnm_SkillType__init_($rt_s(261), 259);
    cprnm_SkillType_UNICORGI_3 = cprnm_SkillType__init_($rt_s(262), 260);
    cprnm_SkillType_UNICORGI_4 = cprnm_SkillType__init_($rt_s(263), 261);
    cprnm_SkillType_SNIPER_WOLF_0 = cprnm_SkillType__init_($rt_s(264), 262);
    cprnm_SkillType_SNIPER_WOLF_1 = cprnm_SkillType__init_($rt_s(265), 263);
    cprnm_SkillType_SNIPER_WOLF_2 = cprnm_SkillType__init_($rt_s(266), 264);
    cprnm_SkillType_SNIPER_WOLF_3 = cprnm_SkillType__init_($rt_s(267), 265);
    cprnm_SkillType_SNIPER_WOLF_4 = cprnm_SkillType__init_($rt_s(268), 266);
    cprnm_SkillType_GENIE_0 = cprnm_SkillType__init_($rt_s(269), 267);
    cprnm_SkillType_GENIE_1 = cprnm_SkillType__init_($rt_s(270), 268);
    cprnm_SkillType_GENIE_2 = cprnm_SkillType__init_($rt_s(271), 269);
    cprnm_SkillType_GENIE_3 = cprnm_SkillType__init_($rt_s(272), 270);
    cprnm_SkillType_GENIE_4 = cprnm_SkillType__init_($rt_s(273), 271);
    cprnm_SkillType_NPC_HEAD_CRAB_0 = cprnm_SkillType__init_($rt_s(274), 272);
    cprnm_SkillType_NPC_CLOUD_MONSTER_0 = cprnm_SkillType__init_($rt_s(275), 273);
    cprnm_SkillType_NPC_CLOUD_MONSTER_1 = cprnm_SkillType__init_($rt_s(276), 274);
    cprnm_SkillType_ZOMBIE_SQUIRE_5 = cprnm_SkillType__init_($rt_s(277), 275);
    cprnm_SkillType_MAGIC_DRAGON_5 = cprnm_SkillType__init_($rt_s(278), 276);
    cprnm_SkillType_GROOVY_DRUID_5 = cprnm_SkillType__init_($rt_s(279), 277);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_5 = cprnm_SkillType__init_($rt_s(280), 278);
    cprnm_SkillType_DRAGON_LADY_5 = cprnm_SkillType__init_($rt_s(281), 279);
    cprnm_SkillType_SHADOW_ASSASSIN_5 = cprnm_SkillType__init_($rt_s(282), 280);
    cprnm_SkillType_ELECTROYETI_5 = cprnm_SkillType__init_($rt_s(283), 281);
    cprnm_SkillType_FROST_GIANT_5 = cprnm_SkillType__init_($rt_s(284), 282);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_5 = cprnm_SkillType__init_($rt_s(285), 283);
    cprnm_SkillType_HYDRA_5 = cprnm_SkillType__init_($rt_s(286), 284);
    cprnm_SkillType_BARDBARIAN_5 = cprnm_SkillType__init_($rt_s(287), 285);
    cprnm_SkillType_SAVAGE_CUTIE_5 = cprnm_SkillType__init_($rt_s(288), 286);
    cprnm_SkillType_ORC_MONK_5 = cprnm_SkillType__init_($rt_s(289), 287);
    cprnm_SkillType_COSMIC_ELF_5 = cprnm_SkillType__init_($rt_s(290), 288);
    cprnm_SkillType_AQUATIC_MAN_5 = cprnm_SkillType__init_($rt_s(291), 289);
    cprnm_SkillType_MOON_DRAKE_5 = cprnm_SkillType__init_($rt_s(292), 290);
    cprnm_SkillType_ROLLER_WARRIOR_5 = cprnm_SkillType__init_($rt_s(293), 291);
    cprnm_SkillType_DRUIDINATRIX_5 = cprnm_SkillType__init_($rt_s(294), 292);
    cprnm_SkillType_DRAGZILLA_0 = cprnm_SkillType__init_($rt_s(295), 293);
    cprnm_SkillType_DRAGZILLA_1 = cprnm_SkillType__init_($rt_s(296), 294);
    cprnm_SkillType_DRAGZILLA_2 = cprnm_SkillType__init_($rt_s(297), 295);
    cprnm_SkillType_DRAGZILLA_3 = cprnm_SkillType__init_($rt_s(298), 296);
    cprnm_SkillType_DRAGZILLA_4 = cprnm_SkillType__init_($rt_s(299), 297);
    cprnm_SkillType_PIRATE_0 = cprnm_SkillType__init_($rt_s(300), 298);
    cprnm_SkillType_PIRATE_1 = cprnm_SkillType__init_($rt_s(301), 299);
    cprnm_SkillType_PIRATE_2 = cprnm_SkillType__init_($rt_s(302), 300);
    cprnm_SkillType_PIRATE_3 = cprnm_SkillType__init_($rt_s(303), 301);
    cprnm_SkillType_PIRATE_4 = cprnm_SkillType__init_($rt_s(304), 302);
    cprnm_SkillType_CYCLOPS_WIZARD_0 = cprnm_SkillType__init_($rt_s(305), 303);
    cprnm_SkillType_CYCLOPS_WIZARD_1 = cprnm_SkillType__init_($rt_s(306), 304);
    cprnm_SkillType_CYCLOPS_WIZARD_2 = cprnm_SkillType__init_($rt_s(307), 305);
    cprnm_SkillType_CYCLOPS_WIZARD_3 = cprnm_SkillType__init_($rt_s(308), 306);
    cprnm_SkillType_CYCLOPS_WIZARD_4 = cprnm_SkillType__init_($rt_s(309), 307);
    cprnm_SkillType_DEMON_TOTEM_0 = cprnm_SkillType__init_($rt_s(310), 308);
    cprnm_SkillType_DEMON_TOTEM_1 = cprnm_SkillType__init_($rt_s(311), 309);
    cprnm_SkillType_DEMON_TOTEM_2 = cprnm_SkillType__init_($rt_s(312), 310);
    cprnm_SkillType_DEMON_TOTEM_3 = cprnm_SkillType__init_($rt_s(313), 311);
    cprnm_SkillType_DEMON_TOTEM_4 = cprnm_SkillType__init_($rt_s(314), 312);
    cprnm_SkillType_NPC_EYEBALL_0 = cprnm_SkillType__init_($rt_s(315), 313);
    cprnm_SkillType_DEEP_DRAGON_0 = cprnm_SkillType__init_($rt_s(316), 314);
    cprnm_SkillType_DEEP_DRAGON_1 = cprnm_SkillType__init_($rt_s(317), 315);
    cprnm_SkillType_DEEP_DRAGON_2 = cprnm_SkillType__init_($rt_s(318), 316);
    cprnm_SkillType_DEEP_DRAGON_3 = cprnm_SkillType__init_($rt_s(319), 317);
    cprnm_SkillType_DEEP_DRAGON_4 = cprnm_SkillType__init_($rt_s(320), 318);
    cprnm_SkillType_DOPPELGANGER_0 = cprnm_SkillType__init_($rt_s(321), 319);
    cprnm_SkillType_DOPPELGANGER_1 = cprnm_SkillType__init_($rt_s(322), 320);
    cprnm_SkillType_DOPPELGANGER_2 = cprnm_SkillType__init_($rt_s(323), 321);
    cprnm_SkillType_DOPPELGANGER_3 = cprnm_SkillType__init_($rt_s(324), 322);
    cprnm_SkillType_DOPPELGANGER_4 = cprnm_SkillType__init_($rt_s(325), 323);
    cprnm_SkillType_KRAKEN_KING_0 = cprnm_SkillType__init_($rt_s(326), 324);
    cprnm_SkillType_KRAKEN_KING_1 = cprnm_SkillType__init_($rt_s(327), 325);
    cprnm_SkillType_KRAKEN_KING_2 = cprnm_SkillType__init_($rt_s(328), 326);
    cprnm_SkillType_KRAKEN_KING_3 = cprnm_SkillType__init_($rt_s(329), 327);
    cprnm_SkillType_KRAKEN_KING_4 = cprnm_SkillType__init_($rt_s(330), 328);
    cprnm_SkillType_STOWAWAY_0 = cprnm_SkillType__init_($rt_s(331), 329);
    cprnm_SkillType_STOWAWAY_1 = cprnm_SkillType__init_($rt_s(332), 330);
    cprnm_SkillType_STOWAWAY_2 = cprnm_SkillType__init_($rt_s(333), 331);
    cprnm_SkillType_STOWAWAY_3 = cprnm_SkillType__init_($rt_s(334), 332);
    cprnm_SkillType_STOWAWAY_4 = cprnm_SkillType__init_($rt_s(335), 333);
    cprnm_SkillType_NPC_SHARK_0 = cprnm_SkillType__init_($rt_s(336), 334);
    cprnm_SkillType_NPC_SHARK_1 = cprnm_SkillType__init_($rt_s(337), 335);
    cprnm_SkillType_NPC_SQUIRREL_0 = cprnm_SkillType__init_($rt_s(338), 336);
    cprnm_SkillType_CURSED_STATUE_0 = cprnm_SkillType__init_($rt_s(339), 337);
    cprnm_SkillType_CURSED_STATUE_1 = cprnm_SkillType__init_($rt_s(340), 338);
    cprnm_SkillType_CURSED_STATUE_2 = cprnm_SkillType__init_($rt_s(341), 339);
    cprnm_SkillType_CURSED_STATUE_3 = cprnm_SkillType__init_($rt_s(342), 340);
    cprnm_SkillType_CURSED_STATUE_4 = cprnm_SkillType__init_($rt_s(343), 341);
    cprnm_SkillType_PLANT_SOUL_0 = cprnm_SkillType__init_($rt_s(344), 342);
    cprnm_SkillType_PLANT_SOUL_1 = cprnm_SkillType__init_($rt_s(345), 343);
    cprnm_SkillType_PLANT_SOUL_2 = cprnm_SkillType__init_($rt_s(346), 344);
    cprnm_SkillType_PLANT_SOUL_3 = cprnm_SkillType__init_($rt_s(347), 345);
    cprnm_SkillType_PLANT_SOUL_4 = cprnm_SkillType__init_($rt_s(348), 346);
    cprnm_SkillType_SPIDER_QUEEN_0 = cprnm_SkillType__init_($rt_s(349), 347);
    cprnm_SkillType_SPIDER_QUEEN_1 = cprnm_SkillType__init_($rt_s(350), 348);
    cprnm_SkillType_SPIDER_QUEEN_2 = cprnm_SkillType__init_($rt_s(351), 349);
    cprnm_SkillType_SPIDER_QUEEN_3 = cprnm_SkillType__init_($rt_s(352), 350);
    cprnm_SkillType_SPIDER_QUEEN_4 = cprnm_SkillType__init_($rt_s(353), 351);
    cprnm_SkillType_VULTURE_DRAGON_0 = cprnm_SkillType__init_($rt_s(354), 352);
    cprnm_SkillType_VULTURE_DRAGON_1 = cprnm_SkillType__init_($rt_s(355), 353);
    cprnm_SkillType_VULTURE_DRAGON_2 = cprnm_SkillType__init_($rt_s(356), 354);
    cprnm_SkillType_VULTURE_DRAGON_3 = cprnm_SkillType__init_($rt_s(357), 355);
    cprnm_SkillType_VULTURE_DRAGON_4 = cprnm_SkillType__init_($rt_s(358), 356);
    cprnm_SkillType_NPC_ANT_0 = cprnm_SkillType__init_($rt_s(359), 357);
    cprnm_SkillType_NPC_ANT_1 = cprnm_SkillType__init_($rt_s(360), 358);
    cprnm_SkillType_FROST_GIANT_TITAN = cprnm_SkillType__init_($rt_s(361), 359);
    cprnm_SkillType_ORC_MONK_TITAN = cprnm_SkillType__init_($rt_s(362), 360);
    cprnm_SkillType_RABID_DRAGON_TITAN = cprnm_SkillType__init_($rt_s(363), 361);
    cprnm_SkillType_GENIE_TITAN = cprnm_SkillType__init_($rt_s(364), 362);
    cprnm_SkillType_SKELETON_KING_TITAN = cprnm_SkillType__init_($rt_s(365), 363);
    cprnm_SkillType_SPIKEY_DRAGON_TITAN = cprnm_SkillType__init_($rt_s(366), 364);
    cprnm_SkillType_BANSHEE_0 = cprnm_SkillType__init_($rt_s(367), 365);
    cprnm_SkillType_BANSHEE_1 = cprnm_SkillType__init_($rt_s(368), 366);
    cprnm_SkillType_BANSHEE_2 = cprnm_SkillType__init_($rt_s(369), 367);
    cprnm_SkillType_BANSHEE_3 = cprnm_SkillType__init_($rt_s(370), 368);
    cprnm_SkillType_BANSHEE_4 = cprnm_SkillType__init_($rt_s(371), 369);
    cprnm_SkillType_RAGING_REVENANT_0 = cprnm_SkillType__init_($rt_s(372), 370);
    cprnm_SkillType_RAGING_REVENANT_1 = cprnm_SkillType__init_($rt_s(373), 371);
    cprnm_SkillType_RAGING_REVENANT_2 = cprnm_SkillType__init_($rt_s(374), 372);
    cprnm_SkillType_RAGING_REVENANT_3 = cprnm_SkillType__init_($rt_s(375), 373);
    cprnm_SkillType_RAGING_REVENANT_4 = cprnm_SkillType__init_($rt_s(376), 374);
    cprnm_SkillType_SILENT_SPIRIT_0 = cprnm_SkillType__init_($rt_s(377), 375);
    cprnm_SkillType_SILENT_SPIRIT_1 = cprnm_SkillType__init_($rt_s(378), 376);
    cprnm_SkillType_SILENT_SPIRIT_2 = cprnm_SkillType__init_($rt_s(379), 377);
    cprnm_SkillType_SILENT_SPIRIT_3 = cprnm_SkillType__init_($rt_s(380), 378);
    cprnm_SkillType_SILENT_SPIRIT_4 = cprnm_SkillType__init_($rt_s(381), 379);
    cprnm_SkillType_SPECTRAL_DRAGON_0 = cprnm_SkillType__init_($rt_s(382), 380);
    cprnm_SkillType_SPECTRAL_DRAGON_1 = cprnm_SkillType__init_($rt_s(383), 381);
    cprnm_SkillType_SPECTRAL_DRAGON_2 = cprnm_SkillType__init_($rt_s(384), 382);
    cprnm_SkillType_SPECTRAL_DRAGON_3 = cprnm_SkillType__init_($rt_s(385), 383);
    cprnm_SkillType_SPECTRAL_DRAGON_4 = cprnm_SkillType__init_($rt_s(386), 384);
    cprnm_SkillType_NPC_LYING_LANTERN_0 = cprnm_SkillType__init_($rt_s(387), 385);
    cprnm_SkillType_NPC_LYING_LANTERN_1 = cprnm_SkillType__init_($rt_s(388), 386);
    cprnm_SkillType_NPC_LYING_LANTERN_2 = cprnm_SkillType__init_($rt_s(389), 387);
    cprnm_SkillType_RABID_DRAGON_5 = cprnm_SkillType__init_($rt_s(390), 388);
    cprnm_SkillType_BONE_DRAGON_5 = cprnm_SkillType__init_($rt_s(391), 389);
    cprnm_SkillType_SNIPER_WOLF_5 = cprnm_SkillType__init_($rt_s(392), 390);
    cprnm_SkillType_WEREDRAGON_0 = cprnm_SkillType__init_($rt_s(393), 391);
    cprnm_SkillType_WEREDRAGON_1 = cprnm_SkillType__init_($rt_s(394), 392);
    cprnm_SkillType_WEREDRAGON_2 = cprnm_SkillType__init_($rt_s(395), 393);
    cprnm_SkillType_WEREDRAGON_3 = cprnm_SkillType__init_($rt_s(396), 394);
    cprnm_SkillType_WEREDRAGON_4 = cprnm_SkillType__init_($rt_s(397), 395);
    cprnm_SkillType_WEE_WITCH_0 = cprnm_SkillType__init_($rt_s(398), 396);
    cprnm_SkillType_WEE_WITCH_1 = cprnm_SkillType__init_($rt_s(399), 397);
    cprnm_SkillType_WEE_WITCH_2 = cprnm_SkillType__init_($rt_s(400), 398);
    cprnm_SkillType_WEE_WITCH_3 = cprnm_SkillType__init_($rt_s(401), 399);
    cprnm_SkillType_WEE_WITCH_4 = cprnm_SkillType__init_($rt_s(402), 400);
    cprnm_SkillType_DUNGEON_MAN_0 = cprnm_SkillType__init_($rt_s(403), 401);
    cprnm_SkillType_DUNGEON_MAN_1 = cprnm_SkillType__init_($rt_s(404), 402);
    cprnm_SkillType_DUNGEON_MAN_2 = cprnm_SkillType__init_($rt_s(405), 403);
    cprnm_SkillType_DUNGEON_MAN_3 = cprnm_SkillType__init_($rt_s(406), 404);
    cprnm_SkillType_DUNGEON_MAN_4 = cprnm_SkillType__init_($rt_s(407), 405);
    cprnm_SkillType_NPC_PLAGUE_SKULKER_0 = cprnm_SkillType__init_($rt_s(408), 406);
    cprnm_SkillType_NPC_PLAGUE_SKULKER_1 = cprnm_SkillType__init_($rt_s(409), 407);
    cprnm_SkillType_PLAGUE_ENTREPRENEUR_0 = cprnm_SkillType__init_($rt_s(410), 408);
    cprnm_SkillType_PLAGUE_ENTREPRENEUR_1 = cprnm_SkillType__init_($rt_s(411), 409);
    cprnm_SkillType_PLAGUE_ENTREPRENEUR_2 = cprnm_SkillType__init_($rt_s(412), 410);
    cprnm_SkillType_PLAGUE_ENTREPRENEUR_3 = cprnm_SkillType__init_($rt_s(413), 411);
    cprnm_SkillType_PLAGUE_ENTREPRENEUR_4 = cprnm_SkillType__init_($rt_s(414), 412);
    cprnm_SkillType_MISTRESS_MANICURE_0 = cprnm_SkillType__init_($rt_s(415), 413);
    cprnm_SkillType_MISTRESS_MANICURE_1 = cprnm_SkillType__init_($rt_s(416), 414);
    cprnm_SkillType_MISTRESS_MANICURE_2 = cprnm_SkillType__init_($rt_s(417), 415);
    cprnm_SkillType_MISTRESS_MANICURE_3 = cprnm_SkillType__init_($rt_s(418), 416);
    cprnm_SkillType_MISTRESS_MANICURE_4 = cprnm_SkillType__init_($rt_s(419), 417);
    cprnm_SkillType_VILE_BILE_0 = cprnm_SkillType__init_($rt_s(420), 418);
    cprnm_SkillType_VILE_BILE_1 = cprnm_SkillType__init_($rt_s(421), 419);
    cprnm_SkillType_VILE_BILE_2 = cprnm_SkillType__init_($rt_s(422), 420);
    cprnm_SkillType_VILE_BILE_3 = cprnm_SkillType__init_($rt_s(423), 421);
    cprnm_SkillType_VILE_BILE_4 = cprnm_SkillType__init_($rt_s(424), 422);
    cprnm_SkillType_NPC_FLEA_DEMON_0 = cprnm_SkillType__init_($rt_s(425), 423);
    cprnm_SkillType_UNICORGI_5 = cprnm_SkillType__init_($rt_s(426), 424);
    cprnm_SkillType_PIRATE_5 = cprnm_SkillType__init_($rt_s(427), 425);
    cprnm_SkillType_DWARVEN_ARCHER_5 = cprnm_SkillType__init_($rt_s(428), 426);
    cprnm_SkillType_VOID_WYVERN_0 = cprnm_SkillType__init_($rt_s(429), 427);
    cprnm_SkillType_VOID_WYVERN_1 = cprnm_SkillType__init_($rt_s(430), 428);
    cprnm_SkillType_VOID_WYVERN_2 = cprnm_SkillType__init_($rt_s(431), 429);
    cprnm_SkillType_VOID_WYVERN_3 = cprnm_SkillType__init_($rt_s(432), 430);
    cprnm_SkillType_VOID_WYVERN_4 = cprnm_SkillType__init_($rt_s(433), 431);
    cprnm_SkillType_DARK_HORSE_5 = cprnm_SkillType__init_($rt_s(434), 432);
    cprnm_SkillType_BURNT_ONE_0 = cprnm_SkillType__init_($rt_s(435), 433);
    cprnm_SkillType_BURNT_ONE_1 = cprnm_SkillType__init_($rt_s(436), 434);
    cprnm_SkillType_BURNT_ONE_2 = cprnm_SkillType__init_($rt_s(437), 435);
    cprnm_SkillType_BURNT_ONE_3 = cprnm_SkillType__init_($rt_s(438), 436);
    cprnm_SkillType_BURNT_ONE_4 = cprnm_SkillType__init_($rt_s(439), 437);
    cprnm_SkillType_SKELETON_KING_5 = cprnm_SkillType__init_($rt_s(440), 438);
    cprnm_SkillType_SATYR_5 = cprnm_SkillType__init_($rt_s(441), 439);
    cprnm_SkillType_DEEP_DRAGON_5 = cprnm_SkillType__init_($rt_s(442), 440);
    cprnm_SkillType_STORM_DRAGON_5 = cprnm_SkillType__init_($rt_s(443), 441);
    cprnm_SkillType_NPC_ANGELIC_AVENGER_0 = cprnm_SkillType__init_($rt_s(444), 442);
    cprnm_SkillType_MINOTAUR_5 = cprnm_SkillType__init_($rt_s(445), 443);
    cprnm_SkillType_CRIMSON_WITCH_5 = cprnm_SkillType__init_($rt_s(446), 444);
    cprnm_SkillType_SPIKEY_DRAGON_5 = cprnm_SkillType__init_($rt_s(447), 445);
    cprnm_SkillType_GENIE_5 = cprnm_SkillType__init_($rt_s(448), 446);
    cprnm_SkillType_DEMON_TOTEM_5 = cprnm_SkillType__init_($rt_s(449), 447);
    cprnm_SkillType_TOMB_ANGEL_0 = cprnm_SkillType__init_($rt_s(450), 448);
    cprnm_SkillType_TOMB_ANGEL_1 = cprnm_SkillType__init_($rt_s(451), 449);
    cprnm_SkillType_TOMB_ANGEL_2 = cprnm_SkillType__init_($rt_s(452), 450);
    cprnm_SkillType_TOMB_ANGEL_3 = cprnm_SkillType__init_($rt_s(453), 451);
    cprnm_SkillType_TOMB_ANGEL_4 = cprnm_SkillType__init_($rt_s(454), 452);
    cprnm_SkillType_ANGELIC_HERALD_0 = cprnm_SkillType__init_($rt_s(455), 453);
    cprnm_SkillType_ANGELIC_HERALD_1 = cprnm_SkillType__init_($rt_s(456), 454);
    cprnm_SkillType_ANGELIC_HERALD_2 = cprnm_SkillType__init_($rt_s(457), 455);
    cprnm_SkillType_ANGELIC_HERALD_3 = cprnm_SkillType__init_($rt_s(458), 456);
    cprnm_SkillType_ANGELIC_HERALD_4 = cprnm_SkillType__init_($rt_s(459), 457);
    cprnm_SkillType_BULWARK_ANGEL_0 = cprnm_SkillType__init_($rt_s(460), 458);
    cprnm_SkillType_BULWARK_ANGEL_1 = cprnm_SkillType__init_($rt_s(461), 459);
    cprnm_SkillType_BULWARK_ANGEL_2 = cprnm_SkillType__init_($rt_s(462), 460);
    cprnm_SkillType_BULWARK_ANGEL_3 = cprnm_SkillType__init_($rt_s(463), 461);
    cprnm_SkillType_BULWARK_ANGEL_4 = cprnm_SkillType__init_($rt_s(464), 462);
    cprnm_SkillType_ANGEL_DRAGON_0 = cprnm_SkillType__init_($rt_s(465), 463);
    cprnm_SkillType_ANGEL_DRAGON_1 = cprnm_SkillType__init_($rt_s(466), 464);
    cprnm_SkillType_ANGEL_DRAGON_2 = cprnm_SkillType__init_($rt_s(467), 465);
    cprnm_SkillType_ANGEL_DRAGON_3 = cprnm_SkillType__init_($rt_s(468), 466);
    cprnm_SkillType_ANGEL_DRAGON_4 = cprnm_SkillType__init_($rt_s(469), 467);
    cprnm_SkillType_DRAGON_SLAYER_0 = cprnm_SkillType__init_($rt_s(470), 468);
    cprnm_SkillType_DRAGON_SLAYER_1 = cprnm_SkillType__init_($rt_s(471), 469);
    cprnm_SkillType_DRAGON_SLAYER_2 = cprnm_SkillType__init_($rt_s(472), 470);
    cprnm_SkillType_DRAGON_SLAYER_3 = cprnm_SkillType__init_($rt_s(473), 471);
    cprnm_SkillType_DRAGON_SLAYER_4 = cprnm_SkillType__init_($rt_s(474), 472);
    cprnm_SkillType_ETERNAL_ENCHANTER_0 = cprnm_SkillType__init_($rt_s(475), 473);
    cprnm_SkillType_ETERNAL_ENCHANTER_1 = cprnm_SkillType__init_($rt_s(476), 474);
    cprnm_SkillType_ETERNAL_ENCHANTER_2 = cprnm_SkillType__init_($rt_s(477), 475);
    cprnm_SkillType_ETERNAL_ENCHANTER_3 = cprnm_SkillType__init_($rt_s(478), 476);
    cprnm_SkillType_ETERNAL_ENCHANTER_4 = cprnm_SkillType__init_($rt_s(479), 477);
    cprnm_SkillType_GRAND_HUNTRESS_0 = cprnm_SkillType__init_($rt_s(480), 478);
    cprnm_SkillType_GRAND_HUNTRESS_1 = cprnm_SkillType__init_($rt_s(481), 479);
    cprnm_SkillType_GRAND_HUNTRESS_2 = cprnm_SkillType__init_($rt_s(482), 480);
    cprnm_SkillType_GRAND_HUNTRESS_3 = cprnm_SkillType__init_($rt_s(483), 481);
    cprnm_SkillType_GRAND_HUNTRESS_4 = cprnm_SkillType__init_($rt_s(484), 482);
    cprnm_SkillType_TRIPLE_THREAT_0 = cprnm_SkillType__init_($rt_s(485), 483);
    cprnm_SkillType_TRIPLE_THREAT_1 = cprnm_SkillType__init_($rt_s(486), 484);
    cprnm_SkillType_TRIPLE_THREAT_2 = cprnm_SkillType__init_($rt_s(487), 485);
    cprnm_SkillType_TRIPLE_THREAT_3 = cprnm_SkillType__init_($rt_s(488), 486);
    cprnm_SkillType_TRIPLE_THREAT_4 = cprnm_SkillType__init_($rt_s(489), 487);
    cprnm_SkillType_LAST_DEFENDER_0 = cprnm_SkillType__init_($rt_s(490), 488);
    cprnm_SkillType_LAST_DEFENDER_1 = cprnm_SkillType__init_($rt_s(491), 489);
    cprnm_SkillType_LAST_DEFENDER_2 = cprnm_SkillType__init_($rt_s(492), 490);
    cprnm_SkillType_LAST_DEFENDER_3 = cprnm_SkillType__init_($rt_s(493), 491);
    cprnm_SkillType_LAST_DEFENDER_4 = cprnm_SkillType__init_($rt_s(494), 492);
    cprnm_SkillType_NUMBER_493 = cprnm_SkillType__init_($rt_s(495), 493);
    cprnm_SkillType_SOJOURNER_SORCERESS_0 = cprnm_SkillType__init_($rt_s(496), 494);
    cprnm_SkillType_SOJOURNER_SORCERESS_1 = cprnm_SkillType__init_($rt_s(497), 495);
    cprnm_SkillType_SOJOURNER_SORCERESS_2 = cprnm_SkillType__init_($rt_s(498), 496);
    cprnm_SkillType_SOJOURNER_SORCERESS_3 = cprnm_SkillType__init_($rt_s(499), 497);
    cprnm_SkillType_SOJOURNER_SORCERESS_4 = cprnm_SkillType__init_($rt_s(500), 498);
    cprnm_SkillType_SOJOURNER_SORCERESS_5 = cprnm_SkillType__init_($rt_s(501), 499);
    cprnm_SkillType_KARAOKE_KING_0 = cprnm_SkillType__init_($rt_s(502), 500);
    cprnm_SkillType_KARAOKE_KING_1 = cprnm_SkillType__init_($rt_s(503), 501);
    cprnm_SkillType_KARAOKE_KING_2 = cprnm_SkillType__init_($rt_s(504), 502);
    cprnm_SkillType_KARAOKE_KING_3 = cprnm_SkillType__init_($rt_s(505), 503);
    cprnm_SkillType_KARAOKE_KING_4 = cprnm_SkillType__init_($rt_s(506), 504);
    cprnm_SkillType_NUMBER_505 = cprnm_SkillType__init_($rt_s(507), 505);
    cprnm_SkillType_SHADOW_OF_SVEN_0 = cprnm_SkillType__init_($rt_s(508), 506);
    cprnm_SkillType_SHADOW_OF_SVEN_1 = cprnm_SkillType__init_($rt_s(509), 507);
    cprnm_SkillType_SHADOW_OF_SVEN_2 = cprnm_SkillType__init_($rt_s(510), 508);
    cprnm_SkillType_SHADOW_OF_SVEN_3 = cprnm_SkillType__init_($rt_s(511), 509);
    cprnm_SkillType_SHADOW_OF_SVEN_4 = cprnm_SkillType__init_($rt_s(512), 510);
    cprnm_SkillType_NUMBER_511 = cprnm_SkillType__init_($rt_s(513), 511);
    cprnm_SkillType_SUN_SEEKER_0 = cprnm_SkillType__init_($rt_s(514), 512);
    cprnm_SkillType_SUN_SEEKER_1 = cprnm_SkillType__init_($rt_s(515), 513);
    cprnm_SkillType_SUN_SEEKER_2 = cprnm_SkillType__init_($rt_s(516), 514);
    cprnm_SkillType_SUN_SEEKER_3 = cprnm_SkillType__init_($rt_s(517), 515);
    cprnm_SkillType_SUN_SEEKER_4 = cprnm_SkillType__init_($rt_s(518), 516);
    cprnm_SkillType_NUMBER_517 = cprnm_SkillType__init_($rt_s(519), 517);
    cprnm_SkillType_STEPLADDER_BROTHERS_0 = cprnm_SkillType__init_($rt_s(520), 518);
    cprnm_SkillType_STEPLADDER_BROTHERS_1 = cprnm_SkillType__init_($rt_s(521), 519);
    cprnm_SkillType_STEPLADDER_BROTHERS_2 = cprnm_SkillType__init_($rt_s(522), 520);
    cprnm_SkillType_STEPLADDER_BROTHERS_3 = cprnm_SkillType__init_($rt_s(523), 521);
    cprnm_SkillType_STEPLADDER_BROTHERS_4 = cprnm_SkillType__init_($rt_s(524), 522);
    cprnm_SkillType_NUMBER_523 = cprnm_SkillType__init_($rt_s(525), 523);
    cprnm_SkillType_FORGOTTEN_DRAGON_0 = cprnm_SkillType__init_($rt_s(526), 524);
    cprnm_SkillType_FORGOTTEN_DRAGON_1 = cprnm_SkillType__init_($rt_s(527), 525);
    cprnm_SkillType_FORGOTTEN_DRAGON_2 = cprnm_SkillType__init_($rt_s(528), 526);
    cprnm_SkillType_FORGOTTEN_DRAGON_3 = cprnm_SkillType__init_($rt_s(529), 527);
    cprnm_SkillType_FORGOTTEN_DRAGON_4 = cprnm_SkillType__init_($rt_s(530), 528);
    cprnm_SkillType_NUMBER_529 = cprnm_SkillType__init_($rt_s(531), 529);
    cprnm_SkillType_NPC_CRYSTAL_LIZARD_0 = cprnm_SkillType__init_($rt_s(532), 530);
    cprnm_SkillType_NPC_CRYSTAL_LIZARD_1 = cprnm_SkillType__init_($rt_s(533), 531);
    cprnm_SkillType_ETERNAL_ENCHANTER_5 = cprnm_SkillType__init_($rt_s(534), 532);
    cprnm_SkillType_BLACK_WING_0 = cprnm_SkillType__init_($rt_s(535), 533);
    cprnm_SkillType_BLACK_WING_1 = cprnm_SkillType__init_($rt_s(536), 534);
    cprnm_SkillType_BLACK_WING_2 = cprnm_SkillType__init_($rt_s(537), 535);
    cprnm_SkillType_BLACK_WING_3 = cprnm_SkillType__init_($rt_s(538), 536);
    cprnm_SkillType_BLACK_WING_4 = cprnm_SkillType__init_($rt_s(539), 537);
    cprnm_SkillType_NUMBER_538 = cprnm_SkillType__init_($rt_s(540), 538);
    cprnm_SkillType_GREED_DRAGON_0 = cprnm_SkillType__init_($rt_s(541), 539);
    cprnm_SkillType_GREED_DRAGON_1 = cprnm_SkillType__init_($rt_s(542), 540);
    cprnm_SkillType_GREED_DRAGON_2 = cprnm_SkillType__init_($rt_s(543), 541);
    cprnm_SkillType_GREED_DRAGON_3 = cprnm_SkillType__init_($rt_s(544), 542);
    cprnm_SkillType_GREED_DRAGON_4 = cprnm_SkillType__init_($rt_s(545), 543);
    cprnm_SkillType_NUMBER_544 = cprnm_SkillType__init_($rt_s(546), 544);
    cprnm_SkillType_UNRIPE_MYTHOLOGY_0 = cprnm_SkillType__init_($rt_s(547), 545);
    cprnm_SkillType_UNRIPE_MYTHOLOGY_1 = cprnm_SkillType__init_($rt_s(548), 546);
    cprnm_SkillType_UNRIPE_MYTHOLOGY_2 = cprnm_SkillType__init_($rt_s(549), 547);
    cprnm_SkillType_UNRIPE_MYTHOLOGY_3 = cprnm_SkillType__init_($rt_s(550), 548);
    cprnm_SkillType_UNRIPE_MYTHOLOGY_4 = cprnm_SkillType__init_($rt_s(551), 549);
    cprnm_SkillType_NUMBER_550 = cprnm_SkillType__init_($rt_s(552), 550);
    cprnm_SkillType_NPC_BREAKER_MKII_0 = cprnm_SkillType__init_($rt_s(553), 551);
    cprnm_SkillType_NPC_BREAKER_MKII_1 = cprnm_SkillType__init_($rt_s(554), 552);
    cprnm_SkillType_DRAGZILLA_5 = cprnm_SkillType__init_($rt_s(555), 553);
    cprnm_SkillType_ANCIENT_DWARF_0 = cprnm_SkillType__init_($rt_s(556), 554);
    cprnm_SkillType_ANCIENT_DWARF_1 = cprnm_SkillType__init_($rt_s(557), 555);
    cprnm_SkillType_ANCIENT_DWARF_2 = cprnm_SkillType__init_($rt_s(558), 556);
    cprnm_SkillType_ANCIENT_DWARF_3 = cprnm_SkillType__init_($rt_s(559), 557);
    cprnm_SkillType_ANCIENT_DWARF_4 = cprnm_SkillType__init_($rt_s(560), 558);
    cprnm_SkillType_NUMBER_559 = cprnm_SkillType__init_($rt_s(561), 559);
    cprnm_SkillType_DIGGER_MOLE_0 = cprnm_SkillType__init_($rt_s(562), 560);
    cprnm_SkillType_DIGGER_MOLE_1 = cprnm_SkillType__init_($rt_s(563), 561);
    cprnm_SkillType_DIGGER_MOLE_2 = cprnm_SkillType__init_($rt_s(564), 562);
    cprnm_SkillType_DIGGER_MOLE_3 = cprnm_SkillType__init_($rt_s(565), 563);
    cprnm_SkillType_DIGGER_MOLE_4 = cprnm_SkillType__init_($rt_s(566), 564);
    cprnm_SkillType_NUMBER_565 = cprnm_SkillType__init_($rt_s(567), 565);
    cprnm_SkillType_SADISTIC_DANCER_0 = cprnm_SkillType__init_($rt_s(568), 566);
    cprnm_SkillType_SADISTIC_DANCER_1 = cprnm_SkillType__init_($rt_s(569), 567);
    cprnm_SkillType_SADISTIC_DANCER_2 = cprnm_SkillType__init_($rt_s(570), 568);
    cprnm_SkillType_SADISTIC_DANCER_3 = cprnm_SkillType__init_($rt_s(571), 569);
    cprnm_SkillType_SADISTIC_DANCER_4 = cprnm_SkillType__init_($rt_s(572), 570);
    cprnm_SkillType_NUMBER_571 = cprnm_SkillType__init_($rt_s(573), 571);
    cprnm_SkillType_NPC_ANUBIS_DRAGON_0 = cprnm_SkillType__init_($rt_s(574), 572);
    cprnm_SkillType_NPC_ANUBIS_DRAGON_1 = cprnm_SkillType__init_($rt_s(575), 573);
    cprnm_SkillType_NPC_ANUBIS_DRAGON_2 = cprnm_SkillType__init_($rt_s(576), 574);
    cprnm_SkillType_RAGING_REVENANT_5 = cprnm_SkillType__init_($rt_s(577), 575);
    cprnm_SkillType_NPC_KING_IMP_0 = cprnm_SkillType__init_($rt_s(578), 576);
    cprnm_SkillType_NPC_KING_IMP_1 = cprnm_SkillType__init_($rt_s(579), 577);
    cprnm_SkillType_WHITE_TIGRESS_0 = cprnm_SkillType__init_($rt_s(580), 578);
    cprnm_SkillType_WHITE_TIGRESS_1 = cprnm_SkillType__init_($rt_s(581), 579);
    cprnm_SkillType_WHITE_TIGRESS_2 = cprnm_SkillType__init_($rt_s(582), 580);
    cprnm_SkillType_WHITE_TIGRESS_3 = cprnm_SkillType__init_($rt_s(583), 581);
    cprnm_SkillType_WHITE_TIGRESS_4 = cprnm_SkillType__init_($rt_s(584), 582);
    cprnm_SkillType_NUMBER_583 = cprnm_SkillType__init_($rt_s(585), 583);
    cprnm_SkillType_SNAPPER_BONE_0 = cprnm_SkillType__init_($rt_s(586), 584);
    cprnm_SkillType_SNAPPER_BONE_1 = cprnm_SkillType__init_($rt_s(587), 585);
    cprnm_SkillType_SNAPPER_BONE_2 = cprnm_SkillType__init_($rt_s(588), 586);
    cprnm_SkillType_SNAPPER_BONE_3 = cprnm_SkillType__init_($rt_s(589), 587);
    cprnm_SkillType_SNAPPER_BONE_4 = cprnm_SkillType__init_($rt_s(590), 588);
    cprnm_SkillType_NUMBER_589 = cprnm_SkillType__init_($rt_s(591), 589);
    cprnm_SkillType_NUMBER_590 = cprnm_SkillType__init_($rt_s(592), 590);
    cprnm_SkillType_NUMBER_591 = cprnm_SkillType__init_($rt_s(593), 591);
    cprnm_SkillType_NUMBER_592 = cprnm_SkillType__init_($rt_s(594), 592);
    cprnm_SkillType_NUMBER_593 = cprnm_SkillType__init_($rt_s(595), 593);
    cprnm_SkillType_NUMBER_594 = cprnm_SkillType__init_($rt_s(596), 594);
    cprnm_SkillType_NUMBER_595 = cprnm_SkillType__init_($rt_s(597), 595);
    cprnm_SkillType_NUMBER_596 = cprnm_SkillType__init_($rt_s(598), 596);
    cprnm_SkillType_NUMBER_597 = cprnm_SkillType__init_($rt_s(599), 597);
    cprnm_SkillType_NUMBER_598 = cprnm_SkillType__init_($rt_s(600), 598);
    cprnm_SkillType_MEDUSA_6 = cprnm_SkillType__init_($rt_s(601), 599);
    cprnm_SkillType_GENIE_6 = cprnm_SkillType__init_($rt_s(602), 600);
    cprnm_SkillType_DRAGON_LADY_6 = cprnm_SkillType__init_($rt_s(603), 601);
    cprnm_SkillType_SATYR_6 = cprnm_SkillType__init_($rt_s(604), 602);
    cprnm_SkillType_CENTAUR_OF_ATTENTION_6 = cprnm_SkillType__init_($rt_s(605), 603);
    cprnm_SkillType_VERMILION_PRIESTESS_0 = cprnm_SkillType__init_($rt_s(606), 604);
    cprnm_SkillType_VERMILION_PRIESTESS_1 = cprnm_SkillType__init_($rt_s(607), 605);
    cprnm_SkillType_VERMILION_PRIESTESS_2 = cprnm_SkillType__init_($rt_s(608), 606);
    cprnm_SkillType_VERMILION_PRIESTESS_3 = cprnm_SkillType__init_($rt_s(609), 607);
    cprnm_SkillType_VERMILION_PRIESTESS_4 = cprnm_SkillType__init_($rt_s(610), 608);
    cprnm_SkillType_NUMBER_609 = cprnm_SkillType__init_($rt_s(611), 609);
    cprnm_SkillType_NPC_ABYSS_DRAGON_0 = cprnm_SkillType__init_($rt_s(612), 610);
    cprnm_SkillType_NPC_ABYSS_DRAGON_1 = cprnm_SkillType__init_($rt_s(613), 611);
    cprnm_SkillType_NPC_ABYSS_DRAGON_2 = cprnm_SkillType__init_($rt_s(614), 612);
    cprnm_SkillType_ANGELIC_HERALD_5 = cprnm_SkillType__init_($rt_s(615), 613);
    cprnm_SkillType_BOSS_BATTLE_FIELD_BUFF = cprnm_SkillType__init_($rt_s(616), 614);
    cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_0 = cprnm_SkillType__init_($rt_s(617), 615);
    cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_1 = cprnm_SkillType__init_($rt_s(618), 616);
    cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_2 = cprnm_SkillType__init_($rt_s(619), 617);
    cprnm_SkillType_PCH_ANUBIS_DRAGON_0 = cprnm_SkillType__init_($rt_s(620), 618);
    cprnm_SkillType_PCH_ANUBIS_DRAGON_1 = cprnm_SkillType__init_($rt_s(621), 619);
    cprnm_SkillType_PCH_ANUBIS_DRAGON_2 = cprnm_SkillType__init_($rt_s(622), 620);
    cprnm_SkillType_PCH_ANUBIS_DRAGON_3 = cprnm_SkillType__init_($rt_s(623), 621);
    cprnm_SkillType_PCH_ANUBIS_DRAGON_4 = cprnm_SkillType__init_($rt_s(624), 622);
    cprnm_SkillType_NUMBER_623 = cprnm_SkillType__init_($rt_s(625), 623);
    cprnm_SkillType_ABYSS_DRAGON_0 = cprnm_SkillType__init_($rt_s(626), 624);
    cprnm_SkillType_ABYSS_DRAGON_1 = cprnm_SkillType__init_($rt_s(627), 625);
    cprnm_SkillType_ABYSS_DRAGON_2 = cprnm_SkillType__init_($rt_s(628), 626);
    cprnm_SkillType_ABYSS_DRAGON_3 = cprnm_SkillType__init_($rt_s(629), 627);
    cprnm_SkillType_ABYSS_DRAGON_4 = cprnm_SkillType__init_($rt_s(630), 628);
    cprnm_SkillType_NUMBER_629 = cprnm_SkillType__init_($rt_s(631), 629);
    cprnm_SkillType_UMLAUT_THE_FIRST_0 = cprnm_SkillType__init_($rt_s(632), 630);
    cprnm_SkillType_UMLAUT_THE_FIRST_1 = cprnm_SkillType__init_($rt_s(633), 631);
    cprnm_SkillType_UMLAUT_THE_FIRST_2 = cprnm_SkillType__init_($rt_s(634), 632);
    cprnm_SkillType_UMLAUT_THE_FIRST_3 = cprnm_SkillType__init_($rt_s(635), 633);
    cprnm_SkillType_UMLAUT_THE_FIRST_4 = cprnm_SkillType__init_($rt_s(636), 634);
    cprnm_SkillType_NUMBER_635 = cprnm_SkillType__init_($rt_s(637), 635);
    cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_0 = cprnm_SkillType__init_($rt_s(638), 636);
    cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_1 = cprnm_SkillType__init_($rt_s(639), 637);
    cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_2 = cprnm_SkillType__init_($rt_s(640), 638);
    cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_0 = cprnm_SkillType__init_($rt_s(641), 639);
    cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_1 = cprnm_SkillType__init_($rt_s(642), 640);
    cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_2 = cprnm_SkillType__init_($rt_s(643), 641);
    cprnm_SkillType_BROZERKER_6 = cprnm_SkillType__init_($rt_s(644), 642);
    cprnm_SkillType_COSMIC_ELF_6 = cprnm_SkillType__init_($rt_s(645), 643);
    cprnm_SkillType_ORC_MONK_6 = cprnm_SkillType__init_($rt_s(646), 644);
    cprnm_SkillType_ROLLER_WARRIOR_6 = cprnm_SkillType__init_($rt_s(647), 645);
    cprnm_SkillType_SHADOW_ASSASSIN_6 = cprnm_SkillType__init_($rt_s(648), 646);
    cprnm_SkillType_WEREDRAGON_5 = cprnm_SkillType__init_($rt_s(649), 647);
    cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_0 = cprnm_SkillType__init_($rt_s(650), 648);
    cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_1 = cprnm_SkillType__init_($rt_s(651), 649);
    cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_2 = cprnm_SkillType__init_($rt_s(652), 650);
    cprnm_SkillType_VULTURE_DRAGON_5 = cprnm_SkillType__init_($rt_s(653), 651);
    cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_0 = cprnm_SkillType__init_($rt_s(654), 652);
    cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_1 = cprnm_SkillType__init_($rt_s(655), 653);
    cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_2 = cprnm_SkillType__init_($rt_s(656), 654);
    cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_3 = cprnm_SkillType__init_($rt_s(657), 655);
    cprnm_SkillType_NINJA_DWARF_6 = cprnm_SkillType__init_($rt_s(658), 656);
    cprnm_SkillType_UNSTABLE_UNDERSTUDY_6 = cprnm_SkillType__init_($rt_s(659), 657);
    cprnm_SkillType_DEEP_DRAGON_6 = cprnm_SkillType__init_($rt_s(660), 658);
    cprnm_SkillType_SNAP_DRAGON_6 = cprnm_SkillType__init_($rt_s(661), 659);
    cprnm_SkillType_DEMON_TOTEM_6 = cprnm_SkillType__init_($rt_s(662), 660);
    cprnm_SkillType_NPC_SINISTER_ASSAILANT_0 = cprnm_SkillType__init_($rt_s(663), 661);
    cprnm_SkillType_NPC_SINISTER_ASSAILANT_1 = cprnm_SkillType__init_($rt_s(664), 662);
    cprnm_SkillType_NPC_RED_TIGER_0 = cprnm_SkillType__init_($rt_s(665), 663);
    cprnm_SkillType_NPC_RED_TIGER_1 = cprnm_SkillType__init_($rt_s(666), 664);
    cprnm_SkillType_DARK_HERO_0 = cprnm_SkillType__init_($rt_s(667), 665);
    cprnm_SkillType_DARK_HERO_1 = cprnm_SkillType__init_($rt_s(668), 666);
    cprnm_SkillType_DARK_HERO_2 = cprnm_SkillType__init_($rt_s(669), 667);
    cprnm_SkillType_DARK_HERO_3 = cprnm_SkillType__init_($rt_s(670), 668);
    cprnm_SkillType_DARK_HERO_4 = cprnm_SkillType__init_($rt_s(671), 669);
    cprnm_SkillType_NUMBER_670 = cprnm_SkillType__init_($rt_s(672), 670);
    cprnm_SkillType_CLAW_MAN_0 = cprnm_SkillType__init_($rt_s(673), 671);
    cprnm_SkillType_CLAW_MAN_1 = cprnm_SkillType__init_($rt_s(674), 672);
    cprnm_SkillType_CLAW_MAN_2 = cprnm_SkillType__init_($rt_s(675), 673);
    cprnm_SkillType_CLAW_MAN_3 = cprnm_SkillType__init_($rt_s(676), 674);
    cprnm_SkillType_CLAW_MAN_4 = cprnm_SkillType__init_($rt_s(677), 675);
    var$1 = $rt_createArray(cprnm_SkillType, 676);
    var$2 = var$1.data;
    var$2[0] = cprnm_SkillType_DEFAULT;
    var$2[1] = cprnm_SkillType_ELECTROYETI_0;
    var$2[2] = cprnm_SkillType_ELECTROYETI_1;
    var$2[3] = cprnm_SkillType_ELECTROYETI_2;
    var$2[4] = cprnm_SkillType_ELECTROYETI_3;
    var$2[5] = cprnm_SkillType_ELECTROYETI_4;
    var$2[6] = cprnm_SkillType_MEDUSA_0;
    var$2[7] = cprnm_SkillType_MEDUSA_1;
    var$2[8] = cprnm_SkillType_MEDUSA_2;
    var$2[9] = cprnm_SkillType_MEDUSA_3;
    var$2[10] = cprnm_SkillType_MEDUSA_4;
    var$2[11] = cprnm_SkillType_FAITH_HEALER_0;
    var$2[12] = cprnm_SkillType_FAITH_HEALER_1;
    var$2[13] = cprnm_SkillType_FAITH_HEALER_2;
    var$2[14] = cprnm_SkillType_FAITH_HEALER_3;
    var$2[15] = cprnm_SkillType_FAITH_HEALER_4;
    var$2[16] = cprnm_SkillType_DARK_DRACUL_0;
    var$2[17] = cprnm_SkillType_DARK_DRACUL_1;
    var$2[18] = cprnm_SkillType_DARK_DRACUL_2;
    var$2[19] = cprnm_SkillType_DARK_DRACUL_3;
    var$2[20] = cprnm_SkillType_DARK_DRACUL_4;
    var$2[21] = cprnm_SkillType_COSMIC_ELF_0;
    var$2[22] = cprnm_SkillType_COSMIC_ELF_1;
    var$2[23] = cprnm_SkillType_COSMIC_ELF_2;
    var$2[24] = cprnm_SkillType_COSMIC_ELF_3;
    var$2[25] = cprnm_SkillType_COSMIC_ELF_4;
    var$2[26] = cprnm_SkillType_ROLLER_WARRIOR_0;
    var$2[27] = cprnm_SkillType_ROLLER_WARRIOR_1;
    var$2[28] = cprnm_SkillType_ROLLER_WARRIOR_2;
    var$2[29] = cprnm_SkillType_ROLLER_WARRIOR_3;
    var$2[30] = cprnm_SkillType_ROLLER_WARRIOR_4;
    var$2[31] = cprnm_SkillType_DRAGON_LADY_0;
    var$2[32] = cprnm_SkillType_DRAGON_LADY_1;
    var$2[33] = cprnm_SkillType_DRAGON_LADY_2;
    var$2[34] = cprnm_SkillType_DRAGON_LADY_3;
    var$2[35] = cprnm_SkillType_DRAGON_LADY_4;
    var$2[36] = cprnm_SkillType_CENTAUR_OF_ATTENTION_0;
    var$2[37] = cprnm_SkillType_CENTAUR_OF_ATTENTION_1;
    var$2[38] = cprnm_SkillType_CENTAUR_OF_ATTENTION_2;
    var$2[39] = cprnm_SkillType_CENTAUR_OF_ATTENTION_3;
    var$2[40] = cprnm_SkillType_CENTAUR_OF_ATTENTION_4;
    var$2[41] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_0;
    var$2[42] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_1;
    var$2[43] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_2;
    var$2[44] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_3;
    var$2[45] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_4;
    var$2[46] = cprnm_SkillType_MOON_DRAKE_0;
    var$2[47] = cprnm_SkillType_MOON_DRAKE_1;
    var$2[48] = cprnm_SkillType_MOON_DRAKE_2;
    var$2[49] = cprnm_SkillType_MOON_DRAKE_3;
    var$2[50] = cprnm_SkillType_MOON_DRAKE_4;
    var$2[51] = cprnm_SkillType_NPC_GOBLIN_0;
    var$2[52] = cprnm_SkillType_NPC_WILDLING_ARCHER_0;
    var$2[53] = cprnm_SkillType_NPC_CRYSTAL_GOLEM_0;
    var$2[54] = cprnm_SkillType_NPC_ICE_GOLEM_0;
    var$2[55] = cprnm_SkillType_NPC_FIRE_IMP_0;
    var$2[56] = cprnm_SkillType_NPC_FIRE_IMP_1;
    var$2[57] = cprnm_SkillType_NPC_STONE_IMP_0;
    var$2[58] = cprnm_SkillType_NPC_STONE_IMP_1;
    var$2[59] = cprnm_SkillType_NPC_MYSTIC_WILDLING_0;
    var$2[60] = cprnm_SkillType_NPC_WILDLING_SNIPER_0;
    var$2[61] = cprnm_SkillType_POLEMASTER_0;
    var$2[62] = cprnm_SkillType_POLEMASTER_1;
    var$2[63] = cprnm_SkillType_POLEMASTER_2;
    var$2[64] = cprnm_SkillType_POLEMASTER_3;
    var$2[65] = cprnm_SkillType_POLEMASTER_4;
    var$2[66] = cprnm_SkillType_CATAPULT_KNIGHT_0;
    var$2[67] = cprnm_SkillType_CATAPULT_KNIGHT_1;
    var$2[68] = cprnm_SkillType_CATAPULT_KNIGHT_2;
    var$2[69] = cprnm_SkillType_CATAPULT_KNIGHT_3;
    var$2[70] = cprnm_SkillType_CATAPULT_KNIGHT_4;
    var$2[71] = cprnm_SkillType_BARDBARIAN_0;
    var$2[72] = cprnm_SkillType_BARDBARIAN_1;
    var$2[73] = cprnm_SkillType_BARDBARIAN_2;
    var$2[74] = cprnm_SkillType_BARDBARIAN_3;
    var$2[75] = cprnm_SkillType_BARDBARIAN_4;
    var$2[76] = cprnm_SkillType_SHADOW_ASSASSIN_0;
    var$2[77] = cprnm_SkillType_SHADOW_ASSASSIN_1;
    var$2[78] = cprnm_SkillType_SHADOW_ASSASSIN_2;
    var$2[79] = cprnm_SkillType_SHADOW_ASSASSIN_3;
    var$2[80] = cprnm_SkillType_SHADOW_ASSASSIN_4;
    var$2[81] = cprnm_SkillType_DUST_DEVIL_0;
    var$2[82] = cprnm_SkillType_DUST_DEVIL_1;
    var$2[83] = cprnm_SkillType_DUST_DEVIL_2;
    var$2[84] = cprnm_SkillType_DUST_DEVIL_3;
    var$2[85] = cprnm_SkillType_DUST_DEVIL_4;
    var$2[86] = cprnm_SkillType_SNAP_DRAGON_0;
    var$2[87] = cprnm_SkillType_SNAP_DRAGON_1;
    var$2[88] = cprnm_SkillType_SNAP_DRAGON_2;
    var$2[89] = cprnm_SkillType_SNAP_DRAGON_3;
    var$2[90] = cprnm_SkillType_SNAP_DRAGON_4;
    var$2[91] = cprnm_SkillType_HYDRA_0;
    var$2[92] = cprnm_SkillType_HYDRA_1;
    var$2[93] = cprnm_SkillType_HYDRA_2;
    var$2[94] = cprnm_SkillType_HYDRA_3;
    var$2[95] = cprnm_SkillType_HYDRA_4;
    var$2[96] = cprnm_SkillType_SAVAGE_CUTIE_0;
    var$2[97] = cprnm_SkillType_SAVAGE_CUTIE_1;
    var$2[98] = cprnm_SkillType_SAVAGE_CUTIE_2;
    var$2[99] = cprnm_SkillType_SAVAGE_CUTIE_3;
    var$2[100] = cprnm_SkillType_SAVAGE_CUTIE_4;
    var$2[101] = cprnm_SkillType_ZOMBIE_SQUIRE_0;
    var$2[102] = cprnm_SkillType_ZOMBIE_SQUIRE_1;
    var$2[103] = cprnm_SkillType_ZOMBIE_SQUIRE_2;
    var$2[104] = cprnm_SkillType_ZOMBIE_SQUIRE_3;
    var$2[105] = cprnm_SkillType_ZOMBIE_SQUIRE_4;
    var$2[106] = cprnm_SkillType_MAGIC_DRAGON_0;
    var$2[107] = cprnm_SkillType_MAGIC_DRAGON_1;
    var$2[108] = cprnm_SkillType_MAGIC_DRAGON_2;
    var$2[109] = cprnm_SkillType_MAGIC_DRAGON_3;
    var$2[110] = cprnm_SkillType_MAGIC_DRAGON_4;
    var$2[111] = cprnm_SkillType_AQUATIC_MAN_0;
    var$2[112] = cprnm_SkillType_AQUATIC_MAN_1;
    var$2[113] = cprnm_SkillType_AQUATIC_MAN_2;
    var$2[114] = cprnm_SkillType_AQUATIC_MAN_3;
    var$2[115] = cprnm_SkillType_AQUATIC_MAN_4;
    var$2[116] = cprnm_SkillType_CRIMSON_WITCH_0;
    var$2[117] = cprnm_SkillType_CRIMSON_WITCH_1;
    var$2[118] = cprnm_SkillType_CRIMSON_WITCH_2;
    var$2[119] = cprnm_SkillType_CRIMSON_WITCH_3;
    var$2[120] = cprnm_SkillType_CRIMSON_WITCH_4;
    var$2[121] = cprnm_SkillType_NINJA_DWARF_0;
    var$2[122] = cprnm_SkillType_NINJA_DWARF_1;
    var$2[123] = cprnm_SkillType_NINJA_DWARF_2;
    var$2[124] = cprnm_SkillType_NINJA_DWARF_3;
    var$2[125] = cprnm_SkillType_NINJA_DWARF_4;
    var$2[126] = cprnm_SkillType_BROZERKER_0;
    var$2[127] = cprnm_SkillType_BROZERKER_1;
    var$2[128] = cprnm_SkillType_BROZERKER_2;
    var$2[129] = cprnm_SkillType_BROZERKER_3;
    var$2[130] = cprnm_SkillType_BROZERKER_4;
    var$2[131] = cprnm_SkillType_GROOVY_DRUID_0;
    var$2[132] = cprnm_SkillType_GROOVY_DRUID_1;
    var$2[133] = cprnm_SkillType_GROOVY_DRUID_2;
    var$2[134] = cprnm_SkillType_GROOVY_DRUID_3;
    var$2[135] = cprnm_SkillType_GROOVY_DRUID_4;
    var$2[136] = cprnm_SkillType_BONE_DRAGON_0;
    var$2[137] = cprnm_SkillType_BONE_DRAGON_1;
    var$2[138] = cprnm_SkillType_BONE_DRAGON_2;
    var$2[139] = cprnm_SkillType_BONE_DRAGON_3;
    var$2[140] = cprnm_SkillType_BONE_DRAGON_4;
    var$2[141] = cprnm_SkillType_NPC_HEALER_SPRITE_0;
    var$2[142] = cprnm_SkillType_NPC_BUFF_SPRITE_0;
    var$2[143] = cprnm_SkillType_NPC_TROLL_BLOB_0;
    var$2[144] = cprnm_SkillType_NPC_INFERNO_SPIDER_0;
    var$2[145] = cprnm_SkillType_NPC_SCARECROW_0;
    var$2[146] = cprnm_SkillType_NPC_POTTED_PLANT_0;
    var$2[147] = cprnm_SkillType_NPC_POTTED_PLANT_1;
    var$2[148] = cprnm_SkillType_SPIKEY_DRAGON_0;
    var$2[149] = cprnm_SkillType_SPIKEY_DRAGON_1;
    var$2[150] = cprnm_SkillType_SPIKEY_DRAGON_2;
    var$2[151] = cprnm_SkillType_SPIKEY_DRAGON_3;
    var$2[152] = cprnm_SkillType_SPIKEY_DRAGON_4;
    var$2[153] = cprnm_SkillType_FROST_GIANT_0;
    var$2[154] = cprnm_SkillType_FROST_GIANT_1;
    var$2[155] = cprnm_SkillType_FROST_GIANT_2;
    var$2[156] = cprnm_SkillType_FROST_GIANT_3;
    var$2[157] = cprnm_SkillType_FROST_GIANT_4;
    var$2[158] = cprnm_SkillType_MINOTAUR_0;
    var$2[159] = cprnm_SkillType_MINOTAUR_1;
    var$2[160] = cprnm_SkillType_MINOTAUR_2;
    var$2[161] = cprnm_SkillType_MINOTAUR_3;
    var$2[162] = cprnm_SkillType_MINOTAUR_4;
    var$2[163] = cprnm_SkillType_DARK_HORSE_0;
    var$2[164] = cprnm_SkillType_DARK_HORSE_1;
    var$2[165] = cprnm_SkillType_DARK_HORSE_2;
    var$2[166] = cprnm_SkillType_DARK_HORSE_3;
    var$2[167] = cprnm_SkillType_DARK_HORSE_4;
    var$2[168] = cprnm_SkillType_DRUIDINATRIX_0;
    var$2[169] = cprnm_SkillType_DRUIDINATRIX_1;
    var$2[170] = cprnm_SkillType_DRUIDINATRIX_2;
    var$2[171] = cprnm_SkillType_DRUIDINATRIX_3;
    var$2[172] = cprnm_SkillType_DRUIDINATRIX_4;
    var$2[173] = cprnm_SkillType_NPC_KAMIKAZE_GNOME_0;
    var$2[174] = cprnm_SkillType_NPC_MR_SMASHY_0;
    var$2[175] = cprnm_SkillType_BARDBARIAN_TITAN;
    var$2[176] = cprnm_SkillType_BROZERKER_TITAN;
    var$2[177] = cprnm_SkillType_CENTAUR_OF_ATTENTION_TITAN;
    var$2[178] = cprnm_SkillType_SNAP_DRAGON_TITAN;
    var$2[179] = cprnm_SkillType_FAITH_HEALER_TITAN;
    var$2[180] = cprnm_SkillType_MEDUSA_TITAN;
    var$2[181] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_TITAN;
    var$2[182] = cprnm_SkillType_BONE_DRAGON_TITAN;
    var$2[183] = cprnm_SkillType_DRAGON_LADY_TITAN;
    var$2[184] = cprnm_SkillType_AQUATIC_MAN_TITAN;
    var$2[185] = cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_0;
    var$2[186] = cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_0;
    var$2[187] = cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_1;
    var$2[188] = cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_1;
    var$2[189] = cprnm_SkillType_NPC_EVIL_WIZARD_SUMMON_2;
    var$2[190] = cprnm_SkillType_NPC_EVIL_WIZARD_BOMB_2;
    var$2[191] = cprnm_SkillType_NPC_EVIL_WIZARD_UNTARGETABLE;
    var$2[192] = cprnm_SkillType_ORC_MONK_0;
    var$2[193] = cprnm_SkillType_ORC_MONK_1;
    var$2[194] = cprnm_SkillType_ORC_MONK_2;
    var$2[195] = cprnm_SkillType_ORC_MONK_3;
    var$2[196] = cprnm_SkillType_ORC_MONK_4;
    var$2[197] = cprnm_SkillType_DWARVEN_ARCHER_0;
    var$2[198] = cprnm_SkillType_DWARVEN_ARCHER_1;
    var$2[199] = cprnm_SkillType_DWARVEN_ARCHER_2;
    var$2[200] = cprnm_SkillType_DWARVEN_ARCHER_3;
    var$2[201] = cprnm_SkillType_DWARVEN_ARCHER_4;
    var$2[202] = cprnm_SkillType_RABID_DRAGON_0;
    var$2[203] = cprnm_SkillType_RABID_DRAGON_1;
    var$2[204] = cprnm_SkillType_RABID_DRAGON_2;
    var$2[205] = cprnm_SkillType_RABID_DRAGON_3;
    var$2[206] = cprnm_SkillType_RABID_DRAGON_4;
    var$2[207] = cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_0;
    var$2[208] = cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_0;
    var$2[209] = cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_0;
    var$2[210] = cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_1;
    var$2[211] = cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_1;
    var$2[212] = cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_1;
    var$2[213] = cprnm_SkillType_NPC_GOLD_COLOSSUS_MELEE_2;
    var$2[214] = cprnm_SkillType_NPC_GOLD_COLOSSUS_SPEW_GOLD_2;
    var$2[215] = cprnm_SkillType_NPC_GOLD_COLOSSUS_JUMP_2;
    var$2[216] = cprnm_SkillType_NPC_GOLD_COLOSSUS_EAT_GOLD_2;
    var$2[217] = cprnm_SkillType_NPC_GOLD_COLOSSUS_WIND;
    var$2[218] = cprnm_SkillType_NPC_GOLD_COLOSSUS_SPIKES;
    var$2[219] = cprnm_SkillType_NPC_CAULDRON_MONSTER_0;
    var$2[220] = cprnm_SkillType_NPC_SQUID_0;
    var$2[221] = cprnm_SkillType_NPC_GIANT_PLANT_BITE;
    var$2[222] = cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_0;
    var$2[223] = cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_1;
    var$2[224] = cprnm_SkillType_NPC_GIANT_PLANT_SPEW_POISON_2;
    var$2[225] = cprnm_SkillType_NPC_GIANT_PLANT_HOP_FORWARD;
    var$2[226] = cprnm_SkillType_NPC_GIANT_PLANT_SPAWNER;
    var$2[227] = cprnm_SkillType_NPC_GIANT_PLANT_ROOT_0;
    var$2[228] = cprnm_SkillType_BOSS_CANT_BE_DISABLED;
    var$2[229] = cprnm_SkillType_SKELETON_KING_0;
    var$2[230] = cprnm_SkillType_SKELETON_KING_1;
    var$2[231] = cprnm_SkillType_SKELETON_KING_2;
    var$2[232] = cprnm_SkillType_SKELETON_KING_3;
    var$2[233] = cprnm_SkillType_SKELETON_KING_4;
    var$2[234] = cprnm_SkillType_SATYR_0;
    var$2[235] = cprnm_SkillType_SATYR_1;
    var$2[236] = cprnm_SkillType_SATYR_2;
    var$2[237] = cprnm_SkillType_SATYR_3;
    var$2[238] = cprnm_SkillType_SATYR_4;
    var$2[239] = cprnm_SkillType_STORM_DRAGON_0;
    var$2[240] = cprnm_SkillType_STORM_DRAGON_1;
    var$2[241] = cprnm_SkillType_STORM_DRAGON_2;
    var$2[242] = cprnm_SkillType_STORM_DRAGON_3;
    var$2[243] = cprnm_SkillType_STORM_DRAGON_4;
    var$2[244] = cprnm_SkillType_NPC_SKELETON_DEER_0;
    var$2[245] = cprnm_SkillType_NPC_SKELETON_DEER_1;
    var$2[246] = cprnm_SkillType_NPC_SKELETON_DEER_2;
    var$2[247] = cprnm_SkillType_NPC_MUSHROOM_0;
    var$2[248] = cprnm_SkillType_BROZERKER_5;
    var$2[249] = cprnm_SkillType_MEDUSA_5;
    var$2[250] = cprnm_SkillType_DUST_DEVIL_5;
    var$2[251] = cprnm_SkillType_FAITH_HEALER_5;
    var$2[252] = cprnm_SkillType_POLEMASTER_5;
    var$2[253] = cprnm_SkillType_DARK_DRACUL_5;
    var$2[254] = cprnm_SkillType_CATAPULT_KNIGHT_5;
    var$2[255] = cprnm_SkillType_NINJA_DWARF_5;
    var$2[256] = cprnm_SkillType_SNAP_DRAGON_5;
    var$2[257] = cprnm_SkillType_UNICORGI_0;
    var$2[258] = cprnm_SkillType_UNICORGI_1;
    var$2[259] = cprnm_SkillType_UNICORGI_2;
    var$2[260] = cprnm_SkillType_UNICORGI_3;
    var$2[261] = cprnm_SkillType_UNICORGI_4;
    var$2[262] = cprnm_SkillType_SNIPER_WOLF_0;
    var$2[263] = cprnm_SkillType_SNIPER_WOLF_1;
    var$2[264] = cprnm_SkillType_SNIPER_WOLF_2;
    var$2[265] = cprnm_SkillType_SNIPER_WOLF_3;
    var$2[266] = cprnm_SkillType_SNIPER_WOLF_4;
    var$2[267] = cprnm_SkillType_GENIE_0;
    var$2[268] = cprnm_SkillType_GENIE_1;
    var$2[269] = cprnm_SkillType_GENIE_2;
    var$2[270] = cprnm_SkillType_GENIE_3;
    var$2[271] = cprnm_SkillType_GENIE_4;
    var$2[272] = cprnm_SkillType_NPC_HEAD_CRAB_0;
    var$2[273] = cprnm_SkillType_NPC_CLOUD_MONSTER_0;
    var$2[274] = cprnm_SkillType_NPC_CLOUD_MONSTER_1;
    var$2[275] = cprnm_SkillType_ZOMBIE_SQUIRE_5;
    var$2[276] = cprnm_SkillType_MAGIC_DRAGON_5;
    var$2[277] = cprnm_SkillType_GROOVY_DRUID_5;
    var$2[278] = cprnm_SkillType_CENTAUR_OF_ATTENTION_5;
    var$2[279] = cprnm_SkillType_DRAGON_LADY_5;
    var$2[280] = cprnm_SkillType_SHADOW_ASSASSIN_5;
    var$2[281] = cprnm_SkillType_ELECTROYETI_5;
    var$2[282] = cprnm_SkillType_FROST_GIANT_5;
    var$2[283] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_5;
    var$2[284] = cprnm_SkillType_HYDRA_5;
    var$2[285] = cprnm_SkillType_BARDBARIAN_5;
    var$2[286] = cprnm_SkillType_SAVAGE_CUTIE_5;
    var$2[287] = cprnm_SkillType_ORC_MONK_5;
    var$2[288] = cprnm_SkillType_COSMIC_ELF_5;
    var$2[289] = cprnm_SkillType_AQUATIC_MAN_5;
    var$2[290] = cprnm_SkillType_MOON_DRAKE_5;
    var$2[291] = cprnm_SkillType_ROLLER_WARRIOR_5;
    var$2[292] = cprnm_SkillType_DRUIDINATRIX_5;
    var$2[293] = cprnm_SkillType_DRAGZILLA_0;
    var$2[294] = cprnm_SkillType_DRAGZILLA_1;
    var$2[295] = cprnm_SkillType_DRAGZILLA_2;
    var$2[296] = cprnm_SkillType_DRAGZILLA_3;
    var$2[297] = cprnm_SkillType_DRAGZILLA_4;
    var$2[298] = cprnm_SkillType_PIRATE_0;
    var$2[299] = cprnm_SkillType_PIRATE_1;
    var$2[300] = cprnm_SkillType_PIRATE_2;
    var$2[301] = cprnm_SkillType_PIRATE_3;
    var$2[302] = cprnm_SkillType_PIRATE_4;
    var$2[303] = cprnm_SkillType_CYCLOPS_WIZARD_0;
    var$2[304] = cprnm_SkillType_CYCLOPS_WIZARD_1;
    var$2[305] = cprnm_SkillType_CYCLOPS_WIZARD_2;
    var$2[306] = cprnm_SkillType_CYCLOPS_WIZARD_3;
    var$2[307] = cprnm_SkillType_CYCLOPS_WIZARD_4;
    var$2[308] = cprnm_SkillType_DEMON_TOTEM_0;
    var$2[309] = cprnm_SkillType_DEMON_TOTEM_1;
    var$2[310] = cprnm_SkillType_DEMON_TOTEM_2;
    var$2[311] = cprnm_SkillType_DEMON_TOTEM_3;
    var$2[312] = cprnm_SkillType_DEMON_TOTEM_4;
    var$2[313] = cprnm_SkillType_NPC_EYEBALL_0;
    var$2[314] = cprnm_SkillType_DEEP_DRAGON_0;
    var$2[315] = cprnm_SkillType_DEEP_DRAGON_1;
    var$2[316] = cprnm_SkillType_DEEP_DRAGON_2;
    var$2[317] = cprnm_SkillType_DEEP_DRAGON_3;
    var$2[318] = cprnm_SkillType_DEEP_DRAGON_4;
    var$2[319] = cprnm_SkillType_DOPPELGANGER_0;
    var$2[320] = cprnm_SkillType_DOPPELGANGER_1;
    var$2[321] = cprnm_SkillType_DOPPELGANGER_2;
    var$2[322] = cprnm_SkillType_DOPPELGANGER_3;
    var$2[323] = cprnm_SkillType_DOPPELGANGER_4;
    var$2[324] = cprnm_SkillType_KRAKEN_KING_0;
    var$2[325] = cprnm_SkillType_KRAKEN_KING_1;
    var$2[326] = cprnm_SkillType_KRAKEN_KING_2;
    var$2[327] = cprnm_SkillType_KRAKEN_KING_3;
    var$2[328] = cprnm_SkillType_KRAKEN_KING_4;
    var$2[329] = cprnm_SkillType_STOWAWAY_0;
    var$2[330] = cprnm_SkillType_STOWAWAY_1;
    var$2[331] = cprnm_SkillType_STOWAWAY_2;
    var$2[332] = cprnm_SkillType_STOWAWAY_3;
    var$2[333] = cprnm_SkillType_STOWAWAY_4;
    var$2[334] = cprnm_SkillType_NPC_SHARK_0;
    var$2[335] = cprnm_SkillType_NPC_SHARK_1;
    var$2[336] = cprnm_SkillType_NPC_SQUIRREL_0;
    var$2[337] = cprnm_SkillType_CURSED_STATUE_0;
    var$2[338] = cprnm_SkillType_CURSED_STATUE_1;
    var$2[339] = cprnm_SkillType_CURSED_STATUE_2;
    var$2[340] = cprnm_SkillType_CURSED_STATUE_3;
    var$2[341] = cprnm_SkillType_CURSED_STATUE_4;
    var$2[342] = cprnm_SkillType_PLANT_SOUL_0;
    var$2[343] = cprnm_SkillType_PLANT_SOUL_1;
    var$2[344] = cprnm_SkillType_PLANT_SOUL_2;
    var$2[345] = cprnm_SkillType_PLANT_SOUL_3;
    var$2[346] = cprnm_SkillType_PLANT_SOUL_4;
    var$2[347] = cprnm_SkillType_SPIDER_QUEEN_0;
    var$2[348] = cprnm_SkillType_SPIDER_QUEEN_1;
    var$2[349] = cprnm_SkillType_SPIDER_QUEEN_2;
    var$2[350] = cprnm_SkillType_SPIDER_QUEEN_3;
    var$2[351] = cprnm_SkillType_SPIDER_QUEEN_4;
    var$2[352] = cprnm_SkillType_VULTURE_DRAGON_0;
    var$2[353] = cprnm_SkillType_VULTURE_DRAGON_1;
    var$2[354] = cprnm_SkillType_VULTURE_DRAGON_2;
    var$2[355] = cprnm_SkillType_VULTURE_DRAGON_3;
    var$2[356] = cprnm_SkillType_VULTURE_DRAGON_4;
    var$2[357] = cprnm_SkillType_NPC_ANT_0;
    var$2[358] = cprnm_SkillType_NPC_ANT_1;
    var$2[359] = cprnm_SkillType_FROST_GIANT_TITAN;
    var$2[360] = cprnm_SkillType_ORC_MONK_TITAN;
    var$2[361] = cprnm_SkillType_RABID_DRAGON_TITAN;
    var$2[362] = cprnm_SkillType_GENIE_TITAN;
    var$2[363] = cprnm_SkillType_SKELETON_KING_TITAN;
    var$2[364] = cprnm_SkillType_SPIKEY_DRAGON_TITAN;
    var$2[365] = cprnm_SkillType_BANSHEE_0;
    var$2[366] = cprnm_SkillType_BANSHEE_1;
    var$2[367] = cprnm_SkillType_BANSHEE_2;
    var$2[368] = cprnm_SkillType_BANSHEE_3;
    var$2[369] = cprnm_SkillType_BANSHEE_4;
    var$2[370] = cprnm_SkillType_RAGING_REVENANT_0;
    var$2[371] = cprnm_SkillType_RAGING_REVENANT_1;
    var$2[372] = cprnm_SkillType_RAGING_REVENANT_2;
    var$2[373] = cprnm_SkillType_RAGING_REVENANT_3;
    var$2[374] = cprnm_SkillType_RAGING_REVENANT_4;
    var$2[375] = cprnm_SkillType_SILENT_SPIRIT_0;
    var$2[376] = cprnm_SkillType_SILENT_SPIRIT_1;
    var$2[377] = cprnm_SkillType_SILENT_SPIRIT_2;
    var$2[378] = cprnm_SkillType_SILENT_SPIRIT_3;
    var$2[379] = cprnm_SkillType_SILENT_SPIRIT_4;
    var$2[380] = cprnm_SkillType_SPECTRAL_DRAGON_0;
    var$2[381] = cprnm_SkillType_SPECTRAL_DRAGON_1;
    var$2[382] = cprnm_SkillType_SPECTRAL_DRAGON_2;
    var$2[383] = cprnm_SkillType_SPECTRAL_DRAGON_3;
    var$2[384] = cprnm_SkillType_SPECTRAL_DRAGON_4;
    var$2[385] = cprnm_SkillType_NPC_LYING_LANTERN_0;
    var$2[386] = cprnm_SkillType_NPC_LYING_LANTERN_1;
    var$2[387] = cprnm_SkillType_NPC_LYING_LANTERN_2;
    var$2[388] = cprnm_SkillType_RABID_DRAGON_5;
    var$2[389] = cprnm_SkillType_BONE_DRAGON_5;
    var$2[390] = cprnm_SkillType_SNIPER_WOLF_5;
    var$2[391] = cprnm_SkillType_WEREDRAGON_0;
    var$2[392] = cprnm_SkillType_WEREDRAGON_1;
    var$2[393] = cprnm_SkillType_WEREDRAGON_2;
    var$2[394] = cprnm_SkillType_WEREDRAGON_3;
    var$2[395] = cprnm_SkillType_WEREDRAGON_4;
    var$2[396] = cprnm_SkillType_WEE_WITCH_0;
    var$2[397] = cprnm_SkillType_WEE_WITCH_1;
    var$2[398] = cprnm_SkillType_WEE_WITCH_2;
    var$2[399] = cprnm_SkillType_WEE_WITCH_3;
    var$2[400] = cprnm_SkillType_WEE_WITCH_4;
    var$2[401] = cprnm_SkillType_DUNGEON_MAN_0;
    var$2[402] = cprnm_SkillType_DUNGEON_MAN_1;
    var$2[403] = cprnm_SkillType_DUNGEON_MAN_2;
    var$2[404] = cprnm_SkillType_DUNGEON_MAN_3;
    var$2[405] = cprnm_SkillType_DUNGEON_MAN_4;
    var$2[406] = cprnm_SkillType_NPC_PLAGUE_SKULKER_0;
    var$2[407] = cprnm_SkillType_NPC_PLAGUE_SKULKER_1;
    var$2[408] = cprnm_SkillType_PLAGUE_ENTREPRENEUR_0;
    var$2[409] = cprnm_SkillType_PLAGUE_ENTREPRENEUR_1;
    var$2[410] = cprnm_SkillType_PLAGUE_ENTREPRENEUR_2;
    var$2[411] = cprnm_SkillType_PLAGUE_ENTREPRENEUR_3;
    var$2[412] = cprnm_SkillType_PLAGUE_ENTREPRENEUR_4;
    var$2[413] = cprnm_SkillType_MISTRESS_MANICURE_0;
    var$2[414] = cprnm_SkillType_MISTRESS_MANICURE_1;
    var$2[415] = cprnm_SkillType_MISTRESS_MANICURE_2;
    var$2[416] = cprnm_SkillType_MISTRESS_MANICURE_3;
    var$2[417] = cprnm_SkillType_MISTRESS_MANICURE_4;
    var$2[418] = cprnm_SkillType_VILE_BILE_0;
    var$2[419] = cprnm_SkillType_VILE_BILE_1;
    var$2[420] = cprnm_SkillType_VILE_BILE_2;
    var$2[421] = cprnm_SkillType_VILE_BILE_3;
    var$2[422] = cprnm_SkillType_VILE_BILE_4;
    var$2[423] = cprnm_SkillType_NPC_FLEA_DEMON_0;
    var$2[424] = cprnm_SkillType_UNICORGI_5;
    var$2[425] = cprnm_SkillType_PIRATE_5;
    var$2[426] = cprnm_SkillType_DWARVEN_ARCHER_5;
    var$2[427] = cprnm_SkillType_VOID_WYVERN_0;
    var$2[428] = cprnm_SkillType_VOID_WYVERN_1;
    var$2[429] = cprnm_SkillType_VOID_WYVERN_2;
    var$2[430] = cprnm_SkillType_VOID_WYVERN_3;
    var$2[431] = cprnm_SkillType_VOID_WYVERN_4;
    var$2[432] = cprnm_SkillType_DARK_HORSE_5;
    var$2[433] = cprnm_SkillType_BURNT_ONE_0;
    var$2[434] = cprnm_SkillType_BURNT_ONE_1;
    var$2[435] = cprnm_SkillType_BURNT_ONE_2;
    var$2[436] = cprnm_SkillType_BURNT_ONE_3;
    var$2[437] = cprnm_SkillType_BURNT_ONE_4;
    var$2[438] = cprnm_SkillType_SKELETON_KING_5;
    var$2[439] = cprnm_SkillType_SATYR_5;
    var$2[440] = cprnm_SkillType_DEEP_DRAGON_5;
    var$2[441] = cprnm_SkillType_STORM_DRAGON_5;
    var$2[442] = cprnm_SkillType_NPC_ANGELIC_AVENGER_0;
    var$2[443] = cprnm_SkillType_MINOTAUR_5;
    var$2[444] = cprnm_SkillType_CRIMSON_WITCH_5;
    var$2[445] = cprnm_SkillType_SPIKEY_DRAGON_5;
    var$2[446] = cprnm_SkillType_GENIE_5;
    var$2[447] = cprnm_SkillType_DEMON_TOTEM_5;
    var$2[448] = cprnm_SkillType_TOMB_ANGEL_0;
    var$2[449] = cprnm_SkillType_TOMB_ANGEL_1;
    var$2[450] = cprnm_SkillType_TOMB_ANGEL_2;
    var$2[451] = cprnm_SkillType_TOMB_ANGEL_3;
    var$2[452] = cprnm_SkillType_TOMB_ANGEL_4;
    var$2[453] = cprnm_SkillType_ANGELIC_HERALD_0;
    var$2[454] = cprnm_SkillType_ANGELIC_HERALD_1;
    var$2[455] = cprnm_SkillType_ANGELIC_HERALD_2;
    var$2[456] = cprnm_SkillType_ANGELIC_HERALD_3;
    var$2[457] = cprnm_SkillType_ANGELIC_HERALD_4;
    var$2[458] = cprnm_SkillType_BULWARK_ANGEL_0;
    var$2[459] = cprnm_SkillType_BULWARK_ANGEL_1;
    var$2[460] = cprnm_SkillType_BULWARK_ANGEL_2;
    var$2[461] = cprnm_SkillType_BULWARK_ANGEL_3;
    var$2[462] = cprnm_SkillType_BULWARK_ANGEL_4;
    var$2[463] = cprnm_SkillType_ANGEL_DRAGON_0;
    var$2[464] = cprnm_SkillType_ANGEL_DRAGON_1;
    var$2[465] = cprnm_SkillType_ANGEL_DRAGON_2;
    var$2[466] = cprnm_SkillType_ANGEL_DRAGON_3;
    var$2[467] = cprnm_SkillType_ANGEL_DRAGON_4;
    var$2[468] = cprnm_SkillType_DRAGON_SLAYER_0;
    var$2[469] = cprnm_SkillType_DRAGON_SLAYER_1;
    var$2[470] = cprnm_SkillType_DRAGON_SLAYER_2;
    var$2[471] = cprnm_SkillType_DRAGON_SLAYER_3;
    var$2[472] = cprnm_SkillType_DRAGON_SLAYER_4;
    var$2[473] = cprnm_SkillType_ETERNAL_ENCHANTER_0;
    var$2[474] = cprnm_SkillType_ETERNAL_ENCHANTER_1;
    var$2[475] = cprnm_SkillType_ETERNAL_ENCHANTER_2;
    var$2[476] = cprnm_SkillType_ETERNAL_ENCHANTER_3;
    var$2[477] = cprnm_SkillType_ETERNAL_ENCHANTER_4;
    var$2[478] = cprnm_SkillType_GRAND_HUNTRESS_0;
    var$2[479] = cprnm_SkillType_GRAND_HUNTRESS_1;
    var$2[480] = cprnm_SkillType_GRAND_HUNTRESS_2;
    var$2[481] = cprnm_SkillType_GRAND_HUNTRESS_3;
    var$2[482] = cprnm_SkillType_GRAND_HUNTRESS_4;
    var$2[483] = cprnm_SkillType_TRIPLE_THREAT_0;
    var$2[484] = cprnm_SkillType_TRIPLE_THREAT_1;
    var$2[485] = cprnm_SkillType_TRIPLE_THREAT_2;
    var$2[486] = cprnm_SkillType_TRIPLE_THREAT_3;
    var$2[487] = cprnm_SkillType_TRIPLE_THREAT_4;
    var$2[488] = cprnm_SkillType_LAST_DEFENDER_0;
    var$2[489] = cprnm_SkillType_LAST_DEFENDER_1;
    var$2[490] = cprnm_SkillType_LAST_DEFENDER_2;
    var$2[491] = cprnm_SkillType_LAST_DEFENDER_3;
    var$2[492] = cprnm_SkillType_LAST_DEFENDER_4;
    var$2[493] = cprnm_SkillType_NUMBER_493;
    var$2[494] = cprnm_SkillType_SOJOURNER_SORCERESS_0;
    var$2[495] = cprnm_SkillType_SOJOURNER_SORCERESS_1;
    var$2[496] = cprnm_SkillType_SOJOURNER_SORCERESS_2;
    var$2[497] = cprnm_SkillType_SOJOURNER_SORCERESS_3;
    var$2[498] = cprnm_SkillType_SOJOURNER_SORCERESS_4;
    var$2[499] = cprnm_SkillType_SOJOURNER_SORCERESS_5;
    var$2[500] = cprnm_SkillType_KARAOKE_KING_0;
    var$2[501] = cprnm_SkillType_KARAOKE_KING_1;
    var$2[502] = cprnm_SkillType_KARAOKE_KING_2;
    var$2[503] = cprnm_SkillType_KARAOKE_KING_3;
    var$2[504] = cprnm_SkillType_KARAOKE_KING_4;
    var$2[505] = cprnm_SkillType_NUMBER_505;
    var$2[506] = cprnm_SkillType_SHADOW_OF_SVEN_0;
    var$2[507] = cprnm_SkillType_SHADOW_OF_SVEN_1;
    var$2[508] = cprnm_SkillType_SHADOW_OF_SVEN_2;
    var$2[509] = cprnm_SkillType_SHADOW_OF_SVEN_3;
    var$2[510] = cprnm_SkillType_SHADOW_OF_SVEN_4;
    var$2[511] = cprnm_SkillType_NUMBER_511;
    var$2[512] = cprnm_SkillType_SUN_SEEKER_0;
    var$2[513] = cprnm_SkillType_SUN_SEEKER_1;
    var$2[514] = cprnm_SkillType_SUN_SEEKER_2;
    var$2[515] = cprnm_SkillType_SUN_SEEKER_3;
    var$2[516] = cprnm_SkillType_SUN_SEEKER_4;
    var$2[517] = cprnm_SkillType_NUMBER_517;
    var$2[518] = cprnm_SkillType_STEPLADDER_BROTHERS_0;
    var$2[519] = cprnm_SkillType_STEPLADDER_BROTHERS_1;
    var$2[520] = cprnm_SkillType_STEPLADDER_BROTHERS_2;
    var$2[521] = cprnm_SkillType_STEPLADDER_BROTHERS_3;
    var$2[522] = cprnm_SkillType_STEPLADDER_BROTHERS_4;
    var$2[523] = cprnm_SkillType_NUMBER_523;
    var$2[524] = cprnm_SkillType_FORGOTTEN_DRAGON_0;
    var$2[525] = cprnm_SkillType_FORGOTTEN_DRAGON_1;
    var$2[526] = cprnm_SkillType_FORGOTTEN_DRAGON_2;
    var$2[527] = cprnm_SkillType_FORGOTTEN_DRAGON_3;
    var$2[528] = cprnm_SkillType_FORGOTTEN_DRAGON_4;
    var$2[529] = cprnm_SkillType_NUMBER_529;
    var$2[530] = cprnm_SkillType_NPC_CRYSTAL_LIZARD_0;
    var$2[531] = cprnm_SkillType_NPC_CRYSTAL_LIZARD_1;
    var$2[532] = cprnm_SkillType_ETERNAL_ENCHANTER_5;
    var$2[533] = cprnm_SkillType_BLACK_WING_0;
    var$2[534] = cprnm_SkillType_BLACK_WING_1;
    var$2[535] = cprnm_SkillType_BLACK_WING_2;
    var$2[536] = cprnm_SkillType_BLACK_WING_3;
    var$2[537] = cprnm_SkillType_BLACK_WING_4;
    var$2[538] = cprnm_SkillType_NUMBER_538;
    var$2[539] = cprnm_SkillType_GREED_DRAGON_0;
    var$2[540] = cprnm_SkillType_GREED_DRAGON_1;
    var$2[541] = cprnm_SkillType_GREED_DRAGON_2;
    var$2[542] = cprnm_SkillType_GREED_DRAGON_3;
    var$2[543] = cprnm_SkillType_GREED_DRAGON_4;
    var$2[544] = cprnm_SkillType_NUMBER_544;
    var$2[545] = cprnm_SkillType_UNRIPE_MYTHOLOGY_0;
    var$2[546] = cprnm_SkillType_UNRIPE_MYTHOLOGY_1;
    var$2[547] = cprnm_SkillType_UNRIPE_MYTHOLOGY_2;
    var$2[548] = cprnm_SkillType_UNRIPE_MYTHOLOGY_3;
    var$2[549] = cprnm_SkillType_UNRIPE_MYTHOLOGY_4;
    var$2[550] = cprnm_SkillType_NUMBER_550;
    var$2[551] = cprnm_SkillType_NPC_BREAKER_MKII_0;
    var$2[552] = cprnm_SkillType_NPC_BREAKER_MKII_1;
    var$2[553] = cprnm_SkillType_DRAGZILLA_5;
    var$2[554] = cprnm_SkillType_ANCIENT_DWARF_0;
    var$2[555] = cprnm_SkillType_ANCIENT_DWARF_1;
    var$2[556] = cprnm_SkillType_ANCIENT_DWARF_2;
    var$2[557] = cprnm_SkillType_ANCIENT_DWARF_3;
    var$2[558] = cprnm_SkillType_ANCIENT_DWARF_4;
    var$2[559] = cprnm_SkillType_NUMBER_559;
    var$2[560] = cprnm_SkillType_DIGGER_MOLE_0;
    var$2[561] = cprnm_SkillType_DIGGER_MOLE_1;
    var$2[562] = cprnm_SkillType_DIGGER_MOLE_2;
    var$2[563] = cprnm_SkillType_DIGGER_MOLE_3;
    var$2[564] = cprnm_SkillType_DIGGER_MOLE_4;
    var$2[565] = cprnm_SkillType_NUMBER_565;
    var$2[566] = cprnm_SkillType_SADISTIC_DANCER_0;
    var$2[567] = cprnm_SkillType_SADISTIC_DANCER_1;
    var$2[568] = cprnm_SkillType_SADISTIC_DANCER_2;
    var$2[569] = cprnm_SkillType_SADISTIC_DANCER_3;
    var$2[570] = cprnm_SkillType_SADISTIC_DANCER_4;
    var$2[571] = cprnm_SkillType_NUMBER_571;
    var$2[572] = cprnm_SkillType_NPC_ANUBIS_DRAGON_0;
    var$2[573] = cprnm_SkillType_NPC_ANUBIS_DRAGON_1;
    var$2[574] = cprnm_SkillType_NPC_ANUBIS_DRAGON_2;
    var$2[575] = cprnm_SkillType_RAGING_REVENANT_5;
    var$2[576] = cprnm_SkillType_NPC_KING_IMP_0;
    var$2[577] = cprnm_SkillType_NPC_KING_IMP_1;
    var$2[578] = cprnm_SkillType_WHITE_TIGRESS_0;
    var$2[579] = cprnm_SkillType_WHITE_TIGRESS_1;
    var$2[580] = cprnm_SkillType_WHITE_TIGRESS_2;
    var$2[581] = cprnm_SkillType_WHITE_TIGRESS_3;
    var$2[582] = cprnm_SkillType_WHITE_TIGRESS_4;
    var$2[583] = cprnm_SkillType_NUMBER_583;
    var$2[584] = cprnm_SkillType_SNAPPER_BONE_0;
    var$2[585] = cprnm_SkillType_SNAPPER_BONE_1;
    var$2[586] = cprnm_SkillType_SNAPPER_BONE_2;
    var$2[587] = cprnm_SkillType_SNAPPER_BONE_3;
    var$2[588] = cprnm_SkillType_SNAPPER_BONE_4;
    var$2[589] = cprnm_SkillType_NUMBER_589;
    var$2[590] = cprnm_SkillType_NUMBER_590;
    var$2[591] = cprnm_SkillType_NUMBER_591;
    var$2[592] = cprnm_SkillType_NUMBER_592;
    var$2[593] = cprnm_SkillType_NUMBER_593;
    var$2[594] = cprnm_SkillType_NUMBER_594;
    var$2[595] = cprnm_SkillType_NUMBER_595;
    var$2[596] = cprnm_SkillType_NUMBER_596;
    var$2[597] = cprnm_SkillType_NUMBER_597;
    var$2[598] = cprnm_SkillType_NUMBER_598;
    var$2[599] = cprnm_SkillType_MEDUSA_6;
    var$2[600] = cprnm_SkillType_GENIE_6;
    var$2[601] = cprnm_SkillType_DRAGON_LADY_6;
    var$2[602] = cprnm_SkillType_SATYR_6;
    var$2[603] = cprnm_SkillType_CENTAUR_OF_ATTENTION_6;
    var$2[604] = cprnm_SkillType_VERMILION_PRIESTESS_0;
    var$2[605] = cprnm_SkillType_VERMILION_PRIESTESS_1;
    var$2[606] = cprnm_SkillType_VERMILION_PRIESTESS_2;
    var$2[607] = cprnm_SkillType_VERMILION_PRIESTESS_3;
    var$2[608] = cprnm_SkillType_VERMILION_PRIESTESS_4;
    var$2[609] = cprnm_SkillType_NUMBER_609;
    var$2[610] = cprnm_SkillType_NPC_ABYSS_DRAGON_0;
    var$2[611] = cprnm_SkillType_NPC_ABYSS_DRAGON_1;
    var$2[612] = cprnm_SkillType_NPC_ABYSS_DRAGON_2;
    var$2[613] = cprnm_SkillType_ANGELIC_HERALD_5;
    var$2[614] = cprnm_SkillType_BOSS_BATTLE_FIELD_BUFF;
    var$2[615] = cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_0;
    var$2[616] = cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_1;
    var$2[617] = cprnm_SkillType_NPC_BOSS_ANUBIS_DRAGON_2;
    var$2[618] = cprnm_SkillType_PCH_ANUBIS_DRAGON_0;
    var$2[619] = cprnm_SkillType_PCH_ANUBIS_DRAGON_1;
    var$2[620] = cprnm_SkillType_PCH_ANUBIS_DRAGON_2;
    var$2[621] = cprnm_SkillType_PCH_ANUBIS_DRAGON_3;
    var$2[622] = cprnm_SkillType_PCH_ANUBIS_DRAGON_4;
    var$2[623] = cprnm_SkillType_NUMBER_623;
    var$2[624] = cprnm_SkillType_ABYSS_DRAGON_0;
    var$2[625] = cprnm_SkillType_ABYSS_DRAGON_1;
    var$2[626] = cprnm_SkillType_ABYSS_DRAGON_2;
    var$2[627] = cprnm_SkillType_ABYSS_DRAGON_3;
    var$2[628] = cprnm_SkillType_ABYSS_DRAGON_4;
    var$2[629] = cprnm_SkillType_NUMBER_629;
    var$2[630] = cprnm_SkillType_UMLAUT_THE_FIRST_0;
    var$2[631] = cprnm_SkillType_UMLAUT_THE_FIRST_1;
    var$2[632] = cprnm_SkillType_UMLAUT_THE_FIRST_2;
    var$2[633] = cprnm_SkillType_UMLAUT_THE_FIRST_3;
    var$2[634] = cprnm_SkillType_UMLAUT_THE_FIRST_4;
    var$2[635] = cprnm_SkillType_NUMBER_635;
    var$2[636] = cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_0;
    var$2[637] = cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_1;
    var$2[638] = cprnm_SkillType_NPC_UMLAUT_THE_FIFTH_FIRST_2;
    var$2[639] = cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_0;
    var$2[640] = cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_1;
    var$2[641] = cprnm_SkillType_NPC_BOSS_ABYSS_DRAGON_2;
    var$2[642] = cprnm_SkillType_BROZERKER_6;
    var$2[643] = cprnm_SkillType_COSMIC_ELF_6;
    var$2[644] = cprnm_SkillType_ORC_MONK_6;
    var$2[645] = cprnm_SkillType_ROLLER_WARRIOR_6;
    var$2[646] = cprnm_SkillType_SHADOW_ASSASSIN_6;
    var$2[647] = cprnm_SkillType_WEREDRAGON_5;
    var$2[648] = cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_0;
    var$2[649] = cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_1;
    var$2[650] = cprnm_SkillType_NPC_BOSS_ANDRAGONUS_THE_FIRST_2;
    var$2[651] = cprnm_SkillType_VULTURE_DRAGON_5;
    var$2[652] = cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_0;
    var$2[653] = cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_1;
    var$2[654] = cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_2;
    var$2[655] = cprnm_SkillType_NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_3;
    var$2[656] = cprnm_SkillType_NINJA_DWARF_6;
    var$2[657] = cprnm_SkillType_UNSTABLE_UNDERSTUDY_6;
    var$2[658] = cprnm_SkillType_DEEP_DRAGON_6;
    var$2[659] = cprnm_SkillType_SNAP_DRAGON_6;
    var$2[660] = cprnm_SkillType_DEMON_TOTEM_6;
    var$2[661] = cprnm_SkillType_NPC_SINISTER_ASSAILANT_0;
    var$2[662] = cprnm_SkillType_NPC_SINISTER_ASSAILANT_1;
    var$2[663] = cprnm_SkillType_NPC_RED_TIGER_0;
    var$2[664] = cprnm_SkillType_NPC_RED_TIGER_1;
    var$2[665] = cprnm_SkillType_DARK_HERO_0;
    var$2[666] = cprnm_SkillType_DARK_HERO_1;
    var$2[667] = cprnm_SkillType_DARK_HERO_2;
    var$2[668] = cprnm_SkillType_DARK_HERO_3;
    var$2[669] = cprnm_SkillType_DARK_HERO_4;
    var$2[670] = cprnm_SkillType_NUMBER_670;
    var$2[671] = cprnm_SkillType_CLAW_MAN_0;
    var$2[672] = cprnm_SkillType_CLAW_MAN_1;
    var$2[673] = cprnm_SkillType_CLAW_MAN_2;
    var$2[674] = cprnm_SkillType_CLAW_MAN_3;
    var$2[675] = cprnm_SkillType_CLAW_MAN_4;
    cprnm_SkillType_$VALUES = var$1;
    cprnm_SkillType_values0 = cprnm_SkillType_values();
},
cprnm_SkillType__init_0 = (var$0, var$1, var$2) => {
    cprnm_SkillType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprnm_SkillType__init_ = (var_0, var_1) => {
    let var_2 = new cprnm_SkillType();
    cprnm_SkillType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprnm_SkillType_values = () => {
    cprnm_SkillType_$callClinit();
    return cprnm_SkillType_$VALUES.$clone0();
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
GameLogicTest = $rt_classWithoutFields(),
GameLogicTest_$callClinit = () => {
    GameLogicTest_$callClinit = $rt_eraseClinit(GameLogicTest);
    GameLogicTest__clinit_();
},
GameLogicTest_main = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    GameLogicTest_$callClinit();
    (jl_System_out()).$println($rt_s(678));
    (jl_System_out()).$println($rt_s(679));
    (jl_System_out()).$println($rt_s(680));
    (jl_System_out()).$println($rt_s(681));
    a: {
        try {
            var$1 = (cprnm_SkillType_values()).data;
            var$2 = jl_System_out();
            var$3 = var$1.length;
            var$4 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(682)), var$3);
            var$2.$println(jl_StringBuilder_toString(var$4));
            var$5 = 0;
            while (var$5 < jl_Math_min(10, var$3)) {
                var$2 = jl_System_out();
                var$6 = var$5 + 1 | 0;
                var$4 = jl_Enum_name(var$1[var$5]);
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$7, $rt_s(683)), var$6), $rt_s(684)), var$4);
                var$2.$println(jl_StringBuilder_toString(var$7));
                var$5 = var$6;
            }
            if (var$3 > 10) {
                var$2 = jl_System_out();
                var$3 = var$3 - 10 | 0;
                var$4 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(685)), var$3), $rt_s(686));
                var$2.$println(jl_StringBuilder_toString(var$4));
            }
            (jl_System_out()).$println($rt_s(687));
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                var$2 = $$je;
            } else {
                throw $$e;
            }
        }
        var$4 = jl_System_out();
        var$2 = var$2.$getMessage();
        var$7 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$7, $rt_s(688)), var$2);
        var$4.$println(jl_StringBuilder_toString(var$7));
    }
    (jl_System_out()).$println($rt_s(680));
    (jl_System_out()).$println($rt_s(689));
    b: {
        try {
            var$1 = (cprs_AnimationType_values()).data;
            var$2 = jl_System_out();
            var$3 = var$1.length;
            var$4 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(690)), var$3);
            var$2.$println(jl_StringBuilder_toString(var$4));
            var$5 = 0;
            while (var$5 < var$3) {
                var$2 = var$1[var$5];
                var$4 = jl_System_out();
                var$2 = jl_Enum_name(var$2);
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$7, $rt_s(683)), var$2);
                var$4.$println(jl_StringBuilder_toString(var$7));
                var$5 = var$5 + 1 | 0;
            }
            (jl_System_out()).$println($rt_s(691));
            break b;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                var$2 = $$je;
            } else {
                throw $$e;
            }
        }
        var$4 = jl_System_out();
        var$2 = var$2.$getMessage();
        var$7 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$7, $rt_s(692)), var$2);
        var$4.$println(jl_StringBuilder_toString(var$7));
    }
    (jl_System_out()).$println($rt_s(680));
    (jl_System_out()).$println($rt_s(693));
},
GameLogicTest__clinit_ = () => {
    return;
};
function ji_ByteArrayOutputStream() {
    ji_OutputStream.call(this);
    this.$buf = null;
}
let ji_ByteArrayOutputStream__init_0 = $this => {
    ji_ByteArrayOutputStream__init_($this, 32);
},
ji_ByteArrayOutputStream__init_1 = () => {
    let var_0 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_0(var_0);
    return var_0;
},
ji_ByteArrayOutputStream__init_ = ($this, $size) => {
    ji_OutputStream__init_($this);
    $this.$buf = $rt_createByteArray($size);
},
ji_ByteArrayOutputStream__init_2 = var_0 => {
    let var_1 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_(var_1, var_0);
    return var_1;
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    jnci_UTF8Charset_$callClinit();
    $this.$charset = jnci_UTF8Charset_INSTANCE;
},
ji_PrintStream__init_1 = (var_0, var_1) => {
    let var_2 = new ji_PrintStream();
    ji_PrintStream__init_(var_2, var_0, var_1);
    return var_2;
},
ji_PrintStream__init_0 = ($this, $out) => {
    ji_PrintStream__init_($this, $out, 0);
},
ji_PrintStream__init_2 = var_0 => {
    let var_1 = new ji_PrintStream();
    ji_PrintStream__init_0(var_1, var_0);
    return var_1;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_0($this, ji_ByteArrayOutputStream__init_1());
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(694));
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
        $s = $rt_s(1);
    $rt_putStdout($rt_ustr($s));
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
cprs_AnimationType = $rt_classWithoutFields(jl_Enum),
cprs_AnimationType_$VALUES = null,
cprs_AnimationType_active = null,
cprs_AnimationType_attack = null,
cprs_AnimationType_attack_special = null,
cprs_AnimationType_death = null,
cprs_AnimationType_death_special = null,
cprs_AnimationType_disabled = null,
cprs_AnimationType_hit = null,
cprs_AnimationType_hit_special = null,
cprs_AnimationType_idle = null,
cprs_AnimationType_idle_special = null,
cprs_AnimationType_jump = null,
cprs_AnimationType_kick = null,
cprs_AnimationType_new_death = null,
cprs_AnimationType_on_tap = null,
cprs_AnimationType_skill1 = null,
cprs_AnimationType_skill1_special = null,
cprs_AnimationType_skill2 = null,
cprs_AnimationType_skill3 = null,
cprs_AnimationType_skill4 = null,
cprs_AnimationType_values0 = null,
cprs_AnimationType_victory = null,
cprs_AnimationType_victory_special = null,
cprs_AnimationType_walk = null,
cprs_AnimationType_walk_special = null,
cprs_AnimationType_$callClinit = () => {
    cprs_AnimationType_$callClinit = $rt_eraseClinit(cprs_AnimationType);
    cprs_AnimationType__clinit_();
},
cprs_AnimationType__clinit_ = () => {
    let var$1, var$2;
    cprs_AnimationType_idle = cprs_AnimationType__init_($rt_s(695), 0);
    cprs_AnimationType_walk = cprs_AnimationType__init_($rt_s(696), 1);
    cprs_AnimationType_attack = cprs_AnimationType__init_($rt_s(697), 2);
    cprs_AnimationType_hit = cprs_AnimationType__init_($rt_s(698), 3);
    cprs_AnimationType_victory = cprs_AnimationType__init_($rt_s(699), 4);
    cprs_AnimationType_death = cprs_AnimationType__init_($rt_s(700), 5);
    cprs_AnimationType_jump = cprs_AnimationType__init_($rt_s(701), 6);
    cprs_AnimationType_kick = cprs_AnimationType__init_($rt_s(702), 7);
    cprs_AnimationType_skill1 = cprs_AnimationType__init_($rt_s(703), 8);
    cprs_AnimationType_skill2 = cprs_AnimationType__init_($rt_s(704), 9);
    cprs_AnimationType_skill3 = cprs_AnimationType__init_($rt_s(705), 10);
    cprs_AnimationType_skill4 = cprs_AnimationType__init_($rt_s(706), 11);
    cprs_AnimationType_new_death = cprs_AnimationType__init_($rt_s(707), 12);
    cprs_AnimationType_idle_special = cprs_AnimationType__init_($rt_s(708), 13);
    cprs_AnimationType_walk_special = cprs_AnimationType__init_($rt_s(709), 14);
    cprs_AnimationType_hit_special = cprs_AnimationType__init_($rt_s(710), 15);
    cprs_AnimationType_victory_special = cprs_AnimationType__init_($rt_s(711), 16);
    cprs_AnimationType_death_special = cprs_AnimationType__init_($rt_s(712), 17);
    cprs_AnimationType_attack_special = cprs_AnimationType__init_($rt_s(713), 18);
    cprs_AnimationType_skill1_special = cprs_AnimationType__init_($rt_s(714), 19);
    cprs_AnimationType_on_tap = cprs_AnimationType__init_($rt_s(715), 20);
    cprs_AnimationType_disabled = cprs_AnimationType__init_($rt_s(716), 21);
    cprs_AnimationType_active = cprs_AnimationType__init_($rt_s(717), 22);
    var$1 = $rt_createArray(cprs_AnimationType, 23);
    var$2 = var$1.data;
    var$2[0] = cprs_AnimationType_idle;
    var$2[1] = cprs_AnimationType_walk;
    var$2[2] = cprs_AnimationType_attack;
    var$2[3] = cprs_AnimationType_hit;
    var$2[4] = cprs_AnimationType_victory;
    var$2[5] = cprs_AnimationType_death;
    var$2[6] = cprs_AnimationType_jump;
    var$2[7] = cprs_AnimationType_kick;
    var$2[8] = cprs_AnimationType_skill1;
    var$2[9] = cprs_AnimationType_skill2;
    var$2[10] = cprs_AnimationType_skill3;
    var$2[11] = cprs_AnimationType_skill4;
    var$2[12] = cprs_AnimationType_new_death;
    var$2[13] = cprs_AnimationType_idle_special;
    var$2[14] = cprs_AnimationType_walk_special;
    var$2[15] = cprs_AnimationType_hit_special;
    var$2[16] = cprs_AnimationType_victory_special;
    var$2[17] = cprs_AnimationType_death_special;
    var$2[18] = cprs_AnimationType_attack_special;
    var$2[19] = cprs_AnimationType_skill1_special;
    var$2[20] = cprs_AnimationType_on_tap;
    var$2[21] = cprs_AnimationType_disabled;
    var$2[22] = cprs_AnimationType_active;
    cprs_AnimationType_$VALUES = var$1;
    cprs_AnimationType_values0 = cprs_AnimationType_values();
},
cprs_AnimationType__init_0 = (var$0, var$1, var$2) => {
    cprs_AnimationType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
cprs_AnimationType__init_ = (var_0, var_1) => {
    let var_2 = new cprs_AnimationType();
    cprs_AnimationType__init_0(var_2, var_0, var_1);
    return var_2;
},
cprs_AnimationType_values = () => {
    cprs_AnimationType_$callClinit();
    return cprs_AnimationType_$VALUES.$clone0();
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
otp_Platform_getName = var$1 => {
    return $rt_str(var$1.$meta.name);
};
function jnc_Charset() {
    let a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
let jnc_Charset__init_ = ($this, $canonicalName, $aliases) => {
    let var$3, var$4, var$5, $alias;
    var$3 = $aliases.data;
    jl_Object__init_($this);
    jnc_Charset_checkCanonicalName($canonicalName);
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        $alias = var$3[var$5];
        jnc_Charset_checkCanonicalName($alias);
        var$5 = var$5 + 1 | 0;
    }
    $this.$canonicalName = $canonicalName;
    $this.$aliases = $aliases.$clone0();
},
jnc_Charset_checkCanonicalName = $name => {
    let $i, $c;
    if ($name.$isEmpty())
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    if (!jnc_Charset_isValidCharsetStart($name.$charAt(0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    $i = 1;
    while ($i < $name.$length()) {
        a: {
            $c = $name.$charAt($i);
            switch ($c) {
                case 43:
                case 45:
                case 46:
                case 58:
                case 95:
                    break;
                default:
                    if (jnc_Charset_isValidCharsetStart($c))
                        break a;
                    else
                        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
            }
        }
        $i = $i + 1 | 0;
    }
},
jnc_Charset_isValidCharsetStart = $c => {
    let var$2;
    a: {
        b: {
            if (!($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122)) {
                if ($c < 65)
                    break b;
                if ($c > 90)
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_0 = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_(var_0);
    return var_0;
};
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
let jnc_IllegalCharsetNameException__init_0 = ($this, $charsetName) => {
    jl_IllegalArgumentException__init_($this);
    $this.$charsetName = $charsetName;
},
jnc_IllegalCharsetNameException__init_ = var_0 => {
    let var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
},
jl_String = $rt_classWithoutFields(),
jl_String_EMPTY_CHARS = null,
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
jl_String__init_4 = () => {
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
jl_String__init_5 = var_0 => {
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
jl_String__init_6 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_0());
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
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_4();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_115_0__init_0();
},
jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset),
jnci_UTF8Charset_INSTANCE = null,
jnci_UTF8Charset_$callClinit = () => {
    jnci_UTF8Charset_$callClinit = $rt_eraseClinit(jnci_UTF8Charset);
    jnci_UTF8Charset__clinit_();
},
jnci_UTF8Charset__init_0 = $this => {
    jnci_UTF8Charset_$callClinit();
    jnc_Charset__init_($this, $rt_s(718), $rt_createArray(jl_String, 0));
},
jnci_UTF8Charset__init_ = () => {
    let var_0 = new jnci_UTF8Charset();
    jnci_UTF8Charset__init_0(var_0);
    return var_0;
},
jnci_UTF8Charset__clinit_ = () => {
    jnci_UTF8Charset_INSTANCE = jnci_UTF8Charset__init_();
};
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$platformClass = null;
}
let jl_Class__init_ = ($this, $platformClass) => {
    let var$2;
    jl_Object__init_($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
},
jl_Class__init_0 = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_(var_1, var_0);
    return var_1;
},
jl_Class_getClass = $cls => {
    let $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_0($cls);
    return $result;
},
jl_Class_getName = $this => {
    if ($this.$name0 === null)
        $this.$name0 = otp_Platform_getName($this.$platformClass);
    return $this.$name0;
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_115_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_115_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_115_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_115_0();
    jl_String$_clinit_$lambda$_115_0__init_(var_0);
    return var_0;
};
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_), "$_init_0", $rt_wrapFunction1(jl_Exception__init_0)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, 0,
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, ["$_init_4", $rt_wrapFunction2(jl_Enum__init_), "$name", $rt_wrapFunction0(jl_Enum_name)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_)],
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_5", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_2", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append2", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append3", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$append1", $rt_wrapFunction2(jl_AbstractStringBuilder_append2), "$insert0", $rt_wrapFunction3(jl_AbstractStringBuilder_insert2),
"$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$insert1", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append5", $rt_wrapFunction1(jl_StringBuilder_append0), "$append0", $rt_wrapFunction1(jl_StringBuilder_append1), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert2), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert3), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString),
"$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert1", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert4)],
cprnm_SkillType, 0, jl_Enum, [], 12, 3, 0, cprnm_SkillType_$callClinit, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
GameLogicTest, 0, jl_Object, [], 0, 3, 0, GameLogicTest_$callClinit, 0,
ji_ByteArrayOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_ByteArrayOutputStream__init_0), "$_init_2", $rt_wrapFunction1(ji_ByteArrayOutputStream__init_)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 0, 3, 0, 0, ["$_init_6", $rt_wrapFunction2(ji_PrintStream__init_), "$_init_5", $rt_wrapFunction1(ji_PrintStream__init_0)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
jl_ClassCastException, 0, jl_RuntimeException, [], 0, 3, 0, 0, 0,
cprs_AnimationType, 0, jl_Enum, [], 12, 3, 0, cprs_AnimationType_$callClinit, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, ["$_init_7", $rt_wrapFunction2(jnc_Charset__init_)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_)],
jnc_IllegalCharsetNameException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jnc_IllegalCharsetNameException__init_0)],
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_), "$_init_1", $rt_wrapFunction1(jl_String__init_0), "$_init_9", $rt_wrapFunction1(jl_String__init_1), "$_init_3", $rt_wrapFunction3(jl_String__init_2), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$toString", $rt_wrapFunction0(jl_String_toString)],
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, jnci_UTF8Charset_$callClinit, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$getName", $rt_wrapFunction0(jl_Class_getName)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_115_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_115_0__init_)]]);
let $rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls);
$rt_stringPool(["0", "null", "DEFAULT", "ELECTROYETI_0", "ELECTROYETI_1", "ELECTROYETI_2", "ELECTROYETI_3", "ELECTROYETI_4", "MEDUSA_0", "MEDUSA_1", "MEDUSA_2", "MEDUSA_3", "MEDUSA_4", "FAITH_HEALER_0", "FAITH_HEALER_1", "FAITH_HEALER_2", "FAITH_HEALER_3", "FAITH_HEALER_4", "DARK_DRACUL_0", "DARK_DRACUL_1", "DARK_DRACUL_2", "DARK_DRACUL_3", "DARK_DRACUL_4", "COSMIC_ELF_0", "COSMIC_ELF_1", "COSMIC_ELF_2", "COSMIC_ELF_3", "COSMIC_ELF_4", "ROLLER_WARRIOR_0", "ROLLER_WARRIOR_1", "ROLLER_WARRIOR_2", "ROLLER_WARRIOR_3",
"ROLLER_WARRIOR_4", "DRAGON_LADY_0", "DRAGON_LADY_1", "DRAGON_LADY_2", "DRAGON_LADY_3", "DRAGON_LADY_4", "CENTAUR_OF_ATTENTION_0", "CENTAUR_OF_ATTENTION_1", "CENTAUR_OF_ATTENTION_2", "CENTAUR_OF_ATTENTION_3", "CENTAUR_OF_ATTENTION_4", "UNSTABLE_UNDERSTUDY_0", "UNSTABLE_UNDERSTUDY_1", "UNSTABLE_UNDERSTUDY_2", "UNSTABLE_UNDERSTUDY_3", "UNSTABLE_UNDERSTUDY_4", "MOON_DRAKE_0", "MOON_DRAKE_1", "MOON_DRAKE_2", "MOON_DRAKE_3", "MOON_DRAKE_4", "NPC_GOBLIN_0", "NPC_WILDLING_ARCHER_0", "NPC_CRYSTAL_GOLEM_0", "NPC_ICE_GOLEM_0",
"NPC_FIRE_IMP_0", "NPC_FIRE_IMP_1", "NPC_STONE_IMP_0", "NPC_STONE_IMP_1", "NPC_MYSTIC_WILDLING_0", "NPC_WILDLING_SNIPER_0", "POLEMASTER_0", "POLEMASTER_1", "POLEMASTER_2", "POLEMASTER_3", "POLEMASTER_4", "CATAPULT_KNIGHT_0", "CATAPULT_KNIGHT_1", "CATAPULT_KNIGHT_2", "CATAPULT_KNIGHT_3", "CATAPULT_KNIGHT_4", "BARDBARIAN_0", "BARDBARIAN_1", "BARDBARIAN_2", "BARDBARIAN_3", "BARDBARIAN_4", "SHADOW_ASSASSIN_0", "SHADOW_ASSASSIN_1", "SHADOW_ASSASSIN_2", "SHADOW_ASSASSIN_3", "SHADOW_ASSASSIN_4", "DUST_DEVIL_0", "DUST_DEVIL_1",
"DUST_DEVIL_2", "DUST_DEVIL_3", "DUST_DEVIL_4", "SNAP_DRAGON_0", "SNAP_DRAGON_1", "SNAP_DRAGON_2", "SNAP_DRAGON_3", "SNAP_DRAGON_4", "HYDRA_0", "HYDRA_1", "HYDRA_2", "HYDRA_3", "HYDRA_4", "SAVAGE_CUTIE_0", "SAVAGE_CUTIE_1", "SAVAGE_CUTIE_2", "SAVAGE_CUTIE_3", "SAVAGE_CUTIE_4", "ZOMBIE_SQUIRE_0", "ZOMBIE_SQUIRE_1", "ZOMBIE_SQUIRE_2", "ZOMBIE_SQUIRE_3", "ZOMBIE_SQUIRE_4", "MAGIC_DRAGON_0", "MAGIC_DRAGON_1", "MAGIC_DRAGON_2", "MAGIC_DRAGON_3", "MAGIC_DRAGON_4", "AQUATIC_MAN_0", "AQUATIC_MAN_1", "AQUATIC_MAN_2",
"AQUATIC_MAN_3", "AQUATIC_MAN_4", "CRIMSON_WITCH_0", "CRIMSON_WITCH_1", "CRIMSON_WITCH_2", "CRIMSON_WITCH_3", "CRIMSON_WITCH_4", "NINJA_DWARF_0", "NINJA_DWARF_1", "NINJA_DWARF_2", "NINJA_DWARF_3", "NINJA_DWARF_4", "BROZERKER_0", "BROZERKER_1", "BROZERKER_2", "BROZERKER_3", "BROZERKER_4", "GROOVY_DRUID_0", "GROOVY_DRUID_1", "GROOVY_DRUID_2", "GROOVY_DRUID_3", "GROOVY_DRUID_4", "BONE_DRAGON_0", "BONE_DRAGON_1", "BONE_DRAGON_2", "BONE_DRAGON_3", "BONE_DRAGON_4", "NPC_HEALER_SPRITE_0", "NPC_BUFF_SPRITE_0", "NPC_TROLL_BLOB_0",
"NPC_INFERNO_SPIDER_0", "NPC_SCARECROW_0", "NPC_POTTED_PLANT_0", "NPC_POTTED_PLANT_1", "SPIKEY_DRAGON_0", "SPIKEY_DRAGON_1", "SPIKEY_DRAGON_2", "SPIKEY_DRAGON_3", "SPIKEY_DRAGON_4", "FROST_GIANT_0", "FROST_GIANT_1", "FROST_GIANT_2", "FROST_GIANT_3", "FROST_GIANT_4", "MINOTAUR_0", "MINOTAUR_1", "MINOTAUR_2", "MINOTAUR_3", "MINOTAUR_4", "DARK_HORSE_0", "DARK_HORSE_1", "DARK_HORSE_2", "DARK_HORSE_3", "DARK_HORSE_4", "DRUIDINATRIX_0", "DRUIDINATRIX_1", "DRUIDINATRIX_2", "DRUIDINATRIX_3", "DRUIDINATRIX_4", "NPC_KAMIKAZE_GNOME_0",
"NPC_MR_SMASHY_0", "BARDBARIAN_TITAN", "BROZERKER_TITAN", "CENTAUR_OF_ATTENTION_TITAN", "SNAP_DRAGON_TITAN", "FAITH_HEALER_TITAN", "MEDUSA_TITAN", "UNSTABLE_UNDERSTUDY_TITAN", "BONE_DRAGON_TITAN", "DRAGON_LADY_TITAN", "AQUATIC_MAN_TITAN", "NPC_EVIL_WIZARD_SUMMON_0", "NPC_EVIL_WIZARD_BOMB_0", "NPC_EVIL_WIZARD_SUMMON_1", "NPC_EVIL_WIZARD_BOMB_1", "NPC_EVIL_WIZARD_SUMMON_2", "NPC_EVIL_WIZARD_BOMB_2", "NPC_EVIL_WIZARD_UNTARGETABLE", "ORC_MONK_0", "ORC_MONK_1", "ORC_MONK_2", "ORC_MONK_3", "ORC_MONK_4", "DWARVEN_ARCHER_0",
"DWARVEN_ARCHER_1", "DWARVEN_ARCHER_2", "DWARVEN_ARCHER_3", "DWARVEN_ARCHER_4", "RABID_DRAGON_0", "RABID_DRAGON_1", "RABID_DRAGON_2", "RABID_DRAGON_3", "RABID_DRAGON_4", "NPC_GOLD_COLOSSUS_MELEE_0", "NPC_GOLD_COLOSSUS_SPEW_GOLD_0", "NPC_GOLD_COLOSSUS_JUMP_0", "NPC_GOLD_COLOSSUS_MELEE_1", "NPC_GOLD_COLOSSUS_SPEW_GOLD_1", "NPC_GOLD_COLOSSUS_JUMP_1", "NPC_GOLD_COLOSSUS_MELEE_2", "NPC_GOLD_COLOSSUS_SPEW_GOLD_2", "NPC_GOLD_COLOSSUS_JUMP_2", "NPC_GOLD_COLOSSUS_EAT_GOLD_2", "NPC_GOLD_COLOSSUS_WIND", "NPC_GOLD_COLOSSUS_SPIKES",
"NPC_CAULDRON_MONSTER_0", "NPC_SQUID_0", "NPC_GIANT_PLANT_BITE", "NPC_GIANT_PLANT_SPEW_POISON_0", "NPC_GIANT_PLANT_SPEW_POISON_1", "NPC_GIANT_PLANT_SPEW_POISON_2", "NPC_GIANT_PLANT_HOP_FORWARD", "NPC_GIANT_PLANT_SPAWNER", "NPC_GIANT_PLANT_ROOT_0", "BOSS_CANT_BE_DISABLED", "SKELETON_KING_0", "SKELETON_KING_1", "SKELETON_KING_2", "SKELETON_KING_3", "SKELETON_KING_4", "SATYR_0", "SATYR_1", "SATYR_2", "SATYR_3", "SATYR_4", "STORM_DRAGON_0", "STORM_DRAGON_1", "STORM_DRAGON_2", "STORM_DRAGON_3", "STORM_DRAGON_4",
"NPC_SKELETON_DEER_0", "NPC_SKELETON_DEER_1", "NPC_SKELETON_DEER_2", "NPC_MUSHROOM_0", "BROZERKER_5", "MEDUSA_5", "DUST_DEVIL_5", "FAITH_HEALER_5", "POLEMASTER_5", "DARK_DRACUL_5", "CATAPULT_KNIGHT_5", "NINJA_DWARF_5", "SNAP_DRAGON_5", "UNICORGI_0", "UNICORGI_1", "UNICORGI_2", "UNICORGI_3", "UNICORGI_4", "SNIPER_WOLF_0", "SNIPER_WOLF_1", "SNIPER_WOLF_2", "SNIPER_WOLF_3", "SNIPER_WOLF_4", "GENIE_0", "GENIE_1", "GENIE_2", "GENIE_3", "GENIE_4", "NPC_HEAD_CRAB_0", "NPC_CLOUD_MONSTER_0", "NPC_CLOUD_MONSTER_1", "ZOMBIE_SQUIRE_5",
"MAGIC_DRAGON_5", "GROOVY_DRUID_5", "CENTAUR_OF_ATTENTION_5", "DRAGON_LADY_5", "SHADOW_ASSASSIN_5", "ELECTROYETI_5", "FROST_GIANT_5", "UNSTABLE_UNDERSTUDY_5", "HYDRA_5", "BARDBARIAN_5", "SAVAGE_CUTIE_5", "ORC_MONK_5", "COSMIC_ELF_5", "AQUATIC_MAN_5", "MOON_DRAKE_5", "ROLLER_WARRIOR_5", "DRUIDINATRIX_5", "DRAGZILLA_0", "DRAGZILLA_1", "DRAGZILLA_2", "DRAGZILLA_3", "DRAGZILLA_4", "PIRATE_0", "PIRATE_1", "PIRATE_2", "PIRATE_3", "PIRATE_4", "CYCLOPS_WIZARD_0", "CYCLOPS_WIZARD_1", "CYCLOPS_WIZARD_2", "CYCLOPS_WIZARD_3",
"CYCLOPS_WIZARD_4", "DEMON_TOTEM_0", "DEMON_TOTEM_1", "DEMON_TOTEM_2", "DEMON_TOTEM_3", "DEMON_TOTEM_4", "NPC_EYEBALL_0", "DEEP_DRAGON_0", "DEEP_DRAGON_1", "DEEP_DRAGON_2", "DEEP_DRAGON_3", "DEEP_DRAGON_4", "DOPPELGANGER_0", "DOPPELGANGER_1", "DOPPELGANGER_2", "DOPPELGANGER_3", "DOPPELGANGER_4", "KRAKEN_KING_0", "KRAKEN_KING_1", "KRAKEN_KING_2", "KRAKEN_KING_3", "KRAKEN_KING_4", "STOWAWAY_0", "STOWAWAY_1", "STOWAWAY_2", "STOWAWAY_3", "STOWAWAY_4", "NPC_SHARK_0", "NPC_SHARK_1", "NPC_SQUIRREL_0", "CURSED_STATUE_0",
"CURSED_STATUE_1", "CURSED_STATUE_2", "CURSED_STATUE_3", "CURSED_STATUE_4", "PLANT_SOUL_0", "PLANT_SOUL_1", "PLANT_SOUL_2", "PLANT_SOUL_3", "PLANT_SOUL_4", "SPIDER_QUEEN_0", "SPIDER_QUEEN_1", "SPIDER_QUEEN_2", "SPIDER_QUEEN_3", "SPIDER_QUEEN_4", "VULTURE_DRAGON_0", "VULTURE_DRAGON_1", "VULTURE_DRAGON_2", "VULTURE_DRAGON_3", "VULTURE_DRAGON_4", "NPC_ANT_0", "NPC_ANT_1", "FROST_GIANT_TITAN", "ORC_MONK_TITAN", "RABID_DRAGON_TITAN", "GENIE_TITAN", "SKELETON_KING_TITAN", "SPIKEY_DRAGON_TITAN", "BANSHEE_0", "BANSHEE_1",
"BANSHEE_2", "BANSHEE_3", "BANSHEE_4", "RAGING_REVENANT_0", "RAGING_REVENANT_1", "RAGING_REVENANT_2", "RAGING_REVENANT_3", "RAGING_REVENANT_4", "SILENT_SPIRIT_0", "SILENT_SPIRIT_1", "SILENT_SPIRIT_2", "SILENT_SPIRIT_3", "SILENT_SPIRIT_4", "SPECTRAL_DRAGON_0", "SPECTRAL_DRAGON_1", "SPECTRAL_DRAGON_2", "SPECTRAL_DRAGON_3", "SPECTRAL_DRAGON_4", "NPC_LYING_LANTERN_0", "NPC_LYING_LANTERN_1", "NPC_LYING_LANTERN_2", "RABID_DRAGON_5", "BONE_DRAGON_5", "SNIPER_WOLF_5", "WEREDRAGON_0", "WEREDRAGON_1", "WEREDRAGON_2",
"WEREDRAGON_3", "WEREDRAGON_4", "WEE_WITCH_0", "WEE_WITCH_1", "WEE_WITCH_2", "WEE_WITCH_3", "WEE_WITCH_4", "DUNGEON_MAN_0", "DUNGEON_MAN_1", "DUNGEON_MAN_2", "DUNGEON_MAN_3", "DUNGEON_MAN_4", "NPC_PLAGUE_SKULKER_0", "NPC_PLAGUE_SKULKER_1", "PLAGUE_ENTREPRENEUR_0", "PLAGUE_ENTREPRENEUR_1", "PLAGUE_ENTREPRENEUR_2", "PLAGUE_ENTREPRENEUR_3", "PLAGUE_ENTREPRENEUR_4", "MISTRESS_MANICURE_0", "MISTRESS_MANICURE_1", "MISTRESS_MANICURE_2", "MISTRESS_MANICURE_3", "MISTRESS_MANICURE_4", "VILE_BILE_0", "VILE_BILE_1", "VILE_BILE_2",
"VILE_BILE_3", "VILE_BILE_4", "NPC_FLEA_DEMON_0", "UNICORGI_5", "PIRATE_5", "DWARVEN_ARCHER_5", "VOID_WYVERN_0", "VOID_WYVERN_1", "VOID_WYVERN_2", "VOID_WYVERN_3", "VOID_WYVERN_4", "DARK_HORSE_5", "BURNT_ONE_0", "BURNT_ONE_1", "BURNT_ONE_2", "BURNT_ONE_3", "BURNT_ONE_4", "SKELETON_KING_5", "SATYR_5", "DEEP_DRAGON_5", "STORM_DRAGON_5", "NPC_ANGELIC_AVENGER_0", "MINOTAUR_5", "CRIMSON_WITCH_5", "SPIKEY_DRAGON_5", "GENIE_5", "DEMON_TOTEM_5", "TOMB_ANGEL_0", "TOMB_ANGEL_1", "TOMB_ANGEL_2", "TOMB_ANGEL_3", "TOMB_ANGEL_4",
"ANGELIC_HERALD_0", "ANGELIC_HERALD_1", "ANGELIC_HERALD_2", "ANGELIC_HERALD_3", "ANGELIC_HERALD_4", "BULWARK_ANGEL_0", "BULWARK_ANGEL_1", "BULWARK_ANGEL_2", "BULWARK_ANGEL_3", "BULWARK_ANGEL_4", "ANGEL_DRAGON_0", "ANGEL_DRAGON_1", "ANGEL_DRAGON_2", "ANGEL_DRAGON_3", "ANGEL_DRAGON_4", "DRAGON_SLAYER_0", "DRAGON_SLAYER_1", "DRAGON_SLAYER_2", "DRAGON_SLAYER_3", "DRAGON_SLAYER_4", "ETERNAL_ENCHANTER_0", "ETERNAL_ENCHANTER_1", "ETERNAL_ENCHANTER_2", "ETERNAL_ENCHANTER_3", "ETERNAL_ENCHANTER_4", "GRAND_HUNTRESS_0",
"GRAND_HUNTRESS_1", "GRAND_HUNTRESS_2", "GRAND_HUNTRESS_3", "GRAND_HUNTRESS_4", "TRIPLE_THREAT_0", "TRIPLE_THREAT_1", "TRIPLE_THREAT_2", "TRIPLE_THREAT_3", "TRIPLE_THREAT_4", "LAST_DEFENDER_0", "LAST_DEFENDER_1", "LAST_DEFENDER_2", "LAST_DEFENDER_3", "LAST_DEFENDER_4", "NUMBER_493", "SOJOURNER_SORCERESS_0", "SOJOURNER_SORCERESS_1", "SOJOURNER_SORCERESS_2", "SOJOURNER_SORCERESS_3", "SOJOURNER_SORCERESS_4", "SOJOURNER_SORCERESS_5", "KARAOKE_KING_0", "KARAOKE_KING_1", "KARAOKE_KING_2", "KARAOKE_KING_3", "KARAOKE_KING_4",
"NUMBER_505", "SHADOW_OF_SVEN_0", "SHADOW_OF_SVEN_1", "SHADOW_OF_SVEN_2", "SHADOW_OF_SVEN_3", "SHADOW_OF_SVEN_4", "NUMBER_511", "SUN_SEEKER_0", "SUN_SEEKER_1", "SUN_SEEKER_2", "SUN_SEEKER_3", "SUN_SEEKER_4", "NUMBER_517", "STEPLADDER_BROTHERS_0", "STEPLADDER_BROTHERS_1", "STEPLADDER_BROTHERS_2", "STEPLADDER_BROTHERS_3", "STEPLADDER_BROTHERS_4", "NUMBER_523", "FORGOTTEN_DRAGON_0", "FORGOTTEN_DRAGON_1", "FORGOTTEN_DRAGON_2", "FORGOTTEN_DRAGON_3", "FORGOTTEN_DRAGON_4", "NUMBER_529", "NPC_CRYSTAL_LIZARD_0", "NPC_CRYSTAL_LIZARD_1",
"ETERNAL_ENCHANTER_5", "BLACK_WING_0", "BLACK_WING_1", "BLACK_WING_2", "BLACK_WING_3", "BLACK_WING_4", "NUMBER_538", "GREED_DRAGON_0", "GREED_DRAGON_1", "GREED_DRAGON_2", "GREED_DRAGON_3", "GREED_DRAGON_4", "NUMBER_544", "UNRIPE_MYTHOLOGY_0", "UNRIPE_MYTHOLOGY_1", "UNRIPE_MYTHOLOGY_2", "UNRIPE_MYTHOLOGY_3", "UNRIPE_MYTHOLOGY_4", "NUMBER_550", "NPC_BREAKER_MKII_0", "NPC_BREAKER_MKII_1", "DRAGZILLA_5", "ANCIENT_DWARF_0", "ANCIENT_DWARF_1", "ANCIENT_DWARF_2", "ANCIENT_DWARF_3", "ANCIENT_DWARF_4", "NUMBER_559",
"DIGGER_MOLE_0", "DIGGER_MOLE_1", "DIGGER_MOLE_2", "DIGGER_MOLE_3", "DIGGER_MOLE_4", "NUMBER_565", "SADISTIC_DANCER_0", "SADISTIC_DANCER_1", "SADISTIC_DANCER_2", "SADISTIC_DANCER_3", "SADISTIC_DANCER_4", "NUMBER_571", "NPC_ANUBIS_DRAGON_0", "NPC_ANUBIS_DRAGON_1", "NPC_ANUBIS_DRAGON_2", "RAGING_REVENANT_5", "NPC_KING_IMP_0", "NPC_KING_IMP_1", "WHITE_TIGRESS_0", "WHITE_TIGRESS_1", "WHITE_TIGRESS_2", "WHITE_TIGRESS_3", "WHITE_TIGRESS_4", "NUMBER_583", "SNAPPER_BONE_0", "SNAPPER_BONE_1", "SNAPPER_BONE_2", "SNAPPER_BONE_3",
"SNAPPER_BONE_4", "NUMBER_589", "NUMBER_590", "NUMBER_591", "NUMBER_592", "NUMBER_593", "NUMBER_594", "NUMBER_595", "NUMBER_596", "NUMBER_597", "NUMBER_598", "MEDUSA_6", "GENIE_6", "DRAGON_LADY_6", "SATYR_6", "CENTAUR_OF_ATTENTION_6", "VERMILION_PRIESTESS_0", "VERMILION_PRIESTESS_1", "VERMILION_PRIESTESS_2", "VERMILION_PRIESTESS_3", "VERMILION_PRIESTESS_4", "NUMBER_609", "NPC_ABYSS_DRAGON_0", "NPC_ABYSS_DRAGON_1", "NPC_ABYSS_DRAGON_2", "ANGELIC_HERALD_5", "BOSS_BATTLE_FIELD_BUFF", "NPC_BOSS_ANUBIS_DRAGON_0",
"NPC_BOSS_ANUBIS_DRAGON_1", "NPC_BOSS_ANUBIS_DRAGON_2", "PCH_ANUBIS_DRAGON_0", "PCH_ANUBIS_DRAGON_1", "PCH_ANUBIS_DRAGON_2", "PCH_ANUBIS_DRAGON_3", "PCH_ANUBIS_DRAGON_4", "NUMBER_623", "ABYSS_DRAGON_0", "ABYSS_DRAGON_1", "ABYSS_DRAGON_2", "ABYSS_DRAGON_3", "ABYSS_DRAGON_4", "NUMBER_629", "UMLAUT_THE_FIRST_0", "UMLAUT_THE_FIRST_1", "UMLAUT_THE_FIRST_2", "UMLAUT_THE_FIRST_3", "UMLAUT_THE_FIRST_4", "NUMBER_635", "NPC_UMLAUT_THE_FIFTH_FIRST_0", "NPC_UMLAUT_THE_FIFTH_FIRST_1", "NPC_UMLAUT_THE_FIFTH_FIRST_2", "NPC_BOSS_ABYSS_DRAGON_0",
"NPC_BOSS_ABYSS_DRAGON_1", "NPC_BOSS_ABYSS_DRAGON_2", "BROZERKER_6", "COSMIC_ELF_6", "ORC_MONK_6", "ROLLER_WARRIOR_6", "SHADOW_ASSASSIN_6", "WEREDRAGON_5", "NPC_BOSS_ANDRAGONUS_THE_FIRST_0", "NPC_BOSS_ANDRAGONUS_THE_FIRST_1", "NPC_BOSS_ANDRAGONUS_THE_FIRST_2", "VULTURE_DRAGON_5", "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_0", "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_1", "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_2", "NPC_BOSS_UMLAUT_THE_FIFTH_FIRST_3", "NINJA_DWARF_6", "UNSTABLE_UNDERSTUDY_6", "DEEP_DRAGON_6", "SNAP_DRAGON_6", "DEMON_TOTEM_6",
"NPC_SINISTER_ASSAILANT_0", "NPC_SINISTER_ASSAILANT_1", "NPC_RED_TIGER_0", "NPC_RED_TIGER_1", "DARK_HERO_0", "DARK_HERO_1", "DARK_HERO_2", "DARK_HERO_3", "DARK_HERO_4", "NUMBER_670", "CLAW_MAN_0", "CLAW_MAN_1", "CLAW_MAN_2", "CLAW_MAN_3", "CLAW_MAN_4", "=== DragonSoul Game Logic Test ===", "Running as: JavaScript (TeaVM compiled)", "", "--- Test 1: SkillType Enum ---", "Total skill types: ", "  ", ". ", "  ... (", " more)", "TEST 1: PASSED ✓", "TEST 1: FAILED - ", "--- Test 2: AnimationType ---", "Animation types: ",
"TEST 2: PASSED ✓", "TEST 2: FAILED - ", "=== DragonSoul logic runs in JavaScript! ===", "\n", "idle", "walk", "attack", "hit", "victory", "death", "jump", "kick", "skill1", "skill2", "skill3", "skill4", "new_death", "idle_special", "walk_special", "hit_special", "victory_special", "death_special", "attack_special", "skill1_special", "on_tap", "disabled", "active", "UTF-8"]);
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
let $rt_export_main = $rt_mainStarter(GameLogicTest_main);
$rt_export_main.javaException = $rt_javaException;
$rt_exports.main = $rt_export_main;
}));
