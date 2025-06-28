'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export function useRequireAuth(redirectTo = '/login') {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_token='))
      ?.split('=')[1];

    if (!token) {
      router.push(redirectTo);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        document.cookie = 'user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push(redirectTo);
        return;
      }

      setAuthChecked(true);
    } catch (err) {
      console.error('Invalid token', err);
      router.push(redirectTo);
    }
  }, [router, redirectTo]);

  return authChecked;
}
