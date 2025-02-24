import { sanitizeUser } from '~/server/utils/auth';
import db from '~/utils/db';

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user }) {

    // find current user
    let currentUser = db.user.findUnique({
      where: {
        email: user.email
      }
    });

    // if user does not exist then create the user
    if (!currentUser) {
      currentUser = await db.user.create({
        data: {
          email: user.email,
          name: user.name,
          avatarUrl: user.avatar_url
        }
      });
    }

    // check if the user does have an oauth account
    const oAuthAccount = await db.oauthAccount.findFirst({
      where:{
        userId: currentUser.id
      }
    });
    
    // if the user does not have oauth account then create the oauth account
    if (!oAuthAccount) {
      await db.oauthAccount.create({
        data:{
          userId: currentUser.id,
          providerId: 'github',
          providerUserId: user.id + '' // convert the id to string by adding + '', schema.primsa providerUserId constraint is on string,
        }
      });
    };

    const transformedUser = sanitizeUser(currentUser);

    if (transformedUser) {
      await setUserSession(event, {
        user: transformedUser
      });
    }

    return sendRedirect(event, '/');
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})