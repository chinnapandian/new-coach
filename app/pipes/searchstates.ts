import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'searchstates'})
export class SearchStatesPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
       return value.filter((item) => item.StateName.toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}
