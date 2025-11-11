// Core packages
import {Platform} from 'react-native';

// Third party packages
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';

// Custom packages
import {AUTH_SET} from '@store/auth/actionTypes';
import {AuthState} from '@store/auth/types';
import {store} from '@store/store';
import {SET_USER} from '@store/user/actionTypes';
import {UserState} from '@store/user/types';

/**
 * Script start
 */
/**
 * Logout current user from store and from localStorage and secureStorage
 *
 * @since 1.0.0
 */
export async function logout(): Promise<boolean> {
  try {
    // Remove auth data
    const newAuthData: AuthState = {
      date: undefined,
      token: undefined,
    };
    store.dispatch({
      type: AUTH_SET,
      payload: newAuthData,
    });

    // Remove user data
    const newUserData: UserState = {
      user: undefined,
    };
    store.dispatch({
      type: SET_USER,
      payload: newUserData,
    });

    // Remove credentials from secureStorage
    await Keychain.resetGenericPassword();

    OneSignal.disablePush(true);

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Return given number of seconds in a duration format like this: 1M 4d 12h 44m 21s
 *
 * @since 1.0.0
 */
export function formatSecondsInDuration(rawSeconds: number) {
  // Define universal constants
  const secondsInAMinute = 60;
  const secondsInAHour = 3600;
  const secondsInADay = 86400;
  const secondsInAMonth = 2628000;
  const secondsInAYear = 31536000;

  // Calculate values
  let timeToRemove = 0;
  let years: string | number = Math.floor(rawSeconds / secondsInAYear);
  timeToRemove += years * secondsInAYear;
  let months: string | number = Math.floor(
    (rawSeconds - timeToRemove) / secondsInAMonth,
  );
  timeToRemove += months * secondsInAMonth;
  let days: string | number = Math.floor(
    (rawSeconds - timeToRemove) / secondsInADay,
  );
  timeToRemove += days * secondsInADay;
  let hours: string | number = Math.floor(
    (rawSeconds - timeToRemove) / secondsInAHour,
  );
  timeToRemove += hours * secondsInAHour;
  let minutes: string | number = Math.floor(
    (rawSeconds - timeToRemove) / secondsInAMinute,
  );
  timeToRemove += minutes * secondsInAMinute;
  let seconds: string | number = rawSeconds - timeToRemove;

  // Reset time to remove
  timeToRemove = 0;

  // Build response based on values
  // NB: only non-empty values are shown
  let formattedTime = `${years}Y ${months}M ${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (years < 1) {
    formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  if (months < 1) {
    formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  if (days < 1) {
    formattedTime = `${hours}h ${minutes}m ${seconds}s`;
  }
  if (hours < 1) {
    formattedTime = `${minutes}m ${seconds}s`;
  }
  if (minutes < 1) {
    formattedTime = `${seconds}s`;
  }

  return formattedTime;
}

/**
 * Get the appropriate padding top depending on current platform OS
 * and, if present, depending on the notch
 *
 * @since 1.0.0
 */
export function getHeaderPaddingTop(): number {
  let paddingTop = 15;
  if (Platform.OS === 'ios') {
    paddingTop = 20;
  }
  if (DeviceInfo.hasNotch()) {
    paddingTop = 35;
  }

  return paddingTop;
}
