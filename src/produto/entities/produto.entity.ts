import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsPositive()
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
  foto: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
