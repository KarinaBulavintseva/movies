import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 24) {
      return value.substr(0, 24) + '...';
    }
    return value;
  }
}
