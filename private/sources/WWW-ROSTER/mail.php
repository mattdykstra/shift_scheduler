<?php 
include('connection.php');
include_once('function.php');
error_reporting(0);
$eeid=$_SESSION['email'];
if(isset($_POST['submit']))
{
	echo $status=email_script($_POST['email'],$_POST['subject'],$_POST['message']);
}
?>
<style>
.buttondiv
{
  float:right;
}
</style>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--<html xmlns="http://www.w3.org/1999/xhtml">-->
<head>

</head>

<body>
	<form method="post">
		<a class="buttondiv" href="manager_view.php"><input type="button" value="Close" /></a>
<?
	$que=mysql_query("SELECT * FROM `log_table` WHERE `eid`='".$eeid."'");
	while($roweek=mysql_fetch_array($que))
	{	$cweek=$roweek['cwek'];	}
	
	//$cdate=date('d M y', strtotime(' 0 day'));
	$mailcounter=0;
	$query=mysql_query("SELECT * FROM `staff_table`");			//-------select employee id
	while($row=mysql_fetch_array($query))
	{
		$counter=0;
		$mbody="To view the live roster visit http://roster.hodgepodge.com.au <br>";
		for($i=1;$i<=7;$i++)
		{
			switch ($i)
			{
				case "1":
					$cdate=date("d M y",strtotime(' '.$cweek.' monday this week'));
					break;
				case "2":
					$cdate=date("d M y",strtotime(' '.$cweek.' tuesday this week'));
					break;
				case "3":
			    	$cdate=date("d M y",strtotime(' '.$cweek.' wednesday this week'));
				    break;
			  case "4":
				    $cdate=date("d M y",strtotime(' '.$cweek.' thursday this week'));
				    break;
			  case "5":
				    $cdate=date("d M y",strtotime(' '.$cweek.' friday this week'));
				    break;
			  case "6":
				    $cdate=date("d M y",strtotime(' '.$cweek.' saturday this week'));
				    break;
			  case "7":
				    $cdate=date("d M y",strtotime(' '.$cweek.' sunday this week'));
				    break;
			}
		
		//	$cdate=date("d M y",strtotime(' '.$i.' day'));		//--------select current date

			$qry=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$row['id']."' && date='".$cdate."' && published!='YES') ");
			while($roww=mysql_fetch_array($qry))
			{
				$counter+=1;
				$msub="Update time schedule";
				$mbody.="<br>Date: ".$roww['date']."<br>";
				$mbody.="Time:".$roww['start_time']." To ".$roww['finish_time']."<br>";
				if($roww['split_start']!="00:00")
				{
					$mbody.="Split Time:".$roww['split_start']." To ".$roww['split_finish']."<br>";
				}
				$upqury=mysql_query("UPDATE `timesheet` SET `published`='YES' WHERE (staff_id='".$row['id']."' && date='".$cdate."')");
			}
		}
		if($counter!=0)
		{
			$mbody.="<br><br>Kind Regards<br><br>HodgePodge Management";
			$status=email_script($row['email'],"Roster has been updated",$mbody);
			$mailcounter+=1;
		}
	}
	if($status)
	{
		echo "You have ".$mailcounter." mails sent.";
	}
	else
	{
		echo "Not any data for mail.";
	}
	//header("location:manager_view.php?msg=Your mails have been sent.");
	


?>

	</form>
</body>
</html>