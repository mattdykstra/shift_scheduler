<?php
  include('connection.php');
  error_reporting(0);
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
				<tr><td>Name:</td><td><input type="text" name="name" required="required" /> </td></tr>
				<tr><td>Position:</td><td><input type="text" name="position" /></td></tr>
				<tr><td>E-mail:</td><td><input type="email" name="email" required="required" /></td></tr>
				<tr><td>Phone:</td><td><input type="number" name="phone" value="0" maxlength="11" required="required" /></td></tr>
				<tr><td>Hourly:</td><td><input type="number" step="any" name="hrl" required="required" /></td></tr>
				<tr><td>Mon to Fri:</td><td><input type="number" step="any" name="mtf" /></td></tr>
				<tr><td>Saturday:</td><td><input type="number" step="any" name="sat" /></td></tr>
				<tr><td>Sunday:</td><td><input type="number" step="any" name="sun" /></td></tr>
				<tr><td>Salary:</td><td><input type="number" step="any" name="sal" required="required" /></td></tr>
				<tr><td></td><td><input type="submit" name="addemp1" value="Add Employee" /></td></tr>
			</table>
		</div>
	</form>
</body>
</html>