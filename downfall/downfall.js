this.canvas = document.getElementById("downfallCanvas");
this.ctx = canvas.getContext("2d");


  let ballx = 160;
  let bally = 330;
  let ballMaxUpwardMovement = 50;
  let balldx = 5;
  let balldy = 5;
  let ballrad = 10;
  let ballDisplacement = 90;
  let lowestPoint = 390;

  let maxlinkdx = 500;
  let linkplatformdx = 0;


  let linkplatformdy = 0;

  let rightPressed = false;
  let leftPressed = false;
  let score = 0;


  class Platform {
    constructor(platformx, platformy, platformlength, color = "blue") {
      this.platformx = platformx;
      this.platformy = platformy;
      this.platformlength = platformlength;
      this.color = color;
    }
     drawPlatform(linkplatformx = 0, linkplatformy = 0) {
      ctx.beginPath();
      ctx.rect(this.platformx + linkplatformx, this.platformy + linkplatformy, this.platformlength, 10);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  class LevelBuilder {
    constructor(linkedplatforms = []) {
      this.linkedplatforms = linkedplatforms;
    }
    renderLevel(linkplatformx, linkplatformy) {
      let linkedplats = this.linkedplatforms;
      for(let i = 0; i < linkedplats.length; i++) {
        let linkedplat = linkedplats[i];
        linkedplat.renderPlatforms(linkplatformx, linkplatformy);
      }
    }
  }


  class LinkedPlatform {
    constructor(platforms) {
      this.status = 1;
      this.platforms = platforms;
    }
    renderPlatforms(linkplatformx, linkplatformy) {
      let linklength = linkplatformx % 100;
      for(let i = 0; i < this.platforms.length; i++) {
        let platform = this.platforms[i];
        platform.drawPlatform(linkplatformx, linkplatformy);
      }
    }
  }

  function linkedPlatform(height, linkplatformx, linkplatformy) {
    const platformArray = [];


    let leastWidthCoverage = 400;
    let greatestWidthCoverage = 450;

    let targetWidthCoverage = (greatestWidthCoverage - Math.floor(Math.random()*50));
    let maxdeathSpaces = 5 - Math.floor(Math.random()* 2);
    let maxdeathSpaceCoverage = 200;
    let currentDeathSpaces = 0;
    let currentDeathSpaceCoverage = 0;

    let minEmptySpaces = 3;
    let currentWidthCoverage = 0;
    let platWidth = 0;
    let emptyCount = 0;
    if(height === 400) {
      platformArray.push(new Platform(-400, height, 100, "green"));
      platformArray.push(new Platform(-300, height, 100, "red"));
      platformArray.push(new Platform(-100, height, 100, "green"));

      platformArray.push(new Platform(100, height, 100, "green"));
      platformArray.push(new Platform(200, height, 100, "red"));
      platformArray.push(new Platform(400, height, 100, "green"));

      platformArray.push(new Platform(600, height, 100, "green"));
      platformArray.push(new Platform(700, height, 100, "red"));
      platformArray.push(new Platform(900, height, 100, "green"));
    } else {
      while(platWidth < 500) {
        let platLength = 150 - Math.floor(Math.random()*100);
        if(platLength + platWidth > 500) {
          platLength = 500 - platWidth;
          if(platLength < 20) {
            break;
          }
        }
        let colorArray = ['red', 'green'];
        let colorChoice = 1;
        if (maxdeathSpaces > currentDeathSpaces && maxdeathSpaceCoverage > currentDeathSpaceCoverage) {
          colorChoice = Math.floor(Math.random()*2);
        }
        let platColor = colorArray[colorChoice];
        let empty = Math.floor(Math.random()*2);
        if(emptyCount === 0 && platWidth + platLength >= 400) {
          empty = 1;
          emptyCount++;
        }
        if(emptyCount >= 3) {
          empty = 0;
        }

        if(empty === 0) {
          if(platColor === "red") {
            platLength = 70 - Math.floor(Math.random()*50);
            if(platLength + platWidth > 500) {
              platLength = 500 - platWidth;
            }
            if(platLength + platWidth > 500) {
              platLength = 500 - platWidth;
              if(platLength < 20) {
                break;
              }
            }
          }
          let plat = new Platform(platWidth, height, platLength, platColor);
          let platLeft = new Platform(platWidth - 500, height, platLength, platColor);
          let platRight = new Platform(platWidth + 500, height, platLength, platColor);
          platWidth += platLength;
          platformArray.push(plat);
          platformArray.push(platLeft);
          platformArray.push(platRight);
          if(platColor === 'red') {
            currentDeathSpaces += 1;
            currentDeathSpaceCoverage += platLength;
          }
        } else {
          platWidth += (150 - Math.floor(Math.random()*100));
          emptyCount++;
        }
      }
      if(platformArray.length === 0) {
        let resPlatWidth = Math.floor(Math.random()*500);
        let resPlatLength = 150 - Math.floor(Math.random()* 100);
        let resColor = "green";
        let rescuePlat = new Platform(resPlatWidth, height, resPlatLength, resColor);
        let rescuePlatLeft = new Platform(resPlatWidth - 500, height, resPlatLength, resColor);
        let rescuePlatRight = new Platform(resPlatWidth + 500, height, resPlatLength, resColor);
        platformArray.push(rescuePlat);
        platformArray.push(rescuePlatLeft);
        platformArray.push(rescuePlatRight);
      }
    }

    let linkedplatform = new LinkedPlatform(platformArray);
    return linkedplatform;
  }

  function levels(linkplatformx, linkplatformy) {
    let linkedplatforms = [];
    let height = 400;
    for(let i = 0; i < 100; i++) {
      let linkedplatform = linkedPlatform(height);
      linkedplatforms.push(linkedplatform);
      height += 125;
    }
    let winPlatform = new Platform(-500, height + 50, 1500, "gold");
    let winLinkedPlatform = new LinkedPlatform([winPlatform]);
    linkedplatforms.push(winLinkedPlatform);
    let levelBuilder = new LevelBuilder(linkedplatforms);
    return levelBuilder;
  }

  let levelsBuilder = levels();

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballx, bally, ballrad, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("keydown", keyDownHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode === 39) {
      rightPressed = true;
    } else if (e.keyCode === 37) {
      leftPressed = true;
    }
  }


  function keyUpHandler(e) {
    if (e.keyCode === 39) {
      rightPressed = false;
    } else if (e.keyCode === 37) {
      leftPressed = false;
    }
  }

  let count = 0;
  let dropCounter = 0;

  function animate() {
    let ballBottom = bally + ballrad;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderScore();
    drawBall();
    let pD = platformDetection();
    if(pD === "endgame") {
      gameEnd();
    }
    if (pD === "wingame") {
      gameWin();
    }
    if(pD) {
      count = 1;
      dropCounter = 0;
    }
    if(ballBottom === 405 && !pD) {
      let countball = 100;
      if (countball !== 0) {
        bally += balldy;
        countball -= balldy;
      }
      let countPlat = 100;
      if(countPlat !== 0) {
        linkplatformdy -= 5;
        countPlat -= 5;
      }
      if(levelsBuilder.linkedplatforms[0].platforms[0].platformy + linkplatformdy < 400) {
        levelsBuilder.linkedplatforms[0].status = 0;
        levelsBuilder.linkedplatforms.shift();
        score += 10 + dropCounter;
        // let countScorePop = 60;
        // let height = 300;
        // renderPopScore(10 + dropCounter);
        dropCounter += 10;
      }

    }

    maxHeightDetection();

    levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    if(rightPressed) {
         linkplatformdx -= 6;
       } else if (leftPressed) {
         linkplatformdx += 6;
       }
    bally -= balldy;
    ballBottom = bally + ballrad;
    ballDisplacement += balldy;

    linkplatformdx = linkplatformdx % 500;
    requestAnimationFrame(animate);
  }

  function animatePlatform(count) {
    let id = requestAnimationFrame(animatePlatform);
    while(true){
    if(count === 0) {
      cancelAnimationFrame(id);
      break;
    }
    linkplatformdy -= 100;

    count -= 200;

  }
  }

  function renderScore() {
    ctx.font = "30px Verdana";
    ctx.fillStyle = "gold";
    ctx.fillText(`Score: ${score}`, 20, 30);
  }

  function renderPopScore(scoreAddition) {
    ctx.font = "20px Verdana";
    ctx.fillStyle = "gold";
    ctx.fillText(`+${scoreAddition}`, 170, 300);
  }

  function restartGame() {

    ballx = 160;
    bally = 330;
    ballMaxUpwardMovement = 50;
    balldx = 5;
    balldy = 5;
    ballrad = 10;
    ballDisplacement = 90;
    lowestPoint = 390;

    maxlinkdx = 500;
    linkplatformdx = 0;


    linkplatformdy = 0;

    rightPressed = false;
    leftPressed = false;

    levelsBuilder = levels();

    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);

     count = 0;
     dropCounter = 0;
     score = 0;
  }

  function gameEnd() {
    document.removeEventListener("keyup", keyUpHandler, false);
    document.removeEventListener("keydown", keyDownHandler, false);
    rightPressed = false;
    leftPressed = false;
    balldy = 0;
    ctx.font = "50px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 120, 200);
    ctx.font = "50px Verdana";
    ctx.fillStyle = "gold";
    ctx.fillText(`Your Score: ${score}`, 100, 300);
  }

  function gameWin() {
    document.removeEventListener("keyup", keyUpHandler, false);
    document.removeEventListener("keydown", keyDownHandler, false);
    rightPressed = false;
    leftPressed = false;
    balldy = 0;
    ctx.font = "80px Verdana";
    ctx.fillStyle = "gold";
    ctx.fillText("YOU WON!", 50, 200);
  }

  function platformDetection() {
    let ballLeft = ballx - ballrad;
    let ballRight = ballx + ballrad;
    let ballBottom = bally + ballrad;
    let allLevels = levelsBuilder.linkedplatforms;

    for(let s = 0; s < allLevels.length; s++) {
      let linkedplatform = allLevels[s];
    if(linkedplatform.status === 1) {
      let platforms = linkedplatform.platforms;
      for(let i = 0; i < platforms.length; i++){
        platform = platforms[i];
        let platformx = platform.platformx + linkplatformdx;
        let platformy = platform.platformy + linkplatformdy;

        if( (ballLeft >= platformx && ballLeft <= platformx +
        platform.platformlength && ballBottom - 3 >= platformy) ||
        (ballRight >= platformx && ballRight <= platformx +
          platform.platformlength && ballBottom -3 >= platformy)) {

          if(platform.color === "gold") {
            return "wingame";
          } else if(platform.color === "red") {
            return "endgame";
          } else {
          balldy = -balldy;
          ballDisplacement = 0;
          return true;
         }
        }
       }
     }
   }
    return false;
  }

  function maxHeightDetection() {
    if(ballDisplacement >= 90) {
      balldy = - balldy;
      ballDisplacement = 0;
    }
  }

  animate();
