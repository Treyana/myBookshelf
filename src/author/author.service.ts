import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AuthorDTO } from './dtos/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

  getAll(): Promise<Author[]> {
    return this.authorRepo.find(/*{relations:['book']}*/); //SELECT * from Author;
  }

  async isAuthorExists(id: number): Promise<boolean> {
    const author = await this.authorRepo.findOne({ where: { id: id } });
    return !!author; // Return true if author exists, false otherwise
  }
  

  async getOneById(id: number): Promise<Author> {
    try {
      const author = await this.authorRepo.findOne({ where: { id: id } });//SELECT * from Author WHERE id=id;
      return author;
    } catch (error) {
      //handle error
      console.log('Get one category by id error:', error.message ?? error);
      throw new HttpException(
        'Category with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    //return await this.authorRepo.findOneBy(id);
  }

  createAuthor(dto: AuthorDTO){
    const newAuthor = this.authorRepo.create(dto); //const newAuthor = new Author(); newUser.name =name;
    return this.authorRepo.save(newAuthor); //Insert
  }

  async updateAuthor(id: number, dto:AuthorDTO): Promise<Author> {
    const author = await this.authorRepo.findOne({where:{id:id}});
    Object.assign(author,dto);//assign the updated data
    return this.authorRepo.save(author); //Update
  }

  // async deleteAuthor(id: number): Promise<Author> {
  //   const author = await this.authorRepo.findOne({where:{id:id}});
  //   return this.authorRepo.softDelete(author);
  // }

  async softDeleteAuthor(id: number): Promise<UpdateResult> {
    return await this.authorRepo.softDelete(id);
  }

  // customQuery(): any {
  //   return this.authorRepo
  //     .createQueryBuilder('author')
  //     .where('author.id = :id', { id: 1 })
  //     .getOne();
  // }
}
