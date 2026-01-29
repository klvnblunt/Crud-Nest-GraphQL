import { CreateRecadoInput } from './create-recado.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRecadoInput extends PartialType(CreateRecadoInput) {
  
  @Field(() => Boolean, { nullable: true })
  lido?: boolean;

  @Field()
  id: number;


}
