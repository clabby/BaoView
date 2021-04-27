/**
 * Asynchronously loads the component for Panda Page
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
