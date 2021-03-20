var map;
var pinList = [];  // create an object

var infobox;

const imageBase = "https://raw.githubusercontent.com/agenda-scout2030/mappa-sostenibile/main/assets/goals_images/";
const iconBase = "https://raw.githubusercontent.com/agenda-scout2030/mappa-sostenibile/main/assets/goals_icons/";

// called from bing api
function GetMap() {
    parseMarkers();  // fill pins list

    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(44.643, 10.925229),
        zoom: 17,
    });

    // initialize infobox for future use
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        offset: new Microsoft.Maps.Point(0, 30),  // the amount the info box bottom is shifted from the pin location
        visible: false,  // not visible in the beginning
        maxWidth: 350,
        maxHeight: 160,
    });
    infobox.setMap(map);

    //  clickable layer for the pins
    var layer = new Microsoft.Maps.Layer();

    for(let i = 0; i < pinList.length; i++) {
        let pinInfo = pinList[i];

        if (pinInfo.approved === '1') {  // check moderator cell value
            // create pushpin
            var pin = new Microsoft.Maps.Pushpin(
                new Microsoft.Maps.Location(pinInfo.location.lat, pinInfo.location.lng), {
                    title: pinInfo.name,
                    subTitle: pinInfo.goalText,
                    icon: iconBase + pinInfo.goalNum + '.png',
                }
            );

            pin.metadata = pinInfo;

            // add the pushpin to the layer
            layer.add(pin);
        }
    }

    // add a click handler to the layer.
    Microsoft.Maps.Events.addHandler(layer, 'click', displayInfobox);

    map.layers.insert(layer);

    // once map initialization is finished show the add button
    document.getElementById('addBtn').removeAttribute('hidden');
    document.getElementById('infoBtn').removeAttribute('hidden');
}

// parse markers from row input json
function parseMarkers() {
    let text;
    text = jsonData;
    if (text !== "") {
        let entries = JSON.parse(text).feed.entry;
        for(let i = 0; i < entries.length; i++) {
            let cell = entries[i]['gs$cell'];
            let row = cell.row - 2;  // spreadsheets counts from 1 and first row contains labels
            let col = cell.col;
            let val = cell['$t'];
            if (row >= 0) {
                if (pinList[row] === undefined) {
                    pinList[row] = {  // initialize with default values
                        name: "",
                        title: "",
                        description: "",
                        location: {},
                    };
                }
                switch (col) {
                    case '2':
                        pinList[row].name = val;
                        break;
                    case '10':
                        let parts = val.split(')');
                        pinList[row].goalNum = parts[0];
                        pinList[row].goalText = parts[1];
                        break;
                    case '11':
                        pinList[row].date = val;
                        break;
                    case '7':
                        pinList[row].title = val;
                        break;
                    case '3':
                        pinList[row].description = val;
                        break;
                    case '4':
                        pinList[row].location.lat = val;
                        break;
                    case '5':
                        pinList[row].location.lng = val;
                        break;
                    case '6':
                        pinList[row].link = val;
                        break;
                    case '8':
                        pinList[row].image = val;
                        break;
                    case '9':
                        pinList[row].approved = val;
                        break;
                }
            }
        }
    }
}


function displayInfobox(event) {
    let pin = event.target;

    let body = [];  // info box body

    body.push('<div class="infowindow-content">');
    body.push('<p>');
    /*if(!(pin.metadata.image === undefined)) {  // if image is defined
        body.push('<img class="image" src="' + pin.metadata.image + '" alt="">');
    }*/
    body.push('<img class="image" src="' + imageBase + pin.metadata.goalNum + '.jpg' + '" alt="">')
    body.push(pin.metadata.description + '</p>');
    if (!(pin.metadata.link === undefined)) {  // if link is defined
        body.push('<div class="bottomtext"><a href="' + pin.metadata.link + '" target=_blank>Scopri di più...</a></div>');
    }
    body.push('</div>');

    infobox.setOptions({
        location: pin.getLocation(),  // move the infobox to the new location
        title: pin.metadata.title,
        description: body.join(''),  // accepts a string as html to set the infobox body
        visible: true  // show infobox if is hidden
    })
}
