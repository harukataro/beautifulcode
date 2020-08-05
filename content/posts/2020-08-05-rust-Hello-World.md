---
template: post
title: Rustの始め方
slug: Rust-hello-world
draft: false
date: 2020-08-05
description: 次世代のバックエンド言語. c++を超えられるか？
category: Rust
tags:
  - Rust
socialImage: /media/Rust-1.png
---

![Rust-1](/media/Rust-1.png)

## Rust とは

Rust はメモリーの扱いがユニークな主にバックエンドとしてサーバーで活躍する言語として生まれた。狙う椅子は C++の占めている根幹をなすシステムプログラミング領域である。

ということで実行速度が C 言語とほぼ同等といわれ最高位のスピードを誇る言語となる。

Rust は 2006 年に一人の男が個人プロジェクトとしてスタートし、その後 Mozilla のプロジェクトとなり、現在はオープンソースプロジェクトとしてコミュニティの手によって開発が進められている。

とても若い言語である。

ここ最近、ギークな人たちの間で超人気である。

C 言語で育った僕としては C 言語を勉強してほしいが、もしかしたらいま若い方はシステム言語として Rust を最初に学ばれるのも面白いキャリアパスかもしれない。いまの勢いだと、きっと将来いい武器になるだろう。

## メモリーの戦いの歴史

プログラムの泣き所は長年メモリーの扱いにある。20 世紀のプログラミングではメモリーの漏れによるバグが頻発していた。開発環境などの改善でとてもバグは少なくなったが、c++のようなコアなところを扱えるプログラムはメモリーも自分自身ですべて管理する前提のため地雷が怖いものである。ちゃんとメモリー開放したのか？僕は大丈夫？

メモリーの扱いのトレンドはガベージコレクションとなった。これは実行時に必要がなくなったと判断されたメモリーは仕組みとして開放する。プログラマーはあまり意識しなくても良くなったのだ。

しばらくそれで時代は進んできたが、ガベージコレクションはその性質ゆえに、メモリーの整理のために定期的に CPU パワーを専有し掃除を行う。

僕らが PC で使うプログラムではあまり問題にならないが、サーバーでミリ秒マイクロ秒単位で活躍するプログラムには、プログラマーの手をはなれたガベージコレクションコレクションがパフォーマンスを阻害する要因となってしまった。

さて Rust である。Rust はガベージコレクションを捨て、メモリーの厳密管理をプログラム時に行うことでメモリーリークがない世界をつくった！

**Rust のユニークな点**
**値は一人しか所有できない**

は？？？

何を行っているんですか？御子柴ぁーー

と聞こえてきそうです。

## インストール方法

[こちら](https://www.rust-lang.org/ja/tools/install)を参考にしましょう。

Mac/Linux 勢は下記のコマンドをうちましょう

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

windows 勢の方は[こちら](https://www.rust-lang.org/ja/tools/install)からインストーラをダウンロードしてください

上記のコマンドをうつと下記の選択肢がでますのでおとなしく１をえらびましょう

```Badh
1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
```

これで下記のコマンドを打って結果がでればインストールは成功です。

```
rustc --version
```

でも、パスの問題が出ることも。そのときはおとなしくパスを追加しましょう。

ツールは`~/.cargo/bin` に格納されますので `~/.zshrc`や`~/.bashrc`　のパスを編集しましょう。

例えば僕の場合は PATH の記載エリアに下記の行を追加しました

```
export PATH=$PATH:/Users/Mikoshiba/.cargo/bin
```

できたら

```bash
$ source ~/.zshrc
```

で反映させます。

これでもう一度

```bash
~$ rustc --version
rustc 1.45.2 (d3fb005a3 2020-07-31)
```

バッチリですね。これでつかえるようになりました

Visual Studio Code 勢は　 Rust のプラグインもいれておきましょう。名前は Rust なのですぐにみつかります。下記をクリックしてもらっても Ok です

https://marketplace.visualstudio.com/items?itemName=rust-lang.rust

![Rust-Plugin](/media/Rust-Plugin.png)

## 動作確認

では下記のコードを `mikoshiba.rs`の名前で作成します

```rust
fn main() {
    println!("Hello Mikoshiba");
}
```

でコマンドプロンプトで

```bash
$ rustc mikoshiba.rs
$ ./mikoshiba
```

これで Hello Mikoshiba と表示されれば大成功です！

## メモリー遊び

まずはこのコードを memory.rs としましょう

```rust
fn main() {
    let s1 = String::from("hello");
    println!("{}", s1);
}
```

でこれをこうします

```bash
$ rustc memory.rc
$ ./memory
```

すると普通に

`my word`

とでてきますね。

では下記はどうでしょう？よくあるコードですよね？データを渡して２つとも同じ値がはいっているはずです

```rust
fn main() {
    let s1 = String::from("hello");
    println!("{}", s1);
    let s2 = s1;
    println!("{}",s1);
    println!("{}",s2);
}
```

コンパイルすると...

![rust-2](/media/rust-2.png)

怒っています。もう S1 は値をもっていない let s2 = s1 で　 value moved here と教えてくれています。これが値の所有権というものでした。

ちなみにですね...

```rust
fn main() {
    let s1 = "hello";
    println!("{}", s1);
    let s2 = s1;
    println!("{}",s1);
    println!("{}",s2);
}
```

これは怒られません w。

この場合はコピーをしているようですね。コンパイル時に既知のサイズを持つものに関しては寛容にコピーをしてくれるようです。

つまり柔軟さも持ち合わせているようですね。この Rust の公式ブログにこのあたりは記載があります。よかったら読んでみてください

https://doc.rust-jp.rs/book/second-edition/ch04-01-what-is-ownership.html

ではまた会いましょう

## 参考ページ

https://www.rust-lang.org/ja

https://www.rust-lang.org/ja/tools/install

https://doc.rust-jp.rs/
