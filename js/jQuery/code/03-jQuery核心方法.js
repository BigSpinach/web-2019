{
	// 1. each
	console.log('---------1.1--$.each()--------');
	// 1.1 $.each()
	/*
	$.each([1,23,4,5,6],function(index,item){
       	console.log(index,item);
    });
	*/
	//Object.prototype.aaa = 250;
	$.each({name:"BigSpinach",age:28},function(key,value){
       	console.log(key,value);
    });
    //基于for in 遍历
    //
    /*
    name BigSpinach
	age 28
	aaa 250
     */
    

    console.log('-------1.2--$([selectoir]).each()--------');
    //1.2
    //$([selectoir]).each()
    
    $('.box_ol li').each(function(index,item){
    		$(this).click(function(event) {
    			$(this).css({
    				color:'red',
    				border : '2px solid #241571'
    			});
    		});
    	}
      );



    console.log('-------1.3--内置each--------');
    $('.box_ol li').click(function(index,item){
    	//JQ在调取CLICK的时候，会默认的把集合 进行EACH遍历，把每一项都给CLICK了
    	console.log($(this),"OK");
    })
}