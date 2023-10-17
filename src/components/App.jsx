import React, { Component } from 'react';
import { Container } from './App.styled';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({
      contacts: JSON.parse(localStorage.getItem('Contacts')) || [],
    });
  }

  componentDidUpdate(pProps, pState) {
    if (pState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, phone }) => {
    if (this.state.contacts.some(con => con.name === name)) {
      alert('Contact with this name already exist');
      return;
    }
    if (this.state.contacts.some(con => con.phone === phone)) {
      alert('Contact with this phone already exist');
      return;
    }
    this.setState(prev => {
      return {
        contacts: [
          ...prev.contacts,
          {
            name,
            phone,
            id: nanoid(),
          },
        ],
      };
    });
  };

  deleteContact = deleteId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  handleInput = e => {
    const newInput = e.target.value.trim().toLowerCase();
    this.setState({ filter: newInput });
  };

  getFilteredContacts = () => {
    if (!this.state.filter) {
      return this.state.contacts;
    }
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <AddContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        {this.state.contacts.length ? (
          <>
            <Filter onChange={this.handleInput} />
            <Contacts
              contacts={this.getFilteredContacts()}
              onDelete={this.deleteContact}
            />
          </>
        ) : (
          <p>No contacts yet</p>
        )}
      </Container>
    );
  }
}
