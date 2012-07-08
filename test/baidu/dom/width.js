module('baidu.dom.width');

test("常规测试", function(){
	testGet( "div" );
	testGet( "input" );
	testGet( "body" );
	testGet( "span" );
});

test("window and document", function(){
	equal( baidu.dom( window ).width(), document.body.clientWidth, "window" );
	equal( baidu.dom( document ).width(), document.body.clientWidth, "document" );
});

function testGet( el ){
    diff( el, 100 );
    diff( el, 0 );
    diff( el, -100 );
    diff( el, NaN );
}

function diff( el, number ){
	el = create( el );
	el.style.margin = el.style.padding = "10px";
    equal( baidu.dom( el ).width( number ).width(), isNaN( number ) ? 0 : Math.max( number, 0 ), "针对 " + el + " 节点设置(" + number + ")和取得 width");

    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}

function create( tag ){
	if( typeof tag == "object" )
	    return tag;

	var el = document.createElement( tag );
	var parent;

	el.style.width = el.style.height = "0";
	el.style.overflow = "hidden";

	if( tag == "body" ){
	    parent = document.documentElement;
	}else{
	    parent = document.body;
	}

	parent.appendChild( el );

	return el;
};