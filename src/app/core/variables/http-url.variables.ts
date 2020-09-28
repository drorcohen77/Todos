
export class HttpVariables {
    // public readonly _domain: string = 'http://localhost:3001';
    public readonly createTodoList: string = '/api/todoLists/create';
    public readonly fetchTodoLists: string = '/api/todoLists/fetch';
    public readonly modifyTodoList: string = '/api/todoLists/modify/';
    public readonly deleteTodoList: string = '/api/todoLists/delete/';

    public readonly createTodoItem: string = '/api/todoItems/create';
    public readonly fetchTodoItems: string = '/api/todoItems/fetch';
    public readonly modifyTodoItem: string = '/api/todoItems/modify/';
    public readonly deleteTodoItem: string = '/api/todoItems/delete/';

    public readonly checkAllItems: string = '/api/todoItems/check_all/'
};