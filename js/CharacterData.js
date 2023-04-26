let _data = [];
d3.csv('../data/scripts_updated.csv')
    .then(data => {
        data.forEach(d => {
            _data = data;
            // count += 1;
        })



        const actorContainer = document.getElementById("character_dropdown");

        $(document).ready(function () {
            $(".character_dropdown-content").select2();
        });

        let aggregatedData = d3.rollups(data, v => v.length, d => d.Character, d => d.SEID);
        dataMap = aggregatedData;

        console.log(aggregatedData);

        for (let i = 0; i < aggregatedData.length; i++) {
            var actorElement = document.createElement('option');
            actorElement.value = aggregatedData[i][0];
            actorElement.innerHTML = aggregatedData[i][0];

            actorContainer.appendChild(actorElement);
        }

        const orderedKeys = ['JERRY', 'GEORGE', 'ELAINE', 'KRAMER', 'NEWMAN', 'MORTY'];


        let aggregatedDataMap = Array.from(aggregatedData, ([key, count]) => ({ key, count }));
        aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));

    })

    .catch(error => console.error(error));

function actorDropdown() {
    document.getElementById("character_dropdown").classList.toggle("show");
}

actorDropdown();

$("select.character_dropdown-content").change(updateActor);


function updateActor() {

    var numEpisodes = $('select.character_dropdown-content').val();
    let aggregatedData = d3.rollups(_data, v => v.length, d => d.Character, d => d.SEID);
    const orderedKeys = ['JERRY', 'GEORGE', 'ELAINE', 'KRAMER', 'NEWMAN', 'MORTY'];

    let aggregatedDataMap = Array.from(aggregatedData, ([key, count]) => ({ key, count }));
    aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));



    $('.c-container')
        .find('.character-container')
        .hide()
        .filter(function () {
            var okEpisode = false;

            if (numEpisodes != "None") {
                okEpisode = $(this).attr('data-character') === numEpisodes;
                console.log($(this).attr('data-character'));
                console.log(okEpisode);
                console.log(numEpisodes);
                if ($(this).attr('data-character') == numEpisodes && numEpisodes == "JERRY" && $(this).attr('data-character') == "JERRY" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeJerry' }, jerryData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudJerry' }, jerryWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
                else if ($(this).attr('data-character') == numEpisodes && numEpisodes == "GEORGE" && $(this).attr('data-character') == "GEORGE" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeGeorge' }, georgeData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudGeorge' }, georgeWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
                else if ($(this).attr('data-character') == numEpisodes && numEpisodes == "ELAINE" && $(this).attr('data-character') == "ELAINE" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeElaine' }, elaineData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudElaine' }, elaineWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
                else if ($(this).attr('data-character') == numEpisodes && numEpisodes == "KRAMER" && $(this).attr('data-character') == "KRAMER" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeKramer' }, kramerData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudKramer' }, kramerWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
                else if ($(this).attr('data-character') == numEpisodes && numEpisodes == "NEWMAN" && $(this).attr('data-character') == "NEWMAN" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeNewman' }, newmanData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudNewman' }, newmanWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
                else if ($(this).attr('data-character') == numEpisodes && numEpisodes == "MORTY" && $(this).attr('data-character') == "MORTY" && okEpisode == true) {
                    linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisodeMorty' }, mortyData);
                    characterWordcloud = new CharacterWordcloud({ parentElement: '#wordcloudMorty' }, mortyWordcloud)
                    linesPerEpisode.updateVis();
                    return okEpisode;
                }
            }



        }).fadeIn('fast');

}
