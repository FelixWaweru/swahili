# Control Flow Structures.

There are currently 2 control structures implemented:

1. If...else
2. If...else if... else

## If...else

Syntax: `kama (expr) { } sivyo { }`

- Example:
``` 
  kama (x>y) { 
    x = 12
  } sivyo {
    x =3
  }
```

## If...else if...else

Syntax: `kama (expr){ } au (expr) { } sivyo { }`

- Example:
```
  kama (x>y) {
    x = 12
  } au (x<z) {
    x =3.14
  } sivyo {
    x =3
  }
```
