import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyWorker } from '../worker.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkerService {
  routeApi = 'http://localhost:3000/worker';

  constructor(private http: HttpClient) {

  }

  getWorkers(): Promise<any> {
    return this.http.get(this.routeApi).toPromise();
  }

  postWorker(data: MyWorker) {
    return this.http.post(this.routeApi, data).toPromise();
  }

  putWorker(worker: MyWorker) {
    let data = { id: worker.id, name: worker.name, surname: worker.surname, type: worker.type, phone: worker.phone };
    this.http.put(`${this.routeApi}/${data.id}`, data).subscribe();
  }

  deleteWorker(id: number): Promise<any> {
    return this.delete(id).toPromise();
  }

  private delete(id: number): Observable<any> {
    return this.http.delete(`${this.routeApi}/${id}`);
  }
}
