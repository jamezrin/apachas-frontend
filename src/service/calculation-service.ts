import { ApiGroup } from '../types/api/ApiGroup';
import { ApiGroupExpense } from '../types/api/ApiGroupExpense';
import { Group } from '../types/Group';
import { GroupExpense } from '../types/GroupExpense';
import { FlatMemberExpense } from '../types/FlatMemberExpense';

function getFlatSortedExpenses(group: Group): FlatMemberExpense[] {
  return group.friends
    .flatMap((member) =>
      member.expenses.map((expense) => ({
        ...expense,
        member,
      })),
    )
    .sort((a, b) => {
      return b.expenseAtDate.getTime() - a.expenseAtDate.getTime();
    });
}

export default {
  getFlatSortedExpenses,
};
