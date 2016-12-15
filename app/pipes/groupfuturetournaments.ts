import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupfuturetournaments'})
export class GroupFutureTournamentsPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var grouptournaments = {};
    value.forEach(function(o) {
      var groupid=o.SeasonId;
      grouptournaments[groupid] = grouptournaments[groupid] ? grouptournaments[groupid] : 
                                                            { SeasonName : o.SeasonName,
                                                              TournamentId : o.TournamentId,
                                                              TournamentName: o.TournamentName,
                                                              TournamentStartDate : o.TournamentStartDate,
                                                              TournamentEndDate : o.TournamentEndDate,
                                                              LocationName : o.LocationName,
                                                              futureTournaments: [] };
      grouptournaments[groupid].futureTournaments.push(o);  
    });        
    return Object.keys(grouptournaments).map(function (key) {return grouptournaments[key]});
  }
}
