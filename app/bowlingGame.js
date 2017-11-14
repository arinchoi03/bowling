function BowlingGame(input) {
  this.input = input;
}

BowlingGame.prototype.allTurns = function() {
  return this.input.split(" ")
}
