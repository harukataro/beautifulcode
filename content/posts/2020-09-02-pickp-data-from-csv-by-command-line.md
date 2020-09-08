---
template: post
title: Unity Errors
slug: unity-errors
draft: true
date: 2020-08-30
description: Unity Error とその対応法
category: Unity
tags:
  - Unity
socialImage: /media/UnityBlogTop2.png
---

![UnityBlogTop2](/media/UnityBlogTop2.png)

## Unity  Error 記録集

Unity ならではの問題と向き合った記録



## 環境

今回は下記の環境で問題に直面した。近い設定の方はもしかしたら参考になるかもしれない

- Mac Catalina
- Unity 2020.1.3f1
- Visual Studio for Mac
- Android Studio V 4..0.1
- AdMob Package
- Firebase Packag (Analytics, Firebase )
- 


## Unable to install APK

CommandInvokationFailure: Unable to install APK to device. Please make sure the Android SDK is installed and is properly configured in the Editor. See the Console for more details.

実際のデバイスにBuildファイルを転送してのデバック時に現れた。ある一つのデバイスで発生し、問題解決のためいろいろ試した結果



デバイスの容量不足であった。既存の大きめのアプリを削除し再度挑戦で事なきを得た。





## 参考ページ

- https://forum.unity.com/threads/gradle-build-failed.647581/
- [How to fix Android Gradle Build failed error in unity](https://www.unity3d.co.in/2020/08/how-to-fix-android-gradle-build-failed.html)
