<?php 	

require_once 'core.php';

$companyId = $_POST['companyId'];

$sql = "SELECT company_id, company_name, company_active, company_status FROM companys WHERE company_id = $companyId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);