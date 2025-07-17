# CLAUDE.md

このファイルはClaude Code (claude.ai/code)がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

これはRaycast拡張機能プロジェクトです。Raycast拡張機能は、macOSのRaycastランチャーの機能を拡張するTypeScriptベースのアプリケーションです。

## 開発コマンド

このプロジェクトが初期化される際、通常以下のコマンドが利用可能です：

- `npm run dev` - ホットリロード付きの開発モードを開始
- `npm run build` - 本番用に拡張機能をビルド
- `npm run lint` - ESLintでコード品質をチェック
- `npm run fix-lint` - 可能なリンティング問題を自動修正

## アーキテクチャノート

Raycast拡張機能は以下の主要パターンに従います：

- **Commands**: ユーザーが呼び出せる`package.json`で定義されたエントリーポイント
- **Components**: Raycastのライブラリ(@raycast/api)を使用するReactコンポーネント
- **Preferences**: package.jsonで定義されたユーザー設定可能な設定
- **Assets**: `assets/`ディレクトリに格納されたアイコンと画像
- **Utilities**: 通常`src/utils/`等に配置されるヘルパー関数

## 主要ファイル

- `package.json` - コマンド、設定、依存関係を含む拡張機能マニフェスト
- `src/` - メインソースコードディレクトリ
- `assets/` - アイコンと画像
- `tsconfig.json` - TypeScript設定

## Raycast固有のガイドライン

- `@raycast/api`からRaycastの組み込みUIコンポーネントを使用
- 一貫したUXのためにRaycastのデザインパターンに従う
- ユーザーフレンドリーなメッセージで適切なエラーハンドリングを実装
- ユーザー設定にはRaycastの設定システムを使用
- package.jsonの拡張機能マニフェストスキーマに従う

## Employee Directory固有アーキテクチャ

### コアデータフロー
1. **データロード**: `utils.ts`がローカルJSONファイルから社員データの読み込みを処理
2. **検索ロジック**: `search-employee.tsx`がFuse.jsを使用した重み付き優先度によるファジー検索：
   - 社員番号 (重み: 0.4)
   - 日本語氏名 (重み: 0.3) 
   - 英語氏名 (重み: 0.3)
   - ニックネーム (重み: 0.2)
   - メールアドレス (重み: 0.1)
3. **同期メカニズム**: `google-sheets.ts`が設定可能な間隔での自動同期を含むGoogle Sheets API統合を処理
4. **UIパターン**: Raycast Clipboard History類似の左右分割ビュー - 左に社員リスト、右に詳細

### データ構造
- **Employee**: `employeeId`, `nameJa`, `nameEn`, `nickname`, `email`, `employmentType`, `joinDate`, `status`を持つコアエンティティ
- **EmployeeData**: `employees[]`配列と`lastUpdated`タイムスタンプを持つコンテナ
- **Preferences**: データパス、Google Sheets統合、同期間隔、表示オプションの設定

### コマンド
- `search-employee`: 社員検索・表示のメインUIコマンド
- `sync-employee-data`: 手動データ同期用のバックグラウンドコマンド

### Google Sheets統合
- JSONキーファイルによるサービスアカウント認証を使用
- 設定可能な自動同期間隔をサポート（30分、1時間、2時間、4時間、手動）
- 同期失敗時のローカルデータへの優雅なフォールバック
- APIレスポンスのデータ検証とエラーハンドリング

### セキュリティ・データ管理
- 社員データは`employee-data.json`にローカル保存（gitから除外）
- サービスアカウントキーはバージョン管理から除外
- `employee-data.sample.json`でサンプルデータを提供
- 全社員属性のクリップボードコピー機能

### 開発セットアップ要件
- Node.js v22+（古いバージョンとの互換性問題）
- Raycast CLIのグローバルインストール（`npm install -g @raycast/api`）
- Raycastが拡張機能を実行する前にTypeScriptコンパイルが必要（`npx tsc`）
- TypeScriptコンパイル後に`ray build`でビルドが必要

### ブランチ戦略とワークフロー
- メインブランチ: `main`（本番用）
- フィーチャーブランチ: `feature/issue-{番号}-{説明}`
- バグ修正: `bugfix/issue-{番号}-{説明}`
- ドキュメント: `docs/{説明}`
- ホットフィックス: `hotfix/{説明}`
- Issue → ブランチ → PR → レビュー → マージのワークフローに従う

## コミット規約

### コミットメッセージ
- **言語**: 日本語で記述すること
- **構造**: 
  ```
  件名（変更内容の簡潔な要約）

  **変更内容:**
  - 具体的な変更点1
  - 具体的な変更点2
  - 具体的な変更点3

  **変更理由:**
  なぜこの変更が必要だったかの説明。
  バグの根本原因、機能追加の背景、改善の動機など。

  🤖 Generated with [Claude Code](https://claude.ai/code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### コミットメッセージの例
```
社員データのバリデーションを修正してnickname空文字を許可

**変更内容:**
- utils.tsの必須フィールドバリデーションから'nickname'を除外
- nickname空文字の社員データが正常に読み込まれるよう修正
- 有効な社員データが除外される問題を解決

**変更理由:**
Search Employeeコマンドが結果を表示しない不具合を修正。
employee-data.jsonに有効な社員データが存在するにも関わらず、
nicknameが空文字のレコードを無効データとして扱う過度に厳格な
バリデーション処理により、全てのレコードが除外されていた。
```

### 重要なポイント
- **What（何を）** と **Why（なぜ）** の両方を明記
- 変更理由はバグの根本原因や機能追加の背景を具体的に説明
- 技術的な詳細よりも、なぜその変更が必要だったかに焦点を当てる