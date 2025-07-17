import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

// import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { getValueFor, save } from '@utils/secureStorage';
import { STORAGE_KEYS } from '../constants/asyncKeys';
// import { extractAndStoreExpiresAt } from "@utils/checkTokenExtractor";
import { API_ROUTES } from '../constants/apiConstants';
import { QueryCache, useQueryClient } from '@tanstack/react-query';

export const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

interface UserResponse {}
interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  loading: boolean;
  hasBeenUsed: boolean;
  isFirstUse: boolean;
  setHasBeenUsed: (value: boolean) => void;
  setIsFirstUse: (value: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userSignup: UserDetails) => Promise<void>;
  signOut: () => Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
  // refreshToken: () => Promise<string>;
  userResponse: UserResponse | null;

  userSignup: UserDetails | null;
  setUserSignup: React.Dispatch<React.SetStateAction<UserDetails>>;
  authChecked: boolean;
  // verifyEmail: (code: string) => void;
  // resendVerifyEmail: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  getUserSession: (token: string) => Promise<string>;
}
// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}

interface Quote {
  author: string;
  quote: string;
}

export interface UserDetails {}

const initialUserDetails: UserDetails = {
  email: '',
  name: '',
  password: '',
  address: '',
  phone: '',
  dateOfBirth: '',
  userAvatar: '',
  userAvatarUrl: '',
  checkinInterval: '',
  lastCheckinTime: '',
  nextCheckinTime: '',
  failedCheckins: 0,
  securityQuestion: '',
  securityAnswer: '',
  securityQuestion2: '',
  securityAnswer2: '',
  imageUri: '',
  gender: '',
  accessCode: '',
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);

  const [isFirstUse, setIsFirstUse] = useState(false);
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);
  const [userSignup, setUserSignup] = useState<UserDetails>(initialUserDetails);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    console.log('HEREEEEE');
    try {
      const [
        token,
        expiresAtString,
        // unlockPhrase
      ] = await Promise.all([
        getValueFor(STORAGE_KEYS.AUTH_TOKEN),
        getValueFor(STORAGE_KEYS.EXPIRES_AT),
      ]);
      // if (unlockPhrase) {
      //   setHasUnlockPhrase(true);
      //   setUnlockPhrase(unlockPhrase);
      // }
      if (token && expiresAtString) {
        const expiresAt = new Date(expiresAtString);
        const hasExpired = new Date() > expiresAt;

        if (hasExpired) {
          signOut();
          setIsAuthenticated(false);
          setAuthToken(null);
          return false; // Token expired
        } else {
          // Token is still valid
          console.log('token is still valid');
          setIsAuthenticated(true);
          setAuthToken(token);
          // getUserSession(token);
          console.log('token from checker', token);
          return true; // Valid token
        }
      } else {
        setIsAuthenticated(false);
        setAuthToken(null);
        return false; // No token found
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setAuthToken(null);
      return false; // Error encountered
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  }, []);

  const getUserSession = async (token: string) => {
    try {
      console.log(authToken, 'getting user session');
      const res = await axios.get(`${baseURL}${API_ROUTES.GET_USER}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const client = res.data.client;

      console.log('res', res.data);

      setUserResponse('');
      setIsAuthenticated(true);
      return '';
    } catch (error) {
      console.error('Get user session error:', error);
      await save(STORAGE_KEYS.AUTH_TOKEN, '');
      setIsAuthenticated(false);
      setAuthToken(null);
      throw new Error('Token is invalid or expired');
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  // Check if the app has been used before
  const checkBeenUsed = useCallback(async () => {
    try {
      const usedApp = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      const firstUse = await getValueFor(STORAGE_KEYS.IS_FIRST_USE);
      setHasBeenUsed(!!usedApp);
      setIsFirstUse(!!firstUse);
    } catch (err) {}
  }, []);

  useEffect(() => {
    checkBeenUsed();
  }, [checkBeenUsed]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}${API_ROUTES.SIGN_IN}`, {
        email: email,
        password: password,
      });

      setUserResponse(res.data.data);
      setIsAuthenticated(true);
      setAuthToken(res.data.token);
      await getUserSession(res.data.token);
      //   await getQuotes(res.data.token);
      await save(STORAGE_KEYS.AUTH_TOKEN, res.data.token);

      // Extract and store expiration time
      // await extractAndStoreExpiresAt(res.data.token);
      console.log(res.data.data);
      Toast.show({
        type: 'success',
        text1: 'Sign In Successful',
        text2: 'Welcome back!',
      });
      // if (!res.data) {
      //   throw new Error("Failed");
      // }
      return res.data.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: 'Please check your credentials and try again.',
      });
      throw new Error('Failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userSignup: UserDetails) => {
    setLoading(true);

    try {
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: 'Please check your information and try again.',
      });
      throw new Error(error);
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Dummy sign-out function
  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear all relevant state variables
      setIsAuthenticated(false);
      setAuthToken(null);
      queryClient.clear();
      setUserResponse(null);

      setUserSignup({
        email: '',
        name: '',
        password: '',
        address: '',
        phone: '',
        dateOfBirth: '',
        userAvatar: '',
        userAvatarUrl: '',
        checkinInterval: '',
        lastCheckinTime: '',
        nextCheckinTime: '',
        failedCheckins: 0,
        securityQuestion: '',
        securityAnswer: '',
        securityQuestion2: '',
        securityAnswer2: '',
        imageUri: '',
        gender: '',
        accessCode: '',
      });

      // Clear stored token and expiration time
      await save(STORAGE_KEYS.AUTH_TOKEN, '');
      await save(STORAGE_KEYS.EXPIRES_AT, '');

      Toast.show({
        type: 'success',
        text1: 'Signed Out',
        text2: 'You have been successfully signed out.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign Out Failed',
        text2: 'There was an error signing out. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseURL}${API_ROUTES.VERIFY_EMAIL}`,
        {
          code: code,
        },
        {
          headers: {
            Authorization: authToken, // Replace with your token if needed, e.g., `Bearer YOUR_TOKEN`
          },
        }
      );
      if (res.data.message === 'Email verified successfully') {
        console.log(res.data);
        return true;
      }

      throw new Error(res.data.message || 'Unexpected response from server');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resendVerifyEmail = async () => {
    setLoading(true);
    console.log('res.data');

    try {
      const res = await axios.post(
        `${baseURL}${API_ROUTES.RESEND_EMAIL}`,
        {},
        {
          headers: {
            Authorization: authToken, // Replace with your token if needed, e.g., `Bearer YOUR_TOKEN`
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        loading,
        hasBeenUsed,
        isFirstUse,
        authChecked,

        setHasBeenUsed,
        setIsFirstUse,
        signIn,
        signUp,
        signOut,
        setIsAuthenticated,

        // verifyEmail,
        userResponse,

        userSignup,
        setUserSignup,
        // resendVerifyEmail,
        checkAuthStatus,
        getUserSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
