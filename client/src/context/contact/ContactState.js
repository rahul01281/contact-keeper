import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS //as soon we logout, the contacts in the state are removed instead of being held there until we log back in
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    //state allows us to access anything in our state and dispatch allows us to dispatch objects to the reducer
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //all the actions

    //get contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');

            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
        }
    }

    //add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
        }
    }

    //delete contact
    const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id});
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

    //set current contact
    const setCurrent = (id) => {
        dispatch({ type: SET_CURRENT, payload:id })
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT }) //don't need a payload because we are setting it back to null
    }

    //update contact
    const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact,config);

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };


    //filter contacts
    const filterContact = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    //clear filters
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    //clear contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;