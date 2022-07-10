import { Group } from '../types/Group';
import { Expense } from '../types/Expense';
import { FlatMemberExpense } from '../types/derived/FlatMemberExpense';
import { MemberBalance } from '../types/derived/MemberBalance';
import { Member } from '../types/Member';
import { PaymentSuggestion } from '../types/derived/PaymentSuggestion';

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

function getPaymentSuggestions(
  memberBalances: MemberBalance[],
): PaymentSuggestion[] {
  const positiveBalances: MemberBalance[] = [],
    negativeBalances: MemberBalance[] = [];

  memberBalances
    .map((balance): MemberBalance => ({ ...balance })) // clone the balance objects
    .sort((a, b) => b.balance - a.balance)
    .forEach((memberBalance) => {
      if (memberBalance.balance > 0) {
        positiveBalances.push(memberBalance);
      } else if (memberBalance.balance < 0) {
        negativeBalances.unshift(memberBalance);
      }
    });

  const paymentSuggestions: PaymentSuggestion[] = [];
  negativeBalances.forEach((negativeBalance) => {});

  return paymentSuggestions;
}

export default {
  getGroupFlatExpenses,
  getMemberFlatExpenses,
  getSortedFlatExpenses,
  getExpenseTotal,
  getGroupMembersBalance,
  getPaymentSuggestions,
};
