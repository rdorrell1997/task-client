import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../models/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl: string = "http://localhost:5043/task";

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.baseUrl);
  }

  createTask(newTask: Tasks) {
    return this.http.post(this.baseUrl, newTask);
  }

  updateTask(updatedTask: Tasks, taskId?: string) {
    return this.http.put(this.baseUrl + '/' + taskId, updatedTask);
  }

  deleteTask(taskId?: string) {
    return this.http.delete(this.baseUrl + '/' + taskId);
  }
}
