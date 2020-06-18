import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = new EventEmitter<number>();
  @Output() saveWorker = new EventEmitter<MyWorker>();

  myWorkerType = MyWorkerType;

  workerForm: FormGroup;
  mask = ['\+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit(): void {

  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onEditWorker(worker: MyWorker) {
    worker.workerForm.enable();
  }

  onSaveWorker(worker: MyWorker) {
    worker.name = worker.workerForm.controls.name.value;
    worker.surname = worker.workerForm.controls.surname.value;
    worker.type = worker.workerForm.controls.type.value;
    worker.phone = worker.workerForm.controls.phone.value;
    worker.phone = '+' + worker.phone.replace(/\D/g, '');
    if (worker.phone.length == 12) {
      this.saveWorker.emit(worker);
      worker.workerForm.disable();
    } else
      alert('Проверьте правильность введенных данных');
  }
}