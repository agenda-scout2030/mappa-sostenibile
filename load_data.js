var url="https://spreadsheets.google.com/feeds/cells/1OQn4DmL6pa-DbMTHjzwXOkDoTgb0-x3lUMv8Z_PuYQ4/1/public/full?alt=json";

var jsonData; // save data for next script

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status===200){
        jsonData = xmlhttp.responseText;
        create();  // we have the data so we can create the map
    }
};
xmlhttp.open("GET",url,true);
xmlhttp.send(null);

// add to the document the script that creates the map
function create() {
    var newScript = document.createElement('script');
    newScript.setAttribute('type', 'text/javascript');
    newScript.setAttribute('src', 'https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AvBiDn5MrB3LBYSYeO65dHXFuOO69QAw82FEXcQh6N5x-QwKdN1plg6kPxpmwV1a');
    newScript.setAttribute('async', "");  // means async true
    newScript.setAttribute('defer', "");  // means defer true
    document.body.appendChild(newScript);
}
