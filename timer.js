let canvasWidth = 700
let canvasHeight = 500
let centerX = Math.floor(canvasWidth/2)
let centerY = Math.floor(canvasHeight/2)
let counter = 0
let running = false
let valid = true
let results = []
let runTimer
let last5 = []
let last12 = []

function setup () {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("cube-timer")
    textFont("Consolas")
}

function draw () {
    background(255);
    fill(100)
    printResult(10, 10)
    fill(0)
    printBest(70, 10)
    printAvg5(centerX-60, 10)
    printAvg12(centerX-60, 25)
    textSize(70)
    textAlign(CENTER, CENTER)
    // if Space bar pressed
    if (keyIsDown(32)) {
        if (valid) {
            // fill font color to Green
            fill(0, 200, 0)
        } else {
            // fill font color to Red
            fill(200, 0, 0)
        }
    }
    text(printTime(counter), centerX, centerY)
    if (running) {
        clear()
        showTimerOnly()
    }
    noFill()
}

function showTimerOnly () {
    textSize(80)
    textAlign(CENTER, CENTER)
    text(printTime(counter), centerX, centerY)
}

function printTime (counter) {
    var min = nf(Math.floor(counter/6000), 2)
    var sec = nf(Math.floor(counter/100)%60, 2)
    var mil = nf(counter%100, 2)
    if (min <= 0) {
        return sec + "." + mil
    }
    return min + ":" + sec + "." + mil
}

function printResult (posX, posY) {
    textSize(14)
    textAlign(LEFT, CENTER)
    for (var i=0; i<results.length; i++) {
        text(printTime(results[i]), posX, posY)
        posY += 15
    }
}

function printAvg5 (posX, posY) {
    textSize(14)
    textAlign(LEFT, CENTER)
    if (results.length < 5) {
        text("AVG 5  : ", posX, posY)
        return
    }
    // get last 5 element in array results[]
    for (var i = 0; i<5; i++) {
        last5[i] = results[results.length - (5-i)]
    }
    // sort last5[] ascending
    last5.sort(function(a,b){return a-b})
    // remove lowest and higest value
    last5.pop()
    last5.shift()
    // calculate the average
    var total = 0
    for (var i=0; i<last5.length; i++) {
        total += last5[i]
    }
    var avg = Math.round(total/3)
    // show the avg in posX, posY
    text("AVG 5  : "+printTime(avg), posX, posY)
}

function printAvg12 (posX, posY) {
    textSize(14)
    textAlign(LEFT, CENTER)
    if (results.length < 12) {
        text("AVG 12 : ", posX, posY)
        return
    }
    // get last 12 element in array results[]
    for (var i = 0; i<12; i++) {
        last12[i] = results[results.length - (12-i)]
    }
    // sort last12[] ascending
    last12.sort(function(a,b){return a-b})
    // remove lowest and higest value
    last12.pop()
    last12.shift()
    // calculate the average
    var total = 0
    for (var i=0; i<last12.length; i++) {
        total += last12[i]
    }
    var avg = Math.round(total/10)
    // show the avg in posX, posY
    text("AVG 12 : "+printTime(avg), posX, posY)
}

function printBest (posX, posY) {
    textSize(14)
    textAlign(LEFT, CENTER)
    if (results.length == 0) {
        text("Best : ", posX, posY)
        return
    }
    newResult = results.slice()
    // sort newResult[] ascending
    newResult.sort(function(a,b){return a-b})
    var best = newResult[0]
    // show the best in posX, posY
    text("Best : "+printTime(best), posX, posY)
}

function timeIt () {
    counter++;
}

function pushResult () {
    var res = counter
    results[results.length] = res
}

// start timer
function keyReleased () {
    if (valid && (keyCode === 32 && running==false)) {
        counter = 0
        if (running == false) {
            this.runTimer = setInterval(timeIt, 10)
        }
        running = true
        valid = false
    }
}

// stop timer
function keyPressed () {
    // key Space or Esc to stop
    if ((keyCode === 32 || keyCode === 27) && running==true) {
        clearInterval(this.runTimer)
        pushResult()
        running = false
        // add delay
        setTimeout(
            () => {
                valid = true
            }, 2000
        )
    }
}
