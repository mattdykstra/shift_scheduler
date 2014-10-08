<?php
	include('connection.php');
	$eeid=$_SESSION['email'];
	date_default_timezone_set("UTC");
	error_reporting(0);
	//error_reporting(E_ALL);
	echo $msg=$_REQUEST['msg'];
	if(isset($_POST['edit']))
	{

	 	$updid = $_REQUEST['updid'];
		$query=mysql_query("UPDATE `staff_table` SET `name`='".$_POST['uname']."', `position`='".$_POST['uposition']."', `email`='".$_POST['uemail']."', `phone`='".$_POST['uphone']."', `hourly`='".$_POST['uhrl']."', `mon_fri`='".$_POST['umtf']."', `sat`='".$_POST['usat']."', `sun`='".$_POST['usun']."', `salary`='".$_POST['usalary']."' WHERE (id='".$updid."')");

		
	}
	elseif(isset($_POST['addtime']))
	{
		if($_POST['finish']!="00:00" && $_POST['start']!= $_POST['finish'])
		{	$tuid=$_REQUEST['uid'];
			if($_POST['splitst']==$_POST['splitstfi']) 
				$qry="INSERT INTO `timesheet`(`staff_id`, `date`, `start_time`, `finish_time`, `role`, `split_start`, `split_finish`, `split_role`, `break_start`, `break_finish`, `published`) VALUES ('".$tuid."','".$_POST['tdate']."','".$_POST['start']."','".$_POST['finish']."','".$_POST['role']."','00:00','00:00','".$_POST['splitrole']."','".$_POST['breakst']."','".$_POST['breakfi']."','NO')";
			else
				$qry="INSERT INTO `timesheet`(`staff_id`, `date`, `start_time`, `finish_time`, `role`, `split_start`, `split_finish`, `split_role`, `break_start`, `break_finish`, `published`) VALUES ('".$tuid."','".$_POST['tdate']."','".$_POST['start']."','".$_POST['finish']."','".$_POST['role']."','".$_POST['splitst']."','".$_POST['splitstfi']."','".$_POST['splitrole']."','".$_POST['breakst']."','".$_POST['breakfi']."','NO')";
			$query=mysql_query($qry);

		}
		else
		{	?><script type="text/javascript">
				   alert('Please select starting ending time..');
			</script><?
		}
	}
	elseif(isset($_POST['offwork']))
	{
		$tuid=$_REQUEST['uid'];
		$qry="INSERT INTO `unavailable`(`staff_id`, `unavailable_start`) VALUES ('".$tuid."','".$_POST['tdate']."')";
		$query=mysql_query($qry);

	}
	elseif(isset($_POST['editime']))
	{
		
		$up_startone=($_POST['edtstm']!='#'?$_POST['edtstm']:date("H:i", strtotime($_POST['uponest'])));
		$up_finishone=($_POST['edtfin']!='#'?$_POST['edtfin']:date("H:i", strtotime($_POST['uponefn'])));
		$up_roleone=($_POST['edtrole']!='#'?$_POST['edtrole']:$_POST['uponerl']);
		$up_starttwo=($_POST['edtsplst']!='#'?$_POST['edtsplst']:date("H:i", strtotime($_POST['uponepst'])));
		$up_finishtwo=($_POST['edtsplfin']!='#'?$_POST['edtsplfin']:date("H:i", strtotime($_POST['uponepfn'])));
		$up_roletwo=($_POST['edtsplrole']!='#'?$_POST['edtsplrole']:$_POST['uponeprl']);
		$up_sbreak=($_POST['edtbst']!='#'?$_POST['edtbst']:date("H:i", strtotime($_POST['uponebst'])));
		$up_fbreak=($_POST['edtbf']!='#'?$_POST['edtbf']:date("H:i", strtotime($_POST['uponebfn'])));
		
		//if(($up_finishtwo=="00:00" ) && ($up_sbreak!=$up_fbreak || $up_fbreak=="00:00"))
		//{
			$updid = $_REQUEST['edid'];
			$query=mysql_query("UPDATE `timesheet` SET `start_time`='".$up_startone."',`finish_time`='".$up_finishone."',`role`='".$up_roleone."', `split_start`='".$up_starttwo."',`split_finish`='".$up_finishtwo."',`split_role`='".$up_roletwo."', `break_start`='".$up_sbreak."',`break_finish`='".$up_fbreak."', `published`='NO' WHERE (staff_id='".$updid."' && date='".$_POST['edtdate']."')");
			if($query)
			{
			}
			else
			{	?><script type="text/javascript">
				   alert('Error...!');
				</script><?
			}
			
		//}
		//else
		//{

		//}
	}elseif(isset($_POST['copyshift']))
	{	
		$que=mysql_query("SELECT * FROM `log_table` WHERE `eid`='".$eeid."'");
		while($roweek=mysql_fetch_array($que))
		{	$cweek=$roweek['cwek'];	}
		$staffid = $_REQUEST['copystaff'];
		for($i=0;$i<=6;$i++){
			$currentwk= date('d M y', strtotime(' '.$cweek.' monday this week'));
			$day_text = date('d M y', strtotime($currentwk.' + '.$i.' days'));
			$dayname_text = date('l', strtotime($day_text));
			if ($staffid != 'All') $staff_id = " AND staff_id = '".$staffid."'";
			$qry=mysql_query("SELECT * FROM `timesheet` WHERE `date` = '".$day_text."'".$staff_id );
			while($row=mysql_fetch_array($qry)){
				$oneWeekLater = date("d M y",strtotime($day_text.' + 1 week'));
				$qry1="DELETE FROM `timesheet` where `staff_id` = '".$row['staff_id']."' AND `date`='".$oneWeekLater."'";
				$query=mysql_query($qry1);
				$qry2="INSERT INTO `timesheet`(`staff_id`, `date`, `start_time`, `finish_time`, `role`, `split_start`, `split_finish`, `split_role`, `break_start`, `break_finish`, `published`) 
				VALUES ('".$row['staff_id']."', '".$oneWeekLater."', '".$row['start_time']."', '".$row['finish_time']."', '".$row['role']."', '".$row['split_start']."', '".$row['split_finish']."', '".$row['split_role']."', '".$row['break_start']."', '".$row['break_finish']."', 'NO')";
				$query=mysql_query($qry2);
			}
		}
		
	}
	elseif(isset($_POST['publish']))
	{
		header("location:mail.php");
	}
	elseif(isset($_POST['deleterec']))
	{
		$updid = $_REQUEST['updid'];
		$query=mysql_query("DELETE FROM `staff_table` WHERE id='".$updid."'");
		if($query)
		{
			?><script type="text/javascript">
				   alert('Your data record has been deleted.');
			</script><?
		}
		else
		{	?><script type="text/javascript">
				   alert('Error...!');
			</script><?	echo "Error...!";
		}
	}
	elseif(isset($_POST['deletereco']))
	{
		$uid = $_REQUEST['edid'];
		$dt = $_REQUEST['eddt'];
		$query=mysql_query("DELETE FROM `timesheet` WHERE (staff_id='".$uid."' && date='".$dt."') ");
		if($query)
		{
		}
		else
		{	?><script type="text/javascript">
				   alert('Error...!');
			</script><?	echo "Error...!";
		}
	}
	elseif(isset($_POST['deleterecoff']))
	{
		$uid = $_REQUEST['edid'];
		$dt = $_REQUEST['eddt'];
		$query=mysql_query("DELETE FROM `unavailable` WHERE (staff_id='".$uid."' && unavailable_start='".$dt."') ");
		if($query)
		{
		}
		else
		{	?><script type="text/javascript">
				   alert('Error...!');
			</script><?	echo "Error...!";
		}
	}
	elseif(isset($_POST['addevent']))
	{
			$qry="INSERT INTO `events`(`event`, `event_date`) VALUES ('".$_POST['eventname']."','".$_REQUEST['updid']."')";
			$query=mysql_query($qry);
			if($query)
			{	
			}
			else
			{	?><script type="text/javascript">
				   alert('Error...!');
				</script><?
			}
	}
	elseif(isset($_POST['upevent']))
	{
			$qry=("UPDATE `events` SET `event`='".$_POST['eventname']."' WHERE event_date='".$_REQUEST['updid']."'");
			$query=mysql_query($qry);
			if($query)
			{	
			}
			else
			{	?><script type="text/javascript">
				   alert('Error...!');
				</script><?
			}
	}
	elseif(isset($_POST['remove']))
	{
			$qry=("DELETE FROM `events` WHERE event_date='".$_REQUEST['updid']."'");
			$query=mysql_query($qry);
			if($query)
			{
			}
			else
			{	?><script type="text/javascript">
				   alert('Error...!');
				</script><?
			}
	}
	elseif(isset($_POST['addemp1']))
	{
		$qry="INSERT INTO `staff_table`(`name`, `position`, `email`, `phone`, `hourly`, `mon_fri`, `sat`, `sun`, `salary`) VALUES ('".$_POST['name']."','".$_POST['position']."','".$_POST['email']."','".$_POST['phone']."','".$_POST['hrl']."','".$_POST['mtf']."','".$_POST['sat']."','".$_POST['sun']."','".$_POST['sal']."')";
		$query=mysql_query($qry);
		if($query)
		{	
		}
		else
		{	?><script type="text/javascript">
			   alert('Error...!');
			</script><?
		}
	}
	elseif(isset($_POST['chngpwd']))
	{
		$emlocal=$_REQUEST['uid'];
		if($_POST['npwd']==$_POST['cpwd'])
		{
			$mopwd=md5($_POST['opwd']);
			$mcpwd=md5($_POST['cpwd']);
			$qry=mysql_query("SELECT * FROM `log_table` WHERE eid='".$emlocal."'");
			while($row=mysql_fetch_array($qry))
			{
				if($row['pass']==$mopwd)
				{
					$query=mysql_query("UPDATE `log_table` SET `pass`='".$mcpwd."' WHERE (eid='".$emlocal."' && pass='".$mopwd."')");
					if(!$query)
					{ ?><script type="text/javascript">	   alert('Please enter correct passcode...! Try again.');	</script><?  }
					else
					{ ?><script type="text/javascript">	   alert('Your passcode has been successfully changed.');	</script><?  }
				}
				else
				{	?><script type="text/javascript">	   alert('Please enter correct passcode...! Try again.');	</script><?	}
			}
		}
		else
		{
			?><script type="text/javascript">	   alert('Please enter correct re-confirm passcode.');	</script><?	
		}
	}
	
	
	function cellcolor($userid, $date)
	{
		$querycol=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$userid."' && date='".$date."')");
		$rowcol=mysql_fetch_array($querycol);
		if($rowcol['published']=='NO')
		{ ?><td class="text-center"  style="background-color:#f0ad4e;"><? }
		elseif($rowcol['published']=='YES')
		{ ?><td class="text-center" style="background-color:#5cb85c;"><? }
		else
		{ ?><td class="text-center"><? }
	}
	

?>

<!DOCTYPE html>
<html lang="en"><head>

    <meta charset="utf-8">
    <title>Manager view | Roster</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/no-more-tables.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">
  
 </head>
<body>
	<form method="post">
		<div class="navbar navbar-default navbar-static-top" role="navigation">
		  <div class="container">
			<div class="navbar-header">
			  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			  </button>
			</div>
			<div class="navbar-collapse collapse">
			  <ul class="nav navbar-nav">
				<li><a href="#"><input class="bid" type="submit" name="pweek" value="Previous Week" /></a></li>
				<li><a href="#"><input class="bid" type="submit" name="nweek" value="Next Week" /></a></li>
				<li><a href="copy.php" rel="ibox">Copy Shifts</a></a></li>
				<li><a href="mail.php" rel="ibox">Publish Shifts</a></li>
			  </ul>
			  <ul class="nav navbar-nav navbar-right">
				<li><a href="change_pw.php" rel="ibox">Change Password</a></li>
				<li><a href="logout.php">Logout</a></li>
			  </ul>
			</div><!--/.nav-collapse -->
		  </div>
		</div>


		<div class="containone">
			<table class="table-bordered table-striped table-condensed cf" id="no-more-tables">
<?
	$cdate=date('d M y', strtotime(' 0 day'));
	$que=mysql_query("SELECT * FROM `log_table` WHERE `eid`='".$eeid."'");
	while($roweek=mysql_fetch_array($que))
	{	$cweek=$roweek['cwek'];	}
	
	if(isset($_POST['pweek']) || isset($_POST['nweek']) || $cweek!=0 )
	{
		/*$cweek=($_POST['cw']==""?1:$_POST['cw']);*/
		if(isset($_POST['pweek']))
		{	$cweek=$cweek-($cweek==1?2:1);	}
		elseif(isset($_POST['nweek']))
		{	$cweek=$cweek+($cweek==-1?2:1);	}
		$que=mysql_query("UPDATE `log_table` SET `cwek`='".$cweek."' WHERE eid='$eeid'" );
		?>

				<thead class="cf">
				<tr>
					<th class="bg-primary"><a href="add_emp.php" rel="ibox">Add Employee</a></th>
				
		<?
		for($i=1;$i<=7;$i++)
		{
		
			?><th colspan="2" class="bg-primary text-center"><?
			if($i==1)
			{ ?>
				
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' monday this week')); ?>" rel="ibox"><? echo $ed; ?></a><br/><?
 			}
			elseif($i==2)
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' tuesday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
			elseif($i==3)
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' wednesday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
			elseif($i==4)
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' thursday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
			elseif($i==5)
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' friday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
			elseif($i==6)
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' saturday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
			else
			{ ?>
				<a href="event_page.php?id=<? echo $ed=date("D d M",strtotime(' '.$cweek.' sunday this week')); ?>" rel="ibox"><? echo $ed; ?><br/></a><?
			}
		
			$query=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
			while($row=mysql_fetch_array($query))
			{ echo "(".$row['event'].")"; } 
			?></th><?
		}
		?>
		<th class="bg-primary"></th>
		<th class="bg-primary"></th>
  	</tr>
	</thead>

	<tbody>
		
					
	<?
	$qry=mysql_query("SELECT * FROM `staff_table` order by `name`");
	while($row=mysql_fetch_array($qry))
	{
		$chrmf=0;
		$chrsat=0;
		$chrsun=0;
		$cminmf=0;
		$cminsat=0;
		$cminsun=0;
		$grosshrssmf=0;
		$grossminsmf=0;
		$grossminsfri=0;
		$grossminssat=0;
		$grossminssun=0;
	 ?>
	 <tr>
		<td class="tdname"><a href="update page.php?id=<? echo $row['id']; ?>" rel="ibox"> <? echo $row['name'];?> &nbsp; </a><? echo $row['position']; ?></td>
		<?
				
		for($i=1;$i<=7;$i++)
		{ 

			if($i==1)
			{
				$ed=date("d M y",strtotime(' '.$cweek.' monday this week'));
				cellcolor($row['id'], $ed);
				?> <span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Mon <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <?
			}
			
			
			elseif($i==2)
			{
				$ed=date("d M y",strtotime(' '.$cweek.' tuesday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed; ?> Tue <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <?
			}
			
			elseif($i==3)
			{
				$ed=date("d M y",strtotime(' '.$cweek.' wednesday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Wed <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <?
			}
				
			elseif($i==4)
			{
				$ed=date("d M y",strtotime(' '.$cweek.' thursday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Thu <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <? }
			elseif($i==5)
			{ 	
				$ed=date("d M y",strtotime(' '.$cweek.' friday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Fri <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <? }
			elseif($i==6)
			{ 	
				$ed=date("d M y",strtotime(' '.$cweek.' saturday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Sat <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <? }
			else
			{
				$ed=date("d M y",strtotime(' '.$cweek.' sunday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><a href="event_page.php?id=<? echo $ed; ?>" rel="ibox"><? echo $ed;  ?> Sun <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></a></span> <?
			}
			
				$cquery=mysql_query("SELECT COUNT(staff_id) FROM `timesheet` WHERE (staff_id='".$row['id']."' && date='".$ed."')");
				$rowcun = mysql_fetch_array($cquery);
				if($rowcun[0]!=0)
				{		
				$query=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$row['id']."' && date='".$ed."')");
				date_default_timezone_set("UTC");
				while($roww=mysql_fetch_array($query))
				{
					if($roww['split_start']!="00:00" || $roww['split_finish']!="00:00")
					{
						?><a style="color:#FFFFFF;" href="edit_time.php?ed=<? echo $ed; ?>&amp;uid=<? echo $row['id']; ?>" rel="ibox"><? echo date("g:ia", strtotime($roww['start_time']))."-".date("g:ia", strtotime($roww['finish_time']))." ".$roww['role']; ?><br/><? echo date("g:ia", strtotime($roww['split_start']))."-".date("g:ia", strtotime($roww['split_finish']))." ".$roww['split_role']; ?></a>
												
						</td><?
						$shiftSt=abs(strtotime($roww['finish_time']) - strtotime($roww['start_time']));
						$splitSt=abs(strtotime($roww['split_finish']) - strtotime($roww['split_start']) );
						if ( $shiftSt > 18000 ) $shiftSt = strtotime('-30 minutes', $shiftSt);
						if ( $splitSt > 18000 ) $splitSt = strtotime('-30 minutes', $splitSt);
						$st=$shiftSt+$splitSt;
						$hr=date("G",$st);
						$min=date("i",$st);
					}
					else
					{
						?><a style="color:#FFFFFF;" href="edit_time.php?ed=<? echo $ed; ?>&amp;uid=<? echo $row['id']; ?>" rel="ibox"><? echo date("g:ia", strtotime($roww['start_time']))."-".date("g:ia", strtotime($roww['finish_time']))." ".$roww['role']; ?></a>
						</td><?
						
						$st=abs(strtotime($roww['finish_time']) - strtotime($roww['start_time']) );
						if ( $st > 18000 ) $st = strtotime('-30 minutes', $st);
						$hr=date("G",$st);
						$min=date("i",$st);
					}
					?><td><? echo $hr.":".$min; ?></td><?
					if($i<=5)
					{	$chrmf+=$hr;
						$cminmf+=$min;
					}
					elseif($i==6)
					{	$chrsat+=$hr;
						$cminsat+=$min;
					}
					else
					{	$chrsun=$hr;
						$cminsun+=$min;
					}
				}
			}
			else
			{
				$queryav=mysql_query("SELECT COUNT(id) FROM `unavailable` WHERE (staff_id='".$row['id']."' && unavailable_start='".$ed."')");
				$rowav=mysql_fetch_array($queryav);
				if($rowav[0]!=0)
				{	?><a href="un_avai.php?ed=<? echo $ed; ?>&amp;uid=<? echo $row['id']; ?>" rel="ibox">OFF</a></td><td>&nbsp;</td> <?	}
				else
				{
					?><a href="add_time.php?ed=<? echo $ed; ?>&amp;uid=<?php echo $row['id']; ?>" rel="ibox" class="tda"> Edit Time
					<!--<input type="button" name="download" class="btn btn-block hoverbtn" value="Add Shift" style="padding:0; color:rgba(000,000,000,0.0); background-color:rgba(000,000,000,0.0); border:none; box-shadow:none;" /> -->
					</a></td><td>&nbsp;</td> <?
				}
				
			}
		}

		$grossminsmf=$cminmf%60;		//-----minutes monday to friday
		$grosshrsmf=(floor($cminmf/60));	//-----counting hours from minutes for monday to friday

		$grossminssat=$cminsat%60;		//-----minutes saturday

		$grossminssun=$cminsun%60;		//-----minutes sunday

		$totalmins=($cminmf+$cminsat+$cminsun);
		$grossmins=$totalmins%60;
		$grosshrs=(floor($totalmins/60));
		$totalhrs=$grosshrs+($chrmf+$chrsat+$chrsun);
		
		?>				<td><span class="visible-xs visible-sm data">Total hours</span><? echo $totalhrs.":".$grossmins; ?></td><?
		if($row['salary']==0)
		{
			$vhrmf=($grossminsmf=="0"?0:(($row['hourly']/2)*$row['mon_fri']));
			$vhrmf=$vhrmf+(($chrmf+$grosshrsmf)*($row['hourly']*$row['mon_fri']));
			
			$vhrsat=($grossminssat=="0"?0:(($row['hourly']/2)*$row['sat']));
			$vhrsat=$vhrsat+($chrsat*($row['hourly']*$row['sat']));
			
			$vhrsun=($grossminssun=="0"?0:(($row['hourly']/2)*$row['sun']));
			$vhrsun=$vhrsun+($chrsun*($row['hourly']*$row['sun']));
		
			$total=$vhrmf+$vhrsat+$vhrsun;
			$grandtotal+=$total;
			
			?>			<td><span class="visible-xs visible-sm data">Total</span>$<? echo round($total); ?></td><?
		}
		else
		{
			$grandtotal+=round($row['salary']/52);
			?>			<td><span class="visible-xs visible-sm data">Total</span>$<? echo round($row['salary']/52); ?></td><?
		}
	?>				</tr><?	
	}?>
		  
				</tbody>
	<? } ?>
			</table>
			<div class="pull-right padding20 bg-primary">
				Grand Total: $<?echo round($grandtotal); ?>
			</div>
			<div class="padding20 text-center bg-primary">
				<?
				$qry=mysql_query("SELECT * FROM `roles`");
				while($row=mysql_fetch_array($qry)){
					echo $row['role_code'] . " = " . $row['role_name'] . "&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				?>
			</div>
			

		</div>

	</form>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>	  
    <script type="text/javascript" src="js/ibox.js"></script>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>