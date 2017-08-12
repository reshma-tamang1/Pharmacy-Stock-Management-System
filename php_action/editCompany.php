<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$companyName = $_POST['editcompanyName'];
  $companyStatus = $_POST['editcompanyStatus']; 
  $companyId = $_POST['companyId'];

	$sql = "UPDATE companys SET company_name = '$companyName', company_active = '$companyStatus' WHERE company_id = '$companyId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the members";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST