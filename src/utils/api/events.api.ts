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
const eventsApi = {
  /**
   * GetEvents API
   * Get all the events for logged user
   *
   * @since 1.0.0
   */
  getEvents: async (
    controller: AbortController,
    from?: number,
    to?: number,
    sort?: string,
    sortVersus?: string,
    filters?: {
      producerId?: number;
      reason?: string;
      notes?: string;
      outcome?: string;
      where?: string;
      generalSearch?: string;
      from?: string;
      to?: string;
    },
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const params: any = {
        from: from?.toString() || '0',
        to: to?.toString() || '20',
        sort: sort || 'id',
        sortVersus: sortVersus || 'asc',
      };

      if (filters?.producerId) {
        params['filters[producerId]'] = filters?.producerId?.toString();
      }
      if (filters?.reason) {
        params['filters[reason]'] = filters?.reason;
      }
      if (filters?.notes) {
        params['filters[notes]'] = filters?.notes;
      }
      if (filters?.outcome) {
        params['filters[outcome]'] = filters?.outcome;
      }
      if (filters?.where) {
        params['filters[where]'] = filters?.where;
      }
      if (filters?.generalSearch) {
        params['filters[generalSearch]'] = filters?.generalSearch;
      }
      if (filters?.from) {
        params['filters[from]'] = filters?.from;
      }
      if (filters?.to) {
        params['filters[to]'] = filters?.to;
      }

      const queryString = new URLSearchParams(params).toString();

      const path: RequestInfo = `https://www.rivagest.com/api/v1/events?${queryString}`;
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
   * AddAppointment API
   *
   * @since 1.0.0
   */
  addAppointment: async (
    controller: AbortController,
    producerId?: number,
    from?: Date | string,
    to?: Date | string,
    allDay?: boolean,
    reason?: string,
    notes?: string,
    outcome?: string,
    where?: string,
  ) => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = 'https://www.rivagest.com/api/v1/events';
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({
          producerId,
          from,
          to,
          allDay,
          reason,
          notes,
          where,
        }),
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
   * UpdateAppointment API
   *
   * @since 1.0.0
   */
  updateAppointment: async (
    controller: AbortController,
    eventId?: number,
    outcome?: string,
  ) => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = `https://www.rivagest.com/api/v1/events/${eventId}`;
      const options: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({
          id: eventId,
          outcome,
        }),
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

export default eventsApi;
