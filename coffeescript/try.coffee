console.log(
  try
    nonexistent / undefined
  catch error
    "And the error is ... #{error}"
)

try
  a/undefined
catch e
  console.log(e)
