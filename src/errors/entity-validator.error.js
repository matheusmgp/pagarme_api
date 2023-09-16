class EntityValidationError extends Error {
  constructor(error) {
    super('Entity Validation Errpr');
    this.name = 'EntityValidationError';
  }
}
module.exports = EntityValidationError;
