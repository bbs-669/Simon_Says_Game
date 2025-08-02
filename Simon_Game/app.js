let gameSequence = [];
let userSequence = [];
let h4 = document.querySelector('h4');
let nextFlashTimeout = null;
let started = false;
let level =0;
let count=0;
let score=0;
const btnflash = (btn)=>{
    btn.classList.add('flash');
    setTimeout(()=>{
        btn.classList.remove('flash')
},250);
    gameSequence.push(btn.getAttribute('id'));
}

const selectedFlash = function(){
    if(!started){
        return;
    }
    count++;
    this.classList.add('flash');
    setTimeout(()=>{
        this.classList.remove('flash')
},250);
    userSequence.push(this.getAttribute('id'));
    checkSequence();
}

function checkSequence(){
    let currentind = userSequence.length-1;
    if(userSequence[currentind]!=gameSequence[currentind]){
            if (nextFlashTimeout) {
                clearTimeout(nextFlashTimeout);
                nextFlashTimeout = null;
                h4.innerText=`Game Ended\nYour Score:${score}\nPress Any keyboard key to start the game`;
                count=0;
                level=0;
                score=0;
                userSequence=[];
                gameSequence=[];
                started=false;
                return;
            }
    }
    if(gameSequence.length == count){
        count=0;
        userSequence.splice(0,userSequence.length);
        score++;
        level+=1;
        h4.innerText = `Level ${level}`
        let randind = Math.floor(Math.random()*4);
        let randmbtn = document.querySelectorAll(".btn")[randind];
        nextFlashTimeout=setTimeout(()=>btnflash(randmbtn),950);
    }

}


document.addEventListener('keypress',()=>{
    if(!started){
        console.log('Game Started');
        started=true;
        level=1;
        h4.innerText = `Level ${level}`
        let randind = Math.floor(Math.random()*4);
        let randmbtn = document.querySelectorAll(".btn")[randind];
        btnflash(randmbtn);
    }
});


const btns = document.querySelectorAll('.btn');

for(let btn of btns){
        btn.addEventListener('click',selectedFlash);
}
