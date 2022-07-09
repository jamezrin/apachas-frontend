import { ApiGroup } from '../types/api/ApiGroup';
import { Group } from '../types/Group';
import { ApiGroupExpense } from '../types/api/ApiGroupExpense';
import { GroupExpense } from '../types/GroupExpense';
import { ApiGroupMember } from '../types/api/ApiGroupMember';
import { GroupMember } from '../types/GroupMember';

const mapApiGroupExpense = ({
  ...apiGroupExpenseRest
}: ApiGroupExpense): GroupExpense => ({
  ...apiGroupExpenseRest,
  createdAtDate: new Date(apiGroupExpenseRest.createdAt),
  expenseAtDate: new Date(apiGroupExpenseRest.expenseAt),
});

const mapApiGroupMember = ({
  expenses: apiGroupExpenses,
  ...apiGroupMemberRest
}: ApiGroupMember): GroupMember => ({
  ...apiGroupMemberRest,
  expenses: apiGroupExpenses.map(mapApiGroupExpense),
  createdAtDate: new Date(apiGroupMemberRest.createdAt),
});

const mapApiGroup = ({
  friends: apiGroupFriends,
  ...apiGroupRest
}: ApiGroup): Group => ({
  ...apiGroupRest,
  friends: apiGroupFriends.map(mapApiGroupMember),
  createdAtDate: new Date(apiGroupRest.createdAt),
});

export default {
  mapApiGroup,
  mapApiGroupMember,
  mapApiGroupExpense,
};
