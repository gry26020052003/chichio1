<?php
class Default_Model_Email
{
	
	public function send()
	{
		$db = Zend_Registry::get('db');		
		$stmt = $db->query('SELECT linkid.id as linkid, linkid.link_name
												FROM linkid, creatives
												WHERE linkid.creativeID	= creatives.id
												AND linkid.creativeID = 62'); 
												
		$to = 'nobody@example.com';
		$subject = 'If you are suffering from side effects because of a pelvic mesh implant, file your claim today!';
		$message = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<title>FreeCreditClick </title>
<body bgcolor="#ffffff" text="#000000">
<center>';
	
		while ($row = $stmt->fetch()) 
		{
   	 	 	$message .= '<tr>
      					<td>Sally</td><td><a href="'.$row["link_name"].'?creativeID=62&linkid=&'.$row["linkid"].'">
      					<img src="http://chichionline.net/chichi-tian/public/campagin/displaylink?link_image_id='.$row["linkid"].'"> </img> </td>
   					 </tr>';
		}
  	$message .= '</table>
</body>
</html>
';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'Content-Transfer-Encoding: base64' . "\r\n";
$headers .= 'From: MeshPatchRecallCenter <birthday@example.com>' . "\r\n";		
mail('kencai166@gmail.com', $subject, $message, $headers);
mail('gry2600@gmail.com', $subject, $message, $headers);
		

	}
}


?>