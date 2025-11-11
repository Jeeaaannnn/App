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
const helpersApi = {
  /**
   * RequestProfileEdit API
   * Send a request to change user's data to the admin
   *
   * @since 1.0.0
   */
  requestProfileEdit: async (
    controller: AbortController,
    text: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const data = {
        text,
      };
      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/request-profile-edit";
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

  /**
   * GetMyConsultantInfo API
   * Retrive "My Consultant" info from APIs
   * This is used from "customer" users
   *
   * @since 1.0.0
   */
  getMyConsultantInfo: async (
    controller: AbortController
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/consultant-info";
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
   * GetAgentReferral API
   * Retrive agent referral info from APIs
   * This is used from "agent" users
   *
   * @since 1.0.0
   */
  getAgentReferral: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/agent-referral";
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
   * RequestQuote API
   * Send a request to request a loan quote
   *
   * @since 1.0.0
   */
  requestQuote: async (
    controller: AbortController,
    netAmount: number,
    duration: number
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const params: any = {
        netAmount,
        duration,
      };

      const queryString = new URLSearchParams(params).toString();

      const path: RequestInfo = `https://www.rivagest.com/api/v1/helpers/request-quote?${queryString}`;
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
   * AgentReport API
   * Send a request to request a loan quote
   *
   * @since 1.0.0
   */
  agentReport: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/agent-report";
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
   * CommercialReport API
   * Send a request to gather a report
   *
   * @since 1.0.0
   */
  commercialReport: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/commercial-report";
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
   * CommercialBudget API
   * Send a request to gather a commercial budget
   *
   * @since 1.0.0
   */
  commercialBudget: async (controller: AbortController): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/commercial-budget";
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
   * GetCommercialProducers API
   * Send a request to gather a list of producers
   *
   * @since 1.0.0
   */
  getCommercialProducers: async (
    controller: AbortController
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/helpers/get-producers";
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
};

export default helpersApi;
