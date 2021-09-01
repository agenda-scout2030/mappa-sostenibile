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
        zoom: 14,
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

function getValue(elem) {
    if(elem === null)
        return "";
    if(elem.v === null)
        return "";
    return elem.v.toString();
}

// parse markers from row input json
function parseMarkers() {
    let text;
    text = jsonData;
    text = text.split("setResponse(")[1].slice(0, -2);
    if (text !== "") {
        let rows = JSON.parse(text).table.rows;
        for(let i = 0; i < rows.length; i++) {
            let r = rows[i].c;
            let goal = getValue(r[2]).split(') ');
            pinList[i] = {  // initialize with default values
                name: getValue(r[1]),
                goalNum: goal[0],
                goalText: goal[1],
                date: getValue(r[3]),
                location: {
                    lat: getValue(r[4]),
                    lng: getValue(r[5])
                },
                title: getValue(r[6]),
                description: getValue(r[7]),
                link: getValue(r[8]),
                approved: getValue(r[9]),
            };
        }
    }
}


function displayInfobox(event) {
    let pin = event.target;

    let body = [];  // info box body

    body.push('<div class="infowindow-content">');
    body.push('<p>');
    body.push('<img class="image" src="' + imageBase + pin.metadata.goalNum + '.jpg' + '" alt="">')
    body.push(pin.metadata.description + '</p>');
    if (!(pin.metadata.link === "")) {  // if link is defined
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
