import { ApiGroup } from '../types/api_receive/ApiGroup';
import { ApiMember } from '../types/api_receive/ApiMember';
import { ApiExpense } from '../types/api_receive/ApiExpense';
import { Group } from '../types/Group';
import { Member } from '../types/Member';
import { Expense } from '../types/Expense';

const mapApiExpense = ({ ...apiExpenseRest }: ApiExpense): Expense => ({
  ...apiExpenseRest,
  createdAtDate: new Date(apiExpenseRest.createdAt),
  expenseAtDate: new Date(apiExpenseRest.expenseAt),
});

const mapApiMember = ({
  expenses: apiExpenses,
  ...apiMemberRest
}: ApiMember): Member => {
  return {
    ...apiMemberRest,
    expenses: apiExpenses.map(mapApiExpense),
    createdAtDate: new Date(apiMemberRest.createdAt),
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
