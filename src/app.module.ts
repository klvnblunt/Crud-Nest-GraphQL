import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';


@Module({
  imports: [ 
    RecadosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'Jonas',
      password: '123456',
      database: 'api_graphql',
      autoLoadEntities: true,
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      //playground: false,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),  
    }),

    PessoasModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
