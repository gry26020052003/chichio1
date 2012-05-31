<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap{
	
	protected function _initDb()
	{
		if($_SERVER['SERVER_NAME'] == 'localhost')
		{
			$db = Zend_Db::factory('Pdo_Mysql', array(
   													 'host' => 'localhost',
           									 'username' => 'tian',
												  	 'password' => 'nx349r0x',
											   		 'dbname'   => 'chichio1_advertise' ));
		}
		else 
		{
			$db = Zend_Db::factory('Pdo_Mysql', array(
   													 'host' => 'localhost',
                						 'username' => 'chichio1',
               							 'password' => 'dat8tiantianT@',
                						 'dbname'   => 'chichio1_advertise' ));
		}


		Zend_Registry::set('db', $db);
		Zend_Db_Table_Abstract::setDefaultAdapter($db);
	}
	
	protected function _initPath()
	{
		$parts = explode("/", $_SERVER['REQUEST_URI']);
		$realpath ="/".$parts[1]."/public/";
		define('realpath', $realpath);
	}
	
	
   protected function _initAutoload()
  {
		$autoloader = new Zend_Application_Module_Autoloader(array(
    			        'namespace' => 'Default_',
            			'basePath'  => APPLICATION_PATH,
     ));
    return $autoloader;
  }
	

}
