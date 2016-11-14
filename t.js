(function(){
"use strict";
var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5;
function enumerate(item) {
    var arr, iter, i;
    arr = [];
    iter = ՐՏ_Iterable(item);
    for (i = 0; i < iter.length; i++) {
        arr[arr.length] = [ i, item[i] ];
    }
    return arr;
}
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    }
    return arr.hasOwnProperty(val);
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    return Object.keys(iterable);
}
function ՐՏ_print() {
    if (typeof console === "object") {
        console.log.apply(console, arguments);
    }
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function reversed(arr) {
    var tmp;
    tmp = arr.slice(0);
    return tmp.reverse();
}
function ՐՏ_type(obj) {
    return obj && obj.constructor && obj.constructor.name ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1);
}
function ՐՏ_eq(a, b) {
    var ՐՏitr50, ՐՏidx50;
    var i;
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b) || a instanceof Object && b instanceof Object) {
        if (a.constructor !== b.constructor || a.length !== b.length) {
            return false;
        }
        if (Array.isArray(a)) {
            for (i = 0; i < a.length; i++) {
                if (!ՐՏ_eq(a[i], b[i])) {
                    return false;
                }
            }
        } else {
            if (Object.keys(a).length !== Object.keys(b).length) {
                return false;
            }
            ՐՏitr50 = ՐՏ_Iterable(a);
            for (ՐՏidx50 = 0; ՐՏidx50 < ՐՏitr50.length; ՐՏidx50++) {
                i = ՐՏitr50[ՐՏidx50];
                if (!ՐՏ_eq(a[i], b[i])) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
var ՐՏ_modules = {};
ՐՏ_modules["interstate"] = {};

(function(){
    var __name__ = "interstate";
    var _warning, _error;
    _warning = null;
    _error = null;
    function byType(a, b) {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }
        return 0;
    }
    function mergeArrays(originalArray, newArray) {
        var ՐՏitr1, ՐՏidx1, ՐՏitr2, ՐՏidx2;
        var newItem, exists, originalItem;
        ՐՏitr1 = ՐՏ_Iterable(newArray);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            newItem = ՐՏitr1[ՐՏidx1];
            exists = false;
            ՐՏitr2 = ՐՏ_Iterable(originalArray);
            for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                originalItem = ՐՏitr2[ՐՏidx2];
                if ((newItem === originalItem || typeof newItem === "object" && ՐՏ_eq(newItem, originalItem))) {
                    exists = true;
                    break;
                }
                if (exists) {
                    break;
                }
            }
            if (!exists) {
                originalArray.push(newItem);
            }
        }
        return originalArray;
    }
    function normalize(arg) {
        var x;
        if (!arg) {
            self.error("No argument specified");
        }
        if (ՐՏ_type(arg) === "String") {
            return {
                type: arg
            };
        } else if (ՐՏ_type(arg) === "Object") {
            if (!arg.type) {
                arg.type = "?";
            }
            if (arg.inputs) {
                arg.inputs = (function() {
                    var ՐՏidx3, ՐՏitr3 = ՐՏ_Iterable(arg.inputs), ՐՏres = [], x;
                    for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                        x = ՐՏitr3[ՐՏidx3];
                        ՐՏres.push(normalize(x));
                    }
                    return ՐՏres;
                })();
            }
            if (arg.returns) {
                arg.returns = (function() {
                    var ՐՏidx4, ՐՏitr4 = ՐՏ_Iterable(arg.returns), ՐՏres = [], x;
                    for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                        x = ՐՏitr4[ՐՏidx4];
                        ՐՏres.push(normalize(x));
                    }
                    return ՐՏres;
                })().sort(byType);
            }
            return arg;
        }
        self.error("Unexpected type passed into variable declaration: " + ՐՏ_type(arg) + ", expected types: String or Object");
    }
    function stringifySignature(varType) {
        var element, arg, signature, returns, elementType;
        element = ՐՏ_type(varType) === "String" ? normalize(varType) : varType;
        if ((element.type === "Function" || !element.type) && element.inputs) {
            signature = "Function(" + (function() {
                var ՐՏidx5, ՐՏitr5 = ՐՏ_Iterable(element.inputs), ՐՏres = [], arg;
                for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                    arg = ՐՏitr5[ՐՏidx5];
                    ՐՏres.push(stringifySignature(arg));
                }
                return ՐՏres;
            })().join(", ") + ")";
            if (element.returns) {
                returns = (function() {
                    var ՐՏidx6, ՐՏitr6 = ՐՏ_Iterable(element.returns), ՐՏres = [], arg;
                    for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                        arg = ՐՏitr6[ՐՏidx6];
                        ՐՏres.push(stringifySignature(arg));
                    }
                    return ՐՏres;
                })().join(" or ");
                signature += " -> " + (element.returns.length > 1 ? "(" + returns + ")" : returns || "Undefined");
            }
            return signature;
        }
        elementType = element.type || "?";
        return element.name ? element.name + ":" + elementType : elementType;
    }
    "\nchallenges:\n    [x] non-typed function within typed (not allowed?)\n        nonlocal typing enforced (variable enforcement is based on scope)\n    [] are conditional types allowed? great for inputs / templates, incompatible with one-time types\n        perhaps single-assignment conditional? except None\n    [x] one-time types: can't change type after assignment, more harm or good?\n        no, it is good, limit it to typed functions\n    [] type annotations on assignment? interfaces? interface definitions?\n        interface allows removal and easier declaration of variables\n        implements interface? @interface?\n    [] non-typed tracking:\n        tracking through conditionals\n        tracking WHERE (link back to node?)\n            Assignment Node\n            Reference Node\n    [x] disable variable tracking via JS(), JS('a = a')\n    [X] interface annotation / class annotation\n        stuff:Number\n        item:Number or String\n        cls:MyClass = MyClass()\n        ifc:Interface = { foo: 1, bar: 3 }\n\nneed:\n    reference counter\n    type tracker\n    reassignment tracker?\n";
    var Var = (ՐՏ_1 = function Var() {
        Var.prototype.__init__.apply(this, arguments);
    }, Object.defineProperties(ՐՏ_1.prototype, {
        __doc__: {
            enumerable: true, 
            writable: true, 
            value: "tracks type, perhaps value too in the future, and number of references\ntype can be simple or complex (functions)"        },
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(varType){
                var self = this;
                self.type = varType;
                self.properties = [];
            }
        }
    }), ՐՏ_1);
    var Func = (ՐՏ_2 = function Func() {
        Func.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_2, Var), Object.defineProperties(ՐՏ_2.prototype, {
        __doc__: {
            enumerable: true, 
            writable: true, 
            value: "handles functions"        },
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(inputs, returns){
                var self = this;
                inputs = inputs === void 0 ? [] : inputs;
                returns = returns === void 0 ? [] : returns;
                Var.prototype.constructor.call(self, "Function");
                self.inputs = inputs.map(function(arg) {
                    if (ՐՏ_type(arg) === "String") {
                        if (arg === "Function") {
                            return new Func();
                        } else {
                            return new Var(arg);
                        }
                    } else if (ՐՏ_type(arg) === "Object") {
                        return new Func(arg);
                    }
                    self.error("Unknown argument type passed into function declaration");
                });
                self.returns = returns;
            }
        }
    }), ՐՏ_2);
    var Class = (ՐՏ_3 = function Class() {
        Class.prototype.__init__.apply(this, arguments);
    }, ՐՏ_extends(ՐՏ_3, Var), Object.defineProperties(ՐՏ_3.prototype, {
        __doc__: {
            enumerable: true, 
            writable: true, 
            value: "handles class declaration"        },
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(inputs){
                var self = this;
            }
        }
    }), ՐՏ_3);
    var Timeline = (ՐՏ_4 = function Timeline() {
        Timeline.prototype.__init__.apply(this, arguments);
    }, Object.defineProperties(ՐՏ_4.prototype, {
        __doc__: {
            enumerable: true, 
            writable: true, 
            value: "A variable timeline which includes references to it, as well as declarations and reassignments. This timeline includes 3 major types:\n\nBasic variable, at its core this is the basis for the other 2, a function is just a variable generator and a class is a variable\nwith more detail:\n    {\n        type: '?'           - variable type\n        parent: { type },   - reference to parent\n        properties: []      - properties attached to this variable (this list will grow)\n    }\n\nFunction with signature (inputs and results are arrays of other variables):\n    {\n        type: 'Function',\n        properties: []      - properties attached to this function\n        inputs: [],         - function inputs\n        returns: []         - function outputs\n    }\n\nClass with signature (note that class differs from variable in that class is a factory for a variable of the same type):\ni.e. a = Class, b = Class() -> a is a class, b is a variable (instance of class)\n    {\n        type: 'Class',\n        properties: []      - class properties and static methods\n        inputs: [],         - constructor signature\n        returns: [],        - instance signature (array for consistency, length should always be one)\n    }\n\nOn assignment, multiple variables/properties can be linked to the same timeline, for omnipotent checks we will need to pass\nthrough the code at least twice (first time to populate the timeline, second time to analyze all possible states - especially\nimportant for properties). Perhaps we can just revisit properties directly, if we have pointers to them."        },
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(name, initialType, enforced){
                var ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8;
                var self = this;
                initialType = initialType === void 0 ? null : initialType;
                enforced = enforced === void 0 ? null : enforced;
                var element, properties, prop;
                self.name = name;
                self.references = 0;
                if (enforced) {
                    self.enforced = [];
                    ՐՏitr7 = ՐՏ_Iterable(enforced);
                    for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                        element = ՐՏitr7[ՐՏidx7];
                        self.enforced.push(normalize(element));
                    }
                }
                self.timeline = [];
                self.properties = {};
                if (initialType) {
                    properties = initialType.properties;
                    delete initialType.properties;
                    if (properties) {
                        ՐՏitr8 = ՐՏ_Iterable(properties);
                        for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                            prop = ՐՏitr8[ՐՏidx8];
                            self.properties[prop] = new Timeline(self.name + "." + prop, properties[prop]);
                        }
                    }
                    self.setVar(initialType);
                }
                self.delayedLogic = {
                    "call": []
                };
            }
        },
        setVar: {
            enumerable: true, 
            writable: true, 
            value: function setVar(arg){
                var ՐՏitr9, ՐՏidx9, ՐՏitr11, ՐՏidx11;
                var self = this;
                var variable, found, varType, elem, expectedTypes, existing;
                variable = normalize(arg);
                if (self.enforced) {
                    found = false;
                    ՐՏitr9 = ՐՏ_Iterable(self.enforced);
                    for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                        varType = ՐՏitr9[ՐՏidx9];
                        if ((varType === variable || typeof varType === "object" && ՐՏ_eq(varType, variable))) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        expectedTypes = (function() {
                            var ՐՏidx10, ՐՏitr10 = ՐՏ_Iterable(self.enforced), ՐՏres = [], elem;
                            for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                                elem = ՐՏitr10[ՐՏidx10];
                                ՐՏres.push(stringifySignature(elem));
                            }
                            return ՐՏres;
                        })().join(" or ");
                        self.error("Can't assign value of type " + stringifySignature(variable) + " to '" + self.name + "', allowed type: " + expectedTypes);
                    }
                } else {
                    ՐՏitr11 = ՐՏ_Iterable(self.timeline);
                    for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                        existing = ՐՏitr11[ՐՏidx11];
                        if ((variable === existing || typeof variable === "object" && ՐՏ_eq(variable, existing))) {
                            return;
                        }
                    }
                    self.timeline.push(variable);
                }
            }
        },
        setSignature: {
            enumerable: true, 
            writable: true, 
            value: function setSignature(signature){
                var ՐՏitr12, ՐՏidx12, ՐՏitr13, ՐՏidx13;
                var self = this;
                var newVar, found, variable, origVar, elem, expectedTypes;
                if (self.enforced) {
                    ՐՏitr12 = ՐՏ_Iterable(signature);
                    for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                        newVar = ՐՏitr12[ՐՏidx12];
                        found = false;
                        variable = normalize(newVar);
                        ՐՏitr13 = ՐՏ_Iterable(self.enforced);
                        for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                            origVar = ՐՏitr13[ՐՏidx13];
                            if ((origVar === variable || typeof origVar === "object" && ՐՏ_eq(origVar, variable))) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            expectedTypes = (function() {
                                var ՐՏidx14, ՐՏitr14 = ՐՏ_Iterable(self.enforced), ՐՏres = [], elem;
                                for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                                    elem = ՐՏitr14[ՐՏidx14];
                                    ՐՏres.push(stringifySignature(elem));
                                }
                                return ՐՏres;
                            })().join(" or ");
                            self.error("Can't assign value of type " + stringifySignature(variable) + " to '" + self.name + "', allowed type: " + expectedTypes);
                        }
                    }
                }
                self.timeline = signature;
            }
        },
        setProperty: {
            enumerable: true, 
            writable: true, 
            value: function setProperty(prop, arg){
                var self = this;
                var variable;
                variable = normalize(arg);
                if (ՐՏ_in(prop, self.properties)) {
                    self.properties[prop].setVar(variable);
                } else {
                    self.properties[prop] = new Timeline(prop, variable);
                }
            }
        },
        addRef: {
            enumerable: true, 
            writable: true, 
            value: function addRef(){
                var self = this;
                ++self.references;
            }
        },
        alignInputs: {
            enumerable: true, 
            writable: true, 
            value: function alignInputs(inputs){
                var ՐՏitr15, ՐՏidx15, ՐՏitr16, ՐՏidx16, ՐՏupk1;
                var self = this;
                var signatureList, found, expectedSignature, argMisalignment, outputs, failed, namesStarted, idx, input, index;
                function byName(name) {
                    return function(element) {
                        return name === element.name;
                    };
                }
                if (self.enforced) {
                    signatureList = self.enforced;
                } else {
                    signatureList = self.timeline;
                }
                found = false;
                ՐՏitr15 = ՐՏ_Iterable(signatureList);
                for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                    expectedSignature = ՐՏitr15[ՐՏidx15];
                    if (ՐՏ_in(expectedSignature.type, [ "Function", "Class" ])) {
                        if (expectedSignature.inputs) {
                            argMisalignment = inputs.length - expectedSignature.inputs.length;
                            if (argMisalignment > 0 || argMisalignment < 0 && !expectedSignature.inputs[inputs.length].default) {
                                continue;
                            }
                            outputs = new Array(expectedSignature.inputs.length);
                            failed = false;
                            namesStarted = false;
                            ՐՏitr16 = ՐՏ_Iterable(enumerate(inputs));
                            for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                                ՐՏupk1 = ՐՏitr16[ՐՏidx16];
                                idx = ՐՏupk1[0];
                                input = ՐՏupk1[1];
                                if (namesStarted && !input.name) {
                                    self.error("Non-keyword argument after keyword argument in function call to " + self.name + "().");
                                }
                                if (input.name) {
                                    namesStarted = true;
                                    index = expectedSignature.inputs.findIndex(byName(input.name));
                                    if (index === -1) {
                                        failed = true;
                                        break;
                                    } else if (outputs[index]) {
                                        self.error("" + self.name + "() got multiple values for keyword argument '" + input.name + "'");
                                    } else {
                                        outputs[index] = input;
                                    }
                                } else {
                                    outputs[idx] = input;
                                }
                            }
                            if (!failed) {
                                found = true;
                                return outputs;
                            }
                        } else {
                            found = true;
                            continue;
                        }
                    }
                }
                return null;
            }
        },
        addCall: {
            enumerable: true, 
            writable: true, 
            value: function addCall(inputs, alias){
                var ՐՏitr17, ՐՏidx17, ՐՏitr18, ՐՏidx18, ՐՏupk2, ՐՏitr19, ՐՏidx19, ՐՏitr20, ՐՏidx20, ՐՏitr23, ՐՏidx23;
                var self = this;
                alias = alias === void 0 ? self.name : alias;
                var signatureList, callable, found, returns, expectedSignature, matches, argMisalignment, index, timeline, newReturn, exists, existingReturn, elem, callSignature, allowedFunctions, command;
                ++self.references;
                if (self.enforced) {
                    signatureList = self.enforced;
                } else {
                    signatureList = self.timeline;
                }
                callable = false;
                found = false;
                returns = [];
                ՐՏitr17 = ՐՏ_Iterable(signatureList);
                for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                    expectedSignature = ՐՏitr17[ՐՏidx17];
                    matches = false;
                    if (ՐՏ_in(expectedSignature.type, [ "Function", "Class" ])) {
                        callable = true;
                        if (expectedSignature.inputs) {
                            argMisalignment = inputs.inputs.length - expectedSignature.inputs.length;
                            if (argMisalignment > 0 || argMisalignment < 0 && !expectedSignature.inputs[inputs.inputs.length].default) {
                                continue;
                            }
                            ՐՏitr18 = ՐՏ_Iterable(enumerate(inputs.inputs));
                            for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                                ՐՏupk2 = ՐՏitr18[ՐՏidx18];
                                index = ՐՏupk2[0];
                                timeline = ՐՏupk2[1];
                                if (self.enforced) {
                                    if (!timeline.canUseFor(expectedSignature.inputs[index])) {
                                        break;
                                    }
                                } else {
                                    if (!timeline.canUseFor(expectedSignature.inputs[index])) {
                                        break;
                                    }
                                }
                                if (index === inputs.inputs.length - 1) {
                                    matches = true;
                                    found = true;
                                }
                            }
                        } else {
                            found = true;
                            matches = true;
                        }
                        if (!matches) {
                            continue;
                        }
                        if (expectedSignature.returns) {
                            ՐՏitr19 = ՐՏ_Iterable(expectedSignature.returns);
                            for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                                newReturn = ՐՏitr19[ՐՏidx19];
                                exists = false;
                                if (newReturn.type === "?") {
                                    return {
                                        type: "?"
                                    };
                                }
                                ՐՏitr20 = ՐՏ_Iterable(returns);
                                for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                                    existingReturn = ՐՏitr20[ՐՏidx20];
                                    if ((newReturn === existingReturn || typeof newReturn === "object" && ՐՏ_eq(newReturn, existingReturn))) {
                                        exists = true;
                                        break;
                                    }
                                }
                                if (!exists) {
                                    returns.push(newReturn);
                                }
                            }
                        } else {
                            returns = [ {
                                type: "?"
                            } ];
                            break;
                        }
                    }
                }
                if (!callable) {
                    self.error("'" + alias + "' is not a callable object");
                } else if (!found) {
                    callSignature = (function() {
                        var ՐՏidx21, ՐՏitr21 = ՐՏ_Iterable(inputs.inputs), ՐՏres = [], elem;
                        for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                            elem = ՐՏitr21[ՐՏidx21];
                            ՐՏres.push(elem.stringify());
                        }
                        return ՐՏres;
                    })().join(", ");
                    allowedFunctions = (function() {
                        var ՐՏidx22, ՐՏitr22 = ՐՏ_Iterable(signatureList), ՐՏres = [], elem;
                        for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                            elem = ՐՏitr22[ՐՏidx22];
                            if (elem.type === "Function") {
                                ՐՏres.push(stringifySignature(elem));
                            }
                        }
                        return ՐՏres;
                    })().join(" or ");
                    self.error("Can't call function " + alias + " with signature 'Function(" + callSignature + ")', allowed signatures: " + allowedFunctions);
                }
                ՐՏitr23 = ՐՏ_Iterable(self.delayedLogic["call"]);
                for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                    command = ՐՏitr23[ՐՏidx23];
                    command(inputs);
                }
                return returns;
            }
        },
        onCall: {
            enumerable: true, 
            writable: true, 
            value: function onCall(function_){
                var self = this;
                self.delayedLogic["call"].push(function_);
            }
        },
        getSignature: {
            enumerable: true, 
            writable: true, 
            value: function getSignature(){
                var self = this;
                if (self.enforced) {
                    return self.enforced;
                } else {
                    return self.timeline;
                }
            }
        },
        stringify: {
            enumerable: true, 
            writable: true, 
            value: function stringify(){
                var self = this;
                var sig, x;
                sig = self.getSignature();
                return (function() {
                    var ՐՏidx24, ՐՏitr24 = ՐՏ_Iterable(sig), ՐՏres = [], x;
                    for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                        x = ՐՏitr24[ՐՏidx24];
                        ՐՏres.push(stringifySignature(x));
                    }
                    return ՐՏres;
                })().join(" or ");
            }
        },
        getProperty: {
            enumerable: true, 
            writable: true, 
            value: function getProperty(){
                var ՐՏitr25, ՐՏidx25;
                var self = this;
                var props = [].slice.call(arguments, 0);
                var timeline, prop;
                timeline = self.properties;
                ՐՏitr25 = ՐՏ_Iterable(props);
                for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
                    prop = ՐՏitr25[ՐՏidx25];
                    timeline = timeline[prop];
                    if (!timeline) {
                        return null;
                    }
                }
                return prop;
            }
        },
        canUseFor: {
            enumerable: true, 
            writable: true, 
            value: function canUseFor(expectedType){
                var ՐՏitr26, ՐՏidx26;
                var self = this;
                var vars, possibleType;
                expectedType = normalize(expectedType);
                vars = self.getSignature();
                ՐՏitr26 = ՐՏ_Iterable(vars);
                for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                    possibleType = ՐՏitr26[ՐՏidx26];
                    while (possibleType) {
                        if (possibleType.type === expectedType.type || expectedType.type === "?") {
                            return true;
                        }
                        possibleType = possibleType.parent;
                    }
                }
                return false;
            }
        },
        canAlwaysUseFor: {
            enumerable: true, 
            writable: true, 
            value: function canAlwaysUseFor(expectedType){
                var self = this;
                if (self.getSignature().length === 1 && self.canUseFor(expectedType)) {
                    return true;
                }
                return false;
            }
        },
        addDelayed: {
            enumerable: true, 
            writable: true, 
            value: function addDelayed(function_){
                var self = this;
                self.delayedLogic.push(function_);
            }
        },
        triggerDelayed: {
            enumerable: true, 
            writable: true, 
            value: function triggerDelayed(){
                var ՐՏitr27, ՐՏidx27;
                var self = this;
                var function_;
                ՐՏitr27 = ՐՏ_Iterable(self.delayedLogic);
                for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
                    function_ = ՐՏitr27[ՐՏidx27];
                    function_();
                }
            }
        },
        warning: {
            enumerable: true, 
            writable: true, 
            value: function warning(message){
                var self = this;
                if (_warning) {
                    _warning(message);
                }
            }
        },
        error: {
            enumerable: true, 
            writable: true, 
            value: function error(message){
                var self = this;
                if (_error) {
                    _error(message);
                } else {
                    throw new Error(message);
                }
            }
        }
    }), ՐՏ_4);
    var State = (ՐՏ_5 = function State() {
        State.prototype.__init__.apply(this, arguments);
    }, Object.defineProperties(ՐՏ_5.prototype, {
        __init__: {
            enumerable: true, 
            writable: true, 
            value: function __init__(){
                var self = this;
                self.scopes = [];
                self.newScope("global");
                self.functionScope = -1;
                self.classScope = -1;
            }
        },
        newScope: {
            enumerable: true, 
            writable: true, 
            value: function newScope(scopeType, name, annotation){
                var self = this;
                name = name === void 0 ? null : name;
                annotation = annotation === void 0 ? null : annotation;
                var scope;
                self.scopes.push({
                    type: scopeType,
                    name: name,
                    vars: {},
                    functions: {},
                    classes: {},
                    nonlocal: {},
                    delayed: {
                        "endScope": [],
                        "call": []
                    }
                });
                if (scopeType === "class") {
                    self.classScope = self.scopes.length - 1;
                } else if (scopeType === "function") {
                    scope = self.scopes[self.scopes.length-1];
                    if (annotation) {
                        annotation.type = "Function";
                        scope.annotation = normalize(annotation);
                    }
                    scope.seenReturns = [];
                    scope.returned = false;
                    self.functionScope = self.scopes.length - 1;
                } else if (ՐՏ_in(scopeType, [ "if", "switch", "try" ])) {
                    scope = self.scopes[self.scopes.length-1];
                    scope.stages = [ {} ];
                    scope.final = false;
                }
            }
        },
        nextScopeStage: {
            enumerable: true, 
            writable: true, 
            value: function nextScopeStage(final){
                var self = this;
                final = final === void 0 ? false : final;
                var scope;
                scope = self.scopes[self.scopes.length-1];
                scope.stages.push({});
                scope.final = final;
            }
        },
        endScope: {
            enumerable: true, 
            writable: true, 
            value: function endScope(){
                var ՐՏitr28, ՐՏidx28, ՐՏupk3, ՐՏitr29, ՐՏidx29, ՐՏupk4, ՐՏ_6, ՐՏ_7, ՐՏitr32, ՐՏidx32, ՐՏupk5, ՐՏitr33, ՐՏidx33, ՐՏitr34, ՐՏidx34, ՐՏupk6, ՐՏitr35, ՐՏidx35, ՐՏitr36, ՐՏidx36, ՐՏitr38, ՐՏidx38, ՐՏitr39, ՐՏidx39, ՐՏitr40, ՐՏidx40;
                var self = this;
                var top, index, scope, x, inputs, element, declaration, existingTimeline, canUse, function_, arg, timeline, var_, signature, occursInAll, stage, functionScope, classScope, command;
                top = self.scopes.pop();
                if (top.type === "function") {
                    ՐՏitr28 = ՐՏ_Iterable(enumerate(reversed(self.scopes)));
                    for (ՐՏidx28 = 0; ՐՏidx28 < ՐՏitr28.length; ՐՏidx28++) {
                        ՐՏupk3 = ՐՏitr28[ՐՏidx28];
                        index = ՐՏupk3[0];
                        scope = ՐՏupk3[1];
                        if (scope.type === "function") {
                            self.functionScope = index;
                            break;
                        } else if (scope.type === "global") {
                            self.functionScope = -1;
                            break;
                        }
                    }
                } else if (top.type === "class") {
                    ՐՏitr29 = ՐՏ_Iterable(enumerate(reversed(self.scopes)));
                    for (ՐՏidx29 = 0; ՐՏidx29 < ՐՏitr29.length; ՐՏidx29++) {
                        ՐՏupk4 = ՐՏitr29[ՐՏidx29];
                        index = ՐՏupk4[0];
                        scope = ՐՏupk4[1];
                        if (scope.type === "class") {
                            self.classScope = index;
                            break;
                        } else if (scope.type === "global") {
                            self.classScope = -1;
                            break;
                        }
                    }
                }
                if (top.type === "function") {
                    if (top.annotation && top.annotation.returns && ((ՐՏ_6 = top.annotation.returns) !== (ՐՏ_7 = top.seenReturns) && (typeof ՐՏ_6 !== "object" || !ՐՏ_eq(ՐՏ_6, ՐՏ_7)))) {
                        self.error("Annotation states that function returns " + (function() {
                            var ՐՏidx30, ՐՏitr30 = ՐՏ_Iterable(top.annotation.returns), ՐՏres = [], x;
                            for (ՐՏidx30 = 0; ՐՏidx30 < ՐՏitr30.length; ՐՏidx30++) {
                                x = ՐՏitr30[ՐՏidx30];
                                ՐՏres.push(stringifySignature(x));
                            }
                            return ՐՏres;
                        })().join(" or ") + ", actual return types observed: " + ((function() {
                            var ՐՏidx31, ՐՏitr31 = ՐՏ_Iterable(top.seenReturns), ՐՏres = [], x;
                            for (ՐՏidx31 = 0; ՐՏidx31 < ՐՏitr31.length; ՐՏidx31++) {
                                x = ՐՏitr31[ՐՏidx31];
                                ՐՏres.push(stringifySignature(x));
                            }
                            return ՐՏres;
                        })().join(" or ") || "Undefined"));
                    }
                    if (top.name) {
                        if (top.annotation) {
                            inputs = [];
                            ՐՏitr32 = ՐՏ_Iterable(enumerate(top.annotation.inputs));
                            for (ՐՏidx32 = 0; ՐՏidx32 < ՐՏitr32.length; ՐՏidx32++) {
                                ՐՏupk5 = ՐՏitr32[ՐՏidx32];
                                index = ՐՏupk5[0];
                                element = ՐՏupk5[1];
                                inputs.push(Object.assign({
                                    name: top.args[index].name,
                                    default: top.args[index].default
                                }, element));
                            }
                            declaration = {
                                type: "Function",
                                inputs: inputs,
                                returns: top.annotation.returns
                            };
                        } else {
                            declaration = {
                                type: "Function",
                                returns: top.seenReturns
                            };
                            if (top.args) {
                                declaration.inputs = top.args;
                            }
                        }
                        existingTimeline = self.getTimeline(top.name);
                        if (existingTimeline && declaration.inputs) {
                            canUse = true;
                            ՐՏitr33 = ՐՏ_Iterable(existingTimeline.getSignature());
                            for (ՐՏidx33 = 0; ՐՏidx33 < ՐՏitr33.length; ՐՏidx33++) {
                                function_ = ՐՏitr33[ՐՏidx33];
                                if (function_.type === "Function") {
                                    ՐՏitr34 = ՐՏ_Iterable(enumerate(function_.inputs));
                                    for (ՐՏidx34 = 0; ՐՏidx34 < ՐՏitr34.length; ՐՏidx34++) {
                                        ՐՏupk6 = ՐՏitr34[ՐՏidx34];
                                        index = ՐՏupk6[0];
                                        arg = ՐՏupk6[1];
                                        if (arg.name !== declaration.inputs[index].name || arg.type !== declaration.inputs[index].type) {
                                            self.warning("Redefining earlier declaration of " + top.name + "() with incompatbile signature: " + stringifySignature(declaration) + ", allowed signatures: " + existingTimeline.stringify());
                                            canUse = false;
                                            break;
                                        }
                                    }
                                }
                                if (!canUse) {
                                    break;
                                }
                            }
                        }
                        timeline = self.scopes[self.scopes.length-1].functions[top.name] = new Timeline(top.name, declaration);
                    }
                } else if (top.type === "class") {
                    timeline = self.scopes[self.scopes.length-1].classes[top.name] = new Timeline(top.name, {
                        type: "Class",
                        properties: top.staticMethods,
                        returns: [ {
                            type: top.name,
                            parent: top.parent && top.parent.returns ? top.parent.returns[0] : null
                        } ]
                    });
                } else if (top.stages) {
                    "\n            constructs that will satisfy this and replace the timeline\n                if ...\n                elif ...\n                else ...\n\n                switch:\n                    case ...\n                    case ...\n                    default ...\n\n                try ...\n                except (if except captures ALL cases)\n\n            constructs that will not (if these constructs create a new variable, it can also have undefined state):\n                if ...\n                elif ...\n\n                switch:\n                    case ...\n                    case ...\n\n                while ...\n                for ...\n\n                try ...\n                except ...\n\n            constructs that will negate replacement of timeline:\n                try ...\n                except ...\n\n            (because uncaught error from a deeper scope can be caught by a raise here)\n            ";
                    ՐՏitr35 = ՐՏ_Iterable(top.stages[0]);
                    for (ՐՏidx35 = 0; ՐՏidx35 < ՐՏitr35.length; ՐՏidx35++) {
                        var_ = ՐՏitr35[ՐՏidx35];
                        signature = top.stages[0][var_];
                        occursInAll = true;
                        ՐՏitr36 = ՐՏ_Iterable(top.stages.slice(1));
                        for (ՐՏidx36 = 0; ՐՏidx36 < ՐՏitr36.length; ՐՏidx36++) {
                            stage = ՐՏitr36[ՐՏidx36];
                            if (ՐՏ_in(var_, stage)) {
                                signature = mergeArrays(signature, top.stages[top.stages.length-1][var_]);
                            } else {
                                occursInAll = false;
                            }
                        }
                        functionScope = self.getScopeIndex("function");
                        classScope = self.getScopeIndex("class");
                        if (occursInAll) {
                            if (self.scopes[self.scopes.length-1].stages) {
                                self.scopes[self.scopes.length-1].stages[var_] = signature;
                            } else if (functionScope > classScope) {
                                if (var_ !== "return") {
                                    self.onCall(function(input) {
                                        self.getTimeline(var_).setSignature(signature);
                                    }, "function");
                                }
                            } else {
                                if (var_ === "return") {
                                    self.error("Return outside a function.");
                                }
                                self.getTimeline(var_).setSignature(signature);
                            }
                        } else {
                            if (self.scopes[self.scopes.length-1].stages) {
                                if (self.scopes[self.scopes.length-1].stages[self.scopes[self.scopes.length-1].stages.length-1][var_]) {
                                    self.scopes[self.scopes.length-1].stages[self.scopes[self.scopes.length-1].stages.length-1][var_] = mergeArrays(self.scopes[self.scopes.length-1].stages[self.scopes[self.scopes.length-1].stages.length-1][var_], signature);
                                } else {
                                    self.scopes[self.scopes.length-1].stages[self.scopes[self.scopes.length-1].stages.length-1][var_] = mergeArrays(signature, [ normalize("Undefined") ]);
                                }
                            } else if (functionScope > classScope) {
                                if (var_ === "return") {
                                    self.setReturn("Undefined");
                                } else {
                                    self.onCall(function(input) {
                                        var ՐՏitr37, ՐՏidx37;
                                        var timeline, element;
                                        timeline = self.getTimeline(var_);
                                        ՐՏitr37 = ՐՏ_Iterable(signature);
                                        for (ՐՏidx37 = 0; ՐՏidx37 < ՐՏitr37.length; ՐՏidx37++) {
                                            element = ՐՏitr37[ՐՏidx37];
                                            timeline.setVar(element);
                                        }
                                    }, "function");
                                }
                            } else {
                                if (var_ === "return") {
                                    self.error("Return outside a function.");
                                }
                                ՐՏitr38 = ՐՏ_Iterable(signature);
                                for (ՐՏidx38 = 0; ՐՏidx38 < ՐՏitr38.length; ՐՏidx38++) {
                                    element = ՐՏitr38[ՐՏidx38];
                                    timeline.setVar(element);
                                }
                            }
                        }
                    }
                }
                if (timeline) {
                    ՐՏitr39 = ՐՏ_Iterable(top.delayed["call"]);
                    for (ՐՏidx39 = 0; ՐՏidx39 < ՐՏitr39.length; ՐՏidx39++) {
                        command = ՐՏitr39[ՐՏidx39];
                        timeline.onCall(command);
                    }
                }
                ՐՏitr40 = ՐՏ_Iterable(top.delayed["endScope"]);
                for (ՐՏidx40 = 0; ՐՏidx40 < ՐՏitr40.length; ՐՏidx40++) {
                    command = ՐՏitr40[ՐՏidx40];
                    command(top);
                }
                return top;
            }
        },
        setParent: {
            enumerable: true, 
            writable: true, 
            value: function setParent(name){
                var self = this;
                var scope, parent;
                scope = self.scopes[self.classScope];
                parent = self.getSignature(name)[0];
                if (parent.type === "?") {
                    parent.type = "Class";
                    parent.returns = [ {
                        type: name,
                        external: true
                    } ];
                    parent.external = true;
                }
                scope.parent = parent;
            }
        },
        setArgs: {
            enumerable: true, 
            writable: true, 
            value: function setArgs(args){
                var ՐՏitr41, ՐՏidx41;
                var self = this;
                var scope, defaultStarted, arg;
                scope = self.scopes[self.functionScope];
                if (scope.args) {
                    self.error("Redeclaration of arguments for " + self.name + "() is not allowed.");
                }
                if (scope.annotation && scope.annotation.inputs && scope.annotation.inputs.length !== args.length) {
                    self.error("Specified arguments don't line up with function annotation.");
                }
                defaultStarted = false;
                ՐՏitr41 = ՐՏ_Iterable(args);
                for (ՐՏidx41 = 0; ՐՏidx41 < ՐՏitr41.length; ՐՏidx41++) {
                    arg = ՐՏitr41[ՐՏidx41];
                    if (!arg.name) {
                        self.error("Invalid format for args in " + self.name + "() declaration, required format is an array of { name: 'string', ?default: ... }");
                    }
                    if (arg.default) {
                        defaultStarted = true;
                    } else {
                        if (defaultStarted) {
                            self.error("Missing default value for argument '" + arg.name + "' of function '" + scope.name + "'. Arguments with default values must come last in function declaration.");
                        }
                    }
                }
                scope.args = args;
            }
        },
        canUseFor: {
            enumerable: true, 
            writable: true, 
            value: function canUseFor(name, varType){
                var self = this;
                return self.getTimeline(name).canUseFor(varType);
            }
        },
        canAlwaysUseFor: {
            enumerable: true, 
            writable: true, 
            value: function canAlwaysUseFor(name, varType){
                var self = this;
                return self.getTimeline(name).canAlwaysUseFor(varType);
            }
        },
        markNonLocal: {
            enumerable: true, 
            writable: true, 
            value: function markNonLocal(name){
                var self = this;
                var scope;
                scope = self.getScopeIndex("function");
                if (scope.returned) {
                    self.error("Dead code after return statement.");
                }
                scope.nonlocal[name] = true;
            }
        },
        setVar: {
            enumerable: true, 
            writable: true, 
            value: function setVar(name, varType, enforced, local){
                var ՐՏitr42, ՐՏidx42;
                var self = this;
                enforced = enforced === void 0 ? null : enforced;
                local = local === void 0 ? true : local;
                var scope, functionScope, timeline, var_, vars;
                scope = self.scopes[self.scopes.length-1];
                functionScope = self.getScopeIndex("function");
                if (functionScope.returned || scope.stages && scope.stages[scope.stages.length-1]["return"]) {
                    self.error("Dead code after return statement.");
                }
                timeline = self.getTimeline(name, local);
                if (timeline) {
                    if (enforced) {
                        ՐՏitr42 = ՐՏ_Iterable(enforced);
                        for (ՐՏidx42 = 0; ՐՏidx42 < ՐՏitr42.length; ՐՏidx42++) {
                            var_ = ՐՏitr42[ՐՏidx42];
                            if (!timeline.canUseFor(var_)) {
                                self.error("Variable redeclaration (" + (function() {
                                    var ՐՏidx43, ՐՏitr43 = ՐՏ_Iterable(enforced), ՐՏres = [], var_;
                                    for (ՐՏidx43 = 0; ՐՏidx43 < ՐՏitr43.length; ՐՏidx43++) {
                                        var_ = ՐՏitr43[ՐՏidx43];
                                        ՐՏres.push(stringifySignature(var_));
                                    }
                                    return ՐՏres;
                                })().join(" or ") + ") for '" + name + "' conflicts with earlier format: " + timeline.stringify());
                            }
                        }
                    }
                    if (!scope.stages) {
                        timeline.setVar(varType);
                    }
                } else {
                    vars = self.scopes[Math.max(0, self.classScope, self.functionScope)].vars;
                    if (scope.stages) {
                        vars[name] = new Timeline(name, "Undefined", enforced);
                    } else {
                        vars[name] = new Timeline(name, varType, enforced);
                    }
                }
                if (scope.stages) {
                    if (ՐՏ_in(name, scope.stages[scope.stages.length-1])) {
                        scope.stages[scope.stages.length-1][name].push(normalize(varType));
                    } else {
                        scope.stages[scope.stages.length-1][name] = [ normalize(varType) ];
                    }
                }
            }
        },
        setReturn: {
            enumerable: true, 
            writable: true, 
            value: function setReturn(varType){
                var ՐՏitr44, ՐՏidx44, ՐՏitr45, ՐՏidx45, ՐՏitr47, ՐՏidx47;
                var self = this;
                var actual, functionScopeIndex, functionScope, classScopeIndex, scope, expected, seen, x;
                actual = normalize(varType);
                functionScopeIndex = self.getScopeIndex("function");
                functionScope = self.scopes[functionScopeIndex];
                classScopeIndex = self.getScopeIndex("class");
                scope = self.scopes[self.scopes.length-1];
                if (functionScope.returned || scope.stages && scope.stages[scope.stages.length-1]["return"]) {
                    self.error("Dead code after return statement.");
                }
                if (scope.stages && functionScopeIndex > classScopeIndex) {
                    scope.stages[scope.stages.length-1]["return"] = true;
                } else if (scope.type === "function") {
                    scope.returned = true;
                } else {
                    self.error("Return outside function.");
                }
                if (functionScope.annotation && functionScope.annotation.returns) {
                    ՐՏitr44 = ՐՏ_Iterable(functionScope.annotation.returns);
                    for (ՐՏidx44 = 0; ՐՏidx44 < ՐՏitr44.length; ՐՏidx44++) {
                        expected = ՐՏitr44[ՐՏidx44];
                        if ((expected === actual || typeof expected === "object" && ՐՏ_eq(expected, actual))) {
                            ՐՏitr45 = ՐՏ_Iterable(functionScope.seenReturns);
                            for (ՐՏidx45 = 0; ՐՏidx45 < ՐՏitr45.length; ՐՏidx45++) {
                                seen = ՐՏitr45[ՐՏidx45];
                                if ((actual === seen || typeof actual === "object" && ՐՏ_eq(actual, seen))) {
                                    return;
                                }
                            }
                            functionScope.seenReturns.push(actual);
                            return;
                        }
                    }
                    self.error("Annotation states that function returns " + (function() {
                        var ՐՏidx46, ՐՏitr46 = ՐՏ_Iterable(functionScope.annotation.returns), ՐՏres = [], x;
                        for (ՐՏidx46 = 0; ՐՏidx46 < ՐՏitr46.length; ՐՏidx46++) {
                            x = ՐՏitr46[ՐՏidx46];
                            ՐՏres.push(stringifySignature(x));
                        }
                        return ՐՏres;
                    })().join(" or ") + ", actual return type: " + stringifySignature(actual));
                } else {
                    ՐՏitr47 = ՐՏ_Iterable(functionScope.seenReturns);
                    for (ՐՏidx47 = 0; ՐՏidx47 < ՐՏitr47.length; ՐՏidx47++) {
                        seen = ՐՏitr47[ՐՏidx47];
                        if ((actual === seen || typeof actual === "object" && ՐՏ_eq(actual, seen))) {
                            return;
                        }
                    }
                    functionScope.seenReturns.push(actual);
                }
            }
        },
        addRef: {
            enumerable: true, 
            writable: true, 
            value: function addRef(name){
                var self = this;
                var scope, functionScope, timeline;
                scope = self.scopes[self.scopes.length-1];
                functionScope = self.getScopeIndex("function");
                if (functionScope.returned || scope.stages && scope.stages[scope.stages.length-1]["return"]) {
                    self.error("Dead code after return statement.");
                }
                timeline = self.getTimeline(name);
                if (timeline) {
                    timeline.addRef();
                }
                return timeline;
            }
        },
        onEndScope: {
            enumerable: true, 
            writable: true, 
            value: function onEndScope(function_, scopeType){
                var self = this;
                scopeType = scopeType === void 0 ? null : scopeType;
                var index;
                index = scopeType ? self.getScopeIndex(scopeType) : self.scopes.length - 1;
                self.scopes[index].delayed["endScope"].push(function_);
            }
        },
        onCall: {
            enumerable: true, 
            writable: true, 
            value: function onCall(function_, scopeType){
                var self = this;
                scopeType = scopeType === void 0 ? null : scopeType;
                var index;
                index = scopeType ? self.getScopeIndex(scopeType) : self.scopes.length - 1;
                self.scopes[index].delayed["call"].push(function_);
            }
        },
        alignInputs: {
            enumerable: true, 
            writable: true, 
            value: function alignInputs(name, inputs){
                var self = this;
                var timeline;
                timeline = self.getTimeline(name);
                if (timeline) {
                    return timeline.alignInputs(inputs);
                } else {
                    return null;
                }
            }
        },
        addCall: {
            enumerable: true, 
            writable: true, 
            value: function addCall(name, signature){
                var self = this;
                var scope, functionScope, timeline;
                scope = self.scopes[self.scopes.length-1];
                functionScope = self.getScopeIndex("function");
                if (functionScope.returned || scope.stages && scope.stages[scope.stages.length-1]["return"]) {
                    self.error("Dead code after return statement.");
                }
                timeline = self.getTimeline(name);
                if (timeline) {
                    timeline.addCall(signature);
                }
            }
        },
        getSignature: {
            enumerable: true, 
            writable: true, 
            value: function getSignature(name){
                var self = this;
                var timeline;
                timeline = self.getTimeline(name);
                if (timeline) {
                    return timeline.getSignature();
                } else {
                    return [ {
                        type: "?"
                    } ];
                }
            }
        },
        getTimeline: {
            enumerable: true, 
            writable: true, 
            value: function getTimeline(name, local){
                var self = this;
                local = local === void 0 ? false : local;
                var timeline, index;
                timeline = null;
                index = self.scopes.length - 1;
                while (!timeline && index >= 0) {
                    if (ՐՏ_in(name, self.scopes[index].vars)) {
                        timeline = self.scopes[index].vars[name];
                    } else if (ՐՏ_in(name, self.scopes[index].functions)) {
                        timeline = self.scopes[index].functions[name];
                    } else if (ՐՏ_in(name, self.scopes[index].classes)) {
                        timeline = self.scopes[index].classes[name];
                    } else if (!local || self.functionScope > 0 && ՐՏ_in(name, self.scopes[self.functionScope].nonlocal)) {
                        --index;
                    } else {
                        break;
                    }
                }
                return timeline;
            }
        },
        getScopeIndex: {
            enumerable: true, 
            writable: true, 
            value: function getScopeIndex(scopeType){
                var ՐՏitr48, ՐՏidx48, ՐՏupk7;
                var self = this;
                var index, scope;
                ՐՏitr48 = ՐՏ_Iterable(enumerate(reversed(self.scopes)));
                for (ՐՏidx48 = 0; ՐՏidx48 < ՐՏitr48.length; ՐՏidx48++) {
                    ՐՏupk7 = ՐՏitr48[ՐՏidx48];
                    index = ՐՏupk7[0];
                    scope = ՐՏupk7[1];
                    if (scope.type === scopeType) {
                        return self.scopes.length - index - 1;
                    }
                }
                return -1;
            }
        },
        onWarning: {
            enumerable: true, 
            writable: true, 
            value: function onWarning(callback){
                var self = this;
                _warning = callback;
            }
        },
        warning: {
            enumerable: true, 
            writable: true, 
            value: function warning(message){
                var self = this;
                if (_warning) {
                    _warning(message);
                }
            }
        },
        onError: {
            enumerable: true, 
            writable: true, 
            value: function onError(callback){
                var self = this;
                _error = callback;
            }
        },
        error: {
            enumerable: true, 
            writable: true, 
            value: function error(message){
                var self = this;
                if (_error) {
                    _error(message);
                } else {
                    throw new Error(message);
                }
            }
        }
    }), ՐՏ_5);
    ՐՏ_modules["interstate"]["_warning"] = _warning;

    ՐՏ_modules["interstate"]["_error"] = _error;

    ՐՏ_modules["interstate"]["byType"] = byType;

    ՐՏ_modules["interstate"]["mergeArrays"] = mergeArrays;

    ՐՏ_modules["interstate"]["normalize"] = normalize;

    ՐՏ_modules["interstate"]["stringifySignature"] = stringifySignature;

    ՐՏ_modules["interstate"]["Var"] = Var;

    ՐՏ_modules["interstate"]["Func"] = Func;

    ՐՏ_modules["interstate"]["Class"] = Class;

    ՐՏ_modules["interstate"]["Timeline"] = Timeline;

    ՐՏ_modules["interstate"]["State"] = State;
})();

(function(){

    var __name__ = "__main__";

    var ՐՏ_8, ՐՏ_9, ՐՏ_10, ՐՏ_11, ՐՏ_12, ՐՏ_13, ՐՏ_14, ՐՏ_15, ՐՏ_16, ՐՏ_17, ՐՏ_18, ՐՏ_19, ՐՏ_20, ՐՏ_21;
    var assert, lax, num, nested, strict, s, lax1, boolean, strict1, string, jack, tom, einstein, input;
    var State = ՐՏ_modules["interstate"].State;
    var Timeline = ՐՏ_modules["interstate"].Timeline;
    
    assert = require("assert");
    "\nBasic Timeline Tests:\n\n    These tests test the features of a timeline object in a vacuum, as if all\n    assignments and uses happen in the same scope. We're not yet concerned with\n    tracking this timeline through scopes.\n";
    lax = new Timeline("foo", "Number");
    assert(lax.canAlwaysUseFor("Number"));
    lax.setVar("String");
    assert(lax.canUseFor("Number"));
    assert(lax.canUseFor("String"));
    assert(!lax.canUseFor("Boolean"));
    assert(!lax.canAlwaysUseFor("Number"));
    num = new Timeline("num", "Number");
    assert.throws(function() {
        lax.addCall({
            inputs: [ num ]
        });
    }, /not a callable object/);
    lax.setVar({
        type: "Function",
        inputs: [ "Number" ],
        returns: [ "Number" ]
    });
    assert(((ՐՏ_8 = lax.addCall({
        inputs: [ num ]
    })) === (ՐՏ_9 = [ {
        type: "Number"
    } ]) || typeof ՐՏ_8 === "object" && ՐՏ_eq(ՐՏ_8, ՐՏ_9)));
    assert.throws(function() {
        lax.addCall({
            inputs: []
        });
    }, /allowed signatures/);
    nested = new Timeline("baz", {
        type: "Function",
        inputs: [ "Number", "Number" ],
        returns: [ "Beans", "Nuts" ]
    });
    assert.throws(function() {
        lax.addCall({
            inputs: [ nested ]
        }, "biz");
    }, /allowed signatures/);
    lax.setVar({
        type: "Function",
        inputs: [ {
            type: "Function",
            inputs: [ "Number", "Number" ],
            returns: [ "Beans", "Nuts" ]
        } ],
        returns: [ "Apples" ]
    });
    assert(((ՐՏ_10 = lax.addCall({
        inputs: [ nested ]
    }, "biz")) === (ՐՏ_11 = [ {
        type: "Apples"
    } ]) || typeof ՐՏ_10 === "object" && ՐՏ_eq(ՐՏ_10, ՐՏ_11)));
    strict = new Timeline("foo", "Number", [ "Number", "Boolean" ]);
    strict.setVar("Number");
    strict.setVar("Boolean");
    assert.throws(function() {
        strict.setVar("String");
    }, /Can't assign value of type/);
    "\nState Tests:\n\n    These tests test the interaction of state and timelines, how timelines are generated\n    based on current state and how they can be manipulated.\n";
    s = new State();
    s.newScope("function", "foo");
    s.newScope("if");
    s.setReturn("RegExp");
    s.nextScopeStage();
    s.setReturn("String");
    s.endScope();
    s.endScope();
    lax1 = s.getTimeline("foo");
    boolean = new Timeline("boolean", "Boolean");
    assert(((ՐՏ_12 = lax1.addCall({
        inputs: [ num, boolean ]
    })) === (ՐՏ_13 = [ {
        type: "RegExp"
    }, {
        type: "String"
    } ]) || typeof ՐՏ_12 === "object" && ՐՏ_eq(ՐՏ_12, ՐՏ_13)));
    function setupBar() {
        s.newScope("function", "bar", {
            inputs: [ "Number" ],
            returns: [ "String", "Number" ]
        });
        s.setArgs([ {
            name: "z"
        } ]);
    }
    setupBar();
    assert.throws(function() {
        s.setReturn("Boolean");
    }, /Annotation states that function returns/);
    assert.throws(function() {
        s.endScope();
    }, /Annotation states that function returns/);
    setupBar();
    s.setReturn("Number");
    s.setReturn("Number");
    assert.throws(function() {
        s.endScope();
    }, /Annotation states that function returns/);
    setupBar();
    s.setReturn("Number");
    s.setReturn("String");
    s.endScope();
    strict1 = s.getTimeline("bar");
    string = new Timeline("string", "String");
    assert.throws(function() {
        strict1.addCall({
            inputs: [ string ]
        });
    }, /allowed signatures/);
    assert(((ՐՏ_14 = strict1.addCall({
        inputs: [ num ]
    })) === (ՐՏ_15 = [ {
        type: "Number"
    }, {
        type: "String"
    } ]) || typeof ՐՏ_14 === "object" && ՐՏ_eq(ՐՏ_14, ՐՏ_15)));
    s.newScope("class", "Human");
    s.setParent("Animalia");
    s.endScope();
    jack = new Timeline("jack", s.getTimeline("Human").addCall({
        inputs: []
    })[0]);
    assert(((ՐՏ_16 = jack.getSignature()) === (ՐՏ_17 = [ {
        type: "Human",
        parent: {
            type: "Animalia",
            external: true
        }
    } ]) || typeof ՐՏ_16 === "object" && ՐՏ_eq(ՐՏ_16, ՐՏ_17)));
    s.newScope("class", "Scientist");
    s.setParent("Human");
    s.endScope();
    tom = new Timeline("tom", s.getTimeline("Scientist").addCall({
        inputs: []
    })[0]);
    tom.setVar("Number");
    s.newScope("class", "Physicist");
    s.setParent("Scientist");
    s.endScope();
    einstein = new Timeline("einstein", s.getTimeline("Physicist").addCall({
        inputs: []
    })[0]);
    assert(jack.canAlwaysUseFor("Human"));
    assert(!jack.canAlwaysUseFor("Scientist"));
    assert(tom.canUseFor("Human"));
    assert(!tom.canAlwaysUseFor("Human"));
    assert(einstein.canAlwaysUseFor("Animalia"));
    s.newScope("function");
    s.setVar("hello", "String", [ "String" ]);
    assert.throws(function() {
        s.setVar("hello", "Number");
    }, /Can't assign value of type/);
    assert.throws(function() {
        s.setVar("hello", "Number", [ "Number", "String" ]);
    }, /conflicts with earlier format/);
    s.setVar("hello", "String");
    s.newScope("function");
    s.setVar("hello", "Number");
    s.endScope();
    assert.throws(function() {
        s.setVar("hello", "Number");
    }, /Can't assign value of type/);
    s.newScope("function");
    s.markNonLocal("hello");
    assert.throws(function() {
        s.setVar("hello", "Number");
    }, /Can't assign value of type/);
    s.endScope();
    s.newScope("function");
    assert(((ՐՏ_18 = s.getTimeline("hello").getSignature()) === (ՐՏ_19 = [ {
        type: "String"
    } ]) || typeof ՐՏ_18 === "object" && ՐՏ_eq(ՐՏ_18, ՐՏ_19)));
    s.endScope();
    s.endScope();
    s.newScope("function", "bar1");
    assert.throws(function() {
        s.setArgs([ "a", "b", "c" ]);
    }, /Invalid format/);
    assert.throws(function() {
        s.setArgs([ {
            name: "a",
            default: "test"
        }, {
            name: "b"
        }, {
            name: "c"
        } ]);
    }, /Arguments with default values must come last/);
    s.setArgs([ {
        name: "a"
    }, {
        name: "b"
    }, {
        name: "c",
        default: "test"
    } ]);
    assert.throws(function() {
        s.setArgs([ {
            name: "a"
        }, {
            name: "b"
        }, {
            name: "c"
        } ]);
    }, /Redeclaration of arguments/);
    s.endScope();
    assert.throws(function() {
        s.addCall("bar1", {
            inputs: [ num, num, num, num ]
        });
    }, /allowed signatures/);
    assert.throws(function() {
        s.addCall("bar1", {
            inputs: [ num ]
        });
    }, /allowed signatures/);
    s.addCall("bar1", {
        inputs: [ num, num ]
    });
    s.addCall("bar1", {
        inputs: [ num, num, num ]
    });
    s.onWarning(function(message) {
        throw message;
    });
    s.newScope("function", "bar1");
    s.setArgs([ {
        name: "z"
    } ]);
    assert.throws(function() {
        s.endScope();
    }, /Redefining earlier declaration/);
    "\nnow let's try compile-time kwargs resolution:\n\ndef bar1(a, b, c):  # already declared\n    ...\n\nbar1(c=num, a, b)       # error\nbar1(a, b, a=num)       # error\nbar1(a, c=num, b=num)   # ok\n";
    assert.throws(function() {
        ՐՏ_print(s.alignInputs("bar1", [ {
            name: "c",
            data: num
        }, {
            data: num
        }, {
            data: num
        } ]));
    }, /Non-keyword argument after keyword argument/);
    assert.throws(function() {
        ՐՏ_print(s.alignInputs("bar1", [ {
            data: num
        }, {
            data: num
        }, {
            name: "a",
            data: num
        } ]));
    }, /got multiple values for keyword argument/);
    assert(((ՐՏ_20 = (function() {
        var ՐՏidx49, ՐՏitr49 = ՐՏ_Iterable(s.alignInputs("bar1", [ {
            data: "foo"
        }, {
            name: "c",
            data: "baz"
        }, {
            name: "b",
            data: "bar"
        } ])), ՐՏres = [], input;
        for (ՐՏidx49 = 0; ՐՏidx49 < ՐՏitr49.length; ՐՏidx49++) {
            input = ՐՏitr49[ՐՏidx49];
            ՐՏres.push(input.data);
        }
        return ՐՏres;
    })()) === (ՐՏ_21 = [ "foo", "bar", "baz" ]) || typeof ՐՏ_20 === "object" && ՐՏ_eq(ՐՏ_20, ՐՏ_21)));
    "\ndef qux(d:Number):\n    pass\n\na = 'foo'\ndef baz(b:Number, c:Number) -> Number:\n    qux(a)\n    return b + c\n\na = 4\nbaz(1, 2)\n";
    s.newScope("function", "qux", {
        inputs: [ "Number" ],
        returns: []
    });
    s.setArgs([ {
        name: "d"
    } ]);
    s.endScope();
    s.setVar("a", "String");
    s.newScope("function", "baz", {
        inputs: [ "Number", "Number" ],
        returns: [ "Number" ]
    });
    s.setArgs([ {
        name: "b"
    }, {
        name: "c"
    } ]);
    assert.throws(function() {
        s.addCall("qux", {
            inputs: [ s.getTimeline("a") ]
        });
    }, /allowed signatures/);
    s.onCall(function(callSignature) {
        s.addCall("qux", {
            inputs: [ s.getTimeline("a") ]
        });
    });
    s.setReturn("Number");
    s.endScope();
    s.setVar("a", "Number");
    s.addCall("baz", {
        inputs: [ num, num ]
    });
    ՐՏ_print("ALL TESTS PASSED");
})();
})();

