import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../models/tasks';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private taskService: TasksService, private dialogService: DialogService, private router: Router, private toastController: ToastController) { }

  taskList: Tasks[] = [];
  newTask: Tasks = new Tasks(); 

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  createTask() {
    this.newTask.completed = false;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.getTasks(); 
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
      //console.log(task);
      let taskMessage = task.completed ? 'moved to Complete tasks' : 'moved to Incomplete tasks';
      this.taskToast(`${task.title} ${taskMessage}`);
    })
  }

  deleteTask(taskId?: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.taskToast('Task Sucessfully Deleted!');
      this.getTasks();
    })
  }

  async taskToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }
}
