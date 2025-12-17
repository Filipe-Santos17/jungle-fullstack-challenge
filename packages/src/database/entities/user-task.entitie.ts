import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user_task' })
export class EntityUserTask {
  @ApiProperty()
  @PrimaryColumn('uuid')
  user_id: string;

  @ApiProperty()
  @PrimaryColumn('uuid')
  task_id: string;

  @ApiProperty()
  @Column('timestamptz', { default: () => 'now()' })
  created_at: Date;
}
