var positions;

function geolocate() {
    const data = {
        addressdetails: 1,
        city: document.getElementById("citta").value,
        country: 'Italia',
        state: document.getElementById("regione").value,
        street: document.getElementById("strada").value,
        format: 'json',
    };

    $.ajax({
        type: "GET",
        url: 'https://nominatim.openstreetmap.org/search',
        data: data,
        success: function (data) {
            console.log(data);
            let menu = document.getElementById("scelta");
            for (let j = 0; menu.children.length > 0; j++) {
                menu.removeChild(menu.children[0]);
            }
            positions = [];
            for (let i = 0; i < data.length; i++) {
                let newOption = document.createElement('option');
                newOption.setAttribute("value", i.toString());
                newOption.innerHTML = data[i]["display_name"];
                menu.appendChild(newOption);
                positions.push({
                    lat: data[i]["lat"],
                    lng: data[i]["lon"],
                });
            }
        },
    });
}
