import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoService: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoService.find({
      relations: { categoria: true },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoService.findOne({
      where: { id },
      relations: { categoria: true },
    });

    if (!produto) {
      throw new NotFoundException('Tá em falta');
    }

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoService.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    return this.produtoService.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    await this.categoriaService.findById(produto.categoria.id);
    return this.produtoService.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.produtoService.delete(id);
  }
}
