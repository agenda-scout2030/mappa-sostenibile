const goals = [
    '1) Sconfiggere la povertà',
    '2) Sconfiggere la fame',
    '3) Salute e benessere',
    '4) Istruzione di qualità',
    '5) Parità di genere',
    '6) Acqua pulita',
    '7) Energia pulita',
    '8) Lavoro dignitoso e crescita economica',
    '9) Imprese, innovazione e infrastrutture',
    '10) Ridurre le disuguaglianze',
    '11) Città sostenibili' ,
    '12) Consumo e produzione responsabili',
    '13) Lotta contro il cambiamento climatico',
    '14) Vita sott acqua',
    '15) Vita sulla terra',
    '16) Pace, giustizia e istituzioni solide',
    '17) Partnership per gli obiettivi',

]

function sendForm(){
    let a = document.getElementById("data").value;
    console.log(document.getElementById("goal").selectedIndex);
    const data = {
        'entry.498570121': document.getElementById("nomeGruppo").value,  // nome gruppo
        'entry.1599795084': "45.5555555",  // latitude
        'entry.874512289' : "11.3344343",  // longitude
        'entry.1208166438': document.getElementById("titolo").value,  // titolo attività
        'entry.686134094':  document.getElementById("descrizione").value,  // descrizione attività
        'entry.381325376':  document.getElementById("goal").selectedIndex,  // goal
        'entry.316786119_year': "2020",
        'entry.316786119_month': "03",
        'entry.316786119_day': "01",
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

        }
    });
}
