import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../models/tasks';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private taskService: TasksService, private dialogService: DialogService, private router: Router) { }

  taskList: Tasks[] = [];
  newTask: Tasks = new Tasks(); 

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.taskList = tasks;
    })
  }

  createTask() {
    this.newTask.completed = false;
    this.taskService.createTask(this.newTask).subscribe(() => {
      window.location.reload(); 
    });
  }
  
  prompt() {
    this.dialogService.showPrompt('New Task', 'Enter Task Title: ').subscribe(response => {
      this.newTask.title = response;
      this.createTask();
    });
  }

  updateTask(task: Tasks) {
    task.completed = task.completed ? false : true; 
    this.taskService.updateTask(task, task.id).subscribe(() => {
      console.log(task);
    })
  }

  deleteTask(taskId?: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      window.location.reload();
    })
  }
}
