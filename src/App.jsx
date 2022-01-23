import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }
  
  addContact = ({ name, number }) => {

    const addContact = {
      id: nanoid(),
      name,
      number,
    }

    const isUnique = this.state.contacts.some(contact => contact.name === name)

    if (isUnique) {
      alert(`${name} is already in contacts. `)
    } else {
      this.setState(prevState => ({
        contacts:[addContact, ...prevState.contacts]
      }))
    }
    console.log(this.state);
  }
  

  changeFilter = e => {
    this.setState({filter:e.target.value})
  }
  getVisibleContacts = () => {
    const{filter, contacts}=this.state
    const normalizedFilter = filter.toLowerCase()

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter))
    
  }
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts:prevState.contacts.filter(contact=>contact.id !== contactId)
    }))
  }


  render() {
    const { filter} = this.state
    const visibleContacts = this.getVisibleContacts()

    return <div>
    <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact} />
      
      
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList value={visibleContacts} onDeleteContact={this.deleteContact} />
    </div>
  }
}