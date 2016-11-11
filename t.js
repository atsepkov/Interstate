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
    var ՐՏitr38, ՐՏidx38;
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
            ՐՏitr38 = ՐՏ_Iterable(a);
            for (ՐՏidx38 = 0; ՐՏidx38 < ՐՏitr38.length; ՐՏidx38++) {
                i = ՐՏitr38[ՐՏidx38];
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
    function byType(a, b) {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
            return 1;
        }
        return 0;
    }
    function normalize(arg) {
        var x;
        if (!arg) {
            throw new Error("No argument specified");
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
                    var ՐՏidx1, ՐՏitr1 = ՐՏ_Iterable(arg.inputs), ՐՏres = [], x;
                    for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
                        x = ՐՏitr1[ՐՏidx1];
                        ՐՏres.push(normalize(x));
                    }
                    return ՐՏres;
                })();
            }
            if (arg.returns) {
                arg.returns = (function() {
                    var ՐՏidx2, ՐՏitr2 = ՐՏ_Iterable(arg.returns), ՐՏres = [], x;
                    for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                        x = ՐՏitr2[ՐՏidx2];
                        ՐՏres.push(normalize(x));
                    }
                    return ՐՏres;
                })().sort(byType);
            }
            return arg;
        }
        throw new Error("Unexpected type passed into variable declaration: " + ՐՏ_type(arg) + ", expected types: String or Object");
    }
    function stringifySignature(varType) {
        var element, arg, signature, returns;
        element = ՐՏ_type(varType) === "String" ? normalize(varType) : varType;
        if ((element.type === "Function" || !element.type) && element.inputs) {
            signature = "Function(" + (function() {
                var ՐՏidx3, ՐՏitr3 = ՐՏ_Iterable(element.inputs), ՐՏres = [], arg;
                for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
                    arg = ՐՏitr3[ՐՏidx3];
                    ՐՏres.push(stringifySignature(arg));
                }
                return ՐՏres;
            })().join(", ") + ")";
            if (element.returns) {
                returns = (function() {
                    var ՐՏidx4, ՐՏitr4 = ՐՏ_Iterable(element.returns), ՐՏres = [], arg;
                    for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
                        arg = ՐՏitr4[ՐՏidx4];
                        ՐՏres.push(stringifySignature(arg));
                    }
                    return ՐՏres;
                })().join(" or ");
                signature += " -> " + (element.returns.length > 1 ? "(" + returns + ")" : returns || "Undefined");
            }
            return signature;
        }
        return element.type;
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
                    throw new Error("Unknown argument type passed into function declaration");
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
                var ՐՏitr5, ՐՏidx5, ՐՏitr6, ՐՏidx6;
                var self = this;
                initialType = initialType === void 0 ? null : initialType;
                enforced = enforced === void 0 ? null : enforced;
                var element, properties, prop;
                self.name = name;
                self.references = 0;
                if (enforced) {
                    self.enforced = [];
                    ՐՏitr5 = ՐՏ_Iterable(enforced);
                    for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                        element = ՐՏitr5[ՐՏidx5];
                        self.enforced.push(normalize(element));
                    }
                }
                self.timeline = [];
                self.properties = {};
                if (initialType) {
                    properties = initialType.properties;
                    delete initialType.properties;
                    if (properties) {
                        ՐՏitr6 = ՐՏ_Iterable(properties);
                        for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                            prop = ՐՏitr6[ՐՏidx6];
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
                var ՐՏitr7, ՐՏidx7, ՐՏitr9, ՐՏidx9;
                var self = this;
                var variable, found, varType, elem, expectedTypes, existing;
                variable = normalize(arg);
                if (self.enforced) {
                    found = false;
                    ՐՏitr7 = ՐՏ_Iterable(self.enforced);
                    for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                        varType = ՐՏitr7[ՐՏidx7];
                        if ((varType === variable || typeof varType === "object" && ՐՏ_eq(varType, variable))) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        expectedTypes = (function() {
                            var ՐՏidx8, ՐՏitr8 = ՐՏ_Iterable(self.enforced), ՐՏres = [], elem;
                            for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                                elem = ՐՏitr8[ՐՏidx8];
                                ՐՏres.push(stringifySignature(elem));
                            }
                            return ՐՏres;
                        })().join(" or ");
                        throw new Error("Can't assign value of type " + stringifySignature(variable) + " to '" + self.name + "', allowed type: " + expectedTypes);
                    }
                } else {
                    ՐՏitr9 = ՐՏ_Iterable(self.timeline);
                    for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                        existing = ՐՏitr9[ՐՏidx9];
                        if ((variable === existing || typeof variable === "object" && ՐՏ_eq(variable, existing))) {
                            return;
                        }
                    }
                    self.timeline.push(variable);
                }
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
                var ՐՏitr10, ՐՏidx10, ՐՏitr11, ՐՏidx11, ՐՏupk1;
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
                ՐՏitr10 = ՐՏ_Iterable(signatureList);
                for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
                    expectedSignature = ՐՏitr10[ՐՏidx10];
                    if (ՐՏ_in(expectedSignature.type, [ "Function", "Class" ])) {
                        if (expectedSignature.inputs) {
                            argMisalignment = inputs.length - expectedSignature.inputs.length;
                            if (argMisalignment > 0 || argMisalignment < 0 && !expectedSignature.inputs[inputs.length].default) {
                                continue;
                            }
                            outputs = new Array(expectedSignature.inputs.length);
                            failed = false;
                            namesStarted = false;
                            ՐՏitr11 = ՐՏ_Iterable(enumerate(inputs));
                            for (ՐՏidx11 = 0; ՐՏidx11 < ՐՏitr11.length; ՐՏidx11++) {
                                ՐՏupk1 = ՐՏitr11[ՐՏidx11];
                                idx = ՐՏupk1[0];
                                input = ՐՏupk1[1];
                                if (namesStarted && !input.name) {
                                    throw new Error("Non-keyword argument after keyword argument in function call to '" + self.name + "'.");
                                }
                                if (input.name) {
                                    namesStarted = true;
                                    index = expectedSignature.inputs.indexOf(byName(input.name));
                                    if (index === -1) {
                                        failed = true;
                                        break;
                                    } else if (expectedSignature.inputs[index]) {
                                        throw new Error("" + self.name + "() got multiple values for keyword argument '" + input.name + "'");
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
                var ՐՏitr12, ՐՏidx12, ՐՏitr13, ՐՏidx13, ՐՏupk2, ՐՏitr14, ՐՏidx14, ՐՏitr15, ՐՏidx15, ՐՏitr19, ՐՏidx19;
                var self = this;
                alias = alias === void 0 ? self.name : alias;
                var signatureList, callable, found, returns, expectedSignature, matches, argMisalignment, index, timeline, newReturn, exists, existingReturn, stringifyTimeline, elem, callSignature, allowedFunctions, command;
                ++self.references;
                if (self.enforced) {
                    signatureList = self.enforced;
                } else {
                    signatureList = self.timeline;
                }
                callable = false;
                found = false;
                returns = [];
                ՐՏitr12 = ՐՏ_Iterable(signatureList);
                for (ՐՏidx12 = 0; ՐՏidx12 < ՐՏitr12.length; ՐՏidx12++) {
                    expectedSignature = ՐՏitr12[ՐՏidx12];
                    matches = false;
                    if (ՐՏ_in(expectedSignature.type, [ "Function", "Class" ])) {
                        callable = true;
                        if (expectedSignature.inputs) {
                            argMisalignment = inputs.inputs.length - expectedSignature.inputs.length;
                            if (argMisalignment > 0 || argMisalignment < 0 && !expectedSignature.inputs[inputs.inputs.length].default) {
                                continue;
                            }
                            ՐՏitr13 = ՐՏ_Iterable(enumerate(inputs.inputs));
                            for (ՐՏidx13 = 0; ՐՏidx13 < ՐՏitr13.length; ՐՏidx13++) {
                                ՐՏupk2 = ՐՏitr13[ՐՏidx13];
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
                            ՐՏitr14 = ՐՏ_Iterable(expectedSignature.returns);
                            for (ՐՏidx14 = 0; ՐՏidx14 < ՐՏitr14.length; ՐՏidx14++) {
                                newReturn = ՐՏitr14[ՐՏidx14];
                                exists = false;
                                if (newReturn.type === "?") {
                                    return {
                                        type: "?"
                                    };
                                }
                                ՐՏitr15 = ՐՏ_Iterable(returns);
                                for (ՐՏidx15 = 0; ՐՏidx15 < ՐՏitr15.length; ՐՏidx15++) {
                                    existingReturn = ՐՏitr15[ՐՏidx15];
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
                    throw new Error("'" + alias + "' is not a callable object");
                } else if (!found) {
                    stringifyTimeline = function(timeline) {
                        var sig, x;
                        sig = timeline.getSignature();
                        return (function() {
                            var ՐՏidx16, ՐՏitr16 = ՐՏ_Iterable(sig), ՐՏres = [], x;
                            for (ՐՏidx16 = 0; ՐՏidx16 < ՐՏitr16.length; ՐՏidx16++) {
                                x = ՐՏitr16[ՐՏidx16];
                                ՐՏres.push(stringifySignature(x));
                            }
                            return ՐՏres;
                        })().join(" or ");
                    };
                    callSignature = (function() {
                        var ՐՏidx17, ՐՏitr17 = ՐՏ_Iterable(inputs.inputs), ՐՏres = [], elem;
                        for (ՐՏidx17 = 0; ՐՏidx17 < ՐՏitr17.length; ՐՏidx17++) {
                            elem = ՐՏitr17[ՐՏidx17];
                            ՐՏres.push(stringifyTimeline(elem));
                        }
                        return ՐՏres;
                    })().join(", ");
                    allowedFunctions = (function() {
                        var ՐՏidx18, ՐՏitr18 = ՐՏ_Iterable(signatureList), ՐՏres = [], elem;
                        for (ՐՏidx18 = 0; ՐՏidx18 < ՐՏitr18.length; ՐՏidx18++) {
                            elem = ՐՏitr18[ՐՏidx18];
                            if (elem.type === "Function") {
                                ՐՏres.push(stringifySignature(elem));
                            }
                        }
                        return ՐՏres;
                    })().join(" or ");
                    throw new Error("Can't call function " + alias + " with signature 'Function(" + callSignature + ")', allowed signatures: " + allowedFunctions);
                }
                ՐՏitr19 = ՐՏ_Iterable(self.delayedLogic["call"]);
                for (ՐՏidx19 = 0; ՐՏidx19 < ՐՏitr19.length; ՐՏidx19++) {
                    command = ՐՏitr19[ՐՏidx19];
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
        getProperty: {
            enumerable: true, 
            writable: true, 
            value: function getProperty(){
                var ՐՏitr20, ՐՏidx20;
                var self = this;
                var props = [].slice.call(arguments, 0);
                var timeline, prop;
                timeline = self.properties;
                ՐՏitr20 = ՐՏ_Iterable(props);
                for (ՐՏidx20 = 0; ՐՏidx20 < ՐՏitr20.length; ՐՏidx20++) {
                    prop = ՐՏitr20[ՐՏidx20];
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
                var ՐՏitr21, ՐՏidx21;
                var self = this;
                var vars, possibleType;
                expectedType = normalize(expectedType);
                vars = self.getSignature();
                ՐՏitr21 = ՐՏ_Iterable(vars);
                for (ՐՏidx21 = 0; ՐՏidx21 < ՐՏitr21.length; ՐՏidx21++) {
                    possibleType = ՐՏitr21[ՐՏidx21];
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
                var ՐՏitr22, ՐՏidx22;
                var self = this;
                var function_;
                ՐՏitr22 = ՐՏ_Iterable(self.delayedLogic);
                for (ՐՏidx22 = 0; ՐՏidx22 < ՐՏitr22.length; ՐՏidx22++) {
                    function_ = ՐՏitr22[ՐՏidx22];
                    function_();
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
                    self.functionScope = self.scopes.length - 1;
                } else if (ՐՏ_in(scopeType, [ "if", "switch", "try" ])) {
                    scope = self.scopes[self.scopes.length-1];
                    scope.states = [ {} ];
                    scope.final = false;
                }
            }
        },
        nextScopeState: {
            enumerable: true, 
            writable: true, 
            value: function nextScopeState(){
                var final = this;
                final = final === void 0 ? false : final;
                var scope;
                scope = self.scopes[self.scopes.length-1];
                scope.final = final;
            }
        },
        endScope: {
            enumerable: true, 
            writable: true, 
            value: function endScope(){
                var ՐՏitr23, ՐՏidx23, ՐՏupk3, ՐՏitr24, ՐՏidx24, ՐՏupk4, ՐՏ_6, ՐՏ_7, ՐՏitr27, ՐՏidx27, ՐՏupk5, ՐՏitr28, ՐՏidx28, ՐՏitr29, ՐՏidx29, ՐՏitr30, ՐՏidx30, ՐՏitr31, ՐՏidx31;
                var self = this;
                var top, index, scope, x, inputs, element, declaration, timeline, var_, signature, state, command;
                top = self.scopes.pop();
                if (top.type === "function") {
                    ՐՏitr23 = ՐՏ_Iterable(enumerate(reversed(self.scopes)));
                    for (ՐՏidx23 = 0; ՐՏidx23 < ՐՏitr23.length; ՐՏidx23++) {
                        ՐՏupk3 = ՐՏitr23[ՐՏidx23];
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
                    ՐՏitr24 = ՐՏ_Iterable(enumerate(reversed(self.scopes)));
                    for (ՐՏidx24 = 0; ՐՏidx24 < ՐՏitr24.length; ՐՏidx24++) {
                        ՐՏupk4 = ՐՏitr24[ՐՏidx24];
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
                        throw new Error("Annotation states that function returns " + (function() {
                            var ՐՏidx25, ՐՏitr25 = ՐՏ_Iterable(top.annotation.returns), ՐՏres = [], x;
                            for (ՐՏidx25 = 0; ՐՏidx25 < ՐՏitr25.length; ՐՏidx25++) {
                                x = ՐՏitr25[ՐՏidx25];
                                ՐՏres.push(stringifySignature(x));
                            }
                            return ՐՏres;
                        })().join(" or ") + ", actual return types observed: " + ((function() {
                            var ՐՏidx26, ՐՏitr26 = ՐՏ_Iterable(top.seenReturns), ՐՏres = [], x;
                            for (ՐՏidx26 = 0; ՐՏidx26 < ՐՏitr26.length; ՐՏidx26++) {
                                x = ՐՏitr26[ՐՏidx26];
                                ՐՏres.push(stringifySignature(x));
                            }
                            return ՐՏres;
                        })().join(" or ") || "Undefined"));
                    }
                    if (top.name) {
                        if (top.annotation) {
                            inputs = [];
                            ՐՏitr27 = ՐՏ_Iterable(enumerate(top.annotation.inputs));
                            for (ՐՏidx27 = 0; ՐՏidx27 < ՐՏitr27.length; ՐՏidx27++) {
                                ՐՏupk5 = ՐՏitr27[ՐՏidx27];
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
                } else if (top.states && top.final) {
                    ՐՏitr28 = ՐՏ_Iterable(top.states[0]);
                    for (ՐՏidx28 = 0; ՐՏidx28 < ՐՏitr28.length; ՐՏidx28++) {
                        var_ = ՐՏitr28[ՐՏidx28];
                        signature = [ top.states[0][var_] ];
                        ՐՏitr29 = ՐՏ_Iterable(top.states.slice(1));
                        for (ՐՏidx29 = 0; ՐՏidx29 < ՐՏitr29.length; ՐՏidx29++) {
                            state = ՐՏitr29[ՐՏidx29];
                            if (ՐՏ_in(var_, state)) {
                                signature.concat(var_);
                            } else {
                                break;
                            }
                            if (state === top.states[top.states.length-1]) {
                                if (self.scopes[self.scopes.length-1].states) {
                                    self.scopes[self.scopes.length-1].states[var_] = signature;
                                }
                            }
                        }
                    }
                }
                if (timeline) {
                    ՐՏitr30 = ՐՏ_Iterable(top.delayed["call"]);
                    for (ՐՏidx30 = 0; ՐՏidx30 < ՐՏitr30.length; ՐՏidx30++) {
                        command = ՐՏitr30[ՐՏidx30];
                        timeline.onCall(command);
                    }
                }
                ՐՏitr31 = ՐՏ_Iterable(top.delayed["endScope"]);
                for (ՐՏidx31 = 0; ՐՏidx31 < ՐՏitr31.length; ՐՏidx31++) {
                    command = ՐՏitr31[ՐՏidx31];
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
                var ՐՏitr32, ՐՏidx32;
                var self = this;
                var scope, defaultStarted, arg;
                scope = self.scopes[self.functionScope];
                if (scope.annotation && scope.annotation.inputs && scope.annotation.inputs.length !== args.length) {
                    throw new Error("Specified arguments don't line up with function annotation.");
                }
                defaultStarted = false;
                ՐՏitr32 = ՐՏ_Iterable(args);
                for (ՐՏidx32 = 0; ՐՏidx32 < ՐՏitr32.length; ՐՏidx32++) {
                    arg = ՐՏitr32[ՐՏidx32];
                    if (!arg.name) {
                        throw new Error("Invalid format for args, required format is an array of { name: 'string', ?default: ... }");
                    }
                    if (arg.default) {
                        defaultStarted = true;
                    } else {
                        if (defaultStarted) {
                            throw new Error("Missing default value for argument '" + arg.name + "' of function '" + scope.name + "'. Arguments with default values must come last in function declaration.");
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
        setVar: {
            enumerable: true, 
            writable: true, 
            value: function setVar(name, varType){
                var self = this;
                var timeline;
                timeline = self.getTimeline(name);
                if (timeline) {
                    timeline.setVar(varType);
                } else {
                    self.scopes[Math.max(0, self.classScope, self.functionScope)].vars[name] = new Timeline(name, varType);
                }
                if (self.states) {
                    if (ՐՏ_in(name, self.states[self.states.length-1])) {
                        self.states[self.states.length-1][name].push(normalize(varType));
                    } else {
                        self.states[self.states.length-1][name] = [ normalize(varType) ];
                    }
                }
            }
        },
        setReturn: {
            enumerable: true, 
            writable: true, 
            value: function setReturn(varType){
                var ՐՏitr33, ՐՏidx33, ՐՏitr34, ՐՏidx34, ՐՏitr36, ՐՏidx36;
                var self = this;
                var actual, scope, expected, seen, x;
                actual = normalize(varType);
                scope = self.scopes[self.functionScope];
                if (scope.annotation && scope.annotation.returns) {
                    ՐՏitr33 = ՐՏ_Iterable(scope.annotation.returns);
                    for (ՐՏidx33 = 0; ՐՏidx33 < ՐՏitr33.length; ՐՏidx33++) {
                        expected = ՐՏitr33[ՐՏidx33];
                        if ((expected === actual || typeof expected === "object" && ՐՏ_eq(expected, actual))) {
                            ՐՏitr34 = ՐՏ_Iterable(scope.seenReturns);
                            for (ՐՏidx34 = 0; ՐՏidx34 < ՐՏitr34.length; ՐՏidx34++) {
                                seen = ՐՏitr34[ՐՏidx34];
                                if ((actual === seen || typeof actual === "object" && ՐՏ_eq(actual, seen))) {
                                    return;
                                }
                            }
                            scope.seenReturns.push(actual);
                            return;
                        }
                    }
                    throw new Error("Annotation states that function returns " + (function() {
                        var ՐՏidx35, ՐՏitr35 = ՐՏ_Iterable(scope.annotation.returns), ՐՏres = [], x;
                        for (ՐՏidx35 = 0; ՐՏidx35 < ՐՏitr35.length; ՐՏidx35++) {
                            x = ՐՏitr35[ՐՏidx35];
                            ՐՏres.push(stringifySignature(x));
                        }
                        return ՐՏres;
                    })().join(" or ") + ", actual return type: " + stringifySignature(actual));
                } else {
                    ՐՏitr36 = ՐՏ_Iterable(scope.seenReturns);
                    for (ՐՏidx36 = 0; ՐՏidx36 < ՐՏitr36.length; ՐՏidx36++) {
                        seen = ՐՏitr36[ՐՏidx36];
                        if ((actual === seen || typeof actual === "object" && ՐՏ_eq(actual, seen))) {
                            return;
                        }
                    }
                    scope.seenReturns.push(actual);
                }
            }
        },
        addRef: {
            enumerable: true, 
            writable: true, 
            value: function addRef(name){
                var self = this;
                var timeline;
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
            value: function onEndScope(function_){
                var self = this;
                self.scopes[self.scopes.length-1].delayed["endScope"].push(function_);
            }
        },
        onCall: {
            enumerable: true, 
            writable: true, 
            value: function onCall(function_){
                var self = this;
                self.scopes[self.scopes.length-1].delayed["call"].push(function_);
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
                var timeline;
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
            value: function getTimeline(name){
                var self = this;
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
                    } else {
                        --index;
                    }
                }
                return timeline;
            }
        }
    }), ՐՏ_5);
    ՐՏ_modules["interstate"]["byType"] = byType;

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

    var ՐՏ_8, ՐՏ_9, ՐՏ_10, ՐՏ_11, ՐՏ_12, ՐՏ_13, ՐՏ_14, ՐՏ_15, ՐՏ_16, ՐՏ_17;
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
    s.setReturn("RegExp");
    s.setReturn("String");
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
    "\nnow let's try compile-time kwargs resolution:\n\ndef bar1(a, b, c):  # already declared\n    ...\n\nbar1(c=num, a, b)       # error\nbar1(a, b, a=num)       # error\nbar1(a, c=num, b=num)   # ok\n";
    s.addCall("bar1", {
        inputs: (function() {
            var ՐՏidx37, ՐՏitr37 = ՐՏ_Iterable(s.alignInputs("bar1", [ {
                name: "c",
                data: num
            }, {
                data: num
            }, {
                data: num
            } ])), ՐՏres = [], input;
            for (ՐՏidx37 = 0; ՐՏidx37 < ՐՏitr37.length; ՐՏidx37++) {
                input = ՐՏitr37[ՐՏidx37];
                ՐՏres.push(input.data);
            }
            return ՐՏres;
        })()
    });
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

