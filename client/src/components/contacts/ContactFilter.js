import React, { useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

function ContactFilter() {

    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filterContact, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })    

     const onChange = (e) => {
        if(text.current.value !== null){
            filterContact(e.target.value);
        } else{
            clearFilter();
        }
     }

    return (
        <div>
            <input ref={text} type="text" placeholder="Search..." onChange={onChange} />
        </div>
    )
}

export default ContactFilter
