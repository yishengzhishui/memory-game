/*
 * 创建一个包含所有卡片的数组
 */
let cardAll = ["fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb",
              "fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
//布置新的卡片顺序
function cardPosition(array) {
  $(".match").removeClass("match");
  $(".open.show").removeClass("open show");
  for(let i = 0; i < array.length-1; i++) {
    $(".deck").find("li").eq(i).children().attr("class", array[i])
 };
};
//重新开
$(".restart").click(function() {
  let newArray = shuffle(cardAll);
  cardPosition(newArray);
});

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

//函数
let showCard = function() {
  $(event.target).addClass("open show")
};
let closeCard = function() {
  $(".open.show").removeClass("open show");
};
let pushArray = function(array) {
  array.push($(event.target).children().attr("class"));
};
let judgeCard = function(openArray,matchArray) {
  if (openArray.length === 2) {
    if (openArray[0] === openArray[1]) {
      $(".open.show").addClass("match");
      closeCard();
      matchArray.push(openArray[0]);
      matchArray.push(openArray[1]);
      openArray.length = 0;
    } else {
      closeCard();
      openArray.length = 0;
    };
  };
};
let starMoves = function(num) {
  $("span.moves").text(num);
  if (num > 20 && num <=30) {
    $(".stars").find("li").eq(2).children().attr("class", "fa fa-star-o")
  } else if (num > 30) {
    $(".stars").find("li").eq(1).children().attr("class", "fa fa-star-o")
  }
};
let lastNew = function(array,num) {
  let star = 1;
  if (num <= 20 ) {
    star = 3;
  } else if (num > 20 && num <=30) {
    star = 2;
  };
  if (array.length === 16) {
    alert(`恭喜过关共用${num}步，获得${star}颗星`)
  }
};
let openCard = []; //暂时性的地方，最多存两个数
let matchCard = []; //匹配好的卡片放入
let moveNum = 0;
//点击翻牌
$("li").click(function(event) {
  showCard();
  pushArray(openCard);
  moveNum++;
  starMoves(moveNum);
  setTimeout(function(){judgeCard(openCard,matchCard)}, 1000); //setTimeout写法
  setTimeout(function(){lastNew(matchCard,moveNum)},2000);
});
