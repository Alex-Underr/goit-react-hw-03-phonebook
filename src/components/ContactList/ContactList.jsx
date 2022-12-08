import PropTypes from 'prop-types';
import styles from './contactList.module.css';
export default function ContactList({ contacts, onClick }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.list} key={id} id={id}>
          <p>
            {name} : {number}
          </p>
          <button className={styles.btn} onClick={() => onClick(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
