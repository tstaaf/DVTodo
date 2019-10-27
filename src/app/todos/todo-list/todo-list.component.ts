import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/todo.model';
import { TodoService } from 'src/app/shared/todo.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(public service : TodoService) { }
  faTrash = faTrash;
  ngOnInit() {
    this.service.refreshList();
  }
  todoDone(todos : Todo){
    this.service.putTodo(todos).subscribe(res =>{
      this.service.refreshList();
      console.log(todos);
    })
    console.log(todos.done)
  }
  
  onDeleteClick(id : number){
    this.service.deleteTodo(id).subscribe(res =>{
      this.service.refreshList();
      console.log("Deleted");
    });
  }

}
