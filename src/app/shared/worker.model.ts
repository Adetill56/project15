export interface MyWorker {
    name: string;
    surname: string;
    type: number;
    id?: number;
    editMod: boolean;
}

export enum MyWorkerType {
    programmer,
    designer,
    copywriter,
    manager
}

export let MyWorkerDatabase: MyWorker[] = [
    { id: 1, name: 'Иван', surname: 'Иванов', type: 0, editMod: false },
    { id: 2, name: 'Алексей', surname: 'Петров', type: 1, editMod: false },
    { id: 3, name: 'Андрей', surname: 'Синяков', type: 2, editMod: false },
    { id: 4, name: 'Игорь', surname: 'Цветков', type: 3, editMod: false }
];