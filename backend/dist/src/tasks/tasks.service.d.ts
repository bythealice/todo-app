import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createTaskDto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
    toggleComplete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        completed: boolean;
        priority: string;
        status: string;
        userId: string;
    }>;
}
