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
		$subject = 'the subject';
		$message = '
		<html>
			<head>
  			<title>Birthday Reminders for August</title>
					</head>
<body>
  <p>Here are the birthdays upcoming in August!</p>
  <table>';
	
		while ($row = $stmt->fetch()) 
		{
   	 	 	$message .= '<tr>
      					<td>Sally</td><td><a href="'.$row["link_name"].'?creativeID=56&linkid=&'.$row["linkid"].'">
      					<img src="http://chichionline.net/chichi-tian/public/campagin/displaylink?link_image_id='.$row["linkid"].'"> </img> </td>
   					 </tr>';
		}
  	$message .= '</table>
  <img src="http://kencai.bugs3.com/score.php" style="display:none"> </img>
</body>
</html>
';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
$headers .= 'From: Birthday Reminder <birthday@example.com>' . "\r\n";
$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";		
mail('kencai166@gmail.com', $subject, $message, $headers);
mail('gry2600@gmail.com', $subject, $message, $headers);
		

	}
}


?>