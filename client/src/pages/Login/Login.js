import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { SetLoading } from "../../redux/loadersSlice";


function Login() {
    const [type, setType] = React.useState("donar");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-primary">
            <Form
                layout="vertical"
                className="bg-white rounded shadow grid p-5 gap-5 w-1/3"

            >
                <h1 className=" uppercase text-2xl">
                    <span className="text-primary">{type.toUpperCase()} - LOGIN</span>
                    <hr />
                </h1>

                <Radio.Group
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className=""
                >
                    <Radio value="donar">Donar</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>

                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"

                >
                    <Input type="password" />
                </Form.Item>

                <Button type="bg-primary" block className="bg-primary" htmlType="submit">
                    Login
                </Button>

                <Link to="/register" className=" text-center text-gray-700 underline">
                    Don't have an account ? Register
                </Link>
            </Form>
        </div>
    );
}

export default Login;