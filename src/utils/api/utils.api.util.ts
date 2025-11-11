// Core packages

// Third party packages
// import * as Keychain from "react-native-keychain";
import { tryCatch } from "../store";
import * as SecureStore from "expo-secure-store";

// Custom packages

/**
 * Script start
 */
const utils = {
  /**
   * Get authentication headers used to authenticate API requests
   * This will check if a token is stored in the device and, if so, will return
   * an object with the appropriate HTTP headers
   *
   * @since 1.0.0
   */
  getAuthenticationHeaders: async (): Promise<any | null> => {
    const [error, token] = await tryCatch(utils.getToken());
    if (!token || error) return null;
    return { x_user_token: token };
  },

  /**
   * Get JWT stored in the keychaing storage or null
   *
   * @since 1.0.0
   */
  getToken: async (): Promise<string | null> => {
    const [error, credentials] = await tryCatch<string | null>(
      SecureStore.getItemAsync("token")
    );

    if (error || !credentials) return null;
    if (credentials && credentials.length > 0) return credentials;
    return null;
  },
};

export default utils;
