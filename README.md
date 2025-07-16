# Employee Directory - Raycast Extension

社員データベースを検索できるRaycast拡張機能です。インクリメンタル検索機能とクリップボードコピー機能を提供し、Google Sheetsとのリアルタイム同期に対応しています。

## 機能

- **インクリメンタル検索**: 社員番号、氏名（日本語/英語）、ニックネーム、メールアドレスで検索
- **Google Sheets連携**: スプレッドシートからデータを自動同期
- **クリップボードコピー**: 各項目をワンクリックでクリップボードにコピー
- **分割ビューUI**: Raycast Clipboard History風のインターフェース
- **多言語対応**: 日本語名・英語名に対応
- **在籍ステータス**: 在籍中/退職済み社員の表示切り替え

## 前提条件

- macOS
- Node.js v22+
- Raycast がインストール済み
- Raycast CLI (`npm install -g @raycast/cli`)

## インストール

### エンドユーザー向け（推奨）

本番環境用のワンライナーインストール：

```bash
curl -fsSL https://raw.githubusercontent.com/dai0916/employee-directory-raycast/main/install.sh | bash
```

これにより以下が実行されます：
- `~/.raycast-extensions/employee-directory` にインストール
- 全ての依存関係を自動でインストール
- 拡張機能をビルドして使用準備完了

### 開発者向け

開発・カスタマイズ用の手動インストール：

```bash
# リポジトリのクローン
git clone https://github.com/dai0916/employee-directory-raycast.git
cd employee-directory-raycast

# 依存関係のインストール
npm install

# サンプルデータのコピー
cp employee-data.sample.json employee-data.json

# 拡張機能のビルド
npm run build
```

Raycastに拡張機能をインポート：
1. Raycastを開く
2. `Import Extension` と入力
3. プロジェクトフォルダを選択

## 使用方法

1. Raycastを開き `Search Employee` と入力
2. 検索キーワードを入力（社員番号、氏名、ニックネーム、メールアドレス）
3. 結果から社員を選択
4. アクションを使用して情報をクリップボードにコピー：
   - メールアドレスをコピー
   - 社員番号をコピー
   - 日本語名をコピー
   - 英語名をコピー

### キーボードショートカット

- `⌘ + R`: データを再読み込み

## 設定

### 基本設定

Raycast設定で拡張機能の設定を行います：

- **Data Source Path**: `./employee-data.json`
- **Show Inactive Employees**: 退職済み社員を表示する場合はチェック

### Google Sheets連携（オプション）

自動データ同期については[Google Sheets連携設定ガイド](GOOGLE_SHEETS_SETUP.md)を参照してください。

必要な設定項目：
- **Google Sheets ID**: スプレッドシートのURLから取得するID
- **Service Account Key Path**: Google API認証情報のJSONファイルパス
- **Auto Sync Interval**: 同期間隔（30分、1時間、2時間、4時間、手動のみ）

## データ形式

拡張機能は以下のJSON形式の社員データを期待します：

```json
{
  "employees": [
    {
      "employeeId": "EMP001",
      "nameJa": "山田 太郎",
      "nameEn": "Taro Yamada",
      "nickname": "taro",
      "email": "taro.yamada@company.com",
      "employmentType": "正社員",
      "joinDate": "2023-01-01",
      "status": "active"
    }
  ],
  "lastUpdated": "2025-07-12T00:00:00.000Z"
}
```

## 開発

### 開発環境と本番環境の違い

| 項目 | 開発環境（手動） | 本番環境（ワンライナー） |
|------|---------------|-------------------|
| 配置場所 | 任意のディレクトリ | `~/.raycast-extensions/employee-directory` |
| 用途 | コード変更、デバッグ | 使用のみ |
| ホットリロード | ✅ `npm run dev` | ❌ |
| 自動セットアップ | ❌ 手動手順 | ✅ 完全自動 |
| 対象ユーザー | 開発者 | エンドユーザー |

### 開発コマンド

```bash
# ホットリロード付き開発モード
npm run dev

# 本番用ビルド
npm run build

# コードのリント
npm run lint

# リンティング問題の自動修正
npm run fix-lint
```

## ファイル構成

```
employee-directory-raycast/
├── src/
│   ├── search-employee.tsx     # メイン検索機能
│   ├── sync-employee-data.tsx  # データ同期機能
│   ├── google-sheets.ts        # Google Sheets API連携
│   ├── types.ts               # TypeScript型定義
│   └── utils.ts               # ユーティリティ関数
├── assets/
│   └── person.png             # 拡張機能アイコン
├── employee-data.sample.json   # サンプルデータファイル
├── package.json               # 拡張機能マニフェスト
└── README.md                  # このファイル
```

## セキュリティ

**重要**: 以下のファイルはバージョン管理から除外されており、絶対にコミットしないでください：

- `employee-data.json` - 実際の社員データ
- `service-account-*.json` - Google API認証情報

## トラブルシューティング

### 拡張機能が読み込まれない
- Node.js v22+がインストールされていることを確認
- `npm run build` でビルドし直す
- Raycast設定で正しいパスが設定されているか確認

### 検索結果が表示されない
- `employee-data.json` が存在し、有効なデータが含まれていることを確認
- 設定のデータソースパスを確認
- `⌘ + R` でデータを再読み込み

### Google Sheets同期の問題
- サービスアカウントがスプレッドシートにアクセス権限を持っているか確認
- Google Sheets IDと認証情報のパスを確認
- Google Cloud ConsoleでGoogle Sheets APIが有効になっているか確認

## 貢献

1. リポジトリをフォーク
2. フィーチャーブランチを作成
3. 変更を行う
4. 十分にテストを実施
5. プルリクエストを送信

## ライセンス

MIT License - 詳細は LICENSE ファイルを参照

## サポート

問題や質問については：
- [GitHub Issues](https://github.com/dai0916/employee-directory-raycast/issues)
- 詳細な手順は[使用方法ガイド](USAGE.md)を確認
- Google Sheets連携は[Google Sheets設定ガイド](GOOGLE_SHEETS_SETUP.md)を参照