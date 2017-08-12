<?php 	

require_once 'core.php';

$sql = "SELECT company_id, company_name, company_active, company_status FROM companys WHERE company_status = 1";
$result = $connect->query($sql);

$output = array('data' => array());

if($result->num_rows > 0) { 

 // $row = $result->fetch_array();
 $activecompanys = ""; 

 while($row = $result->fetch_array()) {
 	$companyId = $row[0];
 	// active 
 	if($row[2] == 1) {
 		// activate member
 		$activecompanys = "<label class='label label-success'>Available</label>";
 	} else {
 		// deactivate member
 		$activecompanys = "<label class='label label-danger'>Not Available</label>";
 	}

 	$button = '<!-- Single button -->
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Action <span class="caret"></span>
	  </button>
	  <ul class="dropdown-menu">
	    <li><a type="button" data-toggle="modal" data-target="#editcompanyModel" onclick="editcompanys('.$companyId.')"> <i class="glyphicon glyphicon-edit"></i> Edit</a></li>
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removecompanys('.$companyId.')"> <i class="glyphicon glyphicon-trash"></i> Remove</a></li>       
	  </ul>
	</div>';

 	$output['data'][] = array( 		
 		$row[1], 		
 		$activecompanys,
 		$button
 		); 	
 } // /while 

} // if num_rows

$connect->close();

echo json_encode($output);