import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { SignUpWrapper, SubmitBtn, SubmitWrapper } from './styles';


const StaffSignUp = ({ values, errors, touched, status }) => {
   const [staff, setStaff] = useState([]);

   const halfWidth = {
      width: '45%',
      height: '35px',
      marginTop: '20px',
   }

   const fullWidth = {
      width: '95%',
      height: '35px',
      marginTop: '20px',
   }

   const formFlex = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
   }

   useEffect(() => {
      console.log('status has changed', status);
      status && setStaff(staff => [...staff, status]);
   }, [status]);



   return (
      <div>
         <SignUpWrapper>
            <Form style={formFlex}>  
               <Field style={halfWidth} type='text' name='fname' placeholder='First Name' />
               {touched.fname && errors.fname && (
                  <p className='errors'>{errors.fname}</p>
               )}

               <Field style={halfWidth} type='text' name='lname' placeholder='Last Name' />
               {touched.lname && errors.lname && (
                  <p className='errors'>{errors.lname}</p>
               )} 

               <Field style={fullWidth} type='email' name='email' placeholder='Email' />
               {touched.email && errors.email && (
                  <p className='errors'>{errors.email}</p>
               )}
                       
               <Field style={fullWidth} type='password' name='password' placeholder='Password' />
               {touched.password && errors.password && (
                  <p className='errors'>{errors.password}</p>
               )}
            
               <Field style={fullWidth} type='password' name='confirm' placeholder='Confirm Password' />
               {touched.confirm && errors.confirm && (
                  <p className='errors'>{errors.confirm}</p>
               )}

               <SubmitWrapper>
                  <label className='checkbox-container'>
                  
                     <Field type='checkbox' name='tos' checked={values.tos} />
                     {touched.tos && errors.tos && (
                        <p className='errors'>{errors.tos}</p>
                     )}

                     Terms of Service

                     <span className='checkmark' />
                  </label>

                  <SubmitBtn type='submit'>Apply</SubmitBtn>
               </SubmitWrapper>
            </Form>
         </SignUpWrapper>

         {staff.map(employee => {
            return (
               <ul key={employee.lname}>
                  <li>{employee.fname}</li>
                  <li>{employee.lname}</li>
                  <li>{employee.email}</li>
                  <li>{employee.password}</li>
                  <li>{employee.address1}</li>
                  <li>{employee.address2}</li>
                  <li>{employee.city_state}</li>
                  <li>{employee.zip}</li>
                  <li>{employee.phone}</li>
                  <li>{employee.airport}</li>
               </ul>
            );
         })}
      </div>
   );
};

const FormikStaffSignUp = withFormik({
   mapPropsToValues(props) {
      return {
         fname: props.fname || '',
         lname: props.lname || '',
         email: props.email || '',
         password: props.password || '',
         confirm: props.confirm || '',
         address1: props.address1 || '',
         address2: props.address2 || '',
         city_state: props.city_state || '',
         zip: props.zip || '',
         airport: props.airport || '',
         phone: props.phone || '',
         tos: props.tos || false,
      };
   },

   validationSchema: Yup.object().shape({
      fname: Yup
         .string()
         .required('please enter your first name'),
      lname: Yup
         .string()
         .required('please enter your last name'),
      email: Yup
         .string()
         .required('please enter your email'),
      password: Yup
         .string()
         .min(6, 'your password must be 6 characters or longer')
         .required('please enter a password'),
      confirm: Yup
         .string()
         .min(6, 'your password must be 6 characters or longer')
         .required('please confirm your password'),
      address1: Yup
         .string()
         .required('please enter your address'),
      address2: Yup
         .string(),
      city_state: Yup
         .string()
         .required('please enter your city and state'),
      zip: Yup
         .string()
         .required('please enter your zip code'),
      airport: Yup
         .string()
         .max(3)
         .required("please enter your home airport's 3-letter code"),
      phone: Yup
         .string()
         .required('please enter your phone number'),
      tos: Yup
         .bool()
         .oneOf([true], 'You must accept the terms of service to continue')
         .required()
   }),

   handleSubmit(values, { setStatus, resetForm }) {
      console.log('submitting', values);
      axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
         console.log('success', res);
         setStatus(res.data);
         resetForm();
      })
      .catch(err => console.log('NOOOOO!!!', err.response));
   },
})(StaffSignUp);

export default FormikStaffSignUp;