# Interstate & Detour
This is an enhancement to RapydScript that provides similar capability to TypeScript without the excessive verbosity that TypeScript forces on the developer.

## Interstate
![Interstate Logo](http://res.cloudinary.com/atsepkov/raw/upload/v1478544146/interstate_logo.png)  
Interstate tracks the state of each variable in your code, and performs compile-time safety checks when possible. It will detect static assignment issues, but not dynamic ones, which is where Detour comes in (not yet implemented). Features of Interstate:

Features of Interstate:

- Tracks creation and destruction of scopes
- Auto-generates functions and classes in relevant scope
- Tracks object inheritance
- Tracks creation, assignment, and reference of variables, functions, and classes
- Raises compile-time exceptions when variable, function, or class is used improperly
- Enforces proper arguments for function calls
- Enforces proper returns for function calls
- Allows enforcing a specific subset of permitted types for each variable
- Resolves return signatures for function calls at compile time
- Awareness of standard JavaScript APIs for better type tracking (i.e. Math.PI = Number) (TODO)
- Analysis of `.runtime-manifest.json` file during consecutive compilations for better variable detection (TODO)
- Dead-code elimination (TODO)

### Usage
You can create variables individually, but the recommended usage is to import `state` object from `interstate` and use it as a global variable state:

    from interstate import state

    state.newVariable('foo', 1)                           # encountered new variable named foo on line 1
    state.newVariable('bar', 2, ['Number', 'String'])     # encountered bar declaration on line 2 that can only be Number or String

    state.newScope('functionName', 3)                     # encountered function definition on line 3
    state.endScope(5)                                     # function declaration finished on line 5

	state.newClass('className', 8)                        # class delcaration started on line 8
	state.endScope(9)                                     # class declaration ended

	state.newGeneric('genericName', 12)                   # generic definition on line 12 encountered
	state.newInterface('interfaceName', 14, obj)          # encountered interface definition on line 14, obj contains a map of children

	state.findSignature('objName')                        # find signature for a particular object (interface, generic, class, function, etc.)

	# interface use example
	state.newInterface('Coord', 15, { x: ['Number'], y: ['Number'] })
	i = state.newVariable('i', 20, ['Coord'])             # ERROR: requires immediate assignment of object passing Coord interface
	i = state.newVariable('i', 20, ['Coord'], {x:['Number'], y:['Number']}) # OK
	i.setProperty('x', 'String', 26)                      # ERROR: interface only allows Number
	i.setProperty('y', 'Number', 27)                      # OK
	i.setProperty('z', 'Number', 28)                      # OK, interface is allowed to have extra properties

### JavaScript Manifests
Manifests allow a convenient way to declare types for external resources in one location. Interstate comes with builtin-manifest but allows you to define an additional one in your project, which it will check for at compile time. Due to the nature of JavaScript, your app may redefine standard types and confuse Interstate. You can explicitly state those in project-manifest to remedy the issue. 

Manifest structure example:

    {
        ...
        "Math": {
            "type": "Object",
            "props": {
                "PI": "Number",
                "E": "Number",
                "LN2": {
                    "type": "Number"
                },
                ...
                "sin": {
                    "type": "Function",
                    "args": {
                        "1": "Number"
                    }
                    "returns": ["Number"]
                }
                "max": {
                    "type": "Function",
                    "args": {
                        "...": "Number"
                    }
                    "returns": ["Number"]
                },
                "min": "Function(...Number) -> Number",
                "pow": {
                    "type": "Function",
                    "args": {
                        "2": ["Number", "Number"]
                    },
                    "returns": ["Number"]
                },
                "floor": "Function(Number) -> Number"
            }
        }
        ...
        "Array": {
            "type": "Object",
            "prototype": {
                "concat": "Function([MyTypes], ...[OtherTypes]) -> [MyTypes and OtherTypes]"
            }
        }
    }

#### builtin-manifest.json
Standard manifest that exists within Interstate source code to define common JS libraries, you should not be editing this. 

#### library-manifest.json
3rd party libraries you import may define their own manifests. THe function similar to project-manifest, overriding the builtin manifest, but can in turn be overriden again by your own project-manifest.

#### project-manifest.json
Your own project manifest file where you can define types for 3rd party libraries you integrate with as well as input coming from outside. You can also override types specified by `builtin-manifest`, if the need arises.


## Detour (Not Yet Implemented)
Detour compiles into your code at debug/test time but dissapears in production. This allows you to detect inconsistencies/issues while testing while retaining performance in production. It performs a lot of the same safety checks as Interstate but at run time.

- Intelligent decoration of assignments/returns based on locations that Interstate marks as ambiguous (avoids excessive performance overhead from decorating everything)
- Analysis of `.compile-manifest.json` file generated by Interstate to keep track of variables at run time
- Generation of `.runtime-manifest.json` file that marks variable signatures, which Interstate can then use to make better suggestions
- Code coverage suggestions based on observed paths hit

## Done vs To-Do

Done:

- tracking type through variable lifetime, both from constant and variable assignments
- parsing/representation of function calls
- interface definitions and enforcement
- generics
- rudimentary tests

To Do:

- definitions + parsing of inbuilt functions/objects
- organized test suite
- everything for Detour
