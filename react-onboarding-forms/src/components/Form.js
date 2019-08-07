import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import './form.css'

const FormThang= ({errors, touched, values, handleSubmit, status}) => {
    
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
          setUsers(users => [...users, status]);
        }
      }, [status]);

    return (
        <div className='form-div'> 
            <h1>Enter a New User</h1>
            
            <Form className="form-container">
                
                <Field className="text-field" type="text" name="name" placeholder="enter name..."/>
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
                
               
                <Field className="text-field" type="email" name="email" placeholder="enter email..."/>
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                
                
                <Field className="text-field" type="password" name="password" placeholder="enter password..."/>
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}

                <label>
                    Check to agree to our Terms of Service
                    <Field type="checkbox" name="tos" checked={values.tos}/> 
                    <span className="checkbox-span"/>
                </label>
                {errors.tos && (<p className="error">{errors.tos}</p>)}
                
                <Field component='select' name='role' className="text-field">
                    <option value='leader'>Leader</option>
                    <option valuer='follower'>Follower</option>
                    <option value='black-sheep'>Black Sheep</option>
                </Field>
                {touched.role && errors.role && (<p className="error">{errors.role}</p>)}

                
                <button className="submit-button" type="submit">Submit!</button>
            </Form>
            <h2>Current Users:</h2>
            {users.map(user => (
                <p key={user.id}>{user.name} - {user.email} - {user.role}</p>
            ))}

        </div>
    );
}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, tos, role}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            role: role || "follower"
        }
    },
    handleSubmit(values, {setStatus}) {
        axios
            .post('https://reqres.in/api/users/',values)
            .then(res => {
                console.log(res.data);
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('but who are you though?'),
        email: Yup.string().required('please provide your email'),
        password: Yup.string().min(8,'minimum of 8 characters required').required('your password protects you! dont forget to add one.'),
        tos: Yup.boolean(true).required('Accept the ToS or forever be denied entry.')
    })

})(FormThang);

export default FormikForm