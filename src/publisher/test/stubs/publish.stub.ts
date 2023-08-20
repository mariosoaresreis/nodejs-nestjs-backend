import { Publisher } from '../../schema/publisher.schema';

export const publishStub = (): Publisher => {
  return {
    _id: '1',
    name: 'name',
    siret: 1,
    phone: '+5511999999999',
  };
};
