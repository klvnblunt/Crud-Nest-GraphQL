import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaInput } from './dto/create-pessoa.input';
import { UpdatePessoaInput } from './dto/update-pessoa.input';

@Resolver(() => Pessoa)
export class PessoasResolver {
  constructor(private readonly pessoasService: PessoasService) {}

  @Mutation(() => Pessoa)
  async createPessoa(@Args('createPessoaInput') createPessoaInput: CreatePessoaInput) {
    const pessoa = await this.pessoasService.create(createPessoaInput)
    return pessoa
  }

  @Query(() => [Pessoa], { name: 'pessoas' })
  findAll() {
    return this.pessoasService.findAll();
  }

  @Query(() => Pessoa, { name: 'pessoa' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pessoasService.findOne(id);
  }

  @Mutation(() => Pessoa)
  updatePessoa(@Args('updatePessoaInput') updatePessoaInput: UpdatePessoaInput) {
    return this.pessoasService.update(updatePessoaInput.id, updatePessoaInput);
  }

  @Mutation(() => Pessoa)
  removePessoa(@Args('id', { type: () => Int }) id: number) {
    return this.pessoasService.remove(id);
  }
}
