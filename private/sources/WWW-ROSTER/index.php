<?php
	session_start();
	$hostname="localhost";
	$username="website_roster";
	$password="Confus3d";
	$db="website_roster";     //----database name
	
	$con=mysql_connect($hostname, $username, $password);
	$db=mysql_select_db($db,$con);	
	
	error_reporting(0);
	date_default_timezone_set("UTC");

	if(isset($_POST['log']))
	{
		$eml=$_POST['eml'];
		$pww=$_POST['pwd'];
		$pwd=md5($pww);
						
		$qry=mysql_query("SELECT * FROM log_table WHERE eid='$eml' AND pass='$pwd'" );
		$res=mysql_fetch_array($qry);
					
		if($res>0)
		{
			$_SESSION['email']=$res['eid'];
			if($res['utype']=="ADMIN")
			{
				$que=mysql_query("UPDATE `log_table` SET `cwek`='1' WHERE eid='$eml'" );
				header("location:manager_view.php");}
		}
		else
		{	
			header("location:index.php");
		}
	}
	function cellcolor($userid, $date)
	{
		$querycol=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$userid."' && date='".$date."')");
		$rowcol=mysql_fetch_array($querycol);
		if($rowcol['published']=='NO')
		{ ?><td class="text-center" ><? }
		elseif($rowcol['published']=='YES')
		{ ?><td class="text-center" style="background-color:#5cb85c;color:#fff;;"><? }
		else
		{ ?><td class="text-center" ><? }
	}
?>

<!DOCTYPE html>
<html lang="en"><head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Staff view | Roster</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/no-more-tables.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">

	
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
 
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
			  </ul>
			  <ul class="nav navbar-nav navbar-right">
				<li><a href="log.php" rel="ibox">Login</a></li>
			  </ul>
			</div><!--/.nav-collapse -->
		  </div>
		</div>

 
	  
<div class="containone">
<table class="table-bordered table-striped table-condensed cf" id="no-more-tables">

<?
	$cdate=date('d M y', strtotime(' 0 day'));
	$cweek=1;
	if(isset($_POST['pweek']) || isset($_POST['nweek']) || $cweek==1 )
	{
		$cweek=($_POST['cw']==""?1:$_POST['cw']);
		if(isset($_POST['pweek']))
		{	$cweek=$cweek-($cweek==1?2:1);	}
		elseif(isset($_POST['nweek']))
		{	$cweek=$cweek+($cweek==-1?2:1);	}
		?>

	<thead class="cf">
	<tr>
		
		<th class="bg-primary"></th>
		
		<?
		for($i=1;$i<=7;$i++)
		{
		
			?><th colspan="2"class='text-center bg-primary'><?
			if($i==1)
			{ ?>
				<input type="hidden" name="cw" value="<? echo $cweek ?>" />
				<? echo $ed=date("D d M",strtotime(' '.$cweek.' monday this week')); ?><br/><?
 			}
			elseif($i==2)
			{ 
				echo $ed=date("D d M",strtotime(' '.$cweek.' tuesday this week')); ?><br/><?
			}
			elseif($i==3)
			{ 
				echo $ed=date("D d M",strtotime(' '.$cweek.' wednesday this week'));?><br/><?
			}
			elseif($i==4)
			{ 
				echo $ed=date("D d M",strtotime(' '.$cweek.' thursday this week')); ?><br/><?
			}
			elseif($i==5)
			{
				echo $ed=date("D d M",strtotime(' '.$cweek.' friday this week')); ?><br/><?
			}
			elseif($i==6)
			{ 
				echo $ed=date("D d M",strtotime(' '.$cweek.' saturday this week')); ?><br/><?
			}
			else
			{ 
				echo $ed=date("D d M",strtotime(' '.$cweek.' sunday this week')); ?><br/><?
			}
		
			$query=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
			while($row=mysql_fetch_array($query))
			{ echo "(".$row['event'].")"; } 
			?></th><?
		}
		?>
		<th  class="text-center bg-primary">Total</th>

  	</tr>
	</thead>

	<tbody>
		
					
	<?
	$qry=mysql_query("SELECT * FROM `staff_table`");
	while($row=mysql_fetch_array($qry))
	{ ?>
	 <tr>
		<td class="tdname"><? echo $row['name']."&nbsp;&nbsp; <strong>".$row['position']."</strong>"; ?></td>
		<?
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
		
		for($i=1;$i<=7;$i++)
		{ 

			if($i==1)
			{ 
				$ed=date("d M y",strtotime(' '.$cweek.' monday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><input type="hidden" name="cw" value="<? echo $cweek; ?>" /><? echo $ed=date("d M y",strtotime(' '.$cweek.' monday this week')); ?> Mon <?
			
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; }
				?></span> <?
			}
			
			
			
			elseif($i==2)
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' tuesday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' tuesday this week'));  ?> Tue<?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></span> <?
			}
			
			elseif($i==3)
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' wednesday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' wednesday this week'));  ?>  Wed<?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></span> <?
			}
			
			elseif($i==4)
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' thursday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' thursday this week'));  ?>  Thu<?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></span> <?
			}
			
			elseif($i==5)
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' friday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' friday this week'));  ?> Fri <?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></span> <?
			}
			
			elseif($i==6)
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' saturday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' saturday this week'));  ?> Sat<?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; } ?></span> <?
			}
			
			else
			{ 	$ed=date("d M y",strtotime(' '.$cweek.' sunday this week'));
				cellcolor($row['id'], $ed);
				?><span class="visible-xs visible-sm data"><? echo $ed=date("d M y",strtotime(' '.$cweek.' sunday this week'));  ?> Sun<?
				$queryy=mysql_query("SELECT * FROM `events` WHERE event_date='".$ed."'");
				while($rowq=mysql_fetch_array($queryy))
				{ echo "(".$rowq['event'].")"; }
				?></span> <?
			}
			
			$cquery=mysql_query("SELECT COUNT(staff_id) FROM `timesheet` WHERE (staff_id='".$row['id']."' && date='".$ed."' && published='YES')");
			$rowcun = mysql_fetch_array($cquery);
			if($rowcun[0]!=0)
			{		
				$query=mysql_query("SELECT * FROM `timesheet` WHERE (staff_id='".$row['id']."' && date='".$ed."' && published='YES')");
				
				while($roww=mysql_fetch_array($query))
				{
					if($roww['split_start']!="00:00" || $roww['split_finish']!="00:00" )
					{
						echo "<span class='text-center'>".date("g:ia", strtotime($roww['start_time']))." - ".date("g:ia", strtotime($roww['finish_time']))." ".$roww['role']; ?><br/><? echo date("g:ia", strtotime($roww['split_start']))." - ".date("g:ia", strtotime($roww['split_finish']))." ".$roww['split_role']; ?>
												
						</span></td><?
						$st=(strtotime($roww['finish_time']) - strtotime($roww['start_time']))+(strtotime($roww['split_finish']) - strtotime($roww['split_start']) );
						if ( $st > 18000 ) $st = strtotime('-30 minutes', $st);
						$hr=date("G",$st);
						$min=date("i",$st);
					}
					else
					{
						echo "<span class='text-center'>".date("g:ia", strtotime($roww['start_time']))." - ".date("g:ia", strtotime($roww['finish_time']))." ".$roww['role']; ?>
						</span></td><?
						$st=(strtotime($roww['finish_time']) - strtotime($roww['start_time']) );
						if ( $st > 18000 ) $st = strtotime('-30 minutes', $st);
						$hr=date("G",$st);
						$min=date("i",$st);
					}
					?><td class="text-center hidden-xs hidden-sm"><? echo $dur=$hr.date(":i",$st); ?></td><?
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
				{	?>OFF</td><td class="text-center hidden-xs hidden-sm">&nbsp;</td> <?	}
				else
				{
					?>&nbsp;</td><td class="text-center hidden-xs hidden-sm">&nbsp;</td> <?
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
		
		
		?>		<td class="text-center"><span class="visible-xs visible-sm data">Total hours</span><? echo $totalhrs.":".$grossmins; ?></td><?
		
	?>		</tr><?	
	}?>
		  
		</tbody>
	<? } ?>
	</table>
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