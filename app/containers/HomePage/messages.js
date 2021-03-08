/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },
  walletNotConnected: {
    id: `${scope}.walletNotConnected`,
    defaultMessage: 'Welcome to Bao View!'
  },
  walletConnected: {
    id: `${scope}.walletConnected`,
    defaultMessage: 'Pools'
  }
});
