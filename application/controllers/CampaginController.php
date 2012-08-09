<?php
class CampaginController extends Zend_Controller_Action
{
	private $create;
	private $data;
	private $campaign;
	private $link;
	private $email;
	private $track;
	
	public function init()
	{
		$this->data = new Default_Model_Data();
		$this->campaign = new Default_Model_Campaign();
		$this->create = new Default_Model_Creative();
		$this->link = new Default_Model_Link();
		$this->email = new Default_Model_Email();
		$this->track = new Default_Model_Track();
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
		$data = $this->link->extractID($_GET["id"]);
		$this->view->data = $data;
	}
	
	public function trackAction()
	{
		if($_GET['type'] == "open")
		{
			$data["type"] = "open";
			$this->track->inserting($data);
		}
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
			$data["type"] = $_POST["type"];
			$data["link_name"] = $_POST['link_name'];
			$tmpName  = $_FILES['linkfile']['tmp_name'];  
			$image = file_get_contents($tmpName);
			$data["picture"] = $image;
			$this->link->inserting($data);
		}
	}
	
	public function displaylinkAction()
	{
		$id = $_GET["link_image_id"];
		$info["type"] = "click";
		$info["linkID"] = "";
		$data = $this->link->extractID($id);
		header('Content-Type: image/jpeg');
		echo $data[0]["picture"];
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
	
	public function sendAction()
	{
		$this->email->send();
	}

	public function bestbuyAction(){
		
	}
	
	public function macysAction(){
		
	}
	
	public function targetAction(){
	
	}
}
