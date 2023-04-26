let totalData = [];
let season1, season2, season3, season4, season5, season6, season7, season8, season9;

d3.csv('data/scripts_updated.csv')
    .then(data => {
        data.forEach(d => {
            _data = data;
            count += 1;
        })



        // for (let i = 0; i < count; i++) {
        //     totalData[i] = data[i];
        // };

        // console.log(totalData);
        // totalData.shift();

        // cardData.shift();
        let seasonData = d3.rollups(chartData, v => v.length, d => d.Season, d => d.Character);


        for (let i = 0; i < seasonData.length; i++) {
            seasonData[i][0] = "Season " + seasonData[i][0];
        }
        console.log(seasonData);

        season1 = seasonData[0];
        season2 = seasonData[1];
        season3 = seasonData[2];
        season4 = seasonData[3];
        season5 = seasonData[4];
        season6 = seasonData[5];
        season7 = seasonData[6];
        season8 = seasonData[8];
        season9 = seasonData[9];

        console.log(season1);


        const orderedKeys = ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8', 'Season 9'];


        let aggregatedDataMap = Array.from(seasonData, ([key, count]) => ({ key, count }));
        aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));
        console.log(aggregatedDataMap);

        // for( let i = 0; i < aggregatedDataMap.length; i++) {
        //     var actorElement = document.createElement('option');
        //     actorElement.value = aggregatedDataMap[i][0];
        //     actorElement.innerHTML = aggregatedDataMap[i][0];

        //     actorContainer.appendChild(actorElement);
        // }




        const postcontainer = document.querySelector('.s-container');

        cardMethods = () => {

            aggregatedDataMap.map((postData) => {
                if (postData.key == "Season 1") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season1">
                    </svg>
                `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 2") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                     <svg id="season2">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 3") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season3">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 4") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season4">
                    </svg>
                  `
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 5") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season5">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 6") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season6">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 7") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season7">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 8") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season8">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "Season 9") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = `
                    <svg id="season9">
                    </svg>
                  `;
                    postcontainer.appendChild(postElement);
                }
                else if (postData.key == "None") {
                    const postElement = document.createElement('div');
                    postElement.setAttribute('data-season', postData.key);
                    postElement.classList.add('season-container');
                    postElement.innerHTML = ``;
                    postcontainer.appendChild(postElement);
                }


            })

        }
        cardMethods();

    })
    .catch(error => console.error(error));
