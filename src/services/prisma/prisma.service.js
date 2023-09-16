const { PrismaClient } = require('@prisma/client');

class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

module.exports = new PrismaService();
