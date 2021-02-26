'use strict'
import {offers} from './menu-data.js';


window.onload = function(){
    const container = document.querySelector('.container-content')
    
    //adding legend to the top of the page
    function changeKeys(){
        const container_keys = document.getElementById("container-key");

        switch(location.hash.substr(1)){
            case "pizza":
                container_keys.innerHTML = `<p>35cm</p>
                    <p>45cm</p>
                    <p>55cm</p>`;
                break;

            case "pasta":
            case "burgers":
            case "chicken":
                container_keys.innerHTML = `<p>S</p>
                    <p>M</p>
                    <p>L</p>`;
                break;

            default:
                container_keys.innerHTML = `<p>Price</p>`;
                break;
        }
    }
    
    //creating array of all products
    var productsArr = [];
    function convertToHTML(){
        for(let offer in offers){
            //one product data
            let type = offers[offer]['type'];
            let name = offers[offer]['name'];
            let desc = offers[offer]['desc'];
            let img = offers[offer]['img'];
            
            //one product pricing data
            let price = offers[offer]['price'];
            let priceS = offers[offer]['priceS'];
            let priceM = offers[offer]['priceM'];
            let priceL = offers[offer]['priceL'];

            //check if product is missing some information
            if(priceS==undefined) priceS='-';
            if(priceM==undefined) priceM='-';
            if(priceL==undefined) priceL='-';
            if(desc==undefined) desc='';

            //variable showing prices of a product
            let priceShown = `<p class='price' id='${offers[offer]['name']}'>
                    <span>${priceS}$</span>
                    <span>${priceM}$</span>
                    <span>${priceL}$</span>
                </p>`;

            //check if product has multiple pricing variants
            if(priceS=='-' && priceM=='-' && priceL=='-'){
                priceShown = `<p class='price' id='${offers[offer]['name']}'>${price}$</p>`;
            }
            
            //pushing one product to products array
            productsArr.push([type, 
                `<div>
                    <img src='img/menu/${img}'>
                    <p class='name' id='name'>${name}</>
                    <p class='desc'>${desc}</p>
                    ${priceShown}
                </div>`]) 
        }
    }
    
    //assigning default page hash
    if(!location.hash){
        location.hash = '#pizza'
    }
    
    //if the hash changes page contents also has to be changed
    function urlChange(){
        //clearing existing content on page
        container.innerHTML = ''

        //getting current hash
        const pageHash = location.hash.substr(1)
    
        //if product is of correct type add it to innerHTML
        for(let i=0; i<productsArr.length; i++){
            if(pageHash==productsArr[i][0]){
                container.innerHTML += productsArr[i][1]
            }
        }
    }

    convertToHTML();
    changeKeys();
    urlChange();

    window.addEventListener('hashchange', changeKeys);
    window.addEventListener('hashchange', urlChange);
};