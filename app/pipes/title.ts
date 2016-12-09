import {Pipe, PipeTransform} from '@angular/core';

/*
 * Convert string to Title case
 *
 * Examples:
 * {{'johnathan' | title}}
 * formats to: 'Johnathan'
 *
 * {{'JAKE' | title}}
 * formats to: 'Jake'
 */
@Pipe({name:'title'})
export class TitlePipe implements PipeTransform {
  transform(value:string): string {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }
}
