import React, { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserToken from '@/common/token';
import { Input, Form, Button } from '@/components/vip-ui';
import { useForm } from '@/components/vip-ui/Form';
import GuidePage from '@/pages/Login/GuidePage';
import { changeLanguage, getLanguage } from '@/config/locale';
import { langList } from '@/locales';
import { useCountdown } from '@/hooks';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
    const [loginType, setLoginType] = useState(1); // 1：密码登录，2：验证码登录
    const [targetDate, setTargetDate] = useState(0);
    const navigate = useNavigate();
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [form] = useForm();
    const { t } = useTranslation();
    const { seconds } = useCountdown({ targetDate });

    const userLogin = () => {
        UserToken.setToken('token');
        navigate('/', { replace: true });
    };

    const onSubmit = (values: any, result: any) => {
        userLogin();
    };

    const formList = useCallback(() => {
        return [
            {
                field: 'member_code',
                className: 'mb-35px',
                validator: /^[A-Za-z0-9]+$/,
                prefixIcon: 'user',
                prefixDom: (
                    <span className="ml-17px -mr-12px leading-28px">OK-</span>
                ),
            },
            loginType === 1
                ? {
                      field: 'password',
                      className: 'mb-20px',
                      prefixIcon: 'lock',
                      type: 'password',
                  }
                : {
                      field: 'code',
                      className: 'mb-20px',
                      validator: /^[0-9]*$/,
                      prefixIcon: 'code',
                      suffixDom: (
                          <div
                              onClick={() =>
                                  !seconds && setTargetDate(Date.now() + 60000)
                              }
                              className="absolute top-0 right-0 min-w-84px h-full text-center leading-42px px-10px rounded-7px text-assistColor5 bg-assistColor4"
                          >
                              {seconds ? seconds + 's' : t('login.getCode')}
                          </div>
                      ),
                  },
        ];
    }, [seconds, loginType, t]);

    return (
        <div className="w-full h-full pt-47px text-baseColor ">
            <GuidePage />
            <div className="w-218px h-252px mb-47px mx-auto login-top" />
            <Form
                form={form}
                onSubmit={onSubmit}
                className="w-full px-30px"
                onValuesChange={() => {
                    form.getFieldsError().then((res) => {
                        setLoginDisabled(res.hasError);
                    });
                }}
            >
                {formList().map((el: any) => (
                    <Form.Item
                        key={el.field}
                        field={el.field}
                        rules={[
                            {
                                required: true,
                                message: t(`login.placeholder.${el.field}`),
                            },
                            ...(el.rules || []),
                        ]}
                        className={el.className}
                    >
                        <Input
                            placeholder={t(`login.placeholder.${el.field}`)}
                            inputClass="placeholder-primaryColor"
                            styleType="active"
                            validator={el.validator}
                            className="rounded-8px"
                            prefixIcon={el.prefixIcon}
                            prefixDom={el.prefixDom}
                            suffixDom={el.suffixDom}
                            type={el.type}
                        />
                    </Form.Item>
                ))}
                <div className="flex justify-around	items-center mb-62px text-assistColor4">
                    {langList.map((el: any) => {
                        return (
                            <div
                                key={el.value}
                                onClick={() => {
                                    changeLanguage(el.value);
                                }}
                                className={`flex-center-center ${
                                    getLanguage() === el.value &&
                                    'text-primaryColor'
                                }`}
                            >
                                <i
                                    className={`w-16px h-16px mr-5px icon-radio${
                                        getLanguage() === el.value ? 1 : 0
                                    }`}
                                />
                                {el.label}
                            </div>
                        );
                    })}
                </div>
                <Button
                    onClick={() => form.submit()}
                    disabled={loginDisabled}
                    className="w-full flex-center-center"
                >
                    {t('login.login')}
                </Button>
            </Form>
            <div
                className="mt-10px mb-55px text-lgSize text-center"
                onClick={() => setLoginType(loginType === 1 ? 2 : 1)}
            >
                {t(`login.${loginType === 1 ? 'pwdLogin' : 'codeLogin'}`)}
            </div>
            <div className="text-center">
                <p className="mb-7px">{t('login.loginTips')}</p>
                <a href="tel:110000000" className="text-primaryColor underline">
                    110000000
                </a>
            </div>
        </div>
    );
};
export default Login;
