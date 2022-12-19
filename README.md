# scrapbox-index

scrapboxはpublicのプロジェクトにしても、Googleにクロールされにくい（Search Consoleに登録できない）ので、それを何とか解消するためのもの。  
試験段階なので効果があるかはまだわかりません。  
何か進展があったらこちらに書き込みますが、[こちら](https://scrapbox.io/yamato3010/Scrapbox%E3%81%AE%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E6%A4%9C%E7%B4%A2%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%B3%E3%81%AB%E8%BC%89%E3%81%9B%E3%81%9F%E3%81%84)のほうが更新頻度高めです。

## 実行環境

- Node.js: 14.18.0
- express: 4.18.2
- ~~Herokuでデプロイ~~
  - Heroku無料プラン廃止により、Glitchへ移行

## 簡単な仕組みの解説

- <https://scrapbox-index.glitch.me/scrapbox/>`{scrapboxのタイトル}`
にアクセスすると対応するscrapboxのページにリダイレクトされるようになっている
  - Googleからは、もともと`https://scrapbox-index.glitch.me`に存在したページが`https://https://scrapbox.io/yamato3010/`に移動したように見える
- scrapboxのapiからrssフィードを取得し、そこからタイトルを抽出しサイトマップを作成している。
  - `https://yamato-scrapbox.herokuapp.com/update`にアクセスすると、サイトマップを更新する関数が呼ばれる
    - これをGoogleAppsScriptの定期実行することによって、サイトマップ更新を自動化している。 
  - これによりSearch Consoleがscrapboxの記事（正確には記事にリダイレクトするダミーのページ）をクロールしやすくなる（はず）

## 参考

- <https://scrapbox.io/nwtgck/%E7%AE%A1%E7%90%86%E5%A4%96%E3%81%AEWeb%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92Google%E3%81%AE%E6%A4%9C%E7%B4%A2%E7%B5%90%E6%9E%9C%E3%81%AB%E8%BC%89%E3%81%9B%E3%81%9F%E3%81%84>
