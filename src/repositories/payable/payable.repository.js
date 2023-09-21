const { PrismaClientInitializationError, PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const { DatabaseError, DatabaseUnknowError } = require('../../errors/database-error');
const PrismaService = require('../../services/prisma/prisma.service');

const _prismaService = PrismaService;
class PayableRepository {
  async create(payload) {
    try {
      return await _prismaService.payable.create({
        data: payload,
      });
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAll(availability) {
    try {
      return await _prismaService.payable.findMany({
        where: {
          availability,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAllInfo() {
    try {
      return await _prismaService.payable.findMany({
        orderBy: {
          id: 'desc',
        },
      });
    } catch (err) {
      this.handleError(err);
    }
  }
  handleError(err) {
    if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
      throw new DatabaseError(`Can't reach database server.`, 'database closed');
    }
    throw new DatabaseUnknowError(`Houve um problema`, err.message);
  }
}

module.exports = new PayableRepository();
