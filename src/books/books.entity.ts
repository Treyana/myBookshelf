import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({name : 'books'})
//@Unique(['title'])
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  value: number;

  @Column({ type: 'date', nullable: true })
  buy_date: string;

  @CreateDateColumn({ nullable: false })
  created_at: Date;

  @DeleteDateColumn({ nullable: false })
  deleted_at: Date;

  //type=>EntityName is a func that returns the class of the entity with which we want to make relationship
  //author => author.id states which column is to be used by Author entity to get the associated user
  @ManyToOne((type) => Author, (author) => author.books)
  author: Author;

  @ManyToOne((type) => Category, (category) => category.books)
  category: Category;
}
