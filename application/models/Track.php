<?php
class Default_Model_Track extends Zend_Db_Table_Abstract
{
	protected $_name='track';
  protected $_primary = 'id';
	
	public function display()
	{
		$select = $this->select()->order("id DESC");
		$data = $this->fetchAll($select)->toArray();
		return $data;
	}
	
	public function inserting($data)
	{
		$this->insert($data);
	}
	
	public function displaybyID($id)
	{
		$data = $this->fetchAll($this->select()->where('campagin_id = ?', $id))->toArray();
		return $data;
	}
}