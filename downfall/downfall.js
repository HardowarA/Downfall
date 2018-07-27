// class GamePlay {
//   gameStart() {
//     const level = new Level()
//
//
//     const playArea = new PlayArea
//     this.playArea.constructLevels();
//     this.playArea.
//   }
//
//   levelGenerator() {
//
//   }
// }
//
//
// class PlayArea {
//   constructor(ballPlayer, levels = []) {
//     this.canvas = document.getElementById("downfallCanvas");
//     this.ctx = canvas.getContext("2d");
//     this.levels = levels;
//     this.ballPlayer = ballPlayer;
//     this.downwardVelocity = 10; //10 is a placeholder.
//     this.width = this.canvas.width;
//     this.height = this.canvas.height;
//   }
//
//   constructLevels() {
//     for(let i = 0; i < this.levels.length; i++) {
//       level = this.levels[i];
//       level.constructLevel();
//     }
//   }
//
//   createPlayer() {
//     this.ballPlayer.drawBall();
//   }
// }
//
//
//
// class BallPlayer {
//   constructor(color = "green") {
//     this.radius = 10;
//     this.x = 50;
//     this.y = 50;
//     this.color = "green";
//   }
//
//   function drawBall() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
//     ctx.fillStyle = "blue";
//     ctx.fill();
//     ctx.closePath();
//   }
//
//   function colorToggle() {
//
//   }
// }
//
// class Level {
//   constructor(platforms = []){
//     this.platforms = platforms;
//   }
//
//   constructLevel() {
//     for(let i = 0; i < this.platforms.length; i++) {
//       let platform = this.platforms[i];
//       platform.drawPlatform();
//     }
//   }
// }
//
//
//
//
// class Platform {
//   constructor(x = 0, y = 0, length = 100, color = "red") {
//     this.x = x;
//     this.y = y;
//     this.length = length;
//     this.color = color
//     this.status = 1;
//   }
//
//   function drawPlatform() {
//     ctx.beginPath();
//     ctx.rect(this.x, this.y, this.length, 15);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//     ctx.closePath();
//   }
// }

this.canvas = document.getElementById("downfallCanvas");
    this.ctx = canvas.getContext("2d");


  let ballx = 160;
  let bally = 330;
  let ballMaxUpwardMovement = 50;
  let balldx = 5;
  let balldy = 5;
  let ballrad = 10;
  let ballDisplacement = 103;

  let maxlinkdx = 500;
  let linkplatformdx = 0;


  let linkplatformdy = 0;

  let rightPressed = false;
  let leftPressed = false;


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
      // if(this.platformx + this.platformlength + linkplatformx > canvas.width && linkplatformx < this.platformlength) {
      //   // debugger
      //   let rectangleDiff = this.platformx + linkplatformx + this.platformlength - canvas.width;
      //   ctx.beginPath();
      //   ctx.rect(0, this.platformy + linkplatformy, rectangleDiff, 15)
      //   ctx.fillStyle = this.color;
      //   ctx.fill();
      //   ctx.closePath();
      // }
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
    // constructor(platforms) {
      this.status = 1;
      this.platforms = platforms;
    }
    renderPlatforms(linkplatformx, linkplatformy) {
      let linklength = linkplatformx % 100;
      // for(let i = 0; i < this.platforms.length; i++) {
      //   let platform = this.platforms[i];
      //   // debugger
      //   if (linklength === 1) {
      //     // debugger
      //     this.platforms.unshift(this.platforms.pop());
      //     // debugger
      //   }
      // }
      for(let i = 0; i < this.platforms.length; i++) {
        let platform = this.platforms[i];
        platform.drawPlatform(linkplatformx, linkplatformy);
      }
    }
  }

  function linkedPlatform(height, linkplatformx, linkplatformy) {
    const platformArray = [];

    // platformArray.push(new Platform(-500, 400, 100, "#eee"));
    platformArray.push(new Platform(-400, height, 100, "red"));
    platformArray.push(new Platform(-300, height, 100, "blue"));
    // platformArray.push(new Platform(-200, 400, 100, "#eee"));
    platformArray.push(new Platform(-100, height, 100, "green"));

    // platformArray.push(new Platform(0, 400, 100, "#eee"));
    platformArray.push(new Platform(100, height, 100, "red"));
    platformArray.push(new Platform(200, height, 100, "blue"));
    // platformArray.push(new Platform(300, 400, 100, "#eee"));
    platformArray.push(new Platform(400, height, 100, "green"));

    // platformArray.push(new Platform(500, 400, 100, "#eee"));
    platformArray.push(new Platform(600, height, 100, "red"));
    platformArray.push(new Platform(700, height, 100, "blue"));
    // platformArray.push(new Platform(800, 400, 100, "#eee"));
    platformArray.push(new Platform(900, height, 100, "green"));

    let linkedplatform = new LinkedPlatform(platformArray);
    return linkedplatform;
  }

  function levels(linkplatformx, linkplatformy) {
    let linkedplatforms = [];
    let height = 400;
    for(let i = 0; i < 10; i++) {
      let linkedplatform = linkedPlatform(height);
      linkedplatforms.push(linkedplatform);
      height += 100;
    }
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    platformDetection();
    maxHeightDetection();

    

    levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    if(rightPressed) {
         linkplatformdx += 8;
       } else if (leftPressed) {
         linkplatformdx -= 8;
       }
    bally -= balldy;
      //   platformDetection();
      //   maxHeightDetection();
      //   if(rightPressed && platformx < canvas.width - platformlength) {
      //       linkplatformx += 7;
      //     } else if (leftPressed && platformx > 0) {
      //       linkplatformx -= 7;
      //     }
      //   bally -= balldy;
      //   // ballDisplacement -= balldy;
    ballDisplacement += balldy;


    linkplatformdx = linkplatformdx % 500;
    requestAnimationFrame(animate);
  }

  function platformDetection() {
    ballLeft = ballx - ballrad;
    ballRight = ballx + ballrad;
    ballBottom = bally + ballrad
    // debugger ;
    // debugger
    let allLevels = levelsBuilder.linkedplatforms;
    let linkedplatform = allLevels[0];
    if(linkedplatform.status === 1) {
      let platforms = linkedplatform.platforms;
      for(let i = 0; i < platforms.length; i++){
        platform = platforms[i];
        let platformx = platform.platformx + linkplatformdx;
        // let platformx = Math.abs(platform.platformx);
        // debugger
        if( (ballLeft >= platformx && ballLeft <= platformx +
        platform.platformlength && ballBottom - 3 >= platform.platformy) ||
        (ballRight >= platformx && ballRight <= platformx +
          platform.platformlength && ballBottom -3 >= platform.platformy)) {
            // debugger
          // (ballRight > platformx + linkplatformdx && ballRight < platformx +
            // platform.platformlength + linkplatformdx && ballBottom > platform.platformy + linkplatformdy)) {
          balldy = -balldy;
          ballDisplacement = 0;
          break;
          // debugger
        // } else if(ballBottom > platform.platformy) {
        //   debugger
        //   linkedplatform.status = 0;
      } else if(ballBottom >= platform.platformy + 6) {
          // debugger
          linkedplatform.status = 0;
          allLevels.shift();
          break;
          // debugger
        }
      }
    }
  }

  function maxHeightDetection() {
    if(ballDisplacement >= 103) {
      balldy = - balldy;
      ballDisplacement = 0;
    }
  }

  animate();


  // drawBall();
  // drawPlatform();
  // linkedPlatform();

  // function ballAnimation() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   // drawPlatform();
  //   // drawBall();
  //   platformDetection();
  //   maxHeightDetection();
  //   if(rightPressed && platformx < canvas.width - platformlength) {
  //       linkplatformx += 7;
  //     } else if (leftPressed && platformx > 0) {
  //       linkplatformx -= 7;
  //     }
  //   bally -= balldy;
  //   // ballDisplacement -= balldy;
  //   ballDisplacement += balldy;
  //   console.log(ballDisplacement);
  //   requestAnimationFrame(ballAnimation);
  // }
  //
  // function platformDetection() {
  //   ballLeft = ballx - ballrad;
  //   ballRight = ballx + ballrad;
  //   ballBottom = bally + ballrad
  //   // debugger ;
  //   if(ballLeft > platformx && ballLeft < platformx + platformlength && ballBottom > platformy) {
  //     balldy = -balldy;
  //     ballDisplacement = 0;
  //   }
  // }
  //
  // function maxHeightDetection() {
  //   if(ballDisplacement >= 70) {
  //     balldy = - balldy;
  //     ballDisplacement = 0;
  //   }
  // }
  //
  // document.addEventListener("keyup", keyUpHandler, false);
  // document.addEventListener("keydown", keyDownHandler, false);
  //
  // function keyDownHandler(e) {
  //   if (e.keyCode === 39) {
  //     rightPressed = true;
  //   } else if (e.keyCode === 37) {
  //     leftPressed = true;
  //   }
  // }
  //
  //
  // function keyUpHandler(e) {
  //   if (e.keyCode === 39) {
  //     rightPressed = false;
  //   } else if (e.keyCode === 37) {
  //     leftPressed = false;
  //   }
  // }
  //
  // ballAnimation();
