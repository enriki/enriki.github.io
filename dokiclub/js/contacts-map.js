google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
	var mapOptions = {
		center: new google.maps.LatLng(56.9432957,24.0804401),
		zoom: 14,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
		},
		disableDoubleClickZoom: true,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		panControl: false,
		streetViewControl: false,
		draggable : true,
		overviewMapControl: false,
		overviewMapControlOptions: {
			opened: false,
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
			{
				featureType: "landscape",
				stylers: [
					{ saturation: -100 },
					{ lightness: 65 },
					{ visibility: "on" }
				]
			},{
				featureType: "poi",
				stylers: [
					{ saturation: -100 },
					{ lightness: 51 },
					{ visibility: "simplified" }
				]
			},{
				featureType: "road.highway",
				stylers: [
					{ saturation: -100 },
					{ visibility: "simplified" }
				]
			},{
				featureType: "road.arterial",
				stylers: [
					{ saturation: -100 },
					{ lightness: 30 },
					{ visibility: "on" }
				]
			},{
				featureType: "road.local",
				stylers: [
					{ saturation: -100 },
					{ lightness: 40 },
					{ visibility: "on" }
				]
			},{
				featureType: "transit",
				stylers: [
				{ saturation: -100 },
				{ visibility: "simplified" }
				]
			},{
				featureType: "administrative.province",
				stylers: [
				{ visibility: "off" }
				]
				/** /
				},{
				featureType: "administrative.locality",
				stylers: [
					{ visibility: "off" }
				]
				},{
				featureType: "administrative.neighborhood",
				stylers: [
					{ visibility: "on" }
				]
				/**/
			},{
				featureType: "water",
				elementType: "labels",
				stylers: [
					{ visibility: "on" },
					{ lightness: -25 },
					{ saturation: -100 }
				]
			},{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{ hue: "#ffff00" },
					{ lightness: -25 },
					{ saturation: -97 }
				]
			}
		],
	}
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var locations = [
		['home-marker', 'undefined', 'undefined', 'undefined', 'undefined', 56.9432957, 24.0804401, 'http://i.imgur.com/U4wfuy6.png']
	];
	for (i = 0; i < locations.length; i++) {
		if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
		if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
		if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
		if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
		if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
		marker = new google.maps.Marker({
			icon: markericon,
			position: new google.maps.LatLng(locations[i][5], locations[i][6]),
			map: map,
			title: locations[i][0],
			desc: description,
			tel: telephone,
			email: email,
			web: web
		});
		link = '';
	}
}
