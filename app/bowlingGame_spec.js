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
    expect(bowlingGame.allTurns().length).toEqual(3)
    expect(bowlingGame.allTurns()).toEqual(['5-', 'X', '8/'])
  });
})
