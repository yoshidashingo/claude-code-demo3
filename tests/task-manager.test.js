import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf-8');

function setupDOM() {
  document.documentElement.innerHTML = html;
  // localStorageをモック
  const store = {};
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
  });
  // アプリ初期化スクリプトを実行
  const scriptEl = document.querySelector('script');
  if (scriptEl && scriptEl.textContent) {
    eval(scriptEl.textContent);
  }
}

function getApp() {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');
  const taskList = document.getElementById('task-list');
  const counter = document.getElementById('task-counter');
  const filterAll = document.querySelector('[data-filter="all"]');
  const filterActive = document.querySelector('[data-filter="active"]');
  const filterCompleted = document.querySelector('[data-filter="completed"]');
  return { input, addBtn, taskList, counter, filterAll, filterActive, filterCompleted };
}

function addTask(title) {
  const { input, addBtn } = getApp();
  input.value = title;
  addBtn.click();
}

function getTaskItems() {
  return document.querySelectorAll('#task-list li');
}

describe('タスク管理アプリ', () => {
  beforeEach(() => {
    setupDOM();
  });

  // ============================================
  // タスク追加
  // ============================================
  describe('タスク追加', () => {
    it('タスク名を入力して追加ボタンをクリックすると、未完了状態でリストに追加される', () => {
      addTask('テストタスク');
      const items = getTaskItems();
      expect(items.length).toBe(1);
      expect(items[0].textContent).toContain('テストタスク');
      const checkbox = items[0].querySelector('input[type="checkbox"]');
      expect(checkbox.checked).toBe(false);
    });

    it('タスク名を入力してEnterキーを押すと、タスクが追加される', () => {
      const { input } = getApp();
      input.value = 'Enterで追加';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      const items = getTaskItems();
      expect(items.length).toBe(1);
      expect(items[0].textContent).toContain('Enterで追加');
    });

    it('空文字を入力して追加を試みると、タスクが追加されない', () => {
      addTask('');
      expect(getTaskItems().length).toBe(0);
    });

    it('空白のみを入力して追加を試みると、タスクが追加されない', () => {
      addTask('   ');
      expect(getTaskItems().length).toBe(0);
    });

    it('タスク追加後、入力フィールドがクリアされる', () => {
      addTask('タスク');
      const { input } = getApp();
      expect(input.value).toBe('');
    });
  });

  // ============================================
  // タスク完了
  // ============================================
  describe('タスク完了', () => {
    it('チェックボックスをクリックすると、完了状態がトグルされる', () => {
      addTask('完了テスト');
      const checkbox = getTaskItems()[0].querySelector('input[type="checkbox"]');
      checkbox.click();
      expect(checkbox.checked).toBe(true);
      checkbox.click();
      expect(checkbox.checked).toBe(false);
    });

    it('完了状態のタスクには取り消し線が表示される', () => {
      addTask('取り消し線テスト');
      const item = getTaskItems()[0];
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.click();
      const label = item.querySelector('.task-title');
      const style = window.getComputedStyle(label);
      expect(label.classList.contains('completed') || style.textDecoration.includes('line-through')).toBe(true);
    });
  });

  // ============================================
  // タスク削除
  // ============================================
  describe('タスク削除', () => {
    it('削除ボタンをクリックすると、タスクがリストから削除される', () => {
      addTask('削除テスト');
      expect(getTaskItems().length).toBe(1);
      const deleteBtn = getTaskItems()[0].querySelector('.delete-btn');
      deleteBtn.click();
      expect(getTaskItems().length).toBe(0);
    });
  });

  // ============================================
  // タスク編集
  // ============================================
  describe('タスク編集', () => {
    it('タスク名をダブルクリックすると、編集可能な入力フィールドに変わる', () => {
      addTask('編集テスト');
      const title = getTaskItems()[0].querySelector('.task-title');
      title.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
      const editInput = getTaskItems()[0].querySelector('.edit-input');
      expect(editInput).not.toBeNull();
      expect(editInput.value).toBe('編集テスト');
    });

    it('編集中にEnterキーを押すと、変更が保存される', () => {
      addTask('編集前');
      const title = getTaskItems()[0].querySelector('.task-title');
      title.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
      const editInput = getTaskItems()[0].querySelector('.edit-input');
      editInput.value = '編集後';
      editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(getTaskItems()[0].querySelector('.task-title').textContent).toBe('編集後');
    });

    it('編集中にEscキーを押すと、変更が破棄される', () => {
      addTask('元のタスク');
      const title = getTaskItems()[0].querySelector('.task-title');
      title.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
      const editInput = getTaskItems()[0].querySelector('.edit-input');
      editInput.value = '変更したタスク';
      editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(getTaskItems()[0].querySelector('.task-title').textContent).toBe('元のタスク');
    });

    it('空文字で編集を確定すると、元のタスク名が維持される', () => {
      addTask('空文字テスト');
      const title = getTaskItems()[0].querySelector('.task-title');
      title.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
      const editInput = getTaskItems()[0].querySelector('.edit-input');
      editInput.value = '';
      editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(getTaskItems()[0].querySelector('.task-title').textContent).toBe('空文字テスト');
    });
  });

  // ============================================
  // フィルタリング
  // ============================================
  describe('フィルタリング', () => {
    beforeEach(() => {
      addTask('未完了タスク1');
      addTask('未完了タスク2');
      addTask('完了タスク');
      const items = getTaskItems();
      items[2].querySelector('input[type="checkbox"]').click();
    });

    it('「すべて」フィルタですべてのタスクが表示される', () => {
      const { filterAll } = getApp();
      filterAll.click();
      const visible = [...getTaskItems()].filter(li => li.style.display !== 'none');
      expect(visible.length).toBe(3);
    });

    it('「未完了」フィルタで未完了タスクのみ表示される', () => {
      const { filterActive } = getApp();
      filterActive.click();
      const visible = [...getTaskItems()].filter(li => li.style.display !== 'none');
      expect(visible.length).toBe(2);
    });

    it('「完了済み」フィルタで完了済みタスクのみ表示される', () => {
      const { filterCompleted } = getApp();
      filterCompleted.click();
      const visible = [...getTaskItems()].filter(li => li.style.display !== 'none');
      expect(visible.length).toBe(1);
    });

    it('選択中のフィルタボタンが視覚的に区別される', () => {
      const { filterActive } = getApp();
      filterActive.click();
      expect(filterActive.classList.contains('active')).toBe(true);
    });
  });

  // ============================================
  // 残りタスク数
  // ============================================
  describe('残りタスク数', () => {
    it('未完了タスクの件数が表示される', () => {
      addTask('タスク1');
      addTask('タスク2');
      const { counter } = getApp();
      expect(counter.textContent).toContain('2件の未完了タスク');
    });

    it('タスクを完了すると件数が減る', () => {
      addTask('タスク1');
      addTask('タスク2');
      getTaskItems()[0].querySelector('input[type="checkbox"]').click();
      const { counter } = getApp();
      expect(counter.textContent).toContain('1件の未完了タスク');
    });

    it('タスクが0件の場合「0件の未完了タスク」と表示される', () => {
      const { counter } = getApp();
      expect(counter.textContent).toContain('0件の未完了タスク');
    });
  });

  // ============================================
  // データ永続化
  // ============================================
  describe('データ永続化', () => {
    it('タスク追加時にlocalStorageに保存される', () => {
      addTask('保存テスト');
      expect(localStorage.setItem).toHaveBeenCalled();
      const lastCall = localStorage.setItem.mock.calls[localStorage.setItem.mock.calls.length - 1];
      const saved = JSON.parse(lastCall[1]);
      expect(saved.length).toBe(1);
      expect(saved[0].title).toBe('保存テスト');
    });

    it('タスク完了時にlocalStorageに保存される', () => {
      addTask('完了保存テスト');
      localStorage.setItem.mockClear();
      getTaskItems()[0].querySelector('input[type="checkbox"]').click();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('タスク削除時にlocalStorageに保存される', () => {
      addTask('削除保存テスト');
      localStorage.setItem.mockClear();
      getTaskItems()[0].querySelector('.delete-btn').click();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('アプリ読み込み時にlocalStorageからデータが復元される', () => {
      const tasksData = [{ id: 'test-1', title: '復元タスク', completed: false, createdAt: new Date().toISOString() }];
      // setupDOM内でlocalStorageを再構築するため、storeに事前セットする
      const store = { 'task-manager-tasks': JSON.stringify(tasksData) };
      document.documentElement.innerHTML = html;
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => store[key] ?? null),
        setItem: vi.fn((key, value) => { store[key] = String(value); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(),
      });
      const scriptEl = document.querySelector('script');
      if (scriptEl && scriptEl.textContent) eval(scriptEl.textContent);
      const items = getTaskItems();
      expect(items.length).toBe(1);
      expect(items[0].textContent).toContain('復元タスク');
    });
  });
});
