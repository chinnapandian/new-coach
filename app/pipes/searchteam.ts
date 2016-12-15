import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'searchteam'})
export class SearchTeamsPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
      console.log(args);
       return value.filter((item) => (item.TeamName.toLowerCase()).indexOf(args.toString().toLowerCase()) != -1);
  }
}
