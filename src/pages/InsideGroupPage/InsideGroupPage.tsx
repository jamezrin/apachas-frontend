import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GroupContext } from '../../context/GroupContext';
import backSvg from '../../assets/back-svgrepo-com.svg';
import paymentSvg from '../../assets/payment-method-svgrepo-com.svg';
import userAddSvg from '../../assets/user-add-svgrepo-com.svg';
import voidSvg from '../../assets/undraw_void_-3-ggu.svg';
import emptyCartSvg from '../../assets/undraw_empty_cart_co35.svg';
import calculatorSvg from '../../assets/calculator-svgrepo-com.svg';
import './InsideGroupPage.css';
import calculationService from '../../service/calculation-service';
import AppCustomButton from '../../components/AppCustomButton/AppCustomButton';

const dateTimeFormat = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export type InsideGroupPageParams = {
  groupName: string;
};

export function InsideGroupPage() {
  const { groupName } = useParams<InsideGroupPageParams>();
  const { currentGroup, loadGroup, reloadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  if (!currentGroup) {
    if (loadGroup && groupName) {
      loadGroup(groupName)
        .then((_) => {})
        .catch((err) => navigate('/'));
    }

    return null;
  }

  const flatExpenses = calculationService.getGroupFlatExpenses(currentGroup);
  const sortedFlatExpenses =
    calculationService.getSortedFlatExpenses(flatExpenses);

  const membersBalance = calculationService.getGroupMembersBalance(
    currentGroup,
    flatExpenses,
  );

  const handleRegisterExpenseClick = () =>
    navigate(`/${groupName}/register-expense`);
  const handleCreateFriendClick = () => navigate(`/${groupName}/create-friend`);
  const handleExitGroupClick = () => navigate('/');
  const handlePaymentSuggestionsClick = () =>
    navigate(`/${groupName}/payment-suggestions`);

  return (
    <div className="InsideGroupPage">
      <div className="InsideGroupPage__container">
        <div className="InsideGroupPage__content">
          <section className="InsideGroupPage__expenses-container">
            <div className="InsideGroupPage__section-heading">
              <h1 className="InsideGroupPage__section-title">Gastos</h1>
              <AppCustomButton
                onClick={handleRegisterExpenseClick}
                disabled={!currentGroup?.friends.length}
              >
                <img
                  src={paymentSvg}
                  alt="Icon indicating the button to add an expense"
                  height="20px"
                  width="20px"
                />
                Registrar gasto
              </AppCustomButton>
            </div>
            <div className="InsideGroupPage__section-body">
              {!sortedFlatExpenses.length ? (
                <div className="InsideGroupPage__section--empty">
                  <img
                    src={emptyCartSvg}
                    alt="Icon indicating that there is no data"
                    height="100px"
                    width="100px"
                  />
                  ¡Todavía no has añadido un gasto!
                </div>
              ) : null}
              {sortedFlatExpenses.map((expense, idx) => (
                <div key={idx} className="InsideGroupPage__expense">
                  <span className="InsideGroupPage__expense__member-name">
                    {expense.member.name}
                  </span>
                  <span className="InsideGroupPage__expense__amount">
                    {expense.amount.toLocaleString('es-ES', {
                      maximumFractionDigits: 2,
                      style: 'currency',
                      currency: 'eur',
                    })}
                  </span>

                  <span className="InsideGroupPage__expense__description">
                    {expense.description}
                  </span>
                  <span className="InsideGroupPage__expense__date">
                    {dateTimeFormat.format(expense.expenseAtDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="InsideGroupPage__balance-container">
            <div className="InsideGroupPage__section-heading">
              <h1 className="InsideGroupPage__section-title">Balances</h1>
              <AppCustomButton onClick={handleCreateFriendClick}>
                <img
                  src={userAddSvg}
                  alt="Icon indicating the button to add an user"
                  height="20px"
                  width="20px"
                />
                Añadir amigo
              </AppCustomButton>
            </div>
            <div className="InsideGroupPage__section-body">
              {!membersBalance.length ? (
                <div className="InsideGroupPage__section--empty">
                  <img
                    src={voidSvg}
                    alt="Icon indicating that there is no data"
                    height="100px"
                    width="100px"
                  />
                  ¡Todavía no has registrado a ningún usuario!
                </div>
              ) : null}
              {membersBalance.map((memberBalance, idx) => (
                <div
                  key={idx}
                  className={`InsideGroupPage__member-balance InsideGroupPage__member-balance--${
                    memberBalance.balance >= 0 ? 'positive' : 'negative'
                  }`}
                >
                  <span>{memberBalance.member.name}</span>
                  <span>
                    {memberBalance.balance.toLocaleString('es-ES', {
                      maximumFractionDigits: 2,
                      style: 'currency',
                      currency: 'eur',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="InsideGroupPage__actions">
          <AppCustomButton
            onClick={handleExitGroupClick}
            className="AppCustomButton AppCustomButton--lg"
          >
            <img
              src={backSvg}
              alt="Icon indicating the button to exit out of this page"
              height="20px"
              width="20px"
            />
            Salir del grupo
          </AppCustomButton>
          <AppCustomButton
            onClick={handlePaymentSuggestionsClick}
            disabled={!currentGroup?.friends.length}
            className="AppCustomButton AppCustomButton--lg"
          >
            <img
              src={calculatorSvg}
              alt="Icon indicating the button to get payment recommendations"
              height="20px"
              width="20px"
            />
            Sugerencias de pago
          </AppCustomButton>
        </div>
      </div>
    </div>
  );
}

export default InsideGroupPage;
