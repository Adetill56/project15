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

  myWorkerType = MyWorkerType;

  workerForm: FormGroup;
  mask = ['\+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit(): void {
    for (let worker of this.workers) {
      console.log(worker);
      worker.workerForm = new FormGroup({
        name: new FormControl({ value: worker.name, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
        surname: new FormControl({ value: worker.surname, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
        type: new FormControl({ value: worker.type, disabled: true }, [Validators.required,]),
        phone: new FormControl({ value: worker.phone, disabled: true }, [Validators.required,])
      });
    }
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
    worker.phone = worker.phone.replace(/\D/g, '');
    if (worker.phone.length == 11) {
      worker.workerForm.disable();
    } else
      alert('Проверьте правильность введенных данных');

  }
}