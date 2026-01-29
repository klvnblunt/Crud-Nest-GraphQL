import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { CreateRecadoInput } from './dto/create-recado.input';
import { UpdateRecadoInput } from './dto/update-recado.input';

@Resolver(() => Recado)
export class RecadosResolver {
  constructor(private readonly recadosService: RecadosService) {}

  @Mutation(() => Recado)
  createRecado(@Args('createRecadoInput') createRecadoInput: CreateRecadoInput) {
    return this.recadosService.create(createRecadoInput);
  }

  @Query(() => [Recado], { name: 'recados' })
  findAll() {
    return this.recadosService.findAll();
  }

  @Query(() => Recado, { name: 'recado' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recadosService.findOne(id);
  }

  @Mutation(() => Recado)
  updateRecado(@Args('updateRecadoInput', { type: () => UpdateRecadoInput }) updateRecadoInput: UpdateRecadoInput) {
    return this.recadosService.update(updateRecadoInput.id, updateRecadoInput);
  }

  @Mutation(() => Recado)
  removeRecado(@Args('id', { type: () => Int }) id: number) {
    return this.recadosService.remove(id);
  }
}
