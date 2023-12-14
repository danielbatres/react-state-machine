import { createMachine } from 'xstate';

const fileMachine = createMachine({
  id: "files",
  type: "parallel",
  states: {
    upload: {
      initial: {
        on: {
          INIT_UPLOAD: { target: "loading" },
        }
      },
      loading: {
        on: {
          UPLOAD_COMPLETE: { target: "finished" }
        }
      },
      finished: {

      }
    },
    download: {
      initial: 'initial',
      states: {
        initial: {
          on: {
            INIT_DOWNLOAD: { target: "loading" }
          }
        },
        loading: {
          on: {
            DOWNLOAD_COMPLETE: { target: "finished" }
          }
        },
        finished: {}
      }
    }
  }
});