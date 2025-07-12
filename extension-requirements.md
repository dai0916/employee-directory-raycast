# Raycast Extension 要件定義 - 人事DB検索システム

## 基本情報
- **Extension名**: Employee Directory
- **説明**: 会社の人事データベースをインクリメンタル検索し、必要な属性をクリップボードにコピーできるExtension
- **カテゴリ**: Productivity

## コマンド定義
### コマンド1: 社員検索
- **コマンド名**: search-employee
- **タイトル**: Search Employee
- **説明**: Search employees by employee ID, name, nickname, or email
- **モード**: view（検索結果のリスト表示）
- **引数**: optional（社員番号、姓名、ニックネーム、メールアドレスの一部）
- **キーワード**: employee, staff, directory, search, member

### コマンド2: データ同期
- **コマンド名**: sync-employee-data
- **タイトル**: Sync Employee Data
- **説明**: Sync employee data from Google Sheets to local JSON file
- **モード**: no-view（即座に同期実行）
- **引数**: なし
- **キーワード**: sync, update, refresh, data

## UI/UX要件
- **表示する情報**: 
  - 社員番号、姓名（日本語）、姓名（英語）、ニックネーム、メールアドレス、雇用形態、入社日、在籍ステータス
- **アクション**: 
  - **Copy Employee ID**: 社員番号をクリップボードにコピー
  - **Copy Japanese Name**: 日本語姓名をクリップボードにコピー
  - **Copy English Name**: 英語姓名をクリップボードにコピー
  - **Copy Nickname**: ニックネームをクリップボードにコピー
  - **Copy Email**: メールアドレスをクリップボードにコピー
  - **Copy All Info**: 全属性を整形してクリップボードにコピー
- **検索機能**: リアルタイムインクリメンタル検索
- **フィルタリング**: 
  - 雇用形態別フィルタ（正社員、契約社員、アルバイト等）
  - 在籍ステータス別フィルタ（在籍中、退職済み）

## 設定項目 (Preferences)
- **Data Source Path**: 
  - タイプ: textfield
  - デフォルト値: ~/employee-data.json
  - 必須/任意: 必須
  - 説明: 社員データファイルのパス
- **Google Sheets ID**: 
  - タイプ: textfield
  - デフォルト値: 空
  - 必須/任意: 必須
  - 説明: GoogleスプレッドシートのID（URLから抽出）
- **Service Account Key Path**: 
  - タイプ: textfield
  - デフォルト値: ~/google-service-account.json
  - 必須/任意: 必須
  - 説明: Google API認証用サービスアカウントJSONファイルのパス
- **Auto Sync Interval**: 
  - タイプ: dropdown
  - 選択肢: 30分, 1時間, 2時間, 4時間, 手動のみ
  - デフォルト値: 1時間
  - 必須/任意: 任意
  - 説明: 自動同期の間隔
- **Show Inactive Employees**: 
  - タイプ: checkbox
  - デフォルト値: false
  - 必須/任意: 任意
  - 説明: 退職済み社員も表示するか

## 外部連携
- **API**: Google Sheets API v4（同期機能用）
- **認証方式**: Google Service Account（JSONキーファイル）
- **必要なパーミッション**: 
  - ファイルシステムアクセス
  - Google Sheetsの読み取り専用アクセス

## アセット
- **アイコン**: Raycast提供のPersonアイコン
- **その他画像**: なし

## 技術要件
- **依存ライブラリ**: 
  - **@raycast/api**: Raycast API
  - **fuse.js**: 高度な検索機能（あいまい検索対応）
  - **googleapis**: Google Sheets API v4クライアント
- **データ保存**: 
  - **JSONファイル**: ローカルファイルシステムにJSONファイルとして保存
  - **Cache**: 検索結果とAPI結果の一時キャッシュ
  - **LastSync**: 最終同期時刻の記録
- **キャッシュ**: 
  - ファイル読み込み結果をメモリにキャッシュ
  - 同期間隔チェックによる効率化
- **エラーハンドリング**: 
  - ファイル読み込みエラー時のshowToast
  - Google API接続エラー時のfallback
  - データ形式エラー時のfallback
  - ネットワークエラー時の既存データ使用

## データ管理方法の提案

### 推奨方式: JSONファイル
```json
{
  "employees": [
    {
      "employeeId": "EMP001",
      "nameJa": "山田太郎",
      "nameEn": "Taro Yamada",
      "nickname": "タロー",
      "email": "taro.yamada@company.com",
      "employmentType": "正社員",
      "joinDate": "2020-04-01",
      "status": "active"
    }
  ]
}
```

### その他の選択肢
1. **CSVファイル**: Excelからの移行が簡単
2. **SQLiteファイル**: より高度なクエリが必要な場合
3. **外部API**: 人事システムとの連携が必要な場合

## その他の要件
- **パフォーマンス**: 1000件の社員データでも瞬時に検索結果表示
- **アクセシビリティ**: キーボードナビゲーション対応
- **多言語対応**: 日本語UIに対応
- **セキュリティ**: 機密情報のため、ローカルファイルのみでクラウド連携なし