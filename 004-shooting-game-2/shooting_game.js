var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = {
  x: 280,
  y: 360,
  width: 40,
  height: 40,
  speed: 5
};

var bullets = [];
var enemies = [];

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = 'red';
  for (var i = 0; i < bullets.length; i++) {
    ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
  }
}

function drawEnemies() {
  ctx.fillStyle = 'green';
  for (var i = 0; i < enemies.length; i++) {
    ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  }
}

function movePlayer(event) {
  switch (event.keyCode) {
    case 37:
      player.x -= player.speed;
      break;
    case 39:
      player.x += player.speed;
      break;
    case 32:
      bullets.push({
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 10,
        height: 10,
        speed: 10
      });
      break;
  }
}

function moveBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].y -= bullets[i].speed;
  }
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += enemies[i].speed;
  }
}

function addEnemy() {
  var x = Math.floor(Math.random() * (canvas.width - 40));
  var y = -40;
  var speed = Math.floor(Math.random() * 5) + 1;
  enemies.push({
    x: x,
    y: y,
    width: 40,
    height: 40,
    speed: speed
  });
}

function detectCollision() {
  for (var i = 0; i < bullets.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (bullets[i].x < enemies[j].x + enemies[j].width &&
          bullets[i].x + bullets[i].width > enemies[j].x &&
          bullets[i].y < enemies[j].y + enemies[j].height &&
          bullets[i].y + bullets[i].height > enemies[j].y) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        break;
      }
    }
  }
  for (var i = 0; i < enemies.length; i++) {
    if (player.x < enemies[i].x + enemies[i].width &&
        player.x + player.width > enemies[i].x &&
        player.y < enemies[i].y + enemies[i].height &&
        player.y + player.height > enemies[i].y) {
        alert('Game Over!');
        document.location.reload();
        clearInterval(interval);
        }
        }
        }
        
        function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        function draw() {
        clearCanvas();
        drawPlayer();
        drawBullets();
        drawEnemies();
        moveBullets();
        moveEnemies();
        detectCollision();
      }
      
      var interval = setInterval(function() {
      addEnemy();
      }, 1000);
      
      document.addEventListener('keydown', movePlayer);
      
      var gameLoop = setInterval(function() {
      draw();
      }, 20);