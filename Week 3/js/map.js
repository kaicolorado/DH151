var map = L.map('map').setView([34.0697,-100.4432], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let data = [
   {
	'title':'UCLA',
	'desc' : 'Where I currently live',
   	'lat': 34.0679842,
    'lon': -118.4491570
  },  
	    {
		    'title':'San Diego',
		    'desc' : 'Where I grew up and where my parents currently live',
			'lat': 32.8343872,
		    'lon': -117.0900217
	    },
    	{
		    'title':'Santa Rosa',
			'desc' : 'Where my dad grew up',
    		'lat': 38.4507486,
	    	'lon': -122.7478461
	    },
    	{
	    	'title':'San Bruno',
			'desc' : 'Where my mom grew up',
    		'lat': 37.6206578,
	    	'lon': -122.4194064
	    },
    	{
    		'title':'SDSU',
			'desc' : 'Where my parents went to college',
	    	'lat': 32.7746470,
		    'lon': -117.0715014
	    }
	]


	let myMarkers = L.featureGroup();

        data.forEach(function(item, index){
            var marker = L.marker([item.lat,item.lon])
				.bindPopup(item.desc)
				

				myMarkers.addLayer(marker);


				$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`);
	
				
});

myMarkers.addTo(map)


function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],10)
	myMarkers.getLayers()[index].openPopup()
}

let layers = {
	"My Markers" : myMarkers
}

L.control.layers(null,layers).addTo(map)

map.fitBounds(myMarkers.getBounds())