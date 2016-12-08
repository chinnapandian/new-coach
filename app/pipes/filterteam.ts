

import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'filterteam'})
export class FilterTeamPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
       return value.filter((item) => item.Team1Name.toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}
