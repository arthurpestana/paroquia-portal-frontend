'use client';

import { hasToken, isAdminToken, isTokenExpired } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!hasToken() || isTokenExpired() || !isAdminToken()) {
      router.replace('/auth');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (isAuthorized === null) {
    return null; 
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
        {children}
    </div>
  )
}