import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';

import Account from '@/components/account';
import { inject } from '@/components/connector';
import Modal from '@/components/modal';

const Converter = () => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const [nep, setNep] = useState<string | number>('');
  const [busd, setBusd] = useState<string | number>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<string | number>('');

  const handleNepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = Number(e.target.value);
    setNep(val);
    const newVal: number = val * 3;
    setBusd(newVal.toFixed(2));
  };

  const handleBusdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = Number(e.target.value);
    setBusd(val);
    const newVal: number = val / 3;
    setNep(newVal.toFixed(2));
  };

  const startConnection = async () => {
    if (window?.ethereum) {
      try {
        await activate(inject);
      } catch (error) {
        console.log('error:', error);
      }
    } else {
      alert('Metamask no found. Please install Metamask.');
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    library &&
      library.eth.getBalance(account).then((val: any) => {
        setBalance(Number(library.utils.fromWei(val, 'ether')).toFixed(2));
      });
  }, [account, library]);

  return (
    <div className='m-auto mt-16 max-w-lg rounded-lg bg-red-200 p-10'>
      <div>
        <h1 className='mb-8'>Crypto Converter</h1>
        <p className='mr-4'>NEP</p>
        <input
          className='w-full rounded-lg border-none'
          type='number'
          value={nep <= 0 ? '' : nep}
          onChange={handleNepChange}
          placeholder='0.00'
        />
      </div>
      <div>
        <br />
        <p className='mr-4'>BUSD</p>
        <input
          className='w-full rounded-lg border-none'
          type='number'
          value={busd <= 0 ? '' : busd}
          onChange={handleBusdChange}
          placeholder='0.00'
        />
      </div>
      <div
        className='mt-4 cursor-pointer text-center font-bold text-blue-600'
        onClick={handleClick}
      >
        Check Wallet Details
      </div>
      {modalOpen ? (
        <Modal
          title='Wallet Details'
          body={
            active ? (
              <Account
                chainId={chainId}
                accountId={
                  account?.substring(0, 3) +
                  '...' +
                  account?.substring(account.length - 3)
                }
                balance={balance}
              />
            ) : (
              "Wallet not connected. Please click the 'Connect Now' button below."
            )
          }
          primaryBtnText={active ? 'Disconnect' : 'Connect'}
          secondaryBtnText={active ? null : 'cancel'}
          setViewState={handleClick}
          primaryBtnClick={active ? disconnect : startConnection}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Converter;
