<?php
  include('connection.php');
  error_reporting(0);
	$ed=$_REQUEST['ed'];
	$uid=$_REQUEST['uid'];
	
	
	function adrol()
	{

		$query=mysql_query("SELECT * FROM `roles`");
		while($row=mysql_fetch_array($query))
		{
			echo "<option value='".$row[role_code]."'>".$row[role_code]." - ".$row[role_name]."</option>";
		}
		
	}
	function timingdt()
	{
		$j=12;
		$jj=0;
		for($i=7;$i<=23;$i++)
		{
			if($i<12)
			{
				if($i<10)
				{	if($i==0)
					{	
						echo "<option value='0".$i.":00'>12:00AM</option>";
						echo "<option value='0".$i.":30'>12:30AM</option>";
					}
					else
					{
						echo "<option value='0".$i.":00'>".$i.":00AM</option>";
						echo "<option value='0".$i.":30'>".$i.":30AM</option>";
					}
				}
				else
				{
					echo "<option value='".$i.":00'>".$i.":00AM</option>";
					echo "<option value='".$i.":30'>".$i.":30AM</option>";
				}
			}
			else
			{
						
					if($i==12)
					{	
						echo "<option value='".$i.":00'>".$i.":00PM</option>";
						echo "<option value='".$i.":30'>".$i.":30PM</option>";
					}
					else
					{
						$jj=$i-$j;
						echo "<option value='".$i.":00'>".$jj.":00PM</option>";
						echo "<option value='".$i.":30'>".$jj.":30PM</option>";
					}
			}
		} 
	}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>

<body>
	<form method="post" action="manager_view.php?uid=<?php echo $uid; ?>"/>
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
		<div class="containtwo">

			<table align="center" class="table-bordered table-striped table-condensed ">
				<tr><td>Date:</td><td><input type="text" name="tdate" value="<? echo $ed; ?>" readonly /> </td></tr>
				<tr><td>Start Time:</td><td><select name="start"><? timingdt(); ?> </select></td></tr>
				<tr><td>Finish Time:</td><td><select name="finish" ><? timingdt(); ?></select></td></tr>
				<tr><td>Role:</td><td><select name="role"><?php adrol(); ?></select></td></tr>
				<tr><td>Split Start:</td><td><select name="splitst"><? timingdt(); ?></select></td></tr>
				<tr><td>Split Finish:</td><td><select name="splitstfi"><? timingdt(); ?></select></td></tr>
				<tr><td>Split Role:</td><td><select name="splitrole" > <?php adrol(); ?></select></td></tr>
				<tr><td>Break Start:</td><td><select name="breakst"><? timingdt(); ?></select></td></tr>
				<tr><td>Break Finish:</td><td><select name="breakfi"><? timingdt(); ?></select></td></tr>
				<tr><td></td><td><input type="submit" name="addtime" value="Update time" /><input type="submit" name="offwork" value="Work off" /></td></tr>
			</table>

		</div>
	</form>
</body>
</html>