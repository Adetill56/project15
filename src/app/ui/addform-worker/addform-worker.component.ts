import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css']
})
export class AddformWorkerComponent implements OnInit {

  myWorkerType = MyWorkerType;
  workerForm: FormGroup;
  defaultWorkerType = this.myWorkerType.programmer;

  mask = ['\+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @Output() addWorker = new EventEmitter<MyWorker>();

  constructor() { }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      surname: new FormControl(null, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      type: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  onAddWorker() {
    let worker: MyWorker = {
      name: this.workerForm.value.name,
      surname: this.workerForm.value.surname,
      type: this.workerForm.value.type,
      phone: this.workerForm.value.phone,
    }
    if (worker.name !== '' && worker.surname !== '') {
      worker.workerForm = new FormGroup({
        name: new FormControl(worker.name, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
        surname: new FormControl(worker.surname, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
        type: new FormControl(worker.type, [Validators.required]),
        phone: new FormControl(worker.phone, [Validators.required])
      });
      worker.workerForm.disable();
      this.workerForm.controls.name.reset();
      this.workerForm.controls.surname.reset();
      this.workerForm.controls.phone.reset();
      this.defaultWorkerType = this.myWorkerType.programmer;
      this.addWorker.emit(worker);
    } else {
      alert("Введите имя или фамилию работника!");
    }
  }

}