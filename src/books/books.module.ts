import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Books } from './books.entity';
import { Category } from 'src/category/category.entity';
import { Author } from 'src/author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books, Category, Author])],
  controllers:[BooksController],
  providers: [BooksService]
})
export class BooksModule {}
