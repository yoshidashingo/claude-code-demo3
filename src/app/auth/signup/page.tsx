'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { signup } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で設定してください');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(email, password, name);
      if (success) {
        showToast('アカウントを作成しました', 'success');
        router.push(redirect);
      } else {
        setError('このメールアドレスは既に使用されています');
      }
    } catch {
      setError('登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--card)] rounded-2xl border p-8">
      <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="お名前"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="山田 太郎"
          required
        />

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
          placeholder="6文字以上"
          required
        />

        <Input
          label="パスワード（確認）"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="パスワードを再入力"
          required
        />

        {error && (
          <p className="text-sm text-[var(--error)] text-center">{error}</p>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          登録する
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--muted)] mt-6">
        既にアカウントをお持ちの方は{' '}
        <Link href={`/auth/login?redirect=${redirect}`} className="text-[var(--primary)] hover:underline">
          ログイン
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center">読み込み中...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
