import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

function Contacts() {

    const contactContext = useContext(ContactContext); //now we will have access to any state or actions associated with this context

    const { contacts, filtered } = contactContext;

    if(contacts.length === 0){
        return <h4>Please Add a Contact</h4>
    }

    return (
        <Fragment>
            {filtered !== null ? filtered.map(contact => (<ContactItem key={contact.id} contact={contact} />)) : 
            contacts.map(contact => (<ContactItem key={contact.id} contact={contact} />))
            }
            
        </Fragment>
    )
}

export default Contacts
