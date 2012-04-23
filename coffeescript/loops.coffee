# test array's key = value
console.log key,value for value,key in ['broccoli', 'spinach', 'chocolate']
console.log '------------------------------------------------'

# test json object
console.log key,value for key,value of {max: 10, ida: 9, tim: 11}

# Eat lunch.
#console.log food for food in ['toast', 'cheese', 'wine']

# Fine five course dining.
courses = ['greens', 'caviar', 'truffles', 'roast', 'cake']
#menu i + 1, dish for dish, i in courses

# Health conscious meal. isnot
foods = ['broccoli', 'spinach', 'chocolate']
#eat food for food in foods when food isnt 'chocolate'

countdown = (num for num in [10..1])





# 遍历的方式一
evens = (x for x in [0..10] by 2)

# 遍历的方式二
ages = for own child, age of {max: 10, ida: 9, tim: 11}
  "#{child} is #{age}"

# For readability, the until keyword is equivalent to while not, 
# and the loop keyword is equivalent to while true.
# Econ 101
if this.studyingEconomics
  buy()  while supply > demand
  sell() until supply > demand

num = 6
lyrics = while num -= 1
  "#{num} little monkeys, jumping on the bed.
    One fell out and bumped his head."
    
    
for filename in list
  do (filename) ->
    fs.readFile filename, (err, contents) ->
      compile filename, contents.toString()    
