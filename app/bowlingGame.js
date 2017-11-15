class BowlingGame {
  constructor(input) {
    this.input = input;
    this.rawScores = this.rawScores() || [];
    this.finalScore = this.calculateScore() || 0;
  }
  allTurns() {
    return this.input.split(" ");
  }
  rawScores() {
    let allTurns = this.allTurns();
    // taking care of last turn where there are three rolls
    let lastTurn = allTurns.pop();
    if (lastTurn.length > 2) {
      allTurns.push(lastTurn.slice(0, 2), lastTurn.slice(2));
    } else {
      allTurns.push(lastTurn)
    }

    return allTurns.map(function(turn) {
      if (turn === "X") {
        return "X";
      } else if (turn.includes("/")) {
        return formatSpares(turn);
      } else if (turn.includes("-")) {
        return formatEmpties(turn);
      } else {
        return turn;
      }
    });
  }
  validateInput() {
    let valid = true;
    let framesToValidate = this.rawScores.filter((frame) => {
      return !frame.includes("X")
    })
    for (let frame = 0; frame < framesToValidate.length; frame++) {
      let current = framesToValidate[frame];
      if (current.length === 2 && ((+current[0]) + (+current[1])) > 10) {
        valid = false;
      }
      // A 'flag' from formatSpares() function
      if (current.includes("/")) {
        valid = false;
      }
    }
    if (this.allTurns().length > 10) {
      valid = this.validateExtraFrames()
    }
    return valid
  }
  validateExtraFrames() {
    let allTurns = this.allTurns();
    let tenthTurn = allTurns[9]
    let remainingTurns = allTurns.slice(10).join("")
    if (tenthTurn === "X" && remainingTurns.length > 2) {
      return false
    } else if (tenthTurn.includes("/") && remainingTurns.length > 1) {
      return false
    } else if (!tenthTurn.includes("/") && tenthTurn !== "X" && remainingTurns) {
      return false
    } else {
      return true
    }
  }
  calculateScore() {
    var currentTurns = this.allTurns();
    if (this.validateInput()) {
      this.finalScore = this.evaluateTurns(currentTurns);
    }
    return this.finalScore;
  }
  evaluateTurns(turns) {
    let score = 0
    let turnsLimit = (turns.length < 10) ? turns.length : 10;

    for (var i = 0; i < turnsLimit; i++) {
      if (turns[i] === "X") {
        score += this.evaluateStrike(i);
      } else if (turns[i].includes("/")) {
        score += this.evaluateSpare(i);
      } else {
        let first = +(this.rawScores[i][0]);
        let second = +(this.rawScores[i][1]);
        score += first + second;
      }
    }
    return score;
  }
  evaluateStrike(idx) {
    let next = this.rawScores[idx + 1] || "0";
    let nextNext = this.rawScores[idx + 2] || "0";

    if (next.length === 1) {
      let nextSum = determineNextTwoTurns(next, nextNext);
      return (10 + nextSum);
    } else if (!next) {
      return 10;
    } else {
      return 10 + (+next[0]) + (+next[1]);
    }
  };
  evaluateSpare(idx) {
    let next = this.rawScores[idx + 1] || "0";
    let nextVal;

    if (next === "X") {
      nextVal = 10;
    } else {
      nextVal = next[0] || "0";
    }
    return 10 + (+nextVal);
  }
}
;

function formatEmpties(turn) {
  let rawScore = "";

  if (turn[0] === "-") {
    rawScore += "0";
  } else {
    rawScore += turn[0];
  }
  if (turn[1] === "-") {
    rawScore += "0";
  } else {
    rawScore += turn[1];
  }
  return rawScore;
}

function formatSpares(turn) {
  let spare
    , rawScore = turn[0];

  if (turn[0] > 9) {
    // if the value is too high (cannot be valid spare)
    // just set the spare score to 10, will invalidate
    spareScore = "/";
  } else {
    spareScore = 10 - (+turn[0]);
  }

  return rawScore += spareScore;
}

function determineNextTwoTurns(next, nextNext) {
  let nextVal, nextNextVal;

  if (next[0] === "X") {
    nextVal = 10;
  } else {
    nextVal = +next[0];
  }
  if (nextNext[0] === "X") {
    nextNextVal = 10;
  } else {
    nextNextVal = +nextNext[0];
  }
  return nextVal + nextNextVal;
}

function lastFullFrame(allTurns) {
  for (let turn = 0; turn < allTurns.length; turn++) {
    if (allTurns[turn] !== "X" && allTurns[turn].length === 1) {
      return turn-1
    }
  }
  return allTurns.length-1;
}
