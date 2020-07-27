---
template: post
slug: gatsby-twitter-YouTube
title: GatsbyでTwitter, YouTubeの埋め込みを簡単に実現する（リンクベタ書きで埋め込み完了）
date: 2020-07-27
category: gatsby
tags:
  - gatsby
socialImage: /media/castle-800-419.jpg
---

Wordpress のようにリンクを貼るだけで Twitter のツイートや YouTube の画像を埋め込むことができないだろうか？そんな悩みを解決する Plugin をも Gatsby には用意されていた。これば便利で仕方がない！！

## どんなことが実現できるか？

マークダウンファイルに下記の様にリンクをベタ書きするだけで埋め込みが完了するのだ。

![oembed-1](/media/oembed-1.png)

この記載の結果はこちら

![oembed-2](/media/oembed-2.png)

ワードプレスでは当たり前な感じになっている埋め込みが簡単にできるわけです。

この機能を実現する Plugin がこちら

## Gatsby Remark Oembed Plugin

[gatsby-remark-oembed](https://github.com/raae/gatsby-remark-oembed)

こちらから取得できる。インストール方法は Gatsby システムを周到しているのでとても簡単だ

### Plugin のインストール

```bash
npm install @raae/gatsby-remark-oembed
```

### gatsby-config.js に設定追加

gatsby-remark-oembed は gatsby-transformer-remark の Plugin として機能するので Plugin の Plugin として登録する必要がある。

なにか Gatsby のテーマを使っていると gatsby-transformer-remark にはすでに Plugin が追加されている可能性がたかいと思う。その時は Plugins:[]の中に追加する形で挿入しよう。

この設定は私が使っている設定だ。ポイントとしては usePrefix を off にすることにより、べたで書いたリンクを埋め込み形式に変換してくれる。

inculude にある(twitter,Instagram,YouTtube)だけが、この機能に対応するようにしている。SNS は多岐にわたってサポートしているけれども、対応する SNS がふえていくとその分埋め込み JavaScript が増えるとのことでその点はケアしたい。

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            usePrefix: false,
            providers: {
              include: ['Twitter', 'Instagram', 'YouTube'],
              settings: {
                Twitter: { maxwidth: 300 },
                Instagram: { hidecaption: true },
              },
            },
          },
        },
      ],
    },
  },
];
```

## 追加オプション

実はこの機能は WordPress などでつかっている機能と同じ構造を利用している oembed という統一規格をベースにそれぞれのサービスは埋め込み iframe を提供してくれている。今回のプラグインはその機能を活用している。

oembed 問い合わせを行うときにオプションの指定ができることがある。たとえば上記の例では Twitter に最大幅の制限のオプション付きでお願いしている。Twitter には Thema というオプションもある。記事はこうだ。

```javascript
Twitter: { maxwidth: 300, theme: 'dark' },
```

![oembed-3](/media/oembed-3-5850792.png)

いわゆるダークモードとなっている。こちらは Gatsby-config なので動的に変更することはできませんが自分の Gatsby サイトにマッチした設定はさがしてみるのがいいのではないだろうか？

それぞれのサービスで対応するオプションが異なってくるので各種サービスの oembed のサイトは確認してためしてみるのがおもしろいとおもいます。下記のリンクを貼っておきます。

### Twitter oembed

https://developer.twitter.com/en/docs/twitter-for-websites/timelines/guides/oembed-api

### YouTube oembed

https://developers.google.com/youtube/player_parameters?hl=ja

### Instagram oembed

https://developers.facebook.com/docs/instagram/embedding/

## まとめ

ワードプレスのようにリンクの記載だけでの埋め込みが可能になった。これでより Gatsby での執筆意欲が湧くというものである。最初の例で気になった方も多いと思いますが、なんだか Instagram だけが配置がずれているようにみえます。このあたりは今後探っていこうと思う。

もしよかったらツイッターもフォローしてもらうとうれしい。ぜひぜひ遊びにきてください。

https://twitter.com/mikoshibax
