import { Books } from 'src/books/books.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'category'})
//@Unique(['categoryName'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @DeleteDateColumn({ nullable: false})
  deletedAt: Date;
 
  @OneToMany(() => Books, (books) => books.category)
  books: Books[];

}
