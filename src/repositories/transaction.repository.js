const PrismaService = require('../services/prisma/prisma.service');

const _prismaService = PrismaService;
class TransactionRepository {
  async create(payload) {
    return _prismaService.transaction.create({
      data: payload,
    });
  }
  async getAll() {
    return await _prismaService.transaction.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}

module.exports = TransactionRepository;
