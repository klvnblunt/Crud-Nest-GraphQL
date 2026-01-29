import { Module } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { RecadosResolver } from './recados.resolver';
import { Recado } from './entities/recado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recado, Pessoa])],
  providers: [RecadosResolver, RecadosService],
})
export class RecadosModule {}
