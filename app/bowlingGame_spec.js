describe("on initialize", function() {
  let scores, bowlingGame;
  describe("allTurns with an input", function() {
    beforeEach(function(){
      scores = "5- X 8/"
      bowlingGame = new BowlingGame(scores)
    })
    it("should return an array", function() {
      let returnValues = bowlingGame.allTurns;
      expect(returnValues instanceof Array).toBeTruthy();
    });
    it("should return a collection of all turns in the input string", function() {
      expect(bowlingGame.allTurns.length).toEqual(3);
      expect(bowlingGame.allTurns).toEqual(['5-', 'X', '8/']);
    });
  })

  describe("all scores with a empty input", function(){
    beforeEach(function(){
      scores = ""
      bowlingGame = new BowlingGame(scores)
    })
    it("should set allTurns to an empty object", function(){
      expect(bowlingGame.allTurns).toEqual([])
    })
    it("should set the rawScores to an empty array", function(){
      expect(bowlingGame.rawScores).toEqual([])
    })
    it("should set all the scores to zero", function(){
      expect(bowlingGame.finalScore).toEqual(0)
      expect(bowlingGame.partialScore).toEqual(0)
    })
  })
})

describe("#rawScores", function() {
  let scores, bowlingGame, rawScores;
  beforeEach(function(){
    scores = "25 5- X 8/"
    bowlingGame = new BowlingGame(scores)
    rawScores = bowlingGame.rawScores;
  });

  it("should return an array", function() {
    expect(rawScores instanceof Array).toBeTruthy();
  });
  it("should return a raw string concatenation of both bowls' string values", function() {
    expect(rawScores[0]).toEqual("25")
  });
  it("should return a raw string concatenation of both bowls' string values when one is miss", function() {
    expect(rawScores[1]).toEqual("50")
  });
  it("should return a raw string X", function() {
    expect(rawScores[2]).toEqual("X")
  });
  it("should return a raw string concatenation of number (in string format) plus the spare remainder (in string format)", function() {
    expect(rawScores[3]).toEqual("82")
  });
})

describe("#validateInput", function() {
  it("should invalidate input with rolls per frame that add up to over 10", function() {
    let scores = "78 2/";
    let bowlingGame = new BowlingGame(scores);
    expect(bowlingGame.validateInput()).toEqual(false);
  });
  it("should validate input with rolls per frame that add up to under 10", function() {
    let scores = "25 2/";
    let bowlingGame = new BowlingGame(scores);
    expect(bowlingGame.validateInput()).toEqual(true);
  });
  describe("with input more than 10 frames", function(){
    describe("with valid extra bowls", function() {
      it("should validate input", function() {
        let scores = "71 2/ -7 44 -8 52 71 8/ 81 X 12"; // 12 frames
        // what about "71 2/ -7 44 -8 52 71 8/ 81 X X X"
        let bowlingGame = new BowlingGame(scores);
        expect(bowlingGame.validateInput()).toEqual(true);
      });
    })
    describe("with no valid extra bowls", function(){
      it("should invalidate input", function() {
        let scores = "71 2/ -7 44 -8 52 71 8/ 81 11 15 8-"; // 12 frames
        let bowlingGame = new BowlingGame(scores);
        expect(bowlingGame.validateInput()).toEqual(false);
      });
    })
  })
  it("should validate input with 10 frames", function() {
    let scores = "71 2/ -7 44 -8 X 71 8/ 81 11"; // 10 frames
    let bowlingGame = new BowlingGame(scores);
    expect(bowlingGame.validateInput()).toEqual(true);
  });
  it("should validate input with less than 10 frames", function() {
    let scores = "71 2/ -7 44 -8 X 71"; // 7 frames
    let bowlingGame = new BowlingGame(scores);
    expect(bowlingGame.validateInput()).toEqual(true);
  });
})

describe("#evaluateStrike", function(){
  let scores, bowlingGame, rawScores;
  beforeEach(function() {
    scores = "X 9- X X X"
    bowlingGame = new BowlingGame(scores)
    rawScores = bowlingGame.rawScores
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
    rawScores = bowlingGame.rawScores
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

describe("Final score", function() {
  it('should equal 300 for a perfect game of strikes', function() {
    let scores = "X X X X X X X X X X X X"
    let newGame = new BowlingGame(scores);
    expect(newGame.finalScore).toEqual(300);
  });
  it('should equal 90 for a straight game of nine pins', function() {
    let scores = "9- 9- 9- 9- 9- 9- 9- 9- 9- 9-"
    let newGame = new BowlingGame(scores);
    expect(newGame.finalScore).toEqual(90);
  });
  it('should equal 150 for a straight game of five pins and spare', function() {
    let scores = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5"
    let newGame = new BowlingGame(scores);
    expect(newGame.finalScore).toEqual(150);
  });
});

describe("Partial Score", function() {
  describe("when the partial game input is valid", function() {
    describe("and all available frames are fully-scored", function() {
      describe("and the partial score is simple", function() {
        it("should return the correct simple sum of all scores", function(){
          let scores = "9- 15"
          let newGame = new BowlingGame(scores);
          expect(newGame.partialScore).toEqual(15);
        })
      });
      describe("and the partial score is complex", function() {
        it("should return the correct complex sum of all scores (including spares/strikes/mises)", function(){
          let scores = "9- 15 1/ X 18"
          let newGame = new BowlingGame(scores);
          expect(newGame.partialScore).toEqual(63);
        });
      });
    })
    describe("and a frame is partially-scored", function() {
      describe("and the partial score is simple", function() {
        it("should return the correct simple sum of all scores without the incomplete frame", function(){
          let scores = "9- 15 3"
          let newGame = new BowlingGame(scores);
          expect(newGame.partialScore).toEqual(15);
        })
      });
      describe("and the partial score is complex", function() {
        it("should return the correct complex sum of all scores (including spares/strikes/misses) without the incomplete frame", function(){
          let scores = "9- 15 1/ X 18 2"
          let newGame = new BowlingGame(scores);
          expect(newGame.partialScore).toEqual(63);
        })
      });
    })
  })
  describe("when the partial game input is invalid", function() {
    it("should not calculate the score", function(){
      let scores = "9- 15 49 X 18 2"
      let newGame = new BowlingGame(scores);
      expect(newGame.partialScore).toEqual(0);
    })
  })
})

describe("#lastFullFrame", function() {
  describe("when all frames are fully-scored", function(){
    it("should return the last full-frame index", function() {
      let scores = "9- 15"
      let allTurns = scores.split(" ");
      let lastFrame = lastFullFrame(allTurns)
      expect(lastFrame).toEqual(1);
    })
  });
  describe("when all frames are not fully-scored", function(){
    it("should return the last full-frame index", function() {
      let scores = "9- 15 3"
      let allTurns = scores.split(" ");
      let lastFrame = lastFullFrame(allTurns)
      expect(lastFrame).toEqual(1);
    })
  });
})
