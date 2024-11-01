import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElasticSearchService {
  constructor(
    private readonly elasticSearchService: ElasticsearchService,
    @InjectRepository(Product)
    private productRespository: Repository<Product>,
  ) {}

  async indexProduct(
    indexName: string,
    product: { title: string; productId: string },
  ) {
    await this.elasticSearchService.index({
      index: indexName,
      body: {
        productId: product.productId,
        title: product.title,
      },
    });
  }

  async createIndex(indexName: string) {
    const indexExists = await this.elasticSearchService.indices.exists({
      index: indexName,
    });
    if (!indexExists) {
      await this.elasticSearchService.indices.create({ index: indexName });
    }
  }
  async deleteIndex(indexName: string) {
    const indexExists = await this.elasticSearchService.indices.exists({
      index: indexName,
    });
    if (indexExists) {
      await this.elasticSearchService.indices.delete({ index: indexName });
    }
  }
  async indexAllProduct() {
    await this.deleteIndex('articles');
    await this.createIndex('articles');
    const products = await this.productRespository.find();
    const indexPromises = products.map((product) => {
      const placeToIndex = {
        productId: product.productId,
        title: product.title,
      };
      return this.indexProduct('products', placeToIndex);
    });
    return Promise.all(indexPromises);
  }
  async search(index: string, query: any) {
    const response = await this.elasticSearchService.search({
      index,
      body: query,
    });
    const result = response.hits.hits.map((hit) => ({
      id: hit._id,
      ...(typeof hit._source === 'object' ? hit._source : {}),
    }));
    return result;
  }
}
