import {Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Pipe({name: 'translate'})
export class TranslatePipeMock implements PipeTransform {
  transform(value: any): any {
    return value;
  }

  get(value: any): any {
    return new BehaviorSubject<any>('mock-' + value);
  }
}
