//const axios = require('axios');

const data = {
    addressdetails: 1,
    city: 'Milano',
    country: 'Italia',
    state: 'Lombardia',
    street: 'Via Monte Napoleone, 15',
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
