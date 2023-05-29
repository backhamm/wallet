import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-between-center h-32px my-18px pl-22px pr-17px">
            <div
                className="flex items-center"
                onClick={() => navigate('/userCenter')}
            >
                <i className="w-32px h-32px mr-10px icon-games" />
                李老板
            </div>
            <div className="flex items-center">
                <i
                    className="w-24px h-24px mr-15px icon-scan"
                    onClick={() => navigate('/scanCode')}
                />
                <i
                    className="w-24px h-24px icon-news"
                    onClick={() => navigate('/notify')}
                />
            </div>
        </div>
    );
};

export default Header;
