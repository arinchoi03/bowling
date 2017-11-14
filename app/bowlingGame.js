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
