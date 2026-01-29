import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';



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

  //@UpdateDateColumn()
  //@Field()
  //updateAt: string;

  //@UpdateDateColumn()
  //@Field()
  //updateAt: string;

  
}
