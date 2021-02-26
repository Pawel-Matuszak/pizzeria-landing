const slides = document.getElementsByClassName('slides')

//openModal
function openModal(){
    document.getElementById('modal').style.display = 'block';
}
//closeModal
function closeModal(){
    document.getElementById('modal').style.display = 'none';
}

var slideId = 1

//arrows controls
function arrowControl(num){
    showSlide(slideId += num)
}

function selectSlide(num){
    showSlide(slideId = num)
}

function showSlide(num){
    if(num>slides.length) slideId = 1
    if(num<1) slideId = slides.length
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideId-1].style.display = 'block'
}