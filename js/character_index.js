let chartData = [];
let linesPerEpisode;
let count = 0;
let dataMap, jerryData, georgeData, elaineData, kramerData, newmanData, mortyData;
let cardMethods;
let jerryWordcloud, georgeWordcloud, kramerWordcloud, elaineWordcloud, mortyWordcloud, newmanWordcloud;


d3.csv('data/scripts_updated.csv')
  .then(data => {
    data.forEach(d => {
      _data = data;
      count += 1;
    })



    for (let i = 0; i < count; i++) {
      chartData[i] = data[i];
    };

    chartData.shift();

    // cardData.shift();
    let aggregatedData = d3.rollups(chartData, v => v.length, d => d.Character, d => d.SEID);
    let characterDialogue = d3.rollups(chartData, v => v.length, d => d.Character, d => d.Dialogue);

    console.log(characterDialogue);
    dataMap = aggregatedData;

    jerryData = dataMap[0];
    georgeData = dataMap[1];
    elaineData = dataMap[2];
    kramerData = dataMap[3];
    newmanData = dataMap[4];
    mortyData = dataMap[5];

    jerryWordcloud = characterDialogue[0];
    georgeWordcloud = characterDialogue[1];
    kramerWordcloud = characterDialogue[2];
    elaineWordcloud = characterDialogue[3];
    mortyWordcloud = characterDialogue[4];
    newmanWordcloud = characterDialogue[5];




    const orderedKeys = ['JERRY', 'GEORGE', 'ELAINE', 'KRAMER', 'NEWMAN', 'MORTY', 'HELEN', 'FRANK'];

    let characterDialogueMap = Array.from(characterDialogue, ([key, count]) => ({ key, count }));
    characterDialogueMap = characterDialogueMap.filter(d => orderedKeys.includes(d.key));

    let aggregatedDataMap = Array.from(aggregatedData, ([key, count]) => ({ key, count }));
    aggregatedDataMap = aggregatedDataMap.filter(d => orderedKeys.includes(d.key));
    console.log(aggregatedDataMap);

    // for( let i = 0; i < aggregatedDataMap.length; i++) {
    //     var actorElement = document.createElement('option');
    //     actorElement.value = aggregatedDataMap[i][0];
    //     actorElement.innerHTML = aggregatedDataMap[i][0];

    //     actorContainer.appendChild(actorElement);
    // }




    const postcontainer = document.querySelector('.c-container');




    cardMethods = () => {

      aggregatedDataMap.map((postData) => {
        if (postData.key == "JERRY") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
        <svg id="linesPerEpisodeJerry">
        </svg>
                `;
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "GEORGE") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
          <svg id="linesPerEpisodeGeorge">
          </svg>
                  `;
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "KRAMER") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
          <svg id="linesPerEpisodeKramer">
          </svg>
                  `;
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "ELAINE") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
          <svg id="linesPerEpisodeElaine">
          </svg>
                  `
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "MORTY") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
          <svg id="linesPerEpisodeMorty">
          </svg>
                  `;
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "NEWMAN") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = `
          <svg id="linesPerEpisodeNewman">
          </svg>
                  `;
          postcontainer.appendChild(postElement);
        }
        else if (postData.key == "None") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-character', postData.key);
          postElement.classList.add('character-container');
          postElement.innerHTML = ``;
          postcontainer.appendChild(postElement);
        }


      })

    }

    const wordcloudContainer = document.querySelector('.w-container');

    wordcloudMethods = () => {

      characterDialogueMap.map((postData) => {
        if (postData.key == "JERRY") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key)
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
        <svg id="wordcloudJerry">
        </svg>
                `;
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "GEORGE") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
          <svg id="wordcloudGeorge">
          </svg>
                  `;
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "KRAMER") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
          <svg id="wordcloudKramer">
          </svg>
                  `;
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "ELAINE") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
          <svg id="wordcloudElaine">
          </svg>
                  `
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "MORTY") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
          <svg id="wordcloudMorty">
          </svg>
                  `;
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "NEWMAN") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = `
          <svg id="wordcloudNewman">
          </svg>
                  `;
          wordcloudContainer.appendChild(postElement);
        }
        else if (postData.key == "None") {
          const postElement = document.createElement('div');
          postElement.setAttribute('data-wordcloud', postData.key);
          postElement.classList.add('wordcloud-container');
          postElement.innerHTML = ``;
          wordcloudContainer.appendChild(postElement);
        }


      })

    }

    cardMethods();
    wordcloudMethods();

  })
  .catch(error => console.error(error));





