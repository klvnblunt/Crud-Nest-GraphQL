import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePessoaInput {
  @Field()
  @IsEmail()
  email: string;

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
  name: string
}
