import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsPositive()
  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  preco: number;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Categoria })
  categoria: Categoria;
}
