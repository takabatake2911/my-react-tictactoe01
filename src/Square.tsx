import React, { FC } from 'react';
import Circle from './Circle';
import Cross from './Cross';
import './Square.css';

interface Props {
    squareContent: number;
    handleClick: () => void;
}

const Square: FC<Props> = ({ squareContent, handleClick }) => {
    const renderContent = () => {
        if (squareContent === 0) return null;
        if (squareContent === 1) return <Circle />;
        if (squareContent === 2) return <Cross />;
        return null;
    };
    return (
        <div onClick={handleClick} className="square">
            {renderContent()}
        </div>
    );
};

export default Square;
