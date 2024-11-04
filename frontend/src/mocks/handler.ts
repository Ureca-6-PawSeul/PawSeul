import { http, HttpResponse } from 'msw';
import food from '@/mocks/data/food.json';
import snack from '@/mocks/data/snack.json';
import supplement from '@/mocks/data/supplement.json';
import user_order from '@/mocks/data/user_order.json';
import user_reviews_done from '@/mocks/data/user_reviews_done.json';
import user_reviews_remain from '@/mocks/data/user_reviews_remain.json';
import product_names from '@/mocks/data/product_names.json';

export const handlers = [
  http.get('/api/product', () => {
    const data = [...food, ...snack, ...supplement];
    return HttpResponse.json(data);
  }),

  http.get('/api/product/top', () => {
    const data = [
      ...food.slice(30, 35),
      ...snack.slice(20, 25),
      ...supplement.slice(12, 15),
    ];
    return HttpResponse.json(data);
  }),

  http.get('/api/product/food', () => {
    return HttpResponse.json(food);
  }),

  http.get('/api/product/snack', () => {
    return HttpResponse.json(snack);
  }),

  http.get('/api/product/supplement', () => {
    return HttpResponse.json(supplement);
  }),

  http.get('/api/history/order/:userId', () => {
    return HttpResponse.json(user_order);
  }),

  http.get('/api/mypage/reviewDone', () => {
    return HttpResponse.json(user_reviews_done);
  }),

  http.get('/api/mypage/reviewRemain', () => {
    return HttpResponse.json(user_reviews_remain);
  }),

  http.get('/api/search', () => {
    return HttpResponse.json(product_names);
  }),
];
