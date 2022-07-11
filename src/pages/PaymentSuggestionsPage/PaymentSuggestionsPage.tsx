import { useContext } from 'react';

import './PaymentSuggestionsPage.css';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppCustomButton from '../../components/AppCustomButton/AppCustomButton';
import backSvg from '../../assets/back-svgrepo-com.svg';
import customTransferArrowSvg from '../../assets/custom-transfer-arrow.svg';
import { InsideGroupPageParams } from '../InsideGroupPage/InsideGroupPage';
import calculationService from '../../service/calculation-service';

export function PaymentSuggestionsPage() {
  const { groupName } = useParams<InsideGroupPageParams>();
  const { currentGroup, loadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  if (!currentGroup) {
    if (loadGroup && groupName) {
      loadGroup(groupName)
        .then(() => {})
        .catch(() => navigate('/'));
    }

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
            className="AppCustomButton AppCustomButton--lg"
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
