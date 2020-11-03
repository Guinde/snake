import "./style.css";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gridElem = 20; // 40 * 30
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];
let apple = [5, 5];
let score = 0;
let speed = 300;
let direction = "right";

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 600);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(
      body[0] * gridElem,
      body[1] * gridElem,
      gridElem - 1,
      gridElem - 1
    );
  }
};

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(
    apple[0] * gridElem,
    apple[1] * gridElem,
    gridElem - 1,
    gridElem - 1
  );
};

const drawScore = () => {
  ctx.fillStyle = "white";
  ctx.font = "40px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
};

const increaseSpeed = () => {
  if (speed === 40) {
    return;
  } else {
    speed -= 20;
  }
};

const eatApple = () => {
  const head = snake[0];
  if (head[0] === apple[0] && head[1] === apple[1]) {
    score++;
    increaseSpeed();
    return true;
  }
  return false;
};

const changeApplePosition = () => {
  const [x, y] = [
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 30),
  ];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return changeApplePosition();
    }
  }
  apple = [x, y];
};

const gameOver = () => {
  if (
    snake[0][0] > 39 ||
    snake[0][0] < 0 ||
    snake[0][1] > 29 ||
    snake[0][1] < 0
  )
    return true;
  else {
    const [head, ...body] = snake;
    for (let bodyElem of body) {
      if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) return true;
    }
  }
  return false;
};

const changeSnakeDirection = (e) => {
  switch (e.key) {
    case "ArrowRight": {
      direction = "right";
      break;
    }
    case "ArrowLeft": {
      direction = "left";
      break;
    }
    case "ArrowUp": {
      direction = "up";
      break;
    }
    case "ArrowDown": {
      direction = "down";
      break;
    }
    default: {
    }
  }
};

window.addEventListener("keydown", changeSnakeDirection);

const updateSnakePosition = () => {
  let head;
  switch (direction) {
    case "right": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "left": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "up": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "down": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
    default: {
    }
  }
  snake.unshift(head);
  if (eatApple()) {
    changeApplePosition();
  } else {
    snake.pop();
  }
  return gameOver();
};

const move = () => {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, speed);
  } else {
    alert("You Lose ! Score");
  }
};

requestAnimationFrame(move);
