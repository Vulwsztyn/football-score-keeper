import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Unique('test_table_name_key', ['name'])
@Entity({ name: 'test_table' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  name!: string
}
