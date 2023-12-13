import { createMachine } from 'xstate';

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  states: {
    initial: {
      on: {
        START: {
          target: "search",
          actions: "printStart"
        }
      }
    },
    search: {
      entry: "printEntry",
      exit: "printExit",
      on: {
        CONTINUE: "passengers",
        CANCEL: "initial"
      }
    },
    tickets: {
      on: {
        FINISH: "initial"
      }
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: "initial"
      }
    }
  },
},
  {
   actions: {
    printStart: () => console.log("print start"),
    printEntry: () => console.log("print entry"),
    printExit: () => console.log("print exit")
  } 
});

export { bookingMachine };