# Interstate
![Interstate Logo](http://res.cloudinary.com/atsepkov/raw/upload/v1478544146/interstate_logo.png)  
Compiler state manager (originally written for RapydScript). This state manager is currently designed for RapydScript, and can be used by compilers and linters alike. It's a much more powerful context-tracker for the state of variable declarations and assignments than RapydScript's original context tracking system. The main motivation for this project was to allow RapydScript to match and exceed the power of TypeScript. Interstate can one-up TypeScript's system for the following reasons:

- Interstate thinks in probabilities rather than exact types, allowing more granular control to developers in terms of inputs.
- Interstate is designed for a cleaner subset of JavaScript (RapydScript) and hence can be more aggressive about its assumptions.
- Interstate embraces Pythonic patterns of failing early rather than lax JavaScript patterns TypeScript has to respect.
- Interstate declutters the language rather than adding more clutter/syntax to it like TypeScript with its C# keywords.

Interstate is to a parser what acceleration is to velocity, effectively a derivative:

| Compiler | Geography | Math |
|----------|-----------|------|
| Lexer    | Position  | ƒ    |
| Parser   | Velocity  | ƒ'   |
| Interstate | Acceleration | ƒ'' |

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
- Dead-code elimination

## Install

	npm install interstate-js

## Usage

### Function Declaration
```python
from interstate import State, Timeline

s = State()                        # create a new state object
s.newScope('function', 'foo')      # start a new function named 'foo'
s.setReturn('Number')              # declare a return statement which returns an object of type Number

# ensure that function takes in Number as first argument and String as second and that all return
# types are String
s.newScope('function', 'bar', {
    inputs: ['Number', 'String'],
    returns: ['String']
})

# terminate current scope, check that return types are met, and create relevant variables
s.endScope()
```

### Class Declaration
```python
s.newScope('class', 'Physicist')   # start declaring a new class
s.setParent('Scientist')           # set parent for the class currently being declared
s.endScope()

# retrieve the timeline for the Physicist class
physicist = s.getTimeline('Physicist')
# use Physicist class to declare an object named 'einstein' of type Physicist
einstein = Timeline('einstein', physicist.addCall({
    inputs: []
}))
# retrieve timeline signature, this is a list of types that this variable has stored
einstein.getSignature()
```

### Function Calls
You could also use onCall to create more advanced type checks (at the time of function call rather than declaration).
For example, imagine we had the following code:

```python
def qux(d:Number):
    pass

a = 'foo'
def baz(b:Number, c:Number) -> Number:
    qux(a)
    return b + c

a = 4
baz(1, 2)
```

For correct `qux` call we want to ensure that `a` is a `Number` at the time of the function call, not at the time of its declaration. We
can easily accomplish such a check by populating our state in correct order:

```python
s.newScope('function', 'qux', {
    inputs: ['Number'],
    returns: []
})
s.endScope()
s.setVar('a', 'String')
s.newScope('function', 'baz', {
    inputs: ['Number', 'Number'],
    returns: ['Number']
})

s.onCall(def(callSignature):
		# note that if we use this s.addCall directly at this time, it will fail because 'a' holds a String
    s.addCall('qux', {
        inputs: [s.getTimeline('a')]
    })
)
s.setReturn('Number')
s.endScope()

s.setVar('a', 'Number')             # now it will pass
s.addCall('baz', {                  # this s.addCall will also trigger s.addCall to 'qux'
    inputs: [num, num]
})
```

Moreover, passing fewer or more arguments than expected to a function call will throw an error. This added safety check allows for much saner
behavior than regular JavaScript.

### Kwargs Resolution
Interstate can be used to fix function calls with keyword arguments without requiring the run-time `kwargs` decorator which slows down code
significantly, adds a rigidity of not being able to rename variables and makes output code harder to read. Imagine the following example:

```python
def bar(a, b, c):
	...

# enforce proper calls:
bar(c=1, 2, 3)                      # error: Non-keyword argument after keyword argument
bar(1, 2, a=3)                      # error: multiple values for argument 'a'
bar(1, c=2, b=3)                    # ok, but switch 'b' and 'c' in function call
```

And here is how you would test all 3 cases via Interstate:

```python
s.newScope('function', 'bar')
s.setArgs([{ name: 'a' }, { name: 'b' }, { name: 'c' }])
s.endScope()

s.alignInputs('bar', [
	{ name: 'c', data: 1 },
	{ data: 2 },
	{ data: 3 }
])

s.alignInputs('bar', [
	{ data: 1 },
	{ data: 2 },
	{ name: 'a', data: 3 }
])

s.alignInputs('bar', [
	{ data: 1 },
	{ name: 'c', data: 2 }
	{ name: 'b', data: 3 }
])
```
