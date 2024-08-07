"use strict";

const passwordDisplay = document.querySelector(".password_display");
const passwordPlaceHolder = document.querySelector(".password_placeholder");
const passwordCopyText = document.querySelector(".copy_text");
const passwordCopyBtn = document.querySelector("copy_btn");

const passwordForm = document.querySelector("password_setting");
const charCount = document.querySelector(".char_count");
const lengthSlider = document.querySelector(".char_length_slider");
const checkBoxes =document.querySelectorAll("input[type=checkbox]");

const strengthDesc = document.querySelector(".strength_rating_text");
const strengthBars = document.querySelectorAll(".bar");

const Character_sets ={
    uppercase: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ",26],
    lowercase: ["abcdefghijklmnopqrstuvwxyz",26],
    number: ["1234567890",10],
    symbols: ["!@#$%^&*()",10]
};

let canCopy = false;

const getSlider = () =>{
    charCount.textContent = lengthSlider.value;
};


const styleRangeSlider = () =>{
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    const val = lengthSlider.value;

    lengthSlider.style.backgroundSize = ((val-min)*100)/ (max-min)+ "%100";
};

const handlSliderInput = ()=> {
    getSlider();
    styleRangeSlider();
};

//===============================================
//Reset Bar sylte
//===============================================
const resetBarSyltes = ()=>{
    strengthBars.forEach((bar)=>{
        bar.style.backgroundColour ="transparent";
        bar.style.borderColor = "hsl(252,11%,91%)";
    });
};

const Stylebars =([...barElement],color) =>{
    barElement.forEach((bar)=>{
        bar.style.backgroundcolor =color;
        bar.style.bordercolor = color;
    });
};

const StyleMeter = (rating)=> {
    const text = rating[0];
    const numBars = rating[1];
    const barToFill = Array.from(strengthBars).slice(0,numBars);

    resetBarSyltes();
    strengthDesc.textContent =text;

    switch (numBars){
        case 1:
            return Stylebars(barToFill,"hs(0,91%,63%");
        case 2:
            return Stylebars(barToFill,"hsl(13,95%,66%");
        case 3:
            return Stylebars(barToFill,"hsl(42,91%,68%");
        case 4:
            return Stylebars(barToFill,"hsl(127,100%,82%");
        default:
            throw new Error("invalid value from Num Bars");
    }
};

//===============================================
// password Generate
//===============================================

const calcStrength = (passwordLength, charPoolSize)=>{
    const strength =passwordLength *Math.log2(charPoolSize);

if(strength < 25){
    return["too week",1]
}else if(strength>=25 && strength < 50){
    return["week",2]
}else if(strength>=50 && strength < 75){
    return["medium",3]
}else{
    return["strong",4]
}
};

const generatePassword = (e)=>{
    e.preventDefault();
    validInput();

    let generatePassword = "";
    let includeSets = [];
    let charPool = 0;

    checkBoxes.forEach((box)=>{
        if(box.checked){
            includeSets.push(Character_sets[box.value][0]);
            charPool += Character_sets[box.value][1];
        }
    });

    if(includeSets){
        for(let i = 0; i < lengthSlider.value; i++){
            const randSetIndex = Math.floor(Math.random()* includeSets.length);
            const randSet = includeSets[randSetIndex];

            const randCharIndex = Math.floor(Math.random()* randSet.length);
            const randChar = randSet[randCharIndex];

            generatePassword
        }
    }

    const strength = calcStrength(lengthSlider.value, charPool);
    StyleMeter(strength);
    canCopy = true
    passwordDisplay.textContent = generatePassword;
};

//valid
const validInput = ()=>{
    if(Array.from(checkBoxes).every((box)=> box.checked===false)){
        alert("Make sure to check at least one Check Box");
    }
};

// copy password
const copyPassword = async() => {
    if(!passwordDisplay.textContent || passwordCopyText.textContent) return;

    if(!canCopy) return;

    setTimeout(() => {
        passwordCopyText.style.transition = "all is";
        passwordCopyText.style.opacity = 0;


        setInterval(() => {
            passwordCopyText.style.removeProperty("opacity");
            passwordCopyText.style.removeProperty("transition");
            passwordCopyText.textContent = "";
        }, 1000);    
    }, 1000);

    await navigator.clipboard.writeText(passwordDisplay.text);
    passwordCopyText.textContent = "copied";
}

charCount.textContent = lengthSlider.value;

lengthSlider.addEventListener("input",handlSliderInput);
passwordForm.addEventListener("submit",generatePassword);
passwordCopyBtn.addEventListener('click',copyPassword);
