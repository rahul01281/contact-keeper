import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

function Contacts() {

    const contactContext = useContext(ContactContext); //now we will have access to any state or actions associated with this context

    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </Fragment>
    )
}

export default Contacts
