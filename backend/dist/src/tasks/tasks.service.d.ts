import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createTaskDto: CreateTaskDto): Promise<{
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
    findAll(userId: string): Promise<{
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
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
    toggleComplete(id: string, userId: string): Promise<{
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
