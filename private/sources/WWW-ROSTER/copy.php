<?php
  include('connection.php');
  error_reporting(0);
  
  function staff()
	{
		echo "<option value='All'>All Staff</option>";
		$query=mysql_query("SELECT * FROM `staff_table`");
		while($row=mysql_fetch_array($query))
		{
			echo "<option value='".$row[id]."'>".$row[name]."</option>";
		}
		
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
</head>

<body>
	<form method="post" action="manager_view.php"/>
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">
			<table align="center" class="table-bordered table-striped table-condensed cf">
				<tr><td>Staff:</td><td><select name="copystaff"><? staff(); ?></select></td></tr>
				<tr><td></td><td><input type="submit" name="copyshift" value="Copy to Next Week" /></td></tr>
			</table>
		</div>
	</form>
</body>
</html>