import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import './RegisterExpensePage.css';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppCustomInput from '../../components/AppCustomInput/AppCustomInput';
import AppCustomButton from '../../components/AppCustomButton/AppCustomButton';
import addSvg from '../../assets/add-svgrepo-com.svg';
import backSvg from '../../assets/back-svgrepo-com.svg';
import { InsideGroupPageParams } from '../InsideGroupPage/InsideGroupPage';
import AppCustomSelect, {
  AppSelectOption,
} from '../../components/AppCustomSelect/AppCustomSelect';
import apiRequestService from '../../service/api-request-service';

export function RegisterExpensePage() {
  const { groupName } = useParams<InsideGroupPageParams>();
  const { currentGroup, loadGroup, reloadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseAtDate, setExpenseAtDate] = useState<string>('');
  const [expenseConcept, setExpenseConcept] = useState<string>('');

  const canAddExpense = !!(
    selectedMemberId &&
    expenseAmount &&
    expenseAtDate &&
    expenseConcept
  );

  const setDefaultState = () => {
    setSelectedMemberId((prev) => prev || currentGroup?.friends[0].id!!);
    setExpenseAmount(0);
    setExpenseAtDate('');
    setExpenseConcept('');
  };

  const createExpenseBody = {
    expenseAt: expenseAtDate,
    amount: expenseAmount,
    description: expenseConcept,
  };

  useEffect(() => setDefaultState(), [currentGroup]);

  const handleInputValue = (
    setter: Dispatch<SetStateAction<any>>,
  ): ChangeEventHandler<any> => {
    return (e) => setter(e.target.value);
  };

  if (!currentGroup) {
    loadGroup(groupName!!)
      .then((_) => {})
      .catch((err) => navigate('/'));
    return null;
  }

  const handleExpenseAddClick = async () => {
    await apiRequestService.registerExpense(
      groupName!!,
      selectedMemberId!!,
      createExpenseBody,
    );

    await reloadGroup();

    handleGoBackClick();
  };

  const handleGoBackClick = () => navigate(`/${groupName}`);

  return (
    <div className="RegisterPaymentPage">
      <div className="RegisterPaymentPage__container">
        <div className="RegisterPaymentPage__content">
          <section className="RegisterPaymentPage__register-expense-container">
            <div className="RegisterPaymentPage__section-heading">
              <h1 className="RegisterPaymentPage__section-title">
                Registrar gasto
              </h1>
            </div>
            <div className="RegisterPaymentPage__section-body">
              <div className="RegisterPaymentPage__field-wrapper">
                <p>Persona</p>
                <AppCustomSelect
                  value={selectedMemberId}
                  onChange={handleInputValue(setSelectedMemberId)}
                >
                  {currentGroup.friends.map((friend) => (
                    <AppSelectOption key={friend.id} value={friend.id}>
                      {friend.name}
                    </AppSelectOption>
                  ))}
                </AppCustomSelect>
              </div>

              <div className="RegisterPaymentPage__field-wrapper">
                <p>Importe</p>
                <AppCustomInput
                  type="number"
                  value={expenseAmount || ''}
                  onChange={handleInputValue(setExpenseAmount)}
                  step="any"
                />
              </div>

              <div className="RegisterPaymentPage__field-wrapper">
                <p>Fecha</p>
                <AppCustomInput
                  type="datetime-local"
                  value={expenseAtDate || ''}
                  onChange={handleInputValue(setExpenseAtDate)}
                />
              </div>

              <div className="RegisterPaymentPage__field-wrapper">
                <p>Concepto</p>
                <AppCustomInput
                  type="text"
                  value={expenseConcept || ''}
                  onChange={handleInputValue(setExpenseConcept)}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="RegisterPaymentPage__actions">
          <AppCustomButton
            onClick={handleGoBackClick}
            style={{
              fontSize: '18px',
              ...{
                '--app-button-height': '40px',
              },
            }}
          >
            <img
              src={backSvg}
              alt="Icon indicating the button to exit out of this page"
              height="20px"
              width="20px"
            />
            Volver atrás
          </AppCustomButton>

          <AppCustomButton
            onClick={handleExpenseAddClick}
            style={{
              fontSize: '18px',
              ...{
                '--app-button-height': '40px',
              },
            }}
            disabled={!canAddExpense}
          >
            <img
              src={addSvg}
              alt="Icon indicating the button to register the expense"
              height="20px"
              width="20px"
            />
            Añadir
          </AppCustomButton>
        </div>
      </div>
    </div>
  );
}

export default RegisterExpensePage;
