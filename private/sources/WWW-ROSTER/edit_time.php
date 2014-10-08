<?php
  include('connection.php');
  error_reporting(0);
  
  $edtuid=$_REQUEST['uid'];
  $edtdt=$_REQUEST['ed'];
  
 function timingdt()
	{
		echo "<option value='#'> SELECT TIME </option>";
		$j=12;
		$jj=0;
		for($i=0;$i<=23;$i++)
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
	function adrol()
	{
		?><option value="#">Select role</option><?
		$query=mysql_query("SELECT * FROM `roles`");
		while($row=mysql_fetch_array($query))
		{
			echo "<option value='".$row[role_code]."'>".$row[role_code]." - ".$row[role_name]."</option>";
		}
		
	}
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

			$qry=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$edtuid."' && date='".$edtdt."')");
			while($row=mysql_fetch_array($qry))
			{
			?>
			<table class="table-bordered table-striped table-condensed cf">
				<tr><td>Date:</td><td><input type="text" name="edtdate" value="<? echo $row['date']; ?>" readonly /> </td></tr>
				
				<tr><td>Start Time:</td><td><input style="width:70px;" type="text" name="uponest" value="<? echo date("g:i a", strtotime($row['start_time'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:98px;" name="edtstm"><? timingdt(); ?> </select></td></tr>
				
				<tr><td>Finish Time:</td><td><input style="width:70px;" type="text" name="uponefn" value="<? echo date("g:i a", strtotime($row['finish_time'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:98px;" name="edtfin" ><? timingdt(); ?></select></td></tr>
				
				<tr><td>Role:</td><td><input style="width:70px;" type="text" name="uponerl" value="<? echo $row['role']; ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:98px;" name="edtrole"><?php adrol(); ?></select></td></tr>
				
				<tr><td>Split Time:</td><td><input style="width:70px;" type="text" name="uponepst" value="<? echo date("g:i a", strtotime($row['split_start'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp; <select style="width:98px;" name="edtsplst"><? timingdt(); ?></select></td></tr>
				<tr><td>Split Stop:</td><td><input style="width:70px;" type="text" name="uponepfn" value="<? echo date("g:i a", strtotime($row['split_finish'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:98px;" name="edtsplfin"><? timingdt(); ?></select> </td></tr>
				<tr><td>Role:</td><td><input style="width:70px;" type="text" name="uponeprl" value="<? echo $row['split_role']; ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp; <select style="width:98px;" name="edtsplrole"><?php adrol(); ?></select> </td></tr>
				<tr><td>Break Start:</td><td><input style="width:70px;" type="text" name="uponebst" value="<? echo date("g:i a", strtotime($row['break_start'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp; <select style="width:98px;" name="edtbst"><? timingdt(); ?></select></td></tr>
				<tr><td>Break Finish:</td><td><input style="width:70px;" type="text" name="uponebfn" value="<? echo date("g:i a", strtotime($row['break_finish'])); ?>" readonly />&nbsp;&nbsp;&nbsp;&nbsp;<select style="width:98px;" name="edtbf"><? timingdt(); ?></select> </td></tr>
				<tr><td></td><td><input type="submit" name="editime" value="Update" /><input type="submit" name="deletereco" value="Delete record" /></td></tr>
			</table>
			<?
			}
		
		
	?>

		</div>
	</form>
</body>
</html>