<?php
  include('connection.php');
  error_reporting(0);
  
  $edtuid=$_REQUEST['uid'];
  $edtdt=$_REQUEST['ed'];
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
</head>

<body>
	<form method="post" action="manager_view.php?edid=<?php echo $edtuid; ?>&amp;eddt=<?php echo $edtdt; ?>">
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">
<?
		$qry=mysql_query("SELECT * FROM `unavailable` WHERE (staff_id='".$edtuid."' && unavailable_start='".$edtdt."')");
		while($row=mysql_fetch_array($qry))
		{
		?>
		<table class="table-bordered table-striped table-condensed cf">
			<tr><td>Date:</td><td><input type="text" name="edtdate" value="<? echo $row['unavailable_start']; ?>" readonly />Off day</td></tr>
			<tr><td></td><td><input type="submit" name="deleterecoff" value="Delete record" /></td></tr>
		</table>
		<?
		}
	
	
?>

		</div>
	</form>
</body>
</html>