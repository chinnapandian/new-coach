import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupfollowedteamsbyorgid'})
export class GroupFollowedTeamsByOrgPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groupfollowedteamsbyorgid = {};
        value.forEach(function(o) {
                    groupfollowedteamsbyorgid[o.OrgId] = groupfollowedteamsbyorgid[o.OrgId] ? groupfollowedteamsbyorgid[o.OrgId] : 
                                                                          { OrgName : o.OrgName,
                                                                            CoachFirstName: o.CoachFirstName,
                                                                            CoachLastName : o.CoachLastName,
                                                                            Gender : o.Gender,
                                                                            Grade : o.Grade,
                                                                            OrgId : o.OrgId,
                                                                            TeamId : o.TeamId,
                                                                            TeamName : o.TeamName,
                                                                            FollowedTeams: [] };
                    groupfollowedteamsbyorgid[o.OrgId].FollowedTeams.push(o);  
                  });        
      return Object.keys(groupfollowedteamsbyorgid).map(function (key) {return groupfollowedteamsbyorgid[key]});
  }
}
