const PrismaService = require('../../services/prisma/prisma.service');

const _prismaService = PrismaService;
class PayableRepository {
  async create(payload) {
    return await _prismaService.payable.create({
      data: payload,
    });
  }
  async getAll(availability) {
    return await _prismaService.payable.findMany({
      where: {
        availability,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  async getAllInfo() {
    return await _prismaService.payable.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}

module.exports = new PayableRepository();
