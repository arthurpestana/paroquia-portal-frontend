'use client';

import { NavBarSide } from "@/components/adminComp/NavBarSide";
import { MainContent } from "@/components/structure/MainContent";
import { hasToken, isAdminToken, isTokenExpired } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import styles from './styles.module.scss'
import { LoadingComp } from "@/components/comp/LoadingComp";

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
    return <LoadingComp/>
  }

  return (
    <div className={styles.admin__layout}>
      <NavBarSide/>
      <MainContent>
        {children}
      </MainContent>
    </div>
  )
}