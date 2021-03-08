const menu = document.querySelector('.navbar-content')
const dropdown = document.querySelector('.dropdown-menu')

dropdown.onclick = () =>{
    if(menu.classList.contains('navbar-dropdown')){
        menu.classList.remove('navbar-dropdown')
    }else{
        menu.classList.add('navbar-dropdown')
    }
}