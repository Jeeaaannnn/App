// Core packages

// Third party packages

// Custom packages
import config from "@/config";
import Response from "@/interfaces/response.interface";
import i18n from "@/i18n";

/**
 * Script start
 */
const authApi = {
  /**
   * Login API
   * Send user's credentials to the back-end and wait for the reponse
   * If credentials are correct, this will return the JWT used to autenticate every other request
   *
   * @since 1.0.0
   */
  login: async (
    controller: AbortController,
    email: string,
    password: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const data = {
        email,
        password,
      };
      const path: RequestInfo = "https://www.rivagest.com/api/v1/auth/login";
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
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
   * Register API
   * Send user's credentials to the back-end and wait for the reponse
   * If data is correct, create a new user
   *
   * @since 1.0.1
   */
  register: async (
    controller: AbortController,
    data: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      administrativeArea2: string;
      password: string;
      confirmPassword: string;
      privacy: string;
    }
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const path: RequestInfo = "https://www.rivagest.com/api/v1/users";
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
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
   * RecoverPassword API
   *
   * @since 1.0.0
   */
  recoverPassword: async (
    controller: AbortController,
    email: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const data = {
        email,
      };
      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/auth/recover-password";
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
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
   * RecoverPassword API
   *
   * @since 1.0.0
   */
  approveCode: async (
    controller: AbortController,
    email: string,
    code: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const data = {
        email,
        code,
      };
      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/auth/security-pin";
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
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
   * RecoverPassword API
   *
   * @since 1.0.0
   */
  newPassword: async (
    controller: AbortController,
    password: string,
    token: string
  ): Promise<Response> => {
    try {
      // Set request timeout as per configuration
      setTimeout(() => controller.abort(), config.requestsTimeout);

      const data = {
        password,
        token,
      };
      const path: RequestInfo =
        "https://www.rivagest.com/api/v1/auth/new-password";
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          X_AUTH_TOKEN: "fLVahBA2&=UnNY!P39Xaes#w6B+UqtDS",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-language": i18n.language,
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

export default authApi;
