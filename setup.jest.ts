import { PrismaService } from 'src/database/prisma.service';
const prismaService = new PrismaService();

afterEach(async () => {
  await prismaService.account.deleteMany();
  await prismaService.post.deleteMany();
});
