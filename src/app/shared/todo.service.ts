import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  formData : Todo;
  list : Todo[];
  readonly url = "https://5db42af1a394f5001443afd0.mockapi.io/api/Todo/"

  constructor(private http : HttpClient) { }

  postTodo(formData: Todo){
    formData.created = new Date().toISOString();
    return this.http.post(this.url+'Todo',formData);
  }

  get sortList(){
    return this.list.sort((a, b) => {return <any>new Date(b.created) - <any>new Date(a.created);
    });
  }

  refreshList(){
    this.http.get(this.url +'Todo').toPromise().then(res => this.list = res as Todo[]);
  }
  putTodo(formData: Todo){
    // formData.created = new Date().toISOString();
    if(formData.done == false){
      formData.done = true
    }else{
      formData.done = false
    }
    return this.http.put(this.url+'Todo/' + formData.key,formData);
  }
  deleteTodo(id : number){
    return this.http.delete(this.url + 'Todo/'+ id)
  }

}
