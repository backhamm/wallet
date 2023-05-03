import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserToken from '@/common/token';
import { Input, Form, Button } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import GuidePage from '@/pages/Login/GuidePage';

type LoginProps = {};

const Login: FC<LoginProps> = (props) => {
    const navigate = useNavigate();
    const token = UserToken.getToken();
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [form] = useForm();

    const userLogin = async () => {
        UserToken.setToken('token');
        navigate('/', { replace: true });
    };

    const toSubmit = (val) => {
        form.submit();
    };

    const onSubmit = (values: any, result: any) => {
        userLogin();
    };

    useEffect(() => {
        if (location.pathname === '/user/login' && token) {
            navigate('/', { replace: true });
        }
    }, [location.pathname, navigate, token]);

    return (
        <div className="w-full h-full text-baseColor">
            <GuidePage />
            <Form
                form={form}
                onSubmit={onSubmit}
                className="w-full px-[30px]"
                onValuesChange={() => {
                    form.getFieldsError().then((res) => {
                        setLoginDisabled(res.hasError);
                    });
                }}
            >
                <Form.Item
                    field="memeber_code"
                    rules={[
                        {
                            required: true,
                            message: '请输入户口号',
                        },
                    ]}
                    className="mb-[35px]"
                >
                    <Input
                        placeholder="请输入户口号"
                        inputClass="placeholder-primaryColor"
                        styleType="active"
                        className="rounded-[8px]"
                        prefixIocn="user"
                    />
                </Form.Item>
                <Form.Item
                    field="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                    className="mb-[21px]"
                >
                    <Input
                        placeholder="请输入密码"
                        inputClass="placeholder-primaryColor"
                        styleType="active"
                        className="rounded-[8px]"
                        prefixIocn="lock"
                        type="password"
                    />
                </Form.Item>

                <div className="w-full flex-center-center">
                    <Button onClick={toSubmit} disabled={loginDisabled}>
                        登录
                    </Button>
                </div>
            </Form>
        </div>
    );
};
export default Login;
