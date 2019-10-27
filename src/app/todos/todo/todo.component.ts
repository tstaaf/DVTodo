import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public service : TodoService) { }
  
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      key : null,
      todo : '',
      done : false,
      created : null
    }
  }

  onSubmit(form : NgForm){
    if(form.value.key == null)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }
  insertRecord(form : NgForm){
    this.service.postTodo(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
      console.log("Insert");
    })
  }
  updateRecord(form : NgForm){
    this.service.putTodo(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
      console.log("Update");
  })
  }
}