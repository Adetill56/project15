import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();

  myWorkerType = MyWorkerType;
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onEditWorker(worker: MyWorker) {
    worker.editMod = true;
  }

  onSaveWorker(worker: MyWorker) {
    if (worker.name !== '' && worker.surname !== '') {
      worker.editMod = false;
      alert("Измененный работник " + worker.name + " " + worker.surname);
    } else {
      alert("Введите имя или фамилию работника!");
    }
  }
}

