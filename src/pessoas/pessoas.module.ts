import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasResolver } from './pessoas.resolver';
import { Pessoa } from './entities/pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  providers: [PessoasResolver, PessoasService],
})
export class PessoasModule {}
