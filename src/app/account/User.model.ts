import { TodoList } from '../core/models/TodoList.model';

export interface User {
    _id: string;
    user_name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    listID: TodoList[];
}