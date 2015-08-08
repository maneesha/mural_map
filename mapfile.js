    <script>
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var firstLocation;
var clickedMarker;

/*
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



//var artMuseum = new google.maps.LatLng(39.964741, -75.179733);
//var independenceHall = new google.maps.LatLng(39.948703, -75.149891);
//var franklinMills = new google.maps.LatLng(40.085967, -74.963622);
//console.log("ART MUSEUM IS ", artMuseum)


var artMuseum ={attractionName:"Philadelphia Museum of Art", attractionLocation: new google.maps.LatLng(39.964741, -75.179733)}
var independenceHall = {attractionName: "Independence Hall", attractionLocation: new google.maps.LatLng(39.948703, -75.149891)};
var franklinMills = {attractionName: "Franklin Mills Mall", attractionLocation: new google.maps.LatLng(40.085967, -74.963622)};
var philliesStadium = {attractionName: "Phillies Stadium", attractionLocation: new google.maps.LatLng(39.905530, -75.165818)};
var rittenhouseSquare = {attractionName: "Rittenhouse Square", attractionLocation: new google.maps.LatLng(39.949827, -75.171998)};
var cityHall = {attractionName: "City Hall", attractionLocation: new google.maps.LatLng(39.952623, -75.163372)}

attractions = [artMuseum, independenceHall, franklinMills, philliesStadium, rittenhouseSquare, cityHall];


randomAttraction = attractions[Math.floor(Math.random()*attractions.length)];





console.log("PMA: ", artMuseum.attractionName, artMuseum.attractionLocation)



function initialize() {

locationTarget.innerHTML = "Where is " + randomAttraction.attractionName;

  firstLocation = new google.maps.LatLng(39.97699298, -75.164469157);
  var mapOptions = {
    zoom: 12,
    center: firstLocation,
    mapTypeId: google.maps.MapTypeId.TERRAIN, 
    styles:  [ { featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" } ] }, { featureType: "transit", elementType: "labels", stylers: [ { visibility: "off" } ] }] 
    //{ featureType: "poi",
    //  elementType: "labels",
    //  stylers: [
     //        { visibility: "off" }
     //            ]
   // }
    
      };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
    //console.log("YOUR CLICK LAT LNG:  ", event.latLng)
    
  });
   //clickedMarker = firstLocation
  // Adds a marker at the center of the map.
  //addMarker(firstLocation);
}


var lat1, lon1, lat2, lon2

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
  //console.log(marker.position);
  //note marker.position is the same as event.latLng
  clickedMarker = marker;
  console.log("CLICKED MARKER: ", clickedMarker.position)
  
                lat2 = clickedMarker.position.G
                lon2 = clickedMarker.position.K 
  console.log("FIRST POSITION: ", markers[0].position)
                lat1 = randomAttraction.attractionLocation.G
                lon1 = randomAttraction.attractionLocation.K    
console.log("YOU CLICKED ", distance(lat1, lon1, lat2, lon2, "M"), " MILES FROM THE START POINT");  

distanceFromStart = distance(lat1, lon1, lat2, lon2, "M").toFixed(2)
infobox.innerHTML = "YOU CLICKED " + distanceFromStart + " MILES AWAY.  <br> Reload page to play again."


 
  console.log("THERE ARE ", markers.length, " MARKERS");  
            if (markers.length > 1)
                {
                //console.log("LAST CLICKED MARKER POSITION:", markers.length-1,"at lat lon", markers[markers.length-1].position);
                //console.log("LAST CLICKED MARKER LAT: ", markers[markers.length-1].position.G)
                //console.log("LAST CLICKED MARKER LON: ", markers[markers.length-1].position.K)
                //lat1 = markers[markers.length-1].position.G
                //lon1 = markers[markers.length-1].position.K   
                
                //console.log("SECOND TO LAST CLICKED MARKER POSITION:", markers.length-2, "at lat lon",  markers[markers.length-2].position);
                //console.log("SECOND TO LAST CLICKED MARKER LAT: ", markers[markers.length-2].position.G)
                //console.log("SECOND TO LAST CLICKED MARKER LON: ", markers[markers.length-2].position.K)  
                
                lat2 = markers[markers.length-2].position.G
                lon2 = markers[markers.length-2].position.K 
            //console.log("DISTANCE: ", distance(lat1, lon1, lat2, lon2, "M")); 
                }
} //close addMarker





// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
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
