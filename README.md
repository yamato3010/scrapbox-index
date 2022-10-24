# scrapbox-index

scrapboxはpublicのプロジェクトにしても、Googleにクロールされにくい（Search Consoleに登録できない）ので、それを何とか解消するためのもの。

## 実行環境

- Node.js: 14.18.0
- express: 4.18.2

## 簡単な仕組みの解説

- <https://yamato-scrapbox.herokuapp.com/scrapbox/>`{scrapboxのタイトル}`
にアクセスすると対応するscrapboxのページにリダイレクトされるようになっている
  - Googleからは、もともと`https://yamato-scrapbox.herokuapp.com/`に存在したページが`https://https://scrapbox.io/yamato3010/`に移動したように見える
- scrapboxのapiからrssフィードを取得し、そこからタイトルを抽出しサイトマップを作成している。
  - これによりSearch Consoleがscrapboxの記事（正確には記事にリダイレクトするダミーのページ）をクロールしやすくなる（はず）

## 参考

- <https://scrapbox.io/nwtgck/%E7%AE%A1%E7%90%86%E5%A4%96%E3%81%AEWeb%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92Google%E3%81%AE%E6%A4%9C%E7%B4%A2%E7%B5%90%E6%9E%9C%E3%81%AB%E8%BC%89%E3%81%9B%E3%81%9F%E3%81%84>
