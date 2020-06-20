import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterworkers'
})
export class FilterworkersPipe implements PipeTransform {

  transform(workers: any[], searchStr: string): any[] {
    if (searchStr === '') {
      return workers;
    } else {
      let array = searchStr.trim().split(' ');
      if (array.length === 1) {
        return workers.filter((worker) => {
          return worker.name.toLowerCase().includes(array[0].toLowerCase()) || worker.surname.toLowerCase().includes(array[0].toLowerCase());
        });
      } else {
        return workers.filter((worker) => {
          return (worker.name.toLowerCase().includes(array[0].toLowerCase()) && worker.surname.toLowerCase().includes(array[1].toLowerCase())) ||
            (worker.surname.toLowerCase().includes(array[0].toLowerCase()) && worker.name.toLowerCase().includes(array[1].toLowerCase()));
        });
      }

    }
  }

}


