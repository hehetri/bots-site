<?php
require __DIR__.'/bootstrap.php';
try{db();json_response(['ok'=>true,'database'=>'online','game_server'=>'unknown','login_server'=>'unknown','players_online'=>null,'message'=>'Database connection is available. Game-server probing still needs to be configured.','timestamp'=>gmdate('c')]);}
catch(Throwable $e){json_response(['ok'=>false,'database'=>'offline','game_server'=>'unknown','login_server'=>'unknown','players_online'=>null,'message'=>$e->getMessage(),'timestamp'=>gmdate('c')],503);}
