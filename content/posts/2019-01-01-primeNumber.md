---
template: post
title: 駆け出しハッカー部の仲間たち {素数との戦い}
slug: hucker-club-prime
draft: false
date: 2020-07-20
description: Eulerを解いてみよう。今日の話題は素数。
category: Competitive programming
tags:
  - Competitive programming
---

これはプログラミングをたしなむクラブでの物語。２０１９年１月１日に起こった実話を再現した。

ここからは先生がナレーションを進めてくれる

<img src="/media/sensei2.jpg" alt="sensei2" style="zoom:25%;" />

こんばんは。みなさんお元気？こんな正月から盛り上がっているようだから覗いてみようかしら。

早速今日の問題はこちら。もし競技プログラミングたしなむのだったら一緒に考えてみてね。

## Project Euler #10: Summation of primes

The sum of the primes below 10 is 2+3+5+7=17 .Find the sum of all the primes not greater than given N.

参照: https://www.hackerrank.com/contests/projecteuler/challenges/euler010

**先生**「問題を先生が日本語で解説してあげる**１０以下の素数は 2,3,5,7 です。その和は 17 になります。与えられた N より小さい素数の和を求めなさい.** 」



**先生**「簡単ね。チョチョイのチョイよね。」



**先生**「部員たちよ。でもこの子たち 1 月 1 日からこんなことしててもしかして非モテかしら www」



**学士**　「エラトステネスの篩（改）完成だぜ。まだ#10 解いてないけどね。」

```python
def eratosthenes(nums, lim, primes=None):
    if primes == None:
        primes = []
    prime = nums.pop(0)
    primes.append(prime)
    nums = [num for num in nums if num%prime!=0]
    if nums[0] > lim:
        return primes + nums
    else:
        return eratosthenes(nums,lim,primes)

def find_primes(n):
    lim = int(math.sqrt(n))
    nums = list(range(2,n+1))
    primes = eratosthenes(nums,lim)
    return primes
```

**平井**「エラトステネスの篩。初めて聞いた。なるほどなるほど。」

**億ラビット**「僕は python の list の効率を追求した結果こうなりました。エラトステネスの過程で無駄な処理を一切省いたつもりです。そしてやってることは上のディスカッションと同じ w 　 104729 が 10000 番目の素数と事前に調べてずるしました w。」

```python
#!/bin/python3
import sys

def getPrimes(n):
    nums = list(range(2, n + 1))
    primes = []
    while nums[0] ** 2 <= n:
        num = nums.pop(0)
        primes.append(num)
        i = 0
        while i < len(nums):
            if nums[i] % num == 0:
                nums.pop(i)
                i -= 1
            i += 1
    return primes + nums

primes = getPrimes(104729)

def solve(n): return primes[n - 1]

t = int(input().strip())
for a0 in range(t):
    n = int(input().strip())
    print(solve(n))
```

先生が言った

**先生**「ちょっと解説してあげようかしら。エラトステネスのふるい（篩）ってのはね、大昔の人が見つけた素数を特定する方法よ。今でも素数を見つける方法としてこの方法の改良版が利用されているわね。絶対覚えておいて。」

**先生**「考え方は簡単よ。自然数を２からあがって行くの。たとえば 100 までの素数を求めるとするわね。そのときに、２の倍数を排除していくのよ。だって割り切れるってことはその数字は素数の要件満たさないわよね。これが終わったら３。そうやって 100 まで見ていけば素数だけが残るってわけ。for ループでそれぞれの数字が割り切れるか総当たりを使ったりしたらタイムアウトになるわよ。」

**先生**「まあさすがだわね。駆け出しハッカー部員たちは」

**億ラビット**「学士さんのエラトステネスの篩（改）のコードで再帰する度に新しい list を作るのってその分負荷がかかるんですかね？この行で古い nums を毎回新しい list 作って上書きしてますよね？」

ここのことね。

```python
nums = [num for num in nums if num%prime!=0]
```

**学士**「ぬぬ？」

**億ラビット**「僕`i`でインデックスして`while`ループで`list.pop(i)`ってやりました。インデックスで`pop`だと軽いとおもうんですよね。C++とかで処理すると Array の全書き換え的な処理は重くなりそう。。。ただ、実はわかりません w。が、このささいな違いで上級とかだと引っ掛かるんですよね。なので C++とかうまい書き方ができない言語が実は最強説 w」

**学士**「リスト内包表記神話を盲信してました。特に根拠はないですけどちょっと弄ってみますー」

しばらく経って...

**学士**「リスト内包表記のほうが早いですよー」

![prime-1](/media/prime-1.png)

**億ラビット**「確かに list 作るなら内包表記のが速そうです。が、そもそも毎再帰 lisit を作らなくてよい説？学士さんのコードだと再帰毎にその処理繰り返してますよね？」

**学士**「あー。なるほど。まってでもこれって While の中で While まわしてるだけ。あまり遅くない説」

![prime-2](/media/prime-2.png)

**億ラビット**「内包表記で list 全書き換えの方が全然速いってことですかね？ふーむ。Python は奥が深い。中でなにしてるんだろう。ちょっと研究しておきます。」

**学士**「なかなか。でもこれはできたけど#10 解いてないんですよ。テヘペロ。ｎ未満の素数の個数がわかんなくて、結局 for で探すしかないのかなー、ってところで思考停止してました。」

**億ラビット**「あ～僕素数求めたあとに 1 から 1000000 まで for で回して list 作りました」

**平井**「言語仕様の裏にアルゴリズム隠れる IDE 使えばコーディングしながらでも簡単に見れますよ w python だと pycharm が便利。Go とか Java,Scala,Kotlin とか IntelliJ 使うとサクサク」

**億ラビット**「アルゴリズムが見えるってどういうことだろう？こういうやつですか？w
[Python の内包表記はなぜ速い？ : DSAS 開発者の部屋](http://dsas.blog.klab.org/archives/51742727.html)」

**先生**「Python の内包表記はすごいみたいね。これはみんなちゃんとマスターしておいてね。この記事がいいと思うよ。　[python の内包表記を少し詳しく](https://qiita.com/y__sama/items/a2c458de97c4aa5a98e7)」

## 数時間後...

**学士**「ガッテムー。解けたけどタイムアウト。全然おせええー」

```python
#!/bin/python3

import sys

def eratosthenes(n, nums=None, primes=None):
    if nums == None:
        primes = []
        nums = list(range(2, n + 1))
    prime = nums.pop(0)
    primes.append(prime)
    nums = [num for num in nums if num % prime != 0]
    if nums[0]**2 > n:
        return primes + nums
    else:
        return eratosthenes(n, nums, primes)

def solve　(n, primes):
    for i,prime in enumerate(primes): 　　　　
    if prime > n:
        return sum(primes[:i])
        return sum(primes)

primes = eratosthenes(10**6)
t = int(input().strip())
for a0 in range(t):
　　　　n = int(input().strip())
　　　　print(solve(n, primes))
```

**億ラビット**「solve の中で primes をループしてる部分を問題毎にやらなければクリアできると思います。最初に一回だけループしてすべてのパターンを先に list に格納して slove はそれを参照するだけというのはどうでしょう？」

**学士**「素数出すループと答え作るループを回すとタイムアウトになっちゃったんで、このやり方でガッテムしてました。1 回のループで答え作れそうな気もしますが、なんだか複雑になりそうだったんで後回にしちゃいました。気が向けばリトライ！」

**億ラビット**「むしろ eratosthenes の中に和を求める部分も組み込んだらさらに速そうです。僕そっちで書き直して見ます。」

**億ラビット**「わかりました。timeit でテストしてみたのですが。。。 まず昨日僕が書いた list を pop するコードは論外でした w。`10 ** 6`に至っては多分時間かかりすぎで求められない。多分リストの操作自体してはいけないとの結論。`pop`、`remove`、`append`とか。。。 それから、学士さんのエラトステネスもやはりループ毎に list を書き換えてるので内包表記といえど遅いです。 で僕が上で書いた効率悪いコードなんですが、list を最初に一回だけ作って、あとは bool の値を変えてるだけなのでループのロジックは効率悪いですが、それよりも list 自体を操作してないので学士さんのエラトステネスの 5 倍速い処理速度でした w

**10 回ループで 10 ** 6 を求めるのにかかった平均時間\*\*

- getPrimeArr(10 \*\* 6) 　　 0.684
- エラトステネス(10 \*\* 6) 　 3.798

」

**学士**「エラトステネスを弄らなくてもクリアできました。凡ミス疑惑。記録を残してないので真相は闇の中ですが。」

**億ラビット**「僕エラトステネスの中に和を求める処理を組み込んで、これで全問秒殺（1 秒以内？）でした。」

```python
#!/bin/python3
import math
import sys

def getPrimeSums(n):
    nums = [None] * (n + 1)
    nums[0] = False
    nums[1] = False
    prime_sum = 0
    sums = [0, 0]
    i = 2
    while i <= n:
        if nums[i] != False:
            nums[i] = True
            prime_sum += i
            prod = i * 2
            while prod <= n:
                nums[prod] = False
                prod += i
        sums.append(prime_sum)
        i += 1
    return sums


sums = getPrimeSums(10 ** 6)

def solve(n): return sums[n]


t = int(input().strip())
for a0 in range(t):
    n = int(input().strip())
    print(solve(n))
```

**学士**「億ラビットくんの回答はみないぞ。みない！！」

**はるか**「とけん。何かリスト操作でオーバーヘッドがあるのかな。。。涙」

**学士**「要素書き換えにしたらいいですよ」

**億ラビット**「多分詰まりどころは２つあって、まず前提として素数を求めるのにエラトステネスの篩っていうのを使って効率化しないと時間切れになるのと、これを使っても問題毎に素数を求め直してると間に合わないので最初に一回だけ計算してキャッシュしないと 6、7 で`T<=10**4`が響いて時間切れになりますね。
それから上で学士さんと話し合ってたのは素数を求める過程でなんらかの形でリストを操作すると凄く時間がかかるということですね。`popremoveappend`や list 全体の置き換えも遅延のもとになります。要素を上書きするだけの方法であれば全問１秒以内にクリアできました！エラトステネスの篩に和を求めるプロセスもドッキングできると今のところ最速です。」

**clearNB**「今日は素数の問題らしいので、余談。 素数の存在は無限にあるので、現在も素数を出しているそうです。 （どんだけ暇人なのか・・・） 学術研究によると、2018 年で桁数は 24,862,048 桁に及んだそうです。」

**先生**「ClearNB 君こんにちは。　読者のみなさん、彼は現役高校生。海外で仕事がしたいらしいわね。最近の高校生はどうなってるのかしら。」

**clearNB**「解けました！入力後の計算ではタイムアウトしてしまうといったことを想定して、事前計算を取り入れました。 問題の制約通りに作ったので、あまり参考になれないと思いますが、このコードでは、最大 0.69 秒で全て完了します。」

```java
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        //このプログラムは、事前計算した後に、入力値で表示させる機能を採用しています。
        boolean arr[] = new boolean[1000000 + 1];
        for(int i = 2; i <= 1000000; i++){
            arr[i] = true;
        }
        for(int j = 2; j * j <= 1000000; j++) {
            if(arr[j] == true) {
                for(int k = j * 2; k <= 1000000; k += j){
                    arr[k] = false;
                }
            }
        }
        long arr2[] = new long[1000000 + 1];
        long sum2 = 0;
        for(int m = 2; m <= 1000000; m++){
           if(arr[m] == true){
               sum2 += m;
           }
            arr2[m] = sum2;
        }
        try (Scanner in = new Scanner(System.in)) {
            int t = in.nextInt();
            for(int a0 = 0; a0 < t; a0++){
                int n = in.nextInt();
                System.out.println(arr2[n]);
            }
        }
    }
}
```

**先生**「ClearNB 君は Java 使いだわね。これは懐かしい。C 系の言語は読みやすいわね。boolean を使うのは賢いわね。エラトステネスのふるいを使ってるわね。」

**億ラビット**「おおっ！僕の解答より速いですね。やはり bool のリストにするのがポイントな気がします！」

**clearNB**「boolean は true or false ですから、それで効率よく出せるかなと予想しました。 まぁ、今回の難易度が Medium なのは、10^6 と制約にあった時点で察しました（笑）でも、Python の構文のシンプルさはいいですね。」

**先生**「平井君、いつもめっちゃ早いのに、今日は提出遅いわね。」

**平井**「Elixir で解いてみるので時間かかりそう 今外なので戻ったらチャレンジ。」

**先生**「まあ。新しい言語で遊んでいるのね。

平井さんはすきだわね w。」

## ３時間後

**はるか** 「泣きそうです。最初のコードで問題なかったのに半日無駄にしてしまった。N の長さを 10\*\*5 で計算していた。だからずーーーと #6 #7 通らなかった涙。泣きながらめちゃチューンした C のコードみてください。これが僕の最速です…　 0.01 秒記録しました」

```c
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>


int main(){
    int t;
    int n;
    long long int sum = 2;
    long long int sum_prime[1000001]={0};
    sum_prime[2]=2;

    for(int i = 3; i <= 1000000; i=i+2){
        if(sum_prime[i] == 0){
            for (int k = i+i;k <= 1000000; k=k+i){
                sum_prime[k] = 1;
            }
            sum = sum + i;
        }
    sum_prime[i]=sum;
    sum_prime[i+1]=sum;
    }

    scanf("%d",&t);
    for(int a0 = 0; a0 < t; a0++){
        scanf("%d",&n);
        printf("%lld\n",sum_prime[n]);
    }
    return 1;
}
```

**億ラビット**「おおっ！C だと爆速ですね！python だと#7 が 0.55s でした。奇数だけループしてるところと、array をひとつしか使わず 1 でマークしてるところがうまいですね。 お疲れさまです！普通にベストアンサー過ぎてこれ以上の思いつかないです」

**clearNB**「C 言語・・・Java の前者・・・先輩、さすがです！ Java の場合は、#7 は 0.54s ですね。」

**平井**「Elixir で解いてみた w 　めがチカチカする」

![elixar](/media/elixar.jpg)

**先生**「わお。 do end がならんでるわ。原色いっぱいね。」

## 今日の学び

1. **素数を求める時はエラトステネスの篩（ふるい）を使おう**
2. **Python の内包表記は早い。でも何度もリストを作り直す構造は見直そう**
3. **必要に応じて、Boolean を使って効率化を**
4. **C 言語は爆速**
5. **Elixir はカラフル**

ということで、駆け出しハッカー部の 1 日が終わった。どうやらこれはフィクションではなく実話のようだ。すでに活動を終えているが、メンバーは元気に今日もプログラミングをしているのだろう。

みんな元気かな？
