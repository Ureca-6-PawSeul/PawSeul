import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/entity/food.entity';
import { Snack } from 'src/entity/snack.entity';
import { Supplement } from 'src/entity/supplement.entity';
import { SupplementInitService } from 'src/product/init/supplementInit.service';
import { FoodInitService } from 'src/product/init/foodInit.service';
import { Product } from 'src/entity/product.entity';
// import { SnackInitService } from 'src/product/init/snackInit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Snack, Supplement, Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    // SnackInitService,
    SupplementInitService,
    FoodInitService,
  ],
})
export class ProductModule {}
