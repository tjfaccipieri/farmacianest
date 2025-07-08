import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaService: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.find({
      relations: { produto: true },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaService.findOne({
      where: { id },
      relations: { produto: true },
    });

    if (!categoria) {
      throw new HttpException('Não tem', HttpStatus.NOT_FOUND);
    }

    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaService.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { produto: true },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaService.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return await this.categoriaService.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoriaService.delete(id);
  }
}
