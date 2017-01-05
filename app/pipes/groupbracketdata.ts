import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupbracketdata'})
export class GroupBracketData implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupbracketdata = {};
    value.forEach(function(o) {
      groupbracketdata[o.BracketsId] = groupbracketdata[o.BracketsId] ? groupbracketdata[o.BracketsId] : 
                                                            { Team1Name : o.Team1Name,
                                                              GameId : o.GameId,
                                                              Team1PoolName : o.Team1PoolName,
                                                              Coach1Name : o.Coach1Name,
                                                              TournTeamId1 : o.TournTeamId1,
                                                              Team2Name : o.Team2Name,
                                                              TournTeamId2 : o.TournTeamId2,
                                                              Team2PoolName : o.Team2PoolName,
                                                              Coach2Name : o.Coach2Name,
                                                              Team1PlaceHolder : o.Team1PlaceHolder,
                                                              Team2PlaceHolder : o.Team2PlaceHolder,
                                                              LocationAbb : o.LocationAbb,
                                                              CourtName : o.CourtName,
                                                              Championship : o.Championship,
                                                              DivisionName : o.DivisionName,
                                                              Title : o.Title,
                                                              GameDate : o.GameDate,
                                                              StartShortTime : o.StartShortTime,
                                                              PrevGameId1 : o.PrevGameId1,
                                                              PrevGameId2 : o.PrevGameId2,
                                                              bracketGamesOfRound: [] };
      groupbracketdata[o.BracketsId].bracketGamesOfRound.push(o);  
    });
        
    return Object.keys(groupbracketdata).map(function (key) {return groupbracketdata[key]});
  }
}
