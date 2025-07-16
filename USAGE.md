# Employee Directory Extension 使用方法

## 📋 はじめに

社員データベースを簡単に検索し、必要な情報をクリップボードにコピーできるRaycast Extensionです。

## 🚀 初回セットアップ（5分で完了）

### 1. Extension設定の変更

1. **Raycastを開く** (⌘ + Space)
2. **「Search Employee」** と入力
3. Extension候補が表示されたら、**⌘ + ,** を押して設定画面を開く
4. 以下のように設定：

```
Data Source Path: ./employee-data.json
Google Sheets ID: （今は空のままでOK）
Service Account Key Path: （今は空のままでOK）
Auto Sync Interval: Manual only
Show Inactive Employees: ✓ チェックを入れる
```

### 2. 動作確認

1. 設定を保存して設定画面を閉じる
2. 再度 **「Search Employee」** と入力してEnter
3. 8名のサンプル社員データが表示されるはず

## 🔍 基本的な使い方

### 検索方法
- **社員番号で検索**: 「EMP001」
- **日本語名で検索**: 「山田」「太郎」
- **英語名で検索**: 「Taro」「Yamada」
- **ニックネームで検索**: 「タロー」
- **メールアドレスで検索**: 「taro.yamada」

### データのコピー方法

1. 検索結果から対象の社員を選択
2. 以下のアクションが利用可能：
   - **Copy Employee ID**: 社員番号をコピー
   - **Copy Japanese Name**: 日本語名をコピー
   - **Copy English Name**: 英語名をコピー
   - **Copy Nickname**: ニックネームをコピー
   - **Copy Email**: メールアドレスをコピー
   - **Copy All Info**: 全情報を整形してコピー

### キーボードショートカット
- **⌘ + R**: データを再読み込み

## 📊 サンプルデータ

以下の8名のサンプルデータが含まれています：

| 社員番号 | 日本語名 | 英語名 | ニックネーム | 雇用形態 | ステータス |
|---------|---------|---------|-------------|---------|-----------|
| EMP001 | 山田太郎 | Taro Yamada | タロー | 正社員 | 在籍 |
| EMP002 | 佐藤花子 | Hanako Sato | ハナちゃん | 正社員 | 在籍 |
| EMP003 | 田中次郎 | Jiro Tanaka | ジロー | 契約社員 | 在籍 |
| EMP004 | 鈴木美咲 | Misaki Suzuki | みーちゃん | 正社員 | 在籍 |
| EMP005 | 高橋健一 | Kenichi Takahashi | ケンケン | アルバイト | 在籍 |
| EMP006 | 伊藤由美 | Yumi Ito | ゆみりん | 正社員 | 退職済み |
| EMP007 | 渡辺直樹 | Naoki Watanabe | ナオキ | 正社員 | 在籍 |
| EMP008 | 中村あやか | Ayaka Nakamura | あやちゃん | 契約社員 | 在籍 |

## 🔧 トラブルシューティング

### データが表示されない場合
1. Data Source Pathが正しく設定されているか確認
2. ファイルパスに間違いがないか確認
3. ⌘ + R でデータを再読み込み

### 検索結果が出ない場合
- あいまい検索に対応しているので、完全一致でなくても検索可能
- 少ない文字数でも検索できます（例：「山」「Ta」など）

## 📝 次のステップ（Google Sheets連携）

実際の人事データと連携する場合は、Google Sheets連携の設定が必要です。
設定方法は別途ご案内します。

---

## 🎯 使用例

1. **「山田」** と検索 → 山田太郎が表示
2. 山田太郎を選択
3. **Copy Email** を選択
4. `taro.yamada@company.com` がクリップボードにコピーされる
5. 他のアプリにペースト（⌘ + V）