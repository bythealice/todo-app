import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(user: any, createTaskDto: CreateTaskDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    findAll(user: any): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }[]>;
    findOne(user: any, id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    update(user: any, id: string, updateTaskDto: UpdateTaskDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    toggleComplete(user: any, id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    partialUpdate(user: any, id: string, updateTaskDto: UpdateTaskDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    remove(user: any, id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
}
