import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from './shared/worker.model';
import { HttpWorkerService } from './shared/services/http-worker.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Список сотрудников';
  workers: MyWorker[];
  myWorkerType = MyWorkerType;
  dataLoaded = false;

  constructor(private httpWorkerService: HttpWorkerService) {

  }

  ngOnInit() {
    this.getData().then(() => {
      this.dataLoaded = true;
    });
  }
  getByType(type: number) {
    return this.workers.filter(worker => worker.type === type);
  }

  async onDeleteWorker(id: number) {
    try {
      await this.httpWorkerService.deleteWorker(id);
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }

  async onAddWorker(worker: MyWorker) {
    let id = this.workers.length > 0
      ? this.workers[this.workers.length - 1].id + 1 : 1;
    worker.id = id;

    try {
      await this.httpWorkerService.postWorker(worker);
    } catch (err) {
      console.log(err);
    } finally {
      this.getData();
    }
  }

  async getData() {
    try {
      this.workers = await this.httpWorkerService.getWorkers();

    } catch (err) {
      console.log(err);
    }
    if (this.workers.length > 0) {
      for (let worker of this.workers) {
        worker.workerForm = new FormGroup({
          name: new FormControl({ value: worker.name, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          surname: new FormControl({ value: worker.surname, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          type: new FormControl({ value: worker.type, disabled: true }, [Validators.required,]),
          phone: new FormControl({ value: worker.phone, disabled: true }, [Validators.required,])
        });
      }
    }
  }

  async onSaveWorker(worker: MyWorker) {
    try {
      await this.httpWorkerService.putWorker(worker);
    } catch (err) {
      console.log(err);
    }
  }

}