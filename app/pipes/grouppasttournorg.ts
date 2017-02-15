import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'grouppasttournorg'})
export class GroupPastTournOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var grouppasttournorg = {};
    value.forEach(function(o) {
      var orgid=o.OrgId;
      grouppasttournorg[orgid] = grouppasttournorg[orgid] ? grouppasttournorg[orgid] : 
                                                            { SeasonName : o.SeasonName,
                                                              TournamentId : o.TournamentId,
                                                              OrgName:o.OrgName,
                                                              TournamentName: o.TournamentName,
                                                              pastTournaments: [] };
      grouppasttournorg[orgid].pastTournaments.push(o);  
    });        
    return Object.keys(grouppasttournorg).map(function (key) {return grouppasttournorg[key]});
  }
}
