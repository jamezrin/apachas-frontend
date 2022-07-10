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
  // first calculate the amount the entire group has spent
  const totalExpenses = getExpenseTotal(groupFlatExpenses);

  // this is what ideally what each member should have spent at the end
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

  // it is needed to have the positive balances at the start of the list (most overpay) and for the negative
  // balances we insert at the end as they are negative values, and we want the lowest values first (most debt)
  memberBalances
    .map((balance): MemberBalance => ({ ...balance })) // IMPORTANT: clone the balance objects!!!
    .sort((a, b) => b.balance - a.balance)
    .forEach((memberBalance) => {
      if (memberBalance.balance > 0) {
        // first the ones with the most overpay
        positiveBalances.push(memberBalance);
      } else if (memberBalance.balance < 0) {
        // first the ones with the most debt
        negativeBalances.unshift(memberBalance);
      }
    });

  const paymentSuggestions: PaymentSuggestion[] = [];

  for (const negativeBalance of negativeBalances) {
    for (const positiveBalance of positiveBalances) {
      const paymentAmount = Math.min(
        positiveBalance.balance,
        Math.abs(negativeBalance.balance),
      );

      // there is the possibility of the current positive balance that is being iterated already at 0,
      // in that case, we just ignore this positive balance and go onto the next one
      // next iterations will do the same, we could call positiveBalances.shift() to remove it from the head,
      // but maybe it is more costly than iterating it and checking if the balance is empty
      if (!paymentAmount) {
        continue;
      }

      positiveBalance.balance -= paymentAmount;
      negativeBalance.balance += paymentAmount;

      paymentSuggestions.push({
        amount: paymentAmount,
        from: negativeBalance.member,
        to: positiveBalance.member,
      });

      // if the current negative balance is already at 0, just stop trying to calculate suggestions for it
      if (!negativeBalance.balance) {
        break;
      }
    }
  }

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
