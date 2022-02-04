///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -4],
		zoom:5,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});



///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';




//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Riesgo  de  contaminación  atmosférica  difusa de   los   Espacios   Naturales   Protegidos   de España';
	 return div;
	};
	title2.addTo(map);



	//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);


//Logo proyecto
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/impactsig.png" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  



///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2020 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2020 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.5,
	pane:'límites',
	fillOpacity: 0,
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

	

// ortofoto


	var pnoa = L.tileLayer.wms("http://www.ign.es/wms-inspire/pnoa-ma?SERVICE=WMS&", {
	   layers: "OI.OrthoimageCoverage",//nombre de la capa (ver get capabilities)
	   format: 'image/png',
	   transparent: true,
	   version: '1.3.0',//wms version (ver get capabilities)
	   attribution: "PNOA WMS. Cedido por © Instituto Geográfico Nacional de España"
	}).addTo(map);



///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////






// estilo resaltado
var contorno = {
	color:'orange',
    weight: 2.5,
    opacity: 1,
    fillarray:2,
    fillOpacity: 0


};

function resaltado(e) {
    var layer = e.target;
    layer.setStyle(contorno);
};





//Estilo defecto

function defGetColor1(a) {return a == "Nulo-mínimo" ? '#fef5f0' :
	a == "Bajo" ? '#fcbea7' :
	a =="Moderado" ? '#fb7051' :
	a =="Severo" ? '#d32121' :
	a =="Extremo" ? '#66000c' :
	'black';
};
function defReset1(feature,layer) {
	return {
		fillColor: defGetColor1(feature.properties.RIESGO_AN),
		weight: 1,
		opacity: 0.60,
		color: 'white',
		dashArray: '1',
		fillOpacity: 1
	};
};



function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(defReset1);
};


function onEachFeature(feature, layer) {
        layer.on({
            mouseover: resaltado,
            mouseout: resetHighlight,       
        });
    }


//vulnerabilidad


function getColor1(a) {return a == "Nulo-mínimo" ? '#fef5f0' :
	a == "Bajo" ? '#fcbea7' :
	a =="Moderado" ? '#fb7051' :
	a =="Severo" ? '#d32121' :
	a =="Extremo" ? '#66000c' :
	'black';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.RIESGO_AN),
		weight: 1,
		opacity: 0.60,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.8
	};
};


function popup1(feature, layer) {
	if (feature.properties && feature.properties.ODESIGN) {
		layer.bindTooltip('<strong>'+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.genero+" "+feature.properties.SITE_NA.toLocaleString()+'</strong>'+ ' ('+feature.properties.PROVINC.toLocaleString()+')'+
			"<strong><BR>Riesgo: </strong>"+feature.properties.RIESGO_AN.toLocaleString()+
			"<strong><br>Exposición a la contaminación: </strong>"+feature.properties.Exposicion.toLocaleString()+
			"<strong><br>Vulnerabilidad territorial: </strong>"+feature.properties.Anual_vuln.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});
			layer.on({
            mouseover: resaltado,
            mouseout: resetHighlight,       
        })			
};



function resetHighlight(e) {
        geojson1.resetStyle(e.target);

    }

};
var geojson1 = L.geoJson(tabla, {

	style: style1,
	pane:'límites',
    onEachFeature: popup1    
        });
  




/* resaltando features

https://stackoverflow.com/questions/36614071/leaflet-highlight-marker-when-mouseover-with-different-colors
*/



// capas con estilo, leyenda y popup (en variable)

var mapa1 = L.layerGroup([geojson1]).addTo(map);



//menu desplegable


var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapa de riesgo de contaminación atmosférica difusa',
	children: [
		{ label: "Categorías de riesgo relativo de espacios naturales protegidos", layer: mapa1 },
        
		]
	},
	];
	
		/*{ label: "Concentración de NO<SUB>2</SUB>", layer: mapa2 },
		{ label: "Concentración de NH<SUB>3</SUB>", layer: mapa3 },
		{ label: "Concentración de CO", layer: mapa4 },
		{ label: "Clases de municipios según emisiones contaminantes", layer: mapa100 },
		{ label: "Vulnerabilidad de municipios por concentración de contaminantes", layer: mapa5 },
	*/
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		//{ label: "<b>Límites de provincias", layer: prov},
		{ label: "OpenStreetMap", layer: osm},
		/*{ label: "Satélite/Ortofotografía", layer: pnoa},
		{ label: "Base física (Google Terrain)", layer: terrainMutant},
		{ label: "Satélite (Google Satellite)", layer: satMutant},*/
	]
};	


// leyenda mapa1	

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de los espacios naturales protegidos de la Peninsula e Islas Baleares a la contaminación atmosférica difusa'+"<\h3><br>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h3>"+  'Categorías de riesgo relativo'+"<\h3><br>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Nulo-mínimo'+"<\h4>",html: '',style: {'background-color': '#fef5f0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Bajo '+"<\h4>",html: '',style: {'background-color': '#fcbea7','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Moderado'+"<\h4>",html: '',style: {'background-color': '#fb7051','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Severo'+"<\h4>",html: '',style: {'background-color': '#d32121','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Extremo'+"<\h4>",html: '',style: {'background-color': '#66000c','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<i>Fuente: Elaboración propia considerando la vulnerabilidad geoespacial física de los ENP y la exposición a contaminación basada basada en datos de emisiones de fuentes de difusas y estimación de la vulnerabilidad espacial; los ENP considerados son parques nacionales, naturales y regionales (AEMA , 2011 ; IGN, 2013; AEMET , 2018; MITERD , 2019)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend1);


// control busqueda json

	var searchControl = new L.Control.Search({
    layer:geojson1,
    propertyName:'SITE_NA',
    marker: false,
    moveToLocation: function (latlng,title,map) {
         
			map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer);
  			map.setView(latlng, zoom); // access the zoom
  
}}).addTo(map);

map.addControl( searchControl );

// control de lista desplegable arbol

L.control.layers.tree(baseTree,overlayTree).addTo(map);
//L.control.layers.tree(baseTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});
