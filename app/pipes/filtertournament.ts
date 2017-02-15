

import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'filtertournament'})
export class FilterTournamentsPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
       return value.filter((item) => item.SeasonId==parseInt(args));
  }
}
