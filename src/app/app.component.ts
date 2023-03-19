import { Component } from '@angular/core';
import Sortable from 'sortablejs';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  tasks: Task[] = [];
  newTask: string = '';
  title: string = 'Lista de Tarefas';
  selectAll: boolean = false;
  tasksMaxLength: number = 10;
  sortable: any;
  
  ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }

    const list = document.getElementById('tasks-list');
    if (list) {
      this.sortable = Sortable.create(list, {
        handle: '.drag-handle',
        animation: 150,
        onEnd: (event: any) => {
          this.reorderTasks(event.oldIndex, event.newIndex);
        },
      });
    }
  }

  addTask() {
    if (this.newTask.trim() !== '' && this.tasks.length < this.tasksMaxLength) {
      const task: Task = {
        id: uuidv4(),
        description: this.newTask,
        completed: false
      };
      this.tasks.push(task);
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  removeSelectedTasks(){
    this.tasks = this.tasks.filter(task => !task.completed);
    this.selectAll = false;
    this.saveTasks();
  }

  selectAllTasks() {
    this.tasks.forEach(task => task.completed = this.selectAll);
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  reorderTasks(oldIndex: number, newIndex: number) {
    const taskToMove = this.tasks[oldIndex];
    this.tasks.splice(oldIndex, 1);
    this.tasks.splice(newIndex, 0, taskToMove);
    this.saveTasks();
  }
}
