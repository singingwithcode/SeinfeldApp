d3.csv('../data/scripts_updated.csv')
    .then(data => {
        data.forEach(d => {
            _data = data;
            // count += 1;
        })



        const seasonContainer = document.getElementById("season_dropdown");

        $(document).ready(function () {
            $(".season_dropdown-content").select2();
        });

        let someData = d3.rollups(data, v => v.length, d => d.Season, d => d.Character);
        seasonData = someData;

        for (let i = 1; i < seasonData.length; i++) {
            seasonData[i][0] = "Season " + seasonData[i][0];
        }

        for (let i = 0; i < seasonData.length; i++) {
            var seasonElement = document.createElement('option');
            seasonElement.value = seasonData[i][0];
            seasonElement.innerHTML = seasonData[i][0];

            seasonContainer.appendChild(seasonElement);
        }

        const orderedKeys = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8', 'Season 9'];


        let aggregatedDataMap = Array.from(seasonData, ([key, count]) => ({ key, count }));
        aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));

    })

    .catch(error => console.error(error));

function seasonDropdown() {
    document.getElementById("season_dropdown").classList.toggle("show");
}

seasonDropdown();

$("select.season_dropdown-content").change(updateSeason);


function updateSeason() {

    var Seasons = $('select.season_dropdown-content').val();
    let aggregatedData = d3.rollups(_data, v => v.length, d => d.Season, d => d.Character);
    const orderedKeys = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8', 'Season 9'];

    let aggregatedDataMap = Array.from(aggregatedData, ([key, count]) => ({ key, count }));
    aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));



    $('.s-container')
        .find('.season-container')
        .hide()
        .filter(function () {
            var okSeason = false;

            if (Seasons != "None") {
                okSeason = $(this).attr('data-season') === Seasons;
                console.log($(this).attr('data-season'));
                if ($(this).attr('data-season') == Seasons && Seasons == "Season 1" && $(this).attr('data-season') == "Season 1" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season1' }, season1);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 2" && $(this).attr('data-season') == "Season 2" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season2' }, season2);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 3" && $(this).attr('data-season') == "Season 3" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season3' }, season3);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 4" && $(this).attr('data-season') == "Season 4" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season4' }, season4);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 5" && $(this).attr('data-season') == "Season 5" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season5' }, season5);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 6" && $(this).attr('data-season') == "Season 6" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season6' }, season6);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 7" && $(this).attr('data-season') == "Season 7" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season7' }, season7);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 8" && $(this).attr('data-season') == "Season 8" && okSeason == true) {
                    seasonNum = new SeasonNum({ parentElement: '#season8' }, season8);
                    seasonNum.updateVis();
                    return okSeason;
                }
                else if ($(this).attr('data-season') == Seasons && Seasons == "Season 9" && $(this).attr('data-season') == "Season 9" && okSeason == true) {
                    SeasonNum = new SeasonNum({ parentElement: '#season9' }, season9);
                    SeasonNum.updateVis();
                    return okSeason;
                }
            }



        }).fadeIn('fast');

}
