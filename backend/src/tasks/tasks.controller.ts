import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@CurrentUser() user: any, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.id, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@CurrentUser() user: any) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Task found' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tasksService.findOne(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task completely' })
  @ApiParam({ name: 'id', description: 'Task ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, user.id, updateTaskDto);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Toggle task completion status' })
  @ApiParam({ name: 'id', description: 'Task ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Task completion toggled' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  toggleComplete(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tasksService.toggleComplete(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task partially' })
  @ApiParam({ name: 'id', description: 'Task ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  partialUpdate(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, user.id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tasksService.remove(id, user.id);
  }
}

