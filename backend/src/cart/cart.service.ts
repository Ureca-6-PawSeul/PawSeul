import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CartProduct } from 'src/entity/cart.product.entity';
import { Product } from 'src/entity/product.entity';
import { AddProductToCartDto } from 'src/cart/dto/addProductToCart.dto';
import { GetCartsResponseDto } from './dto/getCartsResponse.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getCartsByUserId(userId: string): Promise<GetCartsResponseDto> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['cartProducts'],
    });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return {
      carts: user.cartProducts,
    };
  }

  async addProductToCart(
    userId: string,
    addProductDto: AddProductToCartDto,
  ): Promise<CartProduct> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
    });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    // 제품 조회
    const product = await this.entityManager.findOne(Product, {
      where: { productId: addProductDto.productId },
    });

    if (!product) {
      throw new NotFoundException('제품을 찾을 수 없습니다.');
    }

    // 장바구니에 제품 추가
    const cartProduct = this.entityManager.create(CartProduct, {
      user,
      product,
      quantity: addProductDto.quantity,
    });

    return await this.entityManager.save(cartProduct);
  }
}
