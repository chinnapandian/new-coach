import {Pipe, PipeTransform} from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({name:'searchmessages'})
export class SearchMessagesPipe implements PipeTransform {
   items: any;
  transform(value: any[], args): any[] {
      console.log(args);
       return value.filter((item) => ((item.MessageBoard.Subject.toLowerCase()).indexOf(args.toString().toLowerCase()) != -1||
       (item.MessageBoard.Message.toLowerCase()).indexOf(args.toString().toLowerCase()) != -1));
  }
}
