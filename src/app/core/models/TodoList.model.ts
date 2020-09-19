import { TodoItem } from './TodoItem.model'

export interface TodoList {
    _id: string;
    caption: string;
    description: string;
    image_url: string;
    color: string;
    itemID: TodoItem[];
}