import React from 'react';

interface ModalProps {
  title: string;
  body: string | React.ReactNode;
  primaryBtnText: string;
  secondaryBtnText?: string | null;
  setViewState: () => void;
  primaryBtnClick: () => void;
}

const Modal = (props: ModalProps) => {
  const handleClose = () => {
    props.setViewState();
  };

  return (
    <div className='fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center  bg-black/[.8]'>
      <div className='z-20 m-auto min-h-min w-96 rounded-lg bg-white p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2>{props.title}</h2>
          <span className='cursor-pointer' onClick={handleClose}>
            &#x2715;
          </span>
        </div>
        <hr />
        <div className='my-2'>{props.body}</div>
        <hr />
        <div className='mt-4 flex'>
          <button
            className='mr-2 w-full rounded-lg border-none bg-red-200 px-4 py-1'
            onClick={props.primaryBtnClick}
          >
            {props.primaryBtnText}
          </button>
          {props.secondaryBtnText ? (
            <button
              className='w-full rounded-lg bg-gray-200 px-4 py-1'
              onClick={handleClose}
            >
              {props.secondaryBtnText}
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
