import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
})
export class MinutesToHours implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    if (!hours) {
      return `${minutes}m`;
    }
    if (!minutes) {
      return `${hours}h`;
    }
    return hours + 'h ' + minutes + 'm';
  }
}
