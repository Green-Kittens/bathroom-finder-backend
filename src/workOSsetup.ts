import { WorkOS } from '@workos-inc/node';
import { createRemoteJWKSet } from 'jose';
import { config } from './config.js';

const workos = new WorkOS(config.workosApiKey);

export const JWKS = createRemoteJWKSet(
  new URL(workos.userManagement.getJwksUrl(config.workosClientId)),
);

// Export workos if you need to use it directly in other files
export { workos };