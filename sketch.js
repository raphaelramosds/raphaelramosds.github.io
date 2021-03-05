// Interface

blockColors  = ["#59CD90","#EE6352","#3FA7D6","#FBF24C","#BDBDBD"]

screen       = 'menu'
helpPopup    = false
creditsPopup = false

txtprimary   = 'rgb(0,0,0)'
txtsecondary = 'rgb(255,255,255)'

btnprimary   = 'rgb(255,255,255)'
btnsecondary = 'rgb(0,0,0)'

btnhighlight = 'rgba(0,0,0,.2)'
bg = 'rgb(255,255,255)'

// Statistics 

mean   = 0
median = 0
spread = 0
mode   = 0

// Blocks

index         = 0
blockheight   = 100
blocks        = []
selectedBlock = null

function preload() {
  
  soundFormats('mp3', 'wav');
  putBlocks = loadSound('assets/sounds/putblocks.wav');
  chalengecompleted = loadSound('assets/sounds/challengecompleted.mp3');
  
  
  // Images

  menuimage = loadImage("assets/img/menu.jpg")
}

function setup() {
  
  createCanvas(800, 600)
  
  // Evaluete tasks
  updateChallenge()
  
}

function draw() {

  background(bg)

  switch (screen) {

    case 'menu':
      menu()
      break;

    case 'game':
      game()
      break;
  }
}

function menu() {

  image(menuimage, 300, 60, 400, 300)

  noStroke()

  fill(txtprimary)
  textSize(40)
  textAlign(CENTER)
  text('MÉDIA NA PRÁTICA', 250, 200)

  fill(btnprimary)
  stroke(25);
  rect(168, 250, 130, 80)

  noStroke()
  fill(txtprimary)
  textSize(35)
  text("Aperte ENTER para jogar", 260, 300)

  textSize(25)
  fill(btnsecondary)
  stroke(1)
  rect(60, 520, 135, 55, 20)
  noStroke()
  fill(txtsecondary)
  text("Créditos", 120, 560)


  if (creditsPopup) {

    fill(bg)
    stroke(25)
    rect(65, 150, 620, 300)

    textAlign(LEFT)
    fill(txtprimary)
    stroke(0.5)
    text('Desenvolvedores', 80, 200)

    noStroke()
    textSize(20)
    text('Raphael Ramos da Silva - graduando em CeT ', 80, 250)
    text('Aquiles Medeiros F. Burlamanqui - professor da ECT, UFRN ', 80, 280)

    textSize(25)
    stroke(0.5)
    text('Sobre', 80, 330)

    noStroke()
    textSize(20)
    text('Esse jogo educativo procura desenvolver a habilidade EF08MA25', 80, 360)
    text('presente na Base Nacional Comum Curricular.', 80, 390)

  }

}

function game() {

  noStroke()

  // Top

  textAlign(LEFT)

  stroke(0.3)

  textSize(20)
  fill(txtprimary)
  text("Média ", 50, 50)

  textSize(20)
  fill(txtprimary)
  text("Mediana ", 150, 50)

  textSize(20)
  fill(txtprimary)
  text("Desvio padrão ", 250, 50)

  noStroke()

  textSize(20)
  fill(txtprimary)
  text(mean.toFixed(2), 50, 75)

  textSize(20)
  fill(txtprimary)
  text(median, 150, 75)

  textSize(20)
  fill(txtprimary)
  text(spread.toFixed(2), 250, 75)


  textAlign(CENTER)

  // Body

  showBlocks()

  /*
    Challenge. Make sure that

    1. Mean is within 150cm and 150 + 30 cm
    2. Median is 160 cm
    3. Put the nine blocks and its amplitude is 45

  */

  fill(bg)
  stroke(25)
  rect(420, 20, 360, 115, 10)
  
  checkChallenge()
  
  switch(countChallenge){
      
    case 0:
      
      textSize(20)
      fill(txtprimary)
      stroke(1)
      text("Desafio", 465,50)
      
      noStroke()
      textSize(20)
      text(challenge[0], 594,85)
    break;
    
    case 1:

      textSize(20)
      fill(txtprimary)
      stroke(1)
      text("Desafio", 465,50)
    
      noStroke()
      textSize(20)
      text(challenge[1], 572,85)
    break;
    
    case 2:
      
      textSize(20)
      fill(txtprimary)
      stroke(1)
      text("Desafio", 465,50)
      
      noStroke()
      textSize(20)
      text(challenge[2], 582,85)
    break;
  
    default:
       
      textSize(20)
      fill(txtprimary)
      noStroke()
      textSize(20)
      text("Parabens você cumpriu os desafios!", 592,60)
      
      
      fill(btnprimary)
      stroke(25)
      rect(430, 82, 100, 40, 10)
      
      noStroke()
      textSize(19)
      fill(txtprimary)
      text("Reiniciar", 480,110)
      
    break;
    
  }
  
  // Footer
  
  noStroke()

  fill(btnprimary)
  rect(680, 550, 100, 40)
  textSize(24)
  fill(txtprimary)
  text("? Ajuda", 730, 580)

  text(blockheight + " cm", 70, 575)

  stroke(1)
  fill(btnprimary)
  rect(220, 550, 170, 40, 10)
  textSize(24)
  noStroke()
  fill(txtprimary)
  text("Colocar bloco", 300, 580)

  stroke(1)
  fill(btnprimary)
  rect(180, 547, 30, 40, 10)
  textSize(24)
  fill(txtprimary)
  text("+", 195, 573)

  fill(btnprimary)
  rect(150, 547, 28, 40, 10)
  textSize(24)
  fill(txtprimary)
  text("-", 165, 573)

  fill(btnprimary)

  // Help pop up

  if (helpPopup) {

    fill(bg)
    stroke(25)
    rect(65, 150, 600, 300)

    noStroke()

    fill(txtprimary)
    textSize(30)
    text('Como jogar este jogo', 225, 200)

    textSize(20)
    text('ESC - volta ao menu', 175, 250)
    text('1. Aumente (+) ou diminua (-) a altura desejada', 295, 300)
    text('2. Clique em colocar bloco', 205, 350)
    text('Aperte nos blocos para removê-los', 235, 400)

  }

}

function showBlocks() {

  // Show blocks

  for (i = 0; i < blocks.length; i++) {
    textSize(18)
    textAlign(CENTER)

    fill(0)
    text(blocks[i].height + " cm", blocks[i].x, blocks[i].y - 20)

    fill(blocks[i].color)
    rect(blocks[i].x, blocks[i].y, 20, blocks[i].height)
  }
}

function showStatistics() {

  rol = []

  mean = 0.0
  sum = 0
  frequency = 0

  mode = []

  median = 0
  middlet = 0
  middletsavg = 0

  spread = 0.0
  sumspread = 0.0


  // Put on ROL

  for (j = 0; j < blocks.length; j++) {
    rol.push(blocks[j].height)
  }

  rol = rol.sort()

  // Mean

  for (i = 0; i < blocks.length; i++) {
    sum += blocks[i].height
    frequency += 1
  }

  mean = sum / frequency


  // Median

  if (frequency % 2 != 0) {
    middlet = (frequency + 1) / 2
    median = blocks[middlet - 1].height

  } else if (frequency % 2 == 0) {
    middlet = frequency / 2
    middletsavg = (blocks[middlet - 1].height + blocks[middlet].height) / 2

    median = middletsavg
  }

  // Mode

  mode = console.log(countValues(rol));


  // Spread 

  for (i = 0; i < blocks.length; i++) {
    sumspread += (blocks[i].height - mean) ** 2
  }

  spread = Math.sqrt(sumspread) / frequency

  // Display statistics

}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function countValues(array) {

  vFrequency = new Object()

  for (element of array) {

    // If the added value is into array, just put 1 on it frequency

    if (!vFrequency[element]) {
      vFrequency[element] = 1;
    }

    // Else, add 1
    else {
      vFrequency[element] += 1
    }

  }

  /*
    element => key name
    object[i] => object value
  
  */

  // Put frequencies into an array 

  return vFrequency

}

function checkChallenge(){
  
  
   if(countChallenge == 0){
     if( spread > 0 && spread <= dispersionTask ){
       countChallenge++
     }
   }
  
   else if(countChallenge == 1){
     if(mean >= startMeanRange && mean <= finalMeanRange){
       countChallenge++
     }
   }
  
   else if(countChallenge = 2){
     if(median >= startMedianRange && median <= finalMedianRange){
       countChallenge++
       chalengecompleted.play()
     }
   }
  
}


function updateChallenge(){

  // Challenge

  challenge      = []
  countChallenge = 0

  finalMeanRange  = 0
  startMeanRange  = 0
  dispersionTask  = 0

  finalMedianRange = 0
  startMedianRange = 0
  
  startMeanRange = getRndInteger(100, 132.5)
  finalMeanRange = getRndInteger(132.5, 265)
  
  startMedianRange = getRndInteger(100, 132.5)
  finalMedianRange = getRndInteger(132.5, 265)
  
  dispersionTask = getRndInteger(2, 10)
  
  challenge.push("Desvio padrão não nulo menor que " + dispersionTask)
  challenge.push("Média entre "+ startMeanRange + " cm e " + finalMeanRange + " cm")
  challenge.push("Mediana entre " + startMedianRange + " cm e " + finalMedianRange + " cm")
  
}


function keyPressed() {

  if (key == 'Enter') {
    screen = 'game'
  }

  if (key == 'Escape') {

    blocks = []
    index  = 0
    mean   = 0
    median = 0
    spread = 0

    updateChallenge()
    countChallenge = 0

    screen = 'menu'
  }
}


function mouseClicked() {

  switch (screen) {

    case 'menu':

      if ((mouseX > 60 && mouseX < 250) && (mouseY > 520 && mouseY < 600) && creditsPopup == false) {
        creditsPopup = true
      } else {
        creditsPopup = false
      }
      
      if ((mouseX > 168 && mouseX < 350) && (mouseY > 250 && mouseY < 350) ) {
        screen = 'game'
      } 

    case 'game':
      
      if((mouseX > 430 && mouseX < 580) && (mouseY > 82 && mouseY < 150)){
        
        chalengecompleted.stop()
        
        mean   = 0
        median = 0
        spread = 0
        blocks = []
        index  = 0
        
        updateChallenge()
        
      }
      
      if ((mouseX > 680 && mouseX < 780) && (mouseY > 550 && mouseY < 600) && helpPopup == false) {
        helpPopup = true
      } else {
        helpPopup = false
      }

      // Increase and decrease heights


      if ((mouseX >= 150 && mouseX < 180) && (mouseY > 550 && mouseY < 600)) {
        if (blockheight > 100) {
          blockheight -= 15
        }
      }

      if ((mouseX >= 180 && mouseX < 210) && (mouseY > 550 && mouseY < 600)) {
        if (blockheight > 250) {
          blockheight -= 15
        } else {
          blockheight += 15
        }
      }


      // Save blocks on array and show them
      if ((mouseX > 220 && mouseX < 390) && (mouseY > 550 && mouseY < 600)) {
        
        putBlocks.play()
        
        // The system only shows 10 blocks

        if (blocks.length < 9) {

          // The distance between the first and last on is 720px
          posX = 55 + 80 * index
          posY = 200

          // Put height on the sample
          blocks.push({
            height: blockheight,
            x: posX,
            y: posY,
            color: blockColors[getRndInteger(0,4)] 
          })


          index += 1

        }

        showStatistics()

      }

      /* 
      
        Verfify if user click his mouse on any space whence block is present
        Case he does, take its coordinates

        If the cursor's clicked within the X or Y block interval, 
        so get the coordinates of this block
        
      */

      for (i = 0; i < blocks.length; i++) {
        if ((mouseX > blocks[i].x && mouseX < blocks[i].x * 1.25) && (mouseY > blocks[i].y && mouseY < blocks[i].y * 2)) {

          putBlocks.play()
          
          selectedBlock = i
          blocks.splice(selectedBlock, 1)

          index -= 1

          for (j = i; j < blocks.length; j++) {

            blocks[j].x -= 80;
            //console.log("Bloco "+j+" alterado")

            posX = posX - (55 + 80 * index);

          }

          showStatistics()
        }
      }

      break;
  }

}