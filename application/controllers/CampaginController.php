<?php
class CampaginController extends Zend_Controller_Action
{
	private $create;
	private $data;
	private $campaign;
	
	public function init()
	{
		$this->data = new Default_Model_Data();
		$this->campaign = new Default_Model_Campaign();
		//$this->create = new Default_Model_Create();
	}
	
	public function indexAction()
	{
		$data = $this->data->display();
		$this->view->data = $data;
		$camp = $this->campaign->display();
		$this->view->camp = $camp;
	}
	
	public function insertingAction()
	{
		if($this->getRequest()->isGET())
		{
			array_shift($_GET);
			$this->data->inserting($_GET);
		}
		
		if($this->getRequest()->isPOST())
		{
			foreach($_POST as $key => $value)
				if(strstr($value, "Choose"))
					unset($_POST[$key]);
								
			if(empty($_POST['campaignName']))
				echo "<script>alert('Please provide a Campagin Name');</script>";
			else
			{ 
				$today = getdate();
				$datetime = $today["year"].'-'.$today['mon'].'-'.$today['mday'].' '.$today['hours'].':'.$today['minutes'].':'.$today['seconds'];
				$_POST['date'] = $datetime;
				$this->campaign->inserting($_POST);
			}
			
		}
	}
	
	
	public function getAction()
	{
	}
	
	public function createAction()
	{
		$this->_helper->layout->disableLayout();
		$rows = $this->create->inserting($_POST);
	}
	
	public function updatingAction()
	{
		$this->_helper->layout->disableLayout();
		if($this->getRequest()->isGET())
			if($_GET['action'] == "addcreateives")
			{
				$addc = TRUE;
				$this->view->addc = $addc;
			}
		$rows = $this->create->displayAll();
		$this->view->data = $rows;
	}
}