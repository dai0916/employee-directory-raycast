# Google Sheets連携設定ガイド

## 📋 事前準備

Google Sheetsとの連携には以下が必要です：
- Google Cloud Platform（GCP）アカウント
- 人事データが入ったGoogle Spreadsheet
- 10分程度の設定時間

## 🛠️ ステップ1: Google Cloud Console設定

### 1.1 プロジェクト作成
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（例：`employee-directory-sync`）
3. プロジェクトを選択

### 1.2 Google Sheets APIの有効化
1. 「APIとサービス」→「ライブラリ」
2. 「Google Sheets API」を検索
3. 「有効にする」をクリック

### 1.3 サービスアカウント作成
1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「サービスアカウント」
3. 名前を入力（例：`employee-directory-service`）
4. 「作成して続行」

### 1.4 キーファイルのダウンロード
1. 作成したサービスアカウントをクリック
2. 「キー」タブ→「キーを追加」→「新しいキーを作成」
3. 「JSON」を選択してダウンロード
4. ファイルを安全な場所に保存（例：`~/google-service-account.json`）

## 📊 ステップ2: Google Spreadsheet準備

### 2.1 スプレッドシート形式
**A列からH列の順で以下のデータを配置：**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| 社員番号 | 日本語名 | 英語名 | ニックネーム | メールアドレス | 雇用形態 | 入社日 | ステータス |
| EMP001 | 山田 太郎 | Taro Yamada | タロー | taro.yamada@company.com | 正社員 | 2020-04-01 | active |

**重要事項：**
- 1行目はヘッダー行（Extension側で自動的にスキップ）
- ステータス列は「active」または「inactive」
- 日付形式：YYYY-MM-DD

### 2.2 サービスアカウントに権限付与
1. スプレッドシートを開く
2. 「共有」ボタンをクリック
3. サービスアカウントのメールアドレスを追加
   - 例：`employee-directory-service@your-project.iam.gserviceaccount.com`
4. 権限を「閲覧者」に設定
5. 「送信」

### 2.3 スプレッドシートIDの取得
URLから抽出：
```
https://docs.google.com/spreadsheets/d/[この部分がスプレッドシートID]/edit
```

## ⚙️ ステップ3: Raycast Extension設定

### 3.1 設定画面での入力
1. Raycastで「Search Employee」を起動
2. ⌘ + , で設定画面を開く
3. 以下を入力：

```
Data Source Path: ./employee-data.json
Google Sheets ID: [ステップ2.3で取得したID]
Service Account Key Path: /Users/yourname/google-service-account.json
Auto Sync Interval: 1 hour
Show Inactive Employees: ✓
```

### 3.2 初回同期テスト
1. 設定を保存
2. Raycastで「Sync Employee Data」コマンドを実行
3. 成功メッセージが表示されることを確認

## 🔍 トラブルシューティング

### エラー: "No data found in the spreadsheet"
- スプレッドシートが空でないか確認
- ヘッダー行以外にデータがあるか確認

### エラー: "Permission denied"
- サービスアカウントに共有権限があるか確認
- サービスアカウントのメールアドレスが正しいか確認

### エラー: "Invalid credentials"
- JSONキーファイルのパスが正しいか確認
- JSONファイルが破損していないか確認

### エラー: "API not enabled"
- Google Sheets APIが有効化されているか確認
- 正しいプロジェクトで作業しているか確認

## 📝 運用のコツ

### データ更新の流れ
1. Google Sheetsでデータを更新
2. Raycast Extension側で自動同期（設定した間隔）
3. または手動で「Sync Employee Data」を実行

### セキュリティのベストプラクティス
- サービスアカウントキーは適切な権限で保護
- 定期的にアクセスログを確認
- 不要になったサービスアカウントは削除

---

## ✅ 設定完了チェックリスト

- [ ] Google Cloud Projectの作成
- [ ] Google Sheets APIの有効化
- [ ] サービスアカウントの作成
- [ ] JSONキーファイルのダウンロード
- [ ] スプレッドシートの準備
- [ ] サービスアカウントへの共有権限付与
- [ ] スプレッドシートIDの取得
- [ ] Raycast Extension設定の入力
- [ ] 初回同期テストの実行

全て完了したら、Google Sheetsとの連携が完了です！