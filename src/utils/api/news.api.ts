// Core packages

// Third party packages

// Custom packages
import config from '@config';
import Response from '@interfaces/response.interface';
import i18n from '@locales/i18n';
import utils from './utils.api.util';

/**
 * Script start
 */
const newsApi = {
  /**
   * GetNews API
   * Get all the news for logged user
   *
   * @since 1.0.0
   */
  getNews: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = 'https://www.rivagest.com/api/v1/news';
      const options: RequestInit = {
        method: 'GET',
        headers: {
          X_AUTH_TOKEN: 'fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-language': i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);
      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === 'AbortError') {
        return {};
      }

      console.warn('error: ', error);
      const response: Response = {
        status: false,
        message: i18n.t('general.errors.connectionError'),
      };
      return response;
    }
  },

  /**
   * GetCustomerNews API
   * Get all the news for logged customer
   *
   * @since 1.0.0
   */
  getCustomerNews: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = 'https://www.rivagest.com/api/v1/customer-news';
      const options: RequestInit = {
        method: 'GET',
        headers: {
          X_AUTH_TOKEN: 'fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-language': i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);
      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === 'AbortError') {
        return {};
      }

      console.warn('error: ', error);
      const response: Response = {
        status: false,
        message: i18n.t('general.errors.connectionError'),
      };
      return response;
    }
  },
};

export default newsApi;
