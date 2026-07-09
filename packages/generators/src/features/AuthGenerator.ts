import { Project, FeatureFlag, ArchitectureType } from "@sbc/core";
import type { Generator, GenerationContext } from "@sbc/core";
import type { GeneratedArtifact } from "@sbc/shared";

export class AuthGenerator implements Generator {
  readonly name = "auth";
  readonly version = "1.0.0";
  readonly supportedFeatures: readonly FeatureFlag[] = [FeatureFlag.AUTH];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: "src/server/auth.ts",
      content: this.generateAuthConfig(project),
      language: "typescript",
    });

    artifacts.push({
      path: "src/app/api/auth/[...nextauth]/route.ts",
      content: this.generateAuthRoute(),
      language: "typescript",
    });

    artifacts.push({
      path: "src/app/login/page.tsx",
      content: this.generateLoginPage(project),
      language: "typescript",
    });

    artifacts.push({
      path: "src/middleware.ts",
      content: this.generateMiddleware(),
      language: "typescript",
    });

    return artifacts;
  }

  private generateAuthConfig(project: Project): string {
    const oauthProviders = project.options.providers.filter((p) =>
      p.type.startsWith("oauth-"),
    );
    const imports: string[] = [
      `import type { NextAuthOptions } from 'next-auth';`,
      `import { getServerSession } from 'next-auth';`,
      `import { PrismaAdapter } from '@auth/prisma-adapter';`,
      `import { prisma } from './db';`,
      `import CredentialsProvider from 'next-auth/providers/credentials';`,
      `import bcrypt from 'bcryptjs';`,
    ];

    const providerInstances: string[] = [
      `    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),`,
    ];

    for (const provider of oauthProviders) {
      switch (provider.type) {
        case "oauth-google":
          imports.push(
            `import GoogleProvider from 'next-auth/providers/google';`,
          );
          providerInstances.push(`    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),`);
          break;
        case "oauth-github":
          imports.push(
            `import GitHubProvider from 'next-auth/providers/github';`,
          );
          providerInstances.push(`    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),`);
          break;
        case "oauth-microsoft":
          imports.push(
            `import AzureADProvider from 'next-auth/providers/azure-ad';`,
          );
          providerInstances.push(`    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),`);
          break;
      }
    }

    return `${imports.join("\n")}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
${providerInstances.join("\n")}
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
  },
  pages: {
    signIn: '/login',
  },
};

export async function getServerAuthSession() {
  return getServerSession(authOptions);
}
`;
  }

  private generateAuthRoute(): string {
    return `import NextAuth from 'next-auth';
import { authOptions } from '@/server/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
`;
  }

  private generateLoginPage(project: Project): string {
    const oauthProviders = project.options.providers.filter((p) =>
      p.type.startsWith("oauth-"),
    );
    const oauthButtons = oauthProviders
      .map((p) => {
        const providerName = p.type.replace("oauth-", "");
        const capitalized =
          providerName.charAt(0).toUpperCase() + providerName.slice(1);
        return `        <button
          onClick={() => signIn('${providerName}', { callbackUrl: '/' })}
          className="w-full border p-2 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          Sign in with ${capitalized}
        </button>`;
      })
      .join("\n");

    const divider =
      oauthProviders.length > 0
        ? `
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
          </div>
        </div>`
        : "";

    return `'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Credenciais inválidas');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="space-y-4 w-full max-w-md p-8 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Entrar</h1>
        {error && (
          <p className="text-red-500 text-center text-sm" role="alert">{error}</p>
        )}
${oauthButtons}${divider}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
`;
  }

  private generateMiddleware(): string {
    return `import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/login' },
});

export const config = {
  matcher: ['/((?!api|_next|login|favicon.ico).*)'],
};
`;
  }
}
