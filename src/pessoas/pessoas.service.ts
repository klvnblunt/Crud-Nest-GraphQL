import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaInput } from './dto/create-pessoa.input';
import { UpdatePessoaInput } from './dto/update-pessoa.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {

  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>
  ){}

  async create(createPessoaInput: CreatePessoaInput) {
    try {
      const pessoaData = {
        email: createPessoaInput.email,
        passwordHash: createPessoaInput.password,
        name: createPessoaInput.name,
      }

      const pessoa = this.pessoaRepository.create(pessoaData);
      const pessoaSalva = await this.pessoaRepository.save(pessoa);
      return pessoaSalva
    } catch (error) {
      if(error.code === '23505'){
        throw new ConflictException('E-mail já cadastrado')
      }
      throw error;
    }

  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      relations: {
        recadosEnviados: true,
        recadosRecebidos: true,
      }
    });
    return pessoas
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
      relations: {
        recadosEnviados: true,
        recadosRecebidos: true,
      }
    })
    if (!pessoa){
      throw new NotFoundException('Pessoa não encontrada')
    }

    return pessoa
  }

  async update(id: number, updatePessoaInput: UpdatePessoaInput) {
    const dadosPessoas = {
      name: updatePessoaInput?.name,
      passwordHash: updatePessoaInput?.password
    }

    const pessoa = await this.pessoaRepository.preload({
      id,
      ... dadosPessoas
    })

    if (pessoa) return this.pessoaRepository.save(pessoa);

     throw new NotFoundException('Pessoa não encontrada.')
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      }
    })
    if (pessoa) return this.pessoaRepository.remove(pessoa);

    throw new NotFoundException('Pessoa não encontrada.')
  }
}
