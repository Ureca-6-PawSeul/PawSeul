import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CartProduct } from 'src/entity/cart.product.entity';
import { Product } from 'src/entity/product.entity';
import { AddProductCartDto } from 'src/cart/dto/addProductCart.dto';
import { UpdateProductCartDto } from 'src/cart/dto/updateProductCart.dto';
import { GetCartsResponseDto } from 'src/cart/dto/getCartsResponse.dto';
import { PartialOrderItemDto } from 'src/order/dto/PartialOrderItem.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // 유저ID로 유저 조회
  private async findUserId(userId: string): Promise<User> {
    const user = await this.entityManager.findOne(User, {
      where: { userId },
      relations: ['cartProducts'],
    });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return user;
  }

  // 상품ID로 상품 조회
  private async findProductId(productId: string): Promise<Product> {
    const product = await this.entityManager.findOne(Product, {
      where: { productId },
    });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');
    return product;
  }

  // 유저ID로 장바구니 조회
  async getCartsUserId(userId: string): Promise<GetCartsResponseDto> {
    const user = await this.findUserId(userId);

    const carts = user.cartProducts.map((cartProduct) => {
      if (!cartProduct.product) {
        throw new NotFoundException(`장바구니에 상품이 없습니다.`);
      }

      const product = cartProduct.product;
      return {
        cartProductId: cartProduct.cartProductId,
        productId: product.productId,
        title: product.title,
        price: product.price,
        productImg: product.productImg,
        quantity: cartProduct.quantity,
      };
    });

    return { carts };
  }

  // 장바구니 상품 추가
  async addProductCart(
    userId: string,
    addProductDto: AddProductCartDto,
  ): Promise<CartProduct> {
    const user = await this.findUserId(userId);
    const product = await this.findProductId(addProductDto.productId);

    // 장바구니에 상품 추가
    const cartProduct = this.entityManager.create(CartProduct, {
      user,
      product,
      quantity: addProductDto.quantity,
    });

    return await this.entityManager.save(cartProduct);
  }

  // 장바구니 상품 수정
  async updateProductCart(
    userId: string,
    updateProductDto: UpdateProductCartDto,
  ): Promise<GetCartsResponseDto> {
    const cartProduct = await this.entityManager.findOne(CartProduct, {
      where: {
        user: { userId },
        product: { productId: updateProductDto.productId },
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('장바구니에 해당 상품이 없습니다.');
    }

    // 수량 업데이트
    cartProduct.quantity = updateProductDto.quantity;
    await this.entityManager.save(cartProduct);

    // 업데이트 후 장바구니 정보 반환
    return this.getCartsUserId(userId);
  }

  async deleteProductAfterOrder(
    userId: string,
    orderItems: PartialOrderItemDto[],
  ) {
    const user = await this.findUserId(userId);

    if (!user) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    orderItems.forEach(async (orderItem) => {
      const product = await this.findProductId(orderItem.productId);

      const cartProduct = await this.entityManager.findOne(CartProduct, {
        where: { user, product },
      });

      if (!cartProduct) {
        throw new NotFoundException('장바구니에 해당 상품이 없습니다.');
      }

      cartProduct.quantity -= orderItem.quantity;

      if (cartProduct.quantity <= 0) {
        await this.entityManager.remove(cartProduct);
      }

      await this.entityManager.save(cartProduct);
    });
  }

  // 장바구니 상품 삭제
  async deleteProductCart(
    userId: string,
    productId: string,
  ): Promise<GetCartsResponseDto> {
    const cartProduct = await this.entityManager.findOne(CartProduct, {
      where: { user: { userId }, product: { productId } },
    });

    if (!cartProduct) {
      throw new NotFoundException('장바구니에 해당 상품이 없습니다.');
    }

    await this.entityManager.remove(cartProduct);

    // 삭제 후 장바구니 정보 반환
    return this.getCartsUserId(userId);
  }
}
