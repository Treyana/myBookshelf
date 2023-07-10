import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { BooksModule } from './books/books.module';
import config from 'ormconfig';


@Module({
  imports: [TypeOrmModule.forRoot(config), AuthorModule, CategoryModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
