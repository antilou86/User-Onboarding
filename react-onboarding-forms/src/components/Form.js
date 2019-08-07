import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {

    const [users, setUsers] = useState([]);
    console.log(users);

    return (
        <div className='form-field'> 
            <h1>Enter a New User</h1>
            
            <Form>

                <Field type="text" name="name" placeholder="enter name..."/>
                <Field type="email" name="email" placeholder="enter email..."/>
                <Field type="password" name="password" placeholder="enter password..."/>
                
                <label>
                    Check to agree to our Terms of Service
                <Field type="checkbox" name="tos"/> 
                </label>
                
                <Field component='select' name='role'>
                    <option value='leader'>Leader</option>
                    <option valuer='follower'>Follower</option>
                    <option value='black-sheep'>Black Sheep</option>
                </Field>
                
                <button type="submit">Submit!</button>
            </Form>

            {users.map(user => (
                <></>
            ))}

        </div>
    );
}


export default FormikForm