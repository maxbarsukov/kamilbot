import pino from "pino";

export default pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      bindings: (bindings) => {
        return {
          pid: bindings.pid,
          host: bindings.hostname,
          node_version: process.version,
        };
      },
    },
  },
  pino.destination("./log/bot.log"),
);
