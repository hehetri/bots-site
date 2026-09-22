<?php
require __DIR__.'/bootstrap.php';
try{
 $table=getenv('BOTS_PLAYERS_TABLE');$column=getenv('BOTS_PLAYERS_COUNT_COLUMN');
 if(!$table||!$column||!preg_match('/^[A-Za-z0-9_]+$/',$table)||!preg_match('/^[A-Za-z0-9_]+$/',$column))json_response(['ok'=>false,'configured'=>false,'players_online'=>null],503);
 $count=(int)db()->query('SELECT '.$column.' FROM '.$table.' LIMIT 1')->fetchColumn();
 json_response(['ok'=>true,'configured'=>true,'players_online'=>$count]);
}catch(Throwable $e){json_response(['ok'=>false,'configured'=>true,'players_online'=>null,'message'=>$e->getMessage()],500);}
