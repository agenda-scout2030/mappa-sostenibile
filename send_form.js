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
            'entry.1647215669': name,  // nome gruppo
            'entry.468238840': pos.lat.toString(),  // latitude
            'entry.415691257' : pos.lng.toString(),  // longitude
            'entry.1693764111': title,  // titolo attività
            'entry.1037527314': description,  // descrizione attività
            'entry.1851639960': goals[goalNum-1],  // goal
            'entry.564386048_year': dateParts[0],
            'entry.564386048_month': dateParts[1],
            'entry.564386048_day': dateParts[2],
            'entry.1833049209': document.getElementById("link").value,  // link
            'entry.1000183872': "",  // image
            'draftResponse': [],
            'pageHistory': 0
        };

        $.ajax({
            type: "POST",
            url: 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSff5ctf9pYndw9ml3RqAOQgJa8sf7YvNaYWtatIq8by8UxDvw/formResponse',
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
