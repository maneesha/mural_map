
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var centerLocation;
var clickedMarker;
var lat1, lon1, lat2, lon2

/*
Pseudocode:

Get 6 items at random from database
//var item = items[Math.floor(Math.random()*items.length)];
item1 = {attractionName:attractionName, attractionLocation:new.google.maps.LatLng(x,y)
...
listOfItems = [item1, item2, item3, item4, item5, item6]
for i in listOfItems:
    questionbox.innerhtml = attractionName
    dist = distance
    click for next
    
click to display actual location
//point system?

*/

//Create a bunch of attractions and put them in a list
var artMuseum ={attractionName:"Philadelphia Museum of Art", attractionLocation: new google.maps.LatLng(39.964741, -75.179733)}
var independenceHall = {attractionName: "Independence Hall", attractionLocation: new google.maps.LatLng(39.948703, -75.149891)};
var franklinMills = {attractionName: "Franklin Mills Mall", attractionLocation: new google.maps.LatLng(40.085967, -74.963622)};
var philliesStadium = {attractionName: "Phillies Stadium", attractionLocation: new google.maps.LatLng(39.905530, -75.165818)};
var rittenhouseSquare = {attractionName: "Rittenhouse Square", attractionLocation: new google.maps.LatLng(39.949827, -75.171998)};
var cityHall = {attractionName: "City Hall", attractionLocation: new google.maps.LatLng(39.952623, -75.163372)}
var galleryMall;
var bartramsGarden;
var morrisArboretum;

attractions = [artMuseum, independenceHall, franklinMills, philliesStadium, rittenhouseSquare, cityHall];

//Initialize the map
function initialize() {

  centerLocation = new google.maps.LatLng(39.97699298, -75.164469157);
  var mapOptions = {
    zoom: 12,
    center: centerLocation,
    mapTypeId: google.maps.MapTypeId.TERRAIN, 
disableDefaultUI: true,
scaleControl: true,
    zoomControl: true,

    styles:  [
             //get rid of points of interest & transit
             { featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" } ] }, 
             { featureType: "transit", elementType: "labels", stylers: [ { visibility: "off" } ] }] 
  };

  //Put the map in the map-canvas div
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // // This event listener will call addMarker() when the map is clicked.
  // google.maps.event.addListener(map, 'click', function(event) {
  //   addMarker(event.latLng);
  //   }); //close click function event


  //Step through items in attractions list
  i = 0;
  document.getElementById("myBtn").addEventListener("click", 
    function() {


      // This event listener will call addMarker() when the map is clicked.
      google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
        }); //close click function event


      //Make button say "Next" instead of "Start"
      this.textContent = "Next";

      //Remove any exisiting marker
      if (typeof marker !== 'undefined') {marker.setMap(null)}
      if (typeof attractionMarker !== 'undefined') {attractionMarker.setMap(null)}
      if (typeof clickedMarker !== 'undefined') {clickedMarker.setMap(null)}      
      //Just some debugging - remove for deployment
      // console.log(attractions[i]);
      // document.getElementById("infobox").innerHTML += i;
      
      //Continue game only for as long as the number of attractions
      //This populates the #infobox but does not actually stop user from playing
      if (i<attractions.length) {
        getAttraction(i);
      }
      else {
        document.getElementById("infobox").innerHTML = "GAME OVER";
        document.getElementById("locationTarget").innerHTML = "";
        document.getElementById("myBtn").disabled = true;
        google.maps.event.clearListeners(map, 'click');
      }

      //Go to next item in array  
      //modulus operator is not necessary here; makes loop cycle back to zero
      i = (i+1) // % attractions.length;
    });//close click eventListener

} //close function initialize()

var k;
function getAttraction(z) {
  k = attractions[z].attractionName;
  m = attractions[z].attractionLocation;
  locationTarget.innerHTML = "Where is " + attractions[z].attractionName;
  lat1 = attractions[z].attractionLocation.G
  lon1 = attractions[z].attractionLocation.K    
}

// Function takes a location and adds a marker at that location
function addMarker(markerLocation) {
  if (typeof marker !== 'undefined') {marker.setMap(null)}
  if (typeof clickedMarker !== 'undefined') {clickedMarker.setMap(null)}     


  marker = new google.maps.Marker({
    position: markerLocation,
    map: map
  });
  clickedMarker = marker;
  
  lat2 = clickedMarker.position.G
  lon2 = clickedMarker.position.K 

  revealDistance();

         google.maps.event.clearListeners(map, 'click');

  // distanceFromStart = distance(lat1, lon1, lat2, lon2, "M").toFixed(2)
  // infobox.innerHTML = "YOU CLICKED " + distanceFromStart + " MILES AWAY FROM " + k;
  // infobox.innerHTML += "<br>Click button to try next attraction."


} //close addMarker


function revealDistance() {
  distanceFromStart = distance(lat1, lon1, lat2, lon2, "M").toFixed(2)
  infobox.innerHTML = "YOU CLICKED " + distanceFromStart + " MILES AWAY FROM " + k;
  infobox.innerHTML += "<br>Click button to try next attraction."

  // marker = new google.maps.Marker({
  //   position: m,
  //   map: map,
  //       animation: google.maps.Animation.DROP,
  //   icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  // });
 marker = new MarkerWithLabel({
   position: m,
   draggable: false,
   map: map,
   labelContent: k,
   labelAnchor: new google.maps.Point(22, 0),
   labelClass: "labels", // the CSS class for the label
   labelStyle: {opacity: 0.75},
   icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

 });

var widthx = document.getElementsByClassName('label').offsetWidth;
console.log("WIDTH OF ", k, " is ", widthx)
}


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}  

google.maps.event.addDomListener(window, 'load', initialize);
