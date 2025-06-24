import PropTypes from 'prop-types';

const AccountList = ({ accounts }) => (
  <>
    {accounts.map((account) => (
      <section className="account" key={account.id}>
        <div className="account-content-wrapper">
          <h3 className="account-title">{account.title}</h3>
          <p className="account-amount">{account.amount}</p>
          <p className="account-amount-description">{account.description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    ))}
  </>
);

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AccountList;