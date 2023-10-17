import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from './AddContactForm.styled';
import * as Yup from 'yup';
import 'yup-phone';

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Name required'),
  phone: Yup.string()
    .matches(
      '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      'Doesn`t look like phone number'
    )
    .required('Phone number Required'),
});

export class AddContactForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        validationSchema={Schema}
        onSubmit={(values, action) => {
          this.props.onAdd(values);
          action.resetForm();
        }}
      >
        <Form>
          <Label>
            Name
            <Field name="name" type="text" placeholder="Enter name" />
            <ErrorMessage name="name" component="p" />
          </Label>
          <Label>
            Phone number
            <Field name="phone" type="tel" placeholder="Enter phone number" />
            <ErrorMessage name="phone" component="p" />
          </Label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}
