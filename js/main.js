let Character = [];
let Dialogue = [];
let SEID = [];
let lineCount, linesperseason, episodeCount;

d3.csv('data/scripts_updated.csv')
    .then(data => {
        data.forEach(d => {
            _data = data;
        })


        lineCount = new LineCount({ parentElement: '#linecount' }, data);
        episodeCount = new EpisodeCount({ parentElement: '#episodeCount' }, data);
        // characterWordcloud = new characterWordcloud({ parentElement: '#characterWordcloud' }, data);
        //sznNumEpisodes = new sznNumEpisodes({parentElement: '#sznnumepisodes'}, data);

        // linesPerEpisode = new LinesPerEpisode({ parentElement: '#linesPerEpisode' }, data);
        // wordcloud = new Wordcloud({ parentElement: '#wordcloud' }, data);
        // characterWordcloud = new characterWordcloud({ parentElement: '#characterWordcloid'}, data);
        // linesperseason = new Linesperseason({parentElement: '#linesperseason'}, data);


        lineCount.updateVis();
        episodeCount.updateVis();
        // sznNumEpisodes.updateVis();
        // linesPerEpisode.updateVis();
    });
