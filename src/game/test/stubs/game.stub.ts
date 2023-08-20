import { Game } from '../../schema/game.schema';

export const gameStub = (): Game => {
  return {
    _id: '64dbca73a88591c5c5ab6990',
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
