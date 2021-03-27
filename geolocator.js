function geolocate() {
    alert("Grazie per aver compilato il form");
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
        },
    });
}
