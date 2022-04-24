
// let arr = [1,2,3,4,5,6,7,8,9,10];

// function Student(firstName, lastName, age, mathPoint, physicPoint, englishPoint){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.mathPoint = mathPoint;
//     this.physicPoint = physicPoint;
//     this.englishPoint = englishPoint;
//     this.fullName = function(){
//         return `${this.lastName} ${this.firstName}`;
//     }
// }

// function logInfo(value){
//     console.log('your firstname is: ',value.firstName);
//     console.log('your lastname is: ',value.lastName);
//     console.log('your fullname is: ',value.fullName());
//     console.log('your age is: ',value.age);
//     console.log('your math point is: ',value.mathPoint);
//     console.log('your physic point is: ',value.physicPoint);
//     console.log('your english point is: ',value.englishPoint);
// }

// let me = new Student('Tu', 'Tran Van Nguyen', 19, 8, 8 ,8);

// logInfo(me);
// alert(me.fullName());


let diceImages = [
    './imgs/dice-six-faces-one.png',
    './imgs/dice-six-faces-two.png',
    './imgs/dice-six-faces-three.png',
    './imgs/dice-six-faces-four.png',
    './imgs/dice-six-faces-five.png',
    './imgs/dice-six-faces-six.png'
];

let dice = document.querySelectorAll("img");

// 

var personChoicebtn1 = document.querySelector('.person-choice1');
var personChoicebtn2 = document.querySelector('.person-choice2');
const betMoney = document.getElementById('bet-money');
var content = document.getElementById('input__zone-money');
var overlay = document.getElementById('overlay');
var diceResult = document.getElementById('result__container');
const resultContent = document.getElementById('result__container-title');
const betMoneyAmount = document.getElementById('result-money');
var continuebtn = document.querySelectorAll('.result-btn');
var current_money = document.getElementById('current_money');

var myMoney = 1000000;

betMoney.setAttribute("max",myMoney);
current_money.innerHTML = myMoney + ' vnđ';

function modalOpen(){
    overlay.classList.add("modal-open");
}

function random1(){
    let dice1Val = Math.floor(Math.random() * 6);
    return dice1Val;
}

function random2(){
    let dice2Val = Math.floor(Math.random() * 6);
    return dice2Val;
}

function rollTheDice(){
    dice.forEach(function(die){
        die.classList.add("shake");
    });

    personChoicebtn1.disabled = true;
    personChoicebtn2.disabled = true;
    betMoney.disabled = true;

    var dice1 = random1();
    var dice2 = random2();

    setTimeout(function(){
        
        dice.forEach(function(die){
            die.classList.remove("shake");
        });
        
        document.querySelector("#dice1").setAttribute("src",diceImages[dice1]);
        document.querySelector("#dice2").setAttribute("src",diceImages[dice2]);
        
        console.log(dice1);
        console.log(dice2);
       
        setTimeout(function(){
            overlay.classList.add("modal-open");
            personChoicebtn1.disabled = false;
            personChoicebtn2.disabled = false;
            betMoney.disabled = false;

            current_money.innerHTML = myMoney + ' vnđ';
        },1500);
        
    },5000);
    return (dice1+1) + (dice2+1);
}

function modalClose(){
    overlay.classList.remove("modal-open");
}

function addAndRemove(add, remove){
    diceResult.classList.remove(remove);
    diceResult.classList.add(add);
    resultContent.innerHTML = add +'!!';
};

function changeMoneyAmount_win(){
    const moneyVal = betMoney.value;
    betMoneyAmount.innerHTML = `+ ${moneyVal} vnđ`;
    myMoney = myMoney + parseInt(moneyVal);
    betMoney.setAttribute("max",myMoney);
    
};

function changeMoneyAmount_lose(){
    const moneyVal = betMoney.value;
    betMoneyAmount.innerHTML = `- ${moneyVal} vnđ`;
    myMoney = myMoney - parseInt(moneyVal);
    betMoney.setAttribute("max",myMoney);
};

function rightValue(value){
    if(value == 0){
        alert('Nhập số tiền cược');
    }else if(value > myMoney){
        alert('Số tiền không đủ');
        betMoney.value = 0;
    }else{
        return true;
    }
}

personChoicebtn1.addEventListener('click',function(){   
        let val = betMoney.value;
        if(rightValue(val) == true){
            content.innerHTML = val  + ' vnđ';
            if(rollTheDice() %2 == 0){
                    addAndRemove('win', 'lose');
                    changeMoneyAmount_win();
            }else{
                    addAndRemove('lose', 'win');
                    changeMoneyAmount_lose();
            }
        }
});

personChoicebtn2.addEventListener('click',function(){             
    let val = betMoney.value; 
        if(rightValue(val) == true){
            content.innerHTML = val  + ' vnđ';         
            if(rollTheDice() % 2 != 0){
                addAndRemove('win', 'lose');
                changeMoneyAmount_win();
            }else{
                addAndRemove('lose', 'win');
                changeMoneyAmount_lose();
            }
        }
});
              

for(const btn of continuebtn){
    btn.addEventListener('click',function(){
        betMoney.value = 0;
        content.innerHTML = betMoney.value  + ' vnđ';
        modalClose();
    });
}
