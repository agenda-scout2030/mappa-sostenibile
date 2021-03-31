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
    let name = document.getElementById("nomeGruppo").value;
    let title = document.getElementById("titolo").value;
    let description = document.getElementById("descrizione").value;
    let dateString = document.getElementById("data").value;
    let goalNum = document.getElementById("goal").selectedIndex;

    console.log(dateString);

    if(
        name !== "" &&
        title !== "" &&
        description !== "" &&
        dateString !== "" &&
        goalNum !== 0  &&
        positions.length !== 0
    ) {
        let dateParts = dateString.split('-');
        let pos = positions[document.getElementById("scelta").selectedIndex]
        const data = {
            'entry.498570121': name,  // nome gruppo
            'entry.1599795084': pos.lat,  // latitude
            'entry.874512289' : pos.lng,  // longitude
            'entry.1208166438': title,  // titolo attività
            'entry.686134094': description,  // descrizione attività
            'entry.381325376': goals[goalNum-1],  // goal
            'entry.316786119_year': dateParts[0],
            'entry.316786119_month': dateParts[1],
            'entry.316786119_day': dateParts[2],
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
                document.location.href = "final_page.html";
            }
        });
    }
    else {
        alert("Compila tutti i campi obbligatori");
    }
}
