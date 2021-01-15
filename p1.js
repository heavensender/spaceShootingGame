console.log('js file is connected');
const startButton = document.getElementById("start-button");
const instructions = document.getElementById("instructions-text");
const mainPlayArea = document.getElementById("main-play-area");
const shooter = document.getElementById("player");
const monsterImgs = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xrsLvAI7YsX0YoIaNoP8DBmervFnhGdLKw&usqp=CAU', 'https://cdn.freelogovectors.net/wp-content/uploads/2015/06/Scary-Monsters-University-Icon.png', 'https://cdn.iconscout.com/icon/premium/png-256-thumb/letter-e-monster-743870.png'];
const scoreCounter = document.querySelector('#score span');

let justice;
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
    position -= 40
    shooter.style.top = `${position}px`
  }
}


function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "360px") {
    return
  } else {
    let position = parseInt(topPosition)
    position += 40
    shooter.style.top = `${position}px`
  }
}


function fireLaser() {
  let laser = createLaserElement()
  mainPlayArea.appendChild(laser)
  moveLaser(laser)
}


function createLaserElement() {
  let newLaser = document.createElement('img')
  newLaser.src = 'https://image.pngaaa.com/806/25806-small.png'
  newLaser.classList.add('laser')
  return newLaser
}



function createMonster() {
  let newMonster = document.createElement('img')
  let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)]
  newMonster.src = monsterSpriteImg
  newMonster.classList.add('monster')
  newMonster.style.left = '370px'
  newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`
  mainPlayArea.appendChild(newMonster)
  moveMonster(newMonster)
}




function playGame() {
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  window.addEventListener("keydown", letShipFly)
  monsterInterval = setInterval(() => { createMonster() }, 2100)
}