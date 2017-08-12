<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$companyName = $_POST['editCategoriesName'];
  $companyStatus = $_POST['editCategoriesStatus']; 
  $categoriesId = $_POST['editCategoriesId'];

	$sql = "UPDATE categories SET categories_name = '$companyName', categories_active = '$companyStatus' WHERE categories_id = '$categoriesId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while updating the categories";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST