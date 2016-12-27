import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupboysteamsbyorgid'})
export class GroupBoysTeamsByOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupboysteamsbyorgid = {};
        value.forEach(function(o) {
                    groupboysteamsbyorgid[o.OrgId] = groupboysteamsbyorgid[o.OrgId] ? groupboysteamsbyorgid[o.OrgId] : 
                                                                          { OrgName : o.OrgName,
                                                                            CoachFirstName: o.CoachFirstName,
                                                                            CoachLastName : o.CoachLastName,
                                                                            Gender : o.Gender,
                                                                            Grade : o.Grade,
                                                                            OrgId : o.OrgId,
                                                                            TeamId : o.TeamId,
                                                                            TeamName : o.TeamName,
                                                                            boysteams: [] };
                    groupboysteamsbyorgid[o.OrgId].boysteams.push(o);  
                  });        
      return Object.keys(groupboysteamsbyorgid).map(function (key) {return groupboysteamsbyorgid[key]});
  }
}
