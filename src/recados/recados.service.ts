import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecadoInput } from './dto/create-recado.input';
import { UpdateRecadoInput } from './dto/update-recado.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {

  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>
  ){}

  async create(createRecadoInput: CreateRecadoInput){
    const recado = await this.recadoRepository.create(createRecadoInput);
    const recadoSaved = await this.recadoRepository.save(recado)

    if(!recadoSaved){
      throw new InternalServerErrorException('Problema para criar um recado.')
    }

    return recadoSaved;
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where:{
        id,
      }
    })
    if (!recado){
      throw new NotFoundException('Problema para criar um recado.')
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
