<?php

  $deviceMap = file_get_contents( "device-info.json" );
  header('Access-Control-Allow-Origin: *');
  echo json_encode( $deviceMap );

?>
