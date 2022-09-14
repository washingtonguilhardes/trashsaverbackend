import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLoginUrl(clientId: string) {
    return `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}/adminconsent?client_id=${clientId}&redirect_uri=${process.env.MSAL_OAUTH_REDIRECT_URI}&state=1`;
  }

  async setupApp(code: string) {
    return 'DONE';
  }
}
