<?php
class Default_Model_Data extends Zend_Db_Table_Abstract
{
	protected $_name='data';
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
}