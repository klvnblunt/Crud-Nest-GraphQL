import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';



@ObjectType()
@Entity()
export class Recado {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  texto: string;

  @Column({default: false})
  @Field()
  lido?: boolean;

  @CreateDateColumn()
  @Field()
  creatAt?: Date;

  @UpdateDateColumn()
  @Field()
  updateAt: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.recadosEnviados)
  @JoinColumn({ name: 'de'})
  @Field(() => Pessoa)
  de: Pessoa;

  @ManyToOne(() => Pessoa, pessoa => pessoa.recadosEnviados)
  @JoinColumn({ name: 'para'})
  @Field(() => Pessoa)
  para: Pessoa;


}
