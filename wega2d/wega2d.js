const TILE_SIZE = 48;
const MAZE_COLUMNS = 20;
const MAZE_ROWS = 15;
const TOTAL_LUIGIS = 100;

let gameState = "start";
let mazeTiles = [];
let collectibleItems = [];
let wallRectangles = [];
let player;
let wegaEnemy;
let rorysEnemy;
let maltigiEnemy;
let lastRorysTeleport = 0;
let rorysEffectUntil = 0;
let lastMaltigiCycle = 0;

function setup() {
  createCanvas(MAZE_COLUMNS * TILE_SIZE, MAZE_ROWS * TILE_SIZE);
  textFont("Arial");
  createMaze();
  collectibleItems = [];
  createCollectibles();
  createPlayer();
  createEnemies();
}

function draw() {
  background(18, 22, 34);
  if (gameState === "playing") {
    updateEnemies();
  }

  drawMaze();
  if (gameState !== "start") {
    drawCollectibles();
    drawPlayer();
    drawEnemies();
  }

  if (gameState === "playing") {
    displayHUD();
  } else {
    showCurrentScreen();
  }

  drawRorysEffect();
}

function createMaze() {
  mazeTiles = [];
  wallRectangles = [];
  for (let row = 0; row < MAZE_ROWS; row++) {
    mazeTiles[row] = [];
    for (let column = 0; column < MAZE_COLUMNS; column++) {
      let isWalkable = false;
      if (row === 0 || row === MAZE_ROWS - 1 || column === 0 || column === MAZE_COLUMNS - 1) {
        isWalkable = false;
      } else if (row % 2 === 1) {
        isWalkable = true;
      } else {
        const connectorColumns = [1, 4, 7, 10, 13, 16, 18];
        isWalkable = connectorColumns.includes(column);
      }

      mazeTiles[row][column] = isWalkable ? 1 : 0;
      if (!isWalkable) {
        wallRectangles.push({
          left: column * TILE_SIZE,
          top: row * TILE_SIZE,
          right: (column + 1) * TILE_SIZE,
          bottom: (row + 1) * TILE_SIZE
        });
      }
    }
  }
}

function startGame() {
  collectibleItems = [];
  createCollectibles();
  createPlayer();
  createEnemies();
  lastRorysTeleport = millis();
  rorysEffectUntil = 0;
  lastMaltigiCycle = millis();
  maltigiEnemy.customMaltigiState = "idle";
  maltigiEnemy.customChargeDirection = { customX: 0, customY: 0 };
  maltigiEnemy.customAimUntil = 0;
  maltigiEnemy.customChargeUntil = 0;
  gameState = "playing";
}

function createPlayer() {
  player = {
    customX: TILE_SIZE * 1.5,
    customY: TILE_SIZE * 1.5,
    customRadius: 16,
    customWegaGraceUntil: millis() + 2200
  };
}

function createEnemies() {
  wegaEnemy = makeEnemy(TILE_SIZE * 18.5, TILE_SIZE * 13.5, "#f2c94c", "wega");
  rorysEnemy = makeEnemy(TILE_SIZE * 10.5, TILE_SIZE * 9.5, "#ff4f7a", "rorys");
  maltigiEnemy = makeEnemy(TILE_SIZE * 18.5, TILE_SIZE * 1.5, "#6847d8", "maltigi");
  maltigiEnemy.customMaltigiState = "idle";
  maltigiEnemy.customChargeDirection = { customX: 0, customY: 0 };
  maltigiEnemy.customAimUntil = 0;
  maltigiEnemy.customChargeUntil = 0;
}

function makeEnemy(customX, customY, color, enemyType) {
  return {
    customX: customX,
    customY: customY,
    customColor: color,
    customType: enemyType,
    customRadius: 17,
    customPath: [],
    customLastPathUpdate: 0
  };
}

function createCollectibles() {
  const walkablePositions = [];
  for (let row = 1; row < MAZE_ROWS - 1; row++) {
    for (let column = 1; column < MAZE_COLUMNS - 1; column++) {
      if (mazeTiles[row][column] === 1) {
        walkablePositions.push({
          customX: column * TILE_SIZE + TILE_SIZE / 2,
          customY: row * TILE_SIZE + TILE_SIZE / 2
        });
      }
    }
  }

  const blockedPositions = ["1,1", "18,13", "10,9", "18,1"];
  shuffle(walkablePositions);
  for (const position of walkablePositions) {
    if (collectibleItems.length >= TOTAL_LUIGIS) break;
    const column = Math.floor(position.customX / TILE_SIZE);
    const row = Math.floor(position.customY / TILE_SIZE);
    if (blockedPositions.includes(column + "," + row)) continue;
    const tooCloseToEnemy = [
      TILE_SIZE * 18.5,
      TILE_SIZE * 13.5,
      TILE_SIZE * 10.5,
      TILE_SIZE * 9.5,
      TILE_SIZE * 18.5,
      TILE_SIZE * 1.5
    ];
    const enemyPositions = [
      { customX: tooCloseToEnemy[0], customY: tooCloseToEnemy[1] },
      { customX: tooCloseToEnemy[2], customY: tooCloseToEnemy[3] },
      { customX: tooCloseToEnemy[4], customY: tooCloseToEnemy[5] }
    ];
    const overlapsEnemy = enemyPositions.some(enemy => dist(position.customX, position.customY, enemy.customX, enemy.customY) < 55);
    if (!overlapsEnemy) {
      collectibleItems.push({
        customX: position.customX,
        customY: position.customY,
        customCollected: false
      });
    }
  }
}

function drawMaze() {
  for (let row = 0; row < MAZE_ROWS; row++) {
    for (let column = 0; column < MAZE_COLUMNS; column++) {
      if (mazeTiles[row][column] === 1) {
        fill(44, 49, 62);
        noStroke();
        rect(column * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        fill(56, 62, 76);
        circle(column * TILE_SIZE + 24, row * TILE_SIZE + 24, 3);
      } else {
        fill(9, 11, 18);
        stroke(28, 33, 46);
        strokeWeight(1);
        rect(column * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

function drawCollectibles() {
  for (const collectible of collectibleItems) {
    if (!collectible.customCollected) {
      drawMiniLuigi(collectible.customX, collectible.customY);
    }
  }
}

function drawMiniLuigi(customX, customY) {
  push();
  translate(customX, customY);
  noStroke();
  fill(72, 185, 73);
  ellipse(0, 3, 17, 22);
  fill(255, 221, 128);
  circle(0, -4, 12);
  fill(52, 145, 54);
  ellipse(0, -11, 20, 8);
  fill(255, 255, 255);
  circle(-3, -5, 3);
  circle(3, -5, 3);
  pop();
}

function drawPlayer() {
  push();
  translate(player.customX, player.customY);
  stroke(53, 38, 18);
  strokeWeight(2);
  fill(255, 205, 67);
  ellipse(0, 2, 34, 38);
  fill(255, 226, 93);
  ellipse(0, -9, 23, 16);
  fill(255, 240, 163);
  circle(-8, 14, 8);
  circle(8, 14, 8);
  fill(255, 255, 255);
  noStroke();
  circle(-5, -8, 5);
  circle(5, -8, 5);
  fill(80, 57, 30);
  circle(-5, -7, 2);
  circle(5, -7, 2);
  pop();
}

function drawEnemies() {
  drawWega();
  drawRorys();
  drawMaltigi();
}

function drawWega() {
  push();
  translate(wegaEnemy.customX, wegaEnemy.customY);
  fill(242, 201, 76);
  stroke(90, 62, 30);
  strokeWeight(3);
  ellipse(0, 0, 36, 38);
  fill(255);
  circle(-8, -8, 9);
  circle(8, -8, 9);
  fill(20);
  circle(-6, -8, 4);
  circle(10, -8, 4);
  line(-11, 10, 11, 10);
  pop();
}

function drawRorys() {
  push();
  translate(rorysEnemy.customX, rorysEnemy.customY);
  fill(255, 79, 122);
  stroke(86, 20, 49);
  strokeWeight(3);
  ellipse(0, 0, 37, 37);
  fill(255, 224, 235);
  triangle(-13, -6, 0, 12, -3, -13);
  triangle(13, -6, 0, 12, 3, -13);
  fill(60, 15, 40);
  circle(-7, -7, 5);
  circle(7, -7, 5);
  pop();
}

function drawMaltigi() {
  showAimLine();
  push();
  translate(maltigiEnemy.customX, maltigiEnemy.customY);
  fill(104, 71, 216);
  stroke(38, 24, 103);
  strokeWeight(3);
  ellipse(0, 0, 37, 37);
  fill(226, 211, 255);
  circle(-7, -7, 8);
  circle(7, -7, 8);
  fill(60, 20, 20);
  circle(-7, -6, 3);
  circle(7, -6, 3);
  stroke(232, 215, 255);
  line(-13, 10, 13, 10);
  pop();
}

function handlePlayerMovement() {
  let horizontalMovement = 0;
  let verticalMovement = 0;
  if (keyIsDown(65)) horizontalMovement -= 1;
  if (keyIsDown(68)) horizontalMovement += 1;
  if (keyIsDown(87)) verticalMovement -= 1;
  if (keyIsDown(83)) verticalMovement += 1;

  if (horizontalMovement !== 0 || verticalMovement !== 0) {
    const length = Math.sqrt(horizontalMovement * horizontalMovement + verticalMovement * verticalMovement);
    horizontalMovement /= length;
    verticalMovement /= length;
    moveWithWallCollision(player, horizontalMovement * 3.25, verticalMovement * 3.25, player.customRadius);
  }
}

function moveWithWallCollision(character, movementX, movementY, characterRadius) {
  const oldX = character.customX;
  character.customX += movementX;
  if (characterHitsWall(character.customX, character.customY, characterRadius)) {
    character.customX = oldX;
  }
  const oldY = character.customY;
  character.customY += movementY;
  if (characterHitsWall(character.customX, character.customY, characterRadius)) {
    character.customY = oldY;
  }
}

function characterHitsWall(characterX, characterY, characterRadius) {
  for (const wall of wallRectangles) {
    const closestX = constrain(characterX, wall.left, wall.right);
    const closestY = constrain(characterY, wall.top, wall.bottom);
    if (dist(characterX, characterY, closestX, closestY) < characterRadius) return true;
  }
  return false;
}

function updateEnemies() {
  handlePlayerMovement();
  updateWega();
  updateRorys();
  updateMaltigi();
  collectLuigi();
  checkWinCondition();
  checkLoseCondition();
}

function updateWega() {
  if (millis() < player.customWegaGraceUntil) return;
  const collectedCount = collectibleItems.filter(item => item.customCollected).length;
  const difficultySpeed = Math.min(1.4, 1.05 + collectedCount * 0.0035);
  const pathUpdateInterval = 430;
  if (millis() - wegaEnemy.customLastPathUpdate > pathUpdateInterval) {
    wegaEnemy.customPath = findMazePath(wegaEnemy.customX, wegaEnemy.customY, player.customX, player.customY);
    wegaEnemy.customLastPathUpdate = millis();
  }
  if (wegaEnemy.customPath.length > 1) {
    const nextTile = wegaEnemy.customPath[1];
    moveEnemyToward(wegaEnemy, nextTile.customX, nextTile.customY, difficultySpeed);
  }
}

function moveEnemyToward(enemy, targetX, targetY, amount) {
  const angleToTarget = atan2(targetY - enemy.customY, targetX - enemy.customX);
  moveWithWallCollision(enemy, cos(angleToTarget) * amount, sin(angleToTarget) * amount, enemy.customRadius);
}

function findMazePath(startX, startY, endX, endY) {
  const startColumn = Math.floor(startX / TILE_SIZE);
  const startRow = Math.floor(startY / TILE_SIZE);
  const endColumn = Math.floor(endX / TILE_SIZE);
  const endRow = Math.floor(endY / TILE_SIZE);
  const queue = [{ column: startColumn, row: startRow }];
  const visited = new Set([startColumn + "," + startRow]);
  const parents = {};
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    if (current.column === endColumn && current.row === endRow) break;
    const neighbors = [
      { column: current.column + 1, row: current.row },
      { column: current.column - 1, row: current.row },
      { column: current.column, row: current.row + 1 },
      { column: current.column, row: current.row - 1 }
    ];
    for (const neighbor of neighbors) {
      const key = neighbor.column + "," + neighbor.row;
      if (
        neighbor.column >= 0 && neighbor.column < MAZE_COLUMNS &&
        neighbor.row >= 0 && neighbor.row < MAZE_ROWS &&
        mazeTiles[neighbor.row][neighbor.column] === 1 &&
        !visited.has(key)
      ) {
        visited.add(key);
        parents[key] = current.column + "," + current.row;
        queue.push(neighbor);
      }
    }
  }

  const endKey = endColumn + "," + endRow;
  if (!visited.has(endKey)) return [];
  const path = [];
  let key = endKey;
  while (key) {
    const [column, row] = key.split(",").map(Number);
    path.push({
      customX: column * TILE_SIZE + TILE_SIZE / 2,
      customY: row * TILE_SIZE + TILE_SIZE / 2
    });
    key = parents[key];
  }
  return path.reverse();
}

function updateRorys() {
  if (millis() - lastRorysTeleport >= 10000) {
    teleportRorys();
    lastRorysTeleport = millis();
  }
  if (dist(player.customX, player.customY, rorysEnemy.customX, rorysEnemy.customY) < player.customRadius + rorysEnemy.customRadius) {
    rorysEffectUntil = millis() + 2500;
  }
}

function teleportRorys() {
  let attempts = 0;
  while (attempts < 150) {
    attempts++;
    const row = floor(random(1, MAZE_ROWS - 1));
    const column = floor(random(1, MAZE_COLUMNS - 1));
    if (mazeTiles[row][column] !== 1) continue;
    const newX = column * TILE_SIZE + TILE_SIZE / 2;
    const newY = row * TILE_SIZE + TILE_SIZE / 2;
    if (dist(newX, newY, player.customX, player.customY) > 120) {
      rorysEnemy.customX = newX;
      rorysEnemy.customY = newY;
      return;
    }
  }
}

function updateMaltigi() {
  const now = millis();
  if (maltigiEnemy.customMaltigiState === "idle" && now - lastMaltigiCycle >= 5000) {
    maltigiEnemy.customMaltigiState = "aiming";
    maltigiEnemy.customAimUntil = now + 1100;
    maltigiEnemy.customChargeDirection = {
      customX: player.customX - maltigiEnemy.customX,
      customY: player.customY - maltigiEnemy.customY
    };
    const directionLength = Math.sqrt(
      maltigiEnemy.customChargeDirection.customX * maltigiEnemy.customChargeDirection.customX +
      maltigiEnemy.customChargeDirection.customY * maltigiEnemy.customChargeDirection.customY
    );
    if (directionLength > 0) {
      maltigiEnemy.customChargeDirection.customX /= directionLength;
      maltigiEnemy.customChargeDirection.customY /= directionLength;
    }
  } else if (maltigiEnemy.customMaltigiState === "aiming" && now >= maltigiEnemy.customAimUntil) {
    maltigiEnemy.customMaltigiState = "charging";
    maltigiEnemy.customChargeUntil = now + 850;
  } else if (maltigiEnemy.customMaltigiState === "charging") {
    const oldX = maltigiEnemy.customX;
    const oldY = maltigiEnemy.customY;
    moveWithWallCollision(
      maltigiEnemy,
      maltigiEnemy.customChargeDirection.customX * 6,
      maltigiEnemy.customChargeDirection.customY * 6,
      maltigiEnemy.customRadius
    );
    if (
      maltigiEnemy.customX === oldX &&
      maltigiEnemy.customY === oldY &&
      (maltigiEnemy.customChargeDirection.customX !== 0 || maltigiEnemy.customChargeDirection.customY !== 0)
    ) {
      maltigiEnemy.customMaltigiState = "idle";
      lastMaltigiCycle = now;
    }
    if (now >= maltigiEnemy.customChargeUntil) {
      maltigiEnemy.customMaltigiState = "idle";
      lastMaltigiCycle = now;
    }
  }
}

function showAimLine() {
  if (maltigiEnemy.customMaltigiState !== "aiming") return;
  push();
  stroke(255, 30, 65, 220);
  strokeWeight(5);
  line(
    maltigiEnemy.customX,
    maltigiEnemy.customY,
    maltigiEnemy.customX + maltigiEnemy.customChargeDirection.customX * 700,
    maltigiEnemy.customY + maltigiEnemy.customChargeDirection.customY * 700
  );
  pop();
}

function collectLuigi() {
  for (const collectible of collectibleItems) {
    if (!collectible.customCollected && dist(player.customX, player.customY, collectible.customX, collectible.customY) < 22) {
      collectible.customCollected = true;
    }
  }
}

function checkWinCondition() {
  const collectedCount = collectibleItems.filter(item => item.customCollected).length;
  if (collectedCount >= TOTAL_LUIGIS && gameState === "playing") {
    gameState = "win";
  }
}

function checkLoseCondition() {
  if (gameState !== "playing") return;
  if (dist(player.customX, player.customY, wegaEnemy.customX, wegaEnemy.customY) < player.customRadius + wegaEnemy.customRadius) {
    gameState = "lose";
  }
  if (dist(player.customX, player.customY, maltigiEnemy.customX, maltigiEnemy.customY) < player.customRadius + maltigiEnemy.customRadius) {
    gameState = "lose";
  }
}

function displayHUD() {
  const collectedCount = collectibleItems.filter(item => item.customCollected).length;
  push();
  fill(8, 10, 18, 220);
  noStroke();
  rect(0, 0, width, 78);
  fill(255);
  textSize(22);
  text("Mini Luigis: " + collectedCount + " / " + TOTAL_LUIGIS, 18, 31);
  textSize(14);
  fill(255, 219, 93);
  text("Wega: yellow", 220, 27);
  fill(255, 105, 145);
  text("Rorys: pink", 320, 27);
  fill(139, 112, 255);
  text("Maltigi: purple", 420, 27);
  fill(210);
  text("Move: W A S D   |   Collect every Mini Luigi   |   R restart", 18, 58);
  pop();
}

function showCurrentScreen() {
  if (gameState === "start") showStartScreen();
  if (gameState === "win") showWinScreen();
  if (gameState === "lose") showLoseScreen();
}

function showStartScreen() {
  push();
  fill(8, 10, 18, 238);
  noStroke();
  rect(0, 0, width, height);
  fill(255, 214, 84);
  textAlign(CENTER, CENTER);
  textSize(64);
  text("WEGA 2D", width / 2, 140);
  fill(255);
  textSize(22);
  text("Collect all 100 Mini Luigis to escape.", width / 2, 220);
  textSize(17);
  text("Wega hunts you. Maltigi charges on red aiming lines.\nRorys teleports every 10 seconds and blocks your view.", width / 2, 290);
  fill(255, 214, 84);
  textSize(24);
  text("Press ENTER to start", width / 2, 390);
  fill(210);
  textSize(15);
  text("WASD to move", width / 2, 430);
  pop();
}

function showWinScreen() {
  drawScreenPanel("YOU ESCAPED!", "All 100 Mini Luigis collected.", "Press ENTER or R to play again.");
}

function showLoseScreen() {
  drawScreenPanel("CAUGHT!", "Wega or Maltigi reached you.", "Press ENTER or R to try again.");
}

function drawScreenPanel(title, message, restartMessage) {
  push();
  fill(8, 10, 18, 225);
  noStroke();
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 214, 84);
  textSize(58);
  text(title, width / 2, height / 2 - 90);
  fill(255);
  textSize(22);
  text(message, width / 2, height / 2 - 20);
  fill(210);
  textSize(18);
  text(restartMessage, width / 2, height / 2 + 35);
  pop();
}

function drawRorysEffect() {
  if (millis() >= rorysEffectUntil || gameState !== "playing") return;
  push();
  fill(150, 12, 48, 205);
  noStroke();
  rect(0, 0, width, height);
  fill(255, 225, 235, 230);
  textAlign(CENTER, CENTER);
  textSize(58);
  text("RORYS!", width / 2, height / 2);
  fill(255, 238, 245);
  textSize(18);
  text("Vision impaired", width / 2, height / 2 + 55);
  pop();
}

function keyPressed() {
  if ((keyCode === ENTER || key === "r" || key === "R") && gameState !== "playing") {
    startGame();
    return false;
  }
  if ((key === "r" || key === "R") && gameState === "playing") {
    startGame();
    return false;
  }
  if ((key === "w" || key === "W") && gameState === "start") {
    gameState = "start";
  }
  if (["w", "W", "a", "A", "s", "S", "d", "D"].includes(key)) {
    return false;
  }
}
