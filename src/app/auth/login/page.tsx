'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        showToast('ログインしました', 'success');
        router.push(redirect);
      } else {
        setError('メールアドレスまたはパスワードが正しくありません');
      }
    } catch {
      setError('ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--card)] rounded-2xl border p-8">
      <h1 className="text-2xl font-bold text-center mb-8">ログイン</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="メールアドレス"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
        />

        <Input
          label="パスワード"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="********"
          required
        />

        {error && (
          <p className="text-sm text-[var(--error)] text-center">{error}</p>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          ログイン
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--muted)] mt-6">
        アカウントをお持ちでない方は{' '}
        <Link href={`/auth/signup?redirect=${redirect}`} className="text-[var(--primary)] hover:underline">
          新規登録
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center">読み込み中...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
