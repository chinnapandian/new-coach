import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupgirlsteamsbyorgid'})
export class GroupGirlsTeamsByOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupteams = {};
    value.forEach(function(o) {
      groupteams[o.OrgId] = groupteams[o.OrgId] ? groupteams[o.OrgId] : 
                                                            { OrgName : o.OrgName,
                                                              CoachFirstName: o.CoachFirstName,
                                                              CoachLastName : o.CoachLastName,
                                                              Gender : o.Gender,
                                                              Grade : o.Grade,
                                                              OrgId : o.OrgId,
                                                              TeamId : o.TeamId,
                                                              TeamName : o.TeamName,
                                                              girlsteams: [] };
      groupteams[o.OrgId].girlsteams.push(o);  
    });        
    return Object.keys(groupteams).map(function (key) {return groupteams[key]});
  }
}
