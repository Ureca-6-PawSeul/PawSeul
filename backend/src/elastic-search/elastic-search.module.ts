import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';
import { ElasticSearchController } from './elastic-search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      tls: {
        rejectUnauthorized: false, // 로컬 개발환경에서 SSL 무시
      },
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ElasticSearchController],
  providers: [ElasticSearchService],
})
export class ElasticSearchModule {}
