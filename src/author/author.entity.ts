import { Books } from 'src/books/books.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({name : 'author'})
//@Unique(['author_name'])
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_name: string;

  // @CreateDateColumn({nullable: true})
  //   createdAt: Date;

  @DeleteDateColumn({ nullable: false})
  deletedAt: Date;

  @OneToMany(()=> Books, (books) => books.author)
  books: Books[];



}
