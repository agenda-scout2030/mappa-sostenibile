const goals = [
    '1) Povertà zero',
    '2) Fame zero',
    '3) Salute e benessere',
    '4) Istruzione di qualità',
    '5) Uguaglianza di genere',
    '6) Acqua pulita e igiene',
    '7) Energia pulita e accessibile',
    '8) Lavoro dignitoso e crescita economica',
    '9) Industria, innovazione e infrastrutture',
    '10) Ridurre le disuguaglianze',
    '11) Città e comunità sostenibili' ,
    '12) Consumo e produzione responsabili',
    '13) Agire per il clima',
    "14) La vita sott'acqua",
    '15) La vita sulla terra',
    '16) Pace, giustizia e istituzioni forti',
    '17) Partnership per gli obiettivi',
]

function sendForm(){
    let date_parts = document.getElementById("data").value.split('-');
    let pos = positions[document.getElementById("scelta").selectedIndex]
    const data = {
        'entry.498570121': document.getElementById("nomeGruppo").value,  // nome gruppo
        'entry.1599795084': pos.lat,  // latitude
        'entry.874512289' : pos.lng,  // longitude
        'entry.1208166438': document.getElementById("titolo").value,  // titolo attività
        'entry.686134094':  document.getElementById("descrizione").value,  // descrizione attività
        'entry.381325376':  goals[document.getElementById("goal").selectedIndex-1],  // goal
        'entry.316786119_year': date_parts[0],
        'entry.316786119_month': date_parts[1],
        'entry.316786119_day': date_parts[2],
        'entry.386410129': document.getElementById("link").value,  // link
        'entry.1000183872': "",  // image
        'draftResponse': [],
        'pageHistory': 0
    };

    $.ajax({
        type: "POST",
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScIvJxCeU-96ODoQMybQMhO95yMjB0hBftsOV0272J6PWDK6g/formResponse',
        data: data,
        error: function(xhr, status, error){
            document.location.href = "https://agenda-scout2030.github.io/mappa-sostenibile/final_page.html";
        }
    });
}
