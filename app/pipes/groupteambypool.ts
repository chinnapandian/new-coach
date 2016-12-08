import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupteambypool'})
export class GroupTeamsPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupteambypool = {};
    value.forEach(function(o) {
      groupteambypool[o.PoolId] = groupteambypool[o.PoolId] ? groupteambypool[o.PoolId] : 
                                                            { DivisionName : o.DivisionName,
                                                              PoolName : o.PoolName,
                                                              TeamName : o.TeamName,
                                                              Record : o.Record,
                                                              PD : o.PD,
                                                              PA : o.PA,
                                                              PS : o.PS,
                                                              selectedTournStandings: [] };
      groupteambypool[o.PoolId].selectedTournStandings.push(o);  
    });
        
    return Object.keys(groupteambypool).map(function (key) {return groupteambypool[key]});
  }
}
