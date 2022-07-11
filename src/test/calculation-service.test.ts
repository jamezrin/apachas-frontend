import { describe, expect, it } from 'vitest';

import { ApiGroup } from '../types/api_receive/ApiGroup';
import calculationService from '../service/calculation-service';
import mapperService from '../service/api-mapper-service';

const sampleApiGroup: ApiGroup = {
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
          amount: 10.0,
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

describe('calculation service', () => {
  it('sorts group expenses correctly', async () => {
    const mappedGroup = mapperService.mapApiGroup(sampleApiGroup);

    const unsortedFlatExpenses =
      calculationService.getGroupFlatExpenses(mappedGroup);

    const flatExpenses =
      calculationService.getSortedFlatExpenses(unsortedFlatExpenses);

    expect(flatExpenses.length).eq(3);
    expect(flatExpenses[0].id).eq(19);
    expect(flatExpenses[1].id).eq(20);
    expect(flatExpenses[2].id).eq(18);
  });

  it('calculates members balance correctly', async () => {
    const mappedGroup = mapperService.mapApiGroup(sampleApiGroup);

    const unsortedFlatExpenses =
      calculationService.getGroupFlatExpenses(mappedGroup);

    const membersBalances = calculationService.getGroupMembersBalance(
      mappedGroup,
      unsortedFlatExpenses,
    );

    expect(membersBalances[0].member.id).eq(17);
    expect(membersBalances[1].member.id).eq(18);
    expect(membersBalances[2].member.id).eq(19);
    expect(membersBalances[3].member.id).eq(20);

    expect(membersBalances[0].balance).closeTo(59.15, 2);
    expect(membersBalances[1].balance).closeTo(22.55, 2);
    expect(membersBalances[2].balance).closeTo(-40.85, 2);
    expect(membersBalances[3].balance).closeTo(-40.85, 2);
  });

  it('calculates payment suggestions correctly', async () => {
    const mappedGroup = mapperService.mapApiGroup(sampleApiGroup);

    const unsortedFlatExpenses =
      calculationService.getGroupFlatExpenses(mappedGroup);

    const membersBalances = calculationService.getGroupMembersBalance(
      mappedGroup,
      unsortedFlatExpenses,
    );

    const paymentSuggestions =
      calculationService.getPaymentSuggestions(membersBalances);

    console.log(
      paymentSuggestions.map((suggestion) => ({
        amount: suggestion.amount,
        from: suggestion.from.name,
        to: suggestion.to.name,
      })),
    );

    expect(paymentSuggestions.length).eq(3);

    expect(paymentSuggestions[0].from.id).eq(20);
    expect(paymentSuggestions[0].to.id).eq(17);
    expect(paymentSuggestions[0].amount).closeTo(40.85, 2);

    expect(paymentSuggestions[1].from.id).eq(19);
    expect(paymentSuggestions[1].to.id).eq(17);
    expect(paymentSuggestions[1].amount).closeTo(18.3, 2);

    expect(paymentSuggestions[2].from.id).eq(19);
    expect(paymentSuggestions[2].to.id).eq(18);
    expect(paymentSuggestions[2].amount).closeTo(22.55, 2);
  });
});
