// Core packages

// Third party packages

// Custom packages
import config from "@/config";
import Response from "@/interfaces/response.interface";
import i18n from "@/i18n";
import utils from "./utils.api.util";

/**
 * Script start
 */
const casesApi = {
  /**
   * GetCases API
   * Get all the cases for logged user
   *
   * @since 1.0.0
   */
  getCases: async (
    controller: AbortController,
    from?: number,
    to?: number,
    sort?: string,
    sortVersus?: string,
    filters?: {
      [key: string]: string;
    }
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      // setTimeout(() => controller.abort(), config.requestsTimeout);

      const params: any = {
        from: from?.toString() || "0",
        to: to?.toString() || "100",
        sort: sort || "id",
        sortVersus: sortVersus || "asc",
      };

      if (filters) {
        for (const key of Object.keys(filters)) {
          params[`filters[${key}]`] = filters[key];
        }
      }

      const queryString = new URLSearchParams(params).toString();

      const path: RequestInfo = `https://www.rivagest.com/api/v1/cases?${queryString}`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);
      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === "AbortError") {
        return {};
      }

      console.warn("error: ", error);
      const response: Response = {
        status: false,
        message: i18n.t("general.errors.connectionError"),
      };
      return response;
    }
  },

  /**
   * GetCase API
   * Get all data of the case with given ID
   *
   * @since 1.0.0
   */
  getCase: async (
    controller: AbortController,
    caseId: number
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = `https://www.rivagest.com/api/v1/cases/${caseId}`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);

      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === "AbortError") {
        return {};
      }

      console.warn("error: ", error);
      const response: Response = {
        status: false,
        message: i18n.t("general.errors.connectionError"),
      };
      return response;
    }
  },

  /**
   * GetCaseNotes API
   * Get all notes of the case with given ID
   *
   * @since 1.0.0
   */
  getCaseNotes: async (
    controller: AbortController,
    caseId: number
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = `https://www.rivagest.com/api/v1/cases/${caseId}/notes`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);

      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === "AbortError") {
        return {};
      }

      console.warn("error: ", error);
      const response: Response = {
        status: false,
        message: i18n.t("general.errors.connectionError"),
      };
      return response;
    }
  },

  /**
   * RequestCaseInfo API
   * Request info of a specifici case to the admin
   *
   * @since 1.0.0
   */
  requestCaseInfo: async (
    controller: AbortController,
    caseId: number,
    text: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = `https://www.rivagest.com/api/v1/cases/${caseId}/request-info`;
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);

      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === "AbortError") {
        return {};
      }

      console.warn("error: ", error);
      const response: Response = {
        status: false,
        message: i18n.t("general.errors.connectionError"),
      };
      return response;
    }
  },

  /**
   * AddCaseNote API
   * Add a new note to case with given ID
   *
   * @since 1.0.0
   */
  addCaseNote: async (
    controller: AbortController,
    caseId: number,
    data: any
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = `https://www.rivagest.com/api/v1/cases/${caseId}/note`;
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
          ...(await utils.getAuthenticationHeaders()),
        },
        signal: controller.signal,
      };

      const result = await fetch(path, options);
      const json = await result.json();
      return json;
    } catch (error: any) {
      // Handle abort controller
      if (error?.name === "AbortError") {
        return {};
      }

      console.warn("error: ", error);
      const response: Response = {
        status: false,
        message: i18n.t("general.errors.connectionError"),
      };
      return response;
    }
  },
};

export default casesApi;
