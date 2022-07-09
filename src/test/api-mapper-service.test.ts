import { describe, expect, it } from 'vitest';
import { ApiGroupExpense } from '../types/api/ApiGroupExpense';
import mapperService from '../service/api-mapper-service';
import { ApiGroupMember } from '../types/api/ApiGroupMember';
import { ApiGroup } from '../types/api/ApiGroup';

describe('api mapper service', () => {
  it('maps a group expense correctly', async () => {
    const apiGroupExpense: ApiGroupExpense = {
      id: 1337,
      createdAt: '2022-01-12T23:23:00',
      expenseAt: '2022-01-06T00:23:00',
      amount: 101.0,
      description: 'example expense',
    };

    const mappedGroup = mapperService.mapApiGroupExpense(apiGroupExpense);

    expect(mappedGroup.id).eq(apiGroupExpense.id);
    expect(mappedGroup.amount).eq(apiGroupExpense.amount);
    expect(mappedGroup.description).eq(apiGroupExpense.description);
    expect(mappedGroup.createdAt).eq(apiGroupExpense.createdAt);
    expect(mappedGroup.createdAtDate.getTime()).eq(
      new Date(apiGroupExpense.createdAt).getTime(),
    );
    expect(mappedGroup.expenseAt).eq(apiGroupExpense.expenseAt);
    expect(mappedGroup.expenseAtDate.getTime()).eq(
      new Date(apiGroupExpense.expenseAt).getTime(),
    );
  });

  it('maps a group member correctly', async () => {
    const apiGroupMember: ApiGroupMember = {
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

    const mappedMember = mapperService.mapApiGroupMember(apiGroupMember);

    expect(mappedMember.id).eq(apiGroupMember.id);
    expect(mappedMember.name).eq(apiGroupMember.name);
    expect(mappedMember.createdAt).eq(apiGroupMember.createdAt);
    expect(mappedMember.createdAtDate.getTime()).eq(
      new Date(apiGroupMember.createdAt).getTime(),
    );
    expect(mappedMember.expenses.length).eq(apiGroupMember.expenses.length);
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
