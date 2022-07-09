import './CreateGroupSection.css';
import { PropsWithChildren } from 'react';

type AppInputWithActionsProps = PropsWithChildren<{}>;

const AppInputWithActions = ({ children }: AppInputWithActionsProps) => {
  return <div></div>;
};

type AppButtonWithIconProps = PropsWithChildren<{}>;

function AppButtonWithIcon({ children }: AppButtonWithIconProps) {
  return <div></div>;
}

export function CreateGroupSection() {
  return (
    <section className="CreateGroupSection">
      <div className="CreateGroupSection__wrapper">
        <div className="CreateGroupSection__heading">
          <h1 className="CreateGroupSection__title">¡A pachas!</h1>
          <img
            src="/assets/undraw_coffee_with_friends_3cbj.svg"
            alt="Some friends drinking coffee"
            className="CreateGroupSection__image"
          />
          <h2 className="CreateGroupSection__subtitle">
            Olvídate de calcular los gastos de tu grupo de amigos.
            <br />
            ¡Esta aplicación lo hace por ti!
          </h2>
        </div>
        <div className="CreateGroupSection__actions">
          <h3 className="CreateGroupSection__actions__cta">
            Introduce el código del grupo. Si no tienes uno, genera uno nuevo
          </h3>
          <AppInputWithActions>
            <AppButtonWithIcon></AppButtonWithIcon>
            <AppButtonWithIcon></AppButtonWithIcon>
          </AppInputWithActions>
        </div>
      </div>
    </section>
  );
}
