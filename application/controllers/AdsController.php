<?php
class AdsController extends Zend_Controller_Action
{
	public function bestbuyAction(){
		$this->view->url= $this->url("bestbuy");
	}
	
	public function macysAction(){
		$this->view->url= $this->url("macys");
	}
	
	public function targetAction(){
		$this->view->url= $this->url("target");
			
	}
	
	 function url($ad){
		$optout =  $this->getRequest()->getParams(); 
		$image = !isset($optout["optout"]) ? "offer.jpg" : "optout.jpg";
		return realpath."img/ads/".$ad.'/'.$image;
	}
}