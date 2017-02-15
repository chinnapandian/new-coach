import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'searchevents'})
export class SearchEventsPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
       return value.filter((item) => item.TournamentName.toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}
