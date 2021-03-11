/**
 * Asynchronously loads the component for Identicon
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
