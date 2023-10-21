let numberOfQuestion = document.querySelector(".number-question");
let qistionContainer = document.querySelector(".qistion-conrainer");
let clock = document.querySelector(".time span");
let curQestion = 0;
let coorectAnswer = 0; 
let score = document.querySelector(".score")
let result = document.querySelector(".result")

fetch("question.json").then((el) =>{
    return el.json()
}).then((respon) => {
    addNumberOfQuestion(respon.length)
    for(let i = 0; i < respon.length;i++){
        addQuestion(respon[i].qestion,respon[i].answer,i);
    }
    return respon;
}).then((res)=>{
    // click on answer
    qistionContainer.addEventListener("click",(el)=>{
        if(el.target.classList.contains("box")){
            
        
            for(let i = 0; i< qistionContainer.children.length;i++){
                if(qistionContainer.children[i].classList.contains("active")){
                    removeActive(qistionContainer.children[i].children[1].children);
                }
            }
        
        el.target.classList.add("active");
    }  
    })
    // next button
    let next = document.querySelector(".next");
    next.addEventListener("click",(el)=>{
        nextClick(res)
    })
    // per button
    let per = document.querySelector(".previous");
    per.addEventListener("click",(el)=>{
        let qestion = document.querySelectorAll(".qistion-conrainer .qistion");  
        let numberOfQuestion = document.querySelectorAll(".number-question div");
        
        if(curQestion > 0 && curQestion <= res.length  ){
            next.innerHTML = "Next"
            qestion.forEach((el)=>{
                el.classList.remove("active");
            })
            numberOfQuestion.forEach((el)=>{
                el.classList.remove("active");
            })
            curQestion--;
            qestion[curQestion].classList.add("active");
            numberOfQuestion[curQestion].classList.add("active");

        }
        
    })
    let timer = setInterval(() => {
        clock.innerHTML = `${--clock.innerHTML}`
        if(clock.innerHTML === `0`){
            clearInterval(timer);
            let answer = document.querySelectorAll(".answer div")
            let selectedAnswer = Array.from(answer).filter((el)=>{
                return el.classList.contains("active");
            })
            selectedAnswer.forEach((el,index) =>{
                if(el.innerHTML === res[index].correctanswer){
                    coorectAnswer += 5;
                }
            })
            if(coorectAnswer === 0){
                showResult(res.length);
            }
        }
    }, 1000);
})
 
function addNumberOfQuestion(size){
    for (let index = 1; index <= size; index++) {
        let div = document.createElement("div");
        let text = document.createTextNode(`${index}`)
        div.append(text)
        if(index === 1){
            div.className = "active"
        }
        numberOfQuestion.append(div)
        
    }
}


function addQuestion(title,answer,length){
    let question = document.createElement("div")
    question.classList.add("qistion");
    if(length === 0){
        question.classList.add("active")
    }
    let titleQuestion = document.createElement("div");
    titleQuestion.classList.add("qistion-title")
    titleQuestion.innerHTML = `${title}`;
    question.append(titleQuestion);

    let anwerContaienr = document.createElement("div");
    anwerContaienr.classList.add("answer")
    for(let i = 0;i < answer.length;i++){
        let choose = document.createElement("div");
        choose.append(`${answer[i]}`);
        choose.classList.add("box");
        anwerContaienr.append(choose);
    }
    question.append(anwerContaienr);
    qistionContainer.append(question)
}

function removeActive(el){
   for(let i = 0; i < el.length;i++){
    el[i].classList.remove("active")
   }
}

function nextClick(cur){
    let qestion = document.querySelectorAll(".qistion-conrainer .qistion");  
    let numberOfQuestion = document.querySelectorAll(".number-question div");
    let answer = document.querySelectorAll(".answer div")
    let next = document.querySelector(".next");
    if(curQestion === cur.length - 1 ){
        let selectedAnswer = Array.from(answer).filter((el)=>{
            return el.classList.contains("active");
        })
        selectedAnswer.forEach((el,index) =>{
            if(el.innerHTML === cur[index].correctanswer){
                coorectAnswer += 5;
            }
        })
    
        showResult(cur.length);
        
        
        
    }else if(curQestion >= 0 && curQestion <= cur.length ){
        qestion.forEach((el)=>{
            el.classList.remove("active");
        })
        numberOfQuestion.forEach((el)=>{
            el.classList.remove("active");
        })
        curQestion++;
        qestion[curQestion].classList.add("active");
        numberOfQuestion[curQestion].classList.add("active");
        if(curQestion === cur.length - 1 ){
            next.innerHTML = "submit";
        }
    }
}

function showResult(total){
    score.innerHTML = `${coorectAnswer} / ${total * 5}`;
    result.style.display = "flex"
    setTimeout(() => {
        result.style.opacity = "1"
    }, 300);
}