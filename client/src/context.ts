import { createContext } from 'react';

export default createContext<{ setToast: Function }>({ setToast: () => {} });
