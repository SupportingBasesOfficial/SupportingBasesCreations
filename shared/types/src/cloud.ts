export interface DeployResult {
  success: boolean;
  githubUrl?: string;
  vercelUrl?: string;
  supabaseUrl?: string;
  supabaseProjectRef?: string;
  supabaseAnonKey?: string;
  error?: string;
  step?: DeployStep;
}

export type DeployStep =
  | "idle"
  | "generating"
  | "creating-repo"
  | "pushing-files"
  | "linking-vercel"
  | "deploying-vercel"
  | "provisioning-supabase"
  | "configuring-env"
  | "complete"
  | "failed";

export interface DeployProgress {
  step: DeployStep;
  message: string;
  percentage: number;
}

export interface CloudConfig {
  github: {
    token: string;
    owner: string;
  };
  vercel: {
    token: string;
    teamId?: string;
  };
  supabase: {
    token: string;
    organizationId: string;
  };
}

export interface OAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  provider: "github" | "vercel" | "supabase";
}

export interface PKCEChallenge {
  codeVerifier: string;
  codeChallenge: string;
  method: "S256";
}

export interface CloudMutation {
  projectId: string;
  nodeId: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  payload: Record<string, unknown>;
  timestamp: number;
}
