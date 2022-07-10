import { describe, expect, it } from 'vitest';
import { ApiGroup } from '../types/api/ApiGroup';
import { ApiMember } from '../types/api/ApiMember';
import { ApiExpense } from '../types/api/ApiExpense';
import mapperService from '../service/api-mapper-service';

describe('api mapper service', () => {
  it('maps a group expense correctly', async () => {
    const apiExpense: ApiExpense = {
      id: 1337,
      createdAt: '2022-01-12T23:23:00',
      expenseAt: '2022-01-06T00:23:00',
      amount: 101.0,
      description: 'example expense',
    };

    const mappedGroup = mapperService.mapApiExpense(apiExpense);

    expect(mappedGroup.id).eq(apiExpense.id);
    expect(mappedGroup.amount).eq(apiExpense.amount);
    expect(mappedGroup.description).eq(apiExpense.description);
    expect(mappedGroup.createdAt).eq(apiExpense.createdAt);
    expect(mappedGroup.createdAtDate.getTime()).eq(
      new Date(apiExpense.createdAt).getTime(),
    );
    expect(mappedGroup.expenseAt).eq(apiExpense.expenseAt);
    expect(mappedGroup.expenseAtDate.getTime()).eq(
      new Date(apiExpense.expenseAt).getTime(),
    );
  });

  it('maps a group member correctly', async () => {
    const apiMember: ApiMember = {
      id: 1337,
      createdAt: '2022-01-12T23:23:00',
      name: 'some person',
      expenses: [
        {
          id: 1337,
          createdAt: '2022-01-12T23:23:00',
          expenseAt: '2022-01-06T00:23:00',
          amount: 101.0,
          description: 'example expense',
        },
      ],
    };

    const mappedMember = mapperService.mapApiMember(apiMember);

    expect(mappedMember.id).eq(apiMember.id);
    expect(mappedMember.name).eq(apiMember.name);
    expect(mappedMember.createdAt).eq(apiMember.createdAt);
    expect(mappedMember.createdAtDate.getTime()).eq(
      new Date(apiMember.createdAt).getTime(),
    );
    expect(mappedMember.expenses.length).eq(apiMember.expenses.length);
  });

  it('maps a group correctly', async () => {
    const apiGroup: ApiGroup = {
      id: 1337,
      name: 'some-group-name',
      createdAt: '2022-01-12T23:23:00',
      friends: [
        {
          id: 1337,
          createdAt: '2022-01-12T23:23:00',
          name: 'some person',
          expenses: [
            {
              id: 1337,
              createdAt: '2022-01-12T23:23:00',
              expenseAt: '2022-01-06T00:23:00',
              amount: 101.0,
              description: 'example expense',
            },
          ],
        },
      ],
    };

    const mappedGroup = mapperService.mapApiGroup(apiGroup);

    expect(mappedGroup.id).eq(apiGroup.id);
    expect(mappedGroup.name).eq(apiGroup.name);
    expect(mappedGroup.createdAt).eq(apiGroup.createdAt);
    expect(mappedGroup.createdAtDate.getTime()).eq(
      new Date(apiGroup.createdAt).getTime(),
    );
    expect(mappedGroup.friends.length).eq(apiGroup.friends.length);
  });
});
