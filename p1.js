console.log('js file is connected');
const startButton = document.getElementById("start-button");
const instructions = document.getElementById("instructions-text");
const mainPlayArea = document.getElementById("main-play-area");
const shooter = document.getElementById("player");
const monsterImgs = ['image/monster1.jpeg','image/monster2.png','image/monster3.png'];
const scoreCounter = document.querySelector('#score span');

let monsterInterval;


startButton.addEventListener("click", (event) => {
  playGame()
})


function letShipFly(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    moveUp()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    moveDown()
  } else if (event.key === " ") {
    event.preventDefault()
    fireLaser()
  }
}


function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "0px") {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 25
    shooter.style.top = `${position}px`
  }
}


function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "360px") {
    return
  } else {
    let position = parseInt(topPosition)
    position += 25
    shooter.style.top = `${position}px`
  }
}


function fireLaser() {
  let laser = createLaserElement()
  mainPlayArea.appendChild(laser)
  moveLaser(laser)
}


function createLaserElement() {
  let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
  let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
  let newLaser = document.createElement('img')
  newLaser.src = 'image/laser.png'
  newLaser.classList.add('laser')
  newLaser.style.left = `${xPosition}px`
  newLaser.style.top = `${yPosition - 10}px`
  return newLaser
}


function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left)
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => {
      if (checkLaserCollision(laser, monster)) {
        monster.classList.remove("monster")
        monster.classList.add("dead-monster")
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
      }
    })
    if (xPosition === 340) {
      laser.remove()
    } else {
      laser.style.left = `${xPosition + 4}px`
    }
  }, 10)
}


function createMonster() {
  let newMonster = document.createElement('img')
  let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)]
  newMonster.src = monsterSpriteImg
  newMonster.classList.add('monster')
  newMonster.classList.add('monster-transition')
  newMonster.style.left = '370px'
  newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`
  mainPlayArea.appendChild(newMonster)
  moveMonster(newMonster)
}


function moveMonster(monster) {
  let moveMonsterInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
    if (xPosition <= 50) {
      if (Array.from(monster.classList).includes("dead-monster")) {
        monster.remove()
      } else {
        gameOver()
      }
    } else {
      monster.style.left = `${xPosition - 4}px`
    }
  }, 30)
}


function checkLaserCollision(laser, monster) {
  let laserLeft = parseInt(laser.style.left)
  let laserTop = parseInt(laser.style.top)
  let laserBottom = laserTop - 20
  let monsterTop = parseInt(monster.style.top)
  let monsterBottom = monsterTop - 30
  let monsterLeft = parseInt(monster.style.left)
  if (laserLeft != 340 && laserLeft + 40 >= monsterLeft) {
    if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}


function gameOver() {
  window.removeEventListener("keydown", letShipFly)
  clearInterval(monsterInterval)
  let monsters = document.querySelectorAll(".monster")
  monsters.forEach(monster => monster.remove())
  let lasers = document.querySelectorAll(".laser")
  lasers.forEach(laser => laser.remove())
  setTimeout(() => {
    alert(`Game Over! Your final score is ${scoreCounter.innerText}!`)
    shooter.style.top = "180px"
    startButton.style.display = "block"
    instructions.style.display = "block"
    scoreCounter.innerText = 0
  }, 1100)
}

function playGame() {
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  window.addEventListener("keydown", letShipFly)
  monsterInterval = setInterval(() => { createMonster() }, 2100)
}



// API
document.addEventListener("DOMContentLoaded", () => {
  const quote = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");

  async function refreshQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      quote.textContent = data.content;
      cite.textContent = data.author;
    } 
  }
  refreshQuote();
});

