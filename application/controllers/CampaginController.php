<?php
class CampaginController extends Zend_Controller_Action
{
	private $create;
	private $data;
	
	public function init()
	{
		$this->data = new Default_Model_Data();
		//$this->create = new Default_Model_Create();
	}
	
	public function indexAction()
	{
		$data = $this->data->display();
		$this->view->data = $data;
		//$this->_helper->layout->disableLayout();
	}
	
	public function insertingAction()
	{
		if($this->getRequest()->isGET())
		{
			array_shift($_GET);
			$this->data->inserting($_GET);
		}
		
		exit;
		if($this->getRequest()->isPOST())
		{
			echo "asdf";
			print_r($_POST);
			return;
			exit;
		}
		
		
	}
	
	
	public function getAction()
	{
		if($this->getRequest()->isPOST())
		{
			foreach($_POST as $key => $value)
				if(strstr($value, "Choose"))
			
			if(empty($_POST['[campaignName]']))
				echo "<script>alert('Please provide a Campagin Name');</script>";
			
			
			
			print_r($_POST);
		}
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