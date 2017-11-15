function BowlingGame(input) {
  this.input = input;
}

BowlingGame.prototype.allTurns = function() {
  return this.input.split(" ")
}

BowlingGame.prototype.rawScores = function() {
  let allTurns = this.allTurns()
  return allTurns.map(function(turn) {
    if (turn === "X") {
      return "X"
    } else if (turn.includes("/")) {
      return formatSpares(turn)
    } else if (turn.includes("-")) {
      return formatEmpties(turn)
    } else {
      return turn
    }
  })
}

function formatEmpties(turn) {
  let rawScore = ""
  if (turn[0] === "-") {
    rawScore += "0"
  } else {
    rawScore += turn[0]
  }
  if (turn[1] === "-") {
    rawScore += "0"
  } else {
    rawScore += turn[1]
  }
  return rawScore
}

function formatSpares(turn) {
  let rawScore = turn[0]
  let spareScore = 10 - (+turn[0])
  return rawScore += spareScore
}


BowlingGame.prototype.evaluateStrike = function(idx, rawScores) {
  let next = rawScores[idx + 1] || "0"
  let nextNext = rawScores[idx + 2] || "0"
  if (next.length === 1) {
    let nextSum = determineNextTwoTurns(next, nextNext)
    return (10 + nextSum)
  } else if (!next) {
    return 10
  } else {
    return 10 + (+next[0]) + (+next[1])
  }
}

BowlingGame.prototype.evaluateSpare = function(idx, rawScores) {
  let next = rawScores[idx + 1] || "0"
  let nextVal;
  if (next === "X") {
    nextVal = 10
  } else {
    nextVal = next[0] || "0"
  }
  return 10 + (+nextVal)
}

function determineNextTwoTurns(next, nextNext) {
  let nextVal, nextNextVal
  if (next[0] === "X") {
    nextVal = 10
  } else {
    nextVal = +next[0]
  }
  if (nextNext[0] === "X") {
    nextNextVal = 10
  } else {
    nextNextVal = +nextNext[0]
  }
  return nextVal + nextNextVal
}
