// Global variables
let map;
let lat = 34.0697;
let lon = -100.4432;
let zl = 6;
let path = "data/storymap.csv";
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){
	
    let circleOptions = {
        radius: 5,
        weight: 1,
        color: 'magenta',
        fillColor: 'grey',
        fillOpacity: 1,
    }
	// loop through each entry
	data.data.forEach(function(item,index){
		
        let marker = L.circleMarker([item.latitude, item.longitude], circleOptions)

        .on('mouseover',function(){
			this.bindPopup(`${item.title}<br><img src="${item.thumbnail_url}" width="200px">`).openPopup()
		})

		// add marker to featuregroup

        markers.addLayer(marker)

		$('.sidebar').append(`<img src="${item.thumbnail_url}" onmouseover="map.panTo([${item.latitude},${item.longitude}])" width="200px">`)
})

markers.addTo(map);

map.fitBounds(markers.getBounds());

}