import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 500, nullable: false })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  @ApiProperty()
  produto: Produto[];
}
