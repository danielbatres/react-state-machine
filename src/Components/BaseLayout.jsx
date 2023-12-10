import React from 'react'
import { useMachine } from '@xstate/react';
import { bookingMachine } from '../Machines/bookingMachine';

const BaseLayout = ({ children }) => {
  const [state, send] = useMachine(bookingMachine);

  console.log(state);

  return (
    <div>
      {children}
    </div>
  );
}

export { BaseLayout };