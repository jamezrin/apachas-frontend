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

function calculateRelativeTimeDiffAmount(diff: number): string {
  const seconds = Math.floor(Math.abs(diff) / 1000);
  const minutes = seconds && Math.floor(seconds / 60);
  const hours = minutes && Math.floor(minutes / 60);
  const days = hours && Math.floor(hours / 24);

  if (hours >= 24) return `${days} dia${days === 1 ? '' : 's'}`;
  if (minutes >= 60) return `${hours} hora${hours === 1 ? '' : 's'}`;
  if (seconds >= 60) return `${minutes} minuto${minutes === 1 ? '' : 's'}`;
  return `${seconds} segundo${seconds === 1 ? '' : 's'}`;
}

function calculateRelativeTimeDiff(from: Date, to: Date): string {
  const diff = from.getTime() - to.getTime();
  const diffText = calculateRelativeTimeDiffAmount(diff);
  return `${diff >= 0 ? 'hace' : 'en'} ${diffText}`;
}

const dateTimeFormat = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function getExpenseDateText(expense: Expense): string {
  const expenseDate = expense.expenseAtDate;
  const expenseAtDateText = dateTimeFormat.format(expenseDate);
  const relativeTimeDiff = calculateRelativeTimeDiff(new Date(), expenseDate);

  return `${expenseAtDateText} (${relativeTimeDiff})`;
}

export default {
  getGroupFlatExpenses,
  getMemberFlatExpenses,
  calculateRelativeTimeDiff,
  getSortedFlatExpenses,
  getExpenseDateText,
  getExpenseTotal,
  getGroupMembersBalance,
  getPaymentSuggestions,
};
