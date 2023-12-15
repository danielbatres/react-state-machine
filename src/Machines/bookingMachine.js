import { assign, createMachine, fromPromise } from 'xstate';
import { fetchCountries } from '../Utils/api';

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: fromPromise(() => fetchCountries()),
        onDone: {
          target: "success",
          actions: assign({
            countries: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: ({ event }) => event,
            countries: ["El Salvador"]
          }),
        },
      },
    },
    success: {},
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
    countries: [],
    error: ""
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
      after: {
        5000: {
          target: 'initial',
          actions: "cleanContext"
        }
      },
      on: {
        FINISH: "initial"
      }
    },
    passengers: {
      on: {
        DONE: {
          target: "tickets",
          guard: "moreThanOnePassanger"
        },
        CANCEL: {
          target: "initial",
          actions: "cleanContext"
        },
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
    printExit: () => console.log("print exit"),
    cleanContext: assign({
      selectedCountry: "",
      passengers: []
    })
  },
  guards: {
    moreThanOnePassanger: ({ context }) => {
      return context.passengers.length > 0;
    }
  } 
});

export { bookingMachine };