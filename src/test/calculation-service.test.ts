import { describe, expect, it } from 'vitest';

import { ApiGroup } from '../types/api/ApiGroup';
import { Group } from '../types/Group';
import calculationService from '../service/calculation-service';
import mapperService from '../service/api-mapper-service';

describe('calculation service', () => {
  it('sorts group expenses correctly', async () => {
    const apiGroup: ApiGroup = {
      id: 7,
      name: 'fast-instruction-JLT8j',
      friends: [
        {
          id: 17,
          name: 'Francisco Buyo',
          expenses: [
            {
              id: 18,
              amount: 100.0,
              description: 'Cena',
              expenseAt: '2022-01-12T23:23:00',
              createdAt: '2022-07-09T18:47:18.5179335',
            },
          ],
          createdAt: '2022-07-09T18:47:18.5134345',
        },
        {
          id: 18,
          name: 'Alfonso Pérez',
          expenses: [
            {
              id: 19,
              amount: 100.0,
              description: 'Taxi',
              expenseAt: '2022-10-29T10:23:00',
              createdAt: '2022-07-09T18:47:18.5244343',
            },
            {
              id: 20,
              amount: 53.4,
              description: 'Compra',
              expenseAt: '2022-06-23T14:56:00',
              createdAt: '2022-07-09T18:47:18.5254337',
            },
          ],
          createdAt: '2022-07-09T18:47:18.5229455',
        },
        {
          id: 19,
          name: 'Raúl González',
          expenses: [],
          createdAt: '2022-07-09T18:47:18.5264345',
        },
        {
          id: 20,
          name: 'José María Gutiérrez',
          expenses: [],
          createdAt: '2022-07-09T18:47:18.527435',
        },
      ],
      createdAt: '2022-07-09T18:47:18.4934334',
    };

    const mappedGroup = mapperService.mapApiGroup(apiGroup);

    const flatExpenses = calculationService.getFlatSortedExpenses(mappedGroup);
    expect(flatExpenses.length).eq(3);
    expect(flatExpenses[0].id).eq(19);
    expect(flatExpenses[1].id).eq(20);
    expect(flatExpenses[2].id).eq(18);
  });
});
