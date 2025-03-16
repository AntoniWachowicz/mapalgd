import { getSession } from 'next-auth/react';

/**
 * Checks if the user is authenticated
 */
export async function isAuthenticated(req) {
  const session = await getSession({ req });
  return !!session;
}

/**
 * Server-side redirect if not authenticated
 */
export async function requireAuth(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session }
  };
}

/**
 * Client-side authentication check
 */
export function withAuth(Component) {
  return function AuthComponent(props) {
    // Note: This is just a placeholder - when actually using this
    // you'll need to import useSession and useRouter from their respective packages
    /*
    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() => {
      if (status === 'loading') return;
      
      if (!session) {
        router.replace('/');
      }
    }, [session, status, router]);
    
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    
    if (!session) {
      return null;
    }
    */
    
    return <Component {...props} />;
  };
}