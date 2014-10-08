<?php
	session_start();
	
	//-------- database connection----------

	$hostname="localhost";
	$username="website_roster";
	$password="Confus3d";
	$db="website_roster";     //----database name
	
	$con=mysql_connect($hostname, $username, $password);
	$db=mysql_select_db($db,$con);	
	
	
	if($_SESSION['email']=="")
    {
		header("location:index.php");	  
	}
?>