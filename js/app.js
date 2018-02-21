/*
 * 创建一个包含所有卡片的数组 <i></i>
 */
let cardAll = ["fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb",
              "fa fa-diamond", "fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

// $(".deck").find("li").each(function() {
//   cardAll.push($(this).html());
// });
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
let openTime = []; //暂时性的地方，最多存两个数
let moveNum = 0;
//点击一次翻看
 $("li").click(function(event) {
   $(event.target).addClass("open show")
   openTime.push($(event.target).children().attr("class"));
   moveNum++;
  //  let nameClass = "";
  //  nameClass = $(event.target).children().attr("class");
  //  console.log(nameClass);//显示 元素的class

  if (openTime.length === 2) {
    if (openTime[0] === openTime[1]) {
      $(".open.show").addClass("match");
      $(".open.show").removeClass("open show")
      openTime = [] ;
    } else {
      $(".open.show").removeClass("open show")
      openTime = [];
    };
  };
 });

 //重新开
 $(".restart").click(function() {
   let newArray = shuffle(cardAll);
   cardPosition(newArray);
 });
function cardPosition(array) {
  for(let i = 0; i < array.length-1; i++) {
    $(".deck").find("li").eq(i).children().attr("class", array[i])
  };
};
