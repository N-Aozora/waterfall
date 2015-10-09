<?php
$getajax=json_decode (file_get_contents("php://input"));
if($getajax->title=='test'){
	$data='{"data":[{"img":"img_03.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_05.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_07.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_09.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"}]}';
	echo "$data";
}
?>