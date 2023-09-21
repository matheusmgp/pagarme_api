const { PrismaClientInitializationError, PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const PrismaService = require('../../services/prisma/prisma.service');
const { DatabaseUnknowError, DatabaseError } = require('../../errors/database-error');

const _prismaService = PrismaService;
class TransactionRepository {
  async create(payload) {
    try {
      return await _prismaService.transaction.create({
        data: payload,
      });
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAll() {
    try {
      return await _prismaService.transaction.findMany({
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

module.exports = new TransactionRepository();
