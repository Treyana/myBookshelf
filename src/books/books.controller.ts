import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDTO } from './dtos/books.dto';
import { Books } from './books.entity';

@Controller('book')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  //getOneBookByBookId
  @Get(':id')
  async getBookByBookId(@Param('id',ParseIntPipe) id: number, @Body() dto: BooksDTO) {
    const bookExist = await this.bookService.isBookExists(id);
    if (bookExist) {
      return await this.bookService.getOneBookById(id);
    } else {
      return `Book id ${id} does not exists!!!`;
    }
  }

  //getAllBooksByAuthorId
  @Get('searchByAuthor/:id')
  async getBooksByAuthor(@Param('id') authorId : number) {
    return await this.bookService.getAllBooksByAuthor(authorId);
  }

  //getAllBooksByCategoryId
  @Get('searchByCategory/:id')
  async getBooksByCategory(@Param('id') categoryId : number) {
    return await this.bookService.getAllBooksByCategory(categoryId);
  }


  //getAllBooks
  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  //CreateBooks
  @Post()
  async createBook(
    @Body()
    dto: BooksDTO /*, @Body() authorId : number, @Body() categoryId: number*/,
  ) {
    // return await this.bookService.createBook(dto, authorId, categoryId);
    // console.log(JSON.stringify(dto))
    return await this.bookService.createBook(dto);
  }

  //UpdateBooks
  @Patch(':id')
  async updateBook(@Param('id',ParseIntPipe) id: number, @Body() dto: BooksDTO) {
    const bookExists = await this.bookService.isBookExists(id);
    if (bookExists) {
      return await this.bookService.updateBook(id, dto);
    } else {
      return `Book id ${id} does not exist!!!`;
    }
  }

  //DeleteBooks
  @Delete(':id')
  async deleteBook(@Param('id',ParseIntPipe) id: number) {
    return await this.bookService.softDeleteBook(id);
  }
}
