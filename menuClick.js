if(!location.hash){
    location.hash = '#pizza'
}

//adding click to current menu option
const pageHash = location.hash.substr(1)
document.querySelector('.'+pageHash).classList.add('click')

//changing styles for active menu option
for(let i=1; i<7; i++){
    document.querySelector('.nav'+i).onclick = ()=>{
        if(!document.querySelector('.nav'+i).classList.contains('click')){
            for(let j=1; j<7; j++){
                document.querySelector('.nav'+j).classList.remove('click')      
            }
            document.querySelector('.nav'+i).classList.add('click')
        }
    }
}