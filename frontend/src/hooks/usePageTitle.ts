"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      "/": "Login",
    };

    const formatPathname = (path: string) => {
      const segments = path.replace(/^\//, '').split('/');

      const formattedSegments = segments.map(segment =>
        segment.charAt(0).toUpperCase() + segment.slice(1)
      );

      return formattedSegments.join(' ');
    };

    const titleSuffix = titleMap[pathname] || formatPathname(pathname);
    document.title = `Frontend - ${titleSuffix}`;
  }, [pathname]);
}