import { Form, Input, Button, Radio } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import OrgHospitalForm from './OrgHospitalForm'

const Register = () => {
    const [type, setType] = React.useState("donar");
    return (
        <div className='flex h-screen items-center justify-center bg-primary'>
            <Form layout="verical" className='bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2'>
                <h1 className='col-span-2 uppercase text-2xl'><span className="text-primary">{type.toUpperCase()} - Registration</span><hr /></h1>
                <Radio.Group onChange={(e) => setType(e.target.value)}
                    value={type}
                    className="col-span-2"
                >
                    <Radio value="donor">Donor</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>
                {type === 'donor' && (
                    <>
                        {" "}
                        <Form.Item label="Name"><Input /></Form.Item>
                        <Form.Item label="Email"><Input /></Form.Item>
                        <Form.Item label="Phone"><Input /></Form.Item>
                        <Form.Item label="Password"><Input /></Form.Item>
                    </>
                )}

                {type !== 'donor' && <OrgHospitalForm type={type} />}
                <Button type="primary" block className='col-span-2 bg-primary'>Register</Button>
                <Link to="/login" className="col-span-2 text-center text-gray-700 underline">Already have an account? Login</Link>
            </Form>
        </div>
    )
}

export default Register