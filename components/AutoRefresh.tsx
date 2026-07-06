'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRefresh() {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh(); 
    }, 30000); // Har 30 seconds mein data sync
    return () => clearInterval(interval);
  }, [router]);
  return null;
}