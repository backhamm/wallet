import React, { FC } from 'react';
import { ComponentType } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type ErrorProps = {
    message: string;
    handleError: () => void;
};

const Error: FC<ErrorProps> = ({ message, handleError }) => {
    return (
        <div className="w-full flex-center-center">
            <div>{message}</div>
            <button
                onClick={() => {
                    window.location.reload();
                    handleError();
                }}
            >
                再试一次
            </button>
        </div>
    );
};

interface WithErrorScreenProps {}
export default function WithErrorScreen<Props extends WithErrorScreenProps>(
    WrappedComponent: ComponentType<Props>,
) {
    const Component: ComponentType<Props> = (props) => (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <Error
                    message={error.message}
                    handleError={resetErrorBoundary}
                ></Error>
            )}
        >
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );

    Component.displayName = `WithErrorScreen(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return Component;
}
