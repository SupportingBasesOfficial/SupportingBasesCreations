import type { OAuthToken, PKCEChallenge } from "@sbc/shared";

const VERIFIER_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const VERIFIER_LENGTH = 64;

export class OAuthPKCE {
  static generateVerifier(): string {
    const array = new Uint8Array(VERIFIER_LENGTH);
    crypto.getRandomValues(array);
    let verifier = "";
    for (let i = 0; i < array.length; i++) {
      verifier += VERIFIER_CHARS[array[i] % VERIFIER_CHARS.length];
    }
    return verifier;
  }

  static async generateChallenge(verifier: string): Promise<PKCEChallenge> {
    const encoded = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const challenge = this.base64UrlEncode(new Uint8Array(digest));
    return {
      codeVerifier: verifier,
      codeChallenge: challenge,
      method: "S256",
    };
  }

  static async generate(): Promise<PKCEChallenge> {
    const verifier = this.generateVerifier();
    return this.generateChallenge(verifier);
  }

  static buildAuthUrl(
    authEndpoint: string,
    clientId: string,
    redirectUri: string,
    challenge: PKCEChallenge,
    scopes: string[],
    state: string,
  ): string {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      state,
      code_challenge: challenge.codeChallenge,
      code_challenge_method: "S256",
    });
    return `${authEndpoint}?${params.toString()}`;
  }

  static async exchangeCode(
    tokenEndpoint: string,
    clientId: string,
    redirectUri: string,
    code: string,
    codeVerifier: string,
    provider: "github" | "vercel" | "supabase",
  ): Promise<OAuthToken> {
    const body = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
    });

    const res = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      throw new Error(
        `OAuth token exchange failed for ${provider}: ${await res.text()}`,
      );
    }

    const data = (await res.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in?: number;
    };

    const expiresIn = data.expires_in ?? 3600;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + expiresIn * 1000,
      provider,
    };
  }

  private static base64UrlEncode(bytes: Uint8Array): string {
    let str = "";
    for (let i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
}

export interface OAuthProviderConfig {
  authEndpoint: string;
  tokenEndpoint: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

export const GITHUB_OAUTH: OAuthProviderConfig = {
  authEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  clientId: "",
  redirectUri: "",
  scopes: ["repo", "user"],
};

export const VERCEL_OAUTH: OAuthProviderConfig = {
  authEndpoint: "https://vercel.com/oauth/authorize",
  tokenEndpoint: "https://api.vercel.com/v2/oauth/access_token",
  clientId: "",
  redirectUri: "",
  scopes: ["user"],
};

export const SUPABASE_OAUTH: OAuthProviderConfig = {
  authEndpoint: "https://supabase.com/oauth/authorize",
  tokenEndpoint: "https://api.supabase.com/v1/oauth/token",
  clientId: "",
  redirectUri: "",
  scopes: ["projects:write", "organizations:read"],
};
