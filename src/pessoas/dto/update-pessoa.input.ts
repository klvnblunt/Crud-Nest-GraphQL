import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreatePessoaInput } from './create-pessoa.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePessoaInput {
  @Field()
  id: number;

  @Field()
  @IsEmail()
  email?: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password?: string
  
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  name?: string
}
