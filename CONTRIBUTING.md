# Contributing to Employee Directory Raycast Extension

Employee Directory Raycast Extensionの開発に参加していただき、ありがとうございます！

## 🚀 開発ワークフロー

### 1. Issue の作成
新機能やバグ修正を行う前に、まずIssueを作成してください。

```bash
# GitHubで以下のテンプレートから選択
- 🐛 バグレポート
- ✨ 機能リクエスト  
- ❓ 質問・サポート
```

### 2. ブランチの作成
Issueに対応するフィーチャーブランチを作成します。

```bash
# メインブランチから最新を取得
git checkout main
git pull origin main

# フィーチャーブランチを作成
git checkout -b feature/issue-15-advanced-search-filters

# ブランチ命名規則
feature/issue-{番号}-{簡潔な説明}   # 新機能
bugfix/issue-{番号}-{簡潔な説明}    # バグ修正
docs/{内容}                        # ドキュメント更新
hotfix/{緊急修正内容}               # 緊急修正
```

### 3. 開発・テスト

```bash
# 依存関係のインストール
npm install

# 開発モードで起動
npm run dev

# TypeScriptチェック
npx tsc

# Linting
npm run lint
npm run fix-lint

# ビルド
npm run build
```

### 4. コミット
コミットメッセージは明確で具体的に書いてください。

```bash
git add .
git commit -m "Add advanced search filters for employee status

- Add status filter dropdown (active/inactive/all)
- Add employment type filter
- Update search logic to handle multiple filters
- Add tests for new filter functionality

Closes #15"
```

### 5. プッシュとPR作成

```bash
# ブランチをプッシュ
git push origin feature/issue-15-advanced-search-filters

# GitHubでPull Requestを作成
# PRテンプレートに従って詳細を記入
```

## 📋 開発ガイドライン

### コーディング規約
- **TypeScript**: 厳密な型付けを心がける
- **ESLint**: 設定に従ってコードを整形
- **命名**: 意味のある変数名・関数名を使用
- **コメント**: 複雑なロジックには日本語コメントを追加

### テスト
- 新機能には適切なテストを追加
- 既存のテストが通ることを確認
- 手動テストも忘れずに実行

### セキュリティ
- 機密情報（APIキー、個人情報）はコミットしない
- `.gitignore`の設定を確認

## 🔄 リリースフロー

### バージョン管理
- [Semantic Versioning](https://semver.org/) に従う
- `MAJOR.MINOR.PATCH` (例: 1.2.3)

### リリース手順
1. **開発完了**: feature ブランチでの開発・テスト完了
2. **PR作成**: main ブランチへのPull Request
3. **レビュー**: コードレビューとテスト
4. **マージ**: main ブランチにマージ
5. **タグ作成**: バージョンタグを作成
6. **リリース**: GitHub Releasesで公開
7. **CHANGELOG更新**: 変更内容を記録

## 🛠️ 開発環境セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/dai0916/employee-directory-raycast.git
cd employee-directory-raycast

# Node.js v22が必要
nvm install 22
nvm use 22

# 依存関係をインストール
npm install

# Raycast CLIをインストール
npm install -g @raycast/api

# サンプルデータをコピー
cp employee-data.sample.json employee-data.json

# ビルド
npx tsc
ray build

# Raycastにインポート
# Raycast > Import Extension > プロジェクトフォルダを選択
```

## 📚 参考資料

- [Raycast Extension API](https://developers.raycast.com/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [React ドキュメント](https://react.dev/)
- [Google Sheets API](https://developers.google.com/sheets/api)

## 💬 質問・サポート

開発中に質問がある場合は：

1. [Issue](https://github.com/dai0916/employee-directory-raycast/issues)で質問テンプレートを使用
2. 既存のIssueを検索して同様の質問がないか確認
3. [README](README.md)や[ドキュメント](GOOGLE_SHEETS_SETUP.md)を確認

## 🎉 コントリビューターへの感謝

このプロジェクトは皆様のコントリビューションによって成り立っています。  
どんな小さな改善でも大歓迎です！