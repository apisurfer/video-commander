const createEmitter =
  (emitFunction) =>
  (eventId, cause) =>
  (data) => {
    emitFunction && emitFunction(eventId, {
      data,
      videoCommanderContext: {
        cause: cause
      }
    })
  }

export default createEmitter
