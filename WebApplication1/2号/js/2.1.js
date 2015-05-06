


var menuDisabled = false;


jQuery(function ($) {
    $(window).load(function () {
        $('#status').fadeOut();

        $('#preloader').delay(50).fadeOut('slow');
        $('#main-wrapper').delay(50).css({ 'overflow': 'visible' });
    });

    $(document).ready(function () {

        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, { speed: 400 });



        $(".change-section").on('click', function (e) {
            e.preventDefault();
           // $(".texta").hide();

            if (menuDisabled == false) {
                menuDisabled = true;

                var name = $(this).attr('href');
                //console.log(name);
                $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
                    $(this).removeClass("active");
                    $(name).show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
                        $(this).addClass("active");
                        menuDisabled = false;
                    });
                });
            }

        });




        $(".change-section-pm").on('click', function (e) {
            e.preventDefault();
           // $(".texta").hide();

            if (menuDisabled == false) {
                menuDisabled = true;

                var name = $(this).attr('href');
                //console.log(name);
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

function activeRes()
{
     $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
         $("#join").removeClass("active");
         $("#imglogo").removeClass("inactive");
        $("#resultsection").show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
            $(this).addClass("active");
                       // menuDisabled = false;
       });
                });
}


function seeCl(snumber)
{
        var str;
        var url='../api/Set?id=';
        
        var resSpan= $("#res");

        if (snumber == '') {
            str = $("#stunumber").val().toString();

        }
        else
            str = snumber.toString();

           url+=str;
          //  $("#respan").text(url);
 
        $.get(url,function(r){
         


         showMsg(r.Name+'   '+r.Prossce);
         })
 
}

 

function doConfirm() {
     var number = document.getElementById('number').value.toString();
     var name = document.getElementById('name').value.toString();
     var cls = document.getElementById('class').value.toString();

    var intro = document.getElementById('intro').value.toString();
     var sex ;
     var male = document.getElementById('male');
     var female = document.getElementById('female');

    var phone = document.getElementById('phone').value.toString();
    var intention;
    var intentionSet = document.getElementsByName('intention');

    if (male.checked == true)
        sex = '男';
    else if(female.checked==true)
        sex = '女';


    for (var i = 0; i < 4; i++)
    {
        if (intentionSet[i].checked == true)
            intention = intentionSet[i].value.toString();
    }

    if (intention == ""||intro=='') 
    {
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
    if (intention != 'ios' && intention != 'android' && intention!= 'windows'&& intention!='web') {
        alert('方向好像不对哎');
        return false;
    }
    // if(sex!='男' && sex!='女')
    // {
    //     alert('性别好像不对哎');
    //     return false;
    // }
    var showintention;
    switch (intention) {
        case 'ios': showintention = 'IOS'; break;
        case 'android': showintention = 'Android'; break;
        case 'windows': showintention = 'Windows'; break;
        case 'web': showintention = 'web'; break;
            default:break;
    }
    var showsex;
    switch(sex)
    {
        case'男':showsex='汉纸';break;
        case'女':showsex="萌妹";break;
        default:break;
    }
    if (
        confirm('请确认信息，提交后不可修改：\n'
                + '学号：' + number + '\n'
                + '姓名：' + name + '\n'
                + '班级：' + cls + '\n'
                + '电话：' + phone + '\n'
                + '方向：' + showintention + '\n'
                + '性别：' + showsex + '\n'
        )) {
        snumber = $("#number").val();
        subIsClick = true;
        var obj = {
            Id: number,
            Name: name,
            Classid: cls,
            Sex: sex,
            Point: intention,
            Phone: phone,
            Message:intro
        }
      doSubmit (obj);
        return false;
    }
    else
        return false;
}

function phoneNum(pnum)
{
    var str = pnum;
    //alert(str);
    var tof = true;
    for (var i = 0; i < 11; i++) {
        if (str[i] < '0' || str[i] > '9') {
            tof = false;
            break;
        }

    }
    return tof;
}

function doSubmit(obj ) {
	
   
    //  $("#form1") .ajaxSubmit(function (j) {

    //     //  alert("submit");
    //     var data = $.parseJSON(j.toString()); 
    //     location.replace("#resultsection");
    //     activeRes();
    //     showMsg(data.Message);

    // }); 
 

    // var aQuery = $("#form1").formSerialize();  
    //     //将整个表单的有用值格式化  
    //     alert(aQuery);   
    $.ajax({
        url: "../api/Set",
        data:obj,
        type:"Post",
       // dataType:"json",
        beforeSend:function(){
            $("#subBtn").attr("disabled","true");
           // alert($("#form1").formSerialize());
        },
        success:function(j){
             $("#subBtn").attr("disabled",false);
             // var data = $.parseJSON(j.toString()); 
        location.replace("#resultsection");
        activeRes();
        showMsg(transMsg(j.toString()));
        }
    })
}
function transMsg(str)
{
    switch(str)
    {
        case 'ok': return '报名成功~'; break;
        case 'youIn': return '你已经报过名了嗯~'; break;
        default: return '哎呀，哪里出问题了'; break;
    }
}
function showMsg(Message)
{
    $("#respan").text(Message);
}

function bf(bf_num)
{
	var str=bf_num.toString();
	//alert(str);
	var tof=true;
	for(var i=0;i<8;i++)
	{
		if(str[i]<'0'||str[i]>'9')
		{
			tof=false;
			break;
		}
		
	}
	return tof;

}

function joinBefore()
{
	var number1 = document.getElementById('numbf').value.toString();
	var passsword1=document.getElementById('pasbf').value.toString();
	if (number1.length != 8) {
        alert('学号好像不对哎');
        return false;
    }
	if (!bf(number1)){
        alert('学号好像不对哎');
        return false;
        
    }
      if (number1 == "" ||passsword1=='') 
    {
        alert('信息还有没写的哦');
        
    }
	var url='../api/User';
	var prenum=document.getElementById('numbf').value.toString();
	//url+=prepas;
	//location.replace("#join");
	var prepas=document.getElementById('pasbf').value.toString();
	//url+=prenum;
	//$("#joinsection-top").offset().top;
   //          if (menuDisabled == false) {
   //              menuDisabled = true;
   //              $("section.active").hide('size', { easing: 'easeInQuart', duration: 400 }, function () {
   //                  $("#joinbefore").removeClass("active");
   //                   $("#imglogo").addClass("inactive");
   //                  $("#join").show('size', { easing: 'easeOutQuart', duration: 400 }, function () {
   //                      $("#join").addClass("active");
   //                      menuDisabled = false;
   //                  });
   //              });
   //          }
   //       //   var  top=document.getElementById("toptext").style.top;
 		// // window.scrollTo(1000);//这一段看效果用
 		// $("html,body").animate({scrollTop:$("#joinsection-top").offset().top},1000);
       

 		 
 		// $("#number").attr(
   //          	{
   //          		"value":prenum,
   //          		"disabled":"true"
   //      		});

	 $.getJSON(url,{
			id:prenum,
			psw:prepas},
		function(d)
		{
			//alert(d.Id);
			//return;
			switch(d.Id)
            {
            	//d.Sex
            	case "idWrong":{
            		alert("用户不存在");
            	} break;
            	case "pswWrong" :{
            		alert("密码错误");
            	} break;
            	case "Wrong":{
            		alert("服务器连接错误");
            	} break;
                default:{
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
                       value:d.Name,
                        disabled:"true"
                    });
                $("#number").attr(
                    {
                       "value":d.Id,
                        "disabled":"true"
                    });
                
                $("#class").attr(
                {
                    "value":d.Classid,
                    "disabled":"true"

                });
                //xingbie
                if(d.Sex=="男")
                {
                    male.checked=true;

                }
                else if (d.Sex=="女") {
                    female.checked=true;
                }
                $("#male").attr("disabled","true");
                $("#female").attr("disabled","true");
            };break;
            
           

                 //判断返回码
            //对应：
            
            
            //性别



            }
       

		}
		);
}


    document.onkeypress=function(e)   //回车键
    {  
          var code;    
          if  (!e)    
          {    
              var e=window.event;    
          }    
          if(e.keyCode)    
          {      
              code=e.keyCode;    
          }    
          else if(e.which)    
          {    
              code   =   e.which;    
          }  
          if(code==13)  
          {  
      
            $("#sigbf").click(); 
             return false;  
                
        }  
    }	