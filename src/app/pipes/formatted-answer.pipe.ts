import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedAnswer'
})
export class FormattedAnswerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	if(typeof value === 'object') {
  		return value.join(', ');
  	} else {
  		return value;
  	}    
  }
}
