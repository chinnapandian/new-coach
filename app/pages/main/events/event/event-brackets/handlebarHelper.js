
/***  Handlebar helpers ***/
Handlebars.registerHelper('repeat', function (n, bracketSize, level, content) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
        accum += content.fn(i);
    }
    return accum.replace(/team/g, 'team'+bracketSize).replace(/level/g, 'level'+level);
});

Handlebars.registerHelper('each', function (context, options) {
    var ret = "";
    for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + options.fn(context[i]);
    }
    return ret;
});

Handlebars.registerHelper('displayTeamPool', function (team, pool, options) {
    var   optTeamPool = "";

                if (pool) {
                    optTeamPool = '<option value="pool:' + pool+ '">' + pool + '</option>';
                }
                if (team) {
                    optTeamPool = '<option value="team:' + team + '">' + team + '</option>';

                }

    return optTeamPool;
});

Handlebars.registerHelper('displayLocation', function (location, court, options) {
    var   optLocation = "";

                if (location && court) {
                    optLocation =  location + ' / ' + court ;
                }
                else if (location) {
                    optLocation =  location;
                }
                else if (court) {
                    optLocation =  court;
                }

    return optLocation;
});

Handlebars.registerHelper('displayDateTime', function (date, time, options) {
    var   optDateTime = "";
                if (date && time) {
                    optDateTime =  date + ' / ' + time ;
                }
                else {
                    optDateTime =  "";
                }

    return optDateTime;
});

Handlebars.registerHelper('ifStanding', function (poolPlace, options) {
 if (poolPlace) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('ifScore', function (gameId, team1score, team2score, options) {
    var   score = "";
    if((team1score==0)&(team2score==0))
            score = "";
    else if((team1score>0)&(team1score>=team2score))
            score = '<text class="winner" id="score1-' + gameId + '">' + team1score + '</text>' ;
    else  if((team1score>0)&(team1score<team2score))
            score = '<text class="" id="score1-' + gameId + '">' + team1score + '</text>' ;
    else
            score = team1score;
    return score;
});

Handlebars.registerHelper('displayChampion', function (team1score, team2score, team1name, team2name, options) {
    var   champion = "";
    if(team1score>=team2score)
            champion = '<text class="winner">' + team1name + '</text>' ;
    else
             champion = '<text class="winner">' + team2name + '</text>' ;
    return champion;
});

Handlebars.registerHelper('ifWinner', function (team, options) {
    if (team === 'winner') {
        return options.fn(this);
    }
    return options.inverse(this);
});