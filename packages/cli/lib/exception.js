import { isDebug, log } from '@longmo-cli/utils';

function printErrorLog(e, type) {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message);
  }
}

process.on('uncaughtException', (e) => printErrorLog(e, 'error'));

process.on('unhandledRejection', (e) => printErrorLog(e, 'promise'));
