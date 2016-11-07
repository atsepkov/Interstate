# Interstate
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
