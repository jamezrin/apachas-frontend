import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import './PaymentSuggestionsPage.css';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppCustomInput from '../../components/AppCustomInput/AppCustomInput';
import AppCustomButton from '../../components/AppCustomButton/AppCustomButton';
import addSvg from '../../assets/add-svgrepo-com.svg';
import backSvg from '../../assets/back-svgrepo-com.svg';
import customTransferArrowSvg from '../../assets/custom-transfer-arrow.svg';
import { InsideGroupPageParams } from '../InsideGroupPage/InsideGroupPage';
import AppCustomSelect, {
  AppSelectOption,
} from '../../components/AppCustomSelect/AppCustomSelect';
import apiRequestService from '../../service/api-request-service';
import { CreateMemberBody } from '../../types/api_send/CreateMemberBody';
import handleInputValue from '../../utils/handleInputValue';
import calculationService from '../../service/calculation-service';

export function PaymentSuggestionsPage() {
  const { groupName } = useParams<InsideGroupPageParams>();
  const { currentGroup, loadGroup, reloadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  if (!currentGroup) {
    loadGroup(groupName!!)
      .then((_) => {})
      .catch((err) => navigate('/'));
    return null;
  }

  const flatExpenses = calculationService.getGroupFlatExpenses(currentGroup);
  const memberBalances = calculationService.getGroupMembersBalance(
    currentGroup,
    flatExpenses,
  );
  const paymentSuggestions =
    calculationService.getPaymentSuggestions(memberBalances);

  const handleGoBackClick = () => navigate(`/${groupName}`);

  return (
    <div className="PaymentSuggestionsPage">
      <div className="PaymentSuggestionsPage__container">
        <div className="PaymentSuggestionsPage__content">
          <section className="PaymentSuggestionsPage__register-expense-container">
            <div className="PaymentSuggestionsPage__section-heading">
              <h1 className="PaymentSuggestionsPage__section-title">
                Sugerencias de pago
              </h1>
            </div>
            <div className="PaymentSuggestionsPage__section-body">
              {paymentSuggestions.map((thing, idx) => (
                <div
                  className="PaymentSuggestionsPage__payment-suggestion"
                  key={idx}
                >
                  <div
                    className={`PaymentSuggestionsPage__payment-suggestion__part PaymentSuggestionsPage__payment-suggestion__part--from`}
                  >
                    {thing.from.name}
                  </div>
                  <div className="PaymentSuggestionsPage__payment-suggestion__transfer">
                    <img src={customTransferArrowSvg} alt="" />
                    <div className="PaymentSuggestionsPage__payment-suggestion__amount">
                      {thing.amount.toLocaleString('es-ES', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'eur',
                      })}
                    </div>
                  </div>

                  <div className="PaymentSuggestionsPage__payment-suggestion__part PaymentSuggestionsPage__payment-suggestion__part--to">
                    {thing.to.name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="PaymentSuggestionsPage__actions">
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
        </div>
      </div>
    </div>
  );
}

export default PaymentSuggestionsPage;
