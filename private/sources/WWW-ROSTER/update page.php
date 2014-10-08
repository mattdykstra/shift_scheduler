<?php
  include('connection.php');
  error_reporting(0);
  $id=$_REQUEST['id'];
?>
<!DOCTYPE html>
<html lang="en"><head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<script>
function validateForm()
{
	var salary = document.forms["updatepage"]["usalary"].value;
    if (salary==null || salary=="") {
        alert("Salary must be filled out");
        return false;
    }
	var name = document.forms["updatepage"]["uname"].value;
    if (name==null || name=="") {
        alert("Name must be filled out");
        return false;
    }
	
	var pos = document.forms["updatepage"]["uposition"].value;
    if (pos==null || pos=="") {
        alert("Position must be filled out");
        return false;
    }
	var mail = document.forms["updatepage"]["uemail"].value;
    if (mail==null || mail=="") {
        alert("E-mail must be filled out");
        return false;
    }
	var phone = document.forms["updatepage"]["uphone"].value;
    if (phone==null || phone=="") {
        alert("Phone no must be filled out");
        return false;
    }
}
</script>
</head>

<body>
	<form method="post" name="updatepage" action="manager_view.php?updid=<?php echo  $id; ?>">
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">
<?
 
	
		$qry=mysql_query("SELECT * FROM `staff_table` WHERE id='".$id."'");
		while($row=mysql_fetch_array($qry))
		{
		?>
			<table class="table-bordered table-striped table-condensed cf">
				<tr><td>Name:</td><td><input type="text" name="uname" value="<? echo $row['name']; ?>" required="required" /> </td></tr>
				<tr><td>Position:</td><td><input type="text" name="uposition" value="<? echo $row['position']; ?>" /></td></tr>
				<tr><td>E-mail:</td><td><input type="email" name="uemail" value="<? echo $row['email']; ?>" required="required" /></td></tr>
				<tr><td>Phone:</td><td><input type="text" name="uphone" maxlength="12" value="<? echo '0'."".$row['phone']; ?>" required="required" /></td></tr>
				<tr><td>Hourly:</td><td><input type="number" step="any" name="uhrl" value="<? echo $row['hourly']; ?>" required="required" /></td></tr>
				<tr><td>Mon to Fri:</td><td><input type="number" step="any" name="umtf" value="<? echo $row['mon_fri']; ?>" required="required" /></td></tr>
				<tr><td>Saturday:</td><td><input type="number" step="any" name="usat" value="<? echo $row['sat']; ?>" required="required" /></td></tr>
				<tr><td>Sunday:</td><td><input type="number" step="any" name="usun" value="<? echo $row['sun']; ?>" required="required" /></td></tr>
				<tr><td>Salary:</td><td><input type="number" step="any" name="usalary" value="<? echo $row['salary']; ?>" /></td></tr>
				<tr><td></td><td><input type="submit" name="edit" value="Update" onClick="return validateForm()" /><input type="submit" name="deleterec" value="Delete record" /></td></tr>

			</table>
		<?
		}
	
	
?>

		</div>
	</form>
</body>
</html>