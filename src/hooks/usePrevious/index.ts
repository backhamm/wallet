import { useRef, useEffect } from 'react';

/**
 * @description: 保存上一次状态
 */
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
