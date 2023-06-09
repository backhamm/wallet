/**
 * @description: 强制组件重新渲染 ;
 */

import { useCallback, useState } from 'react';

const useUpdate = () => {
    const [, setState] = useState({});

    return useCallback(() => setState({}), []);
};

export default useUpdate;
