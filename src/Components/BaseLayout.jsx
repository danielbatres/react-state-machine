import React from 'react'
import { useMachine } from '@xstate/react';
import { bookingMachine } from '../Machines/bookingMachine';

const BaseLayout = ({ children }) => {
  const [state, send] = useMachine(bookingMachine);

  console.log(state);

  console.log('matches true', state.matches('initial'));
  console.log("matches false", state.matches("tickets"));
  console.log("can", state.can("FINISH"));

  return (
    <div>
      {children}
    </div>
  );
}

export { BaseLayout };
