import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '~/src/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { getValueFor, getStoredSession } from '~/src/utils/secureStorage';
import { STORAGE_KEYS } from '../constants/asyncKeys';

interface AuthContextType {
  session: Session | null;
  user: Session['user'] | null;
  hasBeenUsed: boolean;
  setHasBeenUsed: (value: boolean) => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  hasBeenUsed: false,
  setHasBeenUsed: () => {},
  isReady: false,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const checkBeenUsed = useCallback(async () => {
    try {
      const usedApp = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      setHasBeenUsed(!!usedApp);
    } catch (err) {
      console.error('Error checking app use status:', err);
    }
  }, []);

  useEffect(() => {
    const initSession = async () => {
      try {
        // Try to restore session from SecureStore
        const stored = await getStoredSession();
        if (stored?.session?.access_token && stored?.session?.refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token: stored.session.access_token,
            refresh_token: stored.session.refresh_token,
          });

          if (error) {
            console.warn('Session restore failed:', error.message);
          } else {
            setSession(data.session ?? null);
          }
        } else {
          const { data } = await supabase.auth.getSession();
          setSession(data.session ?? null);
        }
      } catch (err) {
        console.error('Error restoring session:', err);
      } finally {
        setIsReady(true);
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkBeenUsed();
  }, [checkBeenUsed]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        hasBeenUsed,
        setHasBeenUsed,
        isReady,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
