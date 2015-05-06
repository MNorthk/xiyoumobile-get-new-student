


var menuDisabled = false;
var signbfc = false;

jQuery(function ($) {



    $(window).load(function () {
        $('#status').fadeOut();

        $('#preloader').delay(50).fadeOut('slow');
        $('#main-wrapper').delay(50).css({ 'overflow': 'visible' });
    });

    $(document).ready(function () {


      /*            */
    


        $("#loadsig").hide();
        $("#loadcheck").hide();
        $("#loadsub").hide();
        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, { speed: 400 });

        $(".change-section").on('click', function (e) {
            e.preventDefault();
           
            if (menuDisabled == false) {
                menuDisabled = true;
                var name = $(this).attr('href');
                if($(window).width()>$(window).height())
                {
                  $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
                      $(this).removeClass("active");
                      $(name).show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
                          $(this).addClass("active");
                          menuDisabled = false;
                      });
                  });
              }
              else
              {
                $("section.active").css("display","none").removeClass("active");
                $(name).css("display","block").addClass("active");
                          menuDisabled = false;

              }
            }
        });

        $(".change-section-pm").on('click', function (e) {
            e.preventDefault();
            if (menuDisabled == false) {
                menuDisabled = true;
                var name = $(this).attr('href');
                $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
                    $(this).removeClass("active");
                    $("#imglogo").removeClass("inactive");
                    $(name).show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
                        $(this).addClass("active");
                        menuDisabled = false;
                    });
                });
            }
        });
    });
});

function activeRes() {
    $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
        $("#join").removeClass("active");
        $("#imglogo").removeClass("inactive");
        $("#resultsection").show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
            $(this).addClass("active");
        });
    });
}


function seeCl() {
    var str;
    var url = 'getNew/api/Set?id=';
   
    var resSpan = $("#res");
    str = $("#stunumber").val().toString();
    if (str === '')
    {
        alert("亲，学号呢？");
        return false;
    }
    if (str.length < 8 || !(bf(str)))
    {
        alert("亲，学号好像不对哎~");
        return false;
    }
    else
    {
        $("#loadcheck").show();
        url += str;
        $.get(url, function (r) {
        $("#loadcheck").hide();
            if(r.Name=="no")
              showMsg("对不起，你还没有报名嘞~");
            else
            {
              switch(r.Prossce)
              {
                case 'not begin':
                 showMsg(r.Name +"你好，面试还没有开始");
                 break;
                 case '一面通过':
                 showMsg(r.Name +"你好，你一面已经通过了。");
                 break;
                 case '二面通过':
                 showMsg(r.Name +"你好，你二面已经通过了。");
                 break;
                 case 'success':
                 showMsg(r.Name +"你好，恭喜你加入3G。");
                 break;
                 default:
                 showMsg(r.Name +"你好，你的录取情况为 "+ r.Prossce);
              }
              
            }
        });

    }


}
var kang_die=function(){
  
    $("#kang_die").css("display","none");
}
var kang_live=function(){
  $("#kang_die").css("display","block");
}
function doConfirm() {
  
    var number = document.getElementById('number').value.toString();
    var name = document.getElementById('name').value.toString();
    var cls = document.getElementById('class').value.toString();

    var intro = document.getElementById('intro').value.toString();
    var sex;
    var male = document.getElementById('male');
    var female = document.getElementById('female');

    var phone = document.getElementById('phone').value.toString();
    var intention;
    var intentionSet = document.getElementsByName('intention');

    if (male.checked == true)
        sex = '男';
    else if (female.checked == true)
        sex = '女';
    for (var i = 0; i < 4; i++) {
        if (intentionSet[i].checked == true)
            intention = intentionSet[i].value.toString();
    }
    if (intention == "" || intro == '') {
        alert('信息还有没写的哦');
        return false;
    }
    if (phone.length != 11) {
        alert('电话好像不对哎');
        return false;
    }
    if (!phoneNum(phone)) {
        alert('电话好像不对哎');
        return false;
    }
    if (intention != 'ios' && intention != 'android' && intention != 'windows' && intention != 'web') {
        alert('方向好像不对哎');
        return false;
    }
    var showintention;
    switch (intention) {
        case 'ios': showintention = 'iOS'; break;
        case 'android': showintention = 'Android'; break;
        case 'windows': showintention = 'Windows'; break;
        case 'web': showintention = 'web'; break;
        default: break;
    }
    var showsex;
    switch (sex) {
        case '男': showsex = '汉纸'; break;
        case '女': showsex = "萌妹"; break;
        default: break;
    }
    kang_live();
    $("#coName")[0].innerHTML="姓名：" + name;
    $("#coNumber")[0].innerHTML = "学号：" + number;
    $("#coPhone")[0].innerHTML = "手机：" + phone;
    $("#coIntention")[0].innerHTML = "方向：" + showintention;
    $("#coInfo").removeClass("inactive");
    $("#coInfo").addClass("active");
    $("#subBtn").attr("disabled", "true");
    $("#coYes").click(function () {
        $("#subBtn").attr("disabled", false);
        $("#coInfo").removeClass("active");
        $("#coInfo").addClass("inactive");
        snumber = $("#number").val();
        var obj = {
            Id: number,
            Name: name,
            Classid: cls,
            Sex: sex,
            Point: intention,
            Phone: phone,
            Message: intro
        }
        kang_die();
        doSubmit(obj);
        
        return false;
    });
    $("#coNo").click(function () {
        $("#subBtn").attr("disabled", false);
        $("#coInfo").removeClass("active");
        $("#coInfo").addClass("inactive");
        kang_die();
        return false;
    });
}
 

function phoneNum(pnum) {
    var str = pnum;
    var tof = true;
    for (var i = 0; i < 11; i++) {
        if (str[i] < '0' || str[i] > '9') {
            tof = false;
            break;
        }

    }
    return tof;
}


function doSubmit(obj) {


    $.ajax({
        url: "getNew/api/Set",
        data: obj,
        type: "Post",
        beforeSend: function () {
            $("#subBtn").attr("disabled", "true");
            $("#loadsub").show();
        },
        success: function (j) {
            $("#loadsub").hide();
            $("#subBtn").attr("disabled", false);
            location.replace("#resultsection");
            activeRes();
            showMsg(transMsg(j.toString()));
        }
    })
}
function transMsg(str) {
    switch (str) {
        case 'ok': return '报名成功~'; break;
        case 'youIn': return '你已经报过名了嗯~'; break;
        default: return '哎呀，哪里出问题了'; break;
    }
}
function showMsg(Message) {
    $("#respan").text(Message);
}

function bf(bf_num) {
    var str = bf_num.toString();
    var tof = true;
    for (var i = 0; i < 8; i++) {
        if (str[i] < '0' || str[i] > '9') {
            tof = false;
            break;
        }

    }
    return tof;

}

function joinBefore() {
    var number1 = document.getElementById('numbf').value.toString();
    var passsword1 = document.getElementById('pasbf').value.toString();
    if (number1.length != 8) {
        alert('学号好像不对哎');
        return false;
    }
    if (!bf(number1)) {
        alert('学号好像不对哎');
        return false;

    }
    if (number1 == "" || passsword1 == '') {
        alert('信息还有没写的哦');

    }
    var url = 'getNew/api/User';
    $("#sigbf").attr("disabled", "true");
    $("#loadsig").show();
    var prenum = document.getElementById('numbf').value.toString();
    var prepas = document.getElementById('pasbf').value.toString();

    $.getJSON(url, {
        id: prenum,
        psw: prepas
    },
       function (d) {
       
           $("#sigbf").attr("disabled", false);
           $("#loadsig").hide();
           switch (d.Id) {
               case "idWrong": {
                   alert("用户不存在");
               } break;
               case "pswWrong": {
                   alert("密码错误");
               } break;
               case "wrong": {
                   alert("服务器连接错误");
               } break;
               default: {
                   var male = document.getElementById('male');
                   var female = document.getElementById('female');

                   location.replace("#join");
                   if (menuDisabled == false) {
                       menuDisabled = true;
                       $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
                           $("#joinbefore").removeClass("active");
                           $("#imglogo").addClass("inactive");
                           $("#join").show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
                               $("#join").addClass("active");
                               menuDisabled = false;
                           });
                       });
                   }

                   $("#name").attr(
                       {
                           value: d.Name,
                           disabled: "true"
                       });
                   $("#number").attr(
                       {
                           "value": d.Id,
                           "disabled": "true"
                       });
                   $("#class").attr(
                   {
                       "value": d.Classid,
                       "disabled": "true"
                   });
                   if (d.Sex == "男") {
                       male.checked = true;
                   }
                   else if (d.Sex == "女") {
                       female.checked = true;
                   }
                   $("#male").attr("disabled", "true");
                   $("#female").attr("disabled", "true");
               }; break;
          }
       }
       );
}

$(function(){
  if($(window).width()<430)
    $(".footer-text").css("font-size","10px");


});
$(function(){
  $("#intro").keyup(function(){
   var len = $(this).val().length;
   if(len > 149){
    $(this).val($(this).val().substring(0,150));
   }
 
  });
 });
//document.onkeypress = function (e)   //回车键
//{
//    var code;
//    if (!e) {
//        var e = window.event;
//    }
//    if (e.keyCode) {
//        code = e.keyCode;
//    }
//    else if (e.which) {
//        code = e.which;
//    }
//    if (code == 13) {

//        $("#sigbf").click();
//        return false;

//    }
//}



















