export class Tasks {

    id?: string;
    title?: string;
    completed?: boolean = false;

    constructor(id?: string, title?: string, completed?: boolean) 
    {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
