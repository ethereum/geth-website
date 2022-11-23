import { BINARIES_BASE_URL } from '../constants';

export const getSignatureURL = (signature: string) => `${BINARIES_BASE_URL}${signature}`;
