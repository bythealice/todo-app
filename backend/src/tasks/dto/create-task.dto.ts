import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Write comprehensive API documentation using Swagger',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Task completion status',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Task priority level',
    enum: ['low', 'medium', 'high'],
    example: 'medium',
    default: 'low',
  })
  @IsOptional()
  @IsString()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional({
    description: 'Task status',
    enum: ['pending', 'in_progress', 'completed'],
    example: 'pending',
    default: 'pending',
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'in_progress', 'completed'])
  status?: string;
}

