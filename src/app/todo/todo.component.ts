import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todo',
  imports: [TodoItemComponent, FormsModule,FilterTodosPipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    //console.log(this.todoService.todoItems)
    //this.todoItems.set(this.todoService.todoItems);
    this.todoService.getTodosFromApi()
      .pipe(catchError((err) => {
        console.log(err);
        throw err;
      })).subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }
  updateToggleItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if (todo.id == todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })

    })
  }
}
