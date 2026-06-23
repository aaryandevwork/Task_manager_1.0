let openInputBox = document.querySelector('#openInputBox')
let saveInputBtn = document.querySelector('#SaveInputBtn')
let closeInput = document.querySelector('#closeInput')
let inputSection = document.querySelector('.inputSection')


openInputBox.addEventListener('click', () =>{
    inputSection.style.display = "flex";
})

closeInput.addEventListener('click', () => {
    inputSection.style.display = "none";
})