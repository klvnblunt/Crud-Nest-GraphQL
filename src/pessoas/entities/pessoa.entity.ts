import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Pessoa {
  
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({type: 'varchar', length: 255, unique:true})
    @IsEmail()
    @Field()
    email: string;

    @Column({type: 'varchar', length: 255})
    @Field()
    name: string;

    @Column({type: 'varchar', length: 255})
    @Field()
    passwordHash: string;

    @CreateDateColumn()
    @Field()
    createAt?: Date;

    @UpdateDateColumn()
    @Field()
    updateAt?: Date;

    @OneToMany(() => Recado, recado => recado.de)
    @Field(() => [Recado], { nullable: true })
    recadosEnviados: Recado[]

    @OneToMany(() => Recado, recado => recado.para)
    @Field(() => [Recado], { nullable: true })
    recadosRecebidos: Recado[]
}

