import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Input,
    Form,
    Loading,
    Empty,
    Button,
    Image,
    Modal,
    Toast,
} from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import { changeLanguage, getLanguage } from '@/config/locale';
import { LocaleEnum } from '@/enums/appEnum';

type TestPageProps = {};

const TestPage: FC<TestPageProps> = (props) => {
    const [visible, setVisible] = useState(false);
    const [form] = useForm();
    const navigate = useNavigate();
    const childRef = useRef(null);

    const onSubmit = (values: any, result: any) => {
        console.log('----submit Successfully', values, result);
        console.log(childRef.current);
    };
    const toSubmit = (val) => {
        form.submit();
    };
    const onConfirm = () => {
        console.log('confirm');
        setVisible(false);
    };
    return (
        <div>
            <div>I am TestPage</div>
            <div className="flex-center-center">
                <div
                    onClick={() =>
                        changeLanguage(
                            LocaleEnum[getLanguage() === 'zh' ? 'EN' : 'ZH'],
                        )
                    }
                    className="mx-[10px]"
                >
                    语切换言
                </div>
                <div> {getLanguage()} </div>
            </div>
            <div className="" onClick={() => navigate('/testDetail')}>
                去测试详情页面
            </div>
            <Form
                form={form}
                onSubmit={onSubmit}
                initialValues={{
                    name: 'Tom',
                    age: 44,
                }}
            >
                <Form.Item
                    field="name"
                    label="姓名"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input placeholder="请输入姓名" ref={childRef} />
                </Form.Item>
                <Form.Item
                    field="age"
                    label="年龄"
                    rules={[
                        {
                            required: true,
                            message: '请输入年龄',
                        },
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                        },
                        {
                            validator: (val, callback) => {
                                if (val.length > 3) {
                                    callback('输出的长度不能超过3位');
                                } else {
                                    callback();
                                }
                            },
                        },
                    ]}
                >
                    <Input placeholder="请输入年龄" validator={/^\d+$/} />
                </Form.Item>

                <div>
                    <Button onClick={toSubmit}>提交</Button>
                </div>
            </Form>

            <div className="mt-[100px]">
                <Loading></Loading>
                <Empty description="暂无数据"></Empty>
                <Image
                    src="https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                    className="w-100px h-100px"
                ></Image>

                <Image
                    src="https://cdn.pixabay.com/photo/2023/03/03/08/22/skulls-7827155_6401.jpg"
                    className="w-100px h-100px"
                ></Image>

                {[...Array(10)].map((item, index) => {
                    return (
                        <Image
                            key={index}
                            src="https://cdn.pixabay.com/photo/2023/03/03/08/22/skulls-7827155_640.jpg"
                            className="w-100px h-100px"
                        ></Image>
                    );
                })}
            </div>
            <Modal
                title="title"
                visible={visible}
                onConfirm={onConfirm}
                onCancel={() => setVisible(false)}
            >
                <div>插槽内容</div>
            </Modal>
            <button onClick={() => setVisible(true)}>show modal</button>
            <div>
                <div
                    onClick={() =>
                        Toast.success({
                            content: 'toast消息',
                        })
                    }
                >
                    show toast
                </div>
            </div>
        </div>
    );
};

export default TestPage;
