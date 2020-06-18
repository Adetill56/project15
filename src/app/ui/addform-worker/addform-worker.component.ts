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
    let phone = '' + this.workerForm.controls.phone.value;
    console.log(phone.length);
    console.log(phone);
    if (phone.replace(/\D/g, '').length == 11) {
      this.addWorker.emit(this.workerForm.value);
    } else
      alert('Проверьте правильность введенных данных');
    this.defaultWorkerType = this.myWorkerType.programmer;
    this.workerForm.controls.name.reset();
    this.workerForm.controls.surname.reset();
    this.workerForm.controls.phone.reset();

  }

}