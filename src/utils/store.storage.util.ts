// Core packages

// Third party packages
import { MMKV } from "react-native-mmkv";

// Custom packages
import { RootState } from "@store/root/types";

/**
 * Script start
 */

export const storage = new MMKV({
  id: "mmkv.default",
  // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
  encryptionKey: "finsolution_Kjhnb87",
});

/**
 * Load persisten state from localStorage
 *
 * @since 1.0.0
 */
export function setPersistentState(state: RootState): boolean {
  try {
    const newState = JSON.parse(JSON.stringify(state));
    if (newState?.auth) {
      newState.auth.token = "";
      delete newState.auth.token; // Don't save auth data in this unencrypted storage
    }
    const jsonData = JSON.stringify(newState);
    storage.set("PERSISTENT_STATE", jsonData);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

/**
 * Load persisten state from localStorage
 *
 * @since 1.0.0
 */
export function loadPersistentState(): RootState | undefined {
  try {
    const rawData = storage.getString("PERSISTENT_STATE");
    if (!rawData) {
      return;
    }
    const data = JSON.parse(rawData);
    return data;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
