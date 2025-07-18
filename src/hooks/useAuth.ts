// hooks/useAuth.ts
import { useContext } from 'react';
import { useAuth as baseUseAuth } from '~/src/contexts/AuthContext';

export const useAuth = () => baseUseAuth();
