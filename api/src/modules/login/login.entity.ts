import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'User unique ID',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'timestamp',
    default: '2024-01-01 12:00:00',
  })
  created_at: Date;
}
