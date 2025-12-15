import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user_task' })
export class EntityUserTask {
  @PrimaryColumn('uuid')
  user_id: string;

  @PrimaryColumn('uuid')
  task_id: string;

  @Column('timestamptz', { default: () => 'now()' })
  created_at: Date;
}
