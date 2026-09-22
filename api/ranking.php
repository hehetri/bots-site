<?php
require __DIR__.'/bootstrap.php';
try{
 $table=getenv('BOTS_RANK_TABLE');$name=getenv('BOTS_RANK_NAME');$level=getenv('BOTS_RANK_LEVEL');$exp=getenv('BOTS_RANK_EXP');$guild=getenv('BOTS_RANK_GUILD');
 if(!$table||!$name||!$level||!$exp)json_response(['ok'=>false,'configured'=>false,'message'=>'Ranking schema is not configured yet. Confirm the bout_evolution columns first.','rows'=>[]],503);
 foreach([$table,$name,$level,$exp,$guild] as $id)if($id!==false&&$id!==null&&!preg_match('/^[A-Za-z0-9_]+$/',$id))throw new RuntimeException('Invalid ranking schema identifier.');
 $limit=min(max((int)($_GET['limit']??50),1),100);
 $sql='SELECT '.$name.' AS player, '.$level.' AS level, '.$exp.' AS experience'.($guild?', '.$guild.' AS guild':', NULL AS guild').' FROM '.$table.' ORDER BY '.$level.' DESC, '.$exp.' DESC LIMIT '.$limit;
 json_response(['ok'=>true,'configured'=>true,'rows'=>db()->query($sql)->fetchAll()]);
}catch(Throwable $e){json_response(['ok'=>false,'configured'=>true,'message'=>$e->getMessage(),'rows'=>[]],500);}
