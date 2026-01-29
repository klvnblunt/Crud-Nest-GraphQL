import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


@InputType()
export class CreateRecadoInput {


  @Field(() => Int, { nullable: true })
  deId: number;

  @Field(() => Int, { nullable: true })
  paraId: number;

  
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string
}
