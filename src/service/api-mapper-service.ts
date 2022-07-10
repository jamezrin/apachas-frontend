import { ApiGroup } from '../types/api/ApiGroup';
import { ApiMember } from '../types/api/ApiMember';
import { ApiExpense } from '../types/api/ApiExpense';
import { Group } from '../types/Group';
import { Member } from '../types/Member';
import { Expense } from '../types/Expense';

const mapApiExpense = ({ ...apiGroupExpenseRest }: ApiExpense): Expense => ({
  ...apiGroupExpenseRest,
  createdAtDate: new Date(apiGroupExpenseRest.createdAt),
  expenseAtDate: new Date(apiGroupExpenseRest.expenseAt),
});

const mapApiMember = ({
  expenses: apiExpenses,
  ...apiGroupMemberRest
}: ApiMember): Member => {
  return {
    ...apiGroupMemberRest,
    expenses: apiExpenses.map(mapApiExpense),
    createdAtDate: new Date(apiGroupMemberRest.createdAt),
  };
};

const mapApiGroup = ({
  friends: apiFriends,
  ...apiGroupRest
}: ApiGroup): Group => ({
  ...apiGroupRest,
  friends: apiFriends.map(mapApiMember),
  createdAtDate: new Date(apiGroupRest.createdAt),
});

export default {
  mapApiGroup,
  mapApiMember,
  mapApiExpense,
};
