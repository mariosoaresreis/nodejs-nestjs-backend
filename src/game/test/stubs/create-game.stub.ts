import { Game } from '../../schema/game.schema';

export const createGameStub = (): Game => {
  return {
    _id: null,
    title: 'GAME TITLE',
    price: 1.0,
    publisher: {
      _id: 'string',
      name: 'name',
      siret: 1,
      phone: '+5511999999999',
    },
    tags: ['tag1', 'tag2'],
    releaseDate: new Date('2023-08-18'),
    discountApplied: false,
  };
};
