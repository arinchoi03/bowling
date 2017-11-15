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
    expect(rawScores[1]).toEqual("50")
  });
  it("should return a raw string X", function() {
    expect(rawScores[2]).toEqual("X")
  });
  it("should return a raw string concat of number plus spare remainder", function() {
    expect(rawScores[3]).toEqual("82")
  });
})

describe("#evaluateStrike", function(){
  let scores, bowlingGame, rawScores;
  beforeEach(function() {
    scores = "X 9- X X X"
    bowlingGame = new BowlingGame(scores)
    rawScores = bowlingGame.rawScores()
  })
  it("should return the correct score considering next two rolls", function() {
    expect(bowlingGame.evaluateStrike(0, rawScores)).toEqual(19)
  })
  it("should return the correct score considering next two strikes", function() {
    expect(bowlingGame.evaluateStrike(2, rawScores)).toEqual(30)
  })
  it("should return the correct score considering next two rolls at the end of game", function() {
    expect(bowlingGame.evaluateStrike(3, rawScores)).toEqual(20)
  })
})

describe("#evaluateSpare", function(){
  let scores, bowlingGame, rawScores;
  beforeEach(function() {
    scores = "8/ 14 2/ X 9- 7/"
    bowlingGame = new BowlingGame(scores)
    rawScores = bowlingGame.rawScores()
  })
  it("should return the correct score considering next roll", function() {
    expect(bowlingGame.evaluateSpare(0, rawScores)).toEqual(11)
  })
  it("should return the correct score considering next strike roll", function() {
    expect(bowlingGame.evaluateSpare(2, rawScores)).toEqual(20)
  })
  it("should return the correct score at the end of game", function() {
    expect(bowlingGame.evaluateSpare(5, rawScores)).toEqual(10)
  })
})

