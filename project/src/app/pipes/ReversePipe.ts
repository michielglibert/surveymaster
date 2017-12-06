import {Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'reverse'
})

//Pipe for reversing a list
export class ReversePipe implements PipeTransform {
  transform (values) {
    if (values) {
      return values.reverse();
    }
  }
}