import config from './config';
import User from './user';
import Collection from './collection';
import Document from './document';
import Query from './query';

/**
 * Define BaaS
 */
const BaaS = {
  init: ({ host = config.HOST } = {}): void => {
    config.HOST = host;
  },
  config,
  User,
  Collection,
  Document,
  Query,
};

/**
 * Bind BaaS to wx if current environment is Mini Program
 */
if (config.USE_WITH_MINI_PROGRAM) {
  wx.BaaS = BaaS;
}

export default BaaS;
