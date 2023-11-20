import { isNotEmpty } from "lib";
import { Provider } from "next-auth/providers";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const providers: Provider[] = [];
if (
  isNotEmpty(process.env.GITHUB_CLIENT_ID) &&
  isNotEmpty(process.env.GITHUB_CLIENT_SECRET)
)
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
if (
  isNotEmpty(process.env.GOOGLE_CLIENT_ID) &&
  isNotEmpty(process.env.GOOGLE_CLIENT_SECRET)
)
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
if (
  isNotEmpty(process.env.FACEBOOK_CLIENT_ID) &&
  isNotEmpty(process.env.FACEBOOK_CLIENT_SECRET)
)
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
