# Einstein Discovery 日本語版Lightningコンポーネント サンプルコード 
Einstein Discovery Writeback機能を利用する中で、Lightningページに、予測値/詳細/リコメンドを視覚的に分かりやすく表示するための日本語版Lightningコンポーネントのサンプルです。

## 構成
本GitリポジトリはSalesforceDXプロジェクト形式にて、以下のメタデータを含みます。
- Apexクラス
    - *jpEinsteinDiscoveryController*
    - *jpEinsteinDiscoveryControllerTest*

- Lightningコンポーネント
    - *jpEinsteinDiscovery* (**Einstein Discovery 日本語版**)

## ご利用方法
### 0.前提条件
Einstein Discovery Writeback機能を利用するために必要なすべての作業を完了します。

### 1.デプロイ
本SalesforceDXプロジェクトをSalesforce組織にデプロイします。

### 2.Lightningレコードページへのコンポーネント配置
デプロイ完了後、LightningアプリケーションビルダーのLightningコンポーネント一覧に表示されるコンポーネント **Einstein Discovery 日本語版** をLightningレコードページに配置し、プロパティ設定にて以下項目を設定します。
- 項目API名(予測値)　**※入力必須**
- 項目API名(予測の説明情報)　**※入力必須**
- 項目API名(リコメンド情報)　**※入力必須**
- ラベル（タイトル） 
- ラベル（予測値）
- ラベル（予測値の単位）
- ラベル（主な要因）
- ラベル（リコメンド）
- 基準値
- 色の反転

## 日本語化ローカライズ処理について
英語 => 日本語のローカライズ処理について、本Lightningコンポーネントの以下ファイルのlocalizeメソッドにて定義しています。

#### jpEinsteinDiscoveryHelper.js
```js
localize : function(objs){
    return objs.map(function(obj){
        const enText = obj.enText;
        const jpText = enText
        .replace(/^from\sthe\sbaseline$/, '基準値から')
        .replace(/^if\syou\schange\s(.+)\sto\s(.+)$/, '<b>$1</b> が <b>$2</b> になれば')
        .replace(/^because\sof\sother\sfactors$/, 'その他の要因')
        .replace(/\s(\S+)\sis\s(\S+)\sand/g, ' <b>$1</b> が <b>$2</b> かつ、')
        .replace(/\s(\S+)\sis\s(\S+)$/, ' <b>$1</b> が <b>$2</b> のため')
        .replace(/^because\s/, '');
        return Object.assign(obj, {jpText: jpText});               
    });
}
```

License
----
MIT

免責事項
----
このサンプルコードは、あくまで機能利用の1例を示すためのものであり、コードの書き方を推奨したり、機能提供を保証するものではありません。
