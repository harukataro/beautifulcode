---
template: post
title: Unity Gradle Build Error を乗り越えた記録
slug: unity-gradle-build-error
draft: false
date: 2020-08-30
description: Unity Gradle buildのエラーに悩まされ乗り越えた記録
category: Unity
tags:
  - Unity
socialImage: /media/UnityBlogTop2.png
---

![UnityBlogTop2](/media/UnityBlogTop2.png)

## Unity Andoroid Gradle Build Error を乗り越えた記録

Unity での開発を始めてしばらくは楽しくゲームを作っていたのだが、広告をつけたり、外部データベースを接続したりで外部パッケージを入れ始めたあたりから Build が素直に通らないことが多くなった。

そのために検索をかけていくと多くの戦士がこの問題と常に戦っていることが垣間見えた。外部のライブラリーに頼るシステムは一般的であり常にプログラマーとして活用してきたのだが、ここまで Build エラーに直面するのは久々のことである。

## 環境

今回は下記の環境で問題に直面した。近い設定の方はもしかしたら参考になるかもしれない

- Mac Catalina
- Unity 2020.1.3f1
- Visual Studio for Mac
- Android Studio V 4..0.1
- AdMob Package
- Firebase Packag (Analytics, Firebase )

## External Dependency Maneger では対応できないことも

多くの Build Error がライブラリーの不整合によって起こるとのことでまずは第１歩として提案される External Dependency Maneger による自動補正である。

![ExternalDependencyManegerMenu](/media/ExternalDependencyManegerMenu.png)

アセット -> External Dependency -> Maneger -> Android Resolver

にてアクセスができる。 Resolve と Force Resolve があるが、Force は一旦ライブラリーを削除して構築をしなおしているような動きに見える。これで問題が解決することも確かにあったが、今回直面したものは解決できなくさらなる努力をした。



## 1, Android SDK がアップデートできない

Build 開始直後に現れると絶望するこのエラー

`Unable to update the SDK`

### 対応策

- Andoroid Studio の SDK を利用

- Unity 自体をインストールし直す

### SDK の指定方法

最初は Andoroid Studio の SKD を参照させるようにした SDK のエラーを乗り越えることができた。自前の SDK の指定はフォルダーで可能

**Unity -> 環境設定 -> 外部ツール**

![ExternalTool](/media/ExternalTool.png)

初期設定は Unity Apprication の保持するライブラリーのフォルダーを示している。このチェックボックスを外し、例えば Android の保持するライブラリーを指定することができる

### Unity の再インストールで正常になることも

新たなライブラリーのアップデートを行った後、結局 Unity 自体をインストールし直してその後は Unity の保持する SDK を参照した状態で問題がなくなった。Unity Hub で比較的気軽に Uninstall Install ができるので試してもらうといいかと思う。



## 2, Gradle Build Error

Gradle は Android の採用した Build システムである。これに追従して Unity も最近のバージョンでは Gradle Build をメインに据えた。そのために発生するようになったエラー群があるわけだ。

有効かもしれないと思った施策は下記

- .gradle の削除

- gradle property の編集

  

### .gradle の削除

build を一度でも行った場合、自分のホームフォルダー(User/xxx/)に .gradle 　フォルダーができている。

**このフォルダーがを削除しもう一度 Unity で Build を走らせると Unity お好みの Gradle がダウンロードされる。Gradle のバージョンコンフリクトの場合に効果を示すと思われる。**

Mac の場合初期設定では Dot から始まるファイルは見えなくなっている。表示する方法は **⌘ + Shift + .** で表示されるようになる。バサッと .gradle のフォルダーをゴミ箱にすてた。

![DotGradleFolder](/media/DotGradleFolder.png)

## gradle property の編集

エラーをしっかり読むと build.gradle のプロパティーがおかしいのでエラーをだしている旨が示されることがある。が、Unityプロジェクトのフォルダーを検索しても build.gradle や gradle.properties は見つからない。



Unity は Gradle の設定ファイルを Build するときに自動生成をするためだ。そのためインターネットの検索で引っかかる Android Studio での対処の記事はあなたの役にたたないかに見える...



### Unity での対応

Unity は Gradle 設定を自動生成するときの雛形にする設定を指定することができるのだ。ではどうすればいいのか？

下記の設定に行こう

**ファイル -> ビルド設定 -> プレイヤー設定**

**Player -> アンドロイドのタブ -> 公開設定 -> ビルド**

![gradle-template](/media/gradle-template.png)

この設定の初期はチェックが入ってないと思う。私の場合は property を変更する必要があったので　カスタム Grade プロパティーテンプレートにチェックを入れた。

**すると Unity の Assets/Plugins/Android のフォルダーに gradleTemplate.properties が生成される。**該当ファイルを編集することで対応ができる。



直面したエラーが useAndroidX の property を true にしなさいという旨のエラーだったため、２つのプロパティー(android.useAndroidX=true
, android.enableJetifier=true)を gradleTemplate.properties に追記し build が通るようになった

```
org.gradle.jvmargs=-Xmx**JVM_HEAP_SIZE**M
org.gradle.parallel=true
android.enableR8=**MINIFY_WITH_R_EIGHT**
**ADDITIONAL_PROPERTIES**
android.useAndroidX=true
android.enableJetifier=true
```

エラーは環境により千差万別でなかなかインターネットにある情報と完全に一致しないことも多く辛いことがあるが、経験を積んで臨んでいきたい。とりあえず、もっと安定した Unity の Buid 環境を望みたいものである。

## 参考ページ

- https://forum.unity.com/threads/gradle-build-failed.647581/
- [How to fix Android Gradle Build failed error in unity](https://www.unity3d.co.in/2020/08/how-to-fix-android-gradle-build-failed.html)
