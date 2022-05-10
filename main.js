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
        const prob = Math.random();
        this.field[y][x] = fieldCharacter;
      }
    }

    //number of holes must be less thn number of grass patches

    const holesPos = (holeX, holeY) => {
      const numHoles = Math.floor(Math.random() * ((row * col) / 2 - 1));
      let j = 0;
      while (j < numHoles) {
        holeX = Math.floor(Math.random() * col);
        holeY = Math.floor(Math.random() * row);
        this.field[holeX][holeY] = hole;
        j++;
      }
    };

    //hat position
    const hatPosition = (hatPosX, hatPosY) => {
      hatPosX = Math.floor(Math.random() * col);
      hatPosY = Math.floor(Math.random() * row);

      this.field[hatPosX][hatPosY] = hat;
    };

    holesPos();
    hatPosition();
    this.charPosition();
  }

  charPosition() {
    this.field[this.locationX][this.locationY] = pathCharacter;
  }

  runGame() {
    /*
    let i = 0;
    do {
      this.print();
      this.askQuestion();
      i++;
    } while (i < 4);
    */

    let endGame = false;
    while (!endGame) {
      this.print();
      this.askQuestion();
      if (this.charPosition() == hat) {
        console.log("Congrats, you found your hat!");
        endGame = true;
      } else if (this.charPosition() == hole) {
        console.log("Sorry, you fell down a hole!");
        endGame = true;
      } else if (
        this.charPosition[this.locationX] < 0 ||
        this.charPosition[this.locationY] < 0
      ) {
        console.log("Oh no you have disappeared");
        endGame = true;
      }
    }
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
    const answer = prompt("Which way? ");
    if (answer == "u") {
      this.moveUp();
    } else if (answer == "d") {
      this.moveDown();
    } else if (answer == "l") {
      this.moveLeft();
    } else if (answer == "r") {
      this.moveRight();
    } else {
      prompt("Please enter either u, d, l or r to move the player. ");
    }
  }

  moveDown() {
    this.locationX += 1;
    this.charPosition();
  }

  moveUp() {
    this.locationX -= 1;
    this.charPosition();
  }

  moveRight() {
    this.locationY += 1;
    this.charPosition();
  }

  moveLeft() {
    this.locationY -= 1;
    this.charPosition();
  }
} //End of field class

//Create an instance object for the field
const myField = new Field();
myField.runGame();
