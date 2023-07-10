import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { DataSource, EntityManager, Repository, UpdateResult } from 'typeorm';
import { BooksDTO } from './dtos/books.dto';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class BooksService {
  //While Repository handles single entity, EntityManager is common to all entities
  //and able to do operations on all entities.
  constructor(
    @InjectRepository(Books) private booksRepo: Repository<Books>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectDataSource() private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {}

  //   async createBooks(dto: BooksDTO): Promise<Books> {
  //     const author = new Author({
  //       ...dto,
  //       author,
  //     });
  //     const book = new Books({
  //       ...dto,
  //       author,
  //       category,
  //     });
  //     return await this.entityManager.save(book);
  //   }

  async isBookExists(id: number): Promise<boolean> {
    const book = await this.booksRepo.findOne({ where: { id: id } });
    return !!book;
  }

  //getAllBooks
  getAllBooks(): Promise<Books[]> {
    return this.booksRepo.find({ relations: ['author', 'category'] });
  }

  //GetOneBookByBookId
  async getOneBookById(id: number): Promise<Books> {
    try {
      const book = await this.booksRepo.findOne({
        where: { id },
        relations: ['author', 'category'],
      });
      return book;
    } catch (error) {
      throw new HttpException(
        'Book with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //getAllBooksByAuthorId
  async getAllBooksByAuthor(authorId: number) {
    const booklist = this.booksRepo.createQueryBuilder("book");
    booklist.select('book.title')
    //   .from(Books, 'books')
      .where('book.authorId = :id', {id:authorId});
     // console.log(booklist.getSql());
      return booklist.getMany();
      
    // const bookList = await this.booksRepo.createQueryBuilder("book")
    //   .leftJoinAndSelect("book.author","author")
    //   .where("book.authorId = : id",{id: authorId})
    //   // .printSql()
    //   .getMany();
    //   return bookList;
  }

  //getAllBooksByCategoryId
  async getAllBooksByCategory(categoryId : number){
    const bookList = await this.booksRepo.createQueryBuilder("book")
      .select("book.title")
      .where("book.categoryId = :id",{id : categoryId})
      .getMany();

      return bookList;

  }

  //CreateBooks
  async createBook(dto: BooksDTO): Promise<Books> {
    const newBook = this.booksRepo.create(dto);
    // dto.authorId = 1;
    // dto.categoryId = 2;
    return await this.booksRepo.save(newBook);
  }

  //UpdateBooks
  async updateBook(id: number, dto: BooksDTO): Promise<Books> {
    const book = await this.booksRepo.findOne({
      where: { id: id },
      relations: ['author', 'category'],
    });
    Object.assign(book, dto);
    return this.booksRepo.save(book);
  }

  //DeleteBooks
  async softDeleteBook(id: number): Promise<UpdateResult> {
    return this.booksRepo.softDelete(id);
  }
}
