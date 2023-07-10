import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDTO } from './dtos/create-author.dto';


@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAll() {
    return await this.authorService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Body() dto: AuthorDTO) {
    const authorExists = await this.authorService.isAuthorExists(id);
    if (authorExists) {
      return await this.authorService.getOneById(id);
    } else {
      return 'Author does not exist';
    }
  }

  @Post()
  async createAuthor(@Body() dto: AuthorDTO) {
    return await this.authorService.createAuthor(dto);
  }

  @Patch(':id')
  async updateAuthor(@Param('id') id: number, @Body() dto: AuthorDTO) {
    const authorExists = await this.authorService.isAuthorExists(id);
    if (authorExists) {
      return await this.authorService.updateAuthor(id, dto);
    } else {
      return `Author id ${id} does not exist!!!`;
    }
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: number) {
    return await this.authorService.softDeleteAuthor(id);
  }
}
