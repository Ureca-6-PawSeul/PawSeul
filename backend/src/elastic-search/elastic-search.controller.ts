import { Controller, Get, Query } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';

@Controller('product')
export class ElasticSearchController {
  constructor(private readonly elasticSearchService: ElasticSearchService) {}

  @Get('/search')
  async search(@Query('query') title: string) {
    return this.elasticSearchService.search('products', title);
  }

  @Get('/product/es')
  async indexing() {
    await this.elasticSearchService.indexAllProduct();

    return { message: '인덱싱함' };
  }
}
