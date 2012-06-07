<?php
class CampaginController extends Zend_Controller_Action
{
	private $create;
	private $data;
	private $campaign;
	private $link;
	
	public function init()
	{
		$this->data = new Default_Model_Data();
		$this->campaign = new Default_Model_Campaign();
		$this->create = new Default_Model_Creative();
		$this->link = new Default_Model_Link();
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
			unset($_GET["_"]);
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
				$this->_redirect('/campagin');
				return;
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
	
	public function linkidAction()
	{
		if($this->getRequest()->isGET())
			if(isset($_GET["creativeID"]))
			{
				$this->view->creativeID = $_GET['creativeID'];
				$data = $this->link->displayByID($_GET["creativeID"]);
				$this->view->data = $data;
			}
			
		if($this->getRequest()->isPOST())
		{
			$data = array();
			$data["creativeID"] = $_POST["creativeID"];
			if(!empty($_POST["link_name"][0]))
			{
				$data["link_name"] = $_POST["link_name"][0];
				$this->link->inserting($data);
			}
			if(!empty($_POST["link_name"][1]))
			{
				$data["link_name"] = $_POST["link_name"][1];
				$this->link->inserting($data);
			}
			
			
			print_r($data);
			
		}
	}
	
	public function updatingAction()
	{
		if($this->getRequest()->isGET())
		{
			if(isset($_GET['cid']))
			{
				$data = $this->campaign->displayByID($_GET['cid']);
				$this->view->data = $data;
			}
			
			if(isset($_GET['action']))
				if($_GET['action'] == "addlink")
					$this->view->action = "addlink";
		}
			
		if($this->getRequest()->isPOST())
		{
			$this->create->inserting($_POST);
			$this->_redirect($_SERVER['HTTP_REFERER']);
		}
		
		$create_data = $this->create->displaybyID($_GET['cid']);
		$this->view->create = $create_data;
	}
}
