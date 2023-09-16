import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Koob Social Midia Api')
  .setDescription(
    'Koob Social Media API for user creation, authentication, and post creation',
  )
  .setVersion('1.0')
  .addTag('account')
  .addTag('login')
  .addTag('posts')
  .addBearerAuth()
  .build();
