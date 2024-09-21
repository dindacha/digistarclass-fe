// // src/contexts/FinancialContext.js
// import React, { createContext, useState } from 'react';

// const FinancialContext = createContext();

// export const FinancialProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [wallets, setWallets] = useState([]);
//   const [expenseItems, setExpenseItems] = useState([]);

//   return (
//     <FinancialContext.Provider value={{ categories, setCategories, wallets, setWallets, expenseItems, setExpenseItems }}>
//       {children}
//     </FinancialContext.Provider>
//   );
// };

// export default FinancialContext;
