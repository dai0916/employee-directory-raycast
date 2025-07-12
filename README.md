# Employee Directory - Raycast Extension

社員データベースを検索できるRaycast拡張機能です。Google Sheetsとの連携により、リアルタイムでデータを同期できます。

## 機能

- **インクリメンタル検索**: 社員番号、氏名（日本語/英語）、ニックネーム、メールアドレスで検索
- **Google Sheets連携**: スプレッドシートからデータを自動同期
- **コピー機能**: 各項目をクリップボードにコピー
- **左右分割UI**: Raycast Clipboard Historyライクなインターフェース

## 🚀 クイックインストール

### ワンライナーインストール（推奨）

```bash
curl -fsSL https://raw.githubusercontent.com/dai0916/employee-directory-raycast/main/install.sh | bash
```

### 手動インストール

#### 1. プロジェクトのクローン

```bash
git clone https://github.com/dai0916/employee-directory-raycast.git
cd employee-directory-raycast
```

#### 2. 依存関係のインストール

```bash
# Node.js v22が必要
nvm install 22
nvm use 22

# 依存関係のインストール
npm install

# Raycast CLIのインストール
npm install -g @raycast/api
```

#### 3. データファイルの準備

```bash
# サンプルデータをコピー
cp employee-data.sample.json employee-data.json
```

#### 4. ビルド

```bash
# TypeScriptコンパイル
npx tsc

# Raycastビルド
ray build
```

#### 5. Raycastへのインポート

1. Raycastを開く
2. `Import Extension`と入力
3. プロジェクトフォルダを選択

## 📱 別端末での使用

### 新しいMacでの使用方法

1. **クイックインストール**:
```bash
curl -fsSL https://raw.githubusercontent.com/dai0916/employee-directory-raycast/main/install.sh | bash
```

2. **Raycastでインポート**:
   - Raycastを開く
   - `Import Extension`と入力
   - `~/.raycast-extensions/employee-directory` を選択

3. **設定の調整**:
   - Raycast設定でExtension Preferencesを開く
   - パスを新しい端末用に調整
   - Google Sheets設定を再設定（必要に応じて）

## Google Sheets連携設定

詳細は `GOOGLE_SHEETS_SETUP.md` を参照してください。

### 必要な設定

1. **Google Sheets ID**: スプレッドシートのURL内のID
2. **Service Account Key**: Google API認証用のJSONファイル
3. **データソースパス**: `employee-data.json`のパス

## 使用方法

1. Raycastで `Search Employee` コマンドを実行
2. 検索したい社員の情報を入力
3. 結果を選択して詳細を表示
4. 右側のアクションから各項目をコピー

## セキュリティ注意事項

- `employee-data.json`: 実際の社員データ（Git管理対象外）
- `service-account-*.json`: Google API認証情報（Git管理対象外）
- これらのファイルは絶対にコミットしないでください

## ファイル構成

```
raycast-extension/
├── src/
│   ├── search-employee.tsx     # メイン検索機能
│   ├── sync-employee-data.tsx  # データ同期機能
│   ├── google-sheets.ts        # Google Sheets API
│   ├── types.ts               # TypeScript型定義
│   └── utils.ts               # ユーティリティ関数
├── assets/
│   └── person.png             # アイコン
├── employee-data.sample.json   # サンプルデータ
├── package.json               # 拡張機能設定
└── README.md                  # このファイル
```

## 開発

```bash
# 開発モードで起動
npm run dev

# リント
npm run lint

# リント自動修正
npm run fix-lint
```