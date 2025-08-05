import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@Controller('/produtos')
@ApiTags('Produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Post()
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
