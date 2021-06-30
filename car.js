// ----------declare variables
let player ={
    start : false,
    score : 0,
    totalScore : 0,
    speed: 5,
}

let keys ={
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
}

// ----------adding keys


function KeyDown(e){
    // console.log(e)
    // console.log(e.key)
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys)
}

function KeyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    
}

document.addEventListener('keydown', KeyDown);
document.addEventListener("keyup", KeyUp);


// ----------define class object

// const score = document.getElementsByClassName('score')
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea');



// ----------startScreen
function endGame(){
    console.log('boom')
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = 'Game over <br> Your final score is ' + player.totalScore + '<br> Press here to restart the game' 
    window.cancelAnimationFrame();
}

function iscollision(UCar, ECar){{
    let UPos = UCar.getBoundingClientRect();
    let EPos = ECar.getBoundingClientRect();

    let collision  = ((UPos.left > EPos.right) || (UPos.right < EPos.left) || (UPos.top > EPos.bottom) || (UPos.bottom < EPos.top))
    return !collision ;

}

}


function randomColor(){
    function c(){
        let colorNum = ("0" + (Math.floor(Math.random() *256).toString(16))).substr(-2)
        return colorNum;
    }
    
    let color = "#"  + c() + c() + c();
    return color;

}

function moveLines(){
    let lines = document.querySelectorAll('.load_line');
    // console.log(lines)



    lines.forEach(function(item){

        if (item.y > 750){
            item.y = -0
        }
        item.y +=player.speed;
        item.style.top = item.y;
    })
}


function moveEnemyCar(users_car){
    let enemys_car = document.querySelectorAll('.enemy_car');
    enemys_car.forEach(function(item){

        // checking collision
        if (iscollision(users_car, item)){
            endGame();
        }

        //changing car position and color 
        if (item.y > 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.backgroundColor = randomColor();

        }
        item.y+=player.speed;
        item.style.top = item.y +"px";

        
    })

    player.score+= player.speed;
    player.totalScore = Math.floor(player.score/30)
    score.innerHTML = "Score is : " +player.totalScore ;
    console.log(player)
    // if (player.totalScore%1000===0){
    //     player.speed+=1;
    // }
}


function playGame(){
    console.log('hurreeyyy')
    let users_car = document.querySelector('.user_car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road)
    // console.log(player)

    if (player){

        moveLines();
        moveEnemyCar(users_car);


        if (keys.ArrowUp && player.y > (road.top + 50 )){player.y -= 5}
        if (keys.ArrowDown && player.y < (road.bottom -100)){player.y += 5}
        if (keys.ArrowLeft && player.x > (0)){player.x -= 5}
        if (keys.ArrowRight && player.x < (road.width - 68 )){player.x += 5}
    }

    users_car.style.top = player.y + "px";
    users_car.style.left = player.x + "px";



    // console.log(users_car);


    window.requestAnimationFrame(playGame);

}

function start(){
    // gameArea.classList.remove('hide')
    startScreen.classList.add('hide')
    gameArea.innerHTML=""
    player.start = true;
    score.classList.remove('hide');

    //-----------add user car
    const userCar = document.createElement('div');
    userCar.setAttribute('class', 'user_car');
    gameArea.appendChild(userCar);

    // console.log(userCar.offsetLeft)
    // console.log(userCar.offsetTop)
    player.x = userCar.offsetLeft;
    player.y = userCar.offsetTop;
    // console.log(player)

    //-----------add road lines
    for(i=0; i<5; i++){
        const loadLine = document.createElement('div');
        loadLine.setAttribute('class', 'load_line');
        // let linePosition = loadLine.offsetTop
        // linePosition = (i)*150        
        // loadLine.style.top = linePosition + "px";

        loadLine.y = i*150
        loadLine.style.top = loadLine.y + "px";
        gameArea.appendChild(loadLine);
    }

    //-----------add enemy car
    for(i=0; i<3; i++){
        const enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy_car');
        enemyCar.y = (i)*350 * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px"

        gameArea.appendChild(enemyCar);

    }




    window.requestAnimationFrame(playGame);
}

startScreen.addEventListener('click', start);