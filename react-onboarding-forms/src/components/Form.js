import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Form = ({errors, touched, values, handleSubmit, status}) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);

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
                <p key={user.id}>{user.name} - {user.email}</p>
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
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('but who are you though?'),
        email: Yup.string().required('please provide your email'),
        password: Yup.string().min(8,'minimum of 8 characters required').required('your password protects you! dont forget to add one.'),
        tos: Yup.boolean().required('Accept the ToS or forever be denied entry.')
    })

})(Form);

export default FormikForm