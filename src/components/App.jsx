import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './form.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const localContact = JSON.parse(localStorage.getItem('contact'));
    if (localContact) {
      this.setState({ contacts: localContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const toLower = filter.toLowerCase();
    return contacts.filter(i => i.name.toLowerCase().includes(toLower));
  };

  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== itemId),
    }));
  };

  filterNow = data => {
    this.setState({ filter: data.currentTarget.value });
  };

  addContact = ({ name, number, id }) => {
    this.state.contacts.some(e => e.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [{ name, number, id }, ...prevState.contacts],
        }));
  };

  render() {
    return (
      <div className={styles.form}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterNow} />
        <ContactList
          contacts={this.filteredContacts()}
          onClick={this.deleteItem}
        />
      </div>
    );
  }
}
