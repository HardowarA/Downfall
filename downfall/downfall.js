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
  let ballDisplacement = 90;
  let lowestPoint = 390;

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


    let leastWidthCoverage = 400;
    let greatestWidthCoverage = 450;

    let targetWidthCoverage = (greatestWidthCoverage - Math.floor(Math.random()*50));
    let maxdeathSpaces = 5 - Math.floor(Math.random()* 2);
    let maxdeathSpaceCoverage = 200;
    let currentDeathSpaces = 0;
    let currentDeathSpaceCoverage = 0;

    let minEmptySpaces = 3;
    // let current EmptySpaces = 0;

    // function doesPlatformConflict(plat) {
    //   debugger
    //   if (platformArray.length === 0) {
    //     return true;
    //   }
    //   let doesIt = true;
    //   for(let i = 0; i < platformArray.length; i++) {
    //     let platform = platformArray[i];
    //     debugger
    //     if( !((platform.platformx + platform.platformlength < plat.platformx) &&
    //        (platform.platformx + platform.platformlength > plat.platformx + plat.platformlength) &&
    //        (platform.platformx < plat.platformx) &&
    //        (platform.platformx > plat.platformx + plat.platformlength) )) {
    //          doesIt = false;
    //     }
    //   }
    //   return doesIt;
    // }
    // // debugger
    // while(currentWidthCoverage < targetWidthCoverage) {
    //   debugger
    //   let platWidth = Math.floor(Math.random()*501);
    //   let platLength = 150 - Math.floor(Math.random()*100);
    //   let colorArray = ['red', 'green'];
    //   let colorChoice = 1;
    //   if (maxdeathSpaces > currentDeathSpaces && maxdeathSpaceCoverage > currentDeathSpaceCoverage) {
    //     colorChoice = Math.floor(Math.random()*2);
    //   }
    //   let platColor = colorArray[colorChoice];
    //   let plat = new Platform(platWidth, height, platLength, platColor);
    //   debugger
    //   // doesPlatformConflict(plat);
    //   // while(doesPlatformConflict(plat) !== true) {
    //   //   debugger
    //   //  platWidth = 150 - Math.floor(Math.random()*100);
    //   //  platLength = 150 - Math.floor(Math.random()*100);
    //   //  colorArray = ['red', 'green'];
    //   //  if (maxdeathSpaces < currentDeathSpaces && maxdeathSpaceCoverage < currentDeathSpaceCoverage) {
    //   //    colorChoice = Math.floor(Math.random()*2);
    //   //  } else {
    //   //    colorChoice = 1;
    //   //  }
    //   //  platColor = colorArray[colorChoice];
    //   //  plat = new Platform(platWidth, height, platLength, platColor);
    //   //  debugger
    //   // }
    //   platformArray.push(plat);
    //   let platLeft = new Platform(platWidth - 500, height, platLength, platColor);
    //   let platRight = new Platform(platWidth + 500, height, platLength, platColor);
    //   platformArray.push(platLeft);
    //   platformArray.push(platRight);
    //   currentWidthCoverage += platLength;
    //   if(platColor === 'red') {
    //     currentDeathSpaces += 1;
    //     currentDeathSpaceCoverage += platLength;
    //   }
    // }
    // let platWidth = 0;
    // let emptyCount = 0;
    // while(platWidth < 500) {
    //       let platLength = 150 - Math.floor(Math.random()*100);
    //       if(platWidth + platLength > 500) {
    //         debugger
    //         platLength = 500 - platWidth;
    //       }
    //       let colorArray = ['red', 'green'];
    //       let colorChoice = 1;
    //       if (maxdeathSpaces > currentDeathSpaces && maxdeathSpaceCoverage > currentDeathSpaceCoverage) {
    //         colorChoice = Math.floor(Math.random()*2);
    //       }
    //       let platColor = colorArray[colorChoice];
    //       let empty = Math.floor(Math.random()*2);
    //       if(emptyCount === 0 && platWidth + platLength >= 500) {
    //         empty = 1;
    //         emptyCount++;
    //       }
    //
    //       if(empty === 0) {
    //         platWidth += platLength;
    //         let plat = new Platform(platWidth, height, platLength, platColor);
    //         let platLeft = new Platform(platWidth - 500, height, platLength, platColor);
    //         let platRight = new Platform(platWidth + 500, height, platLength, platColor);
    //
    //         platformArray.push(plat);
    //         platformArray.push(platLeft);
    //         platformArray.push(platRight);
    //         if(platColor === 'red') {
    //           currentDeathSpaces += 1;
    //           currentDeathSpaceCoverage += platLength;
    //         }
    //       } else {
    //         platWidth += (150 - Math.floor(Math.random()*100));
    //         emptyCount++;
    //       }
    //       debugger
    // }

    let currentWidthCoverage = 0;
    let platWidth = 0;
    let emptyCount = 0;
    if(height === 400) {
      // platformArray.push(new Platform(-500, 400, 100, "#eee"));
      platformArray.push(new Platform(-400, height, 100, "green"));
      platformArray.push(new Platform(-300, height, 100, "maroon"));
      // platformArray.push(new Platform(-200, 400, 100, "#eee"));
      platformArray.push(new Platform(-100, height, 100, "green"));

      // platformArray.push(new Platform(0, 400, 100, "#eee"));
      platformArray.push(new Platform(100, height, 100, "green"));
      platformArray.push(new Platform(200, height, 100, "red"));
      // platformArray.push(new Platform(300, 400, 100, "#eee"));
      platformArray.push(new Platform(400, height, 100, "green"));

      // platformArray.push(new Platform(500, 400, 100, "#eee"));
      platformArray.push(new Platform(600, height, 100, "green"));
      platformArray.push(new Platform(700, height, 100, "red"));
      // platformArray.push(new Platform(800, 400, 100, "#eee"));
      platformArray.push(new Platform(900, height, 100, "green"));
    } else {
      while(platWidth < 500) {
        // debugger
        let platLength = 150 - Math.floor(Math.random()*100);
        if(platLength + platWidth > 500) {
          platLength = 500 - platWidth;
          if(platLength < 20) {
            // debugger
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
          // if(platLength + platWidth > 500) {
          //   platLength = 500 - platWidth;
          // }
          // if(platLength + platWidth > 500) {
          //   platLength = 500 - platWidth;
          //   if(platLength < 20) {
          //     // debugger
          //     break;
          //   }
          // }

          if(platColor === "red") {
            platLength = 70 - Math.floor(Math.random()*50);
            if(platLength + platWidth > 500) {
              platLength = 500 - platWidth;
            }
            if(platLength + platWidth > 500) {
              platLength = 500 - platWidth;
              if(platLength < 20) {
                // debugger
                break;
              }
            }
          }
          let plat = new Platform(platWidth, height, platLength, platColor);
          let platLeft = new Platform(platWidth - 500, height, platLength, platColor);
          let platRight = new Platform(platWidth + 500, height, platLength, platColor);
          platWidth += platLength;
          // debugger
          platformArray.push(plat);
          platformArray.push(platLeft);
          platformArray.push(platRight);
          if(platColor === 'red') {
            currentDeathSpaces += 1;
            currentDeathSpaceCoverage += platLength;
          }
          // currentWidthCoverage = platWidth;
        } else {
          platWidth += (150 - Math.floor(Math.random()*100));
          // currentWidthCoverage = platWidth;
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


    // platformArray.push(new Platform(-500, 400, 100, "#eee"));
    // platformArray.push(new Platform(-400, height, 100, "red"));
    // platformArray.push(new Platform(-300, height, 100, "blue"));
    // // platformArray.push(new Platform(-200, 400, 100, "#eee"));
    // platformArray.push(new Platform(-100, height, 100, "green"));
    //
    // // platformArray.push(new Platform(0, 400, 100, "#eee"));
    // platformArray.push(new Platform(100, height, 100, "red"));
    // platformArray.push(new Platform(200, height, 100, "blue"));
    // // platformArray.push(new Platform(300, 400, 100, "#eee"));
    // platformArray.push(new Platform(400, height, 100, "green"));
    //
    // // platformArray.push(new Platform(500, 400, 100, "#eee"));
    // platformArray.push(new Platform(600, height, 100, "red"));
    // platformArray.push(new Platform(700, height, 100, "blue"));
    // // platformArray.push(new Platform(800, 400, 100, "#eee"));
    // platformArray.push(new Platform(900, height, 100, "green"));

    // let platWidth = 0;
    // let platLength = 175 - Math.floor(Math.random()*100);
    // let colorArray = ['red', 'green'];
    // let colorChoice = 1;
    // if (maxdeathSpaces > currentDeathSpaces && maxdeathSpaceCoverage > currentDeathSpaceCoverage) {
    //   colorChoice = Math.floor(Math.random()*2);
    // }
    // let empty = Math.floor(Math.random()*2);




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
    drawBall();
    let pD = platformDetection();
    if(pD === "endgame") {
      gameEnd();
    }
    if (pD === "wingame") {
      gameWin();
    }
    // platformDetection();
    // let count = 200;
    if(pD) {
      count = 1;
      // dropCounter = 0;
    }
    // if(dropCounter > 0) {
    //   count = 1;
    // }
    // if(!pD) {
    //   dropCounter = 1;
    // }
    // let initialPlatforms = levelsBuilder.linkedplatforms.length;
    if(ballBottom === 405 && !pD) {
      // dropCounter = 1;
      // debugger
    //   if(count === 1) {
    //     debugger
    //   levelsBuilder.linkedplatforms[0].status = 0;
    //   levelsBuilder.linkedplatforms.shift();
    //   count -= 1;
    // }
      // debugger
      // debugger
      // ballDisplacement = 103;
      let countball = 100;
      if (countball !== 0) {
        bally += balldy;
        countball -= balldy;
        // bally += 10;
        // countball -= 10;
      }
      let countPlat = 100;
      if(countPlat !== 0) {
        linkplatformdy -= 5;
        countPlat -= 5;
        // linkplatformdy -= 20;
        // countPlat -= 20;
      }
      // debugger
      if(levelsBuilder.linkedplatforms[0].platforms[0].platformy + linkplatformdy < 400) {
        // debugger
        levelsBuilder.linkedplatforms[0].status = 0;
        levelsBuilder.linkedplatforms.shift();
      }

      // if(dropCounter > 0) {
      //   debugger
      //   dropCounter = 0;
      //   count = 1;
      // }
      // let countBoth
      // animatePlatform(count);
      // balldy = 5;
      // debugger
      // cancelAnimationFrame(id);
    }
    // if(levelsBuilder.linkedplatforms.length !== initialPlatforms && pD) {
    //   debugger
    //   count = 1;
    // }

    maxHeightDetection();
    // let count = 100;
    // console.log(!platformDetection());
      // debugger

    //   balldy = 0;
    //   animatePlatform(count);
    //   balldy = 5;
    //   // let id = animatePlatform(count);
    //   // cancelAnimationFrame(id);
    //   //   while(true){
    //   //     // debugger
    //   //   if(count === 0) {
    //   //     break;
    //   //   }
    //   //   // debugger
    //   //   linkplatformdy -= 1;
    //   //   bally -= 2;
    //   //   drawBall();
    //   //   platformDetection();
    //   //   maxHeightDetection();
    //   //   levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    //   //   count -= 5;
    //   //   // debugger
    //   //   console.log('moving');
    //   // }
    // }



    levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    if(rightPressed) {
         linkplatformdx += 6;
       } else if (leftPressed) {
         linkplatformdx -= 6;
       }
    bally -= balldy;
    // debugger
    ballBottom = bally + ballrad
    // if(ballBottom > levelsBuilder.linkedplatforms[0].platforms[0].platformy + linkplatformdy + 6) {
    //   linkplatformdy -= 100;
    //   bally -= 200;
    //   // debugger
    // }
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

  function animatePlatform(count) {
    let id = requestAnimationFrame(animatePlatform);
    // debugger
    while(true){
      // debugger
    if(count === 0) {
      cancelAnimationFrame(id);
      // balldy = 5;
      break;
    }
    // debugger
    linkplatformdy -= 100;

    // balldy = 0;
    // return id;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawBall();
    // platformDetection();
    // maxHeightDetection();
    // levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    count -= 200;
    // debugger
    // console.log('moving');
  }
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

    // cancelAnimationFrame(startAnimationId);
    // cancelAnimationFrame(id);
    // debugger
    // animate();
  }

  window.restart = restartGame;

  function gameEnd() {
    document.removeEventListener("keyup", keyUpHandler, false);
    document.removeEventListener("keydown", keyDownHandler, false);
    rightPressed = false;
    leftPressed = false;
    // linkplatformdy = x;
    // linkplatformdx = y;
    balldy = 0;
    ctx.font = "50px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 120, 200);
    // cancelAnimationFrame(id);
  }

  function gameWin() {
    document.removeEventListener("keyup", keyUpHandler, false);
    document.removeEventListener("keydown", keyDownHandler, false);
    rightPressed = false;
    leftPressed = false;
    // linkplatformdy = x;
    // linkplatformdx = y;
    balldy = 0;
    ctx.font = "80px Verdana";
    ctx.fillStyle = "gold";
    ctx.fillText("YOU WON!", 50, 200);
  }

  function platformDetection() {
    let ballLeft = ballx - ballrad;
    let ballRight = ballx + ballrad;
    let ballBottom = bally + ballrad;
    // const initballBottom = ballBottom;
    // debugger ;
    // debugger
    let allLevels = levelsBuilder.linkedplatforms;
    // let linkedplatform = allLevels[0];
    // debugger

    // let toggle = false;
    for(let s = 0; s < allLevels.length; s++) {
      let linkedplatform = allLevels[s];
    if(linkedplatform.status === 1) {
      let platforms = linkedplatform.platforms;
      for(let i = 0; i < platforms.length; i++){
        platform = platforms[i];
        let platformx = platform.platformx + linkplatformdx;
        let platformy = platform.platformy + linkplatformdy;
        // let platformx = Math.abs(platform.platformx);
        // debugger
        // debugger
        // debugger

        // if (!( (ballLeft >= platformx && ballLeft <= platformx +
        // platform.platformlength && ballBottom - 3 >= platformy) ||
        // (ballRight >= platformx && ballRight <= platformx +
        //   platform.platformlength && ballBottom -3 >= platformy))) {
        //     debugger
        //   console.log('what');  // debugger
        // }

        // if(!((ballLeft >= platformx || ballLeft <= platformx +
        // platform.platformlength) ||
        // (ballRight >= platformx || ballRight <= platformx +
        //   platform.platformlength))) {
        //     debugger
        //   }

        // if( (ballLeft >= platformx && ballLeft <= platformx +
        // platform.platformlength && ballBottom - 3 >= platformy && platform.color === "red") ||
        // (ballRight >= platformx && ballRight <= platformx +
        //   platform.platformlength && ballBottom -3 >= platformy && platform.color === "red")) {
        //     gameEnd();
        // }

        if( (ballLeft >= platformx && ballLeft <= platformx +
        platform.platformlength && ballBottom - 3 >= platformy) ||
        (ballRight >= platformx && ballRight <= platformx +
          platform.platformlength && ballBottom -3 >= platformy)) {

          if(platform.color === "gold") {
            return "wingame";
          } else if(platform.color === "red") {
            return "endgame";
          } else {
            // debugger
          // (ballRight > platformx + linkplatformdx && ballRight < platformx +
            // platform.platformlength + linkplatformdx && ballBottom > platform.platformy + linkplatformdy)) {
          balldy = -balldy;
          ballDisplacement = 0;
          // toggle = true;
          // debugger
          return true;
         }
          // debugger
        // } else if(ballBottom > platform.platformy) {
        //   debugger
        //   linkedplatform.status = 0;
      // }
    }
    // else if ( (ballBottom === 405 ) && !((ballLeft >= platformx && ballLeft <= platformx +
    // platform.platformlength && ballBottom - 3 >= platformy) ||
    // (ballRight >= platformx && ballRight <= platformx +
    //   platform.platformlength && ballBottom -3 >= platformy))) {
    //       debugger
    //       let d= 0;
    //       d+=1;
    //       console.log(d);
    //       linkedplatform.status = 0;
    //       allLevels.shift();
    //       // let id = animatePlatformUp();
    //       // if(id) {
    //       //   cancelAnimationFrame(id);
    //       // }
    //
    //       // linkplatformdy -= 100;
    //
    //       // bally -= 100;
    //       // levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
    //
    //       return false
    //       // debugger
    //     }
      }
    }
  }
    return false;
  }

  // function animatePlatformUp() {
  //   let count = 100;
  //   while(count > 0) {
  //     linkplatformdy += 5;
  //     count -= 5;
  //   }
  //   levelsBuilder.renderLevel(linkplatformdx, linkplatformdy);
  //
  //   return requestAnimationFrame(animatePlatformUp);
  // }

  function maxHeightDetection() {
    if(ballDisplacement >= 90) {
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
