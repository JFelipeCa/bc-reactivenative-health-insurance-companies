import { useCallback } from 'react';
import { logoutMember } from '../api/client';
import { useHealthStore } from '../store';

export function useLogout() {
  const signOut = useHealthStore((state) => state.signOut);
  return useCallback(async () => {
    await logoutMember();
    signOut();
  }, [signOut]);
}
