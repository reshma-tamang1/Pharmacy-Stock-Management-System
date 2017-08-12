<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$companyId = $_POST['companyId'];

if($companyId) { 

 $sql = "UPDATE companys SET company_status = 2 WHERE company_id = {$companyId}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the company";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST