<?php
class Default_Model_Link extends Zend_Db_Table_Abstract
{
	protected $_name='linkid';
  protected $_primary = 'id';
	
	public function display()
	{
		$data = $this->fetchAll()->toArray();
		return $data;
	}
	
	public function inserting($data)
	{
		$this->insert($data);
	}
	
	public function displaybyID($id)
	{
		$data = $this->fetchAll($this->select()->where('creativeID = ?', $id))->toArray();
		return $data;
	}
	
	public function extractID($id)
	{
		$data = $this->fetchAll($this->select()->where('id = ?', $id))->toArray();
		return $data;
	}
}