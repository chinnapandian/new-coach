import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupcurrenttournorg'})
export class GroupCurrentTournOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupcurrenttournorg = {};
    value.forEach(function(o) {
      var orgid=o.OrgId;
      groupcurrenttournorg[orgid] = groupcurrenttournorg[orgid] ? groupcurrenttournorg[orgid] : 
                                                            { SeasonName : o.SeasonName,
                                                              TournamentId : o.TournamentId,
                                                              TournamentName: o.TournamentName,
                                                              OrgName:o.OrgName,
                                                              currentTournaments: [] };
      groupcurrenttournorg[orgid].currentTournaments.push(o);  
    });        
    return Object.keys(groupcurrenttournorg).map(function (key) {return groupcurrenttournorg[key]});
  }
}
