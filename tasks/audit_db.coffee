db = require './data/all_hymns'

# Discover any missing hymn numbers.
list = []
prev_number = 0

Object.keys(db).forEach (d) ->
  list.push db[d]
list = list.sort (a,b) ->
  Number(a.hymn_number) - Number(b.hymn_number)
console.log "items: #{list.length}"

for d in list
  if Number(d.hymn_number) - 1 > prev_number
    console.log "Missing: #{d.hymn_number - 1}"
  prev_number = d.hymn_number