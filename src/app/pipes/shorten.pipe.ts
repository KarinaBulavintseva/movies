import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 23) {
      return value.substr(0,23) + '...';
    }
    return value;
  }
}
