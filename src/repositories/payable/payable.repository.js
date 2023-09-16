const PrismaService = require('../../services/prisma/prisma.service');

const _prismaService = PrismaService;
class PayableRepository {
  async create(payload) {
    return _prismaService.payable.create({
      data: payload,
    });
  }
  async getAll() {
    return await _prismaService.payable.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}

module.exports = new PayableRepository();
