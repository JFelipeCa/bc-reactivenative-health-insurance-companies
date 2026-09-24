import { useEffect, useMemo, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { saveTokens } from '../api/tokenStorage';
import { useHealthStore } from '../store';

WebBrowser.maybeCompleteAuthSession();

const issuer = 'https://accounts.google.com';

export function useOAuthLogin() {
  const clientId = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID ?? '';
  const discovery = AuthSession.useAutoDiscovery(issuer);
  const redirectUri = useMemo(() => AuthSession.makeRedirectUri({ scheme: 'healthcoveragecolombia' }), []);
  const [error, setError] = useState('');
  const signIn = useHealthStore((state) => state.signIn);
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: clientId || 'not-configured',
    redirectUri,
    responseType: AuthSession.ResponseType.Code,
    codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    usePKCE: true,
    scopes: ['openid', 'email', 'profile'],
  }, discovery);

  useEffect(() => {
    if (response?.type !== 'success' || !request?.codeVerifier || !clientId || !discovery?.tokenEndpoint) return;
    const code = response.params.code;
    if (!code) return;
    void AuthSession.exchangeCodeAsync({
      clientId,
      code,
      redirectUri,
      extraParams: { code_verifier: request.codeVerifier },
    }, discovery).then(async (tokens) => {
      if (!tokens.accessToken) throw new Error('El proveedor no devolvió un token de acceso.');
      await saveTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
      signIn();
    }).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : 'No se pudo iniciar sesión con el proveedor.');
    });
  }, [clientId, discovery, redirectUri, request, response, signIn]);

  return {
    enabled: Boolean(clientId && request && discovery),
    error,
    start: () => promptAsync(),
  };
}
