<?php

  $deviceMap = file_get_contents( "device-info.json" );
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  echo json_encode( $deviceMap );

?>
