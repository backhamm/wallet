import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    title?: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="flex-between-center h-50px">
            <div
                className="w-56px px-20px py-17px"
                onClick={() => navigate(-1)}
            >
                <i className="icon-back w-16px h-16px" />
            </div>
            <div className="text-lgSize text-primaryColor">{title}</div>
            <div className="w-56px" />
        </div>
    );
};

export default Header;
