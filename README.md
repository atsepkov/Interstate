# Interstate
![Interstate Logo](http://res.cloudinary.com/atsepkov/raw/upload/v1478544146/interstate_logo.png)
Compiler state manager (originally written for RapydScript). This state manager is currently designed for RapydScript, and can be used by compilers and linters alike. It's a more powerful context-tracker for the state of variable declarations and assignments. It is to a parser what acceleration is to velocity, effectively a derivative:

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

## Install

	npm install interstate-js

## Usage

```
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

You could also use onCall to create more advanced type checks (at the time of function call rather than declaration).
For example, imagine we had the following code:

```
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

```
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
