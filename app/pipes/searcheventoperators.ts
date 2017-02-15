import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'searcheventoperators'})
export class SearchEventOperatorsPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
       return value.filter((item) => item.Name.toLowerCase().indexOf(args.toString().toLowerCase()) > -1);
  }
}
