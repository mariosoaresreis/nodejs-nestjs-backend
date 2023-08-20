import { Publisher } from '../../schema/publisher.schema';

export const createPublishStub = (): Publisher => {
  return {
    _id: null,
    name: 'name',
    siret: 1,
    phone: '+5511999999999',
  };
};
