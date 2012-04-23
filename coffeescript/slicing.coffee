numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

start   = numbers[0..2] # start = numbers.slice(0, 3); 自然算法，比实际的多1

middle  = numbers[3...6] # middle = numbers.slice(3, 6); 和javascript保存一致

end     = numbers[6..]

copy    = numbers[..]

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[4..6] = [-4, -5, -6]
console.log numbers