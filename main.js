//Modules

const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

//Variables
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const row = 10;
const col = 10;
const probability = 0.3;

//Creating field class
class Field {
  field = [];

  constructor() {
    //this.field = field;
    this.locationX = 0;
    this.locationY = 0;

    for (let a = 0; a < row; a++) {
      this.field[a] = [];
    }

    this.generateField();
  }

  generateField() {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        let getProb = Math.random();
        this.field[x][y] = getProb >= probability ? fieldCharacter : hole;
      }
    }

    //hat position
    let hatPosX;
    let hatPosY;
    do {
      hatPosX = Math.floor(Math.random() * col);
      hatPosY = Math.floor(Math.random() * row);
    } while (hatPosX == 0 && hatPosY == 0);

    this.field[hatPosY][hatPosX] = hat;

    this.field[0][0] = pathCharacter;
  }

  //Game ends when one of the following is met:
  // 1) Char hits the boundaries
  // 2) Char falls into a hole
  // 3) Char finds the hat

  runGame() {
    let playing = true;
    while (playing) {
      this.field[this.locationY][this.locationX] = pathCharacter;
      this.print();
      this.askQuestion();

      // 1) Char hits boundararies
      if (!this.isInBoundary()) {
        console.log("Out of boundary - Game over");
        playing = false;
      } else if (this.field[this.locationY][this.locationX] == hat) {
        console.log("Congrats, you fuond your hat!");
        playing = false;
      } else if (this.field[this.locationY][this.locationX] == hole) {
        console.log("Sorry, you fell into a hole. Game over");
        playing = false;
      }
    }
  }

  isInBoundary() {
    return (
      this.locationX >= 0 &&
      this.locationY >= 0 &&
      this.locationX < col &&
      this.locationY < row
    );
  }

  print() {
    clear();

    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  //moving the character according to the user input
  askQuestion() {
    const answer = prompt("Which way? {u, d, l, r}");
    switch (answer) {
      case "u":
        this.field[this.locationY][this.locationX] = fieldCharacter;
        this.locationY -= 1;
        break;
      case "d":
        this.field[this.locationY][this.locationX] = fieldCharacter;
        this.locationY += 1;
        break;
      case "l":
        this.field[this.locationY][this.locationX] = fieldCharacter;
        this.locationX -= 1;
        break;
      case "r":
        this.field[this.locationY][this.locationX] = fieldCharacter;
        this.locationX += 1;
        break;
      default:
        console.log("Please enter u, d, l, r");
    }
  }
} //End of field class

//Create an instance object for the field
const myField = new Field();
myField.runGame();
