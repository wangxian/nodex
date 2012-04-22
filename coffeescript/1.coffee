# Assignment:
number   = 42
opposite = true

# console.log 'this'
number = -42 if opposite

square = (x) -> x * x

# array
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  console.log winner, runners

# race 1,2,3

# Array comprehensions:
cubes = (math.cube num for num in list)
# console.log cubes

alert "I knew it!" if elvis?


