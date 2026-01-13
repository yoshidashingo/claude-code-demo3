'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?redirect=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--muted)]">読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">プロフィール</h1>

      <div className="bg-[var(--card)] rounded-2xl border p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-[var(--muted)]">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">アカウント情報</h3>
            <div className="text-sm text-[var(--muted)] space-y-1">
              <p>メールアドレス: {user.email}</p>
              <p>ユーザーID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border p-6">
        <h3 className="font-medium mb-4">アカウント操作</h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/orders')}
          >
            注文履歴を見る
          </Button>
          <Button
            variant="ghost"
            className="w-full text-[var(--error)]"
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
}
