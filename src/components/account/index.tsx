import React from 'react';

interface AccountProps {
  accountId: string | null | undefined;
  chainId: number | undefined;
  balance: string | number;
}

const Account = (props: AccountProps) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <div className='font-bold'>Account</div>
      <div>{props.accountId}</div>
      <div className='font-bold'>Chain id</div>
      <div>{props.chainId}</div>
      <div className='font-bold'>Balance</div>
      <div>{props.balance}</div>
    </div>
  );
};

export default Account;
