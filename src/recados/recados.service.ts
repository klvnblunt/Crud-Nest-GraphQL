import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecadoInput } from './dto/create-recado.input';
import { UpdateRecadoInput } from './dto/update-recado.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class RecadosService {

  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,

    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ){}

  async create(createRecadoInput: CreateRecadoInput){
    const de = await this.pessoaRepository.findOneBy({ id: createRecadoInput.deId });
    const para = await this.pessoaRepository.findOneBy({ id: createRecadoInput.paraId });

    if (!de || !para){
      throw new NotFoundException('Pessoa não encontrada');
    }

    const recado = await this.recadoRepository.create({
      texto: createRecadoInput.texto,
      de,
      para,
    });

    return await this.recadoRepository.save(recado);
    
  }

  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: {
        de: true,
        para: true,
      }
    });
    return recados
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where:{ id },
      relations:{
        de: true,
        para: true
      },
    })
    if (!recado){
      throw new NotFoundException('Recado não encontrado.')
    }

    return recado
  }

  async update(id: number, updateRecadoInput: UpdateRecadoInput) {
     const partialUpdateRecadoDto ={
            lido: updateRecadoInput?.lido,
            texto: updateRecadoInput?.texto
        }
        const recado = await this.recadoRepository.preload({
            id,
            ... partialUpdateRecadoDto
        })

        if (recado) return this.recadoRepository.save(recado);

        throw new NotFoundException('Problema para criar um recado.')

  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      }
    })

    if (recado) return this.recadoRepository.remove(recado);

    throw new HttpException("Recado não encontrado", HttpStatus.NOT_FOUND)
  }
}
