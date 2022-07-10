import { ApiGroup } from '../types/api_receive/ApiGroup';
import { ApiExpense } from '../types/api_receive/ApiExpense';
import { Group } from '../types/Group';
import { Expense } from '../types/Expense';
import { FlatMemberExpense } from '../types/derived/FlatMemberExpense';
import { MemberBalance } from '../types/derived/MemberBalance';
import { Member } from '../types/Member';

function getMemberFlatExpenses(member: Member): FlatMemberExpense[] {
  return member.expenses.map((expense) => ({
    ...expense,
    member,
  }));
}

function getGroupFlatExpenses(group: Group): FlatMemberExpense[] {
  return group.friends.flatMap((member) => getMemberFlatExpenses(member));
}

function getSortedFlatExpenses(
  flatMemberExpenses: FlatMemberExpense[],
): FlatMemberExpense[] {
  return flatMemberExpenses.sort((a, b) => {
    return b.expenseAtDate.getTime() - a.expenseAtDate.getTime();
  });
}

function getExpenseTotal(expenses: Expense[]): number {
  return expenses.reduce((acc, cur) => acc + cur.amount, 0);
}

function getGroupMembersBalance(
  group: Group,
  groupFlatExpenses: FlatMemberExpense[],
): MemberBalance[] {
  const totalExpenses = getExpenseTotal(groupFlatExpenses);
  const perMemberTarget = totalExpenses / group.friends.length;

  return group.friends.map((member) => ({
    balance: getExpenseTotal(member.expenses) - perMemberTarget,
    member,
  }));
}

export default {
  getGroupFlatExpenses,
  getMemberFlatExpenses,
  getSortedFlatExpenses,
  getExpenseTotal,
  getGroupMembersBalance,
};
