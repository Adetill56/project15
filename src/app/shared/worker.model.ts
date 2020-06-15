import { FormGroup } from '@angular/forms';

export interface MyWorker {
    name: string;
    surname: string;
    type: number;
    id?: number;
    phone: string;
    workerForm?: FormGroup;
}

export enum MyWorkerType {
    programmer,
    designer,
    copywriter,
    manager
}

export let MyWorkerDatabase: MyWorker[] = [
    { id: 1, name: 'Иван', surname: 'Иванов', type: 0, phone: '9114263723' },
    { id: 2, name: 'Алексей', surname: 'Петров', type: 1, phone: '9114323713' },
    { id: 3, name: 'Андрей', surname: 'Синяков', type: 2, phone: '9134263713' },
    { id: 4, name: 'Игорь', surname: 'Цветков', type: 3, phone: '9114453787' }
];