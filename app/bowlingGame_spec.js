describe("First test", function() {
  it('should equal true', function(){
    expect(true).toEqual(true);
  });
});

describe("#allTurns", function() {
  let scores, bowlingGame;
  beforeEach(function(){
    scores = "5- X 8/"
    bowlingGame = new BowlingGame(scores)
  })
  it("should return an array", function() {
    let returnValues = bowlingGame.allTurns();
    expect(returnValues instanceof Array).toBeTruthy();
  });
  it("should return represent each turn", function() {
    expect(bowlingGame.allTurns().length).toEqual(3);
    expect(bowlingGame.allTurns()).toEqual(['5-', 'X', '8/']);
  });
})

describe("#rawScores", function() {
  let scores, bowlingGame, rawScores;
  beforeEach(function(){
    scores = "25 5- X 8/"
    bowlingGame = new BowlingGame(scores)
    rawScores = bowlingGame.rawScores();
  });

  it("returns an array", function() {
    expect(rawScores instanceof Array).toBeTruthy();
  });
  it("should return a raw string concat of both bowls", function() {
    expect(rawScores[0]).toEqual("25")
  });
  it("should return a raw string concat of both bowls when one is miss", function() {
    debugger
    bowlingGame
    expect(rawScores[1]).toEqual("50")
  });
  it("should return a raw string X", function() {
    expect(rawScores[2]).toEqual("X")
  });
  it("should return a raw string concat of number plus spare remainder", function() {
    expect(rawScores[3]).toEqual("82")
  });
})
