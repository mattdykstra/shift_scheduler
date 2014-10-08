<?php
  include('connection.php');
  $emlocal=$_SESSION['email'];
  error_reporting(0);

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>

<body>
	<form method="post" action="manager_view.php?uid=<?php echo $emlocal; ?>"/>
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">
			<table align="center" class="table-bordered table-striped table-condensed cf">
				<tr><td>User id:</td><td><?php echo $emlocal; ?></td></tr>
				<tr><td>Old password:</td><td><input type="password" name="opwd" maxlength="8" required="" /></td></tr>
				<tr><td>New Password:</td><td><input type="password" name="npwd" maxlength="8" required=""/></td></tr>
				<tr><td>Re-confirm password:</td><td><input type="password" name="cpwd" maxlength="8" required=""/></td></tr>
				<tr><td></td><td><input type="submit" name="chngpwd" value="Change password"/></td></tr>
			</table>
				
		</div>
	  
	</form>
</body>
</html>