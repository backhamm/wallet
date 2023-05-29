import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';

const Password: FC = () => {
    const [form] = useForm();
    const { t } = useTranslation();
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [hasPwd, setHasPwd] = useState(true);

    const onSubmit = (values: any, result: any) => {};

    const formList = useCallback(() => {
        return [
            ...(hasPwd ? [{ field: 'password' }] : []),
            { field: 'newPwd' },
            { field: 'confirmPwd' },
        ];
    }, [hasPwd]);

    return (
        <div className="px-10px py-20px">
            <div className="mb-20px rounded-8px gradient-border">
                <Form
                    form={form}
                    onSubmit={onSubmit}
                    className="w-full px-16px"
                    onValuesChange={() => {
                        form.getFieldsError().then((res) => {
                            setLoginDisabled(res.hasError);
                        });
                    }}
                >
                    {formList().map((el: any, i: number) => (
                        <Form.Item
                            key={el.field}
                            field={el.field}
                            rules={[
                                {
                                    required: true,
                                    message: t(
                                        `userCenter.password.${el.field}`,
                                    ),
                                },
                            ]}
                        >
                            <Input
                                placeholder={t(
                                    `userCenter.password.${el.field}`,
                                )}
                                className={`px-0 ${
                                    i !== formList().length - 1 &&
                                    'border-b border-solid border-baseColor'
                                }`}
                                inputClass="px-0"
                                height={60}
                                type="password"
                            />
                        </Form.Item>
                    ))}
                </Form>
            </div>
            <div className="mb-55px text-center">
                <p className="mb-6px">{t('userCenter.password.tips')}</p>
                <a href="tel:110" className="text-primaryColor underline">
                    {t('userCenter.password.service')}
                </a>
            </div>
            <Button
                onClick={() => form.submit()}
                disabled={loginDisabled}
                className="flex-center-center w-316px m-auto"
            >
                {t('userCenter.password.edit')}
            </Button>
        </div>
    );
};

export default Password;
