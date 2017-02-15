import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupfuturetournorg'})
export class GroupFutureTournOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupfuturetournorg = {};
    value.forEach(function(o) {
      var orgid=o.OrgId;
      groupfuturetournorg[orgid] = groupfuturetournorg[orgid] ? groupfuturetournorg[orgid] : 
                                                            { SeasonName : o.SeasonName,
                                                              TournamentId : o.TournamentId,
                                                              OrgName:o.OrgName,
                                                              TournamentName: o.TournamentName,
                                                              futureTournaments: [] };
      groupfuturetournorg[orgid].futureTournaments.push(o);  
    });        
    return Object.keys(groupfuturetournorg).map(function (key) {return groupfuturetournorg[key]});
  }
}
