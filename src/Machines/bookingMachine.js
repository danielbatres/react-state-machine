import { assign, createMachine } from 'xstate';

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        DONE: "success",
        ERROR: "failure"
      },
    },
    success: {
    },
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: "",
  },
  states: {
    initial: {
      on: {
        START: {
          target: "search",
        }
      }
    },
    search: {
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({
            selectedCountry: ({ event }) => event.selectedCountry
          })
        },
        CANCEL: "initial"
      },
      ...fillCountries,
    },
    tickets: {
      on: {
        FINISH: "initial"
      }
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: "initial",
        ADD: {
          target: "passengers",
          actions: assign(
            ({ context, event }) => context.passengers.push(event.newPassenger)
          )
        }
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