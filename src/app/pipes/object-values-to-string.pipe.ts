import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuesToString',
})
export class ObjectValuesToStringPipe implements PipeTransform {
  transform(value: any[], valueName: string) {
    return value.map((item) => item[valueName]).join(', ');
  }
}
