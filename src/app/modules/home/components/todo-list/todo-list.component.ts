import { TaskList } from './../../model/task-list';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {


  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');
  constructor() { }

  ngDoCheck(){
    this.setLocalStorege();
  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event,1);
  }

  public deleteAllTask(){
    const confirm= window.confirm("Você deseja realmente apagar todas as tasks?");
    confirm ? this.taskList= []: null;
    localStorage.setItem("list", JSON.stringify(this.taskList));
  }

  public setEmitTaskList(event:string){
    this.taskList.push({
      task:event,
      checked:false
    })
  }

  public validationInput(event:string, index: number){
    if(!event.length){
      const confirm = window.confirm("task esta vazia, deseja Deletar?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorege(){
    if(this.taskList.length){
      this.taskList.sort((first,last)=> Number(first.checked)- Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
