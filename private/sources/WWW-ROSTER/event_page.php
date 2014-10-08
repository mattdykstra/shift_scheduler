<?php
  include('connection.php');
  error_reporting(0);
	$id=$_REQUEST['id'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
	<form method="post" action="manager_view.php?updid=<?php echo $id; ?>">
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">
<?
	$query=mysql_query("SELECT * FROM `events` WHERE event_date='".$id."'");
	while($row=mysql_fetch_array($query))
	{
		$dat=$row['event_date'];
		if($dat==$id)
		{
			?>
			<table align="center" class="table-bordered table-striped table-condensed cf">
				<tr><td>Event Name:</td><td><input type="text" name="eventname" value="<? echo $row['event']; ?>" required="required" /> </td></tr>
				<tr><td>Date:</td><td><input type="text" name="eventd" value="<? echo $row['event_date']; ?>" readonly /> </td></tr>
				<tr><td></td><td><input type="submit" name="upevent" value="Update Event" /><input type="submit" name="remove" value="Remove Event" /></td></tr>
			</table>
			<?
		}
	}
	if($dat!=$id)
	{
		?>
			<table align="center" class="table-bordered table-striped table-condensed cf">
				<tr><td>Event Name:</td><td><input type="text" name="eventname" required="required" /> </td></tr>
				<tr><td>Date:</td><td><input type="text" name="eventd" value="<? echo $id; ?>" readonly /> </td></tr>
				<tr><td></td><td><input type="submit" name="addevent" value="Add Event" /></td></tr>
			</table>
		<?
	}
	?>
		</div>
	</form>
</body>
</html>