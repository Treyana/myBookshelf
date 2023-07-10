import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';

export class BooksDTO {
  title: string;
  value: number;
  buy_date: string;
  author: Author;
  category: Category;
}
