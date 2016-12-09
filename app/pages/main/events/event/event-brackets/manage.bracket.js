(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define["amd"])
        define([], factory);
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["brackets"] = global["brackets"] || {})["API"] = factory();

}(this, function() {
    "use strict";

var  API = {};
    

            // Handle bar Templates compilation
            var roundTemplate = $("#bracket-template").html();
            var roundHandleBarTemplate = Handlebars.compile(roundTemplate);

            var gameUniqueIdentifier = 1;

            var poolsTeamsData;

            

            API.getHtmlTemplate = function(obj) {
                var html = roundHandleBarTemplate(obj);
                return html;
            }

            API.generateChampionshipBracket = function (inputBracketSize, tournTeamList, standingsList) {
                var bracketMetaData = getBracketMetadata(inputBracketSize),
                    i;
                  // bracketMetaData = setPoolsTeamsData(bracketMetaData, poolsTeamsData);
              
                var games = createMatchupsAllLevel(bracketMetaData);
                $.each(games, function (i, game) {
                    $.each(games[i].matchup, function(j, match){
                        if (!games[i].matchup[j]['bracketSize']) {
                            games[i].matchup[j]['bracketSize'] = {};
                            games[i].matchup[j]['bracketSize'] = inputBracketSize;
                        }
                    })
                    
                })
                return games;

            }; // end of generateChampionShipBracket()

            function createMatchupsAllLevel(bracketMetaData) {
                var matchups = [];
                for (var index = 1; index <= bracketMetaData.levelCount; index++) {
                    // var currentLevelData = _.filter(bracketMetaData.data, function (item) {
                    //     return parseInt(item.level) == index;
                    // });
                    var currentLevelData = [];
                    for (var index1 = 0; index1 < bracketMetaData.data.length; index1++) {
                        if(bracketMetaData.data[index1].level == index) {
                            currentLevelData.push(bracketMetaData.data[index1]);
                            //break;
                        }
                    }
                    matchups.push(createMatchups(currentLevelData, index));
                } // end of for loop
                return matchups;
            }

            function createMatchups(bracketLevelData, level) {
                var matchups = [];

                $.each(bracketLevelData, function (idx, bracketData) {
                    matchups.push({
                        "team1Name": bracketData.team1Name,
                        "gameId": gameUniqueIdentifier++,
                        "team2Name": bracketData.team2Name,
                        "prefixGameSpacer": bracketData.prefixGameSpacer,
                        "suffixGameSpacer": bracketData.suffixGameSpacer,
                        "level": level,
                        "poolsTeamsData": bracketData.poolsTeamsData,
                        "team1PoolId": "",
                        "team1PoolPlace": "",
                        "team2PoolId": "",
                        "team2PoolPlace": "",
                        "team1PoolName": "",
                        "team2PoolName": "",
                        "locationAbb": "",
                        "courtName": "",
                        "team1Score": bracketData.TournTeamId1Score,
                        "team2Score": bracketData.TournTeamId2Score,
                        "gameDate": null,
                        "startTime": bracketData.StartShortTime
                    });
                }); // end of for loop

                return { "matchup": matchups, "level": level };
            } // end of function

            function getBracketMetadata(bracketTeamSize) {
                var output = {
                    levelCount: 0,
                    data: []
                };
                switch (bracketTeamSize) {
                    case 2:
                        {
                            output.levelCount = 1;
                            output.data.push(bracket(1, "team 1", "team 2"));
                            break;
                        } // end of case
                    case 3:
                        {
                            output.levelCount = 2;
                            output.data.push(bracket(1, "team 1", "team 2", 2));
                            output.data.push(bracket(2, "Winner", "team 3", 1, 1));
                            break;
                        } // end of case
                    case 4:
                        {
                            output.levelCount = 2;
                            output.data.push(bracket(1, "team 1", "team 2", 1));
                            output.data.push(bracket(1, "team 3", "team 4", 1));
                            output.data.push(bracket(2, "Winner", "Winner", 1));
                            break;
                        } // end of case
                    case 5:
                        {
                            output.levelCount = 3;
                            output.data.push(bracket(1, "team 1", "team 2", 16));
                            output.data.push(bracket(2, "Winner", "team 3"));
                            output.data.push(bracket(2, "team 4", "Team 5", 1));
                            output.data.push(bracket(3, "Winner", "Winner", 1));
                            break;
                        } // end of case

                    case 6:
                        {
                            output.levelCount = 3;
                            output.data.push(bracket(1, "team 1", "team 2"));
                            output.data.push(bracket(1, "team 3", "team 4", 1, 0));
                            output.data.push(bracket(2, "Winner", "Team 5", 0, 2));
                            output.data.push(bracket(2, "Winner", "Team 6", 1, 2));
                            output.data.push(bracket(3, "Winner", "Winner", 1, 0));
                            break;
                        } // end of case
                    case 7:
                        {
                            output.levelCount = 3;
                            output.data.push(bracket(1, "team 1", "team 2", 6));
                            output.data.push(bracket(1, "team 3", "team 4"));
                            output.data.push(bracket(1, "team 5", "team 6", 1));
                            output.data.push(bracket(2, "Winner", "team 7"));
                            output.data.push(bracket(2, "Winner", "Winner", 1));
                            output.data.push(bracket(3, "Winner", "Winner", 1));
                            break;
                        } // end of case
                    case 8:
                        {
                            output.levelCount = 3;
                            output.data.push(bracket(1, "team 1", "team 2"));
                            output.data.push(bracket(1, "team 3", "team 4"));
                            output.data.push(bracket(1, "team 5", "team 6"));
                            output.data.push(bracket(1, "team 7", "team 8", 1));
                            output.data.push(bracket(2, "Winner", "Winner"));
                            output.data.push(bracket(2, "Winner", "Winner", 1));
                            output.data.push(bracket(3, "Winner", "Winner", 1));
                            break;
                        } // end of case
                    case 9:
                        {
                            output.levelCount = 4;
                            output.data.push(bracket(1, "team 1", "team 2", 29));
                            output.data.push(bracket(2, "Winner", "team 3"));
                            output.data.push(bracket(2, "team 4", "team 5"));
                            output.data.push(bracket(2, "team 6", "team 7"));
                            output.data.push(bracket(2, "team 8", "team 9", 1));
                            output.data.push(bracket(3, "Winner", "Winner"));
                            output.data.push(bracket(3, "Winner", "Winner", 1));
                            output.data.push(bracket(4, "Winner", "Winner", 1));
                            break;
                        } // end of case
                    case 10:
                        {
                            output.levelCount = 4;
                            output.data.push(bracket(1, "team 1", "team 2", 20));
                            output.data.push(bracket(1, "team 3", "team 4", 4));
                            output.data.push(bracket(2, "Winner", "team 5"));
                            output.data.push(bracket(2, "team 6", "team 7"));
                            output.data.push(bracket(2, "team 8", "team 9"));
                            output.data.push(bracket(2, "Winner", "team 10", 1));
                            output.data.push(bracket(3, "Winner", "Winner"));
                            output.data.push(bracket(3, "Winner", "Winner", 1));
                            output.data.push(bracket(4, "Winner", "Winner", 1));
                            break;
                        } // end of case

                } // end of switch
                return output;
            } // end of function

            function bracket(level, team1Name, team2Name, suffixGameSpacer, prefixGameSpacer) {
                return {
                    level: level,
                    team1Name: team1Name,
                    team2Name: team2Name,
                    suffixGameSpacer: suffixGameSpacer,
                    prefixGameSpacer: prefixGameSpacer,
                    team1PoolId: "",
                    team1PoolPlace: "",
                    team2PoolId: "",
                    team2PoolPlace: "",
                    team1DisplayName: "",
                    team2DisplayName: ""
                };
            }
        
        return API;
}));

//Main starts

    console.log('Starting..');
