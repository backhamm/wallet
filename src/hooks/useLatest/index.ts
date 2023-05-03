import { useEffect, useRef } from 'react';

/**
 * @description 返回当前最新值
 */
function useLatest<T>(value: T) {
    const ref = useRef(value);
    ref.current = value;
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
}

export default useLatest;
