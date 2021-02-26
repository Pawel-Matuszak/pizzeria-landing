"use strict";
const restaurant = {lat: -38.066, lng: 146.615}
const LEAFLET_ACCESS_TOKEN = config.LEAFLET_ACCESS_TOKEN;

let map = L.map('map', {
    scrollWheelZoom: false,
}).setView([restaurant.lat, restaurant.lng], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: LEAFLET_ACCESS_TOKEN, 
}).addTo(map);

let marker = L.marker([restaurant.lat, restaurant.lng]).addTo(map)
marker.bindPopup("<b>Find us here!").openPopup();